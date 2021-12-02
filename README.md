# SOLTIVO-THEME-CLI

create-soltivo-theme is an CLI which allows you to setup, manager, develop your soltivo themes.

# How to use it.

Once installed you will be able to run, `create-soltivo-theme` under any directory, after that you will be prompted with a few questions.

-   choose your project name. _required_,_string_.
-   choose the template.
    -   you will be able to select from a list only the available templates.
-   init or not the git init in the project repository.

After you went through the questions the cli will create a new folder where the cli is running with your project name and install all dependencies of packages.

You can test your project inside the folder by running `yarn start` or `npm run start`, to start the development server, after a few seconds you should see a browser window open with your template.

### Scripts

by default all templates will come with a few scripts inside `package.json`.

-   start
    -   it should start the server in `http://localhost:${process.env.PORT}`
-   data
    -   it should start watching for data changes.
-   build
    -   it should build your theme for productions creating two folders under `dist`, `dist/browser` and `dist/server`.

### Project structure

After running the cli for create a project you will get a structure for your theme, but it is important to know you cannot move the following folders and its files inside.

#### src/data

This folder contains the entry point of data containing two files:

-   `global.data.ts`: this contains the global data of your website like, `general`, `nav`, `footer`, `colors`, `font` of your theme, it also contains validation for and configuration for the theme.
-   `website.context.ts`: this is a normal react context, it contains the _WebsiteData_ of your project.

**IMPORTANT**: you cannot rename/remove `global.data.ts`.

#### src/pages

For better structure of the theme and understanding of it, we insert all pages at the top level of the `src` folder, this makes it easier to manager your pages through the app.

Also all pages folders have the following files:

-   `${pageName}.tsx`: this is just a normal react component, normally it has some configuration inside too.
-   `${pageName}.data.ts`: this is the data of this specific page.

**NOTE**: you can also add other files for styles or helpers if you want inside this folder.

**IMPORTANT**: you cannot rename/remove `.data.` from `${pageName}.data.ts`.

#### src/sections

Same as pages you have sections folder at the top level of `src` folder contaning a very similar structure to pages.

Also all sections folders have the following files:

-   `${sectionName}.tsx`: this is just a normal react component.
-   `${sectionName}.data.ts`: this is the data of this specific section.

**NOTE**: you can also add other files for styles or helpers if you want inside this folder.

**IMPORTANT**: you cannot rename/remove `.data.` from `${sectionName}.data.ts`.

#### src/routes

This is where we recommend you to setup you react routes, we are using `react-router-dom`, this folder contains normally only one file named `routes.tsx` containing all the routes for the application.

#### src/components

We also recommend you to create your components at the top level of `src` folder instead of creating inside pages and sections folders.

#### src/assets

You can use this folder for assets like, styles, images, icons, json etc, it is also recommend to use this folder at the top level of `src` folder.

# .env file

This is a required file because we have some important data for building the theme inside of it, you can also define custom `process.env` variables like so:

-   `THEME_MY_VARIABLE` ✅
-   `MY_VARIABLE` ❌

Required enviroment variables:

-   `THEME_ID`: theme id using uuiv4.
-   `THEME_NAME`: name of your project and it is equal to `package.json` name attribute.
-   `THEME_GOOGLE_API_KEY`: Provided by soltivo a public key for google apis.
-   `THEME_BOOKING_APP_URL`: Url for soltivo booking application.

# A few last notes

-   The files `src/app.tsx` and `src/server.tsx` are both entry points for server and browser build, we do not recommend you to change these files unless you know what you are doing, but the main reason for this warning is because the server may not like your changes, and for production we all themes are SSR and not CSR.

-   If you want to change the `src/index.tsx` you should keep in mind the `@soltivo/theme-library` open function is already taking care of the base setup for the react rendering methods for _hidrate(production)_ and _render(development)_.
