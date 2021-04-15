import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import {  Drawer, Title, Caption, Divider } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DrawerContent = (props) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.userInfoSection}>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        name="account-circle"
                        color={ 'black'}
                        size={80}
                    />
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={styles.title}>{'Manoj Devidas Mansukh'}</Title>
                        <Caption style={styles.caption}>{'manojmansukh7@gmail.com'}</Caption>
                    </View>
                </View>
            </View>
            <Divider style={{ margin: 5, height: 1, backgroundColor: '#f27024' }} />

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

              
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { BackHandler.exitApp()}}
                />
            </Drawer.Section>
        </View>
    );
}
export default DrawerContent
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        // paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});