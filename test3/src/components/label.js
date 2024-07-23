import React from 'react'

function label(props) {
  return (
    <>
    <label className={props.w}>{props.val}</label>
    </>
  )
}

export default label