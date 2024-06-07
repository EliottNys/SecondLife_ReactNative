import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import api from "@/services/api";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/items");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ThemedText>Loading...</ThemedText>
      ) : data ? (
        <ThemedText>{JSON.stringify(data)}</ThemedText>
      ) : (
        <ThemedText>No data available</ThemedText>
      )}
    </View>
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
