var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";
function parseArgumentsIntoOptions(rawArgs) {
    const splitPath = process.cwd().split(/\//);
    // the name of the folder running the cli
    const folderName = splitPath[splitPath.length - 1];
    const args = arg({
        "--git": Boolean,
        "--yes": Boolean,
        "--install": Boolean,
        "-g": "--git",
        "-y": "--yes",
        "-i": "--install",
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        skipPrompts: args["--yes"] || false,
        git: args["--git"] || false,
        template: args._[0],
        templateName: (args._[1] || folderName),
        runInstall: args["--install"] || false,
    };
}
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * @description list of available templates to be prompt
         */
        const availableTemplates = Object.freeze(["Tailwind"]);
        const defaultTemplate = "Tailwind";
        if (options.skipPrompts) {
            return Object.assign(Object.assign({}, options), { template: options.template || defaultTemplate });
        }
        const questions = [];
        if (!options.template) {
            questions.push({
                type: "list",
                name: "template",
                message: "Please choose which project template to use",
                choices: availableTemplates,
                default: defaultTemplate,
            });
        }
        if (!options.git) {
            questions.push({
                type: "confirm",
                name: "git",
                message: "Initialize a git repository?",
                default: false,
            });
        }
        const answers = yield inquirer.prompt(questions);
        return Object.assign(Object.assign({}, options), { template: options.template || answers.template, git: options.git || answers.git });
    });
}
export function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = parseArgumentsIntoOptions(args);
        options = yield promptForMissingOptions(options);
        yield createProject(options);
    });
}
//# sourceMappingURL=cli.js.map