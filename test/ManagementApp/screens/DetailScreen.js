import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://your-api-url/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://your-api-url/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return <Text>Đang tải...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tiêu đề: {book.title}</Text>
      <Text style={styles.text}>Tác giả: {book.author}</Text>
      <Text style={styles.text}>Năm xuất bản: {book.published_year}</Text>
      <Text style={styles.text}>Thể loại: {book.genre}</Text>
      <Button title="Sửa" onPress={() => navigation.navigate('AddEdit', { id })} />
      <Button title="Xóa" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { marginBottom: 8 },
});

export default DetailScreen;