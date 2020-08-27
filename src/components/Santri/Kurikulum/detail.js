import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {connect} from 'react-redux';
import Loader from './loader';
import Markdown from 'react-native-markdown-package';

const axios = require ('axios');

class DetailTopikKurikulum extends Component {
  constructor (props) {
    super (props);
    this.state = {
      topik: '',
      id_topik: '',
      refreshing: false,
      status: true,
      animationLoad: false,
      isLoading: false,
      Sprint: '',
      markdown: '',
    };
  }

  markdown = () =>
    setTimeout (() => {
      const {markdown} = this.state;
      return (
        <Markdown>
          {this.state.markdown}
        </Markdown>
      );
    }, 3000);

  render () {
    const {judul, id_topik, Sprint, markdown,video} = this.props.route.params;
    setTimeout (() => {
      this.setState ({id_topik: id_topik, Sprint: Sprint, markdown: markdown});
    }, 2000);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}>{judul} </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${video}`)}
            style={{
              height: 30,
              width: 75,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection : 'row',
              marginLeft : 2,
              borderWidth : 1,
              borderRadius : 10,
              borderColor : '#fff'
            }}
          >
            <Icon name="youtube-play" size={25} color="red" />
            <Text style={{color: '#fff', marginLeft: 5}}>Video</Text>
          </TouchableOpacity>
        </View>
        <Loader loading={this.state.isLoading} />
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 10}}>
            <Markdown>
              {markdown}
            </Markdown>

            {/* {this.markdown ()} */}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.goBack ()}
        >
          <Icon name="arrow-left" size={40} color="rgb(0, 184, 150)" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect (mapStateToProps) (DetailTopikKurikulum);
