import React, { useState } from "react";
import "../CSS/WeatherApp.css";

import Humidity_icon from "../Img/humidity_icon.png";
import Wind_icon from "../Img/wind-icon.png";
import Sun_icon from "../Img/sun_icon.png";
import FewClouds_icon from "../Img/fewClouds_icon.png";
import scatteredClouds_icon from "../Img/scatteredClouds_icon.png";
import shower_icon from "../Img/shower_Rain_icon.png";
import rain_icon from "../Img/rainCloud_icon.png";
import thunderstorm_icon from "../Img/thunderstorm_icon.png";
import snow_icon from "../Img/snow_icon.png";
import mist_icon from "../Img/mist_icon.png";
import CloudError_icon from "../Img/cloudError-icon.png";

const WeatherApp = () => {
  const newDate = new Date();
  const currDay = newDate.getDate();
  const currMonth = newDate.getMonth();
  const currYear = newDate.getFullYear();
  const currHours = newDate.getHours();
  const currMin = newDate.getMinutes();

  let func = (index) => {
    let arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return arr[index];
  };

  const currDate = `${currDay} ${func(currMonth)} ${currYear} `;
  const currTime = `${currHours} : ${currMin}`;

  const initialState = {
    date: currDate,
    city: "",
    name: "----",
    degree: "--",
    humidity: "--",
    wind: "--",
  };

  const [state, setState] = useState(initialState);

  const [wIcon, setWIcon] = useState(Sun_icon);

  const [style, setStyle] = useState({
    display: "none",
  });

  const [popUp, setPopUp] = useState({
    display: "none",
  });

  const inputChange = (event) => {
    console.log(event.target.value);
    setState({ ...state, city: event.target.value });
  };

  const saveCity = () => {
    console.log("Search City");
    if (style.display === "none" && state.city === "") {
      return false;
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric&appid=03c0c3d86ab675d52fcbc604ab790abb`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          if (
            data.weather[0].icon === "01d" ||
            data.weather[0].icon === "01n"
          ) {
            setWIcon(Sun_icon);
          } else if (
            data.weather[0].icon === "02d" ||
            data.weather[0].icon === "02n"
          ) {
            setWIcon(FewClouds_icon);
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            setWIcon(scatteredClouds_icon);
          } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
          ) {
            setWIcon(scatteredClouds_icon);
          } else if (
            data.weather[0].icon === "09d" ||
            data.weather[0].icon === "09n"
          ) {
            setWIcon(shower_icon);
          } else if (
            data.weather[0].icon === "10d" ||
            data.weather[0].icon === "10n"
          ) {
            setWIcon(rain_icon);
          } else if (
            data.weather[0].icon === "11d" ||
            data.weather[0].icon === "11n"
          ) {
            setWIcon(thunderstorm_icon);
          } else if (
            data.weather[0].icon === "13d" ||
            data.weather[0].icon === "13n"
          ) {
            setWIcon(snow_icon);
          } else if (
            data.weather[0].icon === "50d" ||
            data.weather[0].icon === "50n"
          ) {
            setWIcon(mist_icon);
          } else {
            setWIcon(Sun_icon);
          }

          setState({
            ...state,
            name: data.name,
            degree: Math.floor(data.main.temp),
            humidity: Math.floor(data.main.humidity),
            wind: Math.floor(data.wind.speed),
          });
        })
        .catch((error) => {
          setStyle({ display: "none" });
          setPopUp({ display: "flex" });
        });
      setStyle({ display: "flex" });
    }
  };

  // Pop-up event
  let onPopUp = () => {
    setPopUp({ display: "none" });
    setState(initialState);
  };

  return (
    <>
      <section id="weatherApp">
        <section id="weatherApp-box">
          <div id="search-div">
            <input
              type="text"
              id="search-input"
              name="city"
              value={state.city}
              onChange={inputChange}
              placeholder="Search for cities"
              autoComplete="off"
            />
            <button id="search-btn" onClick={saveCity}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 17 18"
                className=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="grey" fillRule="evenodd">
                  <path
                    className="_34RNph"
                    d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                  ></path>
                  <path
                    className="_34RNph"
                    d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div id="temp-div" style={{ display: style.display }}>
            <div id="left-temp-div">
              <div id="left-top-temp-div">
                <p className="currentTime">
                  <span className="hours">{currTime}</span>
                  {/* <span className="am-pm"> PM</span> */}
                </p>
                <p className="currentCity">{state.name}</p>
                <p className="currentDate">{state.date}</p>
              </div>
              <div id="left-bottom-temp-div">{state.degree}&deg;</div>
            </div>
            <div id="right-temp-div">
              <img src={wIcon} alt="" />
            </div>
          </div>
          {/* <div id="forecast-div">
            <span id="forecast-text">TODAYS FORECAST</span>
            <div id="forecast-list">
              <div className="forecast-list-items border-right">
                <span className="forecast-time">6:00 AM</span>
                <span className="weather-icon">
                  <img src={Cloudy2_icon} alt="" />
                </span>
                <span className="forecast-temp">25&deg;</span>
              </div>
              <div className="forecast-list-items border-right">
                <span className="forecast-time">9:00 AM</span>
                <span className="weather-icon">
                  <img src={Cloudy_icon} alt="" />
                </span>
                <span className="forecast-temp">28&deg;</span>
              </div>
              <div className="forecast-list-items border-right">
                <span className="forecast-time">12:00 PM</span>
                <span className="weather-icon">
                  <img src={Sun_icon} alt="" />
                </span>
                <span className="forecast-temp">33&deg;</span>
              </div>
              <div className="forecast-list-items border-right">
                <span className="forecast-time">3:00 PM</span>
                <span className="weather-icon">
                  <img src={Sun_icon} alt="" />
                </span>
                <span className="forecast-temp">34&deg;</span>
              </div>
              <div className="forecast-list-items border-right">
                <span className="forecast-time">6:00 PM</span>
                <span className="weather-icon">
                  <img src={Sun_icon} alt="" />
                </span>
                <span className="forecast-temp">29&deg;</span>
              </div>
              <div className="forecast-list-items">
                <span className="forecast-time">9:00 PM</span>
                <span className="weather-icon">
                  <img src={Cloudy_icon} alt="" />
                </span>
                <span className="forecast-temp">23&deg;</span>
              </div>
            </div>
          </div> */}
          <div id="airCondition-div" style={{ display: style.display }}>
            <span id="airCondition-text">AIR CONDITION</span>
            <div id="airCondition-list">
              <div className="airCondition-items">
                <div className="chanceOfRain-img-text">
                  <span>
                    <img src={Humidity_icon} alt="." />
                  </span>
                  <span className="chanceOfRain-text">Humidity</span>
                </div>
                <span className="chanceOfRain-per">{state.humidity}%</span>
              </div>
              <div className="airCondition-items">
                <div className="wind-img-text">
                  <span>
                    <img src={Wind_icon} alt="." />
                  </span>
                  <span className="wind-text">Wind</span>
                </div>
                <span className="wind-speed">{state.wind} km/h</span>
              </div>
            </div>
          </div>
        </section>
        {/* Sign Up Successfully PopUp Section*/}
        <aside id="popUp" style={{ display: popUp.display }}>
          <img src={CloudError_icon} alt="" />
          <h1>Check internet connection / Enter valid city</h1>
          <div className="popUpBtn-div">
            <button id="popUpBtn" onClick={onPopUp}>
              OK
            </button>
          </div>
        </aside>
      </section>
    </>
  );
};

export default WeatherApp;
