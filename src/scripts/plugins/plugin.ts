const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const jsdom = require("jsdom");
// const getClientEnvironment = require("./env");

class InsertData {
  apply(compiler) {
    // If your plugin is direct dependent to the html webpack plugin:
    const { JSDOM } = jsdom;
    /**
     * @todo we could improve the html using env from either node js and also the one set in the
     * theme through .env file.
     */
    // const env = getClientEnvironment("/");

    //Get global.data.website.json inside public folder of the theme.
    const globalData = require(path.join(
      process.env.APP_DIRECTORY,
      "public",
      "assets",
      "data",
      "global.website.json"
    ));

    compiler.hooks.compilation.tap("InsertData", (compilation) => {
      // Static Plugin interface |compilation | HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "InsertData", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          const HTML = new JSDOM(data.html);
          const globalColors = Object.keys(globalData.colors)
            .map((name) => {
              return `\n--${name}: ${globalData.colors[name]};\n`;
            })
            .toString()
            .replace(/(,)/g, "");

          const colorsEl = HTML.window.document.getElementById(
            "SOLTIVO_THEME_COLORS"
          );
          const fontsEl =
            HTML.window.document.getElementById("FONT_THEME_LINK");
          const fontSyleEl =
            HTML.window.document.getElementById("FONT_THEME_STYLE");
          colorsEl.innerHTML = `:root {${globalColors}}`;
          fontsEl.setAttribute("href", globalData.font.href);
          fontSyleEl.innerHTML = `*{${globalData.font.cssRule}}`;

          data.html = HTML.serialize();

          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = InsertData;
