const path = require('path')
const phantom = require('phantom')
const cheerio = require('cheerio')


module.exports = {
  changeCount(t, f) {
    t = parseFloat(t);
    f = parseFloat(f);
    return (Math.round( (t*100 - f*100) )/ f).toFixed(2) + '%'
  },
  resolve($path) {
    return path.resolve(__dirname, $path);
  },
  phantomHandler($url, $success) {
    return (async function() {
      const instance = await phantom.create();
      const page = await instance.createPage();
      await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
      });
     
      const status = await page.open($url);
      const content = await page.property('content');
  
      async function handleContent(content) {
        let $ = cheerio.load(content);
        $success($);
      }
  
      await handleContent(content);
  
      await instance.exit();
    })();
  },
}