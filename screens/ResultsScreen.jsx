// Se importan las librerias necesarias
import React, { useState } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// funcion que exporta la pantalla para usarla como componente
export function ResultsScreen({ route }) {
    const insets = useSafeAreaInsets();
    const { imagenes } = route.params;
    return(
        <ScrollView style={{backgroundColor: "#FFF8E8"}}>
        {imagenes.length > 0 ? (
          imagenes.map((imagen, index) => (
            <Image
              key={index}
              source={{ uri: imagen }}
              style={styles.Image}
            />
          ))
        ) : (
          <Text>No se encontraron imágenes</Text>
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    Image:{
        width: 200, 
        height: 200, 
        margin: 20,
        alignSelf: "center"
      }
});
