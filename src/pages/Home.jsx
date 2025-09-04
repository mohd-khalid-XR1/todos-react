import React, { useState, useRef, useEffect } from 'react'
import Footer from '../components/Footer'
import { ImMenu } from "react-icons/im";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Home.css'
import Wallpaper from '../components/Wallpaper';
import AuthProvider from '../components/AuthProvider';

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
        color,
        wallpaper,
        setWallpaper,
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
            let newTodo = {
                title,
                description,
                color,
            }

            setTodos((prev) => {
                const x = prev.map((prevTodo, index) => {
                    if (id == index) return newTodo
                    return prevTodo
                })
                localStorage.setItem("todos", JSON.stringify(x))
                return x
            })
            // newTodo = todos.map((prevTodo, index) => {
            //     if (id == index) return newTodo
            //     return prevTodo
            // })
            // console.log(newTodo);
            // setTodos(newTodo)
            navigate("/manage")

        } else {
            // console.log('create');
            const todoObject = {
                title: title,
                description: description,
                color,
                isFavourite: false,
                isArchive: false,
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
            // console.log(descriptionElement);
        }
    }

    useEffect(() => {
        // console.log('checking login');
        const descriptionElement = descriptionRef.current
        if (descriptionElement) {
            descriptionElement.style.color = `${color}`
            // console.log(descriptionElement);
        }
    }, [])

    return (
        <div className={`${wallpaper}`}>
            <header className='text-black text-3xl font-extrabold underline text-center mb-4'>Notes</header>
            <main>
                <form onSubmit={createTodo}>
                    <section>
                        <input
                        className='border-3 border-[#f54949] border-double rounded-[10px] text-gray-600'
                            type="text"
                            value={title}
                            disabled={isFieldDisable}
                            onChange={(e) => setTitle(e.target.value)}
                            name='title'
                        />
                        <Wallpaper setWallpaper={setWallpaper} />
                        <Link to={'/manage'} className=''><ImMenu className='inline' /></Link>
                    </section>
                    <section>
                        <div>
                            <textarea
                                className='border italic h-[400px] w-60 m-4 px-2 py-3'
                                value={description}
                                ref={descriptionRef}
                                onChange={(e) => setDescription(e.target.value)} disabled={isFieldDisable}
                                name="description"
                                rows={30}
                                cols={70}
                                id=""></textarea>
                            <br />
                            {isTodoUpdate && <button
                                type='button'
                                onClick={changeDisable}
                                className={`${isFieldDisable ? "" : "hidden"}`}>
                                <FaEdit />
                            </button>}
                            <button type='submit' className={`${isFieldDisable ? "hidden" : ""}`}><FaSave /></button>
                        </div>
                        <div>
                            <hr />
                            <FaCirclePlus onClick={changeDisable} />
                            {!isFieldDisable && <input type="color" name="" id="" onChange={onChangeColor} />}
                        </div>
                    </section>
                </form>
            </main>
            <hr />
            <Footer />
        </div>
    )
}

export default Home