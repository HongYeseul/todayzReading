import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Title, Searchbar, FAB, Surface, Text, Button, Caption, Subheading } from 'react-native-paper';

const BookList = () => {

    return (
        <>
        <Surface style={styles.container}>
            <Surface style={styles.bookImg}></Surface>
            <View style={styles.content}>
                <Title>Title</Title>
                <Caption>Author</Caption>
                <Text>★★★★★</Text>
                <Caption>This is my favorite book ...</Caption>
            </View>
        </Surface>
        </>
    );
    };

const styles = StyleSheet.create({
    container: {
        padding: 8,
        height: 150,
        width: 360,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        borderRadius:15,
        margin:5,
        flexDirection:'row',
    },
    bookImg:{
        padding: 8,
        height: 120,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    content:{
        margin:10,
        width:200,
    },

});

export default BookList;