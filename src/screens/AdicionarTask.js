import React, { Component } from 'react'
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native'

import commonStyles from '../commonStyles'


export default class AddTask extends Component {
    render(){
        return (
            <Modal transparent={true} visible={this.props.isVisible}
             onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}> 
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                    <Text style={style.header}>Nova tarefa</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}> 
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}


const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)' //para por uma cor com transparencia
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,   
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    }
})

//TouchableWithoutFeedback = qunado clicar nele, ele chama uma função