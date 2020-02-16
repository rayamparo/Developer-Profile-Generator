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
   
};




function init() {
    inquirer.prompt(questions)
    .then(response =>{
        let content="";
        console.log(response);
        
        content += `# Node.js \n`
        content += `## Table of Contents \n
        1.) Project \n
        2.) Description \n
        3.) Licenses \n
        4.) Install \n
        5.) Tests \n
        6.) Repo \n
        7.) Contribute \n`
        content += `## Project: \n
        ${response.project} \n`
        content += `## Description: \n
        ${response.description}`
        content += `## Licenses: \n
        ${response.licenses} \n`
        content += `## Install: \n
        ${response.install} \n`
        content += ` ##Tests: \n
        ${response.tests} \n`
        content += `## Repo: \n
        ${response.repo} \n `
        content +=`## Contribute: \n
        ${response.contribute} \n`
        
        fs.writeFile("README.md", content, function(err){
            if(err){
                throw err;
            }
            else{
                console.log("Saved!");
            };
        });
        
        const queryUrl = `https://api.github.com/users/${response.usernam}`;
        axios.get(queryUrl).then(data =>{return data}).catch(err=>console.log(err));
      
    });
};

init();
