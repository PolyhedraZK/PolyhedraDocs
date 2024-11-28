# Polyhedra Network Documentation

This is the English version. If you want Chinese version, refer to [this](./README-zh.md).

## Technical Framework

The project is powered by [Docusaurus](https://docusaurus.io/), which is a convenient and fast `Node`-based framework.

The `docs` folder is the main part of the project, with its hierarchical structure representing the directory structure. The `_category_.json` files specify order and display names, otherwise dictionary order is used by default (this can also be implemented within `***.md` files); the `index.md` file is the documentation for the directory itself, if this file doesn't exist then the directory documentation is considered non-existent; the remaining `***.md` files contain the content of each document.

The `docusaurus.config.ts` file contains homepage information, such as titles, buttons, etc.

Other files follow the `typescript` project structure with no significant differences.

## Local Deployment

For any steps you're unfamiliar with, feel free to ask `ChatGPT`.

1. Register a `github` account and ensure you have permission to view this project.

2. Install `git` locally, with specific instructions varying by operating system. If typing `git` in the command line shows various command descriptions, the installation was successful.

3. Use `git clone https://github.com/PolyhedraZK/PolyhedraDocs` to clone the project locally, which will require your `github` username and password. If non-`ssh` cloning is not allowed, you'll need to configure an `ssh key` locally, export the public key and store it in your `github` account, then use `git clone git@github.com:PolyhedraZK/PolyhedraDocs.git` to clone the project locally, after which you won't need to enter credentials anymore. If you need to use `ssh` to clone projects for multiple accounts, consider giving each `ssh key` an alias, for example using the command `git clone git@github.com-myaccount1:PolyhedraZK/PolyhedraDocs.git`.

4. Install `node`, `npm`, and `yarn` locally, preferably recent versions. The `nvm` tool is recommended for installation as it's excellent for managing `node` versions. Installation instructions depend on your operating system. After successful installation, you can verify each command by typing these words in the command line.

5. Enter the project folder, which should be at the same level as the `README.md` file. Before the first run (and after adding any new third-party libraries, though this should rarely happen in this project), enter `yarn install` to install all required libraries, then just enter `yarn start` to launch the service. After a brief wait, the system will automatically open the page in your browser, and you can then browse freely.

## How to Make Changes

1. Using `git`: After cloning the project, create your own branch with `git branch <branch-name>`, make your changes, add files or folders to be updated using `git add <file-name>`, then `git commit -m "commit reason"` and `git push` to submit. You can then see your branch's update history on `github`, and create a `pull request` to the main branch (or other active branch, depending on your needs) and wait for merge.

2. Without using `git`: Create your branch directly on `github`, then edit files online or upload local files to submit. Afterward, still create a `pull request` to the main branch (or other active branch, depending on your needs) and wait for merge.

Regardless of method, it's best to run the project locally to ensure there are no errors.

Additionally, before submitting, it's recommended to use the `yarn prettier --write ./` command to beautify the code and maintain consistent style.