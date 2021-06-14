import React,{useState} from 'react';
import TopBar from '../Component/TopBar';
import { TextInput } from 'react-native-paper';
import { View,StyleSheet } from 'react-native';
import DatePick from '../Component/Date'


export default function AddNew({navigation}){
    const [text,setText]=useState('');
    return(
        <>
        <TopBar name="Add New Bill" navigation= { navigation} print={false} />
        <View style={style.container}>
        <TextInput
            label="Enter your Bill number"
            value={text}
            onChangeText={text => setText(text)}
            style={style.text}
            />
        <DatePick billno={text} navigation={navigation}/>
        
        </View>
        

        </>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        padding:20,
        margin:20
    },
   
})