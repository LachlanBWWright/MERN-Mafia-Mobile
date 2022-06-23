import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";


export default function HomeScreen() {
    const[name, setName] = useState("");
    const[disabled, setDisabled] = useState(true);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
            <Text style={{justifyContent: 'flex-start', flex: 0.5}}>Welcome To MERN Mafia! Your name is {name}</Text>

            <View style={{alignSelf: 'stretch', marginTop: 'auto', padding: 2}}>
                <TextInput onChangeText={(text) => {text = validateText(text); setName(text); setDisabled(!checkValidity(text));}} placeholder={"Enter your username, 3-12 lesfowercase letters only!"} autoComplete={"username"} style={{borderColor: "#0000FF", borderWidth: 1}} />
                <Button title="Play Private Match" disabled={disabled} color={'#00FF00'} />
                <Button title="Play Public Match" disabled={disabled} color={'#FF0000'} />
            </View>
        </View>
    )
}

//Makes username lowercase, removes non-alphabetical characters
function validateText(text: string): string {
    text = text.toLowerCase();
    text = text.replace(/[^a-z0-9]/gi, '');
    return text;
}

//Checks if the username is valid, for enabling 'Play' buttons
function checkValidity(text: string): boolean {
    return text.length >= 3 && text.length <= 12;
}