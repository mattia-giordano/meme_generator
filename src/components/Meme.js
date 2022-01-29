
import { useEffect, useState } from "react"
import "../styles/Meme.css"

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "",
        imageTitle: "press the button"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url;
        const title = allMemes[randomNumber].title;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            imageTitle: title
        }))
    }

    function handleChange(e) {
        const {name, value} = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼️</button>
            </div>  
            <div className="meme">
                {meme.randomImage!="" && <img src={meme.randomImage} alt={meme.imageTitle} className="meme--image" />}
                {meme.randomImage===""
                    && allMemes[0]
                    && <img src={allMemes[0].url} alt={allMemes[0].title} className="meme--image" />}
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}