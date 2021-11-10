import webpack from "webpack";
import fs from "fs";
import path from "path";

type PagesData = (PageDataFields & {
    data: {
        sections?: WebsiteSection[];
    };
})["data"][];

/**
 * @description creates pages.website.json array.
 */
export async function createPagesData({
    assets,
    outputPath,
    sections = {
        all: [],
        validation: [],
    },
}: {
    assets: webpack.StatsAsset[];
    outputPath: string;
    sections: {
        all: Required<WebsiteSection>[];
        validation: Validation["pages"][0]["sections"];
    };
}) {
    const modules: PageModules = assets.map((asset) => {
        return {
            default: require(path.resolve(outputPath, asset.name)).default,
            ...asset,
        };
    });

    const pagesModules = modules.filter((m) => m.name.startsWith("_page"));

    /**
     * @description list of pages builted.
     */
    const {
        all,
        validation,
    }: {
        all: Omit<Required<PagesData[0]>, "withSections">[];
        validation: Validation["pages"];
    } = await new Promise(async (resolve) => {
        let pages: PagesData = [];
        let validation: Validation["pages"] = [];
        //Mount all pages together in an array object.
        for (let i = 0; i < pagesModules.length; i++) {
            if (typeof pagesModules[i].default === "function") {
                //run function
                const result = await pagesModules[i].default();

                /**
                 * withSections should contain a array with sections name. string[]
                 * also this is done like this so the order of withSections attribute
                 * matters.
                 */
                const foundSections = result.data.withSections
                    .map((sectionName) => {
                        return sections.all.find((s) => s.name === sectionName);
                    })
                    .filter((s) => s !== null);

                /**
                 * get each used section's validation.
                 */
                const sectionsValidation = sections.validation.filter((section) => result.data.withSections.includes(section.name));

                //create section array.
                result.data.sections = foundSections;
                //delete withSections attribute.
                delete result.data.withSections;
                //added page to array.
                pages.push(result.data);

                //added validation to page validation array
                validation.push({
                    id: result.data.id,
                    sections: sectionsValidation,
                });

                //delete js module after generate json file in public folder.
                fs.unlinkSync(path.resolve(outputPath, pagesModules[i].name));
            } else {
                return Promise.reject("Data files should be an function.");
            }
        }

        resolve({
            all: pages as Omit<Required<PagesData[0]>, "withSections">[],
            validation: validation,
        });
    });

    // will later on be inserted in public/assets/data/pages.website.json
    const jsonResult = JSON.stringify(all, null, 2);

    //access public data path, if it fails it will create an directory full path,
    //and finally create a json file with the theme data.
    fs.access(process.env.APP_PUBLIC_DATA, async (err) => {
        if (err) fs.mkdirSync(process.env.APP_PUBLIC_DATA, { recursive: true });
        fs.writeFileSync(path.join(process.env.APP_PUBLIC_DATA, `pages.website.json`), jsonResult);
    });

    return { all, validation };
}
