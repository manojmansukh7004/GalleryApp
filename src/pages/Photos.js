import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    SafeAreaView,
    StyleSheet,
    PermissionsAndroid,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';
import CameraRoll, { deletePhotos } from '@react-native-community/cameraroll';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import RNFS from 'react-native-fs'
const Photos = (props) => {
    const [imageuri, setImageuri] = useState('');
    const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
    const [type, setType] = useState([]);
    const [title, setTitle] = useState('');
    const [photos, setPhotos] = useState([]);

    const showModalFunction = (visible, imageURL) => {
        //handler to handle the click on image of Grid
        //and close button on modal
        setImageuri(imageURL);
        setModalVisibleStatus(visible);
    };

    const askPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(

                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permission Explanation',
                    message: 'ReactNativeForYou would like to access your photos!',
                },
            );
            if (result !== 'granted') {
                console.log('Access to pictures was denied');
                return;
            } else {
                deletePhoto();
            }
        } else {
            deletePhoto();
        }
    };

    const deletePhoto = async () => {
        // await CameraRoll.deletePhotos([imageuri])
            RNFS.unlink(imageuri)
            .then((response) => {
                console.log('res', response);
                updateGallery()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    const updateGallery = async () => {
        var temp=[]
        await CameraRoll.getPhotos({
            first: 50,
            groupName: title
        })
            .then((response) => {
                console.log(response.edges);
                temp.push(response.edges)
                console.log(temp);
                setPhotos(temp[0])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        setModalVisibleStatus(false);
    },[photos])

    useEffect(() => {
        var response = props.route.params.Photos;
        var title = response[0].title;
        var photos = response[1].edges;
        console.log(photos);
        setTitle(title);
        setPhotos(photos);
    }, [])

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                    <Icon name="keyboard-backspace" size={30} color={'#ffffff'} style={{ width: 50 }} onPress={() => (props.navigation.goBack())}></Icon>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>
                {
                    modalVisibleStatus ? (
                        console.log(type),
                        <View style={styles.modelStyle}>
                            {
                                type == "image/jpeg" ?
                                    <FastImage
                                        style={styles.fullImageStyle}
                                        source={{ uri: imageuri }}
                                        resizeMode={
                                            FastImage.resizeMode.contain
                                        }
                                    />
                                    :
                                    <Video
                                        source={{ uri: imageuri }}
                                        style={styles.imageBox}
                                        resizeMode="cover"
                                        controls={true}
                                    />
                            }

                            <View>
                                <Icon
                                    name="delete-circle"
                                    size={60}
                                    color={'#ffffff'}
                                    style={{ margin: 5 }}
                                    onPress={() =>
                                        askPermission()
                                    }
                                />
                            </View>
                        </View>
                    ) :
                        <FlatList
                            data={photos}
                            renderItem={({ item, index }) => (
                                console.log("itttttt",item),
                                <View style={styles.imageContainerStyle}>
                                    {photos.length !== 0 ?
                                    <TouchableOpacity
                                        key={item.id}
                                        style={{ width: '100%' }}
                                        onPress={() => {
                                            setType(item.node.type)
                                            showModalFunction(true, item.node.image.uri);
                                        }}>
                                        <FastImage
                                            style={styles.imageStyle}
                                            source={{
                                                uri: item.node.image.uri
                                            }}
                                        />
                                    </TouchableOpacity>
                                    :null
                                    }
                                </View>
                            )}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                        />
                }
            </View>
        </SafeAreaView>
    );
};
export default Photos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    titleStyle: {
        padding: 10,
        fontSize: 20,
        color: 'white',
        backgroundColor: '#000000',
        flexDirection: 'row'
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        // width: "30%"
    },
    imageStyle: {
        height: 120,
        width: '100%',
    },
    imageBox: {
        width: '90%',
        height: '80%'
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '98%',
        resizeMode: 'contain',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: 50,
        right: 20,
        position: 'absolute',
    },
});