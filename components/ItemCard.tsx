import React from "react";
import { Card, H2, Paragraph, Image, XStack } from "tamagui";

type ItemCardProps = {
  title: string;
  price: number;
};

const ItemCard: React.FC<ItemCardProps> = ({ title, price }) => {
  return (
    <Card elevate size="$4" bordered>
      <Card.Header padded>
        <H2>{title}</H2>
        <Paragraph theme="alt2">${price.toFixed(2)}</Paragraph>
      </Card.Header>
      <Card.Footer></Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            uri: "https://via.placeholder.com/300",
            width: 300,
            height: 300,
          }}
        />
      </Card.Background>
      {/* <Card.Footer padded>
        <Paragraph>{description}</Paragraph>
        <Paragraph>{condition}</Paragraph>
      </Card.Footer> */}
    </Card>
  );
};

export default ItemCard;
