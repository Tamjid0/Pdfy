const cheerio = require('cheerio');

function scrape(html) {
  const $ = cheerio.load(html);
  const chatContent = [];

  // This is a simplified selector for ChatGPT. It might need to be adjusted.
  $('div.text-base').each((i, el) => {
    const author = $(el).find('div.font-semibold').text().trim();
    const content = $(el).find('div.prose').text().trim();

    if (author && content) {
      chatContent.push({
        type: author === 'You' ? 'user' : 'bot',
        content: content
      });
    }
  });

  if (chatContent.length === 0) {
    // If the specific ChatGPT selector doesn't work, try a more generic approach.
    // This is a placeholder for a more robust solution.
    $('p, pre').each((i, el) => {
      chatContent.push({
        type: 'bot',
        content: $(el).text()
      });
    });
  }

  return chatContent;
}

module.exports = {
  scrape
};