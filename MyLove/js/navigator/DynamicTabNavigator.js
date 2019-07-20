/**
 * 可配置底部导航
 */
import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  BottomTabBar
} from "react-navigation";
import {Image} from 'react-native';

import YouXuanPage from '../page/YouXuanPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import { connect } from 'react-redux';

type Props = {};

const TABS = { //在这里配置页面的路由
  YouXuanPage: {
    screen: YouXuanPage,
    navigationOptions: {
      tabBarLabel: "优选",
      tabBarIcon: ({tintColor, focused}) => {
        if(focused){
          return <Image source={require('../static/images/icons/home_hover_icon.png')} />
        }
        return <Image source={require('../static/images/icons/home_icon.png')} />
      },
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "秘籍",
      tabBarIcon: ({tintColor, focused}) => {
        if(focused){
          return <Image source={require('../static/images/icons/miji_hover_icon.png')} />
        }
        return <Image source={require('../static/images/icons/miji_icon.png')} />
      },
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: "教程",
      tabBarIcon: ({tintColor, focused}) => {
        if(focused){
          return <Image source={require('../static/images/icons/jiaochen_hover_icon.png')} />
        }
        return <Image source={require('../static/images/icons/jiaochen_icon.png')} />
      },
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({tintColor, focused}) => {
        if(focused){
          return <Image source={require('../static/images/icons/user_hover_icon.png')} />
        }
        return <Image source={require('../static/images/icons/user_icon.png')} />
      },
    }
  },
};

class DynamicTabNavigator extends Component<Props> {
  constructor(props){
    super(props);
    console.disableYellowBox = true; //禁止警告提示
  }
  _tabNavigator() {
    if(this.Tabs){
      return this.Tabs;
    }
    const {YouXuanPage, TrendingPage, FavoritePage, MyPage} = TABS;
    YouXuanPage.navigationOptions.tabBarLabel = "优选"; //动态配置Tab文字
    const tabs = {YouXuanPage, TrendingPage, FavoritePage, MyPage}; //根据需要定制显示的tabs
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props=>{
        return <TabBarComponent theme={this.props.theme} {...props} />
      }
    }))
  }
  render() {
    const Tab = this._tabNavigator();
    return <Tab />
  }
}

class TabBarComponent extends React.Component{
  constructor(props){
    super(props);

    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render(){
    return <BottomTabBar 
      {...this.props}
      activeTintColor={this.props.theme}
    />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(DynamicTabNavigator);

