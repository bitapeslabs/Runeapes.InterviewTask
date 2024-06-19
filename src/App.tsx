import React from "react";
import Carousel from "./components/Carousel";

import "./App.css";

import slide1 from "./assets/images/slide1.png";
import slide2 from "./assets/images/slide2.png";
import slide3 from "./assets/images/slide3.png";
import slide4 from "./assets/images/slide4.png";
import slide5 from "./assets/images/slide4.png";

function App() {
  const [visibleItemsCount, setVisibleItemsCount] = React.useState(3);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setVisibleItemsCount(1);
    } else {
      setVisibleItemsCount(3);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slides = [slide1, slide2, slide3, slide4, slide5];
  return (
    <div className="App">
      <Carousel visibleItemsCount={visibleItemsCount} withIndicator isInfinite>
        {slides.map((slide, index) => {
          return (
            <div key={index} className="slide-container">
              <img src={slide} alt="slide" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default App;
