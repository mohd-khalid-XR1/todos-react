import React from 'react'

const Wallpaper = (props) => {
    const { setWallpaper } = props
    const changeWallpaper = (e) => {
        console.log(e.target.value);
        setWallpaper(e.target.value)
    }
    return (
        <select name="" id="" onChange={changeWallpaper}>
            <option value="wallpaper1">Wallpaper1</option>
            <option value="wallpaper2">Wallpaper2</option>
            <option value="wallpaper3">Wallpaper3</option>
            <option value="wallpaper4">Wallpaper4</option>
        </select>
    )
}

export default Wallpaper