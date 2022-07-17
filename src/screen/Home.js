import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

import axios from 'axios';

const Home = () => {
  const [text, onChangeText] = React.useState('');
  const [data, setData] = React.useState([]);

  useEffect(() => {
    dataGet();
    fun();
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const dataGet = async () => {
    const saved = await AsyncStorage.getItem('userDetais');
    console.log(saved);
  };

  const fun = async () => {
    try {
      const {data} = await axios.get(
        'http://zestbrains4u.site/UNB/ws/v1//user/list_blocked_numbres',
      );
      await AsyncStorage.setItem(
        'blockList',
        JSON.stringify({
          list: data.data,
        }),
      );
      setData(data.data);
    } catch (error) {
      console.log(error, 'uuuuuuuuu');
      dataGet1();
    }
  };
  const dataGet1 = async () => {
    const list = await AsyncStorage.getItem('blockList');
    setData(list.list);
  };

  const renderItem = ({item}) => (
    <View style={styles.insideContainer}>
      <View style={styles.number}>
        <Text
          style={{textAlignVertical: 'center', fontSize: 18, color: '#000'}}>
          +91 {item.mobile_number}
        </Text>
      </View>
      <View style={styles.iconView}>
        <Icon2
          style={styles.blockIcon}
          name={'block'}
          size={10}
          color={'red'}
        />
        <Icon1 style={styles.cellIcon} name={'call'} size={20} color={'red'} />
        <Text style={styles.countText}>{item.total_count}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeTxt}>Wellcome, Alex</Text>
        <Text style={styles.blockTxt}>Search any number you want to block</Text>
      </View>
      <View style={styles.numberView}>
        <TextInput
          placeholder="Enter number"
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity style={styles.searchView}>
          <Icon
            style={styles.searchIcon}
            name={'search'}
            size={22}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  input: {
    height: 45,
    width: (Dimensions.get('screen').width * 78) / 100,
    margin: 10,
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  welcomeTxt: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    marginTop: (Dimensions.get('screen').height * 2) / 100,

    padding: 10,
  },
  blockTxt: {padding: 10},
  numberView: {flexDirection: 'row'},
  searchView: {
    backgroundColor: '#000',
    height: 45,
    width: (Dimensions.get('screen').width * 14) / 100,
    borderRadius: 5,
    alignSelf: 'center',
  },
  searchIcon: {
    alignSelf: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
  insideContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: (Dimensions.get('screen').height * 9) / 100,
    elevation: 5,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    flex: 1,
    justifyContent: 'center',
  },
  iconView: {
    justifyContent: 'flex-end',
    width: (Dimensions.get('screen').width * 15) / 100,
  },
  blockIcon: {
    alignSelf: 'center',
    flex: 1,
    textAlignVertical: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 15,
  },
  cellIcon: {
    alignSelf: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
  countText: {textAlign: 'center', color: 'red'},
});
