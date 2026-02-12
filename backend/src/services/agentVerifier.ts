import { Octokit } from '@octokit/rest';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface VerificationResult {
    success: boolean;
    logs: string[];
}

export class AgentVerifierService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN, // Optional, but good for rate limits
        });
    }

    /**
     * Verifies a submission by cloning the repo and running the test command.
     * @param repoUrl The full URL of the GitHub repository
     * @param testCommand The command to run (e.g., "npm test")
     */
    async verifySubmission(repoUrl: string, testCommand: string = 'npm test'): Promise<VerificationResult> {
        const logs: string[] = [];
        const log = (msg: string) => {
            console.log(`[Verifier] ${msg}`);
            logs.push(msg);
        };

        log(`Starting verification for: ${repoUrl}`);

        // 1. Parse Repo Details
        const repoRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = repoUrl.match(repoRegex);
        if (!match) {
            log('Error: Invalid GitHub URL');
            return { success: false, logs };
        }
        const [_, owner, repo] = match;

        // 2. Check if Repo Exists (via API)
        try {
            log(`Checking existence of ${owner}/${repo}...`);
            await this.octokit.repos.get({ owner, repo });
            log('Repo found.');
        } catch (error: any) {
            log(`Error: Repository not accessible. ${error.message}`);
            return { success: false, logs };
        }

        // 3. Prepare Temp Directory
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'neuralance-'));
        log(`Created temp workspace: ${tempDir}`);

        try {
            // 4. Clone Repo
            await this.runCommand('git', ['clone', repoUrl, '.'], tempDir, log);

            // 5. Install Dependencies (Detect package manager or default to npm)
            if (fs.existsSync(path.join(tempDir, 'pnpm-lock.yaml'))) {
                await this.runCommand('pnpm', ['install'], tempDir, log);
            } else if (fs.existsSync(path.join(tempDir, 'yarn.lock'))) {
                await this.runCommand('yarn', ['install'], tempDir, log);
            } else {
                await this.runCommand('npm', ['install'], tempDir, log);
            }

            // 6. Run Test Command
            log(`Running verification command: ${testCommand}`);
            await this.runCommand(testCommand.split(' ')[0], testCommand.split(' ').slice(1), tempDir, log);

            log('Verification PASSED.');
            return { success: true, logs };

        } catch (error: any) {
            log(`Verification FAILED: ${error.message}`);
            return { success: false, logs };
        } finally {
            // Cleanup
            try {
                fs.rmSync(tempDir, { recursive: true, force: true });
                log('Cleaned up temp workspace.');
            } catch (e) {
                console.error('Failed to cleanup temp dir', e);
            }
        }
    }

    private runCommand(command: string, args: string[], cwd: string, log: (msg: string) => void): Promise<void> {
        return new Promise((resolve, reject) => {
            log(`> ${command} ${args.join(' ')}`);

            // Check for shell command execution (Windows vs Unix)
            const isWin = process.platform === "win32";
            const cmd = isWin ? 'cmd.exe' : command;
            const cmdArgs = isWin ? ['/c', command, ...args] : args;

            const child = spawn(cmd, cmdArgs, { cwd, shell: false }); // shell: false for security

            child.stdout.on('data', (data) => {
                const lines = data.toString().split('\n');
                lines.forEach((line: string) => {
                    if (line.trim()) log(line.trim());
                });
            });

            child.stderr.on('data', (data) => {
                const lines = data.toString().split('\n');
                lines.forEach((line: string) => {
                    if (line.trim()) log(`ERR: ${line.trim()}`);
                });
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Command exited with code ${code}`));
                }
            });

            child.on('error', (err) => {
                reject(err);
            });
        });
    }
}

export const agentVerifierService = new AgentVerifierService();
