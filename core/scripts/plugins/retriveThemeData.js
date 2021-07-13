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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetriveThemeData = void 0;
var createPagesData_1 = require("../helpers/createPagesData");
var getThemeSections_1 = require("../helpers/getThemeSections");
var createGlobalData_1 = require("../helpers/createGlobalData");
/**
 * @description it gets the data from sections, pages and global and creates the json data
 * inside theme's public folder project.
 */
var RetriveThemeData = /** @class */ (function () {
    function RetriveThemeData() {
    }
    RetriveThemeData.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.done.tapAsync("Example", function (stats) { return __awaiter(_this, void 0, void 0, function () {
            var _a, outputPath, assets, sections, pages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = stats.toJson(), outputPath = _a.outputPath, assets = _a.assets;
                        return [4 /*yield*/, getThemeSections_1.getThemeSections({ assets: assets, outputPath: outputPath })];
                    case 1:
                        sections = _b.sent();
                        return [4 /*yield*/, createPagesData_1.createPagesData({
                                assets: assets,
                                outputPath: outputPath,
                                sections: sections,
                            })];
                    case 2:
                        pages = _b.sent();
                        // create validation, config, and global json files.
                        return [4 /*yield*/, createGlobalData_1.createGlobalData({
                                assets: assets,
                                outputPath: outputPath,
                                pages: pages,
                            })];
                    case 3:
                        // create validation, config, and global json files.
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return RetriveThemeData;
}());
exports.RetriveThemeData = RetriveThemeData;
