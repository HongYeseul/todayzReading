import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { setToken } from '../api/token';
import { TextInput, Title, Button } from 'react-native-paper';

const LoginForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
    const [id, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 로그인
    const submit = () => {
        fetch('http://localhost:8000/users/login', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                id : id,
                pw : password
            })
        }).then(response => response.json() )
        .then(async data =>{
            let success = data.success;
            console.log("data : ", success);
            if(success == 1){
                await setToken('login');
                onAuthentication();
            }else console.log("로그인 실패")
        })
        .catch((err) => {
            console.error(err);
        })
        // onSubmit(id, password)
        // .then(async (res) => {
        //     await setToken(res.auth_token);
        //     onAuthentication();
        // })
        // .catch((res) => setErrorMessage(res.error));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Today's reading</Title>
            <TextInput
                style={styles.input}
                mode='outlined'
                label='아이디'
                onChangeText={(text) => onChangeEmail(text)}
                value={id}
            />
            <TextInput
                style={styles.input}
                mode='outlined'
                label="비밀번호"
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <Button 
                style={styles.input}
                onPress={submit}
                mode='contained'
            >로그인</Button> 
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {children}
        </ScrollView>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        justifyContent: 'center',
        marginTop: 20,
    },
    title:{
        fontSize: 30,
    },
});

export default LoginForm;