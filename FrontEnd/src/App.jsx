import React, { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css'

function App() {
    const [content, setContent] = useState("Content")
    return (
        <main>
            <Sidebar setContent={setContent} />
            <div className='Container__div--content'>
                <h1>{content}</h1>
            </div>
        </main>
    )
}

export default App
