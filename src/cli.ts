import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const splitPath = process.cwd().split(/\//);
  // the name of the folder running the cli
  const folderName = splitPath[splitPath.length - 1];

  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "-g": "--git",
      "-y": "--yes",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0] as Template,
    templateName: (args._[1] || folderName) as string,
  };
}

async function promptForMissingOptions(
  options: CLIOptions
): Promise<CLIOptions> {
  /**
   * @description list of available templates to be prompt
   */
  const availableTemplates: Readonly<Template[]> = Object.freeze([
    "scratch",
    "tailwind",
  ]);
  const defaultTemplate: Template = "scratch";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: availableTemplates,
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
