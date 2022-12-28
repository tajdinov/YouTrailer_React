import React from "react";
import Main from "../Components/Main";
import Row from "../Components/Row";
import requests from "../request";

const Home = () => {
  return (
    <div>
      <Main />
      <Row rowId="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row rowId="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowId="3" title="Trending" fetchURL={requests.requestTopRated} />
      <Row rowId="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowId="5" title="Horror" fetchURL={requests.requestHorror} />
    </div>
  );
};

export default Home;
