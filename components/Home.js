import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet} from "react-native";
import { ThemeColours } from './ThemeColours';
import { Signout } from './Signout';
import { useNavigation } from '@react-navigation/core';

export function Home (props) {

    const navigation = useNavigation()

    useEffect( () => {
        navigation.setOptions({
            HeaderRight: (props) => <Signout {...props} />
        })
    })

    return (
    <View>
        <Text> Home </Text>
    </View>
    )
}