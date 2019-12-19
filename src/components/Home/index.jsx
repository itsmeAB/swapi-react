import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import { getPlanets } from "../../services";

const { Search } = Input;

const Home = () => {
  const [planets, setplanets] = useState([]);
//   const [totalPopulation, setTotalPopulation] = useState(0);
  const searchPlanet = async searchTerm => {
    const res = await getPlanets(searchTerm);
    if (res) {
      setplanets(res);
    }
  };

  const renderPlanets = planets => {
    return planets.map(planet => <Col>{planet.name}</Col>);
  };

  return (
    <>
      <div>Home</div>
      <Row>
        <Col>
          <Search
            placeholder="input search text"
            onSearch={value => searchPlanet(value)}
            onChange={e => searchPlanet(e.target.value)}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
      <Row>{renderPlanets(planets)}</Row>
    </>
  );
};

export default Home;
