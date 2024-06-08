import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import api from "@/services/api";
import ItemCard from "@/components/ItemCard";

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  condition: string;
  imgSrc: string;
};

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Item[]>("/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(!refreshing); // Toggle the refreshing state
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Refresh" onPress={handleRefresh} />
      {loading ? (
        <ThemedText>Loading...</ThemedText>
      ) : items.length > 0 ? (
        items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("ItemDetail", { item })}
          >
            <ItemCard
              key={item.id}
              title={item.title}
              price={item.price}
              imgSrc={item.imgSrc}
            />
          </TouchableOpacity>
        ))
      ) : (
        <ThemedText>No data available</ThemedText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Home;
