import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

export function NoSupportedDevice() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        Your device haven't support to NFC functions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    width: '70%',
    marginBottom: 30,
  },
  wrapper: {
    minHeight: Dimensions.get('window').height,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    flex: 1,
    gap: 10,
  },
});
