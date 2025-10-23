const fs = require('fs');
fs.appendFileSync('test_log.log', 'This is a test message.\n');
console.log('Test message written to test_log.log');