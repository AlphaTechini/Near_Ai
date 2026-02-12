export interface Submission {
    repoUrl: string;
    submittedAt: string;
    status: 'pending' | 'verified' | 'failed';
    logs: string[];
    txHash?: string;
}

export interface Bounty {
    _id: string;
    title: string;
    description: string;
    rewardAmount: string;
    rewardToken: string;
    verificationCommand: string;
    creator: string;
    status: 'open' | 'closed';
    submissions: Submission[];
    createdAt: string;
}
