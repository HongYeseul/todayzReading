import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { setToken } from '../api/token';
import { TextInput, Title, Button } from 'react-native-paper';

const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = () => {
        onSubmit(email, password)
        .then(async (res) => {
            await setToken(res.auth_token);
            onAuthentication();
        })
        .catch((res) => setErrorMessage(res.error));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Today's reading</Title>
            <TextInput
                style={styles.input}
                mode='outlined'
                label='Email'
                onChangeText={(text) => onChangeEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                mode='outlined'
                label="Password"
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <Button 
                style={styles.input}
                onPress={submit}
                mode='contained'
            >{buttonText}</Button> 
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
        // borderColor: 'gray',
        // borderWidth: 1,
        marginTop: 20,
    },
    title:{
        fontSize: 30,
    },
});

export default EmailForm;