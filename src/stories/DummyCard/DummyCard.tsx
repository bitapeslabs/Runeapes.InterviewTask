import React, { ReactNode } from "react";
import { Card } from "./DummyCard.styled";

export type CardProps = {
  children: ReactNode;
};

const DummyCard: React.FC<CardProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Card>{children}</Card>
    </React.Fragment>
  );
};

export default DummyCard;
