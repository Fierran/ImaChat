import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function EmotionDetail({ emotion, onBack }) {
  const renderContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('[image:')) {
        const imageUrl = line.match(/\[image:\s*(.*?)\s*\]/)[1];
        return <Image key={index} source={{ uri: imageUrl }} style={styles.detailImage} />;
      }
      return <Text key={index} style={styles.detailText}>{line}</Text>;
    });
  };

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{emotion.label}</Text>
      <Image style={styles.mainImage} source={{ uri: emotion.uri }} />
      <ScrollView style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
        {renderContent(emotion.info || 'No hay información disponible')}
      </ScrollView>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}


  const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#674636',
      },
      detailImage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
      },
      mainImage: {
        width: 100,
        height: 100,
        marginBottom: 10
      },
      detailText: {
        fontSize: 16,
        color: '#674636',
        textAlign: 'center',
        textAlign: "justify",
      },
      backButton: {
        backgroundColor: '#674636',
        padding: 10,
        borderRadius: 5,
      },
      scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButtonText: {
        color: '#FFF8E8',
        fontWeight: 'bold',
      },
  });