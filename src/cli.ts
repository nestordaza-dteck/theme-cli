import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs: string[]) {
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
    projectName: args._[1] as string,
  };
}

async function promptForMissingOptions(
  options: CLIOptions
): Promise<CLIOptions> {
  //get the name of the folder running the cli
  const splitPath = process.cwd().split(/\//);
  const folderName = splitPath[splitPath.length - 1];

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
  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Please provide a name for your project",
      filter: (ans: string) => {
        const test = ans.length > 0 && !/[0-9 ]/g.test(ans);
        if (!test) {
          throw new Error("Name must not have numbers or space.");
        }
        return ans;
      },
    });
  }

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
    projectName: options.projectName || answers.projectName,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
