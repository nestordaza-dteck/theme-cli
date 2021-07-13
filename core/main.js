"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var ncp_1 = __importDefault(require("ncp"));
var path_1 = __importDefault(require("path"));
var util_1 = require("util");
var execa_1 = __importDefault(require("execa"));
var listr_1 = __importDefault(require("listr"));
var pkg_install_1 = require("pkg-install");
var v4 = require("uuid").v4;
var access = util_1.promisify(fs_1.default.access);
var copy = util_1.promisify(ncp_1.default);
function clearThemeName(name) {
    return "" + name.toLowerCase().replace(/( )/g, "-");
}
/**
 * @description set default package.json fields.
 */
function setPackageInfoDefaults(options) {
    return __awaiter(this, void 0, void 0, function () {
        var packageJsonPath, file, defaultPackageJson, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    packageJsonPath = path_1.default.join(options.targetDirectory + "/" + clearThemeName(options.templateName), "package.json");
                    if (!path_1.default.join(packageJsonPath, "package.json")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_1.default.readFileSync(packageJsonPath)];
                case 1:
                    file = _a.sent();
                    defaultPackageJson = JSON.parse(file.toString());
                    defaultPackageJson["name"] = options.templateName;
                    defaultPackageJson["description"] = "Describe your theme...";
                    defaultPackageJson["author"] = "Soltivo team";
                    defaultPackageJson["description"];
                    defaultPackageJson["license"] = "ISC";
                    defaultPackageJson["version"] = "1.0.0";
                    defaultPackageJson["homepage"] = "/";
                    defaultPackageJson["private"] = true;
                    fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(defaultPackageJson, null, 2));
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(new Error('Something went wrong while setting up package.json defaults, try to delete the folder and re-run the "create-soltivo-theme".'))];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * @description create theme .env file .gitignore
 */
function createInitialFile(options) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultEnv_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    defaultEnv_1 = {
                        THEME_ID: v4(),
                        THEME_NAME: options.templateName,
                        THEME_GOOGLE_API_KEY: "AIzaSyBb01Bhrc3WVArxaA9H5_X1d5cUINSRZUE",
                        THEME_BOOKING_APP_URL: "https://booking.mysoltivo.dev",
                    };
                    return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(options.targetDirectory + "/" + clearThemeName(options.templateName), ".env"), Object.keys(defaultEnv_1)
                            .map(function (key) { return key + "=" + defaultEnv_1[key]; })
                            .toString()
                            .replace(/,/g, "\n"))];
                case 1:
                    _a.sent();
                    //.gitignore
                    return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(options.targetDirectory + "/" + clearThemeName(options.templateName), ".gitignore"), "node_modules/\nbuild/\ndist/\n        ")];
                case 2:
                    //.gitignore
                    _a.sent();
                    return [4 /*yield*/, setPackageInfoDefaults(options)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(new Error(error_2))];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function copyTemplateFiles(options) {
    return __awaiter(this, void 0, void 0, function () {
        var alreadyExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.default.existsSync(options.targetDirectory + "/" + clearThemeName(options.templateName))];
                case 1:
                    alreadyExists = _a.sent();
                    if (alreadyExists) {
                        return [2 /*return*/, Promise.reject(new Error("Failed to create project, folder directory already exists."))];
                    }
                    return [2 /*return*/, copy(options.templateDirectory, options.targetDirectory + "/" + clearThemeName(options.templateName), {
                            clobber: false,
                        })];
            }
        });
    });
}
function initGit(options) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execa_1.default("git", ["init"], {
                        cwd: options.targetDirectory + "/" + clearThemeName(options.templateName),
                    })];
                case 1:
                    result = _a.sent();
                    if (result.failed) {
                        return [2 /*return*/, Promise.reject(new Error("Failed to initialize git"))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createProject(options) {
    return __awaiter(this, void 0, void 0, function () {
        var currentFileUrl, templateDir, err_1, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = __assign(__assign({}, options), { targetDirectory: options.targetDirectory || process.cwd() });
                    currentFileUrl = import.meta.url;
                    templateDir = path_1.default.resolve(new URL(currentFileUrl).pathname, "../../templates", options.template.toLowerCase());
                    options.templateDirectory = templateDir;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, access(templateDir, fs_1.default.constants.R_OK)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("%s Invalid template name", chalk_1.default.red.bold("❌"));
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4:
                    tasks = new listr_1.default([
                        {
                            title: "Copy project files",
                            task: function () {
                                return copyTemplateFiles(options).catch(function (error) {
                                    console.error("%s " + error, chalk_1.default.red.bold("❌"));
                                    process.exit(1);
                                });
                            },
                        },
                        {
                            title: "Initialize git",
                            task: function () { return initGit(options); },
                            enabled: function () { return options.git; },
                        },
                        {
                            title: "Creating initial files",
                            task: function () { return createInitialFile(options); },
                            enabled: function () { return true; },
                        },
                        {
                            title: "Install dependencies",
                            task: function () {
                                return pkg_install_1.projectInstall({
                                    cwd: options.targetDirectory + "/" + clearThemeName(options.templateName),
                                });
                            },
                            enabled: function () { return true; },
                        },
                    ]);
                    return [4 /*yield*/, tasks.run()];
                case 5:
                    _a.sent();
                    console.log("\n\n%s\n\n%s\n\n%s\n\n%s\n\n%s\n\n", chalk_1.default.green.bold("✅ Project template was created successfully."), "\uD83D\uDD37 Run " + chalk_1.default.blueBright.bold("cd " + clearThemeName(options.templateName)) + " to enter your project directory", "\uD83D\uDD37 Run " + chalk_1.default.blueBright.bold("yarn start") + " or " + chalk_1.default.blueBright.bold("npm run start") + " to start the development server.", "\uD83D\uDD37 Run " + chalk_1.default.blueBright.bold("yarn build") + " or " + chalk_1.default.blueBright.bold("npm run build") + " to build a production version of your project.", chalk_1.default.blueBright.bold("\uD83D\uDD25 Make something beutiful."));
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.createProject = createProject;
