import React, { useState, useEffect } from "react";
import { Row, Col, Input, Card, Progress, Spin } from "antd";
import Header from "../Header";
import { getPlanets } from "../../services";
import { connect } from "react-redux";

const { Search } = Input;

const Home = props => {
  useEffect(() => {
    const { user } = props;
    if (!user.isLoggedIn) {
      props.history.push("/login");
    }
    console.log("useEffect_calling");
  });

  const [planets, setplanets] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchPlanet = async searchTerm => {
    setLoading(true);
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
    setLoading(false);
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
      <Header />
      <Row
        align="middle"
        justify="center"
        type="flex"
        style={{ marginTop: "10px" }}
      >
        <Col>
          <Search
            placeholder="search here ..."
            onSearch={value => searchPlanet(value)}
            onChange={e => searchPlanet(e.target.value)}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        align="middle"
        justify="center"
        type="flex"
        style={{ marginTop: "10px" }}
      >
        {loading ? (
          <Col>
            <Spin size="large" tip="Searching..."/>
          </Col>
        ) : (
          renderPlanets(planets)
        )}
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Home);
