import React, { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/box'

function App() {
    const [content, setContent] = useState("Content")
    const [sidebar, setSidebar] = useState(false)


    return (
        <main>
            <Sidebar setContent={setContent} sidebar={sidebar} />
            <div className='Container__div--content'>
                <Box onClick={() => setSidebar(!sidebar)} sx={{

                    bgcolor: 'primary.light',
                    width: '25px',
                    height: '25px',
                    padding: '2px',
                    borderRadius: 2

                }}>
                    <MenuIcon />
                </Box>

                <h1>{content}</h1>
            </div>
        </main >
    )
}

export default App
