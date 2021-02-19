import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

const MyComponent = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 100
          }}>
            <Image 
            source={require('../../assets/Flipcard.png')}></Image>
          </View>
          <TextInput
            style={{
              marginBottom: 20
            }}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{
              marginBottom: 50
            }}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={{marginBottom: 20}}>
            <Button
            onPress={() => navigation.navigate('Home')}
              title="Login"></Button>
          </View>
            <Button
              color="#444444"
              style={{
                marginBottom: 20
              }}
              onPress={() => navigation.navigate('Register')}
              title="Register"></Button>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
});