"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_browser_1 = __importDefault(require("./webpack.browser"));
var APP_SOURCE = path_1.default.join(process.env.APP_DIRECTORY, "/src");
var BUILD_OUT = path_1.default.join(process.env.APP_DIRECTORY, "/dist");
/**
 * @description Server webpack configuration compiles backend end side.
 */
var server = {
    name: "server",
    mode: process.env.NODE_ENV,
    entry: { index: path_1.default.join(APP_SOURCE, "server") },
    devtool: process.env.NODE_ENV === "development" ? "inline-source-map" : undefined,
    stats: "errors-warnings",
    performance: {
        hints: "warning",
    },
    optimization: {
        minimizer: [new terser_webpack_plugin_1.default()],
    },
    output: {
        path: path_1.default.join(BUILD_OUT, "server"),
        filename: "index.js",
        library: {
            type: "this",
        },
    },
    plugins: [
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new copy_webpack_plugin_1.default({
            patterns: [
                {
                    from: path_1.default.join(process.env.APP_DIRECTORY, "/public/assets/data/pages.website.json"),
                    to: path_1.default.join(BUILD_OUT, "/server/"),
                },
                {
                    from: process.env.APP_DIRECTORY + "/public/assets/data/global.website.json",
                    to: path_1.default.join(BUILD_OUT, "/server/"),
                },
                {
                    from: process.env.APP_DIRECTORY + "/public/assets/data/config.website.json",
                    to: path_1.default.join(BUILD_OUT, "/server/"),
                },
            ],
        }),
    ],
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
                test: /\.(css|scss|html|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
                use: "null-loader",
            },
        ],
    },
};
exports.default = [webpack_browser_1.default, server];
