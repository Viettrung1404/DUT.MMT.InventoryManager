import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../src/types/navigation';
import Constants from 'expo-constants';
import { useAuth } from '../context/AuthContext';



type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!Constants.expoConfig?.extra?.IP_LOCAL) {
      Alert.alert(
        'Cấu hình lỗi', 
        'Thiếu IP_LOCAL trong cấu hình ứng dụng. Kiểm tra app.config.js'
      );
      return;
    }
    // Validate input
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    
    try {
      console.log("Connecting to server at:", `http://${Constants.expoConfig.extra.IP_LOCAL}:3000/auth/login`);
      const response = await axios.post(`http://${Constants.expoConfig.extra.IP_LOCAL}:3000/auth/login`, {
        email,
        password
      });
      console.log('Login response:', response.data );

      // Đăng nhập với token và thời gian hết hạn (1 giờ)
      const expiresIn = 3600 * 1000; // 1 giờ
      await login(response.data.token, expiresIn);
      console.log('Token saved:', response.data.token);

    } catch (error) {
      let errorMessage = 'Login failed';
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

    <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
    >
    <Text style={styles.registerText}>
        Chưa có tài khoản? Đăng ký ngay
    </Text>
    </TouchableOpacity>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  registerLink: {
    marginTop: 15,
    alignSelf: 'center',
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;