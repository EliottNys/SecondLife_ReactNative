import React from "react";
import { Card, H2, Paragraph, Image, XStack } from "tamagui";

type ItemCardProps = {
  title: string;
  price: number;
  imgSrc: string;
};

const ItemCard: React.FC<ItemCardProps> = ({ title, price, imgSrc }) => {
  return (
    <Card elevate size="$4" bordered>
      <Card.Header padded>
        <H2>{title}</H2>
        <Paragraph theme="alt2">${price.toFixed(2)}</Paragraph>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            uri: "http://192.168.1.20:3000" + imgSrc,
            width: 300,
            height: 300,
          }}
        />
      </Card.Header>
      <Card.Footer></Card.Footer>
      <Card.Background></Card.Background>
      {/* <Card.Footer padded>
        <Paragraph>{description}</Paragraph>
        <Paragraph>{condition}</Paragraph>
      </Card.Footer> */}
    </Card>
  );
};

export default ItemCard;
