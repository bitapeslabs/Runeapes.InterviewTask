import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";

export interface CarouselItemProps {
  children: ReactNode[];
}

const CardContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 400px;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.8s ease-in-out;
`;

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return (
    <React.Fragment>
      <CardContainer>
        <Card>{children}</Card>
      </CardContainer>
    </React.Fragment>
  );
};

export default CarouselItem;
