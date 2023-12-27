import React, { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FloatingAction, FloatingIconPressActions, Position, } from 'rn-scrolling-fab';
import { AntDesign } from '@expo/vector-icons';
const App = () => {
    const [selected, setSelected] = useState('home');
    const [position, setPosition] = useState(Position.LEFT);
    const _renderIcon = (iconName) => (React.createElement(AntDesign, { name: iconName, size: 24, color: 'white' }));
    const actionsData = [
        {
            key: 'Home',
            icon: _renderIcon('home'),
        },
        {
            key: 'Star',
            icon: _renderIcon('staro'),
        },
        {
            key: 'Settings',
            icon: _renderIcon('setting'),
        },
        {
            key: 'Favorites',
            icon: _renderIcon('hearto'),
        },
        {
            key: 'profile',
            icon: _renderIcon('user'),
        },
        {
            key: 'pictures',
            icon: _renderIcon('picture'),
        },
        {
            key: 'Inbox',
            icon: _renderIcon('inbox'),
        },
        {
            key: 'Star',
            icon: _renderIcon('apple-o'),
        },
    ];
    const _onPressHandler = (key) => setSelected(key);
    return (React.createElement(ImageBackground, { source: require('../assets/background.png'), style: styles.container },
        React.createElement(Text, { style: styles.title }, selected),
        React.createElement(FloatingAction, { position: position, isVertical: true, actions: actionsData, onPressMain: (actionType) => _onPressHandler(`${actionType} FAB`), onPressItem: _onPressHandler }),
        React.createElement(Button, { title: 'Change position', onPress: () => setPosition((prev) => {
                if (prev === Position.LEFT)
                    return Position.RIGHT;
                return Position.LEFT;
            }) })));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        paddingTop: '20%',
        textAlign: 'center',
        alignSelf: 'center',
    },
});
export default App;
