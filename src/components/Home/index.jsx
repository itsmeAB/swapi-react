import React, { useState, useEffect } from "react";
import { Row, Col, Input, Card, Progress, Spin } from "antd";
import Header from "../Header";
import { getPlanets } from "../../services";
import { connect } from "react-redux";
import "./Home.css";

const { Search } = Input;

const Home = props => {
  useEffect(() => {
    const { user } = props;
    if (!user.isLoggedIn) {
      props.history.push("/login");
    }
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
      <div className="search-wrapper">
        <Row
          align="middle"
          justify="center"
          type="flex"
          style={{ marginTop: "10px" }}
        >
          <Col>
            <Search
              placeholder="search here for planets..."
              onSearch={value => searchPlanet(value)}
              onChange={e => searchPlanet(e.target.value)}
              style={{ width: 200 }}
            />
          </Col>
        </Row>
      </div>
      <div className="result-wrapper">
        {loading ? (
          <Row gutter={[32, 32]} align="top" justify="center" type="flex">
            <Col>
              <Spin size="large" tip="Searching..." />
            </Col>
          </Row>
        ) : (
          <Row
            gutter={[32, 32]}
            align="top"
            justify="start"
            type="flex"
            style={{ marginTop: "10px" }}
          >
            {renderPlanets(planets)}
          </Row>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Home);
