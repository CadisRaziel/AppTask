import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet} from 'react-native'

import axios from 'axios' 
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthorApp extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            //userData esta invalido
        }

        if(userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('home', userData)
        }else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={style.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})