import React from "react";
import { CardContainer, Card } from "./card.styled";
import { CardProps } from "./card.type";

const CarouselItem: React.FC<CardProps> = ({ children, width = 300 }) => {
  return (
    <React.Fragment>
      <CardContainer>
        <Card>{children}</Card>
      </CardContainer>
    </React.Fragment>
  );
};

export default CarouselItem;
