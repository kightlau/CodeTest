import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import Cookies from "universal-cookie";
import cookies from "js-cookie";



const recordsRequest = axios.create({
    baseURL: 'http://localhost:3000/record/'
});

const medicationItem = [
    {
        label: 'medication00',
        value: 0,
        key: 0
    },
    {
        label: 'medication01',
        value: 1,
        key: 1

    },
    {
        label: 'medication02',
        value: 2,
        key: 2

    },
    {
        label: 'medication03',
        value: 3,
        key: 3

    },
];

export default class RecordForm extends React.Component {
    state = {
        doctorName: "",
        patientName: "",
        diagnosis: "",
        fee: 0,
        dateTime: new Date(),
        followConsultation: false,
        medication: [],
        isDatePickerVisible: false
    }
    onCreateRecord = (() => {
        recordsRequest.post('/createRecord', {
            record: {
                doctorName: this.state.doctorName,
                patientName: this.state.patientName,
                diagnosis: this.state.diagnosis,
                fee: this.state.fee,
                dateTime: this.state.dateTime,
                followConsultation: this.state.followConsultation,
                medication: this.state.medication,
            },
            token: cookies.get('token')

        }).then(res => {
            alert(res.data.msg);
            if (res.data.status == 'success') {
                this.props.navigation.navigate('Main')
            }
        });
    });

    addMedication = (() => {
        var medication = Object.assign([], this.state.medication);
        medication.push({ Id: 0 });
        this.setState({
            medication: medication
        })
    })

    delMedication = ((index) => {
        var medication = Object.assign([], this.state.medication);
        medication.splice(index, 1);
        this.setState({
            medication: medication
        })
    })

    changeMedication = ((value, index) => {
        var medication = Object.assign([], this.state.medication);
        medication[index] = { Id: value };

        this.setState({
            medication: medication
        })
    })

    changeDateTime = ((value) => {
        this.setState({
            dateTime: value
        })
    })

    showDatePicker = () => {
        this.setState({
            isDatePickerVisible: true
        });
    };

    handleConfirm = (date) => {
        this.setState({
            dateTime: date,
            isDatePickerVisible: false
        });
    };

    hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        });
    };


    componentWillMount() {
        const { Id } = this.props.route.params;
        if (Id) {
            recordsRequest.post('/getRecords', {
                token: cookies.get('token'),
                record: {
                    _id: Id
                }
            }).then(res => {
                if (res.data.status == 'success') {
                    const record = res.data.result[0];
                    this.setState({
                        doctorName: record.doctorName,
                        patientName: record.patientName,
                        diagnosis: record.diagnosis,
                        fee: record.fee,
                        dateTime: record.dateTime,
                        followConsultation: record.followConsultation,
                        medication: record.medication,
                    })
                }
            });
        }

    }
    render() {
        const { medication, isDatePickerVisible, followConsultation, doctorName,
            patientName,
            diagnosis,
            fee,
            dateTime,
        } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.logo}>Consultation Records</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Doctor Name..."
                            placeholderTextColor="#003f5c"
                            value={doctorName}
                            onChangeText={text => this.setState({ doctorName: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput

                            style={styles.inputText}
                            placeholder="Patient Name..."
                            placeholderTextColor="#003f5c"
                            value={patientName}
                            onChangeText={text => this.setState({ patientName: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Diagnosis..."
                            placeholderTextColor="#003f5c"
                            value={diagnosis}
                            onChangeText={text => this.setState({ diagnosis: text })} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            keyboardType={'number-pad'}
                            style={styles.inputText}
                            placeholder="Fee..."
                            placeholderTextColor="#003f5c"
                            value={fee}

                            onChangeText={text => this.setState({ fee: text })} />
                    </View>

                    <TouchableOpacity style={styles.inputView} onPress={this.showDatePicker} >
                        <Text
                            style={styles.logmedicationBtninText}
                        >Select Date and Time</Text>
                    </TouchableOpacity>

                    <View style={styles.consultInputView} >
                        <Text style={styles.inputText}>Any follow up Consultation</Text>
                        {/* <CheckBox checked={this.state.followConsultation} color="#fc5185" onPress={() => this.setState({ followConsultation: !followConsultation })} /> */}
                        <Checkbox
                            status={this.state.followConsultation ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ followConsultation: !followConsultation })}
                        />
                    </View>

                    <TouchableOpacity style={styles.medicationBtn} onPress={this.addMedication}>
                        <Text
                            style={styles.loginText}
                        >Add Mediction</Text>
                    </TouchableOpacity>

                    {
                        medication.map((item, index) => {
                            return (
                                <RNPickerSelect
                                    items={medicationItem}
                                    onValueChange={(value) => this.changeMedication(value, index)}
                                    itemKey={item.Id}
                                    value={item.Id}
                                />
                            )
                        })
                    }
                    {
                        this.props.route.params.Id ?
                            <Text>''</Text> : <TouchableOpacity style={styles.loginBtn} onPress={this.onCreateRecord}>
                                <Text
                                    style={styles.loginText}
                                >Create</Text>
                            </TouchableOpacity>

                    }

                    <TouchableOpacity style={styles.signupBtn} onPress={() => {
                        this.props.navigation.navigate('Main')
                    }}>
                        <Text style={styles.loginText}>Back to Home</Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                        date={dateTime}
                    />
                </ScrollView>
            </View>

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
    consultInputView: {
        flex: 1,
        flexDirection: "row",
        width: "80%",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
    inputText: {
        height: 50,
        color: "black"
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
    medicationBtn: {
        width: "80%",
        backgroundColor: "pink",
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
        color: "black"
    }
});
