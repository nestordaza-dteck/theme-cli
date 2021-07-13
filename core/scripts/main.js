"use strict";
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
exports.run = exports.runScripts = exports.getDataFiles = exports.setEnvironmentVariables = void 0;
var chalk_1 = __importDefault(require("chalk"));
var execa_1 = __importDefault(require("execa"));
var path_1 = __importDefault(require("path"));
// @ts-ignore
var listr_1 = __importDefault(require("listr"));
var fs_1 = __importDefault(require("fs"));
//set environment
function setEnvironmentVariables(options) {
    process.env.NODE_ENV = options.env;
    process.env.APP_DIRECTORY = fs_1.default.realpathSync(process.cwd());
    process.env.APP_PUBLIC_DATA = path_1.default.join(process.env.APP_DIRECTORY, "public/assets/data");
    process.env.PORT = options.port || "8080";
}
exports.setEnvironmentVariables = setEnvironmentVariables;
function getDataFiles(options) {
    return __awaiter(this, void 0, void 0, function () {
        var dataConfigPath, webpackCliPath, runArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataConfigPath = path_1.default.join(__dirname, "webpack.data.js");
                    webpackCliPath = path_1.default.join(__dirname, "../../node_modules/.bin/webpack");
                    runArgs = ["--config", dataConfigPath];
                    return [4 /*yield*/, execa_1.default("" + webpackCliPath, runArgs, {
                            cwd: process.cwd(),
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getDataFiles = getDataFiles;
function runScripts(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDataFiles(options)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.runScripts = runScripts;
function run(options) {
    return __awaiter(this, void 0, void 0, function () {
        var tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //set environment variables.
                    setEnvironmentVariables(options);
                    tasks = new listr_1.default([
                        {
                            title: options.env === "development"
                                ? chalk_1.default.blueBright.bold("Running in development mode at http://localhost:" + process.env.PORT + ".")
                                : chalk_1.default.blueBright.bold("Building production."),
                            task: function () {
                                return runScripts(options)
                                    .then(function (res) {
                                    console.log(res);
                                })
                                    .catch(function (error) {
                                    console.error("%s " + error, chalk_1.default.red.bold("❌"));
                                    process.exit(1);
                                });
                            },
                            enabled: function () { return true; },
                        },
                    ]);
                    return [4 /*yield*/, tasks.run()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.run = run;
