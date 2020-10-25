import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import Cookies from "universal-cookie";

const loginRequest = axios.create({
    baseURL: 'http://localhost:3000/login/'
});

export default class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }
    onLogin = (() => {
        loginRequest.post('/login', {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            alert(res.data.msg);
            if (res.data.status == 'success') {
                const cookies = new Cookies();
                cookies.set("token", res.data.result.token, {
                    expires: new Date(Date.now() + 3600000)
                });

                this.props.navigation.navigate('Main')

            }
        });
    });

    onSignUp = (() => {
        this.props.navigation.navigate('Register')
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>MediConCen</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
                    <Text
                        style={styles.loginText}
                    >LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupBtn} onPress={this.onSignUp}>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F8CCF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        backgroundColor: 'white',
    },
    inputText: {
        height: 50,
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#72EA6F",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupBtn: {
        width: "80%",
        backgroundColor: "#599BDA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});
