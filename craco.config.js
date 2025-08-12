const CracoLessPlugin = require("craco-less")

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // Light Theme Variables (default)
              "@primary-color": "#238D94", // Teal/Green for primary actions and highlights
              "@link-color": "#238D94",
              "@success-color": "#238D94", // Use primary accent for success indicators
              "@warning-color": "#FFC107",
              "@error-color": "#FF4D4F",
              "@font-size-base": "16px",
              "@heading-color": "#0F141E", // Darkest blue/black for headings
              "@text-color": "#192335", // Dark blue for general text
              "@text-color-secondary": "#192335", // Dark blue for secondary text
              "@border-radius-base": "8px",
              "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.09)",
              "@card-shadow": "0 4px 12px rgba(0, 0, 0, 0.08)",
              "@layout-header-background": "#F8FAFC", // Light background
              "@layout-body-background": "#F8FAFC", // Light background
              "@layout-footer-background": "#0F141E", // Darkest blue/black for footer
              // Note: Ant Design's darkAlgorithm will automatically adjust these for dark mode.
              // If specific dark mode colors are needed beyond the algorithm, they would be defined
              // within the ConfigProvider's theme token or component overrides.
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
