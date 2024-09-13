import React from "react";

const LoadingState = ({ displayOfLoadingState }) => {
  return (
    <div className="modal-overlay" style={{ display: displayOfLoadingState }}>
      <div className="modal" style={{ backgroundColor: "transparent" }}>
        <div className="modal-header" style={{ marginBottom: "0rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="200"
            height="200"
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "rgb(255, 255, 255 /0%)",
            }}
          >
            <g>
              <g transform="translate(80,50)">
                <g transform="rotate(0)">
                  <circle fillOpacity="1" fill="#000000" r="6" cy="0" cx="0">
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.875s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.875s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,71.21320343559643)">
                <g transform="rotate(45)">
                  <circle
                    fillOpacity="0.875"
                    fill="#000000"
                    r="6"
                    cy="0"
                    cx="0"
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.75s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.75s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(50,80)">
                <g transform="rotate(90)">
                  <circle fillOpacity="0.75" fill="#000000" r="6" cy="0" cx="0">
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.625s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.625s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(28.786796564403577,71.21320343559643)">
                <g transform="rotate(135)">
                  <circle
                    fillOpacity="0.625"
                    fill="#000000"
                    r="6"
                    cy="0"
                    cx="0"
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.5s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.5s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(20,50.00000000000001)">
                <g transform="rotate(180)">
                  <circle fillOpacity="0.5" fill="#000000" r="6" cy="0" cx="0">
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.375s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.375s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(28.78679656440357,28.786796564403577)">
                <g transform="rotate(225)">
                  <circle
                    fillOpacity="0.375"
                    fill="#000000"
                    r="6"
                    cy="0"
                    cx="0"
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.25s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.25s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(49.99999999999999,20)">
                <g transform="rotate(270)">
                  <circle fillOpacity="0.25" fill="#000000" r="6" cy="0" cx="0">
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="-0.125s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="-0.125s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,28.78679656440357)">
                <g transform="rotate(315)">
                  <circle
                    fillOpacity="0.125"
                    fill="#000000"
                    r="6"
                    cy="0"
                    cx="0"
                  >
                    <animateTransform
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.5 1.5;1 1"
                      begin="0s"
                      type="scale"
                      attributeName="transform"
                    />
                    <animate
                      begin="0s"
                      values="1;0"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      attributeName="fill-opacity"
                    />
                  </circle>
                </g>
              </g>
              <g />
            </g>
          </svg>
        </div>
        <div className="modal-body">
          <span
            style={{
              color: "white",
              fontSize: "1.3rem",
              letterSpacing: "0.05rem",
              fontWeight: 600,
            }}
          >
            Loading . . .
          </span>
          {/* <i
            className="fa-solid fa-spinner fa-spin-pulse"
            style={{ fontSize: "1.5rem", color: "white" }}
          ></i> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
