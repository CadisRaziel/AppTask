import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
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

    return (
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
        paddingVertical: 10 //para dar um espaçamento tanto em cima quanto embaixo
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
    }
})



// props.estimateAt = data estimada
// props.doneAt = concluido em
//<Text style={[style.desc, doneOrNotStyle]}> para conseguirmos por mais de um style temos que colocar {[]}