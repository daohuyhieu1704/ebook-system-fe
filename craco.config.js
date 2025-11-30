const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: ["babel-plugin-styled-components"],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#00A6FF",
              "@border-radius-base": "5px",
              // '@font-size-base': '1rem'
            },
            javascriptEnabled: true,
          },
          sourceMap: true,
        },
      },
    },
  ],
};
