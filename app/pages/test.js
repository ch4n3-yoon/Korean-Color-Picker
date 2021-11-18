import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { Box } from "@chakra-ui/react";
const koreanColors = require("../../assets/colors.json");

const getRGB = (hex) => {
  if (hex.length !== 7) return;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
};

const getDistance = (sourceHex, targetHex) => {
  const sourceRGB = getRGB(sourceHex);
  const targetRGB = getRGB(targetHex);
  return Math.sqrt(
    Math.abs(sourceRGB.r - targetRGB.r) ** 2 +
      Math.abs(sourceRGB.g - targetRGB.g) ** 2 +
      Math.abs(sourceRGB.b - targetRGB.b) ** 2
  );
};

const getSimilarColorInfo = (targetHex) => {
  let minDistance = 255 * 2 * 3;
  let result = {};
  koreanColors.forEach((color) => {
    const distance = getDistance(targetHex, color.hexval);
    if (distance < minDistance) {
      minDistance = distance;
      result = color;
    }
  });
  return result;
};

const ColorBox = ({ color, name }) => {
  // return <Box bg={color} width="30px" height="30px" borderRadius="lg" p={4} />;
  // console.log("[ColorBox] color :", color);
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        lineHeight: "100px",
        background: color,
        textAlign: "center",
        verticalAlign: "middle",
      }}
    >
      {name}
    </div>
  );
};

const App = () => {
  const [colors, setColors] = useState([]);
  const [koreanColorInfos, setKoreanColorInfos] = useState([]);

  const getColors = (colors) => {
    setColors(colors);

    setKoreanColorInfos(
      colors.map((color) => {
        return getSimilarColorInfo(color);
      })
    );
  };

  return (
    <div>
      <ColorExtractor getColors={getColors}>
        <img
          src="https://i.imgur.com/OCyjHNF.jpg"
          // src="https://i.imgur.com/rqOlTmm.jpeg"
          style={{ width: 700, height: 500 }}
        />
      </ColorExtractor>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
      {/* <p>{JSON.stringify(colors)}</p> */}
      {/* <p>{JSON.stringify(koreanColorInfos)}</p> */}

      <p>
        <b>사진 대표색</b>
        <div
          style={{
            display: "flex",
          }}
        >
          {colors.map((color, key) => {
            return <ColorBox key={key} name={color} color={color} />;
          })}
        </div>
      </p>
      <br />
      <p>
        <b>한글 이름</b>
        <div
          style={{
            display: "flex",
          }}
        >
          {koreanColorInfos.map((color, key) => {
            return (
              <ColorBox key={key} name={color.name} color={color.hexval} />
            );
          })}
        </div>
      </p>
    </div>
  );
};

export default App;
