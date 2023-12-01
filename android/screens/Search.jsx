import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './search.style';
import { COLORS, SIZES } from '../constants/index';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { ProductList } from '../components/index';
import SearchTitle from '../components/products/SearchTitle';
import { HOST } from '@env';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = products.filter((product) =>
      product.book.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${HOST}:5000/api/v2/books`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {filteredProducts.length == 0 || searchText == '' ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require('../assets/images/Pose23.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTitle product={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
