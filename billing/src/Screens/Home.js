
import React,{useState,useEffect} from 'react';
import TopBar from '../Component/TopBar';
import { View,Text,StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper'; 
import Storage from '../Storage';



export default function Home({navigation}){
    const [data,setData]= useState([]);

    useEffect(()=>{
        async function FetchData(){
            let obj = await Storage.getItem('all_bills');
            if(obj){
                setData(obj);
            }
        }
        FetchData();
    },[]);

    return(
        <View>
        <TopBar name="BCF-Invoices" navigation= { navigation} print={false} />
        <View style={style.list}>

             <Button icon="plus" color="blue" onPress={()=>{
                navigation.navigate('add-new')
            }}>Add New</Button>

            <Text style={style.text}>Tap the Bill Number to Edit</Text>
        <ScrollView>  
        {data.map((item,index)=>(
            <TouchableOpacity key = {index}style={style.touchable} 
            onPress={()=>{
                navigation.navigate('edit-bill',{
                    bill_no:item.billno,
                    date:item.date
                })
            }}
            >
                <Text style={style.text1} key={index}> {index+1}.  Bill Number :-    {item.billno}     Dated: {item.date} </Text>
            </TouchableOpacity>
            
        ))}
        </ScrollView> 
        </View>
       
        </View>
    )
}

const style=StyleSheet.create({
    list:{
        top:40,
        left:10,
        right:5
    },
    text:{
        left:10,
        marginBottom:10
    },
    touchable:{
        backgroundColor:"white",
        padding:10,
        margin:5,
        height:70,
        justifyContent:"center"
    },
    text1:{
        fontWeight:'bold',
        fontSize:15
    }
})