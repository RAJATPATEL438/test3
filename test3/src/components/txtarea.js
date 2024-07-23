import React from 'react'

function txtarea(props) {
  return (
    <>
    <textarea rows="3" cols="15" id={props.id} value={props.value} onChange={props.onChange} className="border-0.5 border-gray-300 focus:outline-none focus:ring-2 text-sm  px-2.5 py-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block "  />
    </>
  )
}

export default txtarea