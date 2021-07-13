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
exports.getSectionEntries = exports.getPageEntries = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var section_1 = require("../layers/section");
var page_1 = require("../layers/page");
/**
 * @description get array of pages entry points from src/pages directory, if data files not found
 * it will create empty data files from pageTemplate.
 */
function getPageEntries(_a) {
    var pagesEntry = _a.pagesEntry;
    return __awaiter(this, void 0, void 0, function () {
        var pageEntries;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        fs_1.default.access(pagesEntry, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            var entries, folders, i, folderDir, folderFiles, dataFileName, res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!error) return [3 /*break*/, 2];
                                        return [4 /*yield*/, fs_1.default.mkdirSync(pagesEntry)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        entries = [];
                                        return [4 /*yield*/, fs_1.default.readdirSync(pagesEntry)];
                                    case 3:
                                        folders = _a.sent();
                                        folders = folders.filter(function (folderName) {
                                            return /^([a-zA-Z_])/i.test(folderName);
                                        });
                                        i = 0;
                                        _a.label = 4;
                                    case 4:
                                        if (!(i < folders.length)) return [3 /*break*/, 9];
                                        folderDir = path_1.default.join(pagesEntry, folders[i]);
                                        return [4 /*yield*/, fs_1.default.readdirSync(folderDir)];
                                    case 5:
                                        folderFiles = _a.sent();
                                        dataFileName = folderFiles.find(function (file) {
                                            return /([a-zA-Z_]+)\.data\.(js|ts)/i.test(file);
                                        });
                                        if (!!dataFileName) return [3 /*break*/, 7];
                                        dataFileName = folders[i] + ".data.ts";
                                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(folderDir, dataFileName), page_1.pageLayer)];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7:
                                        //new entry to array.
                                        entries.push(path_1.default.join(folderDir, dataFileName));
                                        _a.label = 8;
                                    case 8:
                                        i++;
                                        return [3 /*break*/, 4];
                                    case 9:
                                        res = entries.map(function (entry) {
                                            // the reason we have _page here it's to filter by name all pages chunks
                                            // inside plugin
                                            return [
                                                "_page." + path_1.default.basename(entry).replace(/(.js|.ts)/i, ""),
                                                entry,
                                            ];
                                        });
                                        resolve(Object.fromEntries(res));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
                case 1:
                    pageEntries = _b.sent();
                    return [2 /*return*/, pageEntries];
            }
        });
    });
}
exports.getPageEntries = getPageEntries;
/**
 * @description get array of sections entry points from src/sections directory, if data files not found
 * it will create empty data files from sectionTemplate.
 */
function getSectionEntries(_a) {
    var sectionsEntry = _a.sectionsEntry;
    return __awaiter(this, void 0, void 0, function () {
        var sectionEntries;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        fs_1.default.access(sectionsEntry, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            var entries, folders, i, folderDir, folderFiles, dataFileName, res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!error) return [3 /*break*/, 2];
                                        return [4 /*yield*/, fs_1.default.mkdirSync(sectionsEntry)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        entries = [];
                                        return [4 /*yield*/, fs_1.default.readdirSync(sectionsEntry)];
                                    case 3:
                                        folders = _a.sent();
                                        folders = folders.filter(function (folderName) {
                                            return /^([a-zA-Z_])/i.test(folderName);
                                        });
                                        i = 0;
                                        _a.label = 4;
                                    case 4:
                                        if (!(i < folders.length)) return [3 /*break*/, 9];
                                        folderDir = path_1.default.join(sectionsEntry, folders[i]);
                                        return [4 /*yield*/, fs_1.default.readdirSync(folderDir)];
                                    case 5:
                                        folderFiles = _a.sent();
                                        dataFileName = folderFiles.find(function (file) {
                                            return /([a-zA-Z_]+)\.data\.(js|ts)/i.test(file);
                                        });
                                        if (!!dataFileName) return [3 /*break*/, 7];
                                        dataFileName = folders[i] + ".data.ts";
                                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(folderDir, dataFileName), section_1.sectionLayer)];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7:
                                        //new entry to array.
                                        entries.push(path_1.default.join(folderDir, dataFileName));
                                        _a.label = 8;
                                    case 8:
                                        i++;
                                        return [3 /*break*/, 4];
                                    case 9:
                                        res = entries.map(function (entry) {
                                            // the reason we have _section here it's to filter by name all sections chunks
                                            // inside plugin
                                            return [
                                                "_section." + path_1.default.basename(entry).replace(/(.js|.ts)/i, ""),
                                                entry,
                                            ];
                                        });
                                        resolve(Object.fromEntries(res));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
                case 1:
                    sectionEntries = _b.sent();
                    return [2 /*return*/, sectionEntries];
            }
        });
    });
}
exports.getSectionEntries = getSectionEntries;
