# what is this

this is a vue-cli-plugin that to generate version.json file for vue-cli project.

the content should like this

```js
{
  "date": "2020-09-23 11:11:11", // last build date
  "cvs": "git", // cvs type
  "rev": "a4f56gf" // cvs short HEAD rev
}
```

---

## how to use it

1. install from you node package manager.

   ```js
   npm install vue-cli-plugin-build-version
   ```

   or

   ```js
   vue add vue-cli-plugin-build-version
   ```

2. put below config in **vue.config.js**

   ```js
   pluginOptions: {
     buildVersion: {
       path: require('path').resolve('dist'), // build root dir
       env: require('process').env, // env obj
       cvs: 'git', // cvs type, git or svn
       versionPath: '' // version file parent dir, empty string for default
       name: '', // version file name, empty string for default
     }
   }
   ```

3. put below config in **package.json** `scripts` fields

   ```json
   "buildVersion": "vue-cli-service build-version"
   ```

4. run `npm run buildVersion`


## Change log

