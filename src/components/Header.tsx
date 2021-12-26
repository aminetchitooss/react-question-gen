import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Logo.svg";
import { COLORS } from "../utils/colors";
import { useLocation } from "react-router-dom";

const StyledLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 120px;
  }

  & > a {
    font-size: 1.4rem;
    color: ${COLORS.secondary};
    text-decoration: none;
    position: relative;
    line-height: 24px;

    &::after {
      content: "";
      width: 0px;
      height: 4px;
      border-radius: 10px;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: all 0.3s ease-in-out;
    }

    &:first-child {
      margin-right: auto;
    }
    &:nth-child(2) {
      margin-right: 1.5rem;
    }
  }
`;

export default function Header() {
  const location = useLocation();

  return (
    <StyledLink>
      <NavLink to={"/"}>
        <img src={logo} alt="Logo" />
      </NavLink>

      {location.pathname !== "/" && (
        <>
          <NavLink to={"/generate"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
            Generate Training
          </NavLink>
          <NavLink to={"/format"} className={({ isActive }) => (isActive ? "activeLink" : "")}>
            Format To Json
          </NavLink>
        </>
      )}
    </StyledLink>
  );
}
