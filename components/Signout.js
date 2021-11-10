import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemeColours } from './ThemeColours';

export function Signout( props ) {
    return (
        <TouchableOpacity>
            <Text> Signout </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    signoutText: {
        color: "black",
    },
})