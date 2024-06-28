import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline></CssBaseline>
    <App />
    <ToastContainer
      theme="colored"
      position="bottom-right" />
  </CssVarsProvider>
  // </React.StrictMode>
)
