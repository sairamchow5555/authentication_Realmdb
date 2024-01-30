import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Realm from 'realm';

const studentsSchema = {
    name: 'Students',
    properties: {
        name: 'string',
        email: 'string',
        password: 'string',
    }
}

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if(!name || !email || !password){
            Alert.alert('Fill the req data');
            return;
        }

        try{
            const realm = await Realm.open({
                schema: [
                    studentsSchema
                ],
            });
            realm.write(() => {
                realm.create('Students',{name, email, password})
            })
            Alert.alert('Successfull', 'DEtails Registered');
            navigation.navigate('LogIn');
        } catch(error){
            console.error('error from signup', error);
            Alert.alert('Registration Failed');
        }
    };

  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../assets/images/signup.png')} style={styles.imageSize}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.textField}>
                    Full Name:
                </Text>
                <TextInput style={styles.inputTextField} 
                    placeholder='e.g. Sairam Chundru'
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Text style={styles.textField}>
                    Email Address:
                </Text>
                <TextInput style={styles.inputTextField}
                    placeholder='e.g. sairam.chundru1432@gmail.com'
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType='email-address'
                />
                <Text style={styles.textField}>
                    Password:
                </Text>
                <TextInput style={styles.inputTextField}
                    placeholder='e.g. sai12345'
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />

                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.btnLogin}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.newUser}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.newUserText}>LogIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#877dfa',
    },
    image: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    imageSize : {
        width: 300,
        height: 300,
    },
    body: {
        flex:1,
        backgroundColor: 'white',
        padding: 40,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    textField: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputTextField: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 13,
    },
    btn : {
        paddingVertical: 5,
        backgroundColor: 'yellow',
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 13,
    },
    btnLogin : {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
        
    },
    newUser: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    newUserText : {
        color: 'yellow',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
