import Footer from "../components/Footer";
import styled from "styled-components";
import process from "../assets/process.svg";
import { COLORS } from "../utils/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const footerHeight = Math.max(document.body.clientHeight / 20, 120) + "px";
const StyledDiv = styled.div`
  height: calc(100vh - 2rem - 120px - ${footerHeight});
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: clamp(200px, 100%, 400px);
    transition: transform 0.7s ease-in-out;
    transform: translateX(200%);
    &.closed {
      transform: translateX(200%);
    }
    &.opened {
      transition-duration: 1s;
      transform: translateX(0);
    }
  }
`;

const StyledIntro = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  h2 {
    color: ${COLORS.secondary};
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 37px;
    min-height: 111px;
  }
  .btn {
    margin-bottom: 1rem;
  }

  h2,
  .btn {
    transition: transform 0.7s ease-in-out;
    transform: translateX(-200%);
    &.closed {
      transform: translateX(-200%);
    }
    &.opened {
      transition-duration: 1s;
      transform: translateX(0);
    }
  }
`;

const StyledFooter = styled.div`
  height: ${footerHeight};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export default function Home() {
  const [animate, setanimate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setanimate("opened");
    }, 10);
  }, []);

  function handleClick(path: string) {
    // console.log(path);
    setanimate("closed");
    setTimeout(() => {
      navigate("/" + path);
    }, 700);
  }
  return (
    <>
      <StyledDiv>
        <StyledIntro>
          <h2 className={animate}>Bienvenue sur la plateforme middleware de génération de vos formations</h2>
          <button className={`btn filled ${animate}`} onClick={() => handleClick("generate")}>
            Generate Training
          </button>
          <button className={`btn ${animate}`} onClick={() => handleClick("format")}>
            Format to json
          </button>
        </StyledIntro>
        <img src={process} className={animate} alt="Process" />
      </StyledDiv>
      <StyledFooter>
        <Footer close={animate} />
      </StyledFooter>
    </>
  );
}
