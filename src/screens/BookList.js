import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title, Searchbar, FAB, Surface, Text, Button, Caption, Subheading, Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';

const BookList = ( { navigation, title, authors, publisher, grade, review, thumbnail } ) => {
    const [starCount, setStarCount] = React.useState(5);

    return (
        <>
        <TouchableOpacity onPress={() => 
            navigation.navigate('상세페이지', 
            {
                location : navigation.state.routeName,
                title : title,
                authors : authors,
                grade : grade,
                review : review,
                thumbnail : thumbnail
            })}>
        <Surface style={styles.container}>
            <Card>
                <Card.Cover style={styles.bookImg} source={{ uri: thumbnail }} />
            </Card>
            {/* <Surface style={styles.bookImg}>ls</Surface> */}
            <View style={styles.content}>
                <Title>{title}</Title>
                <Caption>{authors}</Caption>
                <StarRating
                    disabled={true}
                    maxStars={grade}
                    rating={starCount}
                    starSize={10}
                    containerStyle={{width:55}}
                />
                <Caption>{review}</Caption>
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
        height: 120,
        width: 100,
        justifyContent: 'center',
        elevation: 2,
    },
    content:{
        margin:10,
        width:200,
    },

});

export default withNavigation(BookList);