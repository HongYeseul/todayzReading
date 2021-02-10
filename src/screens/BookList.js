import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title, Searchbar, FAB, Surface, Text, Button, Caption, Subheading } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';

const BookList = ( { navigation } ) => {
    const [starCount, setStarCount] = React.useState(5);

    return (
        <>
        <TouchableOpacity onPress={() => navigation.navigate('상세페이지', {location : navigation.state.routeName})}>
        <Surface style={styles.container}>
            <Surface style={styles.bookImg}></Surface>
            <View style={styles.content}>
                <Title>Title</Title>
                <Caption>Author</Caption>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={starCount}
                    starSize={10}
                    containerStyle={{width:55}}
                />
                <Caption>This is my favorite book ...</Caption>
            </View>
        </Surface>
        </TouchableOpacity>
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

export default withNavigation(BookList);