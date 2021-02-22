import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import AddBook from "./src/screens/AddBook";
import BookList from './src/screens/BookList';
import DetailBook from "./src/screens/DetailBook";

const AppNavigator = createStackNavigator(
  {
    오늘의독서: HomeScreen,
    로그인 : LoginScreen,
    회원가입 : CreateAccountScreen,
    책추가하기 : AddBook,
    BookList : BookList,
    상세페이지 : DetailBook
  },
  {
    initialRouteName : '오늘의독서',
  },
);

let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return(
        <Navigation/>
    )
  }
}