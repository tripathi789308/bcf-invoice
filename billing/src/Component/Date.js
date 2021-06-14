import React, {useState} from 'react';
import {View, Platform,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Storage from '../Storage';

export default function DatePick(props) {
  const [date, setDate] = useState(new Date("2021-08-31"));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isDone,setDone] =useState(false);
  var day=date.getDate();
  var month=date.getMonth();
  var year=date.getFullYear();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const showConsole = async()=>{
      let obj=await Storage.getItem('all_bills');
      console.log(obj);
  }

  const handlePress=async()=>{
    try{
       let obj= await Storage.getItem('all_bills') ;
       if(obj===null){
           let new_obj={
               billno:props.billno,
               date : day+'-'+month +'-' +year
           }
           obj=[];
           obj.push(new_obj);
           try{
            await Storage.setItem('all_bills',obj);
            setDone(true);
            if(isDone){
              props.navigation.navigate('edit-bill',{
                bill_no:props.billno,
                date : day+'-'+month +'-' +year
              })}
           }catch(e){console.log(e)}
           
       }else {
        let new_obj={
            billno:props.billno,
            date : day+'-'+month +'-' +year
        }
        obj.push(new_obj);
        try{
            await Storage.setItem('all_bills',obj);
            setDone(true);
            if(isDone){
                props.navigation.navigate('edit-bill',{
                  bill_no:props.billno,
                  date : day+'-'+month +'-' +year
                })}
           }catch(e){console.log(e)}
       }
    }
    catch(err){
        console.log(err);
    }
    }

    

  return (
    <View>
      <View>
        <Button color="blue" onPress={showDatepicker}>Choose the last date of this bill</Button>
        <Title style={style.date}>{day + '-'+month+'-'+year}</Title>

      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          dateFormat="dayofweek day month"
           display="default"
          onChange={onChange}
        />
      )}

        <Button color="blue" mode="contained" style={style.button} onPress={handlePress}>Set</Button>
        <Button color="blue" onPress={showConsole}>console</Button>
        {isDone ?<Title style={style.text}>Go to Edit Page to edit your bill</Title> :<></>}
    </View>

  );
};

const style=StyleSheet.create({
    date:{
        left:150
    },
    text:{
        left:60,
        top:50
    }
})