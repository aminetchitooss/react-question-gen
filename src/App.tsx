import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";

const Home = React.lazy(() => import("./pages/Home"));
const Format = React.lazy(() => import("./pages/Format"));
const Generate = React.lazy(() => import("./pages/Generate"));

const StyledDiv = styled.div`
  height: 100%;
  padding-top: 2rem;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

function App() {
  return (
    <StyledDiv>
      <Header />
      <React.Suspense fallback={<p>Loading ...</p>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/generate" element={<Generate />}></Route>
          <Route path="/format" element={<Format />}></Route>
        </Routes>
      </React.Suspense>
    </StyledDiv>
  );
}

export default App;
