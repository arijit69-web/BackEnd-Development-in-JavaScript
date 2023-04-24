# Making an NPM package and publishing it in NPM

## Building the package

- Create a folder with the name of the package.
- Create a `package.json` file with `npm init` command.
- Create a `index.js` file with the code.

> Preparing the package for publishing to NPM. Here is the package structure:

```bash
Algorithms  DataStructures  index.js  package.json README.md
```

- `index.js` is the entry point of the package.
- `package.json` contains the meta data of the package.
- folders `Algorithms` and `DataStructures` contains the code of the package.

> The folders Algorithms & DataStructures consist of the code that is exported in the `index.js` file.

> The `Algorithms` folder consists of the code for the algorithms. Lets say we have the folder structure as follows:

```bash
Algorithms
├── binarysearch.js
├── bubblesort.js
├── insertionsort.js
├── linearsearch.js
├── mergesort.js
├── quicksort.js
├── selectionsort.js
└── index.js
```

> The `DataStructures` folder consists of the code for the data structures. Lets say we have the folder structure as follows:

```bash
DataStructures
├── binarysearchtree.js
├── graph.js
├── linkedlist.js
├── queue.js
├── stack.js
├── heap.js
└── index.js
```

> The individual folder can have an index.js file that has the named exports for the files in the folder.

## Publish the package to [NPM](https://www.npmjs.com/)

```bash
- npm login
- npm publish
```

## Update & Publish the package to [NPM](https://www.npmjs.com/)

- Update the CodeBase
- Change the `version` data in the package.json file

```bash
- npm login
- npm publish
```

## Using the package

- Install the package using `npm install <package-name>`
- Import the package in the code using `const <package-name> = require('<package-name>')`
- Use the package in the code using `<package-name>.<module-name>.<function-name>`
