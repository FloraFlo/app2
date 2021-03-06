import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

//COMPONENTS LINKED
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Home } from './components/Home';

//FIREBASE
import { firebaseConfig } from './Config';
import { initializeApp } from 'firebase/app'; 
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"; 

initializeApp (firebaseConfig)

const Stack = createNativeStackNavigator(); 

export default function App() {

const [ auth, setAuth ] = useState() 
const [ user, setUser ] = useState() 
const [signupError, setSignupError ] = useState()
const [signinError, setSigninError ] = useState() 

const FBauth = getAuth()

useEffect( () => {
  onAuthStateChanged( FBauth, (user) => {
    if( user ) { 
      setAuth(true)
      setUser(user)
    }
    else {
      setAuth(false)
      setUser(null)
    }
  })
}) 


const SignupHandler = ( email, password ) => {
  createUserWithEmailAndPassword( FBauth, email, password )
  .then( (userCredential) => { 
    console.log(userCredential)
    setAuth( true )
    setUser( userCredential )
   })
  .catch( (error) => { console.log(error) })
}

const SigninHandler = (email, password) => {
  setSignupError(null)
  signInWithEmailAndPassword( FBauth, email, password)
  .then ( (userCredential) => {
    setUser(userCredential)
    setAuth(true)
  })
  .catch( (error) => { setSignupError(error.code) })
} 

const SignoutHandler = () => {
  signOut( FBauth ).then( () => {
    setAuth( false )
    setUser( null)
  })
  .catch( (error) => console.log(error.code))
}

  return (
    <NavigationContainer>
    
      <Stack.Navigator>
        <Stack.Screen name = "Signup" options={{title: 'Sign up'}}>
          { (props) => <Signup {...props} handler={SignupHandler} auth={auth} error={signupError}/>} 
        </Stack.Screen>

        <Stack.Screen name="Signin" options={{title:'Sign in'}}>
          { (props) => <Signin {...props} auth={auth} error={signinError} handler={SigninHandler}/>}
        </Stack.Screen>

        <Stack.Screen 
        name="Home" 
        component={Home} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
