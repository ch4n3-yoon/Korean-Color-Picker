import React, { useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

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
        </div>
    )
}

export default App