import React from 'react'

function input(props) {
  return (
    <>
        <input type={props.type} maxLength={props.maxl} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur}  className="  border-0.5 border-gray-300 focus:outline-none focus:ring-2 text-sm  px-2.5 py-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block " required={props.r}/>
    </>
  )
}

export default input