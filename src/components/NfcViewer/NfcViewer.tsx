import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TagEvent} from 'react-native-nfc-manager';

interface INfcViewerProps {
  NfcData?: TagEvent | null;
}

export function NfcViewer({NfcData}: INfcViewerProps) {
  return (
    <View style={styles.textArea}>
      {NfcData?.id && <Text style={styles.textId}>TAG ID: {NfcData?.id}</Text>}
      {NfcData?.ndefMessage &&
        NfcData?.ndefMessage.map(i => (
          <Text style={styles.text}>{i.payload.toString()}</Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderRadius: 5,
    backgroundColor: '#e4e4e4',
    padding: 10,
    width: '90%',
    height: 300,
  },
  textId: {
    color: '#16B2AE',
    fontWeight: '700',
  },
  text: {
    color: '#333333',
  },
});
