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
    // Home: {
    //   screen: HomeScreen, // <----
    // },
    // Login: {
    //   screen: LoginScreen, // <----
    // },
    // CreateAccount: {
    //   screen: CreateAccountScreen, // <----
    // },
    // AddBook: {
    //   screen: AddBook, // <----
    // },
    // BookList: {
    //   screen: BookList, // <----
    // },
    Home: HomeScreen,
    Login : LoginScreen,
    CreateAccount : CreateAccountScreen,
    AddBook : AddBook,
    BookList : BookList,
    상세페이지 : DetailBook
  },
  {
    initialRouteName : 'Home',
  },
);

export default createAppContainer(AppNavigator);