import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, DrawerLayoutAndroid, Dimensions } from "react-native";
import { StackParamList } from "../App";
import { StackActions } from "@react-navigation/native";
import io from 'socket.io-client';

type Player = {
  name: string,
  isAlive?: boolean,
  role?: string,
  isUser?: boolean
}

type Message = {
  id: number,
  content: string,
}

type GameScreenProps = NativeStackScreenProps<StackParamList, "GameScreen">
export default function Game({route, navigation}: GameScreenProps) {
    const[socket, setSocket] = useState(io("http://mern-mafia.herokuapp.com/"));
    const[message, setMessage] = useState("");
    const[playerRole, setPlayerRole] = useState("");
    const[alive, setAlive] = useState(true);
    
    const[textMessage, setTextMessage] = useState("");
    const[canTalk, setCanTalk] = useState(true);
    const[time, setTime] = useState("day");
    const[dayNumber, setDayNumber] = useState(0);
    const[timeLeft, setTimeLeft] = useState(0);
    const[messages, addMessage] = useState(new Array<string>);
    const[playerList, setPlayerList] = useState<Array<Player>>([]); //TODO: Update this!
    const[visiting, setVisiting] = useState<String | null>();
    const[votingFor, setVotingFor] = useState<String | null>();

    const[drawerOpened, setDrawerOpened] = useState(false);
    
    useEffect(() => navigation.addListener('beforeRemove', (e) => {if(!alive) e.preventDefault()})); //Blocks leaving

    useEffect(() => { //Socket.io Integration - Runs on creation
      socket.on('connect', () => {
    })
    
     socket.on('receive-message', (inMsg: string) => {
      addMessage(old => [...old, inMsg])
    })

     socket.on('receive-player-list', (listJson: Array<Player>) => { //Receive all players upon joining, and the game starting
        let list = new Array<Player>;
        listJson.map((instance) => {
          list.push(instance);
        })
        setPlayerList(currentList => list);
    });

     socket.on('receive-new-player', (playerJson: Player) => { //Called when a new player joins the lobby
      setPlayerList(list => [...list, playerJson]);  
    }) 

     socket.on('remove-player', (playerJson: Player) => { //Called when a player leaves the lobby before the game starts
        setPlayerList(list => list.filter(item => item.name !== playerJson.name))
    }) 

     socket.on('assign-player-role', (playerJson: Player) => { //Shows the player their own role, lets the client know that this is who they are playing as 
        let tempPlayerList: Array<Player> = [];
        setPlayerList(list => tempPlayerList = [...list]);
        let index = tempPlayerList.findIndex(player => player.name === playerJson.name);
        tempPlayerList[index].role = playerJson.role;
        tempPlayerList[index].isUser = true;
        //TODO: Who player visits at day (living) (0 - Nobody, 1 - Self, 2 - Others, 3 - Everybody)
        //TODO: Who player visits at day (dead, will apply to almost (or currently) no roles) 
        //TODO: Who player visits at night (living)
        //TODO: Who player visits at night (dead)
        setPlayerRole(playerJson.role ?? "");
        setPlayerList(tempPlayerList);
    }) 

     socket.on('update-player-role', (playerJson: Player) => { //Updates player role upon their death
        let tempPlayerList: Array<Player> = [];
        setPlayerList(list => tempPlayerList = [...list]);
        let index = tempPlayerList.findIndex(player => player.name === playerJson.name);
        if(playerJson.role !== undefined) tempPlayerList[index].role = playerJson.role;
        tempPlayerList[index].isAlive = false;
        setPlayerList(tempPlayerList);
    })

    socket.on('update-player-visit', (playerJson) => { //Updates player to indicate that the player is visiting them TODO: This might be depreciated in the actual game
        //JSON contains player name
        //Get player by name, update properties, update JSON

    })

    socket.on('update-day-time', (infoJson) => { //Gets whether it is day or night, and how long there is left in the session
      setTime(infoJson.time);
      setDayNumber(infoJson.dayNumber);
      setVisiting(null);
      setVotingFor(null);
/*         this.setState({time: infoJson.time});
        this.setState({dayNumber: infoJson.dayNumber});
        this.setState({visiting: null}); //Resets who the player is visiting
        this.setState({votingFor: null}); */
      let timeLeft = infoJson.timeLeft;
      let countDown = setInterval(() => {
          if(timeLeft > 0) {
              setTimeLeft(timeLeft - 1)
              timeLeft--;
          }
          else {
              clearInterval(countDown);
          }
      }, 1000)
    })


    socket.on('block-messages', () => {
        setCanTalk(false);
    })
      
    socket.emit('playerJoinRoom', route.params.name, route.params.lobbyId, (callback: number) => { //TODO: THis is where the socket is connnected to!
      if(callback !== 0) navigation.dispatch(StackActions.popToTop()); //TODO: Add reason for connection failure.
    });
      return() => { //Runs Upon close
        socket.off('receive-message');
        socket.off('block-messages');
        socket.off('receive-role');
        socket.off('receive-player-list');
        socket.off('receive-new-player');
        socket.off('remove-player');
        socket.off('update-player-role');
        socket.off('update-player-visit');
        socket.disconnect();
      }
    }, []);

    const flatList: React.RefObject<FlatList> = React.useRef(null);
    const drawer: React.RefObject<DrawerLayoutAndroid> = React.useRef(null);

    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerPosition={"right"}
        renderNavigationView={() => ( //Content of the drawer, should contain the list of players TODO: Make a flatlist
          <FlatList
            data={playerList}
            renderItem={({item}) => (<PlayerInList player={item}/>
            )}
          />
        )}
      >
        <View style={{alignSelf: "stretch", marginTop: "auto", flex: 1, padding: 20 }}>
            <Text style={{justifyContent: 'flex-start', alignSelf: "center"}}>
                Name: "{route.params.name}" Role: {playerRole}
            </Text>
            <View style={{backgroundColor: '#CCCCCC', flex: 1, borderRadius: 10, padding: 10}}>
                <FlatList
                    ref={flatList}
                    data={messages}
                    renderItem={({item}) => (
                        <Text>{item}</Text>
                    )}
                    onContentSizeChange={() => {
                      if(flatList.current) flatList.current.scrollToEnd()
                    }}
                />
            </View>

            { canTalk ?
            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginTop: 'auto', paddingVertical: 4, justifyContent: 'space-between'}}>
                <TextInput onChangeText={(text) => {setMessage(text);}} 
                    placeholder={"Send a message"} value={message}
                    style={{borderColor: "#0000FF", borderWidth: 1, borderRadius: 5, flex: 1, marginRight: 5}} numberOfLines={2} maxLength={500} multiline={true} returnKeyType={"send"}
                />
                {message.length != 0 ? 
                  (<Button title="→" onPress={() => {socket.emit('messageSentByUser', message); setMessage("");}} color={'#3333FF'} />)
                  :
                  (<Button title="←" onPress={() => {if(drawer.current) drawer.current.openDrawer()}} color={'#FF0000'} />)
                }
            </View>
            :
            <View style={{alignSelf: 'stretch', marginTop: 'auto', paddingVertical: 4, borderRadius: 10, justifyContent: 'flex-end', }}>
                <Button title="Disconnect" onPress={() => navigation.dispatch(StackActions.popToTop())} color={'#FF0000'} />
            </View>
            }
        </View>
      </DrawerLayoutAndroid>
    )
}

