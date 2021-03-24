import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

import Icon from 'react-native-vector-icons/FontAwesome'

//importar horario e traduzi-lo para portugues
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import AddTask from './AdicionarTask'

export default class TaskList extends Component {

    state = {
        showDoneTasks: true, //caso o usuario clique no icone do "olho" as tasks concluidas somem e se desclicar aparecem
        showAddTasks: false,
        visibleTasks: [],
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

    //componente de ciclo de vida, se o componente ja foi montado
    componentDidMount = () => {
        this.filterTasks()
    }

    //caso o usuario clique no icone do "olho" as tasks concluidas somem e se desclicar aparecem
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    //logica de ao clicar no olho as tarefas concluidas somem
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt == null //para mostrar que a task ainda esta pendente !
            visibleTasks = this.state.tasks.filter(pending) //só vai pegar as tasks pendentes 
        }

        this.setState({ visibleTasks })
    }

    //caso ele clique aparece uma data de conclusão caso não deixa a data (concluida para pendente e vice versa)
    toggleTask = taskId => {
        const tasks = [...this.state.tasks] //criando copia do arrey
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM') //ddd = dia(segunda, terça ..), D = Dia do mes(1,2,3) [algo que quero escrever], MMM = mês(novembro, dezembro...)
        return (
            <View style={style.container}>

                <AddTask isVisible={this.state.showAddTasks}
                    onCancel={() => this.setState({showAddTasks: false})}/> 

                <ImageBackground source={todayImage}
                    style={style.bg}>

                        <View style={style.iconBar}>

                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                                    size={20} color={commonStyles.colors.secondary}/>                                    
                            </TouchableOpacity>

                        </View>

                        <View style={style.titleBar}>
                            <Text style={style.title}>Hoje</Text>
                            <Text style={style.subTitle}>{today}</Text>
                        </View>

                </ImageBackground>

                <View style={style.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>

                <TouchableOpacity style={style.addButton}
                    activeOpacity={0.7}//para que o botão nao fique branco ao clicar, e sim com uma opacidade rasoavel
                    onPress={() => this.setState({showAddTasks: true})}>
                    <Icon name="plus" size={20} 
                        color={commonStyles.colors.secondary}/>
                </TouchableOpacity>

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
    },
    iconBar: {
        flexDirection: 'row', //quando eu coloco flexDirection 'row' eu estou trocando de coluna para linha !!
        marginHorizontal: 12,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 40 : 10 //para que no iphone nao fique em cima do icone da hora e se for android da uma margin de 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'        
    }
})





//a tela que vai ter a lista das tarefas

//{Plataform} para destinguir ANDROID e IOS


//sempre que eu coloco .state eu estou lendo
//sempre que eu alterar o state eu coloco setState

//<AddTask isVisible={this.state.showAddTasks}
//onCancel={() => this.setState({showAddTasks: false})}/> //false para quando clicar na tela(ela tiver ofuscada), ele sai dessa tela