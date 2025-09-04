import React, { useEffect } from 'react'

const AuthProvider = (props) => {
    // console.log(props);
    const { children } = props
    console.log(children);
    useEffect(() => {
        console.log("checking user is login or not");
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider