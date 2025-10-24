import puppeteer from "puppeteer";

export async function scrapeChat(url) {
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

    // Optional: scroll to bottom to load long chats
    await page.evaluate(async () => {
      let lastHeight = 0;
      while (document.body.scrollHeight > lastHeight) {
        lastHeight = document.body.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1000));
      }
    });

    console.log("Extracting chat content...");

    const chatData = await page.evaluate(() => {
      const messages = [];
      const proseElements = document.querySelectorAll(".prose");

      proseElements.forEach(contentEl => {
        const turn = contentEl.closest('div[data-testid^="conversation-turn-"]');
        const authorEl = turn ? turn.querySelector(".font-semibold") : null;
        const author = authorEl ? authorEl.innerText.trim() : "unknown";
        let content = "";

        contentEl.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            content += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === "STRONG") content += `**${node.textContent}**`;
            else if (node.tagName === "EM") content += `*${node.textContent}*`;
            else if (node.tagName === "CODE") content += `\`${node.textContent}\``;
            else if (node.tagName === "PRE")
              content += `\n\`\`\`\n${node.querySelector("code")?.textContent || ""}\n\`\`\`\n`;
            else if (node.tagName === "BR") content += "\n";
            else if (node.classList.contains("katex")) {
              const annotation = node.querySelector('annotation[encoding="application/x-tex"]');
              if (annotation) content += `\\(${annotation.textContent}\\)`;
            } else if (node.tagName === "P") content += node.textContent + "\n";
            else if (node.tagName === "HR") content += "---\n";
          }
        });

        messages.push({ author, content: content.trim() });
      });

      return messages;
    });

    console.log(`Extracted ${chatData.length} messages.`);
    return chatData;

  } catch (err) {
    console.error("Scrape error:", err);
    throw err;
  } finally {
    await browser.close();
  }
}
