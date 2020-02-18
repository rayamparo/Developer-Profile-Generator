const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = [
    {
        name: "username",
        message: "What is your GitHub username?",
        type: "input",
        default: 'rayamparo'
    },
    {
        name: "project",
        message: "What is your project name?",
        type: "input",
        default: 'Senpai'
    },
    {
        name: "description",
        message: "Please write a short description of your project",
        type: "input",
        default: "Senpais are better than kohais"
    },
    {
        name: "licenses",
        message: "What kind of license should your project have?",
        type: "list",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
        default: "MIT"
    },
    {
        name: "install",
        message: "What command should be run to install dependencies?",
        type: "input",
        default: "npm install"
    },
    {
        name: "toc",
        message: "What would you like to include in your table of contents?",
        type: "checkbox",
        choices: ["Installation", "Usage", "Licenses", "Contributing", "Tests", "Questions"],
        default: ["Installation", "Usage", "Licenses", "Contributing", "Tests", "Questions"]
    },
    {
        name: "tests",
        message: "What command should be run to run tests?",
        type: "input",
        default: "npm test"
    },
    {
        name: "repo",
        message: "What does the user need to know about using the repo?",
        type: "input",
        default: "Nothing"
    },
    {
        name: "contribute",
        message: "What does the user need to know about contributing to the repo?",
        type: "input",
        default: "A master programmer"
    }
];

function writeToFile(content) {
    fs.writeFile("README.md", content, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log("Saved!");
        };
    });
};




function init() {
    inquirer.prompt(questions)
        .then(response => {
            console.log(response);




            const queryUrl = `https://api.github.com/users/${response.username}`;

            axios.get(queryUrl).then(function (res) {
                let badge = response.licenses === 'MIT' ? 'https://img.shields.io/badge/license-MIT-blue.svg' : response.licenses === 'APACHE 2.0' ?
                    'https://img.shields.io/badge/License-Apache%202.0-blue.svg' : response.licenses === 'GPL 3.0' ? 'https://img.shields.io/badge/License-GPLv3-blue.svg'
                        : response.licenses === 'BSD 3' ? 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg' : 'https://img.shields.io/badge/license-Unlicense-blue.svg'

                let toc = '';
                response.toc.map(item => toc += `* [${item}](#${item.toLowerCase()})\n\n`)

                let content = `
# ${response.project}
[![GitHub license](${badge})](${res.data.html_url})
                
## Table of Contents
${toc}

## Project:

${response.project}

## Description:

${response.description}

## Licenses:
${response.licenses}

## Installation:

${response.install}

## Tests:

${response.tests}

## Repo:

${response.repo}

## Contributing:

${response.contribute}

## User Info:
        
<img src="${res.data.avatar_url}"/>
                `
                //.catch(err=>console.log(err));
                writeToFile(content)
            })

        });
};

init();
