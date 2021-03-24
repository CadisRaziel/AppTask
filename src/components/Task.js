import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

    //para colocar um risco no nome da tarefa CONCLUIDA
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    //se estiver concluido ele coloca a data que foi concluida, se não vai por a data estimada
    const date = props.doneAt ? props.doneAt : props.estimateAt

    const formattedDate = moment(date).local('pt-br')
        .format('ddd, D [de] MMMM')

    //const function para ativar o "renderRightActions", quand o usuario arrastar para o lado esquerdo aparece o icone do lixo para ele clicar
    const getRightContent = () => {
        return (
            <TouchableOpacity style={style.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>                
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    //quando o usuario arrastar para o lado direito vai excluir direto sem precisar clicar no icone
    const getLeftContent = () => {
        return (
            <View style={style.left}>
                <Icon name="trash" size={20} color='#FFF' style={style.excludeIcon} />
                <Text style={style.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent}
                   renderLeftActions={getLeftContent}
                   onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>

            <View style={style.container}>

                <TouchableWithoutFeedback
                    onPress={() => props.toggleTask(props.id)}>

                    <View style={style.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>

                </TouchableWithoutFeedback>

                <View>
                    <Text style={[style.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={style.date}>{formattedDate}</Text>
                </View>

            </View>

        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={style.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={style.peding}>

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', //para deixar alinhado em linha
        borderColor: '#AAA', //cor da borda
        borderBottomWidth: 1, //grossura da borada
        alignItems: 'center', //para alinhar no centro
        paddingVertical: 10, //para dar um espaçamento tanto em cima quanto embaixo
        backgroundColor: '#FFF' //NÃO ESQUECER DE COLOCAR ESSE BACKGROUND POIS SE NAO NA HORA DE ARRASTAR PRA EXCLUIR FICA UMA COISA EM CIMA DA OUTRA
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    peding: { //para ficar uma bola perfeita
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1, //largura da borda
        borderColor: '#555'
    }, 
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#32CD32',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: { //descrição
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 18,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1, //para que a hora que arrastar para o lado direito quando atingir 50% ele corra sozinho ate o final(o excluir)
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
})



// props.estimateAt = data estimada
// props.doneAt = concluido em
//<Text style={[style.desc, doneOrNotStyle]}> para conseguirmos por mais de um style temos que colocar {[]}


//Swipeable = para voce poder clicar e segurar a tarefa e arrastar para o lado e ela excluir "No caso vamos escolher o lado direito"


//onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}> a hora que ele clica e arrasta pro lado direito vai realizar a exclusao