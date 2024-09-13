import React, { useEffect, useState } from "react";
import "../CSS/WeatherApp.css";
import axios from "axios";
import LoadingState from "./LoadingState";

const WeatherApp = () => {
  const [city, setCity] = useState("Pune");

  const [error, setError] = useState(false);

  const [displayOfLoadingState, setDisplayOfLoadingState] = useState("none");

  const [allForecastData, setAllForecastData] = useState(null);

  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  const [sysTime, setSysTime] = useState({
    sunriseTime: "00:00",
    sunsetTime: "00:00",
  });

  const [humidityStatus, setHumidityStatus] = useState({
    text: "Low",
    icon: "🌵",
  });

  // const [windSpeedStatus, setWindSpeedStatus] = useState({
  //   text: "Low",
  //   icon: "🍂",
  // });

  const [windDirection, setWindDirection] = useState("N");

  const [visibilityStatus, setVisibilityStatus] = useState({
    text: "Low",
    icon: "🌫️",
  });

  const [todayForecastData, setTodayForecastData] = useState([]);

  const [weeklyForecastData, setWeeklyForecastData] = useState([]);

  const [forecastDisplay, setForecastDisplay] = useState({
    todayForecast: true,
    weekForecast: false,
  });

  const screenSize = window.innerWidth;

  //=== Get currentDate
  const newDate = new Date();
  const currDay =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const currMonth =
    newDate.getMonth() < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const currYear = newDate.getFullYear();
  const currHour =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const currMin =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes();
  const currTime = `${currHour}:${currMin}`;
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currDate = `${currYear}-${currMonth}-${currDay}`;

  const axiosInstance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5`,
    timeout: 10000,
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Optionally set a loading state here if you want to manage loading globally
      setDisplayOfLoadingState("flex"); // Dispatch action to set loading to true
      return config;
    },
    (error) => {
      // Handle the request error
      console.log("Request Error");
      setDisplayOfLoadingState("none"); // Dispatch action to set loading to true
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle the response
      setDisplayOfLoadingState("none");
      return response;
    },
    (error) => {
      // Handle global errors
      setDisplayOfLoadingState("none");
      return Promise.reject(error);
    }
  );

  //=== On Enter key press
  const handleEnterKeyPress = async (event) => {
    try {
      if (event.key === "Enter") {
        // Get current weather data
        const getCurrentWeatherData = await axiosInstance.get(
          `/weather?q=${city}&units=metric&appid=03c0c3d86ab675d52fcbc604ab790abb`
        );
        setCurrentWeatherData(getCurrentWeatherData.data);

        // Get all forecast data
        const getAllForecastData = await axiosInstance.get(
          `/forecast?q=${city}&units=metric&appid=03c0c3d86ab675d52fcbc604ab790abb`
        );
        setAllForecastData(getAllForecastData.data.list);
      }
    } catch (error) {
      setError(true);
    }
  };

  //=== useEffect

  const defaultGetData = async () => {
    try {
      // Get current weather data
      const getCurrentWeatherData = await axiosInstance.get(
        `/weather?q=${city}&units=metric&appid=03c0c3d86ab675d52fcbc604ab790abb`
      );
      setCurrentWeatherData(getCurrentWeatherData.data);

      // Get all forecast data
      const getAllForecastData = await axiosInstance.get(
        `/forecast?q=${city}&units=metric&appid=03c0c3d86ab675d52fcbc604ab790abb`
      );
      setAllForecastData(getAllForecastData.data.list);
    } catch (error) {
      setError(true);
    }
  };

  const getSycTime = () => {
    const riseTime = currentWeatherData.sys.sunrise;
    const setTime = currentWeatherData.sys.sunset;

    const sunriseUTC = new Date(riseTime * 1000);
    const sunsetUTC = new Date(setTime * 1000);

    const sunriseTime = sunriseUTC.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const sunsetTime = sunsetUTC.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // console.log(
    //   "sunriseTime",
    //   `${sunriseTime.split(":")[0]}:${sunriseTime.split(":")[1]}`
    // );
    // console.log(
    //   "sunsetTime",
    //   `${sunsetTime.split(":")[0]}:${sunsetTime.split(":")[1]}`
    // );

    setSysTime({
      sunriseTime: `${sunriseTime.split(":")[0]}:${sunriseTime.split(":")[1]}`,
      sunsetTime: `${sunsetTime.split(":")[0]}:${sunsetTime.split(":")[1]}`,
    });
  };

  useEffect(() => {
    defaultGetData();
  }, []);

  useEffect(() => {
    if (currentWeatherData) {
      getSycTime();

      if (currentWeatherData.main.humidity < 30) {
        setHumidityStatus({
          text: "Low",
          icon: "🌵",
        });
      } else if (
        currentWeatherData.main.humidity > 30 &&
        currentWeatherData.main.humidity < 60
      ) {
        setHumidityStatus({
          text: "Normal",
          icon: "🌥️",
        });
      } else if (currentWeatherData.main.humidity > 60) {
        setHumidityStatus({
          text: "High",
          icon: "💧",
        });
      }

      const degree = currentWeatherData.wind.deg;

      if (degree >= 0 && degree < 11.25) {
        setWindDirection("N");
      } else if (degree >= 11.25 && degree < 33.75) {
        setWindDirection("NNE");
      } else if (degree >= 33.75 && degree < 56.25) {
        setWindDirection("NE");
      } else if (degree >= 56.25 && degree < 78.25) {
        setWindDirection("ENE");
      } else if (degree >= 78.25 && degree < 101.25) {
        setWindDirection("E");
      } else if (degree >= 101.25 && degree < 123.75) {
        setWindDirection("ESE");
      } else if (degree >= 123.75 && degree < 146.25) {
        setWindDirection("SE");
      } else if (degree >= 146.25 && degree < 168.75) {
        setWindDirection("SSE");
      } else if (degree >= 168.75 && degree < 191.25) {
        setWindDirection("S");
      } else if (degree >= 191.25 && degree < 213.75) {
        setWindDirection("SSW");
      } else if (degree >= 213.75 && degree < 236.25) {
        setWindDirection("SW");
      } else if (degree >= 236.25 && degree < 258.75) {
        setWindDirection("WSW");
      } else if (degree >= 258.75 && degree < 281.25) {
        setWindDirection("W");
      } else if (degree >= 281.25 && degree < 303.75) {
        setWindDirection("WNW");
      } else if (degree >= 303.75 && degree < 326.25) {
        setWindDirection("NW");
      } else if (degree >= 326.25 && degree < 348.75) {
        setWindDirection("NNW");
      } else if (degree >= 348.75 && degree <= 360) {
        setWindDirection("N");
        return "N";
      }

      if ((currentWeatherData.visibility / 1000).toFixed(1) < 1) {
        setVisibilityStatus({
          text: "Low",
          icon: "🌫️",
        });
      } else if (
        (currentWeatherData.visibility / 1000).toFixed(1) > 1 &&
        (currentWeatherData.visibility / 1000).toFixed(1) < 10
      ) {
        setVisibilityStatus({
          text: "Normal",
          icon: "👀",
        });
      } else if ((currentWeatherData.visibility / 1000).toFixed(1) > 10) {
        setVisibilityStatus({
          text: "High",
          icon: "🌞",
        });
      }
    }
  }, [currentWeatherData]);

  useEffect(() => {
    if (allForecastData) {
      const todayData = allForecastData.filter((value) => {
        const date = value.dt_txt.split(" ");
        if (date[0] === currDate) {
          // console.log("Today forecast data: ", value);
          return value;
        } else {
          return null;
        }
      });

      const weeklyData = allForecastData.filter((value) => {
        const time = value.dt_txt.split(" ");
        if (time[1] === "12:00:00") {
          // console.log("Weekly forecast data: ", value);
          return value;
        } else {
          return null;
        }
      });

      setTodayForecastData(todayData);
      setWeeklyForecastData(weeklyData);
    }
  }, [allForecastData]);

  useEffect(() => {
    const projectBoxes = document.querySelectorAll(".animationBox");

    if (currentWeatherData) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      projectBoxes.forEach((box) => {
        observer.observe(box);
      });

      return () => {
        projectBoxes.forEach((box) => {
          observer.unobserve(box);
        });
      };
    }
  }, [currentWeatherData, forecastDisplay]);

  useEffect(() => {
    const iconBox = document.querySelectorAll(".weatherIconAnimationBox");

    if (currentWeatherData) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animateIcon");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      iconBox.forEach((box) => {
        observer.observe(box);
      });

      return () => {
        iconBox.forEach((box) => {
          observer.unobserve(box);
        });
      };
    }
  }, [currentWeatherData]);

  return (
    <>
      <section id="weatherApp">
        <section id="weatherApp-box">
          <div className="weatherAppLeftBox">
            {/* Search Box */}
            <div className="search-div">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                id="search-input"
                name="city"
                value={city}
                onChange={(event) => setCity(event.target.value.trim())}
                onKeyDown={handleEnterKeyPress}
                placeholder="Search for places..."
                autoComplete="off"
              />
            </div>
            <div className="weatherImageDiv">
              {currentWeatherData ? (
                <img
                  className="weatherIconAnimationBox"
                  src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
                  alt="Weather_Icon"
                />
              ) : null}
            </div>
            <div className="temperatureDiv">
              <span>
                {currentWeatherData
                  ? parseInt(currentWeatherData.main.temp)
                  : "0"}
                &deg;C
              </span>
            </div>
            <div className="currentDateDiv">
              <span>
                {allDays[newDate.getDay()]},{" "}
                <span style={{ color: "#b8b8b8" }}>{currTime}</span>
              </span>
            </div>
          </div>
          <div className="weatherAppRightBox">
            <div className="forecastNav">
              <span
                style={
                  forecastDisplay.todayForecast === true
                    ? { color: "black", borderBottom: "2px solid black" }
                    : { color: "#c5c5c5", borderBottom: "none" }
                }
                onClick={() =>
                  setForecastDisplay({
                    todayForecast: true,
                    weekForecast: false,
                  })
                }
              >
                Today
              </span>
              <span
                style={
                  forecastDisplay.weekForecast === true
                    ? { color: "black", borderBottom: "2px solid black" }
                    : { color: "#c5c5c5", borderBottom: "none" }
                }
                onClick={() =>
                  setForecastDisplay({
                    todayForecast: false,
                    weekForecast: true,
                  })
                }
              >
                Week
              </span>
              {screenSize > 600 ? (
                <span className="clearSkyLogo">
                  <i
                    className="fa-regular fa-snowflake"
                    style={{ fontSize: "1.6rem", marginRight: "0.5rem" }}
                  ></i>
                  Clear sky
                </span>
              ) : null}
            </div>

            {forecastDisplay.todayForecast === true ? (
              <div className="forecastDiv animationBox">
                {todayForecastData.map((value, index) => (
                  <div className="forecastDiv-items" key={index}>
                    <span className="forecastDay">
                      {`${value.dt_txt.split(" ")[1].split(":")[0]}:${
                        value.dt_txt.split(" ")[1].split(":")[1]
                      }`}
                    </span>
                    <img
                      src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                      alt="Weather_Icon"
                    />
                    <span className="forecastTemperature">
                      {parseInt(value.main.temp_max)}
                      &deg;{" "}
                      <span
                        className="forecastTemperature"
                        style={{ color: "rgb(133 133 133)" }}
                      >
                        {parseInt(value.main.temp_min)}
                        &deg;
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {forecastDisplay.weekForecast === true ? (
              <div className="forecastDiv animationBox">
                {weeklyForecastData
                  ? weeklyForecastData.map((value, index) => {
                      const getDay = new Date(
                        value.dt_txt.split(" ")[0]
                      ).getDay();
                      console.log(getDay);
                      return (
                        <div className="forecastDiv-items" key={index}>
                          <span className="forecastDay">{allDays[getDay]}</span>
                          <img
                            src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                            alt="Weather_Icon"
                          />
                          <span className="forecastTemperature">
                            {parseInt(value.main.temp_max)}
                            &deg;{" "}
                            <span
                              className="forecastTemperature"
                              style={{ color: "rgb(133 133 133)" }}
                            >
                              {parseInt(value.main.temp_min)}
                              &deg;
                            </span>
                          </span>
                        </div>
                      );
                    })
                  : null}
              </div>
            ) : null}

            <div className="highlightsNav">
              <span>Today's Highlights</span>
            </div>

            <div
              className={
                screenSize > 600
                  ? "highlightsDiv"
                  : "highlightsDiv animationBox"
              }
            >
              {/* Humidity */}
              <div
                className={
                  screenSize < 600
                    ? "highlightsDiv-Items"
                    : "highlightsDiv-Items animationBox"
                }
              >
                <span className="top">Humidity</span>
                <span className="middle">
                  {currentWeatherData ? currentWeatherData.main.humidity : "0"}
                  <span
                    style={{
                      position: "absolute",
                      fontSize: "1.5rem",
                      paddingLeft: "0.2rem",
                      top: "0.3rem",
                    }}
                  >
                    %
                  </span>
                </span>
                <span className="bottom">
                  {humidityStatus.text}{" "}
                  <span className="levelIcon">{humidityStatus.icon}</span>
                </span>
              </div>

              {/* Wind */}
              <div
                className={
                  screenSize < 600
                    ? "highlightsDiv-Items"
                    : "highlightsDiv-Items animationBox"
                }
              >
                <span className="top">Wind</span>
                {/* Conversion Formula: 1 m/s = 3.6 km/h */}
                <span className="middle">
                  {currentWeatherData
                    ? (currentWeatherData.wind.speed * 3.6).toFixed(2)
                    : "0"}
                  <span style={{ fontSize: "1.5rem", paddingLeft: "0.5rem" }}>
                    km/h
                  </span>
                </span>

                {/* <span className="bottom">
                  {windSpeedStatus.text}{" "}
                  <span className="levelIcon">{windSpeedStatus.icon}</span>
                </span> */}

                <div className="bottom">
                  <i
                    className="fa-solid fa-angles-up"
                    style={
                      currentWeatherData
                        ? {
                            transform: `rotate(${currentWeatherData.wind.deg}deg)`,
                          }
                        : {
                            transform: "rotate(0deg)",
                          }
                    }
                  ></i>
                  <span style={{ marginLeft: "1rem" }}>{windDirection}</span>
                </div>
              </div>

              {/* Visibility */}
              <div
                className={
                  screenSize < 600
                    ? "highlightsDiv-Items"
                    : "highlightsDiv-Items animationBox"
                }
              >
                <span className="top">Visibility</span>
                {/* Conversion Formula: 10000 m = 10 km */}
                <span className="middle">
                  {currentWeatherData
                    ? (currentWeatherData.visibility / 1000).toFixed(1)
                    : "0"}
                  <span style={{ fontSize: "1.5rem", paddingLeft: "0.5rem" }}>
                    km
                  </span>
                </span>
                <span className="bottom">
                  {visibilityStatus.text}{" "}
                  <span className="levelIcon">{visibilityStatus.icon}</span>
                </span>
              </div>

              <div
                className={
                  screenSize < 600
                    ? "highlightsDiv-Items"
                    : "highlightsDiv-Items animationBox"
                }
              >
                <span className="top">Sunrise & Sunset</span>
                <div className="sunrise_sunsetDiv">
                  <i className="fa-solid fa-circle-chevron-up"></i>
                  <span>{sysTime.sunriseTime} am</span>
                </div>
                <div className="sunrise_sunsetDiv">
                  <i className="fa-solid fa-circle-chevron-down"></i>
                  <span>{sysTime.sunsetTime} pm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {displayOfLoadingState === "flex" ? (
          <LoadingState displayOfLoadingState={displayOfLoadingState} />
        ) : null}

        {/* Popup Section */}
        {error === true ? (
          <aside id="popUp">
            {/* <img src={CloudError_icon} alt="" /> */}
            <h1>Check internet connection</h1>
            <div className="popUpBtn-div">
              <button id="popUpBtn" onClick={() => setError(false)}>
                OK
              </button>
            </div>
          </aside>
        ) : null}
      </section>
    </>
  );
};

export default WeatherApp;
