import React, { useState, useEffect }  from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Button, Searchbar, Text} from 'react-native-paper';
import BookList from './BookList'

const AddBook = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    let [loading, loadingModify] = React.useState({
        isLoading : true,
        books : []
    });

    let getBooks = async () => {
        if(loading.isLoading == true){
            fetch('http://localhost:8000/book/search/', {
                method : 'POST',
                headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    title : "안녕"
                })
            }).then(response => response.json() )
            .then(async data =>{
                loadingModify({books : data, isLoading:false})
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }

    let searchBooks = async () => {
        fetch('http://localhost:8000/book/search/', {
            method : 'POST',
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
            body : JSON.stringify({
                title : searchQuery
            })
        }).then(response => response.json() )
        .then(async data =>{
            loadingModify({books : data})
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(()=>{
        getBooks();
    });

    return (
        <View style={styles.container}>
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
                onPress={searchBooks}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    makeRow:{
        flexDirection:'row'
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
});
export default AddBook;