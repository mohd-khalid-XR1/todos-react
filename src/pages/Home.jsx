import React, { useState, useRef } from 'react'
import Footer from '../components/Footer'
import { ImMenu } from "react-icons/im";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Home.css'

const Home = (props) => {
    const { id } = useParams()
    // console.log(id);
    const isTodoUpdate = id ? true : false
    const {
        setTodos,
        todos,
        title,
        description,
        setDescription,
        setTitle,
        setColor,
        color
    }
        = props
        // console.log("title",title);
    const navigate = useNavigate()
    const descriptionRef = useRef()
    const [isFieldDisable, setIsFieldDisable] = useState(true)


    const changeDisable = () => {
        setIsFieldDisable(false)
    }

    const createTodo = (e) => {
        e.preventDefault()

        if (isTodoUpdate) {
            console.log("update")
            // console.log(title);
            // console.log(description);
            // console.log(color);
            const newTodo = {
                title,
                description,
                color,
            }

            setTodos((prev) => prev.map((prevTodo, index) => {
                if (id === index) return newTodo
                return prevTodo
            })
            )
            navigate("/manage")

        } else {
            console.log('create');
            const todoObject = {
                title: title,
                description: description,
                color,
            }
            setTodos((prev) => [todoObject, ...prev])
            let todoToSaveInLocalStorage = [todoObject, ...todos]
            todoToSaveInLocalStorage = JSON.stringify(todoToSaveInLocalStorage)
            localStorage.setItem("todos", todoToSaveInLocalStorage)


            setTitle("")
            setDescription("")
            navigate('/manage')
        }


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
                        <input type="text" value={title} disabled={isFieldDisable} onChange={(e) => setTitle(e.target.value)} />
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
                            <textarea value={description} ref={descriptionRef} onChange={(e) => setDescription(e.target.value)} disabled={isFieldDisable} name="" rows={30} cols={70} id=""></textarea>
                            <br />
                            {isTodoUpdate && <button type='button' className={`${isFieldDisable ? "" : "hidden"}`}><FaEdit onClick={changeDisable} /></button>}
                            <button type='submit' className={`${isFieldDisable ? "hidden" : ""}`}><FaSave /></button>
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