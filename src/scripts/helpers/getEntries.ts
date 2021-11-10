import fs from "fs";
import path from "path";
import { sectionLayer } from "../layers/section";
import { pageLayer } from "../layers/page";

/**
 * @description get array of pages entry points from src/pages directory, if data files not found
 * it will create empty data files from pageTemplate.
 */
export async function getPageEntries({ pagesEntry }: { pagesEntry: string }) {
    const pageEntries: { [index: string]: string } = await new Promise((resolve) => {
        fs.access(pagesEntry, async (error) => {
            if (error) fs.mkdirSync(pagesEntry);
            //response is an array of entry points with .data for webpack compiler.
            let entries = [];
            let folders = fs.readdirSync(pagesEntry);
            folders = folders.filter((folderName) => /^([a-zA-Z_])/i.test(folderName));

            for (let i = 0; i < folders.length; i++) {
                const folderDir = path.join(pagesEntry, folders[i]);
                const folderFiles = fs.readdirSync(folderDir);

                //try to find .data file
                let dataFileName = folderFiles.find((file) => /([a-zA-Z_]+)\.data\.(js|ts)/i.test(file));

                //page has no ${pageName}.data.(js|ts) file create a new one
                //based on folder name.
                if (!dataFileName) {
                    dataFileName = `${folders[i]}.data.ts`;
                    fs.writeFileSync(path.join(folderDir, dataFileName), pageLayer);
                }
                //new entry to array.
                entries.push(path.join(folderDir, dataFileName));
            }

            //generate object for entry points webpack.
            const res = entries.map((entry) => {
                // the reason we have _page here it's to filter by name all pages chunks
                // inside plugin
                return [`_page.${path.basename(entry).replace(/(.js|.ts)/i, "")}`, entry];
            });

            resolve(Object.fromEntries(res));
        });
    });

    return pageEntries;
}

/**
 * @description get array of sections entry points from src/sections directory, if data files not found
 * it will create empty data files from sectionTemplate.
 */
export async function getSectionEntries({ sectionsEntry }: { sectionsEntry: string }) {
    const sectionEntries: { [index: string]: string } = await new Promise((resolve) => {
        fs.access(sectionsEntry, async (error) => {
            if (error) fs.mkdirSync(sectionsEntry);

            //response is an array of entry points with .data for webpack compiler.
            let entries = [];
            let folders = fs.readdirSync(sectionsEntry);
            folders = folders.filter((folderName) => /^([a-zA-Z_])/i.test(folderName));

            for (let i = 0; i < folders.length; i++) {
                const folderDir = path.join(sectionsEntry, folders[i]);
                const folderFiles = fs.readdirSync(folderDir);

                //try to find .data file
                let dataFileName = folderFiles.find((file) => /([a-zA-Z_]+)\.data\.(js|ts)/i.test(file));

                //section has no ${sectionName}.data.(js|ts) file create a new one
                //based on folder name.
                if (!dataFileName) {
                    dataFileName = `${folders[i]}.data.ts`;
                    fs.writeFileSync(path.join(folderDir, dataFileName), sectionLayer);
                }
                //new entry to array.
                entries.push(path.join(folderDir, dataFileName));
            }

            //generate object for entry points webpack.
            const res = entries.map((entry) => {
                // the reason we have _section here it's to filter by name all sections chunks
                // inside plugin
                return [`_section.${path.basename(entry).replace(/(.js|.ts)/i, "")}`, entry];
            });

            resolve(Object.fromEntries(res));
        });
    });

    return sectionEntries;
}
