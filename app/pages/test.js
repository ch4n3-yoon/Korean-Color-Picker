import React, { useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
const koreanColors = require('../../assets/colors.json')

const getRGB = (hex) => {
    if (hex.length !== 7) return
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
    }
}


const getDistance = (sourceHex, targetHex) => {
    const sourceRGB = getRGB(sourceHex)
    const targetRGB = getRGB(targetHex)
    return Math.sqrt(
        Math.abs(sourceRGB.r - targetRGB.r) ** 2
        + Math.abs(sourceRGB.g - targetRGB.g) ** 2 
        + Math.abs(sourceRGB.b - targetRGB.b) ** 2
    )
}


const getSimilarColorName = (targetHex) => {
    let minDistance = (255 * 2) * 3
    let result = {}
    koreanColors.forEach(color => {
        const distance = getDistance(targetHex, color.hexval)
        if (distance < minDistance) {
            minDistance = distance
            result = color
        }
    })
    return result.name
}


const App = () => {
    const [colors, setColors] = useState([])
    const getColors = (colors) => {
        setColors(colors)
    }

    return (
        <div>
            <ColorExtractor getColors={getColors}>
                <img
                    src="https://i.imgur.com/OCyjHNF.jpg"
                    style={{ width: 700, height: 500 }}
                />
            </ColorExtractor>
            <div
                style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
            </div>
            <p>
                {JSON.stringify(colors)}
            </p>
            <p>
                {JSON.stringify(colors.map(color => getSimilarColorName(color)))}
            </p>
        </div>
    )
}

export default App