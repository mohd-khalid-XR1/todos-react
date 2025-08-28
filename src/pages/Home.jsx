import React, { useState, useRef } from 'react'
import Footer from '../components/Footer'
import { ImMenu } from "react-icons/im";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Home = (props) => {
    console.log(props);
    const { setTodos } = props
    const descriptionRef = useRef()
    const [isFieldDisable, setIsFieldDisable] = useState(true)
    const [isTodoUpdate, setIsTodoUpdate] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [color, setColor] = useState('black')

    const changeDisable = () => {
        setIsFieldDisable(false)
    }

    const createTodo = (e) => {
        e.preventDefault()
        // console.log(title);
        // console.log(description);
        console.log(color);
        const todoObject = {
            title: title,
            description: description,
            color,
        }
        setTodos((prev) => [todoObject, ...prev])
    }

    const onChangeColor = (e) => {
        console.log(e.target.value);
        const inputColor = e.target.value
        setColor(inputColor)
        const descriptionElement = descriptionRef.current
        if (descriptionElement) {
            descriptionElement.style.color = `${inputColor}`
            console.log(descriptionElement);
        }
    }
    return (
        <>
            <header>Notes</header>
            <main>
                <form onSubmit={createTodo}>
                    <section>
                        <input type="text" disabled={isFieldDisable} onChange={(e) => setTitle(e.target.value)} />
                        <select name="" id="">
                            <option value="">Wallpaper</option>
                            <option value="">Wallpaper</option>
                            <option value="">Wallpaper</option>
                            <option value="">Wallpaper</option>
                            <option value="">Wallpaper</option>
                        </select>
                        <Link to={'/manage'}><ImMenu className='' /></Link>
                    </section>
                    <section>
                        <div>
                            <textarea ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} disabled={isFieldDisable} name="" rows={30} cols={70} id=""></textarea>
                            <br />
                            {isTodoUpdate ? <button type='submit'><FaEdit /></button> : <button type='submit'><FaSave /></button>}


                        </div>
                        <div>
                            <hr />
                            <FaCirclePlus onClick={changeDisable} />
                            <input type="color" name="" id="" onChange={onChangeColor} />
                        </div>
                    </section>
                </form>
            </main>
            <hr />
            <Footer />
        </>
    )
}

export default Home