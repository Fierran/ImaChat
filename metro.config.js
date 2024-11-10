const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('txt'); // Añadir la extensión .txt como activo

module.exports = config;
