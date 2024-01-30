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

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async () => {
        try{
            const realm = await Realm.open({
                schema: [studentsSchema]
            });
            const students = realm.objects('Students').filtered('email=$0 AND password=$1', email, password)
            if(students.length > 0){
                navigation.navigate('Home')
            }else{
                Alert.alert('Login Failed', 'invalid email or password')
            }
        }catch(error){
            console.error('Login error', error);
            Alert.alert('Login Failed');
        }
    }

  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../assets/images/login.png')} style={styles.imageSize}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.textField}>
                    Email Address:
                </Text>
                <TextInput style={styles.inputTextField}
                    placeholder='e.g. sairam.chundru1432@gmail.com'
                    onChangeText={text => setEmail(text)}
                    keyboardType='email-address'
                    value={email}
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

                <TouchableOpacity style={styles.btn} onPress={loginHandler}>
                    <Text style={styles.btnLogin}>Login</Text>
                </TouchableOpacity>

                <View style={styles.newUser}>
                    <Text>don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.newUserText}>SignUp</Text>
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
        width: 350,
        height: 350,
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
