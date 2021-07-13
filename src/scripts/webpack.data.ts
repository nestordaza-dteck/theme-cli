import path from "path";
import webpack from "webpack";
import fs from "fs";
import { RetriveThemeData } from "./plugins/retriveThemeData";
import { globalLayer } from "./layers/global";
import { getPageEntries, getSectionEntries } from "./helpers/getEntries";
const APP_SOURCE = path.join(process.env.APP_DIRECTORY, "/src");
const BUILD_OUT = path.join(process.env.APP_DIRECTORY, "/dist");

/**
 * @description Data webpack configuration compiles theme data json.
 */
const config = async (): Promise<webpack.Configuration> => {
  /**
   * Rules directory of data.
   *
   * Global data directory: ${APP_DIRECTORY}/src/data/global.data.(js|ts)
   *
   * Pages data directory: ${APP_DIRECTORY}/src/pages/${pageName}/${pageName}.data.(js|ts)
   *
   * Sections data directory: ${APP_DIRECTORY}/src/sections/${sectionName}/${sectionName}.data.(js|ts)
   */

  const globalEntry = path.join(APP_SOURCE, "data");
  const pagesEntry = path.join(APP_SOURCE, "pages");
  const sectionsEntry = path.join(APP_SOURCE, "sections");

  //if Global data directory is not created, create it with global template.
  fs.access(globalEntry, async (error) => {
    if (error) {
      await fs.mkdirSync(globalEntry);
      await fs.writeFileSync(
        path.join(globalEntry, "global.data.ts"),
        globalLayer
      );
    }
  });

  //creates entries for build modules ${section}.data.ts|js
  const sectionEntries = await getSectionEntries({
    sectionsEntry,
  });

  //creates entries for build modules ${page}.data.ts|js
  const pageEntries = await getPageEntries({
    pagesEntry,
  });

  return await new Promise((resolve) => {
    resolve({
      name: "data",
      mode: process.env.NODE_ENV,
      entry: {
        ...sectionEntries,
        ...pageEntries,
        _global: path.join(globalEntry, "global.data"),
      },
      output: {
        filename: "[name].[fullhash].js",
        path: path.resolve(BUILD_OUT, "browser"),
        clean: true,
        library: {
          // name: "themeData",
          type: "commonjs",
        },
      },
      optimization: {
        minimize: true,
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      /**
       * resolve loaders from the CLI node_modules.
       */
      //
      resolveLoader: {
        modules: [path.join(__dirname, "../../node_modules")],
        extensions: [".ts"],
      },
      plugins: [new RetriveThemeData()],
      module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.tsx?$/,
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    });
  });
};

module.exports = config;
