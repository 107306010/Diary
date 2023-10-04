# Diary Project
A project that allows you to keep your own diaries.
## Features
to be edited...

## Project Construction
The steps that this project constructed from.

### 1. Frontend set up
### 1.1 Use Vite to create a frontend folder
```bash
$ cd frontend
$ yarn create vite
yarn create v1.22.19
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-vite@4.4.1" with binaries:
      - create-vite
      - cva
? Project name: › vite-project # type `frontend` here
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React # choose React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
? Select a variant: › - Use arrow-keys. Return to submit.
❯   TypeScript # choose TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC
```

That's it, you're done. You can now start the dev server by running `yarn dev`.

### 1.2 install eslint & prettier
```bash
yarn add -D eslint prettier eslint-config-prettier
```

## 1.3 eslint & prettier configuration
run following commands to create a .eslintrc.js file
```bash
$ yarn eslint --init
You can also run this command directly using 'npm init @eslint/config'.
? How would you like to use ESLint? …
  To check syntax only
❯ To check syntax and find problems # choose this one
  To check syntax, find problems, and enforce code style
? What type of modules does your project use? …
❯ JavaScript modules (import/export) # choose this one
  CommonJS (require/exports)
  None of these
? Which framework does your project use? …
❯ React # choose this one
  Vue.js
  None of these
? Does your project use TypeScript? › No / Yes # choose Yes
? What format do you want your config file to be in? …
❯ JavaScript # choose this one
  YAML
  JSON
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser # select this one
✔ Node
```
After answering all the questions, you should see a .eslintrc.js file in your project directory. Open it and change the extends option. The final .eslintrc.js would look like this: (**extends part?)
```json
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "prettier"],
    // "extends": [
    //     "eslint:recommended",
    //     "plugin:@typescript-eslint/recommended",
    //     "plugin:react/recommended"
    // ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
    }
}
```
For prettier, create a `.prettierrc.cjs` file in your project directory and add the following lines:
```javascript
module.exports = {};
```

### 1.4 Add scripts
Add the following lines in the `package.json` file:
```json
{
...
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "lint:fix": "eslint --fix .",
    "format": "prettier --write ."
  }
...
}
```
Now you can run `yarn lint` to check your code style and `yarn lint:fix` to fix some minor issues. You can also run `yarn format` to format your code.


1.2 Backend
-make a backend folder
-yarn init -y
-eslint & prettier settings (a little different from FE)
-install dependencies
-Typescript setup
-create an entry point
-Add scripts to package.json
