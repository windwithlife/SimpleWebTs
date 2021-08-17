const withLess = require("next-with-less");
const withPlugins = require("next-compose-plugins");

const plugins = [
    withLess({
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                    "@primary-color": "#c678dd",
                    "@border-radius-base": ".5em"
                }
            }
        }
    })
];

module.exports = withPlugins(plugins, {
    basePath: '/cms',
});
