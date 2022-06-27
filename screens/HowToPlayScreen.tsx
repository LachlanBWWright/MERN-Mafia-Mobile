import React, { useState } from "react";
import { View, Text, FlatList, Button, TouchableNativeFeedback } from "react-native";


export default function HowToPlayScreen() {
    interface htpItem {
        question: string,
        answer: string,
    } 
    const items: Array<htpItem> = [
        {question: "Question", answer: "Lorem ipsum blah blah blah"},
        {question: "Question", answer: "Lorem ipsum blah blah blah"},
        {question: "Question", answer: "Lorem ipsum blah blah blah"},
        {question: "Question", answer: "Lorem ipsum blah blah blah"},
    ];

    return (
        <View style={{alignSelf: "stretch", marginTop: "auto", flex: 1, padding: 20 }}>
            <FlatList
                data={items}
                renderItem={({item, index, separators}) => (<HowToPlayItem question={item.question} answer={item.answer}/>)}
            />
        </View>
    )
}

function HowToPlayItem(props: {question: string, answer: string}) {
    const [open, setOpen] = useState(false);

    return (
        <View>
            <TouchableNativeFeedback onPress={() => setOpen(!open)}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{props.question}</Text>
            </TouchableNativeFeedback>
            {open ? <Text style={{fontSize: 14}}>{props.answer}</Text> : <></>} 
        </View>
    );
}