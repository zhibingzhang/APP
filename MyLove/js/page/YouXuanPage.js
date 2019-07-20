/**
 * 底部 Tabs 对应的优选 Page
 */
import React, {Component} from 'react';
import {StatusBar, Image, StyleSheet, Text, View , TouchableHighlight, TouchableOpacity ,ScrollView} from 'react-native';

type Props = {};
export default class PopularPage extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {
      banner_item: '',
      mryx_item: {}
    }
  }
  
  componentDidMount(){
    //banner
    this._getBanner();
    //每日优选
    this._getMeiRiYouXuan();
  }
  _getBanner(){
    fetch('http://182.254.146.59:8000/api/v1/banner/')
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('网络请求出现异常~')
      })
      .then(responstJson => {
        this.setState({
          banner_item: responstJson
        })
      })
      .catch(e => {
        this.setState({
          banner_item: e.toString()
        })
      })
  }
  _getMeiRiYouXuan(){
    fetch('http://182.254.146.59:8000/api/v1/home/?type=mrtj&page=1&size=5')
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('网络请求出现异常~')
      })
      .then(responstJson => {
        console.log(responstJson)
        this.setState({
          mryx_item: responstJson
        })
      })
      .catch(e => {
        this.setState({
          mryx_item: e.toString()
        })
      })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor='transparent'
          barStyle='dark-content'
        />
        <View style={styles.banner}>
          <Image style={styles.banner_img} source={{uri: this.state.banner_item.img}}/>
        </View>
        <View style={styles.panel}>
          <View style={styles.search_box}>
            <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
              <View style={styles.search}>
                <Image style={styles.search_icon} source={require('../static/images/icons/search_icon.png')}/>
                <TouchableOpacity style={styles.buttonText}>
                  <Text>请输入关键词搜索</Text>
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.title}>
            <Text style={styles.title_text}>精选秘籍</Text>
          </View>
          <View style={styles.miji_box}>
            <TouchableOpacity style={styles.miji_col}>
              <Image style={styles.miji_img} source={require('../static/images/miji_left.png')}/>
              <View style={styles.miji_btn}>
                <Text style={styles.miji_btn_text}>恋爱话术</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.miji_col}>
              <Image style={styles.miji_img} source={require('../static/images/miji_right.png')}/>
              <View style={styles.miji_btn}>
                <Text style={styles.miji_btn_text}>聊天教学</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={[styles.title,styles.panel_title]}>
            <Text style={styles.title_text}>每日优选</Text>
            <TouchableOpacity style={styles.more}>
              <Text style={styles.more_text}>更多</Text>
              <Image style={styles.more_icon} source={require('../static/images/icons/more_icon.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <View style={styles.item_img}>
              <Image style={styles.miji_img} source={require('../static/images/miji_right.png')}/>
            </View>
            <View style={styles.item_info}>
              <Text style={styles.item_info_title}>没有搞不定的妹子，只有用错了方法的你</Text>
              <Text style={styles.item_info_number}>1234人觉得有用</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  banner:{
    height: 210,
  },
  banner_img:{
    height: 210,
  },
  search_box: {
    height: 30,
    alignItems: "center",
    marginTop: -25,
    marginBottom: 24
  },
  search: {
    width: 345,
    height: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#B9B9B9',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4, 
    elevation: 4,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  search_icon:{
    width: 14,
    height: 14,
    marginRight: 4,
    marginBottom: -2
  },
  buttonText: {
    color: '#7E7E7E'
  },
  panel:{
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    padding: 10
  },
  item:{
    height: 80,
    flexDirection: 'row',
    marginBottom: 12
  },
  item_info:{
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  item_info_title:{
    fontSize: 14,
    color: '#2E2E2E',
    letterSpacing: 1.2
  },
  item_info_number:{
    color: '#7F7E7E',
    fontSize: 12
  },
  item_img:{
    width: 120,
    height: 80
  },
  more:{
    position: "absolute",
    top: 3,
    right: 0,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  more_text:{
    color: '#6072E6',
    fontSize: 12,
    letterSpacing: 1.2
  },
  more_icon: {
    marginLeft: 5,
    marginBottom: -2
  },
  panel_title:{
    marginBottom: 23
  },  
  title_text:{
    fontSize: 16,
    letterSpacing: 1.4,
    textAlign: "center",
    color: '#000'
  },
  miji_box:{
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 23
  },
  miji_col:{
    width: 166,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  miji_img: {
    position: "absolute",
    width: '100%',
    height: '100%'
  },
  miji_btn: {
    width: 98,
    height: 32,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255, .8)',
    justifyContent: "center"
  },
  miji_btn_text:{
    fontSize: 14,
    color: '#2E2E2E',
    textAlign: "center"
  }
});
