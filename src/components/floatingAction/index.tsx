import React, { type ReactElement, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  type LayoutChangeEvent,
  PixelRatio,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';
import IconButton from '../iconButton';
import type { FloatingActionProps } from '../../interfaces/floatingAction';
import { FloatingIconPressActions, Position } from '../../utils/enums';
import { getValidIcon } from '../../utils/helpers';

/**
 * Represents a floating action button component.
 *
 * @param {FloatingActionProps} props - The props for the FloatingAction component.
 * @returns {ReactElement} The FloatingAction component.
 */
const FloatingAction: React.FC<FloatingActionProps> = (props): ReactElement => {
  const {
    actions,
    size = Dimensions.get('screen').width * 0.13,
    isVertical,
    isHidden,
    hideOverlay,
    floatingIcon,
    floatingIconSize,
    onPressItem,
    onPressMain,
    rippleColor,
    dismissKeyboardOnPress,
    shadow,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const widthAnimation = useRef(new Animated.Value(size)).current;
  const fabContainerPosition = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const animationController = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;
  useEffect(() => {
    Animated.timing(animationController, {
      duration: 200,
      toValue: isHidden ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);
  /**
   * Handles the layout change event of the FAB container.
   * @param {LayoutChangeEvent} event - The layout change event.
   */
  const onLayoutFABContainer = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    fabContainerPosition.current = { x, y, width, height };
  };
  /**
   * Handles the press event of the FAB.
   */
  const onPressHandler = () => {
    if (onPressMain) {
      onPressMain(
        isOpen
          ? FloatingIconPressActions.CLOSING
          : FloatingIconPressActions.OPENING
      );
    }
    if (dismissKeyboardOnPress) {
      Keyboard.dismiss();
    }
    if (isOpen) {
      Animated.spring(widthAnimation, {
        toValue: size,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(widthAnimation, {
        toValue: fabContainerPosition.current[isVertical ? 'height' : 'width'],
        useNativeDriver: false,
      }).start();
    }
    setIsOpen((prev) => !prev);
  };
  const closeIconStyle: ViewStyle = {
    transform: [
      {
        rotate: widthAnimation.interpolate({
          inputRange: [
            size,
            fabContainerPosition.current[isVertical ? 'height' : 'width'] / 2 ||
              size * 2,
          ],
          outputRange: ['0deg', '45deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const iconsStyle: ViewStyle = {
    transform: [
      {
        scale: widthAnimation.interpolate({
          inputRange: [
            fabContainerPosition.current[isVertical ? 'height' : 'width'] /
              1.5 || size * 2,
            fabContainerPosition.current[isVertical ? 'height' : 'width'] ||
              size * 4,
          ],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const overlayStyle: ViewStyle = {
    transform: [
      {
        scale: widthAnimation.interpolate({
          inputRange: [
            size,
            fabContainerPosition.current[isVertical ? 'height' : 'width'] ||
              size * 2,
          ],
          outputRange: [0, 60],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  return (
    <Animated.View
      onLayout={onLayoutFABContainer}
      style={[
        styles(props).floatingButtonContainer,
        { opacity: animationController },
      ]}
    >
      {!hideOverlay && (
        <Animated.View
          pointerEvents={'none'}
          style={[styles(props).overlayStyle, overlayStyle]}
        />
      )}
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [
          styles(props).floatingButton,
          {
            backgroundColor:
              Platform.OS !== 'android' && pressed
                ? rippleColor
                : 'transparent',
          },
        ]}
        android_ripple={{ color: rippleColor }}
      >
        {floatingIcon &&
        getValidIcon(floatingIcon, size * (floatingIconSize || 0.5)) ? (
          getValidIcon(floatingIcon, size * (floatingIconSize || 0.5))
        ) : (
          <Animated.View style={closeIconStyle}>
            <Text style={styles(props).text}>+</Text>
          </Animated.View>
        )}
      </Pressable>
      <Animated.View
        style={[
          styles(props).expandableView,
          { [isVertical ? 'height' : 'width']: widthAnimation },
          shadow,
        ]}
      >
        <ScrollView
          horizontal={!isVertical}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles(props).expandableViewContainer}
        >
          {actions.map((item, index) => (
            <IconButton
              key={index}
              isVertical={isVertical}
              item={item}
              style={iconsStyle}
              onPress={onPressItem}
              rippleColor={rippleColor}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};
/**
 * Default props for the FloatingAction component.
 */
const styles = ({
  isVertical,
  size,
  tintColor,
  overlayColor,
  position,
  bottomSpace,
  horizontalSpace,
  floatingIconColor,
}: FloatingActionProps) =>
  StyleSheet.create({
    floatingButtonContainer: {
      position: 'absolute',
      bottom: bottomSpace,
      left: position === Position.LEFT ? horizontalSpace : undefined,
      right: position === Position.RIGHT ? horizontalSpace : undefined,
      width: isVertical ? size : '85%',
      height: isVertical ? '40%' : undefined,
      alignSelf: position === Position.LEFT ? 'flex-start' : 'flex-end',
      alignItems: position === Position.LEFT ? 'flex-start' : 'flex-end',
      justifyContent: isVertical ? 'flex-end' : 'flex-start',
      borderRadius: size,
    },
    floatingButton: {
      width: size,
      aspectRatio: 1,
      borderRadius: size,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: position === Position.LEFT ? 'flex-start' : 'flex-end',
      zIndex: 1,
    },
    text: {
      color: floatingIconColor,
      fontSize: (size || 33) / 1.4,
      height: size,
      aspectRatio: 1,
      textAlign: 'center',
    },
    overlayStyle: {
      height: size,
      width: size,
      borderRadius: size,
      backgroundColor: overlayColor,
      position: 'absolute',
    },
    expandableView: {
      height: isVertical ? undefined : size,
      width: isVertical ? size : undefined,
      backgroundColor: tintColor,
      borderRadius: size,
      position: 'absolute',
      flexDirection: 'row',
      paddingEnd: isVertical || position === Position.LEFT ? undefined : size,
      paddingStart:
        isVertical || position === Position.RIGHT ? undefined : size,
      paddingBottom: isVertical ? size : undefined,
      shadowColor: 'rgba(0,0,0, 0.6)',
      shadowOffset: {
        width: 7,
        height: 7,
      },
      shadowOpacity: 1,
      shadowRadius: 17,
      elevation: (size || 1) / 3,
    },
    expandableViewContainer: {
      alignItems: 'center',
      justifyContent:
        position === Position.LEFT && !isVertical ? 'flex-end' : 'flex-start',
      flexGrow: 1,
      overflow: 'hidden',
    },
  });

FloatingAction.defaultProps = {
  actions: [],
  size: Dimensions.get('screen').width * 0.13,
  isVertical: false,
  isHidden: false,
  tintColor: 'rgba(24,24,24,0.5)',
  overlayColor: 'rgba(0,0,0,0.1)',
  hideOverlay: false,
  position: Position.RIGHT,
  bottomSpace: PixelRatio.get() * 10,
  horizontalSpace: PixelRatio.get() * 10,
  floatingIcon: null,
  floatingIconSize: 0.5,
  floatingIconColor: '#f5f5f5',
  rippleColor: 'rgba(245,245,245,0.1)',
  dismissKeyboardOnPress: false,
  shadow: {},
};
export default FloatingAction;
