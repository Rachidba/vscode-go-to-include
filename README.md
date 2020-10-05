# Includes-navigation

A vscode extension to help you navigate easily through your Hocon includes.
I created this extension for a personal use case, you can easily adapt the codebase to your need/files format.

To downoad the extension: <https://marketplace.visualstudio.com/items?itemName=rachidba.includes-navigation>.

## Features & Usage

- [x] Navigate to the included item with the shortcut: **Crtl+i (Cmd+i on mac)**
- [x] Find all items that include the current file with shortcut: **Crtl+r (Cmd+r on mac)**
- [ ] View the include tree of the current item

## Running the extension locally

- Clone the repository
- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm: watch` to compile the code
  - Run the extension in a new VS Code window
