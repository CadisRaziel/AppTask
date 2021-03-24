import React, { Component } from 'react'
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, TextInput, ToolbarAndroidBase} from 'react-native'

import commonStyles from '../commonStyles'

const initialState = { desc: '' }

export default class AddTask extends Component {

    state = {
        ...initialState
    }


    render(){
        return (
            <Modal transparent={true} visible={this.props.isVisible}
             onRequestClose={this.props.onCancel} animationType='slide'>

                <TouchableWithoutFeedback onPress={this.props.onCancel}> 
                    <View style={style.background}></View>
                </TouchableWithoutFeedback>

                <View style={style.container}>

                    <Text style={style.header}>Nova tarefa</Text>
                    
                    <TextInput style={style.input}
                        placeholder="Informe a descrição..."
                        onChangeText={desc => this.setState({ desc })} 
                        value={this.state.desc}/>

                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={style.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

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
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,   
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,        
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,        
        color: commonStyles.colors.today        
    }
})

//TouchableWithoutFeedback = qunado clicar nele, ele chama uma função