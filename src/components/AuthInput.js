import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

//essa função vai subistituir os textInput de Auth.js porém continuar tendo as propriedades dentro dela
//porém vamos ter uma propriedade personalizada nossa
export default props => {
    return (
        <View style={[style.container, props.style]}>
            <Icon name={props.icon} size={20} style={style.icon}/>
            <TextInput {...props} style={style.input}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%'
    }
})