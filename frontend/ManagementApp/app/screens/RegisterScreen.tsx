// app/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { validatePassword } from '@/src/utils/validation';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return false;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Lỗi', 
        'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa và 1 số'
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await axios.post('http://192.168.1.7:3000/auth/register', {
        name,
        email,
        password
      });

      Alert.alert(
        'Thành công', 
        'Đăng ký thành công! Vui lòng đăng nhập',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
      
    } catch (error) {
      let errorMessage = 'Đăng ký thất bại';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Đăng ký"
          onPress={handleRegister}
          color="#007bff"
        />
      )}

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>
          Đã có tài khoản? Đăng nhập ngay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#212529',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RegisterScreen;