import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { setToken } from '../api/token';
import { TextInput, Title, Button } from 'react-native-paper';

const SignUp = ({ onSubmit, children, onAuthentication }) => {
    const [id, onChangeId] = useState('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [passwordChk, onChangePasswordChk] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = () => {
        onSubmit(id, password)
        // password 동일한지 확인 하는 메소드 추가
        .then(async (res) => {
            await setToken(res.auth_token);
            onAuthentication();
        })
        .catch((res) => setErrorMessage(res.error));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Today's reading</Title>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.inputID}
                    mode='outlined'
                    label='아이디'
                    onChangeText={(text) => onChangeId(text)}
                    value={id}
                />
                <Button 
                    style={styles.inputBtnChk}
                    onPress={submit}
                    mode='contained'
                >중복확인</Button>
            </View>
            <TextInput
                style={styles.input}
                mode='outlined'
                label="이름"
                onChangeText={(text) => onChangeName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                mode='outlined'
                label="비밀번호"
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                mode='outlined'
                label="비밀번호 확인"
                onChangeText={(text) => onChangePasswordChk(text)}
                value={passwordChk}
                secureTextEntry
            />
            <Button 
                style={styles.input}
                onPress={submit}
                mode='contained'
            >확인</Button> 
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
    containerInput:{
        flexDirection:'row'
    },
    input: {
        height: 40,
        width: 300,
        marginTop: 10,
        justifyContent: 'center',
    },
    inputID: {
        height:40,
        width: 190,
        marginTop:10, 
    },
    inputBtnChk:{
        height:40,
        width: 100,
        marginLeft: 10,
        marginTop: 17, 
        justifyContent: 'center',
    },
    title:{
        fontSize: 30,
    },
});

export default SignUp;