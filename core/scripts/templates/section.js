"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionTemplate = void 0;
exports.sectionTemplate = "/**\n* @description create section data.\n*/\nexport default (): Required<SectionDataFields> => {\n return {\n   data: {\n     data: {},\n     default: true,\n     id: 1,\n     name: \"\",\n     selected: false,\n   },\n   validation: {},\n };\n};\n";
