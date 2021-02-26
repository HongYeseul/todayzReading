import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { setToken } from '../api/token';
import { TextInput, Title, Button } from 'react-native-paper';
import Toast from 'react-native-simple-toast';

const SignUp = ({ onSubmit, navigation }) => {
    const [id, onChangeId] = useState('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [passwordChk, onChangePasswordChk] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let chk = 1;

    const submit = () => {
        if(chk == 0){
            Toast.show('아이디 중복 확인을 진행 해 주세요.');
            return;
        }
        if(password == passwordChk){
            fetch('http://localhost:8000/users/signUp/' + id, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    pw : password,
                    name : name
                })
            }).then(response => response.text() )
            .then(async data =>{
                onChangeId('');
                onChangePassword('');
                onChangeName('');
                onChangePasswordChk('');
                chk=1;
                Toast.show('회원가입이 되었습니다.');
            })
            .catch((err) => {
                console.error(err);
            })
        }else{
            Toast.show('비밀번호가 일치하지 않습니다.');
        }
    };

    let confirmID = () => {
        fetch('http://localhost:8000/users/signUp/' + id, {
            method : 'GET',
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
        }).then(response => response.json() )
        .then(async data =>{
            if(data[0].chk == 0){
                chk = 0;
                Toast.show('사용 가능한 아이디입니다.');
            }
            else
                Toast.show('사용 불가능한 아이디입니다.')
        })
        .catch((err) => {
            console.error(err);
        })
    }

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
                    onPress={confirmID}
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