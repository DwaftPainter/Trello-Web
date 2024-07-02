import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Board from './pages/Boards/_id'

function Home() {
  return <div>Welcome to the Home Page</div>
}

function Test() {
  return <div>This is test page</div>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/boards/:boardId" element={<Board />} />
        {/* Optionally redirect all unmatched routes to the home page or a 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
