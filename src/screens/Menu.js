import React from 'react'
import { ScrollView, View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'



export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthorApp')
    }

    return (
        <ScrollView>
            <View style={style.header}>

                <Text style={style.title}>Tasks</Text>

                <Gravatar style={style.avatar}
                    options={{ 
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />    

                <View style={style.userInfo}>
                    <Text style={style.name}>{props.navigation.getParam('name')}</Text>
                    <Text style={style.email}>{props.navigation.getParam('email')}</Text>
                </View>   

                <TouchableOpacity onPress={logout}>
                    <View style={style.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#000'/>                             
                    </View>
                </TouchableOpacity>

            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: 'black',
        margin: 10,       
    },
    userInfo: {
        marginLeft: 10
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText,
        marginBottom: 5
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
})