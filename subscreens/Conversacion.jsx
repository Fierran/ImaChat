import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { conversaciones } from '../assets/datos/Conversacion';
import { ConversacionD } from '../assets/datos/ConversacionD';

import { EmotionDetail } from './EmotionDetail';

export function Conversacion() {
    const insets = useSafeAreaInsets();
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [emotionInfo, setEmotionInfo] = useState('');

  const handleEmotionSelect = async (emotion) => {
    setSelectedEmotion(emotion);

    try {
      // Cargar el archivo de texto correspondiente a la emoción seleccionada
      const asset = Asset.fromModule(ConversacionD[emotion.label]);
      await asset.downloadAsync();
      const content = await FileSystem.readAsStringAsync(asset.localUri);
      setEmotionInfo(content);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      setEmotionInfo('No se pudo cargar la información.');
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom, backgroundColor: "#FFF8E8" }}>
      <StatusBar style="dark" />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.Title}>Quiero hablar de</Text>
      </View>
      {selectedEmotion ? (
        // Si hay una emoción seleccionada, muestra su información
        <EmotionDetail
          emotion={{ ...selectedEmotion, info: emotionInfo }}
          onBack={() => {
            setSelectedEmotion(null);
            setEmotionInfo('');
          }}
        />
      ) : (
        // Si no hay emoción seleccionada, muestra la lista de emociones
        <FlatList
          data={conversaciones}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleEmotionSelect(item)}>
              <View>
                <Image style={styles.image} source={{ uri: item.uri }} />
                <Text style={styles.text}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Title:{
        color: "#674636",
        marginTop: "5%",
        fontSize: 30,
        fontWeight:"bold",
        textAlign: "center"
      },
      image : {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf:"center"
      },
      text : {
        color : "#674636",
        fontWeight: 'bold',
        marginTop:20,
        textAlign:"center"
      },
      listContainer: {
        flexGrow: 1,
        justifyContent: "space-around", // Distribuye verticalmente
        paddingVertical: 20, // Para un pequeño margen superior/inferior
      },
      itemContainer: {
        flex: 1, // Ocupa el mismo espacio en una fila
        alignItems: 'center',
        margin: 10, // Espaciado entre ítems horizontalmente
      },
    });
    