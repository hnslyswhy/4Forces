import React from "react";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <main className="home">
      <section className="home__hero"></section>
      <section className="home__headline">
        <h1 className="home__title">
          Once You Have Tasted The Taste Of Sky, You Will Forever Look Up!
        </h1>
        {/*  <p className="home__quote"> ~ Leonardo DaVinci</p> */}
      </section>
      <section className="home__text">
        <p>
          Chasing Your Flying Dreams With{" "}
          <span className="home__strong">4Forces</span>
        </p>
      </section>
    </main>
  );
};

export default HomePage;
