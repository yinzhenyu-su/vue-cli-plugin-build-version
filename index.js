let fs = require('fs');
let { getSVNRev, getGITRev } = require('./getRev');

function witerFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('build version done.');
    }
  });
}

module.exports = (api, projectOptions) => {
  api.registerCommand(
    'build-version',
    {
      description: 'generate version file for vue cli',
      usage: 'vue-cli-service build-version',
      options: {},
    },
    async (_) => {
      try {
        const options = projectOptions.pluginOptions.buildVersion;
        const defaultVersion = new Date().toLocaleString();
        const { path, env, versionPath, name } = options;
        const DIR = `${path}/${versionPath}`;
        const FILENAME = name || 'version';
        const FULLPATH = `${DIR}/${FILENAME}.json`;
        let gitRev = await getGITRev().catch((e) => {
          console.log(e);
        });
        let svnRev = await getSVNRev().catch((e) => {
          console.log(e);
        });
        let obj = {
          date: defaultVersion,
          svn: svnRev,
          git: gitRev,
        };

        fs.access(DIR, fs.constants.F_OK, function (err) {
          if (err) {
            // write version.js
            fs.mkdir(`${path}`, function () {
              if (versionPath) {
                fs.mkdir(`${path}/${versionPath}`, function () {
                  witerFile(FULLPATH, JSON.stringify(obj));
                });
              } else {
                witerFile(FULLPATH, JSON.stringify(obj));
              }
            });
          } else {
            witerFile(FULLPATH, JSON.stringify(obj));
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  );
};

module.exports.defaultModes = {
  build: 'production',
};
