const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const APP_SOURCE = path.join(__dirname, "src");
const BUILD_OUT = path.join(__dirname, "dist");
/**
 * @description Server webpack configuration compiles backend end side.
 */
const server = {
    name: "server",
    mode: "development",
    entry: { index: path.join(APP_SOURCE, "server") },
    devtool: "inline-source-map",
    stats: 'errors-warnings',
    performance: {
        hints: 'warning',
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
        new Dotenv(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: `${__dirname}/public/assets/data/pages.website.json`, to: `${BUILD_OUT}/server/` },
                { from: `${__dirname}/public/assets/data/global.website.json`, to: `${BUILD_OUT}/server/` },
            ],
        }),
    ],
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
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
};
module.exports = server;
//# sourceMappingURL=webpack.server.js.map