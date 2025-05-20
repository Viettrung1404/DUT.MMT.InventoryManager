import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEditScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published_year, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`http://your-api-url/books/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const book = response.data;
          setTitle(book.title);
          setAuthor(book.author);
          setPublishedYear(book.published_year.toString());
          setGenre(book.genre);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const bookData = { title, author, published_year: parseInt(published_year), genre };
      if (id) {
        await axios.put(`http://your-api-url/books/${id}`, bookData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://your-api-url/books', bookData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Tiêu đề" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Tác giả" value={author} onChangeText={setAuthor} />
      <TextInput style={styles.input} placeholder="Năm xuất bản" value={published_year} onChangeText={setPublishedYear} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Thể loại" value={genre} onChangeText={setGenre} />
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
});

export default AddEditScreen;