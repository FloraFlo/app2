import React, {useState, useEffect} from 'react'; 
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { ThemeColours } from './ThemeColours'; 
import { Feedback } from './Feedback';

export function Signin (props) {

    const navigation = useNavigation()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect( () => {
      if( props.auth === true) {
        navigation.reset({ index: 0, routes: [{ name: 'Home'}]})
      }
    }, [props.auth])

    return (
    <View>
        <View style={styles.container}>
      <Text>Sign up</Text>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.inner}>
        <Text>Email</Text>
        <TextInput style={styles.input} onChangeText={ (val) => setEmail(val) }/>
        <Text>Password</Text>
        <TextInput 
        style={styles.input} secureTextEntry={true}
        onChangeText={ (val) => setPassword(val) }
        secureTextEntry={true} 
        />
        <TouchableOpacity 
          style={ (validForm) ? styles.button : styles.buttonDisabled} 
          disabled={ (validForm) ? false : true }
          onPress={ () => submitHandler() }
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <Feedback message={props.error} />

        <Text>Already have an account?</Text>
        <Button title="Click here to sign in" onPress={() => navigation.navigate("Signin")} />
      </View>
      </KeyboardAvoidingView>
      
    </View>
    </View>
    )
}

const styles = StyleSheet.create( {
    input: {
      backgroundColor: ThemeColours.cream,
      fontSize: 16,
      padding: 5,
      borderRadius: 4,
    },
    button: {
      marginVertical: 15,
      backgroundColor: ThemeColours.yelloworange,
      padding: 10,
      borderRadius: 10,
    },
    buttonDisabled: {
      marginVertical: 15,
      backgroundColor: ThemeColours.irislight,
      padding: 10,
      borderRadius: 10,
    },
    container: {
      flex: 1,
      backgroundColor: ThemeColours.yelloworange,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: ThemeColours.yelloworange,
      textAlign: 'center',
    },
    inner: {
      width: 300,
      marginBottom: 90,
    },
    kb: {
      flex: 1,
    }
  })