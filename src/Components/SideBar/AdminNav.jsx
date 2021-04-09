import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { theme } from "../../Assets/theme";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Arrow from "../../Assets/arrowDown.png";
import Logo from "../../Assets/logo.png";
import SpriteSheet from "../../Assets/spritesheet.png";
import { HomeIcon, HomeIconFilled } from "../../Assets/NavIcons";

import ProfileDropdown from "./ProfileDropdown";
import SearchBox from "./SearchBox";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const AdminNav = (props) => {
  const [showActivity, setShowActivity] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:9999/home/admin/allUsers/",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();
      if (!data.errors) {
        setAllUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleProfileDropdownHandler = () => {
    if (showProfileDropdown) {
      setAnimatePanel(true);
      setTimeout(() => {
        setShowProfileDropdown(false);
        setAnimatePanel(false);
      }, 200);
    } else {
      setShowProfileDropdown(true);
    }
  };

  const clearInput = async () => {
    await setSearchInput("");
  };

  const searchInputHandler = async (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchFilter = async () => {
    console.log(allUsers[5].firstname);
    console.log(
      allUsers[5].firstname.toLowerCase().indexOf(searchInput.toLowerCase())
    );
    const filtered = await allUsers.filter((user) => {
      return (
        user.firstname.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0 ||
        user.lastname.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0
      );
    });
    console.log(filtered);
    setSearchResults(filtered);
  };

  useEffect(() => {
    if (searchInput.length !== 0) {
      if (!searchInput.startsWith(" ")) {
        handleSearchFilter();
      }
    }
  }, [searchInput]);

  return (
    <NavBarMainWrapper>
      <NavBarMainContainer>
        <Left>
          <Link to="/admin">
            <img src={Logo} alt="logo" />
            <span>School-O</span>
          </Link>
        </Left>
        <Middle>
          <input
            type="text"
            placeholder="Search Student"
            value={searchInput}
            onChange={searchInputHandler}
          />
          <SearchIcon searchInput={searchInput} />
          <button onClick={() => clearInput()}>
            <CloseIcon />
          </button>
          {searchInput.length !== 0 &&
            !searchInput.startsWith(" ") &&
            searchResults.length !== 0 && (
              <SearchBox
                searchResults={searchResults}
                setSelectedStudentId={props.setSelectedStudentId}
                clearInput={clearInput}
              />
            )}
        </Middle>
        <Right>
          <ul>
            <li onClick={toggleProfileDropdownHandler}>
              <img src={Arrow} alt="dropdown" />
            </li>
          </ul>

          {showProfileDropdown && (
            <ProfileDropdown
              hide={animatePanel}
              toggleMenu={toggleProfileDropdownHandler}
            />
          )}
        </Right>

        {showProfileDropdown && (
          <FullWrap onClick={toggleProfileDropdownHandler}></FullWrap>
        )}
      </NavBarMainContainer>
    </NavBarMainWrapper>
  );
};

const NavBarMainWrapper = styled.div`
  width: 100%;
  height: 54px;
  border-bottom: 1px solid ${theme.main.grey};
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
`;

const NavBarMainContainer = styled.div`
  max-width: 1000px;
  padding: 0;
  margin: auto;
  display: flex;

  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  transition: width 0.25s ease;
  @media (max-width: 975px) {
    width: 139px;
  }
  > a > img {
    height: 40px;
  }
  span {
    position: absolute;
    color: #1a1919;
    font-size: 30px;
  }
`;

const SearchIcon = styled.div`
  background-repeat: no-repeat;
  background-position: -399px -321px;
  height: 10px;
  width: 10px;
  left: 78px;
  position: absolute;
  top: 9px;
  z-index: 2;

  ${({ searchInput }) => searchInput.length !== 0 && `left: 11px`}
`;

const CloseIcon = styled.div`
  background-position: -318px -333px;
  height: 20px;
  width: 20px;
  z-index: 3;
  background-image: url(${SpriteSheet});
  opacity: 0;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > button {
    position: absolute;
    right: 3px;
    top: 3px;
    z-index: 99;
    border: none;
    background-color: transparent;
    cursor: default;
  }
  > input {
    width: 215px;
    height: 28px;
    border: 1px solid ${theme.main.grey};
    border-radius: 3px;
    background-color: ${theme.main.secondarywhite};
    padding: 3px 10px 3px 26px;
    color: ${theme.main.darkgrey};
    font-size: 14px;

    ::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      text-align: center;
    }
    :focus {
      outline: none;
    }
    :focus ~ button > ${CloseIcon} {
      opacity: 1;
      cursor: pointer;
    }
    :focus ~ ${SearchIcon} {
      left: 11px;
    }
    :focus::placeholder {
      text-align: left;
    }
  }
`;

const Right = styled.div`
  width: 360px;
  transition: width 0.25s ease;
  position: relative;
  @media (max-width: 975px) {
    width: 222px;
  }
  > ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0 10px;
    }

    li:last-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 22px;
      width: 22px;
      background-color: ${theme.main.grey};
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid ${theme.main.grey};
      cursor: pointer;
      > img {
        height: 22px;
        width: 22px;
      }
    }
  }
  span {
    cursor: pointer;
  }
`;

const FullWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(AdminNav);
