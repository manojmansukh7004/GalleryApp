import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import FastImage from 'react-native-fast-image';

const Albums = (props) => {
  const [albums, setAlbums] = useState([])

  const getPhotos = () => {
    var album = []
    CameraRoll.getAlbums({
      assetType: 'All',
    })
      .then(async (res) => {
        for (var i = 0; i < res.length; i++) {
          var temp = []
          await CameraRoll.getPhotos({
            first: 50,
            groupName: res[i].title
          })
            .then((response) => {
              temp.push(res[i]);
              temp.push(response)
              album.push(temp)
              temp = []
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setAlbums(album)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => askPermission())
    // askPermission();
  }, []);

  const showModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    setImageuri(imageURL);
    setModalVisibleStatus(visible);
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.titleStyle}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={()=>{props.navigation.openDrawer()}}>
          <Image
            source={(require('../Assert/gallery.webp'))}
            style={{ height: 50, width: 50 }}
          />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>{'Gallery'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Icon
            name="camera"
            color={'white'}
            size={35}
            style={{marginRight:10}}
            onPress={()=>{props.navigation.navigate('ImagePicker',{type: 'photo'})}}
          />
          <Icon
            name="video"
            color={'white'}
            size={40}
            style={{marginRight:15}}
            onPress={()=>{props.navigation.navigate('ImagePicker',{type: 'video'})}}
          />      
            </View>
      </View>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <View style={styles.imageContainerStyle}>
            <TouchableOpacity
              key={item.id}
              style={{ width: '100%' }}
              onPress={() => (props.navigation.navigate('Photos', { Photos: item }))}>
              <FastImage
                style={styles.imageStyle}
                source={{
                  uri: item[1].edges[0].node.image.uri,
                }}
              />
              <View style={styles.albumStyle}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="folder" size={18} style={{ margin: 3 }} color={'white'} />
                  <Text style={{ alignSelf: 'flex-start', color: '#ffffff', margin: 3 }}>{item[0].title}</Text>
                </View>
                <View>
                  <Text style={{ alignSelf: 'flex-end', color: '#ffffff', margin: 3 }}>{item[0].count}</Text>
                </View>

              </View>

            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};
export default Albums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  titleStyle: {
    // padding: 10,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageContainerStyle: {
    // flex: 1,
    flexDirection: 'column',
    margin: 2,
    width: '49%',
  },
  imageStyle: {
    height: 200,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: 'absolute',
  },
  albumStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    top: '88%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});