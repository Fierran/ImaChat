// Se importan todas las librerias necesarias
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Image,  TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
// 'http://172.16.22.74:3000/servidor'
// 'http://192.168.1.71:3000/servidor'

// se crea el componente, que vendria siendo la pantalla
export function HomeScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const [texto, setTexto] = useState('');
    const [imagenes, setImagenes] = useState([]);
  
    const buscarImagenes = async () => {
      try {
        const response = await axios.post('http://192.168.1.71:3000/servidor', {
          palabras: texto,
        });
        // Navegar a la pantalla de resultados y pasar las imágenes como parámetro
        navigation.navigate('Traduccion', { imagenes: response.data.images });
      } catch (error) {
        console.error(error);
      }
    };
    
  return (
    // Pantalla de inicio
    <View style={{ flex : 1, paddingBottom: insets.bottom,paddingTop: insets.top, backgroundColor: "#FFF8E8"}}>
        <StatusBar style='dark'/>
        <View>
          <View style={{alignSelf:"center"}}>
            <Text style = {styles.Title}>Escribe Algo</Text>
          </View>
          <View style={{alignSelf:"center", flexDirection: 'row', marginTop: "20%"}}>
            <TextInput
              style={styles.input}
              color = "#674636"
              onChangeText={setTexto}
              value={texto}
              placeholder="Escribe una palabra o frase"
              placeholderTextColor="gray"                        
            />
            <TouchableOpacity style = {styles.Buttons} onPress={buscarImagenes}>
              <Text style = {styles.BText}>Traducir</Text>
            </TouchableOpacity>               
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={styles.Text}>Como usar:</Text>
          <Text style={styles.Instructions}>Escribe en el cuadro de arriba cualquier palabra o frase y oprime el boton que dice "Traducir",
            cuando lo oprimas, tu texto se transformará en imagenes
          </Text>
          <Image 
            source={require('../assets/gato.png')} // Asegúrate de ajustar la ruta a tu archivo
            style={styles.Image}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Buttons:{
    backgroundColor: "#AAB396",
    borderRadius:10,
    width: 100,
    height: 40,
    marginTop: "3%",
  },
  input: {
    height: 40,
    width: 300,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: "3%",
  },
  BText:{
    color: "#674636",
    backgroundColor: "Black",
    borderColor: "black",
    textAlign: "center",
    margin: 10
  },
  Title:{
    color: "#674636",
    fontSize: 50,
    fontWeight:"bold",
    textAlign: "center"
  },
  Image:{
    width: 300, 
    height: 200, 
    marginTop: 50,
    alignSelf: "center"
  },
  Text:{
    color: "#674636",
    fontWeight:"bold",
    fontSize: 16,
    marginLeft: 10
  },
  Instructions:{
    color: "#674636",
    fontWeight:"bold",
    fontSize: 16,
    margin: 10,
    textAlign: 'justify'
  }
});