import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Title, Searchbar, FAB, Surface, Button } from 'react-native-paper';
import BookList from './BookList';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [bookNum, setBookNum] = React.useState(0);

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
            >검색</Button> 
        </View>
        
        <ScrollView>
            <BookList></BookList>
            <BookList></BookList>
            <BookList></BookList>
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