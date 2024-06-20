import { ICarousel } from "../../../utils/typesUtils";
import * as S from "./Carousel.styled";
import { useWindowSize } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { Item } from "./item";
import { appMachine } from "../../../machines/appMachine";
import { useMachine } from "@xstate/react";
import { generateRandomColors } from "../../../utils/funcUtils";
import { useDrag } from "@use-gesture/react";

const Carousel = ({
  isInfinite,
  viewCount,
  datas,
  fullWidth,
  viewWidth,
  viewHeight,
}: ICarousel) => {
  const [state, send] = useMachine(appMachine);

  const { width = 0, height = 0 } = useWindowSize();
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [drag, setDrag] = useState<boolean>(false);
  const [between, setBetween] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fullWidth) {
      setItemWidth(width / viewCount);
    } else if (viewWidth) {
      setItemWidth(viewWidth / viewCount);
    }

    if (width < 768) {
      // setIsMobile(true);
    }
  }, [width, fullWidth]);

  useEffect(() => {
    setColors(generateRandomColors(datas));
  }, [datas]);

  const setIndex = (index: number) => {
    const currentIndex = state.context.index;
    const dataLength = datas;
    const newIndex = (currentIndex + index + dataLength) % dataLength;

    if (isInfinite) {
      send({
        type: "SET_INDEX",
        index: newIndex,
      });
    } else {
      if (!(newIndex > 0 && newIndex < viewCount)) {
        send({
          type: "SET_INDEX",
          index: newIndex,
        });
      }
    }
  };

  const setDragIndex = (index: number) => {
    send({ type: "SET_INDEX", index: index });
  };

  const bind = useDrag(({ down, movement: [mx], velocity }) => {
    if (!down) {
      setDrag(false);
    } else {
      setDrag(true);
      setBetween(mx);
      setVelocity(velocity[0]);
      setDirection(0);
    }
  });

  return (
    <S.Container
      $viewWidth={fullWidth ? width : viewWidth!}
      $viewHeight={viewHeight ? viewHeight : height}
      $isInfinite={isInfinite}
    >
      <div
        className="left"
        onClick={() => {
          setIndex(1);
          setDirection(1);
        }}
      >
        Prev
      </div>
      <div className="slider" ref={sliderRef} {...bind()}>
        {new Array(datas).fill(null).map((_, index) => (
          <Item
            key={index}
            id={index}
            $itemWidth={itemWidth}
            $isInfinite={isInfinite}
            $viewCount={viewCount}
            $totalCount={datas}
            $index={state.context.index}
            $backgroundColor={colors[index]}
            direction={direction}
            drag={drag}
            between={between}
            velocity={velocity}
            setIndex={setDragIndex}
          />
        ))}
      </div>
      <div
        className="right"
        onClick={() => {
          setIndex(-1);
          setDirection(-1);
        }}
      >
        Next
      </div>
    </S.Container>
  );
};

export default Carousel;
