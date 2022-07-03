import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View, Image, Settings } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from './screens/HomeScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import PrivateGameLobbyScreen from './screens/PrivateGameLobbyScreen';
import PublicGameLobbyScreen from './screens/PublicGameLobbyScreen';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from './screens/SettingsScreen';
import GameScreen from './screens/GameScreen';



export type StackParamList = {
  HomeScreen: undefined;
  HowToPlayScreen: undefined;
  PrivateGameLobbyScreen: undefined;
  PublicGameLobbyScreen: {name: string};
  SettingsScreen: undefined;
  GameScreen: {lobbyId: string, title: string, name: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={({navigation, route}) => ({title: 'MERN Mafia', headerRight: () => (
          <View style={{flexDirection: "row"}}>
            <Pressable onPress={() => navigation.navigate('HowToPlayScreen')} >
              <Icon name="help" size={30} color="#3333FF" style={{paddingHorizontal: 7}} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SettingsScreen')} >
              <Icon name="settings" size={30} color="#3333FF" style={{paddingHorizontal: 7}} />
            </Pressable>
          </View>
        )})}/>
        <Stack.Screen name="HowToPlayScreen" component={HowToPlayScreen} options={{title: 'How To Play'}}/>
        <Stack.Screen name="PrivateGameLobbyScreen" component={PrivateGameLobbyScreen} options={{title: 'Private Games'}}/>
        <Stack.Screen name="PublicGameLobbyScreen" component={PublicGameLobbyScreen} options={{title: 'Public Games'}}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{title: 'Settings'}}/>
        <Stack.Screen name="GameScreen" component={GameScreen} options={({navigation, route}) => ({title: `${route.params.title}`, headerLeft: () => (
          <Text></Text>
        )})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
