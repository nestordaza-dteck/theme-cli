/**
 * @description available templates
 */
declare type Template = "Tailwind";

declare interface CLIOptions {
  skipPrompts: boolean;
  /**
   * @description init github flag.
   */
  git: boolean;
  template: Template;
  /**
   * @description install dependencies flag
   */
  templateName: string;
  templateDirectory?: string;
  targetDirectory?: string;
}

declare interface ScriptsOptions {
  env: "development" | "production";
  port: string;
}

declare namespace NodeJS {
  declare interface Process extends NodeJS.Process {
    env: {
      NODE_ENV: ScriptsOptions["env"];
      /**
       * @description where the script/cli is running
       * @example fs.realpathSync(process.cwd())
       */
      APP_DIRECTORY: string;
      /**
       * @description port where the app is running in development server.
       */
      PORT: ScriptsOptions["port"];
      PUBLIC_URL: string;
    };
  }
}
