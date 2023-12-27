import { Image } from 'react-native';
import React, {} from 'react';
/**
 * Returns a valid icon component or image source based on the provided icon.
 *
 * @param {ReactElement | ImageSourcePropType | null} icon - The icon component or image source.
 * @param {DimensionValue} size - The size of the icon.
 * @returns {ReactElement | null} The valid icon component or image source.
 */
export const getValidIcon = (icon, size) => {
    try {
        if (icon) {
            if (React.isValidElement(icon)) {
                return icon;
            }
            return (React.createElement(Image, { style: { width: size || '100%', height: size || '100%' }, resizeMethod: 'scale', resizeMode: 'contain', 
                //@ts-ignore
                source: icon }));
        }
        return null;
    }
    catch (error) {
        console.warn('error getting valid icon in floating action button : ' + error);
        return null;
    }
};
