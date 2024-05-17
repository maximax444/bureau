
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { SetupPage } from './pages/auth/SetupPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { MainPage } from './pages/main/MainPage'
import { PagesPage } from './pages/main/PagesPage'
import { ArticlesPage } from './pages/main/ArticlesPage'
import { CategoriesPage } from './pages/main/CategoriesPage'
import { AddArticlePage } from './pages/main/AddArticlePage'
import { SingleArticlePage } from './pages/main/SingleArticlePage'
import { UpdateArticlePage } from './pages/main/UpdateArticlePage'
import { HelpPage } from './pages/main/HelpPage'
import { SettingsPage } from './pages/main/SettingsPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/pages" element={<PagesPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/articles/new" element={<AddArticlePage />} />
      <Route path="/articles/:articleId" element={<SingleArticlePage />} />
      <Route path="/articles/:articleId/edit" element={<UpdateArticlePage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
