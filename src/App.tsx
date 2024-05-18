
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/auth/LoginPage'
import { SetupPage } from './pages/auth/SetupPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { MainPage } from './pages/main/MainPage'
import { PagesPage } from './pages/main/PagesPage'
import { SinglePagePage } from './pages/main/SinglePagePage'
import { ArticlesPage } from './pages/main/ArticlesPage'
import { CategoriesPage } from './pages/main/CategoriesPage'
import { AddArticlePage } from './pages/main/AddArticlePage'
import { SingleArticlePage } from './pages/main/SingleArticlePage'
import { UpdateArticlePage } from './pages/main/UpdateArticlePage'
import { HelpPage } from './pages/main/HelpPage'
import { SettingsPage } from './pages/main/SettingsPage'
import { AddSettingsPage } from './pages/main/AddSettingsPage'
import { FieldsPage } from './pages/main/FieldsPage'
import { AddFieldsPage } from './pages/main/AddFieldsPage'
import { SingleFieldsPage } from './pages/main/SingleFieldsPage'
import { BlocksPage } from './pages/main/BlocksPage'
import { AddBlocksPage } from './pages/main/AddBlocksPage'
import { SingleBlocksPage } from './pages/main/SingleBlocksPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/pages" element={<PagesPage />} />
      <Route path="/pages/:pageId" element={<SinglePagePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/articles/new" element={<AddArticlePage />} />
      <Route path="/articles/:articleId" element={<SingleArticlePage />} />
      <Route path="/articles/:articleId/edit" element={<UpdateArticlePage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/new" element={<AddSettingsPage />} />
      <Route path="/fields" element={<FieldsPage />} />
      <Route path="/fields/new" element={<AddFieldsPage />} />
      <Route path="/fields/:fieldId" element={<SingleFieldsPage />} />
      <Route path="/blocks" element={<BlocksPage />} />
      <Route path="/blocks/new" element={<AddBlocksPage />} />
      <Route path="/blocks/:blockId" element={<SingleBlocksPage />} />
    </Routes>
  )
}

export default App
