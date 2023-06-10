import React, { useContext, useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from 'react-router-dom';
import {
  faBed,
  faCar,
  faTaxi,
  faPlane,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleCheck = (name, operations) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operations === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext)

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
    navigate("/hotel", { state: {destination, dates, options}})
  }

  return (
    <div className="header">
      <div className={type==="list" ? "header-container listMode" : "header-container "}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>


        {
          type !== "list" &&  
            <>
            <h1 className="headerTitle">A Lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free booking.com account
        </p>
        {!user && <button className="headerBtn">Sign In / Register</button>}

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Enter from listed below"
              className="headerInput"
              onChange={e=>{setDestination(e.target.value.toLowerCase())}}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={() => setOpenDate(!openDate)} className="headerSearchItemText">{`${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
                className="headerSearchItemText"
              onClick={() => setOpenOptions(!openOptions)}
            >{`${options.adult} adult . ${options.children} children . ${options.rooms} room`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionsItem">
                  <span className="optionsText">Adult</span>
                  <div className="optionsCounter">
                    <button
                     
                      className="optionsCounterButton"
                      onClick={() => handleCheck("adult", "i")}
                    >
                      +
                    </button>
                    <div className="optionsCounterNumber">{options.adult}</div>
                    <button
                      disabled={options.adult <= 1}
                      className="optionsCounterButton"
                      onClick={() => handleCheck("adult", "d")}
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="optionsItem">
                  <span className="optionsText">Children</span>
                  <div className="optionsCounter">
                    <button
                      className="optionsCounterButton"
                      onClick={() => handleCheck("children", "i")}
                    >
                      +
                    </button>
                    <div className="optionsCounterNumber">
                      {options.children}
                    </div>
                    <button
                    disabled={options.children <= 0}
                      className="optionsCounterButton"
                      onClick={() => handleCheck("children", "d")}
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="optionsItem">
                  <span className="optionsText">Rooms</span>
                  <div className="optionsCounter">
                    <button
                      className="optionsCounterButton"
                      onClick={() => handleCheck("rooms", "i")}
                    >
                      +
                    </button>
                    <div className="optionsCounterNumber">{options.rooms}</div>
                    <button
                    disabled={options.rooms <= 1}
                      className="optionsCounterButton"
                      onClick={() => handleCheck("rooms", "d")}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handleChange}>Search</button>
          </div>
        </div></>
        }
      </div>
    </div>
  );
};

export default Header;
