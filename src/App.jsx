// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Transaction'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/insights' element={<Insights />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