function PlayerInList(props: {player: Player}) {
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    if(props.player.isAlive !== undefined) {
      if(props.player.isAlive === false) setColor("#FF0000");
      else if(props.player.isUser === true) setColor("#3333FF");
      else if(props.player.isAlive === true) setColor("#33FF33");
    }
  }, [props.player.isAlive])

  return(
    <View style={{flexDirection: "row", alignSelf: "stretch", flex: 1, justifyContent: "space-between", alignItems: "center", backgroundColor: color, borderWidth: 2, borderColor: "#000000", borderRadius: 5, padding: 5, margin: 2}} >
      <Text style={{flexGrow: 1}}>Name: {props.player.name} </Text>
      {props.player.isAlive != undefined && props.player.isAlive && (<Text>Alive placeholder</Text>)}   
      <Button title="Visit"/>
      <Button title="Vote"/>
      <Button title="Vote"/>
    </View>
  )
}

/* handleVisit(playerUsername) {
        
  if(this.state.visiting !== playerUsername) {
      this.setState({visiting: playerUsername});
      this.socket.emit('messageSentByUser', '/c ' + playerUsername);
  }
  else {
      this.setState({visiting: null});
      this.socket.emit('messageSentByUser', '/c');
  }
}

handleWhisper(playerUsername) {
  this.setState({textMessage: '/w ' + playerUsername + ' '});
}

handleVote(playerUsername) {
  if(this.state.votingFor !== playerUsername) {
      this.setState({votingFor: playerUsername});
      this.socket.emit('messageSentByUser', '/v ' + playerUsername);
  }
  else {
      this.setState({votingFor: null});
      this.socket.emit('messageSentByUser', '/v ');
  }
} */

