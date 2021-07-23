import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import path from "path";
import browser from "./webpack.browser";

const APP_SOURCE = path.join(process.env.APP_DIRECTORY, "/src");
const BUILD_OUT = path.join(process.env.APP_DIRECTORY, "/dist");

/**
 * @description Server webpack configuration compiles backend end side.
 */
const server = {
  name: "server",
  mode: process.env.NODE_ENV,
  entry: { index: path.join(APP_SOURCE, "server") },
  devtool:
    process.env.NODE_ENV === "development" ? "inline-source-map" : undefined,
  stats: "errors-warnings",
  performance: {
    hints: "warning",
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: path.join(BUILD_OUT, "server"),
    filename: "index.js",
    library: {
      type: "this",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(
            process.env.APP_DIRECTORY,
            "/public/assets/data/pages.website.json"
          ),
          to: path.join(BUILD_OUT, "/server/"),
        },
        {
          from: `${process.env.APP_DIRECTORY}/public/assets/data/global.website.json`,
          to: path.join(BUILD_OUT, "/server/"),
        },
        {
          from: `${process.env.APP_DIRECTORY}/public/assets/data/config.website.json`,
          to: path.join(BUILD_OUT, "/server/"),
        },
      ],
    }),
  ],

  resolve: {
    modules: [
      path.resolve(process.env.APP_DIRECTORY, "/src"),
      path.join(process.env.APP_DIRECTORY, "/node_modules"),
    ],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  /**
   * resolve loaders from the CLI node_modules.
   */
  resolveLoader: {
    modules: [path.join(__dirname, "../../node_modules")],
    extensions: ["*"],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: APP_SOURCE,
        loader: require.resolve("babel-loader"),
        options: {
          customize: require.resolve(
            "babel-preset-react-app/webpack-overrides"
          ),
          presets: [
            [
              require.resolve("babel-preset-react-app"),
              {
                runtime: "automatic",
              },
            ],
          ],
        },
      },
      {
        test: /\.(css|scss|html|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: "null-loader",
      },
    ],
  },
};

export default [browser, server];
