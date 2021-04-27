const { exec } = require('child_process');
const { getLocalRev } = require('./svn-utils')

function getSVNRev(cwd) {
  return getLocalRev(cwd);
}

function getGITRev(cwd) {
  return new Promise((resolve, reject) => {
    const regex = /[\da-z]{7}/g;
    exec(
      '"git" rev-parse --shrot HEAD',
      { encoding: 'utf-8', cwd },
      (err, stdout, stderr) => {
        if (err) {
          reject('get git rev failed');
          return;
        }
        const match = regex.exec(stdout);
        resolve(match[0]);
      },
    );
  });
}

module.exports = { getSVNRev, getGITRev };
