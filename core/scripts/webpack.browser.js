"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var plugin_1 = __importDefault(require("./plugins/plugin"));
var webpack_1 = __importDefault(require("webpack"));
var env_1 = __importDefault(require("./helpers/env"));
var APP_SOURCE = path_1.default.join(process.env.APP_DIRECTORY, "/src");
var BUILD_OUT = path_1.default.join(process.env.APP_DIRECTORY, "/dist");
var env = env_1.default("/");
/**
 * @description Browser webpack configuration compiles frontend end side.
 */
var browser = {
    name: "browser",
    mode: process.env.NODE_ENV,
    entry: path_1.default.join(APP_SOURCE, "index.tsx"),
    output: {
        filename: "assets/js/index.js",
        path: path_1.default.join(BUILD_OUT, "browser"),
    },
    stats: {
        children: true,
    },
    performance: {
        hints: process.env.NODE_ENV === "production" ? "warning" : false,
    },
    devServer: {
        contentBase: path_1.default.join(process.env.APP_DIRECTORY, "/public"),
        port: process.env.PORT || "8080",
        historyApiFallback: {
            index: "/",
        },
    },
    plugins: [
        /**
         * add custom variables from .env file inside running project.
         */
        new webpack_1.default.DefinePlugin(env.stringified),
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new mini_css_extract_plugin_1.default({
            filename: "assets/css/index.css",
        }),
        new html_webpack_plugin_1.default({
            title: "Soltivo Theme",
            template: path_1.default.join(process.env.APP_DIRECTORY, "/public/index.ejs"),
            publicPath: process.env.PUBLIC_URL || env.raw.PUBLIC_URL,
        }),
        new plugin_1.default(),
        new copy_webpack_plugin_1.default({
            patterns: [
                {
                    from: path_1.default.join(process.env.APP_DIRECTORY, "/public/assets/data"),
                    to: path_1.default.join(process.env.APP_DIRECTORY, "/dist/browser/assets/data"),
                    context: path_1.default.join(process.env.APP_DIRECTORY, "/assets/data"),
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new terser_webpack_plugin_1.default()],
    },
    resolve: {
        modules: [
            path_1.default.resolve(process.env.APP_DIRECTORY, "/src"),
            path_1.default.join(process.env.APP_DIRECTORY, "/node_modules"),
        ],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    /**
     * resolve loaders from the CLI node_modules.
     */
    resolveLoader: {
        modules: [path_1.default.join(__dirname, "../../node_modules")],
        extensions: ["*"],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: APP_SOURCE,
                loader: require.resolve("babel-loader"),
                options: {
                    customize: require.resolve("babel-preset-react-app/webpack-overrides"),
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
                use: [mini_css_extract_plugin_1.default.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    mini_css_extract_plugin_1.default.loader,
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
exports.default = browser;
