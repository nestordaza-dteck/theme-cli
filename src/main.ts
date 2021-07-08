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
 * @description set default package.json fields.
 */
async function setPackageInfoDefaults(options: CLIOptions) {
  try {
    const packageJsonPath = path.join(
      `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
      "package.json"
    );
    if (path.join(packageJsonPath, "package.json")) {
      const file = await fs.readFileSync(packageJsonPath);
      let defaultPackageJson = JSON.parse(file.toString());
      defaultPackageJson["name"] = options.templateName;
      defaultPackageJson["description"] = "Describe your theme...";
      defaultPackageJson["author"] = "Soltivo team";
      defaultPackageJson["description"];
      defaultPackageJson["license"] = "ISC";
      defaultPackageJson["version"] = "1.0.0";
      defaultPackageJson["homepage"] = "/";
      defaultPackageJson["private"] = true;
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
    const defaultEnv = [
      {
        THEME_ID: v4(),
        THEME_NAME: options.templateName,
        THEME_GOOGLE_API_KEY: "AIzaSyBb01Bhrc3WVArxaA9H5_X1d5cUINSRZUE",
        THEME_BOOKING_APP_URL: "https://booking.mysoltivo.dev",
      },
    ];

    //.env
    await fs.writeFileSync(
      path.join(
        `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
        ".env"
      ),
      Object.keys(defaultEnv)
        .map((key) => {
          `${key}=${defaultEnv[key]}`;
        })
        .toString()
        .replace(/,/g, "\n")
    );

    if (options.git) {
      //.gitignore
      await fs.writeFileSync(
        path.join(
          `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
          ".gitignore"
        ),
        `node_modules/\nbuild/\ndist/
        `
      );
    }

    await setPackageInfoDefaults(options);
  } catch (error) {
    return Promise.reject(new Error(error));
  }
}

async function copyTemplateFiles(options: CLIOptions) {
  //check if folder already exists and if it has content in it.
  const alreadyExists = await fs.existsSync(
    `${options.targetDirectory}/${clearThemeName(options.templateName)}`
  );
  if (alreadyExists) {
    return Promise.reject(
      new Error("Failed to create project, folder directory already exists.")
    );
  }

  return copy(
    options.templateDirectory,
    `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
    {
      clobber: false,
    }
  );
}

async function initGit(options: CLIOptions) {
  const result = await execa("git", ["init"], {
    cwd: `${options.targetDirectory}/${clearThemeName(options.templateName)}`,
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
            options.templateName
          )}`,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined,
    },
  ]);

  await tasks.run();
  console.log("%s Project ready", chalk.green.bold("✅"));
  return true;
}
