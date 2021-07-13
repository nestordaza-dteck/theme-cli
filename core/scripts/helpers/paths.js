'use strict';
var path = require('path');
var fs = require('fs');
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
var resolveApp = function (relativePath) { return path.resolve(appDirectory, relativePath); };
var moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];
module.exports = {
    dotenv: resolveApp(path.join(process.env.APP_DIRECTORY, '.env')),
};
module.exports.moduleFileExtensions = moduleFileExtensions;
