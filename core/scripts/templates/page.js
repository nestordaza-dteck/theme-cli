"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTemplate = void 0;
exports.pageTemplate = "\n/**\n* @description create page data.\n*/\nexport default (): PageDataFields => {\n return {\n   data: {\n     id: 1,\n     default: true,\n     selected: false,\n     name: \"\",\n     thumbnail: \"\",\n     title: \"\",\n     description: \"\",\n     route: \"/\",\n     withSections:[],\n   },\n };\n};\n";