import React, { type ReactElement } from 'react';
import { Pressable, Animated, Platform, StyleSheet } from 'react-native';
import type { IconButtonProps } from '../../interfaces/iconButton';
import { getValidIcon } from '../../utils/helpers';

/**
 * IconButton component.
 *
 * This component renders a pressable icon button with customizable styles and behavior. *
 * @returns {ReactElement} The rendered IconButton component.
 */
const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  style,
  isVertical,
  item,
  rippleColor,
}): ReactElement => {
  /**
   * Handles the onPress event of the IconButton.
   *
   * This function is called when the IconButton is pressed. It invokes the `onPress` callback
   *  with the key of the item as the parameter.
   * @return void
   */
  const onPressHandler = (): void => {
    if (onPress) {
      onPress(item.key);
    }
  };
  return (
    <Animated.View
      style={[
        styles.container,
        isVertical ? { width: '100%' } : { height: '100%' },
        style,
      ]}
    >
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [
          styles.pressable,
          {
            backgroundColor:
              Platform.OS !== 'android' && pressed
                ? rippleColor
                : 'transparent',
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        android_ripple={{ color: rippleColor }}
      >
        {getValidIcon(item.icon)}
      </Pressable>
    </Animated.View>
  );
};
/**
 * Styles for the IconButton component.
 */
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 999,
    overflow: 'hidden',
  },
  pressable: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});
export default React.memo(IconButton);
