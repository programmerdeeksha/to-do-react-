import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Tasks from './Tasks'
function Header({title,onclick}) {

    const onClick = ()=>{
        console.log("click");
    }
    return (
        <header className="header">
            <h1 >
                {title}
            </h1>
           
            <Button color="green" text="Add"
             onclick={onclick}/>
            
        </header>
    )
}
Header.defaultProps ={
    title:"hello",
}
Header.defaultProps={
  title: PropTypes.string,
}
export default Header
