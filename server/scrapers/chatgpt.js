const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function scrape(html) {
  fs.appendFileSync(path.join(__dirname, '../server_error.log'), 'Scraping HTML...\n');
  const $ = cheerio.load(html);
  const chatContent = [];

  $('div[data-testid^="conversation-turn-"]').each((i, turn) => {
    fs.appendFileSync(path.join(__dirname, '../server_error.log'), `Found conversation turn: ${$(turn).attr('data-testid')}\n`);
    const authorElement = $(turn).find('.font-semibold');
    const author = authorElement.text().trim();
    fs.appendFileSync(path.join(__dirname, '../server_error.log'), `Author: ${author}\n`);

    const proseElement = $(turn).find('.prose');
    let content = '';

    proseElement.children().each((j, child) => {
      const childElement = $(child);
      let childHtml = childElement.html();

      // Replace katex spans with their LaTeX annotation
      childHtml = childHtml.replace(/<span class="katex">.*?<annotation encoding="application\/x-tex">(.*?)<\/annotation>.*?<\/span>/g, (match, p1) => `\\(${p1}\\)`);

      // Basic conversion of some HTML tags to markdown
      childHtml = childHtml.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
      childHtml = childHtml.replace(/<em>(.*?)<\/em>/g, '*$1*');
      childHtml = childHtml.replace(/<br>/g, '\n');


      if (childElement.is('p')) {
        content += childHtml + '\n';
      } else if (childElement.is('pre')) {
        const code = childElement.find('code').text();
        content += '```\n' + code + '\n```\n';
      } else if (childElement.is('hr')) {
        content += '---\n';
      }
    });
    fs.appendFileSync(path.join(__dirname, '../server_error.log'), `Content: ${content}\n`);

    chatContent.push({
      type: author === 'You' ? 'user' : 'bot',
      content: content.trim(),
    });
  });
  fs.appendFileSync(path.join(__dirname, '../server_error.log'), `Chat content array: ${JSON.stringify(chatContent)}\n`);

  return chatContent;
}

module.exports = {
  scrape,
};