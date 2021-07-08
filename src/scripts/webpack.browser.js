const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const InsertData = require("./plugins/plugin");
const webpack = require("webpack");
const getClientEnvironment = require("./helpers/env");

const APP_SOURCE = path.join(process.env.APP_DIRECTORY, "/src");
const BUILD_OUT = path.join(process.env.APP_DIRECTORY, "/dist");
const env = getClientEnvironment("/");

/**
 * @description Browser webpack configuration compiles frontend end side.
 */
const browser = {
  name: "browser",
  mode: "development",
  entry: path.join(APP_SOURCE, "index.tsx"),
  output: {
    filename: "assets/js/index.js",
    path: path.join(BUILD_OUT, "browser"),
  },
  stats: {
    children: true,
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
  devServer: {
    contentBase: path.join(process.env.APP_DIRECTORY, "/public"),
    port: process.env.PORT || "8080",
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/index.css",
    }),
    new HtmlWebpackPlugin({
      title: "Soltivo Theme",
      template: path.join(process.env.APP_DIRECTORY, "/public/index.ejs"),
      publicPath: process.env.PUBLIC_URL,
    }),
    new InsertData(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.env.APP_DIRECTORY, "/public/assets/data"),
          to: path.join(process.env.APP_DIRECTORY, "/dist/browser/assets/data"),
          context: path.join(process.env.APP_DIRECTORY, "/assets/data"),
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: "url-loader",
      },
    ],
  },
};

module.exports = browser;
