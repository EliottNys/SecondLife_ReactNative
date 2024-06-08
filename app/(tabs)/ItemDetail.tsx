import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "tamagui";

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  condition: string;
  imgSrc: string;
};

type RouteParams = {
  item: Item;
};

const ItemDetail: React.FC = () => {
  const route = useRoute();
  const { item } = route.params as RouteParams;
  console.log(item);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <Text style={styles.description}>Condition: {item.condition}</Text>
      <Image
        source={{ uri: "http://192.168.1.20:3000" + item.imgSrc }}
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a68fcc",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: "#a68fcc",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a68fcc",
  },
  image: {
    width: "90%",
    height: 700,
    marginVertical: 16,
  },
});

export default ItemDetail;
