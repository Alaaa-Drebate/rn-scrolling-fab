import type { ActionsProps } from './floatingAction';
import type { ColorValue, ViewStyle } from 'react-native';

/**
 * Props for the IconButton component.
 */
export interface IconButtonProps {
  /**
   * Determines if the icon button is displayed vertically.
   */
  isVertical?: boolean;

  /**
   * The item representing the actions for the icon button.
   */
  item: ActionsProps;

  /**
   * Callback function to be called when the icon button is pressed.
   * @param key - The item associated with the pressed icon button.
   */
  onPress?: (key: string) => void;

  /**
   * The style to be applied to the icon button.
   */
  style: ViewStyle;

  /**
   * The color of the ripple effect when the icon button is pressed.
   */
  rippleColor?: ColorValue;
}
