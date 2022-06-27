import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { StackParamList } from "../App";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "HomeScreen">

export default function HomeScreen({route, navigation}: HomeScreenProps) {
    const[name, setName] = useState("");
    const[disabled, setDisabled] = useState(true);

    const navigator = createNativeStackNavigator();

    return (
        <View style={{alignSelf: "stretch", marginTop: "auto", flex: 1, padding: 20 }}>
            <Text style={{justifyContent: 'flex-start', alignSelf: "center", fontSize: 25, fontWeight: 'bold'}}>Welcome To MERN Mafia!</Text>
            <Text style={{justifyContent: 'flex-start', alignSelf: "center"}}>{name.length != 0 ? `Your name is \"${name}\"` : ""}</Text>
            


            <View style={{alignSelf: 'stretch', marginTop: 'auto', padding: 2, justifyContent: 'space-between'}}>
                <TextInput onChangeText={(text) => {text = validateText(text); setName(text); setDisabled(!checkValidity(text));}} 
                    placeholder={"Enter your username, 3-12 lowercase letters only!"} autoComplete={"username"} value={name}
                    style={{borderColor: "#0000FF", borderWidth: 1, borderRadius: 10}} 
                />
                <Button title="Play Private Match (TBA)" disabled={true} onPress={() => navigation.navigate("PrivateGameLobbyScreen")} color={'#FF0000'} />
                <Button title="Play Public Match" disabled={disabled} onPress={() => navigation.navigate("PublicGameLobbyScreen")} color={'#3333FF'} />
            </View>
        </View>
    )
}

//Makes username lowercase, removes non-alphabetical characters
function validateText(text: string): string {
    text = text.toLowerCase();
    text = text.replace(/[0-9]/g, '');
    return text;
}

//Checks if the username is valid, for enabling 'Play' buttons
function checkValidity(text: string): boolean {
    return text.length >= 3 && text.length <= 12;
}