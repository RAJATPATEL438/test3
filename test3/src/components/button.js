import React from 'react'

function button(props) {
  return (
    <>
        <button type={props.type} id={props.id} onClick={props.onclick} className=" bg-blue-500 hover:bg-blue-400 font-medium rounded-md text-white text-sm md:w-16 w-14 px-2 py-2 text-center">{props.val}</button>
    </>
  )
}

export default button