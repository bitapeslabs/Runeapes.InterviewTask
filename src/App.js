import logo from "./logo.svg";
import "./App.css";
import { Carousel } from "rune-carousel";

function App() {
  return (
    <div className="App">
      <Carousel visibleItemsCount={3} withIndicator isInfinite>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, k) => (
          <div style={{ fontSize: 32 }} key={k}>
            {i}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
