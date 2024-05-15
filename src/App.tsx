
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { SetupPage } from './pages/auth/SetupPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { MainPage } from './pages/main/MainPage'
import { PagesPage } from './pages/main/PagesPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/pages" element={<PagesPage />} />
    </Routes>
  )
}

export default App
