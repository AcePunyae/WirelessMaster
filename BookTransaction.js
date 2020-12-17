import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import database from '../Config';
import firebase from firebase
export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '6',
        buttonState: 'normal',
        scannedBookId:0,
        scannedStudentId:0
      
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }

    handleTransaction=async()=>{
      var scannedBook=this.state.scannedBookId
      console.log(scannedBook)
//await 
 // database.collection("Book").doc(this.state.scannedBookId).get()
 // .then((doc)=>{
  //  console.log(doc.data());
 // })




    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? 0 : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

<View>
          <Image
            source={require("../assets/booklogo.jpg")}
            style={{width:200, height: 200}}/>
          <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
        </View>
        <View style={styles.inputView}>
        <TextInput 
        onChangeText={(text)=>{
          this.setState({
            scannedBookId:text
          })
        }}
          style={styles.inputBox}
          placeholder="Book Id"
          value={this.state.scannedBookId}/>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("BookId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
        <TextInput 
        onChangeText={(text)=>{
          this.setState({
            scannedStudentId:text
          })
        }}
          style={styles.inputBox}
          placeholder="Student Id"
          value={this.state.scannedStudentId}/>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("StudentId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
     
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

       
          <TouchableOpacity onPress={this.handleTransaction} >
                <Text> Submit  </Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });