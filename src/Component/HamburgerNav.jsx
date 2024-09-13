import React, { useEffect, useState } from "react";
import "../CSS/HamburgerNav.css";

const HamburgerNav = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className={`hamburger ${isBlurred ? "blur" : "noBlur"}`}>
        <section className="hamburgerNav-section">
          <span className="clearSkyLogo">
            <i
              className="fa-regular fa-snowflake"
              style={{ fontSize: "1.6rem", marginRight: "0.5rem" }}
            ></i>
            Clear sky
          </span>
        </section>
      </section>
    </>
  );
};

export default HamburgerNav;
