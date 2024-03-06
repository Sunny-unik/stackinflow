# Getting Started Guide

## Prerequisite

1. Node installed on your machine.
2. MongoDB URI to connect with Database.
3. Check `extensions.json` file in .vscode directory so me of these extensions are required for maintain code consistency.

## Setup

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the [Stackinflow](https://github.com/Sunny-unik/Stackinflow) to your own GitHub account.
2. Clone the forked repository to your local machine.
3. Create `.env` file and fill environment variables as following written in `.env.example` file.
4. Goto server then run `npm i` to install the dependencies for server
5. Goto server then run `npm i` to install the dependencies for frontend.

## Development

To run development server on your local machine, navigate inside server directory then run:

```shell
npm run watch
```

To run development frontend on your local machine, navigate inside client directory then run:

```shell
npm start
```

## Building

To generate a production-ready version of your code, run:

```shell
npm run build
```

To test production-ready version of your code, run:

```shell
npm start
```
