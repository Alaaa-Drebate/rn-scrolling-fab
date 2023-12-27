# React Native Scrolling FAB

Scrollable Float action button for React Native with NativeDriver for high-performance animations.

**Table of Content**:

- [How it looks](#how-it-looks)
- [Installation](#installation)
- [Example (local)](#example)
- [How to use it](#how-to-use-it)
- [Reference](#reference)
  - [Props](#props)
  - [Actions Props](#actionsprops)
- [TODO](#todo)

## How it looks

<img src="https://github.com/Alaaa-Drebate/image-resources/blob/main/screen_record.gif?raw=true" width="350">

## Installation

```
npm i rn-scrolling-fab --save
```

or

```
yarn add rn-scrolling-fab
```

## Example

Take a look into **example** folder

To execute the example using **Expo** run the following command:

```bash
yarn run run:example
```


## How to use it

**Step 1:** Import the `FloatingAction` component:

```javascript
import { FloatingAction } from "rn-scrolling-fab";
```

**Second step:** define the buttons

```javascript
const actions = [
  {
     key: "bt_home",
     icon: require("./images/ic_home_white.png"),
  },
  {
     key: "bt_favorite",
     icon: require("./images/ic_favorite_white.png"),
  },
  {
     key: "bt_news",
     icon: require("./images/ic_news_white.png"),
  },
  {
     key: "bt_video",
    icon: require("./images/ic_video_white.png"),
  }
];
```
***or pass icon as component***
```javascript
const actions = [
  {
     key: "UK",
     icon: <Text>🇬🇧</Text>,
  },
  {
     key: "CA",
     icon: <Text>🇨🇦</Text>,
  },
  {
     key: "DE",
     icon: <Text>🇩🇪</Text>,
  },
  {
     key: "USA",
     icon: <Text>🇺🇸</Text>,
  }
];
```
**Third step:** use it

```javascript
<View style={styles.container}>
  <Text style={styles.example}>Floating Action example</Text>
  <FloatingAction
    actions={actions}
    onPressItem={key => {
      console.log(`selected button: ${key}`);
    }}
  />
</View>
```

# Reference

## Props

### `actions: Array<ActionsProps>`

- **Default:** `[]`

  Actions to be displayed when the main Floating Action Button is pressed. See [ActionsProps](#actionsprops) section for more information about the `ActionsProps` keys and values.

### `size: number`

- **Default:** `screenWidth * 0.13`

  The size of the Floating Action Button.

### `isVertical: boolean`

- **Default:** `false`

  Determines whether the actions are displayed vertically as a Vertical Fab or horizontally. By default, it is set to display horizontally.

### `isHidden: boolean`

- **Default:** `false`

  Determines whether the Floating Action Button is hidden. By default, it is visible.

### `tintColor: ColorValue`

- **Default:** `rgba(24,24,24,0.5)`

  The color of the Floating Action Button. Pass this `ColorValue` as a hexadecimal color respecting the default format.

### `overlayColor: ColorValue`

- **Default:** `rgba(0,0,0,0.1)`

  The overlay color of the Floating Action Button. Pass this `ColorValue` as a hexadecimal color respecting the default format.

### `hideOverlay: boolean`

- **Default:** `false`

  Determines whether the overlay is hidden. By default, the overlay is visible.

### `position: Position`

- **Default:** `right`

  The position of the Floating Action Button, either `Position.LEFT` or `Position.RIGHT`.

### `bottomSpace: DimensionValue`

- **Default:** `PixelRatio.get() * 10`

  The bottom space of the Floating Action Button.

### `horizontalSpace: DimensionValue`

- **Default:** `PixelRatio.get() * 10`

  The horizontal space of the Floating Action Button. If the position is left, then the space from the left edge of the screen.

### `floatingIcon: ReactElement | ImageSourcePropType | null`

- **Default:** `null`

  The icon of the Floating Action Button. It can be a React element, an image source, or null. By default, the icon is a plus icon.

### `floatingIconSize: number between 0 and 1`

- **Default:** `0.5`

  The size of the Floating Action Button icon. It can be a value between 0 and 1.

### `floatingIconColor: ColorValue`

- **Default:** `#f5f5f5`

  The color of the Floating Action Button icon.

### `onPressItem: (key: string) => void`

- **Default:** `undefined`

  Callback function to be called when an action item is pressed.
  - `@param` *key*: The key of the pressed action item.

### `rippleColor: ColorValue`

- **Default:** `rgba(245,245,245,0.1)`

  The color of the ripple effect for Android and opacity effect for iOS when an action item is pressed.

### `onPressMain: (actionType: FloatingIconPressActions) => void`

- **Default:** `undefined`

  Callback function to be called when the main Floating Action Button is pressed.
  - `@param` *actionType*: The type of the Floating Action Button press action.

### `dismissKeyboardOnPress: boolean`

- **Default:** `false`

  Determines if the keyboard should be dismissed when an action item is pressed.

### `shadow: ViewStyle`
The shadow style of the floating action button.
- **Default:**
  ```javascript
  {
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: {
      width: 7,
      height: 7
    },
    shadowOpacity: 1,
    shadowRadius: 17,
    elevation: size / 3
  }


## ActionsProps

#### `icon: ReactElement | ImageSourcePropType | null`

The icon of the action item.
It can be a React element, an image source, or null.

#### `key: string`

The key of the action item.

## TODO

- [x] first implementation
- [x] example
- [x] change plus icon to be customizable
- [x] migrate to TypeScript
- [ ] add more positions.
- [ ] support hide or show the component with an animation
- [ ] open on mounting
