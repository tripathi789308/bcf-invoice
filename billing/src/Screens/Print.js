import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Storage from "../Storage";
export const createXL= async(billno) =>{
    let data=[];
    try{    
        data = await Storage.getItem(`bill${billno}`)
    }catch(e){
        console.log(e);
    }
    let sheet = [];
    data.map((item,index)=>{
        let row ={
            "S.No." : index + 1,
            "Gate Pass No." : item.invoice,
            "Date" : item.date,
            "Ex Jayanagar" : "Local",
            "Package" : item.pkgs,
            "Rate" : "13.65",
            "Price" : parseInt(item.pkgs)*13.65
        }
        sheet.push(row)
    })
    console.log(sheet)
    var ws = XLSX.utils.json_to_sheet(sheet);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cities");
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx"
    });
    const uri = FileSystem.cacheDirectory + `billno${billno}.xlsx`;
    console.log(`Writing to ${JSON.stringify(uri)}`);
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    await Sharing.shareAsync(uri, {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dialogTitle: 'MyWater data',
      UTI: 'com.microsoft.excel.xlsx'
    });
}