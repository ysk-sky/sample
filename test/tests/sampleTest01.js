const should = require('should');
const webdriverio = require('webdriverio');
const fs = require('fs');

const config = {};
config.url = 'https://www.google.co.jp/';
config.outdir = 'ss';

let client;

function joinOutputPath(str) {
  return `${config.outdir}/${str}.png`;
}

// Creates output dir for screenshot if NOT exists
if (!fs.existsSync(config.outdir)) {
  fs.mkdirSync(config.outdir);
}

module.exports = function () {
  describe('Sample001', () => {
    before(function (done) {
      this.timeout(30000);
      client = webdriverio
        .remote({ desiredCapabilities: { browserName: 'chrome' } })
        .init().url(config.url).call(done);
      process.on('uncaughtException', (err) => {
        const date = new Date().toLocaleString().replace(/\s|\//g, '-').replace(/:/g, '');
        console.log(`        ScrrenShot: error${date}.png`);
        client.saveScreenshot(joinOutputPath(`error${date}`));
      });
    });
    after(function (done) {
      this.timeout(10000);
      client.end().call(done);
    });
    describe('[Sample-001] Google Top Page', () => {
      it('is OK', function (done) {
        this.timeout(10000);
        client
          .saveScreenshot(joinOutputPath('sampleSS1'))
          .call(done);
      });
    });
    describe('[Sample-002] Input Search Word', () => {
      it('is OK', function (done) {
        this.timeout(10000);
        client
          .setValue('input#lst-ib', 'Selenium')
          .saveScreenshot(joinOutputPath('sampleSS2'))
          .call(done);
      });
    });
    describe('[Sample-003] Search Result', () => {
      it('is OK', function (done) {
        this.timeout(10000);
        client
          .keys('\uE007')
          .pause(1000)
          .saveScreenshot(joinOutputPath('sampleSS3'))
          .call(done);
      });
    });
  });
};