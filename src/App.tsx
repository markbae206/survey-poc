import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './main.scss'
import NccnSurvey from './nccn/NccnSurvey'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" data-theme="custom">
      <NccnSurvey />
    </div>
  )
}

export default App
