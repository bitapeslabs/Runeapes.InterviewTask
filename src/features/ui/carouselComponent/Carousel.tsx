import { ICarousel } from "../../../utils/typesUtils";
import * as S from "./Carousel.styled";
import { useWindowSize } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Item } from "./item";
import { appMachine } from "../../../machines/appMachine";
import clsx from "clsx";
import { useMachine } from "@xstate/react";

const Carousel = ({
  isInfinite,
  viewCount,
  datas,
  fullWidth,
  viewWidth,
  viewHeight,
  handler,
  gap,
  auto,
  duration,
}: ICarousel) => {
  // const state = AppContext.useSelector((state) => state);
  // const { send } = AppContext.useActorRef();

  const [state, send] = useMachine(appMachine);

  const { width = 0, height = 0 } = useWindowSize();
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [mouseActive, setMouseActive] = useState<boolean>(false);
  const [positionX, setPositionX] = useState<number>(0);
  const [move, setMove] = useState<number>(0);
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (sliderRef.current && sliderRef.current.contains(e.target as Node)) {
        setMouseActive(true);
        setPositionX(e.clientX);
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      if (sliderRef.current && sliderRef.current.contains(e.target as Node)) {
        setMouseActive(false);
        setPositionX(0);
        setMove(0);
      }
    };

    const slide = sliderRef.current;
    if (!slide) return;
    if (!isMobile) return;

    slide.addEventListener("mousedown", onMouseDown);
    slide.addEventListener("mouseup", onMouseUp);

    return () => {
      slide.removeEventListener("mousedown", onMouseDown);
      slide.removeEventListener("mouseup", onMouseUp);
    };
  }, [isMobile]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (
        mouseActive &&
        sliderRef.current &&
        sliderRef.current.contains(e.target as Node)
      ) {
        setMove(e.clientX - positionX);
        setPositionX(e.clientX);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseActive]);

  const handle = (index: number) => {
    send({ type: "LEAVE_SLIDE", xleave: index });
  };

  useEffect(() => {
    if (isInfinite) {
      send({
        type: "SET_INDEX",
        index:
          (state.context.index - state.context.leaveX + datas.length) %
          datas.length,
      });
    } else {
      send({
        type: "SET_INDEX",
        index:
          state.context.index - state.context.leaveX < 0
            ? 0
            : state.context.index - state.context.leaveX >
                datas.length - 1 - viewCount
              ? datas.length - 1 - viewCount
              : state.context.index - state.context.leaveX,
      });
    }
  }, [state.context.leaveX]);

  useEffect(() => {
    if (move) {
      send({ type: "SET_SPEED", speed: move - state.context.moveX });
      send({ type: "SET_MOVEX", xmove: move });
    } else {
      let temp = state.context.speed;
      const timer = setInterval(() => {
        temp *= 0.7;
        const index = Math.round(temp / 4);
        handle(index);
        if (Math.abs(temp) < 0.5) {
          send({ type: "SET_SPEED", speed: 0 });
          send({ type: "SET_MOVEX", xmove: 0 });
          clearInterval(timer);
        }
      }, 30);
    }
  }, [move]);

  useEffect(() => {
    if (fullWidth) {
      setItemWidth(width / viewCount);
    } else if (viewWidth) {
      setItemWidth(viewWidth / viewCount);
    }

    if (width < 768) {
      setIsMobile(true);
    }
  }, [width, fullWidth]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (auto) {
      let tempTime = 0;
      timer = setInterval(() => {
        tempTime += 50;
        setProgressWidth(tempTime / (duration * 10));
        if (tempTime >= duration * 1000) {
          if (isInfinite) {
            send({
              type: "SET_INDEX",
              index: (state.context.index + 1 + datas.length) % datas.length,
            });
          } else {
            send({
              type: "SET_INDEX",
              index:
                state.context.index + 1 < 0
                  ? 0
                  : state.context.index + 1 > datas.length - 1 - viewCount
                    ? datas.length - 1 - viewCount
                    : state.context.index + 1,
            });
          }
          clearInterval(timer);
        }
      }, 20);
    }

    return () => {
      clearInterval(timer);
    };
  }, [auto, duration, state.context.index]);

  const handleChangeIndex = (index: number) => {
    if (isInfinite) {
      send({
        type: "SET_INDEX",
        index: (state.context.index + index + datas.length) % datas.length,
      });
    } else {
      send({
        type: "SET_INDEX",
        index:
          state.context.index + index < 0
            ? 0
            : state.context.index + index > datas.length - 1 - viewCount
              ? datas.length - 1 - viewCount
              : state.context.index + index,
      });
    }
  };

  const changeSlide = (index: number) => {
    if (state.context.index !== index) {
      send({ type: "SET_INDEX", index: index });
    }
  };

  return (
    <S.Container
      $viewWidth={fullWidth ? width : viewWidth!}
      $viewHeight={viewHeight ? viewHeight : height}
      $isInfinite={isInfinite}
    >
      <div className="slider" ref={sliderRef}>
        {datas.map((data, index) => (
          <Item
            key={index}
            data={data}
            id={index}
            $itemWidth={itemWidth}
            $isInfinite={isInfinite}
            $viewCount={viewCount}
            $totalCount={datas.length}
            $gap={gap ? gap : 6}
            movePosition={move}
            $index={state.context.index}
          />
        ))}
      </div>
      {auto && (
        <div className="time_line">
          <div className="progress" style={{ width: `${progressWidth}%` }} />
        </div>
      )}
      {handler && !isMobile && (
        <div className="handler">
          {isInfinite ? (
            <>
              {new Array(datas.length).fill(null).map((_, index) => (
                <div
                  className={clsx(
                    "handle",
                    state.context.index === index && "active"
                  )}
                  key={index}
                  onClick={() => changeSlide(index)}
                />
              ))}
            </>
          ) : (
            <>
              {new Array(datas.length - viewCount)
                .fill(null)
                .map((_, index) => (
                  <div
                    className={clsx(
                      "handle",
                      state.context.index === index && "active"
                    )}
                    key={index}
                    onClick={() => changeSlide(index)}
                  />
                ))}
            </>
          )}
        </div>
      )}
      <div className="btn_group">
        <div className="left" onClick={() => handleChangeIndex(-1)}>
          <GrPrevious size={20} />
        </div>
        <div className="right" onClick={() => handleChangeIndex(1)}>
          <GrNext size={20} />
        </div>
      </div>
    </S.Container>
  );
};

export default Carousel;
