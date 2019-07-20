/**
 * 底部 Tabs 对应的收藏 Page
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action'

type Props = {};
class FavoritePage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
        <Button 
          title="改变主题色"
          onPress={()=>{
            this.props.onThemeChange('#ccc');
          }}
        /> 
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
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
