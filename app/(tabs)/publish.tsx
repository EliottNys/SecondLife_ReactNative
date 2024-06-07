import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, Input, TextArea, Text, YStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ConditionRadio from "@/components/ConditionRadio";
import { launchCameraAsync } from "expo-image-picker";
import * as FileSystem from "expo-file-system";

interface PlaceAdFormProps {
  categoryList: Array<[string, number]>;
}

const PlaceAdForm: React.FC<PlaceAdFormProps> = ({ categoryList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("12.34");
  const [condition, setCondition] = useState("Acceptable");
  const [image, setImage] = useState<string>("");

  const navigation = useNavigation();

  const takePicture = async () => {
    const result = await launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image);
    }
  };

  const createAd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("categoryId", "1");
      formData.append("condition", condition);
      const file = {
        uri: image,
        type: "image/jpeg",
        name: (await FileSystem.getInfoAsync(image)).uri.split("/").pop(),
      };
      formData.append("image", file);
      console.log(formData);

      await axios.post("http://192.168.1.20:3000/api/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Refresh or navigate as needed
      navigation.goBack();
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack space="$3">
        <Text
          fontSize="$9"
          fontWeight="bold"
          textAlign="center"
          color="#a68fcc"
          paddingTop="$4"
        >
          Place an Ad:
        </Text>
        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          borderWidth={1}
          borderColor="#ccc"
          padding="$2"
          borderRadius="$2"
          cursorColor="#a68fcc"
          fontSize={18}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          borderWidth={1}
          borderColor="#ccc"
          padding="$2"
          borderRadius="$2"
          height={150}
          cursorColor="#a68fcc"
        />
        <Text fontSize="$8" fontWeight="900" color="#a68fcc">
          Condition:
        </Text>
        <ConditionRadio condition={condition} setCondition={setCondition} />
        <Button onPress={takePicture} backgroundColor="#a68fcc" padding="$2">
          <Text color="white" fontSize="$6">
            Take a Picture
          </Text>
        </Button>
        {image && (
          <Text color="#a68fcc" fontSize="$6">
            Picture taken!
          </Text>
        )}
        <Button onPress={createAd} backgroundColor="#a68fcc" padding="$2">
          <Text color="white" fontSize="$6">
            Place the ad
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default PlaceAdForm;
