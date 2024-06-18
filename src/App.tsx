import { lazy } from "react";
import { GlobaStyles } from "./styles/globalStyles";

const LazyHome = lazy(() => import("./pages/home"));

function App() {
  return (
    <>
      <GlobaStyles />
      <LazyHome />
    </>
  );
}

export default App;
