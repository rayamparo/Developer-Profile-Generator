const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = [
    {
        name: "username",
        message: "What is your GitHub username?",
        type: "input"
    },
    {
        name: "project",
        message: "What is your project name?",
        type: "input"
    },
    {
        name: "description",
        message: "Please write a short description of your project",
        type: "input"
    },
    {
        name: "licenses",
        message: "What kind of license should your project have?",
        type: "list",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        name: "install",
        message: "What command should be run to install dependencies?",
        type: "input"
    },
    {
        name: "tests",
        message: "What command should be run to run tests?",
        type: "input"
    },
    {
        name: "repo",
        message: "What does the user need to know about using the repo?",
        type: "input"
    },
    {
        name: "contribute",
        message: "What does the user need to know about contributing to the repo?",
        type: "input"
    }
];

function writeToFile(fileName, data){
    console.log(`${fileName}.md`);
    console.log(data);
}

