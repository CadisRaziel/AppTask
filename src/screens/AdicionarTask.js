import React, { Component } from 'react'
import { Modal, View, StyleSheet, TouchableWithoutFeedback, 
    Text, TouchableOpacity, TextInput, ToolbarAndroidBase, Platform} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker' //lembrando que no ios temos que ver a aula 130

import commonStyles from '../commonStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    //função para salvar a tarefa
    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        //se onSave estiver setado(verdadeiro) ele vai chamar o onSave(newTask)
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialState})

    }

    //função para incluir datas no IOS e no ANDROID (essa função de data é diferente nos dois) 
    //no IOS quando coloco essa função ele <DateTimePicker> somente ela é capaz de renderizar no IOS
    //No android eu ja tenho que por um let e fazer todo o resto abaixo (lembrando que fazendo isso nao muda nada no IOS)
    //{this.state.showDatePicker && datePicker} = datePicker só sera interpretada se isso showDatePicker for verdadeiro (forma de renderizar algo condicional !!)
    getDatePicker = () => {
        let datePicker =  <DateTimePicker value={this.state.date} 
                onChange={(_, date) => this.setState({date, showDatePicker: false})}
                mode='date' display='calendar'/>

        //gerar a data em string
        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')

        //se for android vai substituir por essa View
        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={style.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
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
                        
                    {this.getDatePicker()}

                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text onPress={this.save}
                             style={style.button}>Salvar</Text>
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
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})

//TouchableWithoutFeedback = qunado clicar nele, ele chama uma função



 //função para incluir datas no IOS e no ANDROID (essa função de data é diferente nos dois)
    //no IOS quando coloco essa função ele //função para incluir datas no IOS e no ANDROID (essa função de data é diferente nos dois)

//{this.state.showDatePicker && datePicker}