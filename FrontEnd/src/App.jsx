import React, { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Profile from './Pages/ProfilePage/Profile'

import './App.css'

function App() {
    const [content, setContent] = useState("Content")
    return (
        <main>
            <Sidebar setContent={setContent} />
            <div className='Container__div--content'>
                <h1>{content}</h1>
                <Profile userType={"Student"}/>
            </div>
        </main>
    )
}

export default App
