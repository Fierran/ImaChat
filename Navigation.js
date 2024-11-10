import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

//Pantallas

import { HomeScreen } from './screens/HomeScreen';
import { CheckScreen } from './screens/CheckScreen';
import { ResultsScreen } from './screens/ResultsScreen';

//subPantallas

import { Emociones } from './subscreens/Emociones';
import { Conversacion } from './subscreens/Conversacion';

const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();

function StackScreens(){
    return(
        <StackNavigator.Navigator screenOptions={{
            headerStyle: {backgroundColor: "#AAB396",}, headerTintColor: '#674636'
        }}>
            <StackNavigator.Screen name = "home" component={Tabs}
            options={{
                headerShown: false
            }}/>
            <StackNavigator.Screen name = "Traduccion" component={ResultsScreen}/>

            <StackNavigator.Screen name = "Emociones" component={Emociones}/>

            <StackNavigator.Screen name = "Conversacion" component={Conversacion}/>
        </StackNavigator.Navigator>
    );
}

function Tabs(){
    return(
        <Tab.Navigator initialRouteName='Inicio'        
        screenOptions={{tabBarActiveBackgroundColor: '#FFF8E8',
        tabBarActiveTintColor: '#674636', tabBarStyle: {backgroundColor: "#AAB396",}, 
        headerStyle: {backgroundColor: "#AAB396",}, headerTintColor: '#674636'}} >
            <Tab.Screen name='Inicio' component={HomeScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                )
                }}/>
            <Tab.Screen name='Guias' component={CheckScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <Entypo name="emoji-happy" size={24} color="black" />
                )
                }}/>
        </Tab.Navigator>
    );
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <StackScreens/>
        </NavigationContainer>
    );
}