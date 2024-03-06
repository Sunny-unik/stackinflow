# Contributing

Thanks for your interest in contributing to Stackinflow.
Contributions are always welcome, no matter how large or small.

If you wish to contribute code, to get started we recommend first reading our [Getting Started Guide](Getting-started-guide.md).

All other documentation for contributors can be found [in the docs directory](./).

## Guidelines

Before contributing, please read the [code of conduct](./code-of-conduct.md) and follow the directions below:

### Recommended Communication Style

1. Always leave screenshots for visual changes.
2. Always leave a detailed description in the Pull Request. Leave nothing ambiguous for the reviewer.
3. Always review your code first. Be sure to run the project locally and test before asking for a review.
4. Always communicate in the GitHub repository. Whether it is in the issue or the pull request, keeping the lines of communication open and visible to everyone on the team helps everyone around you.

### Applying Lint Styleguide

#### To check the code for linting errors, run the following command

```shell
npm run lint
```

To fix the linting errors, run the following command:

```shell
npm run lint:fix
```

These commands use [ESLint](https://eslint.org/) to check and fix the code.

#### To check the code for formatting errors, run the following command

```shell
npm run prettier
```

To fix the formatting errors, run the following command:

```shell
npm run prettier:fix
```

These commands use [Prettier](https://prettier.io/) to check and fix the code.

Linting and formatting errors will also be displayed during development, but won't prevent the code from compiling.

If you forget to run this command, automated pre-commit checks will also run these commands, but the commit will be blocked if there are any errors.

## Pull requests

**_We actively welcome your pull requests, however linking your work to an existing issue is preferred._**

1. Fork the repo as [explained here](./Getting-started-guide.md) and create your branch from the default branch.
2. Name your branch something that is descriptive to the work you are doing. i.e. adds-new-thing or fixes-mobile.
3. If you make visual changes, screenshots are required.
4. If you make the existing code better, please let us know in your PR description.
5. A PR description and title are required. The title is required to begin with: "feat:" or "fix:"
6. [Link to an issue](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls) in the project. Unsolicited code is welcomed, but an issue is required for an announcement your intentions. PR's without a linked issue will be marked invalid and closed.

### PR Titles

Examples for valid PR titles:

- fix: Correct typo.
- feat: Add support for Node 12.
- refactor: Drop support for Node 6.

_Note that since PR titles only have a single line, you have to use the ! syntax for breaking changes._

See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more examples.

## Issues

If you wish to work on an open issue, please get assign yourself to an issue before beginning work on it to avoid conflicts. For assign an issue to yourself comment on the issue `/attempt #issueNumber` to let us know that you want to work on this issue. Maintainer will check that issue is assigned to anyone else if not then maintainer assigned issue to you.

In case you get stuck, please feel free to ask for help in the [Github Discussions](https://github.com/Sunny-unik/Stackinflow/discussions/categories/q-a).
