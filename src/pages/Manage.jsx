import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArchive } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

const Manage = (props) => {
  const starRef = useRef(null)

  const [iconsVisible, setIconsVisible] = useState(true)
  const { todos, setTodos } = props
  const deleteTodo = (index) => {
    console.log(index);
    setTodos((prev) => {
      const newTodo = prev.filter((todo, i) => i !== index) // 0 !== 2 ---> true
      // const newTodoArrayInLocalStorage = JSON.stringify(newTodo)
      // localStorage.setItem("todos",newTodoArrayInLocalStorage)
      return newTodo
    })

    const newTodo = todos.filter((todo, i) => i !== index)
    const newTodoArrayInLocalStorage = JSON.stringify(newTodo)
    localStorage.setItem("todos", newTodoArrayInLocalStorage)
    // setTodos((prev)=> prev.splice(index,1)) ❎
  }

  const changeVisibility = () => {
    setIconsVisible((prev) => !prev)
    if(starRef.current){
      starRef.current.style.transform = "rotate(90deg)"
    }
  }
  return (
    <>
      <header>
        <h2>Your Notes :</h2>
        <div>
          {/* {iconsVisible ?
            <>
              <IoArchive />
              <FaStar />
              <BsGrid3X3GapFill /></>
            : null} */}
          {iconsVisible && <>
            <IoArchive />
            <FaStar ref={starRef} />
            <BsGrid3X3GapFill />
          </>}


          <div onClick={changeVisibility}>
            <IoIosArrowBack />
            <RiDashboardFill />
          </div>
          <Link to={'/'}><ImMenu className='' /></Link>
        </div>
      </header >
      <main>
        <hr />
        {todos.map((todo, index) => {
          return <div key={todo.title + index}>
            <p>{todo.title}</p>
            <div style={{ border: '2px solid red' }}>
              <IoArchive />
              <FaStar />
              <FaTrashAlt onClick={() => deleteTodo(index)} />
            </div>
          </div>
        })}
      </main>
    </>
  )
}

export default Manage