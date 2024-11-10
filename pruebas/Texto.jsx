import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const TextFromFile = () => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const loadFile = async () => {
      try {
        const asset = Asset.fromModule(require('../assets/DetallesEmocion/feliz.txt'));
        await asset.downloadAsync();
        const content = await FileSystem.readAsStringAsync(asset.localUri);
        setFileContent(content);
      } catch (error) {
        console.error('Error al leer el archivo:', error);
      }
    };

    loadFile();
  }, []);

  return (
    <View>
      <Text>{fileContent}</Text>
    </View>
  );
};

export default TextFromFile;
