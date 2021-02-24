import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title, Colors, Searchbar, FAB, Surface, Text, Button, Caption, TextInput,Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import { getIdToken } from '../api/token';
import Toast from 'react-native-simple-toast';

const BookList = ( {navigation} ) => {
    const [text, setText] = React.useState(navigation.getParam("review"));
    const [starCount, setStarCount] = React.useState(navigation.getParam("grade"));
    const [title, setTitle] = React.useState(navigation.getParam("title"));
    const [author, setAuthor] = React.useState(navigation.getParam("authors"));
    const previousScreen = navigation.getParam("location");
    const [modifyBtn, setModifyBtn] = React.useState(true);
    const [confirmBtn, setConfirmBtn] = React.useState(false);
    const [deleteBtn, setDeleteBtn] = React.useState(false);

    let addBookToDB = async () => {
        let userId = await getIdToken();
        fetch('http://localhost:8000/book/review/' + userId, {
            method : 'POST',
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
            body : JSON.stringify({
                id : userId,
                title : navigation.getParam("title"),
                authors : navigation.getParam("authors"),
                grade : starCount,
                review : text,
                thumbnail : navigation.getParam("thumbnail"),
            })
        }).then(response => response.json() )
        .then(async data =>{
            Toast.show('추가되었습니다.')
        })
        .catch((err) => {
            console.error(err);
        })
    }

    let deleteBookToDB = async () => {
        let userId = await getIdToken();
        fetch('http://localhost:8000/book/review/' + userId, {
            method : 'DELETE',
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
            body : JSON.stringify({
                id : userId,
                title : navigation.getParam("title"),
            })
        }).then(response => response.json() )
        .then(async data =>{
            Toast.show('삭제되었습니다.')
        })
        .catch((err) => {
            console.error(err);
        })
    }

    let modifyBookToDB = async () => {
        let userId = await getIdToken();
        fetch('http://localhost:8000/book/review/' + userId, {
            method : 'PATCH',
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
            body : JSON.stringify({
                title : title,
                grade : starCount,
                review : text,
            })
        }).then(response => response.json() )
        .then(async data =>{
            setModifyBtn(true);
            Toast.show('수정되었습니다.')
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <>
        <ScrollView>
        <View style = {{flex: 1, alignItems: 'center', paddingTop:20}} >  
        <Surface style={styles.container}>
            <Card>
                <Card.Cover style={styles.bookImg} source={{ uri: navigation.getParam("thumbnail") }} />
            </Card>
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
                <Button style={styles.Btn} mode="contained" onPress={deleteBookToDB}>
                    삭제
                </Button>
                {
                    modifyBtn == false
                    ? <Button style={styles.Btn} mode="contained" onPress={modifyBookToDB}>
                        확인
                    </Button>
                    : <></>
                }
                </>
                : <>
                <Button style={styles.Btn} mode="contained" onPress={addBookToDB}>
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
        height: 535,
        width: 360,
        justifyContent: 'center',
        elevation: 1,
        borderRadius:15,
        margin:5,
        flexDirection:'row',
        flexWrap: 'wrap',
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