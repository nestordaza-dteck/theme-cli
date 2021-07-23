import { Compiler } from "webpack";
import { createPagesData } from "../helpers/createPagesData";
import { getThemeSections } from "../helpers/getThemeSections";
import { createGlobalData } from "../helpers/createGlobalData";
/**
 * @description it gets the data from sections, pages and global and creates the json data
 * inside theme's public folder project.
 */
export class RetriveThemeData {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap("RetriveThemeData", async (stats) => {
      const { outputPath, assets } = stats.toJson();

      // get all available sections from theme directory under:
      // ${projectDir}/src/sections/${sectionName}/${sectionName}.data.ts|js
      const sections = await getThemeSections({ assets, outputPath });
      // create pages.data.json and retrive it.
      const pages = await createPagesData({
        assets,
        outputPath,
        sections,
      });
      // create validation, config, and global json files.
      await createGlobalData({
        assets,
        outputPath,
        pages: pages,
      });
    });
  }
}
