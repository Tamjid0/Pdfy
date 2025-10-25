import puppeteer from "puppeteer";

export async function scrapeHtml(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    console.log("Navigating to URL...");
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    console.log("Waiting for chat content to render...");
    await page.waitForSelector(".prose", { timeout: 120000 });

    console.log("Extracting chat content HTML...");

    const chatHtml = await page.evaluate(() => {
      const proseElements = document.querySelectorAll(".prose");
      let html = '';
      proseElements.forEach(el => {
        html += el.outerHTML;
      });
      return html;
    });

    return chatHtml;

  } catch (err) {
    console.error("Scrape error:", err);
    throw err;
  } finally {
    await browser.close();
  }
}
