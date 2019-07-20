import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import {connect} from 'react-redux';
import {createReduxContainer, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import FetchDemoPage from '../page/FetchDemoPage';

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null, //用来禁用头部显示
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null, //用来禁用头部显示
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      //header: null, //用来禁用头部显示
    }
  },
  FetchDemoPage:{
    screen: FetchDemoPage
  }
});

export const RootNavigator = createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator,
},{
  navigationOptions: {
    header: null, //用来禁用头部显示
  }
});
const AppContainer = createAppContainer(RootNavigator);


// 1.创建React-Navigation 与 Redux中间件
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  "root",
);
// 2.生成reduxify导航组件
const AppWithNavigationsState = createReduxContainer(AppContainer, "root");
// 3.State到Props的映射关系
const mapStateToProps = state => ({
  state: state.nav, //v2
});
// 4.连接 React 组件与 Redux store
export default connect(mapStateToProps)(AppWithNavigationsState);