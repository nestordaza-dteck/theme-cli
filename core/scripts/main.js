var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import execa from "execa";
import path from "path";
import Listr from "listr";
import fs from "fs";
//set environment
export function setEnvironmentVariables(options) {
    process.env.NODE_ENV = options.env;
    process.env.APP_DIRECTORY = fs.realpathSync(process.cwd());
    process.env.PORT = options.port || "8080";
}
export function build(options) {
    return __awaiter(this, void 0, void 0, function* () {
        //frontend webpack configuration
        const browserConfigPath = path.join(__dirname, "webpack.browser.js");
        //node_modules from the cli to execute.
        const webpackCliPath = path.join(__dirname, "../../node_modules/.bin/webpack");
        //command args to run based on environment.
        const runArgs = options.env === "development"
            ? ["serve", "--config", browserConfigPath, "--hot", "--open"]
            : ["--config", browserConfigPath, "--mode", options.env];
        return yield execa(`${webpackCliPath}`, runArgs, {
            cwd: process.cwd(),
        });
    });
}
export function run(options) {
    return __awaiter(this, void 0, void 0, function* () {
        //set environment variables.
        setEnvironmentVariables(options);
        const tasks = new Listr([
            {
                title: options.env === "development"
                    ? chalk.blueBright.bold(`Running in development mode at http://localhost:${process.env.PORT}.`)
                    : chalk.blueBright.bold("Building production."),
                task: () => build(options)
                    .then((res) => {
                    // console.log(res);
                })
                    .catch((error) => {
                    console.error(`%s ${error}`, chalk.red.bold("❌"));
                    process.exit(1);
                }),
                enabled: () => true,
            },
        ]);
        yield tasks.run();
        return true;
    });
}
//# sourceMappingURL=main.js.map