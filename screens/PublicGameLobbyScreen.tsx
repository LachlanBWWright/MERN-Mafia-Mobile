import React from "react";
import { View, Text } from "react-native";


export default function PublicGameLobbyScreen() {
    return (
        <View style={{alignSelf: "stretch", marginTop: "auto", flex: 1, padding: 20 }}>
            <Text style={{justifyContent: 'flex-start', alignSelf: "center"}}>Welcome To MERN Mafia!</Text>
        </View>
    )
}