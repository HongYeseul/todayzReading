import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { login } from '../api/mock';
import { setToken } from '../api/token';
import LoginForm from '../forms/LoginForm';
import { Button } from 'react-native-paper';

const LoginScreen = ({navigation}) => {
    return (
        <LoginForm
            onSubmit={login}
            onAuthentication={()=> navigation.navigate('오늘의독서')}
        >
            <Button 
                style={styles.loginBtn}
                onPress={()=> navigation.navigate('회원가입')}
                mode='outlined'
            >회원가입</Button> 
        </LoginForm>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        height: 40,
        width: 300,
        marginTop: 20,
        justifyContent: 'center',
    },
});

export default LoginScreen;