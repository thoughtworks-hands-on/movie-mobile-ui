/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const monorepoPackages = path.resolve(workspaceRoot, 'packages'); // uncomment this line after adding packages and add it in watch folders
const projectNodeModules = path.resolve(projectRoot, 'node_modules');
const nodeModulesPaths = [path.resolve(workspaceRoot, 'node_modules')];

if (fs.existsSync(projectNodeModules)) {
  nodeModulesPaths.push(projectNodeModules);
}

const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
  {
    compact: false,
    sourceMap: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: false, // Revisit for startup time optimisation
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false /* optional */,
    logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
    // source Map generated after obfuscation is not useful right now
    sourceMapLocation:
      './index.android.bundle.map' /* optional  only works if sourceMap: true in obfuscation option */,
  },
);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [__dirname, ...nodeModulesPaths, monorepoPackages],
  ...jsoMetroPlugin,
};

module.exports = config;
