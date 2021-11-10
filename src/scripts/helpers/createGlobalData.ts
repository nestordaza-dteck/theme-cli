import webpack from "webpack";
import fs from "fs";
import path from "path";

export async function createGlobalData({
    assets,
    outputPath,
    pages,
}: {
    assets: webpack.StatsAsset[];
    outputPath: string;
    pages: { all: WebsitePage[]; validation: Validation["pages"] };
}) {
    const modules: GlobalModules = assets.map((asset) => {
        return {
            default: require(path.resolve(outputPath, asset.name)).default,
            ...asset,
        };
    });

    //get global file under src/data
    const globalModule = modules.find((m) => m.name.startsWith("_global"));

    if (typeof globalModule.default === "function") {
        //run function
        let result = await globalModule.default();

        //define default (homepage).
        result.website.page = pages.all.find((page) => page.route === "/");

        //config.website.json
        const configWebsiteJson = JSON.stringify(result.configuration, null, 2);

        //validation.website.json
        const themeValidationMerge: Validation = {
            ...result.validation,
            pages: pages.validation,
        };
        const validationWebsiteJson = JSON.stringify(themeValidationMerge, null, 2);

        //global.website.json
        const globalWebsiteJson = JSON.stringify(result.website, null, 2);

        //access public data path, if it fails it will create an directory full path,
        //and finally create a json file with the theme data.
        fs.access(process.env.APP_PUBLIC_DATA, async (err) => {
            if (err) {
                fs.mkdirSync(process.env.APP_PUBLIC_DATA, { recursive: true });
            }
            fs.writeFileSync(path.join(process.env.APP_PUBLIC_DATA, `config.website.json`), configWebsiteJson);
            fs.writeFileSync(path.join(process.env.APP_PUBLIC_DATA, `validation.website.json`), validationWebsiteJson);
            fs.writeFileSync(path.join(process.env.APP_PUBLIC_DATA, `global.website.json`), globalWebsiteJson);
        });

        //delete js module after generate json file in public folder.
        fs.unlinkSync(path.resolve(outputPath, globalModule.name));
    } else {
        return Promise.reject("Data files should be an function.");
    }
}
