import React, { useState } from "react";
import { Row, Col, Input, Card, Progress } from "antd";
import { getPlanets } from "../../services";

const { Search } = Input;

const Home = () => {
  const [planets, setplanets] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);

  const searchPlanet = async searchTerm => {
    const res = await getPlanets(searchTerm);
    if (res) {
      setplanets(res);
      const totalPop = res.length
        ? res.reduce(
            (acc, cv) =>
              Number(acc) +
              (cv.population && cv.population !== "unknown"
                ? Number(cv.population)
                : 0),
            0
          )
        : 0;
      setTotalPopulation(totalPop);
    }
  };

  const renderPlanets = planets => {
    const knownPlanets = planets.filter(
      planet => planet.name !== "unknown" && planet.population !== "unknown"
    );

    knownPlanets.sort((a, b) => Number(b.population) - Number(a.population));

    return knownPlanets.map((planet, index) => (
      <Col xs={24} md={8} key={index}>
        <Card
          size="small"
          title={planet.name}
          //   extra={<a href="#">More</a>}
          //   style={{ width: 300 }}
        >
          Landscape: <b>{planet.terrain}</b>
          <br />
          Gravity: {"  "}
          <b>
            {planet.gravity && planet.gravity !== "N/A"
              ? planet.gravity
              : "1 standard"}
          </b>
          <br />
          Population: <b>{planet.population}</b>
          <br />
          {console.info(
            "population",
            planet.name,
            planet.population,
            totalPopulation,
            planet.population / totalPopulation
          )}
          <strong>
            {((planet.population * 100) / totalPopulation).toFixed(3)}%
          </strong>{" "}
          of total population from current list.
          <Progress
            strokeColor={{
              from: "#108ee9",
              to: "#87d068"
            }}
            // type="circle"
            percent={Number(
              ((planet.population * 100) / totalPopulation).toFixed(3)
            )}
            // format={percent => ``}
          />
        </Card>
      </Col>
    ));
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
      <Row gutter={[32, 32]} style={{ marginTop: "10px" }}>
        {renderPlanets(planets)}
      </Row>
    </>
  );
};

export default Home;
