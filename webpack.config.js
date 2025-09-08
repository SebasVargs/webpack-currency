const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // El archivo de entrada
  entry: './src/index.js',
  
  // El archivo de salida
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
  // Configuración del servidor de desarrollo
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
    hot: true,
  },
  
  // Modo de desarrollo para mejor depuración
  mode: 'development',
  
  // Reglas de los loaders
  module: {
    rules: [
      {
        test: /\.scss$/,  // Busca archivos con extensión .scss
        use: [
          'style-loader',    // Inyecta el CSS en el DOM
          'css-loader',      // Carga el CSS
          'sass-loader',     // Compila los archivos SCSS a CSS
        ],
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
