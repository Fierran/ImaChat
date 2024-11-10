import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { conversaciones } from '../assets/datos/Conversacion';

import { EmotionDetail } from './EmotionDetail';

export function Conversacion() {
    const insets = useSafeAreaInsets();
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [emotionInfo, setEmotionInfo] = useState('');

    const emociones = [
      { id: '1', label: 'Feliz', uri: "https://w7.pngwing.com/pngs/528/425/png-transparent-smile-emoji-happy-happiness-happy-face-yellow-smiling-message-social-networks-whatsapp.png", filename: 'feliz.txt' },
      { id: '2', label: 'Triste', uri: "https://c0.klipartz.com/pngpicture/969/1005/gratis-png-emoji-triste-arte-cara-con-lagrimas-de-alegria-emoji-llorando-emoticon-llorar-thumbnail.png" },
      { id: '3', label: 'Enojado', uri: "https://w7.pngwing.com/pngs/666/250/png-transparent-angry-emoji-illustration-emoji-anger-emoticon-iphone-angry-emoji-orange-computer-wallpaper-smiley.png" },
      { id: '4', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '5', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '6', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '7', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '8', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '9', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '10', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      { id: '11', label: 'Sorprendido', uri: "https://e7.pngegg.com/pngimages/233/277/png-clipart-emoji-emoticon-smiley-iphone-computer-icons-be-surprised-sphere-circle.png" },
      // Agrega más emociones según lo necesario
  ];

  const emotionFiles = {
    Feliz: require('../assets/DetallesEmocion/feliz.txt'),
    Triste: require('../assets/DetallesEmocion/triste.txt')};

  const handleEmotionSelect = async (emotion) => {
    setSelectedEmotion(emotion);

    try {
      // Cargar el archivo de texto correspondiente a la emoción seleccionada
      const asset = Asset.fromModule(emotionFiles[emotion.label]);
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
        <Text style={styles.Title}>Me siento</Text>
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
    