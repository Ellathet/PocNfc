import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import NfcManager, {Ndef, NfcTech, TagEvent} from 'react-native-nfc-manager';
import Toast from 'react-native-toast-message';
import {Button} from './components/Button/Button';
import {NfcViewer} from './components/NfcViewer/NfcViewer';
import {NoSupportedDevice} from './components/NoSupportedDevice/NoSupportedDevice';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  const [hasNfcSupport, setHasNfcSupport] = useState<boolean>(false);
  const [readLoading, setReadLoading] = useState<boolean>(false);
  const [writeLoading, setWriteLoading] = useState<boolean>(false);
  const [NfcFoundTag, setNfcFoundTag] = useState<TagEvent | null>();
  const [NfcText, setNfcText] = useState<string>('');

  useEffect(() => {
    const checkNFCIsSupported = async () => {
      const deviceHasNFCSupport = await NfcManager.isSupported();

      if (!deviceHasNFCSupport) {
        Toast.show({
          type: 'Error',
          text1: 'You device is not able to use NFC',
          position: 'bottom',
        });
        await RNBootSplash.hide({fade: true, duration: 500});
        return;
      }

      setHasNfcSupport(true);
      await RNBootSplash.hide({fade: true, duration: 500});
    };

    checkNFCIsSupported();
  }, []);

  async function readNdef() {
    setNfcFoundTag(null);
    setReadLoading(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      // await NfcManager.setTimeout(60000 /* 1 minute in ms */);
      setNfcFoundTag(tag);
    } catch (ex) {
      Toast.show({
        type: 'error',
        text1: 'Error in NFC read',
        position: 'bottom',
      });
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setReadLoading(false);
    }
  }

  async function writeNdef() {
    setWriteLoading(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord(NfcText)]);

      if (bytes) {
        Toast.show({
          type: 'success',
          text1: 'Bring your device closer to the NFC terminal',
          position: 'bottom',
        });
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      }
    } catch (ex) {
      Toast.show({
        type: 'error',
        text1: 'Unsupported tag',
        position: 'bottom',
      });
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setWriteLoading(false);
    }
  }

  if (!hasNfcSupport) {
    return <NoSupportedDevice />;
  }

  return (
    <>
      <StatusBar backgroundColor={'#F8F8F8'} barStyle={'dark-content'} />
      <SafeAreaView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>NFC Poc</Text>
          <Button
            onPress={readNdef}
            isLoading={readLoading}
            isDisabled={writeLoading}>
            Read Tag
          </Button>
          <NfcViewer NfcData={NfcFoundTag} />
          <TextInput
            style={styles.textInput}
            onChangeText={val => setNfcText(val)}
            value={NfcText}
            placeholder="Enter your text to send"
            autoCorrect={false}
            editable={!writeLoading}
            placeholderTextColor={'#6b6b6b'}
          />
          <Button
            onPress={writeNdef}
            isLoading={writeLoading}
            isDisabled={NfcText.length === 0 || readLoading}>
            Write Tag
          </Button>
        </View>
      </SafeAreaView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#16B2AE',
    padding: 10,
    width: '30%',
    borderRadius: 5,
  },
  text: {
    color: '#F8F8F8',
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  wrapper: {
    minHeight: Dimensions.get('window').height,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flex: 1,
    gap: 10,
  },
  textInput: {
    width: '90%',
    borderRadius: 5,
    color: '#333333',
    backgroundColor: '#e4e4e4',
    padding: 10,
  },
});
