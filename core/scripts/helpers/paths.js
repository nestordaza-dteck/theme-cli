'use strict';
const path = require('path');
const fs = require('fs');
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const moduleFileExtensions = [
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
