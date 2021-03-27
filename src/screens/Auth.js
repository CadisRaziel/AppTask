import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Platform, Alert } from 'react-native'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'

import axios from 'axios' 
import AsyncStorage from '@react-native-community/async-storage'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSucess } from '../common'


//para que ao fazer login ou cadastrar os dados não continue nos inputs por isso fazemos initialState
const initialState = { 
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
 }

export default class Auth extends Component {
    
    state = {
        ...initialState
    }

    //função para saber se o usuario quer criar a conta ou quer logar com sua conta existente
    signinOrSignup = () => {
        if(this.state.stageNew) { //se ele estiver no stageNew
            this.signup()
        }else {
            this.signin()
        }
    } 
    
    //criando ligação com o backend (tasks-backend)
    signup = async () => {
        try{
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,  
            })

            showSucess('Usuário cadastrado =D')
            this.setState({...initialState}) //vai dar usuario cadastrado e voltar para a tela de login para ele entrar

        }catch (e) {
            showError(e) //aqui se tiver email igual ou senha errada ele da erro
        }
    }

    signin = async () => {
        try{
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            //o asyncstorage vai fazer com que caso o usuario feche o app sem dar logout a hora que ele abrir de novo ele vai continuar logado
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('home', res.data) //res.data para ter acesso ao email e nome do usuario logado

        }catch(e){
            showError(e)
        }
    }

    render() {
        //na hora que for loga o email tem que ter o @ (se nao vamos entender que não é um email valido)
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@')) // só vai ser aceit o email que tiver o @
        validations.push(this.state.password && this.state.password.length >= 6) // a senha precisa ter 6 ou mais caracteres

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3) //o nome precisa ter 3 ou mais letras            
            validations.push(this.state.password === this.state.confirmPassword) //se a senha e a confirmação de senha estão iguais
        }

        const validForm = validations.reduce((total, valorAtual) => total && valorAtual) // valida o formulario, mais pra isso todos os campos acima tem que ser verdadeiro !

        return (
            <ImageBackground source={backgroundImage} style={style.background}>
                <Text style={style.title}>Tasks</Text>

                <View style={style.formContainer}>
                    <Text style={style.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder="Nome" value={this.state.name}
                            style={style.input} onChangeText={name => this.setState({ name })} />
                    }

                    <AuthInput icon='at' placeholder="Email" value={this.state.email}
                        style={style.input} onChangeText={email => this.setState({ email })} />

                    <AuthInput icon='lock' placeholder="Senha" value={this.state.password} secureTextEntry={true}
                        style={style.input} onChangeText={password => this.setState({ password })} />

                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' placeholder="Confirme sua senha" value={this.state.confirmPassword} secureTextEntry={true}
                        style={style.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }

                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[style.button, validForm ? {} : { backgroundColor: '#AAA'}]}>
                            <Text style={style.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar' }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* responsavel por fazer a alternancia entre modo usuario e modo criar login */}
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={style.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>

            </ImageBackground>
        )
    }
}


const style = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        width: '90%',
        borderRadius: 30
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        // padding: Platform.OS == 'ios' ? 15 : 10,
        borderRadius: 30
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }

})


//<View style={[style.button, validForm ? {} : { backgroundColor: '#AAA'}]}></View>
// se o formulario for valido ele não faz nada {}
//se for invalido ele deixa o botao disabilitado e cinza {backgroundcolor: '#AAA}