import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
};

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ThemedText>Loading...</ThemedText>
      ) : items.length > 0 ? (
        items.map((item) => (
          <ItemCard key={item.id} title={item.title} price={item.price} />
        ))
      ) : (
        <ThemedText>No data available</ThemedText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;