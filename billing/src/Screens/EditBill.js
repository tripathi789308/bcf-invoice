import React,{useEffect, useState,useRef} from 'react';
import TopBar from '../Component/TopBar';
import {View,Text,StyleSheet, ScrollView, Keyboard,SafeAreaView,TextInput} from 'react-native';
import {Button,DataTable} from 'react-native-paper';
import Storage from '../Storage';


export default  function EditBill({route,navigation}){
    const {bill_no,date}=route.params;
    const [chosenDate,setDate]= useState('');
    const [data,setData] = useState([]);
    const [deleteIndex,setDeleteIndex] =useState('');
    const [editIndex,setEditIndex] = useState('')
    const [insertAfterIndex,setInsertAfterIndex] = useState('')
    const [pkgs,setPkgs]=useState('');
    const [invoice,setInvoice] = useState('');
    const [toggle,setToggle] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const keyboardShowListener = useRef(null);
    const keyboardHideListener = useRef(null);
    

    useEffect(()=>{
        async function FetchData(){
            let values = await Storage.getItem(`bill${bill_no}`);
            values = (values === null) ? []: values;
            setData(values);
        }
        FetchData();
    },[toggle]);

    useEffect(() => {
        keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
        keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
    
        return () => {
          keyboardShowListener.current.remove();
          keyboardHideListener.current.remove();
        }
      });


    const handleAdd=async()=>{
        if(invoice&&chosenDate&&pkgs){
        try{
            let values = await Storage.getItem(`bill${bill_no}`);
            values = (values === null) ? []: values;
            let new_values={
                invoice : invoice,
                date:chosenDate,
                pkgs:pkgs
            }
            values.push(new_values);
            await Storage.setItem(`bill${bill_no}`,values);
        }catch(e){
            console.log(e);
        }
        setToggle(!toggle);
        setInvoice('');
        setPkgs('');
        setDate('');}
    }

    const handleDelete=async()=>{
        if(deleteIndex){
        var index=parseInt(deleteIndex)
        try{
            let values = await Storage.getItem(`bill${bill_no}`);
            if(values===null){
                value=[];
                await Storage.setItem(`bill${bill_no}`,values);
            }else{
                values.splice(index-1,1);
                await Storage.setItem(`bill${bill_no}`,values);
            }
        }catch(e){
            console.log(e)
        }
        setToggle(!toggle);
        setDeleteIndex('');
        }
    }

    const handleEdit=async()=>{
        if(editIndex&&invoice&&chosenDate&&pkgs){
            var index= parseInt(editIndex);
            try{
                let values = await Storage.getItem(`bill${bill_no}`);
                if(values===null){
                    value=[];
                    await Storage.setItem(`bill${bill_no}`,values);
                }else{
                    let new_values={
                        invoice : invoice,
                        date:chosenDate,
                        pkgs:pkgs
                    }
                    values[index-1]=new_values;
                    await Storage.setItem(`bill${bill_no}`,values);
                }

            }catch(e){
                console.log(e)
            }
        }
        setToggle(!toggle);
        setInvoice('');
        setPkgs('');
        setDate('');
        setEditIndex('');
    }

    const handleInsert=async()=>{
        if(insertAfterIndex&&invoice&&chosenDate&&pkgs){
            var index= parseInt(insertAfterIndex);
            try{
                let values = await Storage.getItem(`bill${bill_no}`);
                if(values===null){
                    value=[];
                    await Storage.setItem(`bill${bill_no}`,values);
                }else{
                    let new_values={
                        invoice : invoice,
                        date:chosenDate,
                        pkgs:pkgs
                    }
                    values.splice(index,0,new_values);
                    await Storage.setItem(`bill${bill_no}`,values);
                }

            }catch(e){
                console.log(e)
            }
        }
        setToggle(!toggle);
        setInvoice('');
        setPkgs('');
        setDate('');
        setInsertAfterIndex('');
    }

    return(
        <SafeAreaView>
        <TopBar name="Edit Your Bill" navigation={navigation} print={true} billno={bill_no} date={date}  />
        <View style={style.container}>
        
        <Text style={style.text}>Bill Number : {bill_no}  Dated : {date}</Text>
        <View style={style.wrapper}>
            <View style={style.input}>
            <TextInput
                placeholder="Enter your Invoice"
                value={invoice}
                selectionColor="blue"
                onChangeText={invoice => setInvoice(invoice)}
                style={style.textarea}
                />
            <TextInput
                placeholder={date}
                value={chosenDate}
                selectionColor="blue"
                defaultValue={date}
                onChangeText={chosenDate => setDate(chosenDate)}
                style={style.textarea}
                />
            <TextInput
                placeholder="Packages"
                value={pkgs}
                selectionColor="blue"
                onChangeText={pkgs => setPkgs(pkgs)}
                style={style.textarea}
                />
            <Button color="blue" onPress={handleAdd} >Add Row</Button>     
            
            </View>
            <View style={style.inputB}>
                <View>
                <Text style={style.date}>Enter the Row index to delete</Text>
            <TextInput
                placeholder="Index"
                placeholderTextColor="#301934"
                value={deleteIndex}
                selectionColor="blue"
                onChangeText={deleteIndex => setDeleteIndex(deleteIndex)}
                style={style.inputtextB}
                />
            <Button color="blue"  onPress={handleDelete}>Delete Row</Button>

            </View>
            <View>
            <Text style={style.date}>Enter the Row index after which to be inserted</Text>
            <TextInput
                placeholder="Index"
                placeholderTextColor="#301934"
                value={insertAfterIndex}
                selectionColor="blue"
                onChangeText={insertAfterIndex => setInsertAfterIndex(insertAfterIndex)}
                style={style.inputtextB}
                />
            <Button color="blue" onPress={handleInsert}>Insert Row</Button>  

            </View>
            <View>
            <Text style={style.date}>Enter the Row index to Edit</Text>
            <TextInput
                placeholder="Index"
                placeholderTextColor="#301934"
                value={editIndex}
                selectionColor="blue"
                onChangeText={editIndex => setEditIndex(editIndex)}
                style={style.inputtextB}
                />
            <Button color="blue" onPress={handleEdit}>Edit Row</Button>  

            </View>
            </View>

        </View>
        {isOpen?<></>:
        
        <ScrollView style={style.scrollwrapper} >
            <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Index</DataTable.Title>
                        <DataTable.Title>Invoice No.</DataTable.Title>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Packages</DataTable.Title>
                    </DataTable.Header>
            {data.map((item,index)=>(
                <DataTable.Row key={index}>
                <DataTable.Cell> {index+1}  </DataTable.Cell>
                <DataTable.Cell> {item.invoice}  </DataTable.Cell>
                <DataTable.Cell> {item.date}  </DataTable.Cell>
                <DataTable.Cell> {item.pkgs}  </DataTable.Cell>
            </DataTable.Row>
            ))}
            </DataTable>
        </ScrollView>
        
        }
         </View>
        </SafeAreaView>
        
    )
}
const style = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:"100%"
    },
    text:{
        left:10,
        top:40,
        backgroundColor:"white",
        fontWeight:"bold",
        height:30,
        justifyContent:"center"
    },
    wrapper:{
        flexDirection:"row",
        height:"45%",
        width:"95%",
        top:45
    },
    scrollwrapper:{
        top:10,
        height:290,
        width:"100%",
    },
    input:{
        width:"50%",
        flexDirection:'column',
        alignContent:"center"
    },
    inputB:{
        width:"50%",
        flexDirection:'column',
        alignContent:"center"
    },
    date:{
        left:20
    },
    inputtext:{
        margin:3,
        backgroundColor:"white",
    },
    inputtextB:{
        width:100,
        left:50,
        maxHeight:20,
    },
    textarea:{
       padding:17
    }
})

