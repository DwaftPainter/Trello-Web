import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Board from './pages/Boards/_id'
import SignIn from './pages/Auth/SignIn/SignIn'
import SignUp from './pages/Auth/SignUp/SignUp'
import Home from './pages/Home/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/boards/:boardId" element={<Board />} />
        {/* Optionally redirect all unmatched routes to the home page or a 404 page */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  )
}

export default App
