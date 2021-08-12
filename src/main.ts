import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
const { v4 } = require("uuid");

const access = promisify(fs.access);
const copy = promisify(ncp);

function clearThemeName(name: string) {
  return `${name.toLowerCase().replace(/( )/g, "-")}`;
}

/**
 * @description insert declaration files inside theme.
 */
const createDeclarationFiles = async (options: CLIOptions) => {
  try {
    const srcPath = path.join(
      `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
      "src"
    );

    const _DATA_FILE_NAME = "data.d.ts";
    const _PLUGINS_FILE_NAME = "plugins.d.ts";
    const _THEME_FILE_NAME = "theme.d.ts";

    // get declaration files in CLI
    const dataDeclaration = await fs.readFileSync(
      path.join(__dirname, `${_DATA_FILE_NAME}`)
    );
    const pluginDeclaration = await fs.readFileSync(
      path.join(__dirname, `${_PLUGINS_FILE_NAME}`)
    );
    const themeDeclaration = await fs.readFileSync(
      path.join(__dirname, `${_THEME_FILE_NAME}`)
    );

    const declarationListString = {
      [_PLUGINS_FILE_NAME]: pluginDeclaration.toString(),
      [_DATA_FILE_NAME]: dataDeclaration.toString(),
      [_THEME_FILE_NAME]: themeDeclaration.toString(),
    };

    const declarationListStringKeys = Object.keys(declarationListString);

    //loop through all files data.
    for (let i = 0; i < declarationListStringKeys.length; i++) {
      const fileName = declarationListStringKeys[i];

      //create or overide declaration files inside theme.
      await fs.access(srcPath, async (err) => {
        if (err) {
          await fs.mkdirSync(srcPath, { recursive: true });
        }
        await fs.writeFileSync(
          path.join(srcPath, fileName),
          declarationListString[fileName]
        );
      });
    }
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to create declaration files, reason: ${error}`)
    );
  }
};

/**
 * @description set default package.json fields.
 */
async function setPackageInfoDefaults(options: CLIOptions) {
  try {
    const packageJsonPath = path.join(
      `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
      "package.json"
    );
    if (path.join(packageJsonPath, "package.json")) {
      const file = await fs.readFileSync(packageJsonPath);
      let defaultPackageJson = JSON.parse(file.toString());
      defaultPackageJson["name"] = options.projectName;
      defaultPackageJson["description"] = "Describe your theme...";
      defaultPackageJson["author"] = "Soltivo team";
      defaultPackageJson["description"];
      defaultPackageJson["license"] = "ISC";
      defaultPackageJson["version"] = "1.0.0";
      defaultPackageJson["homepage"] = "/";
      defaultPackageJson["private"] = true;
      defaultPackageJson["browserslist"] = [
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions",
      ];
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(defaultPackageJson, null, 2)
      );
    }
  } catch (error) {
    return Promise.reject(
      new Error(
        'Something went wrong while setting up package.json defaults, try to delete the folder and re-run the "create-soltivo-theme".'
      )
    );
  }
}

/**
 * @description create theme .env file .gitignore
 */
async function createInitialFile(options: CLIOptions) {
  try {
    const defaultEnv = {
      THEME_ID: v4(),
      THEME_NAME: options.projectName,
      THEME_GOOGLE_API_KEY: "AIzaSyBb01Bhrc3WVArxaA9H5_X1d5cUINSRZUE",
      THEME_BOOKING_APP_URL: "https://booking.mysoltivo.dev",
    };

    //.env
    await fs.writeFileSync(
      path.join(
        `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
        ".env"
      ),
      Object.keys(defaultEnv)
        .map((key) => `${key}=${defaultEnv[key]}`)
        .toString()
        .replace(/,/g, "\n")
    );

    //.gitignore
    await fs.writeFileSync(
      path.join(
        `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
        ".gitignore"
      ),
      `node_modules/\nbuild/\ndist/\npackage-lock.json\nyarn-lock.json
        `
    );

    await setPackageInfoDefaults(options);
    await createDeclarationFiles(options);
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}

async function copyTemplateFiles(options: CLIOptions) {
  //check if folder already exists and if it has content in it.
  const alreadyExists = await fs.existsSync(
    `${options.targetDirectory}/${clearThemeName(options.projectName)}`
  );
  if (alreadyExists) {
    return Promise.reject(
      new Error("Failed to create project, folder directory already exists.")
    );
  }

  return copy(
    options.templateDirectory,
    `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
    {
      clobber: false,
    }
  );
}

async function initGit(options: CLIOptions) {
  const result = await execa("git", ["init"], {
    cwd: `${options.targetDirectory}/${clearThemeName(options.projectName)}`,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options: CLIOptions) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  // @ts-ignore
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("❌"));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () =>
        copyTemplateFiles(options).catch((error) => {
          console.error(`%s ${error}`, chalk.red.bold("❌"));
          process.exit(1);
        }),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: "Creating initial files",
      task: () => createInitialFile(options),
      enabled: () => true,
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: `${options.targetDirectory}/${clearThemeName(
            options.projectName
          )}`,
        }),
      enabled: () => true,
    },
  ]);

  await tasks.run();

  console.log(
    `\n\n%s\n\n%s\n\n%s\n\n%s\n\n%s\n\n`,
    chalk.green.bold("✅ Project template was created successfully."),
    `🔷 Run ${chalk.blueBright.bold(
      `cd ${clearThemeName(options.projectName)}`
    )} to enter your project directory`,
    `🔷 Run ${chalk.blueBright.bold("yarn start")} or ${chalk.blueBright.bold(
      "npm run start"
    )} to start the development server.`,
    `🔷 Run ${chalk.blueBright.bold("yarn build")} or ${chalk.blueBright.bold(
      "npm run build"
    )} to build a production version of your project.`,
    chalk.blueBright.bold(`🔥 Make something beutiful.`)
  );

  return true;
}
