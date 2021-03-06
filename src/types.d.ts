/**
 * @description available templates
 */
declare type Template = "scratch" | "tailwind";

declare interface CLIOptions {
  /**
   * @description if --yes flag was used to skip prompt.
   */
  skipPrompts: boolean;
  /**
   * @description init github flag.
   */
  git: boolean;
  /**
   * @description name of the template to be used.
   */
  template: Template;
  /**
   * @description install dependencies flag
   */
  projectName: string;
  /**
   * @description folder where  all the templates are located.
   */
  templateDirectory?: string;
  /**
   * @description where the cli is running to create the theme
   * is running.
   */
  targetDirectory?: string;
}

declare interface ScriptsOptions {
  env: "development" | "production";
  port?: string;
  data: boolean;
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
       * @description data inside public folder absolute path.
       */
      APP_PUBLIC_DATA: string;
      /**
       * @description port where the app is running in development server.
       */
      PORT: ScriptsOptions["port"];
      PUBLIC_URL: string;
    };
  }
}

declare type SectionModules = (import("webpack").StatsAsset & {
  default: () => Promise<SectionDataFields>;
})[];

declare type PageModules = (import("webpack").StatsAsset & {
  default: () => Promise<
    PageDataFields & {
      data: {
        /**
         * @description it becomes available while creating pages & removing withSections attribute.
         */
        sections?: WebsiteSection[];
      };
    }
  >;
})[];

declare type GlobalModules = (import("webpack").StatsAsset & {
  default: () => Promise<
    GlobalDataFields & {
      website: {
        /**
         * @description default page (home) is defined when creating global.website.json &
         * config.website.json & validation.website.json at createGlobalData helper.
         */
        page?: WebsitePage;
      };
    }
  >;
})[];
