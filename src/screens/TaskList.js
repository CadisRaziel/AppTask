import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

//importar horario e traduzi-lo para portugues
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(), 
            desc: 'Comprar Livro de React-Native',
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(), 
            desc: 'Ler Livro de React-Native',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM') //ddd = dia(segunda, terça ..), D = Dia do mes(1,2,3) [algo que quero escrever], MMM = mês(novembro, dezembro...)
        return (
            <View style={style.container}>
                <ImageBackground source={todayImage}
                    style={style.bg}>
                        <View style={style.titleBar}>
                            <Text style={style.title}>Hoje</Text>
                            <Text style={style.subTitle}>{today}</Text>
                        </View>
                </ImageBackground>
                <View style={style.taskList}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} />} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    bg: {
        flex: 3 //vai ocupar 30% (ou seja ela vai ficar na parte de cima certinho)
    },
    taskList: {
        flex: 7 //vai ocupar 70%
    },
    titleBar : {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
})





//a tela que vai ter a lista das tarefas