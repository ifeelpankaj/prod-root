export default {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'Initial', // For initial commit 
                'feat',    // Introduces a new feature
                'fix',     // Fixes a bug
                'docs',    // Documentation changes only
                'style',   // Code style changes (e.g., formatting, missing semicolons, etc.)
                'refactor',// Code changes that neither fix a bug nor add a feature
                'perf',    // Performance improvements
                'test',    // Adding or updating tests
                'build',   // Changes to the build system or external dependencies
                'ci',      // Changes to CI configuration files/scripts
                'chore',   // Other changes that don't modify src or test files
                'revert'   // Reverts a previous commit
            ]
        ],
        'subject-case': [2, 'always', 'sentence-case'], // Ensure the subject is in sentence case
        'type-case': [2, 'always', 'lower-case']       // Ensure the type is in lowercase
    }
};


// 'feat',    // Introduces a new feature
// 'fix',     // Fixes a bug
// 'docs',    // Documentation changes only
// 'style',   // Code style changes (e.g., formatting, missing semicolons, etc.)
// 'refactor',// Code changes that neither fix a bug nor add a feature
// 'perf',    // Performance improvements
// 'test',    // Adding or updating tests
// 'build',   // Changes to the build system or external dependencies
// 'ci',      // Changes to CI configuration files/scripts
// 'chore',   // Other changes that don't modify src or test files
// 'revert'   // Reverts a previous commit