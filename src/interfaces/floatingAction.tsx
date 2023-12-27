import type { ReactElement } from 'react';
import { FloatingIconPressActions, Position } from '../utils/enums';
import type { ColorValue, DimensionValue, ViewStyle } from 'react-native';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

/**
 * Props for the FloatingAction component.
 */
export interface FloatingActionProps {
  /**
   * An array of actions to be displayed.
   */
  actions: Array<ActionsProps>;

  /**
   * The size of the floating action button.
   */
  size?: number;

  /**
   * Determines if the actions are displayed vertically.
   */
  isVertical?: boolean;

  /**
   * Determines if the floating action button is hidden.
   */
  isHidden?: boolean;

  /**
   * The tint color of the floating action button.
   */
  tintColor?: ColorValue;

  /**
   * The overlay color of the floating action button.
   */
  overlayColor?: ColorValue;

  /**
   * Determines if the overlay is hidden.
   */
  hideOverlay?: boolean;

  /**
   * The position of the floating action button.
   */
  position?: Position;

  /**
   * The bottom space of the floating action button.
   */
  bottomSpace?: DimensionValue;

  /**
   * The horizontal space of the floating action button.
   */
  horizontalSpace?: DimensionValue;

  /**
   * The floating icon of the floating action button.
   * It can be a React element, an image source, or null.
   */
  floatingIcon?: ReactElement | ImageSourcePropType | null;

  /**
   * The size of the floating icon.
   * It can be a value between 0 and 1.
   */
  floatingIconSize?:
    | 0
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1;

  /**
   * The color of the floating icon.
   */
  floatingIconColor?: ColorValue;

  /**
   * Callback function to be called when an action item is pressed.
   * @param key - The key of the pressed action item.
   */
  onPressItem?: (key: string) => void;

  /**
   * The color of the ripple effect when an action item is pressed.
   */
  rippleColor?: ColorValue;

  /**
   * Callback function to be called when the main floating icon is pressed.
   * @param actionType - The type of the floating icon press action.
   */
  onPressMain?: (actionType: FloatingIconPressActions) => void;

  /**
   * Determines if the keyboard should be dismissed when an action item is pressed.
   */
  dismissKeyboardOnPress?: boolean;

  /**
   * The shadow style of the floating action button.
   */
  shadow?: ViewStyle;
}

/**
 * Props for the Actions component.
 */
export interface ActionsProps {
  /**
   * The icon of the action item.
   * It can be a React element, an image source, or null.
   */
  icon: ReactElement | ImageSourcePropType | null;

  /**
   * The key of the action item.
   */
  key: string;
}
