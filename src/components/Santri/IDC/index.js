import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
const axios = require ('axios');

class IDCard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
    };
  }

  componentDidMount () {
    this.getDataDiri ();
  }

  getDataDiri = () => {
    const data = this.props.authentication;
    const token = data.token;

    axios
      .get (`http://api.pondokprogrammer.com/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        const data = response.data;
        console.log (data);
        if (data.status || null) {
          this.setState ({
            data: data,
          });
        } else {
          this.setState ({
            data: data,
          });
        }
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  render () {
    const {
      division,
      email,
      framework,
      image,
      phone,
      status,
      username,
    } = this.state.data;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> ID CARD </Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.subProfile}>
            <Image
              style={styles.img}
              source={{
                uri: `http://api.pondokprogrammer.com/img/profile/${image}`,
              }}
            />
            <Text>{username}</Text>
            <Text>{division}  {framework}</Text>
          </View>
        </View>
        <View style={styles.status}>
          <View style={styles.tStatus}>
            <View>
              <Text style={{fontSize: 20}}>Email</Text>
              <Text>{email}</Text>
            </View>

            <View>
              <Text style={{fontSize: 20}}>Phone</Text>
              <Text>{phone}</Text>
            </View>

            <View>
              <Text style={{fontSize: 20}}>Status</Text>
              <Text>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect (mapStateToProps) (IDCard);
