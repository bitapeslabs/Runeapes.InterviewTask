import React, { useState, ReactElement } from "react";
import "./App.css";
import styles from "./styles.module.css";
import Carousel from "./components/carousel";
import classnames from "classnames";
interface FeatureProps {
  title: ReactElement;
  description: ReactElement;
}

function App() {
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: <>1</>,
      description: (
        <>
          Docusaurus was designed from the ground up to be easily installed and
          used to get your website up and running quickly.
        </>
      ),
    },
    {
      id: 2,
      title: <>2</>,
      description: (
        <>
          Docusaurus lets you focus on your docs, and we&apos;ll do the chores.
          Go ahead and move your docs into the <code>docs</code> directory.
        </>
      ),
    },
    {
      id: 3,
      title: <>3</>,
      description: (
        <>
          Extend or customize your website layout by reusing React. Docusaurus
          can be extended while reusing the same header and footer.
        </>
      ),
    },
    {
      id: 4,
      title: <>4</>,
      description: (
        <>
          Extend or customize your website layout by reusing React. Docusaurus
          can be extended while reusing the same header and footer.
        </>
      ),
    },
    {
      id: 5,
      title: <>5</>,
      description: (
        <>
          Extend or customize your website layout by reusing React. Docusaurus
          can be extended while reusing the same header and footer.
        </>
      ),
    },
    {
      id: 6,
      title: <>6</>,
      description: (
        <>
          Extend or customize your website layout by reusing React. Docusaurus
          can be extended while reusing the same header and footer.
        </>
      ),
    },
    {
      id: 7,
      title: <>7</>,
      description: (
        <>
          Extend or customize your website layout by reusing React. Docusaurus
          can be extended while reusing the same header and footer.
        </>
      ),
    },
  ]);

  function Feature({ title, description }: FeatureProps) {
    return (
      <div className={classnames("col col--4", styles.feature)}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  return (
    <div className="App" style={{display: "flex", justifyContent: "center"}}>
      <main style={{display: "flex", maxWidth: "800px"}}>
        {features && features.length && (
          <section className={styles.features}>
            <div className={styles.container}>
              <div className={styles.row}>
                <Carousel
                  swiping={true}
                  show={4}
                  slide={2}
                  transition={0.5}
                  originalWidth={400}
                  responsive={true}
                >
                  {features.map((props, idx) => (
                    <Feature key={props.id} {...props} />
                  ))}
                </Carousel>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
