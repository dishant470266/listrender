import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login uri getting error ==> {"status":412,"message":"","data":{}}

const Login = ({navigation}) => {
  const [email, onChangeText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocusChange = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    dataGet();
  }, []);
  const dataGet = async () => {
    const saved = await AsyncStorage.getItem('userDetais');
    console.log(saved);
    if (saved) {
      navigation.navigate('Home');
    }
  };

  async function auth1() {
    await AsyncStorage.setItem(
      'userDetais',
      JSON.stringify({
        userName: email,
        password: password,
      }),
    );
    const temp = validate(email);
    if (temp == 1) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Email or Password');
    }
  }

  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      onChangeText(text);
      return 0;
    } else {
      onChangeText(text);
      return 1;
      console.log('Email is Correct');
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../Assets/AccountDetails.png')}
        style={{flex: 1}}>
        <View style={styles.BgroundImage}>
          <Image source={require('../../Assets/icons/Group.png')} />
        </View>
        <View style={styles.welcomeView}>
          <View style={styles.welcomeInsideView}>
            <Text style={styles.welcomeTxt}>Wellcome</Text>
            <Text style={{fontSize: 14}}>Hi Please login your account</Text>
          </View>
          <View style={styles.container}>
            <View
              style={[
                styles.container1,
                {borderColor: isFocused ? '#0779ef' : '#eee'},
              ]}>
              <Input
                placeholder="Email"
                type="email-address"
                onFocus={onFocusChange}
                inputContainerStyle={styles.inputContainer}
                onChangeText={text => validate(text)}
                inputStyle={styles.inputText}
                leftIcon={
                  <Image source={require('../../Assets/icons/Emailicon.png')} />
                }
              />
            </View>
            <View
              style={[
                styles.container1,
                {borderColor: isFocused ? '#0779ef' : '#eee'},
              ]}>
              <Input
                placeholder="password"
                onFocus={onFocusChange}
                inputContainerStyle={styles.inputContainer}
                onChangeText={text => setPassword(text)}
                inputStyle={styles.inputText}
                secureTextEntry={true}
                leftIcon={
                  <Image source={require('../../Assets/icons/password.png')} />
                }
              />
            </View>
            <TouchableOpacity
              style={[styles.container2]}
              onPress={() => auth1()}>
              <Text style={styles.submitText}>LOG IN</Text>
            </TouchableOpacity>
            <View style={{width: '90%'}}>
              <Text style={([styles.textBody], {alignSelf: 'flex-end'})}>
                Forgot Password?
              </Text>
            </View>
            <View style={styles.account}>
              <Text style={styles.textBody}>Don't Have an account</Text>
              <Text
                style={[styles.textBody, {color: '#000'}]}
                onPress={() => props.navigation.navigate('SignUp')}>
                {' '}
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  account: {flexDirection: 'row', marginVertical: 10},
  welcomeTxt: {fontSize: 24, fontWeight: '600', color: '#000'},
  welcomeInsideView: {
    padding: 10,
    margin: 10,
  },
  welcomeView: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: (Dimensions.get('screen').height * 4) / 100,
    borderTopStartRadius: 50,
  },
  BgroundImage: {
    alignSelf: 'center',
    marginTop: (Dimensions.get('screen').height * 10) / 100,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
  container1: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
  },
  container2: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 10,
  },
  submitText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
