import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TouchableOpacityProps} from 'react-native/types';

interface IButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode | string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress: () => any;
}

export function Button({
  children,
  isLoading = false,
  isDisabled,
  onPress,
  ...props
}: IButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      {...props}>
      {!isLoading &&
        (typeof children === 'string' ? (
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.text, {color: isDisabled ? '#e4e4e4' : '#F8F8F8'}]}>
            {children}
          </Text>
        ) : (
          children
        ))}
      {isLoading && <ActivityIndicator size={'small'} color="#F8F8F8" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#16B2AE',
    padding: 10,
    width: '90%',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});
