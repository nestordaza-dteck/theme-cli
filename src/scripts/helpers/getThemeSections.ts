import webpack from "webpack";
import fs from "fs";
import path from "path";

/**
 * @description get theme sections and its validations.
 */
export async function getThemeSections({
  assets,
  outputPath,
}: {
  assets: webpack.StatsAsset[];
  outputPath: string;
}) {
  const modules: SectionModules = assets.map((asset) => {
    return {
      default: require(path.resolve(outputPath, asset.name)).default,
      ...asset,
    };
  });

  const sectionModules = modules.filter((m) => m.name.startsWith("_section"));

  /**
   * @description list of all sections builted.
   */
  let all: Required<SectionDataFields>["data"][] = [];
  /**
   * @description list of validation for all sections.
   */
  let validation: Validation["pages"][0]["sections"] = [];

  //Mount all sections together in an array object.
  for (let i = 0; i < sectionModules.length; i++) {
    if (typeof sectionModules[i].default === "function") {
      //run function
      const result = await sectionModules[i].default();

      //added section to array.
      all.push(result.data);

      //added section validation to array.
      validation.push({
        id: result.data.id,
        name: result.data.name,
        data: result.validation,
      });

      //delete js module.
      await fs.unlinkSync(path.resolve(outputPath, sectionModules[i].name));
    } else {
      return Promise.reject("Data files should be an function.");
    }
  }

  return { all, validation };
}
