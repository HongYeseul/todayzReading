import React, { useState }  from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button} from 'react-native-paper';
import {createAccount} from '../api/mock'
import { setToken } from '../api/token';
import SignUp from '../forms/SignUp';

const CreateAccountScreen = ({navigation}) => {
    const [errorMessage, setErrorMassage] = useState('');
    const createUser = async () => {
        setErrorMassage('');
        createAccount('test@test.ca', 'password')
            .then( async (res) => {
                await setToken(res.auth_token);
                navigation.navigate('오늘의독서');
            })
            .catch((err)=> setErrorMassage(err.message));
    }

    return (
        <SignUp
            buttonText="로그인 하러가기"
            onSubmit={createAccount}
            onAuthentication={()=> navigation.navigate('오늘의독서')}
        >
        </SignUp>
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
    },
});
export default CreateAccountScreen;