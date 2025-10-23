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

            

                // Wait explicitly for at least one conversation message appears

                await page.waitForSelector('.prose', { timeout: 120000 });

            

                console.log("Extracting chat content...");

            

                        const chatData = await page.evaluate(() => {\n      const messages = [];\n      const proseElements = document.querySelectorAll(\'.prose\');\n      \n      proseElements.forEach(contentEl => {\n        const turn = contentEl.closest(\'div[data-testid^=\"conversation-turn-\"]\');\n        const authorEl = turn ? turn.querySelector(\'.font-semibold\') : null;\n\n        const author =\n          authorEl ? authorEl.innerText.trim() : \'unknown\';\n        let content = \'\';\n\n        contentEl.childNodes.forEach(node => {\n          if (node.nodeType === Node.TEXT_NODE) {\n            content += node.textContent;\n          } else if (node.nodeType === Node.ELEMENT_NODE) {\n            if (node.tagName === \'STRONG\') {\n              content += `**${node.textContent}**`;\n            } else if (node.tagName === \'EM\') {\n              content += `*${node.textContent}*`;\n            } else if (node.tagName === \'CODE\') {\n              content += `\`${node.textContent}\``;\n            } else if (node.tagName === \'PRE\') {\n              content += `\\n\`\`\`\\n${node.querySelector(\'code\').textContent}\\n\`\`\`\\n`;\n            } else if (node.tagName === \'BR\') {\n              content += \'\\n\';\n            } else if (node.classList.contains(\'katex\')) {\n              const annotation = node.querySelector(\'annotation[encoding=\"application/x-tex\"]\');\n              if (annotation) {\n                content += `\\\\(${annotation.textContent}\\\\)`;\n              }\n            } else if (node.tagName === \'P\') {\n                content += node.textContent + \'\\n\';\n            } else if (node.tagName === \'HR\') {\n                content += \'---\\n\';\n            }\n          }\n        });\n\n        messages.push({ author, content: content.trim() });\n      });\n      \n      return messages;\n    });

        

            console.log(`Extracted ${chatData.length} messages.`);

            await browser.close();

            return chatData;

          } catch (err) {

            console.error("Scrape error:", err);

            await browser.close();

            throw err;

          }

        }

        

    