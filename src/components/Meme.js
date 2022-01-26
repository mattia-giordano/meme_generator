
export default function Meme() {
    return (
        <main>
            <form className="form">
                <input type="text" placeholder="top text" className="form--input"/>
                <input type="text" placeholder="bottom text" className="form--input"/>
                <button className="form--button">Get a new meme image 🖼</button>
            </form>
        </main>
    )
}