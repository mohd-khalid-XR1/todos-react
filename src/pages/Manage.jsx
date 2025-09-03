import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArchive } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Manage = (props) => {
  const navigate = useNavigate()
  const { setTitle, setDescription, setColor, todos, setTodos, wallpaper } = props
  const arrowRef = useRef(null)

  const [iconsVisible, setIconsVisible] = useState(true)
  const [typeTodo, setTypeTodo] = useState('all')

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
    let flag = !iconsVisible
    setIconsVisible((prev) => !prev)
    if (arrowRef.current) {
      if (flag) {
        arrowRef.current.style.transform = "rotate(0deg)"
      } else {
        arrowRef.current.style.transform = "rotate(180deg)"
      }
    }
  }
  const viewTodo = (todo, index) => {
    // console.log(todo);
    // console.log("prevtodo",todo);
    setTitle(todo.title)
    setDescription(todo.description)
    setColor(todo.color)
    navigate(`/update/${index}`)
  }

  const manageFavourite = (index) => {
    setTodos((prev) => {
      const x = prev.map((todo, i) => {
        if (index === i) return { ...todo, isFavourite: !todo.isFavourite }
        return todo
      })
      localStorage.setItem('todos', JSON.stringify(x))
      return x
    })
  }

  const manageArchieve = (index) => {
    setTodos((prev) => {
      const x = prev.map((todo, i) => {
        if (index === i) return { ...todo, isArchive: !todo.isArchive }
        return todo
      })
      localStorage.setItem('todos', JSON.stringify(x))
      return x
    })
  }

  return (
    <div className={`${wallpaper}`}>
      <header className='flex justify-between py-5 px-6 border'>
        <h2>Your Notes :</h2>
        <div className='flex gap-5'>
          {/* {iconsVisible ?
            <>
              <IoArchive />
              <FaStar />
              <BsGrid3X3GapFill /></>
            : null} */}
          {iconsVisible && <>
            <IoArchive onClick={() => setTypeTodo("archive")} className='text-xl' />
            <FaStar onClick={() => setTypeTodo("favourite")} className='text-xl' />
            <BsGrid3X3GapFill onClick={() => setTypeTodo("all")} className='text-xl' />
          </>}


          <div onClick={changeVisibility} className='flex gap-2 border rounded-md items-center'>
            <IoIosArrowBack ref={arrowRef} className='text-xl' />
            <RiDashboardFill className='text-xl' />
          </div>
          <Link to={'/'}><ImMenu className='text-xl' /></Link>
        </div>
      </header >
      <div className='h-1 w-full bg-black mt-3 mx-5'></div>
      <main>
        {todos.map((todo, index) => {
          const { isFavourite, isArchive } = todo

          if (typeTodo === 'favourite' && isFavourite === false) {
            return null
          } else if (typeTodo === 'all' && isArchive === true) {
            return null
          } else if (typeTodo === 'archive' && isArchive === false) {
            return
          }

          return <div key={todo.title + index}>
            <p onClick={() => viewTodo(todo, index)}>{todo.title}</p>
            <div style={{ border: '2px solid red' }}>
              <IoArchive
                className={`${isArchive ? 'yellow' : ''}`}
                onClick={() => manageArchieve(index)} />
              <FaStar
                className={`${isFavourite ? 'yellow' : ''}`}
                onClick={() => manageFavourite(index)}
              />
              <FaTrashAlt onClick={() => deleteTodo(index)} />
            </div>
          </div>
        })}
      </main>
    </div>
  )
}

export default Manage