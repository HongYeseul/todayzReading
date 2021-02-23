import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Title, Searchbar, FAB, Surface, Button } from 'react-native-paper';
import BookList from './BookList';
import { getIdToken, setIdToken } from '../api/token';
import { useEffect } from 'react';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [bookNum, setBookNum] = React.useState(0);
    let [loading, loadingModify] = React.useState({
        isLoading : true,
        books : []
    });

    let getBooks = async () => {
        if(loading.isLoading == true){
            fetch('http://localhost:8000/'+ await getIdToken(), {
                method : 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => response.json() )
            .then(async books =>{
                console.log(books);
                setBookNum(books.length);
                loadingModify({books, isLoading:false})
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }

    let getSearchBooks = async () => {
        fetch('http://localhost:8000/book/search/user/'+ await getIdToken(), {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                title : searchQuery
            })
        }).then(response => response.json() )
        .then(async books =>{
            console.log(books);
            console.log("THIS IS book");
            console.log(loading.books)
            loadingModify({books})
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(()=>{
        getBooks();
    });

    return (
        <>
        <View style={styles.makeRow}>
            <Surface style={styles.surface}>
                <View style={styles.makeRow}>
                    <Title>내가 읽은 책 </Title>
                    <Title style={styles.bookNum}>{bookNum} 권</Title>
                </View>
            </Surface>

            <Avatar.Image style={styles.userFace} source={require('../img/user.png')} />
        </View>

        <View style={styles.makeRow}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            
            <Button 
                style={styles.searchBtn}
                mode='contained'
                onPress={()=> {
                    getSearchBooks();
                }}
            >검색</Button> 
        </View>
        
        <ScrollView>
            {
                loading.isLoading
                ? <Text>Loading ...</Text>
                : (
                    loading.books.map((book, idx) => {
                        return(
                            <BookList
                                id = {idx}
                                title = {book.title}
                                authors = {book.authors}
                                publisher = {book.publisher}
                                grade = {book.grade}
                                review = {book.review}
                            />
                        )
                    })
                )
            }
        </ScrollView>

        {/* <FAB
            style={styles.fab}
            // small
            icon="plus"
            onPress={() => navigation.navigate('로그인')}
        /> */}
        </>
    );
    };

const styles = StyleSheet.create({
    makeRow:{
        flexDirection:'row'
    },
    surface: {
        // padding: 8,
        height: 80,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderRadius:15,
        margin:10,
    },
    userFace:{
        padding: 8,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 4,
        borderRadius:50,
        margin:10,
        backgroundColor:'#ededed',
    },
    bookNum:{
        fontSize: 30,
        fontWeight:'bold'
    },
    searchBar:{
        height: 40,
        width: 250,
        margin:10,
    },
    searchBtn: {
        height: 40,
        width: 80,
        margin : 10,
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    },
});

export default MainPage;