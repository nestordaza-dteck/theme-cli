// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require("html-webpack-plugin");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const websiteData = require("./public/assets/data/global.website.json");

class InsertData {
    apply(compiler) {
        compiler.hooks.compilation.tap("InsertData", (compilation) => {
            // Static Plugin interface |compilation |HOOK NAME | register listener
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                "InsertData", // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    // Manipulate the content
                    const HTML = new JSDOM(data.html);
                    const globalColors = Object.keys(websiteData.colors)
                        .map((name) => {
                            return `\n--${name}: ${websiteData.colors[name]};\n`;
                        })
                        .toString()
                        .replace(/(,)/g, "");

                    const colorsEl = HTML.window.document.getElementById("SOLTIVO_THEME_COLORS");
                    const fontsEl = HTML.window.document.getElementById("FONT_THEME_LINK");
                    const fontSyleEl = HTML.window.document.getElementById("FONT_THEME_STYLE");
                    colorsEl.innerHTML = `:root {${globalColors}}`;
                    fontsEl.setAttribute("href", websiteData.font.href);
                    fontSyleEl.innerHTML = `*{${websiteData.font.cssRule}}`;

                    data.html = HTML.serialize();

                    // Tell webpack to move on
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = InsertData;
