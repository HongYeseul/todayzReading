import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title, Colors, Searchbar, FAB, Surface, Text, Button, Caption, TextInput,TextInputMask } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';

const BookList = ( {navigation} ) => {
    const [text, setText] = React.useState('');
    const [starCount, setStarCount] = React.useState(3);
    const [title, setTitle] = React.useState('Title');
    const [author, setAuthor] = React.useState('Author');
    const previousScreen = navigation.getParam("location");
    const [modifyBtn, setModifyBtn] = React.useState(true);
    const [confirmBtn, setConfirmBtn] = React.useState(false);
    const [deleteBtn, setDeleteBtn] = React.useState(false);

    return (
        <>
        <ScrollView>
        <View style = {{flex: 1, alignItems: 'center', paddingTop:20}} >  
        <Surface style={styles.container}>
            <Surface style={styles.bookImg}></Surface>
            <View style={styles.content}>
                <Title style={{marginBottom:-3, fontSize:20}}>{title}</Title>
                <Caption style={{fontSize:15}}>{author}</Caption>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => setStarCount(rating)}
                    starSize={20}
                    containerStyle={{width:100, marginTop:30}}
                />
            </View>
            {
                previousScreen == '오늘의독서'
                ? <TextInput
                    style={styles.TxtBox}
                    disabled={modifyBtn}
                    mode="outlined"
                    value={text}
                    multiline={true}
                    onChangeText={text => setText(text)}
                    placeholder="내용을 입력하세요."
                    underlineColor='transparent'
                ></TextInput>
                : <TextInput
                    style={styles.TxtBox}
                    mode="outlined"
                    value={text}
                    multiline={true}
                    onChangeText={text => setText(text)}
                    placeholder="내용을 입력하세요."
                    underlineColor='transparent'
                ></TextInput>
            }
        </Surface>
        </View>

        <View style={styles.btnContainer}>
            {
                previousScreen == '오늘의독서'
                ? <><Button style={styles.Btn} mode="contained" onPress={() => setModifyBtn(false)}>
                    수정
                </Button>
                <Button style={styles.Btn} mode="contained" onPress={() => console.log('Pressed')}>
                    삭제
                </Button>
                {
                    modifyBtn == false
                    ? <Button style={styles.Btn} mode="contained" onPress={() => console.log('Pressed')}>
                        확인
                    </Button>
                    : <></>
                }
                </>
                : <>
                <Button style={styles.Btn} mode="contained" onPress={() => console.log('Pressed')}>
                    확인
                </Button>
                </>
            }
            
            
        </View>
        </ScrollView>
        </>
    );
    };

const styles = StyleSheet.create({
    container: {
        padding: 13,
        height: 510,
        width: 360,
        justifyContent: 'center',
        elevation: 1,
        borderRadius:15,
        margin:5,
        flexDirection:'row',
        flexWrap: 'wrap',
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
    TxtBox:{
        height: 350,
        width: 320,
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent: 'flex-end',
        marginRight:30,
    },
    Btn:{
        width:40,
        margin:5
    },

});

export default withNavigation(BookList);