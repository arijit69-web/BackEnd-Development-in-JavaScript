## Module pattern in NodeJS
 The module is a mechanism for splitting the JS programs into separate manageable chunks called modules, that can be imported whenever needed. Modules are the blocks of encapsulated code that communicate with an external application on the basis of their related functionality. Modules can be a single file or a collection of multiple files/folders. The reason programmers are heavily reliant on modules is because of their reusability as well as the ability to break down a complex piece of code into manageable chunks. 

 In order to prepare this module in NodeJS we have two mechanisms:
 - [CJS (CommonJS Module)](./CJS-Demo/)
 - [ESM (ES6 modules)](./ESM-Demo/)


By default, Node.js will treat the following as CommonJS modules:

- Files with a .cjs extension;

- Files with a .js extension when the nearest parent package.json file contains a top-level field "type" with a value of "commonjs".

- Files with a .js extension when the nearest parent package.json file doesn't contain a top-level field "type". Package authors should include the "type" field, even in packages where all sources are CommonJS. Being explicit about the type of the package will make things easier for build tools and loaders to determine how the files in the package should be interpreted.

- Files with an extension that is not .mjs, .cjs, .json, .node, or .js (when the nearest parent package.json file contains a top-level field "type" with a value of "module", those files will be recognized as CommonJS modules only if they are being included via require(), not when used as the command-line entry point of the program).

- Authors can tell Node.js to use the ECMAScript modules loader via the .mjs file extension, the package.json "type" field, or the --input-type flag. Outside of those cases, Node.js will use the CommonJS module loader. See Determining module system for more details.


- **Named Export** -> Whatever naming is given in the corresponding module u import it with the same name and if it is a difficult name u give it an alias.

- **Default Export** -> When you import it, you can import it with any name or same name.

- **NPM (Node Package Manager)** is the default package manager for Node.js and is written entirely in Javascript. NPM manages all the packages and modules for Node.js and consists of command line client npm. It gets installed into the system with installation of Node.js. The required packages and modules in Node project are installed using NPM.
A package contains all the files needed for a module and modules are the JavaScript libraries that can be included in Node project according to the requirement of the project.
NPM can install all the dependencies of a project through the package.json file. It can also update and uninstall packages. In the package.json file, each dependency can specify a range of valid versions using the semantic versioning scheme, allowing developers to auto-update their packages while at the same time avoiding unwanted breaking changes.

- **package.json** -> The package. json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package. The file provides the npm package manager with various information to help identify the project and handle dependencies.

- **package-lock.json** -> It stores an exact, versioned dependency tree rather than using starred versioning like package.json itself (e.g. 1.0.*). This means you can guarantee the dependencies for other developers or prod releases, etc. It also has a mechanism to lock the tree but generally will regenerate if package.json changes. package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

- **node_modules** -> The node_modules folder contains every installed dependency for your project. In most cases, you should not commit this folder into your version controlled repository. As you install more dependencies, the size of this folder will quickly grow. Furthermore, the package-lock.json file keeps a record of the exact versions installed in a more succinct way, so including node_modules is not necessary. While the package.json file lists dependencies that tell us the suitable versions that should be installed for the project, the package-lock.json file keeps track of all changes in package.json or node_modules and tells us the exact version of the package installed. You usually commit this to your version controlled repository instead of node_modules, as it’s a cleaner representation of all your dependencies.

</br>
</br>

### Configuring ES6 Module | CommonJS module
If we keep the type as `module`  inside the `package.json` file then the whole folder where the package.json is present i.e. `Project`. The entire `Project` folder will be enabled with the ES6 Module. If we keep the type as `commonjs`  inside the `package.json` file then the whole folder where the package.json is present i.e. `Project`. The entire `Project` folder will be enabled with the CommonJS Module. By default, it is set as CommonJS Module.

- `package.json` file [ES6 Module]
```
{
  "name": "telegrambot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Arijit Sarkar",
  "license": "ISC",
  "type": "module"
}
```

- `package.json` file [CommonJS module]

```
{
  "name": "telegrambot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Arijit Sarkar",
  "license": "ISC",
  "type": "commonjs"
}
```

</br>
</br>

## Top-level await

You can use the await keyword on its own (outside of an async function) at the top level of a module. This means that modules with child modules that use await will wait for the child modules to execute before they themselves run, all while not blocking other child modules from loading. Top-level await enables developers to use the await keyword outside of async functions. It acts like a big async function causing other modules who import them to wait before they start evaluating their body.

**The old behavior**

When async/await was first introduced, attempting to use an await outside of an async function resulted in a SyntaxError. Many developers utilized immediately-invoked async function expressions as a way to get access to the feature.

```
await Promise.resolve(console.log('🎉'));
// → SyntaxError: await is only valid in async function

(async function() {
  await Promise.resolve(console.log('🎉'));
  // → 🎉
}());
```
**The new behavior**

With top-level await, the above code instead works the way you’d expect within modules:

```
await Promise.resolve(console.log('🎉'));
// → 🎉
```

>> Note: Top-level await only works at the top level of modules. There is no support for classic scripts or non-async functions.

>> Note: If you want to use **CommonJS module** syntax inside an **ES-6 module** package, set the file extension as `.cjs`.