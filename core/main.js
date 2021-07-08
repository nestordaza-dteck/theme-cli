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
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
const { v4 } = require("uuid");
const access = promisify(fs.access);
const copy = promisify(ncp);
function clearThemeName(name) {
    return `${name.toLowerCase().replace(/( )/g, "-")}`;
}
/**
 * @description set default package.json fields.
 */
function setPackageInfoDefaults(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packageJsonPath = path.join(`${options.targetDirectory}/${clearThemeName(options.templateName)}`, "package.json");
            if (path.join(packageJsonPath, "package.json")) {
                const file = yield fs.readFileSync(packageJsonPath);
                let defaultPackageJson = JSON.parse(file.toString());
                defaultPackageJson["name"] = options.templateName;
                defaultPackageJson["description"] = "Describe your theme...";
                defaultPackageJson["author"] = "Soltivo team";
                defaultPackageJson["description"];
                defaultPackageJson["license"] = "ISC";
                defaultPackageJson["version"] = "1.0.0";
                defaultPackageJson["homepage"] = "/";
                defaultPackageJson["private"] = true;
                fs.writeFileSync(packageJsonPath, JSON.stringify(defaultPackageJson, null, 2));
            }
        }
        catch (error) {
            return Promise.reject(new Error('Something went wrong while setting up package.json defaults, try to delete the folder and re-run the "create-soltivo-theme".'));
        }
    });
}
/**
 * @description create theme .env file .gitignore
 */
function createInitialFile(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultEnv = [
                {
                    THEME_ID: v4(),
                    THEME_NAME: options.templateName,
                    THEME_GOOGLE_API_KEY: "AIzaSyBb01Bhrc3WVArxaA9H5_X1d5cUINSRZUE",
                    THEME_BOOKING_APP_URL: "https://booking.mysoltivo.dev",
                },
            ];
            //.env
            yield fs.writeFileSync(path.join(`${options.targetDirectory}/${clearThemeName(options.templateName)}`, ".env"), Object.keys(defaultEnv)
                .map((key) => {
                `${key}=${defaultEnv[key]}`;
            })
                .toString()
                .replace(/,/g, "\n"));
            //.gitignore
            yield fs.writeFileSync(path.join(`${options.targetDirectory}/${clearThemeName(options.templateName)}`, ".gitignore"), `node_modules/\nbuild/\ndist/
        `);
            yield setPackageInfoDefaults(options);
        }
        catch (error) {
            return Promise.reject(new Error(error));
        }
    });
}
function copyTemplateFiles(options) {
    return __awaiter(this, void 0, void 0, function* () {
        //check if folder already exists and if it has content in it.
        const alreadyExists = yield fs.existsSync(`${options.targetDirectory}/${clearThemeName(options.templateName)}`);
        if (alreadyExists) {
            return Promise.reject(new Error("Failed to create project, folder directory already exists."));
        }
        return copy(options.templateDirectory, `${options.targetDirectory}/${clearThemeName(options.templateName)}`, {
            clobber: false,
        });
    });
}
function initGit(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield execa("git", ["init"], {
            cwd: `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
        });
        if (result.failed) {
            return Promise.reject(new Error("Failed to initialize git"));
        }
        return;
    });
}
export function createProject(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = Object.assign(Object.assign({}, options), { targetDirectory: options.targetDirectory || process.cwd() });
        const currentFileUrl = import.meta.url;
        const templateDir = path.resolve(new URL(currentFileUrl).pathname, "../../templates", options.template.toLowerCase());
        options.templateDirectory = templateDir;
        try {
            yield access(templateDir, fs.constants.R_OK);
        }
        catch (err) {
            console.error("%s Invalid template name", chalk.red.bold("❌"));
            process.exit(1);
        }
        const tasks = new Listr([
            {
                title: "Copy project files",
                task: () => copyTemplateFiles(options).catch((error) => {
                    console.error(`%s ${error}`, chalk.red.bold("❌"));
                    process.exit(1);
                }),
            },
            {
                title: "Initialize git",
                task: () => initGit(options),
                enabled: () => options.git,
            },
            {
                title: "Creating initial files",
                task: () => createInitialFile(options),
                enabled: () => true,
            },
            {
                title: "Install dependencies",
                task: () => projectInstall({
                    cwd: `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
                }),
                enabled: () => true,
            },
        ]);
        yield tasks.run();
        console.log(`\n\n%s\n\n%s\n\n%s\n\n%s\n\n%s\n\n`, chalk.green.bold("✅ Project template was created successfully."), `🔷 Run ${chalk.blueBright.bold(`cd /${clearThemeName(options.templateName)}`)} to enter your project directory`, `🔷 Run ${chalk.blueBright.bold("yarn start")} or ${chalk.blueBright.bold("npm run start")} to start the development server.`, `🔷 Run ${chalk.blueBright.bold("yarn build")} or ${chalk.blueBright.bold("npm run build")} to build a production version of your project.`, chalk.blueBright.bold(`🔥 Make something beutiful.`));
        return true;
    });
}
//# sourceMappingURL=main.js.map