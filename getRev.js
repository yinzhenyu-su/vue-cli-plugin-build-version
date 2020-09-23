const { exec } = require('child_process');

function getSVNRev(cwd) {
  return new Promise((resolve, reject) => {
    // const regex = /Revision: ([\d]+)/gm;
    const regex = /\nr([\d]+)/gm
    exec('"svn" log -r HEAD', { encoding: 'utf-8', cwd }, (err, stdout, stderr) => {
      if (err) {
        reject('get svn rev failed');
        return;
      }
      const match = regex.exec(stdout);
      resolve(match[1]);
    });
  });
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
