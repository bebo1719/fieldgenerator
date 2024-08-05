const inquirer = require('inquirer');
const fs = require('fs');

// Questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: input => input ? true : 'Project title cannot be empty.',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
        validate: input => input ? true : 'Description cannot be empty.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
        validate: input => input ? true : 'Installation instructions cannot be empty.',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage information:',
        validate: input => input ? true : 'Usage information cannot be empty.',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
        validate: input => input ? true : 'Contribution guidelines cannot be empty.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions:',
        validate: input => input ? true : 'Test instructions cannot be empty.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: input => input ? true : 'GitHub username cannot be empty.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: input => input ? true : 'Email address cannot be empty.',
    },
];

// License badge links
const licenseBadges = {
    'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'GPLv3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    'None': ''
};

// Generate README content
function generateReadme(answers) {
    return `
# ${answers.title}

${licenseBadges[answers.license]}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
This project is licensed under the ${answers.license} license.

## Questions
If you have any questions about the repository, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.github}](https://github.com/${answers.github}).
`;
}

// Write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README.md has been generated!');
        }
    });
}

// Initialize application
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            const readmeContent = generateReadme(answers);
            writeToFile('README.md', readmeContent);
        })
        .catch((error) => {
            console.error('Error generating README:', error);
        });
}

init();