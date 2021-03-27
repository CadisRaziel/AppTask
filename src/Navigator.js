import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

import AuthorApp from './screens/AuthorApp'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'

//menu drawer personalizado
const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu, //vai ter o conteudo do drawer
    contentOptions: {
        //opções realacionadas ao conteudo do drawer
        labelStyle: {
            //aqui vamos poder personalizar as configurações do label
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            //quando o label estiver ativo ele vai tar verdinho com as letras em negrito
            color: '#080',
            fontWeight: 'bold'
        }
    }
}

//menu lateral
const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <TaskList title='Hoje' daysAhead={0} {...props}/>,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList title='Amanhã' daysAhead={1} {...props}/>,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        Tomorrow: 'Week',
        screen: props => <TaskList title='Semana' daysAhead={7} {...props}/>,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList title='Mês' daysAhead={31} {...props}/>,
        navigationOptions: {
            title: 'Mês'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoute = { 
    AuthorApp : {
        //caso eu feche o app e abra de novo ele vai verifica se tem um token valido no celular e vai deixar a conta logada
        name: 'AuthorApp',
        screen: AuthorApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth //referencia para o import acima
    },
    home: {
        name: 'home', // não posso por home com H maiusculo ainda não sei o motivo
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoute, {
    initialRouteName: 'AuthorApp' //caso eu queira alterar a tela inicial ao abrir o app é só eu criar no mainRoute e colocar aqui !!!
})

export default createAppContainer(mainNavigator)


//importar esse modulo no index.js
//pois essa é a tela inicial do app (que no caso vai ser 'Auth' como eu defini ali no mainNavigator)
//e quando o usuario logar ele vai para a tela TaskList