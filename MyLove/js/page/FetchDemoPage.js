import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,TextInput} from 'react-native';

type Props = {};
export default class FetchDemoPage extends Component<Props> {
  constructor(props){
    super(props);

    this.state={
      showText: ''
    }
  }
  loadData(){
    let url = `http://182.254.146.59:8000/api/v1/category/`;
    console.log(11);
    fetch(url)
      .then(response => {
        console.log(response)
        if(response.ok){
          return response.text();
        }

        throw new Error('网络请求出现异常~')
      })
      .then(responstText => {
        console.log(responstText)
        this.setState({
          showText: responstText
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          showText: e.toString()
        })
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FetchDemoPage</Text>
        <TextInput 
          style={styles.input}
          onChangeText={text=>{
            this.searchKey = text
          }}
        />

        <Button
          title="获取"
          onPress={()=>{
            this.loadData();
          }}
        />

        <Text>{this.state.showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10
  }
});