import React from 'react'
import { Link } from 'react-router-dom'
import { ImMenu } from "react-icons/im";
const Manage = () => {
  return (
    <>
       <Link to={'/'}><ImMenu className='' /></Link>
    </>
  )
}

export default Manage