import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import plus from '../assets/plus.png';
import cookies from "js-cookie";

import { Cell, Section, TableView } from 'react-native-tableview-simple';


const recordsRequest = axios.create({
  baseURL: 'http://localhost:3000/record/'
});

export default class Main extends React.Component {
  state = {
    searchMode: "",
    recordList: []
  }

  componentWillMount() {
    recordsRequest.post('/getRecords', {
      token: cookies.get('token'),
    }).then(res => {
      if (res.data.status == 'success') {
        this.setState({
          recordList: res.data.result
        })
      }
    });
  }

  render() {
    const { recordList } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Records</Text>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.5} onPress={(() => {
          this.props.navigation.navigate('RecordsForm', {

          })
        })}>
          <Text style={styles.loginText}>+ Add records</Text>
        </TouchableOpacity>
        <ScrollView style={{ width: '80%' }}>
          {/* {recordList.map((item) => {
            return (
              <TouchableOpacity style={styles.addBtn} activeOpacity={0.5} onPress={(() => {
                this.props.navigation.navigate('RecordsForm', { Id: item._id })
              })}>
                <Text style={styles.loginText}>item.patientName</Text>
              </TouchableOpacity>
            )
          })} */}
          <TableView >
            {
              recordList.map((item) => {
                return (
                  <div>
                    <Cell
                      contentContainerStyle={{ width: '300px', paddingLeft: '30px' }}
                      cellStyle="RightDetail"
                      title={item.patientName}
                      onPress={() => {
                        this.props.navigation.navigate('RecordsForm', { Id: item._id })
                      }
                      }
                    />
                    <p></p>
                  </div>
                )
              })
            }

          </TableView>
        </ScrollView>


      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F8CCF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    width: "80%"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'white',
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#72EA6F",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signupBtn: {
    width: "80%",
    backgroundColor: "#599BDA",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  addBtn: {
    width: "80%",
    backgroundColor: "red",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  },
});
