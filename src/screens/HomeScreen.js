import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import { getUsers } from '../api/mock';
import { setToken } from '../api/token';
import MainPage from './MainPage';

export default class HomeScreen extends React.Component{

    state = { users : [], hasLoadedUsers : false, userLoadingErrorMessage:''};

    loadUsers(){
        this.setState({ hasLoadedUsers:false, userLoadingErrorMessage:''});
        getUsers()
            .then((res)=>
                this.setState({
                    hasLoadedUsers : true,
                    users: res.users,
                }),
            )
            .catch(this.handleUserLoadingError);
    }

    handleUserLoadingError = (res) => {
        if(res.error === 401){
            this.props.navigation.navigate('Login');
        }else {
            this.setState({
                hasLoadedUsers:false,
                userLoadingErrorMessage: res.message,
            });
        }
    }

    componentDidMount(){
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            () => {
                if(!this.state.hasLoadedUsers){
                    this.loadUsers();
                }
            },
        );
    }

    componentWillUnmount(){
        this.didFocusSubscription.remove();
    }

    logOut = async () => {
        this.setState({ hasLoadedUsers : false, users:[]})
        await setToken('');
        this.props.navigation.navigate('Login');
    }

    render(){
        return (
            <View style = {{flex: 1, alignItems: 'center', }}>
                {/* {
                    this.state.users.map((user)=>(
                        <Text key={user.email}>{user.email}</Text>
                    ))
                } */}
                <MainPage></MainPage>
                <FAB
                    style={styles.fab}
                    // small
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('AddBook')}
                />
                <Button title="Log out" onPress={this.logOut}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    },
});