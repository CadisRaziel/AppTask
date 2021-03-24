import React, { Component } from 'react'
import { View, Text, ImageBackground,
     StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome'
     
//importar horario e traduzi-lo para portugues
import moment from 'moment'
import 'moment/locale/pt-br'
     
import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import Task from '../components/Task'
import AddTask from './AdicionarTask'

const initialState = { 
    showDoneTasks: true, //caso o usuario clique no icone do "olho" as tasks concluidas somem e se desclicar aparecem
    showAddTasks: false,
    visibleTasks: [],
    tasks: [] 
 }


export default class TaskList extends Component {

    state = {
        ...initialState      
    }

    //quando esse metodo for chamado eu quero restaurar o estado da minha aplicaçao quando o componente for exibido
    //quando esse metodo for chamado AsyncStorage.setItem('tasksState', JSON.stringify(this.state)) eu quero aqui restaurar o estado a aplicação
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString) || initialState

        this.setState(state, this.filterTasks)
    }

    //caso o usuario clique no icone do "olho" as tasks concluidas somem e se desclicar aparecem
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    //sempre é chamado que a uma mudança, uma task muda o estado para pendente, ou concluido ou mudo a visibilidade..
    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt == null //para mostrar que a task ainda esta pendente !
            visibleTasks = this.state.tasks.filter(pending) //só vai pegar as tasks pendentes 
        }

        this.setState({ visibleTasks })

        //vai transforma o state em uma string e setar no async storage  
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
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

    //adicionando uma nova task (como nao temos db vamos adicionar ele dentro do array la em cima "task")
    //!newTask.desc.trim() = o trim faz que no input nao seja aceito texto nullo e texto com apenas espaço em branco
    adicionarTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return 
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTasks: false}, this.filterTasks)
    }

    //função que vai ser chamada do "Task.js" para poder excluir a tarefa
    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY') //ddd = dia(segunda, terça ..), D = Dia do mes(1,2,3) [algo que quero escrever], MMM = mês(novembro, dezembro...)
        return (
            <View style={style.container}>

                <AddTask isVisible={this.state.showAddTasks}
                    onCancel={() => this.setState({showAddTasks: false})}
                    onSave={this.adicionarTask} /> 

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
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} 
                        onDelete={this.deleteTask}/>} />
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