import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://your-api-url/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Button title="Xem" onPress={() => navigation.navigate('Detail', { id: item.id })} />
          </View>
        )}
      />
      <Button title="Thêm sách" onPress={() => navigation.navigate('AddEdit')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, borderBottomWidth: 1 },
});

export default HomeScreen;