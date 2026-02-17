from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Emulate an iPhone 13 Pro
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        # Navigate to home page
        page.goto("http://localhost:5173/")

        # Wait for the hero headline to be visible
        headline = page.locator("h1.hero-headline")
        expect(headline).to_be_visible()

        # Verify that we are NOT redirected to /mobile (check URL)
        # The URL should remain http://localhost:5173/ or at least NOT contain /mobile
        # (unless the path is specifically /mobile, which we removed)
        # Actually, page.url should be http://localhost:5173/
        # expect(page).to_have_url("http://localhost:5173/") # This might be flaky if redirects happen quickly but playright waits.
        # But we removed the redirect, so it should stay.

        print(f"Current URL: {page.url}")
        assert "/mobile" not in page.url

        # Check that navbar links are hidden (mobile view)
        navbar_links = page.locator(".navbar-links")
        expect(navbar_links).not_to_be_visible()

        # Check that the hero content is stacked (optional, visual check via screenshot is better)

        # Take screenshot
        page.screenshot(path="/home/jules/verification/mobile_view.png", full_page=True)
        print("Screenshot saved to /home/jules/verification/mobile_view.png")

        browser.close()

if __name__ == "__main__":
    run()
