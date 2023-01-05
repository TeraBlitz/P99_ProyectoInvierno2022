import React from 'react'
import './SidebarButton.css'

function SidebarButton(props) {
    return (
        <div className='SidebarButton' onClick={() => props.setContent(props.title)}>{props.title}</div>
    )
}

export default SidebarButton
