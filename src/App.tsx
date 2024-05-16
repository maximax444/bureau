
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { SetupPage } from './pages/auth/SetupPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { MainPage } from './pages/main/MainPage'
import { PagesPage } from './pages/main/PagesPage'
import { ArticlesPage } from './pages/main/ArticlesPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/pages" element={<PagesPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
    </Routes>
  )
}

export default App
