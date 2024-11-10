import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

export function CheckScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
  return (
    <View style={{ flex : 1, paddingBottom: insets.bottom,paddingTop: insets.top, backgroundColor: "#FFF8E8"}}>
        <StatusBar style='dark'/>
        <View>
          <View>
            <Text style={styles.Title}> Como Expresarte</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:30}}>
            <TouchableOpacity onPress={() => navigation.navigate("Emociones")}>
              <View>
                <Image style = {styles.image}source={{uri : "https://s1.significados.com/foto/emocion-og.jpg?class=ogImageSquare"}}></Image>
                <Text style={styles.text}>Mis emociones</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:30}}>
            <TouchableOpacity onPress={() => navigation.navigate("Conversacion")}>
              <View>
                <Image style = {styles.image}source={{uri : "https://img.freepik.com/vector-gratis/personas-dibujos-animados-globos-dialogo-colores_23-2147529518.jpg"}}></Image>
                <Text style={styles.text}>Conversaciones</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 40,
    fontWeight:"bold",
    textAlign: "center"
  },
  image : {
    width: 180,
    height: 180,
    borderRadius: 10,
    alignSelf:"center"
  },
  text : {
    color : "#674636",
    fontWeight: 'bold',
    marginTop:10,
    textAlign:"center"
  },
});