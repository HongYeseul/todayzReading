import React, { useState }  from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Button, Searchbar} from 'react-native-paper';
import BookList from './BookList'

const AddBook = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
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
            >검색</Button> 
        </View>
        
        <ScrollView>
            <BookList></BookList>
            <BookList></BookList>
            <BookList></BookList>
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