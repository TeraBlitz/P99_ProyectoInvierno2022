import React from 'react'
import './Sidebar.css'
import SidebarButton from '../Sidebar_button/SidebarButton'

function Sidebar(props) {
    return (
        <div className='Sidebar'>
            <h3 className='Sidebar__h3--title'>Sidebar</h3>
            <SidebarButton title="hello" setContent={props.setContent} />
            <SidebarButton title="world" setContent={props.setContent} />

        </div>
    )
}

export default Sidebar
