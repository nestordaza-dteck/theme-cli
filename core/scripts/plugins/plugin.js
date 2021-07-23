"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var jsdom = require("jsdom");
// const getClientEnvironment = require("./env");
var InsertData = /** @class */ (function () {
    function InsertData() {
    }
    InsertData.prototype.apply = function (compiler) {
        // If your plugin is direct dependent to the html webpack plugin:
        var JSDOM = jsdom.JSDOM;
        /**
         * @todo we could improve the html using env from either node js and also the one set in the
         * theme through .env file.
         */
        // const env = getClientEnvironment("/");
        //Get global.data.website.json inside public folder of the theme.
        var globalData = require(path.join(process.env.APP_DIRECTORY, "public", "assets", "data", "global.website.json"));
        compiler.hooks.compilation.tap("InsertData", function (compilation) {
            // Static Plugin interface |compilation | HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync("InsertData", // <-- Set a meaningful name here for stacktraces
            function (data, cb) {
                // Manipulate the content
                var HTML = new JSDOM(data.html);
                var globalColors = Object.keys(globalData.colors)
                    .map(function (name) {
                    return "\n--" + name + ": " + globalData.colors[name] + ";\n";
                })
                    .toString()
                    .replace(/(,)/g, "");
                var colorsEl = HTML.window.document.getElementById("SOLTIVO_THEME_COLORS");
                var fontsEl = HTML.window.document.getElementById("FONT_THEME_LINK");
                var fontSyleEl = HTML.window.document.getElementById("FONT_THEME_STYLE");
                colorsEl.innerHTML = ":root {" + globalColors + "}";
                fontsEl.setAttribute("href", globalData.font.href);
                fontSyleEl.innerHTML = "*{" + globalData.font.cssRule + "}";
                data.html = HTML.serialize();
                // Tell webpack to move on
                cb(null, data);
            });
        });
    };
    return InsertData;
}());
exports.default = InsertData;
