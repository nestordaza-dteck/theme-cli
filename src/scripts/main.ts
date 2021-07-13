import chalk from "chalk";
import execa from "execa";
import path from "path";
// @ts-ignore
import Listr from "listr";
import fs from "fs";

//set environment
export function setEnvironmentVariables(options: ScriptsOptions) {
  process.env.NODE_ENV = options.env;
  process.env.APP_DIRECTORY = fs.realpathSync(process.cwd());
  process.env.APP_PUBLIC_DATA = path.join(
    process.env.APP_DIRECTORY,
    "public/assets/data"
  );
  process.env.PORT = options.port || "8080";
}

export async function getDataFiles(options: ScriptsOptions) {
  //frontend webpack configuration
  const dataConfigPath = path.join(__dirname, "webpack.data.js");
  //node_modules from the cli to execute.
  const webpackCliPath = path.join(
    __dirname,
    "../../node_modules/.bin/webpack"
  );

  //command args to run based on environment.
  const runArgs = ["--config", dataConfigPath];

  return await execa(`${webpackCliPath}`, runArgs, {
    cwd: process.cwd(),
  });

  // await createGlobal(options);
}

export async function runScripts(options: ScriptsOptions) {
  return await getDataFiles(options);
  // //frontend webpack configuration
  // const browserConfigPath = path.join(__dirname, "webpack.browser.js");
  // //node_modules from the cli to execute.
  // const webpackCliPath = path.join(
  //   __dirname,
  //   "../../node_modules/.bin/webpack"
  // );

  // //command args to run based on environment.
  // const runArgs =
  //   options.env === "development"
  //     ? ["serve", "--config", browserConfigPath, "--hot", "--open"]
  //     : ["--config", browserConfigPath, "--mode", options.env];

  // return await execa(`${webpackCliPath}`, runArgs, {
  //   cwd: process.cwd(),
  // });
}

export async function run(options: ScriptsOptions) {
  //set environment variables.
  setEnvironmentVariables(options);

  const tasks = new Listr([
    {
      title:
        options.env === "development"
          ? chalk.blueBright.bold(
              `Running in development mode at http://localhost:${process.env.PORT}.`
            )
          : chalk.blueBright.bold("Building production."),
      task: () =>
        runScripts(options)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(`%s ${error}`, chalk.red.bold("❌"));
            process.exit(1);
          }),
      enabled: () => true,
    },
  ]);

  await tasks.run();
  return true;
}
