/**
 * app home Page
 */
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

type Props = {};
class HomePage extends Component<Props> {
  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  /**
   * 处理 Aandroid 中的物理返回键
   * @returns {boolean} 
   */

  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if(nav.routes[1].index === 0){
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  theme:state.theme
});
export default connect(mapStateToProps)(HomePage);
