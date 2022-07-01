import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { StackParamList } from "../App";
import { StackActions } from "@react-navigation/native";

type Message = {
    id: number,
    content: string
}

type GameScreenProps = NativeStackScreenProps<StackParamList, "GameScreen">
export default function Game({route, navigation}: GameScreenProps) {
    const[name, setName] = useState("");
    const[playerRole, setPlayerRole] = useState("");
    const[alive, setAlive] = useState(true);
    const[messages, addMessage] = useState(new Array<Message>)

    React.useEffect(() => navigation.addListener('beforeRemove', (e) => e.preventDefault())); //Blocks leaving

    const DATA = [{        
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      }]

/*     const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ]; */
    


    return (
        <View style={{alignSelf: "stretch", marginTop: "auto", flex: 1, padding: 20 }}>
            <Text style={{justifyContent: 'flex-start', alignSelf: "center"}}>
                {name.length != 0 ? `Your name is \"${name}\"` : ""} Your role is: {playerRole} 
            </Text>
            <View style={{backgroundColor: '#CCCCCC', flex: 1, borderRadius: 10, padding: 10}}>
                <FlatList
                    data={messages}
                    renderItem={({item}) => (
                        <Text>{item.id}</Text>
                    )}
                />
            </View>

            { alive ?
            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginTop: 'auto', paddingVertical: 4, justifyContent: 'space-between'}}>
                <TextInput onChangeText={(text) => {setName(text);}} 
                    placeholder={"Send a message"} autoComplete={"username"} value={name}
                    style={{borderColor: "#0000FF", borderWidth: 1, borderRadius: 5, flex: 1, marginRight: 5}} numberOfLines={2} maxLength={500} multiline={true} returnKeyType={"send"}
                />
                {name.length != 0 && (<Button title="→" onPress={() => setAlive(false)} color={'#3333FF'} />)}
            </View>
            :
            <View style={{alignSelf: 'stretch', marginTop: 'auto', paddingVertical: 4, borderRadius: 10, justifyContent: 'flex-end', }}>
                <Button title="Disconnect" onPress={() => navigation.dispatch(StackActions.popToTop())} color={'#FF0000'} />
            </View>
            }
        </View>
    )
}

