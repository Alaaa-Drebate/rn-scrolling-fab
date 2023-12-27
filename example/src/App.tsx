import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FloatingAction, Position } from 'rn-scrolling-fab';
import { AntDesign } from '@expo/vector-icons';

const App = (): React.ReactElement => {
  // State variables
  const [selected, setSelected] = useState<string>(
    'FAB state will be displayed here'
  );
  const [position, setPosition] = useState<Position>(Position.LEFT);
  const [showHorizontal, setShowHorizontal] = useState(false);

  // Function to render icons
  const _renderIcon = (iconName: string) => (
    // @ts-ignore
    <AntDesign name={iconName} size={24} color={'white'} />
  );

  // Array of actions for the FAB
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

  // Handler for FAB press events
  const _onPressHandler = (key: string) => setSelected(`${key} Pressed`);
  // Function to toggle the position of the FAB
  const _changePosition = () =>
    setPosition(position === Position.LEFT ? Position.RIGHT : Position.LEFT);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
    >
      <Text style={styles.title}>{selected}</Text>
      {!showHorizontal && (
        <FloatingAction
          position={position}
          isVertical
          actions={actionsData}
          onPressMain={(actionType) => _onPressHandler(`${actionType} FAB`)}
          onPressItem={_onPressHandler}
        />
      )}
      {showHorizontal && (
        <FloatingAction
          position={position}
          actions={actionsData}
          onPressMain={(actionType) => _onPressHandler(`${actionType} FAB`)}
          onPressItem={_onPressHandler}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={_changePosition}>
        <Text style={styles.buttonText}>Change position</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowHorizontal((prev) => !prev)}
      >
        <Text style={styles.buttonText}>Toggle Vertical/Horizontal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    paddingTop: '20%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,123,255,0.66)',
    width: '60%',
    alignSelf: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  buttonText: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default App;
