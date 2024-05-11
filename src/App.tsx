
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/s" element={<LoginPage />} />
    </Routes>
  )
}

export default App
