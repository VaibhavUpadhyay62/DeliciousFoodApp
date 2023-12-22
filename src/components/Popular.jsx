import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
  const [Popular, setPopular] = useState([]);

  useEffect(() => {
    return () => {
      getPopular();
    };
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("Popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=Italian,Chinese,Mexican`
      );

      const data = await api.json();

      localStorage.setItem("Popular", JSON.stringify(data.recipes));
      console.log(data);
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "4rem",
          }}
        >
          {Popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

export default Popular;

const Wrapper = styled.div`
  margin: 1rem 0 2rem 0;
`;

const Card = styled.div`
  min-height: 15rem;
  overflow: hidden;
  position: relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
    overflow: hidden;
    position: absolute;
    left: 0;
  }

  p {
    font-size: 0.7rem;
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: whitesmoke;
    text-align: center;
    width: 100%;
    font-weight: 600;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  border-radius: 2rem;
`;
