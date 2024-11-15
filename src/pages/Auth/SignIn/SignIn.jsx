import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { checkExistAccount } from '~/apis'
import { parseErrorMessages } from '~/utils/fomatter'
import { toast } from 'react-toastify'
import { inputStyle } from '~/utils/style'

function SignIn() {
  const [password, setPassword] = useState()
  const [gmail, setGmail] = useState()
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const checkAccount = async (e) => {
    e.preventDefault()
    try {
      try {
        await checkExistAccount({
          gmail: gmail,
          password: password
        }).then((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
            toast.success('Well comeback master')
          } else if (res.message === 'no account record') {
            setErrors({ gmail: 'No account record' })
          } else {
            setErrors({ password: 'Password is incorrect.' })
          }
        })
      } catch (error) {
        const errorMessages = parseErrorMessages(error.response.data.message)
        setErrors(errorMessages)
        return
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          bgcolor: '#CBDBFF'
        }}
      >
        <Box sx={{
          minHeight: '350px',
          maxHeight: '500px',
          width: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          bgcolor: 'white',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <Box sx={{
            minHeight: '350px',
            maxHeight: '500px',
            width: '50%',
            bgcolor: '#CBDBFF',
            borderRadius: '8px'
          }}>
          </Box>
          <form
            onSubmit={checkAccount}
            style={{
              width: '350px',
              display: 'flex',
              backgroundColor: 'white',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}
          >
            <Typography color={'#170700'} variant="h6">
              Login
            </Typography>
            <Box>
              <TextField
                sx={{ ...inputStyle, mt: '20px', mb: errors.gmail ? '23px' : '12px' }}
                label="Gmail"
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setGmail(e.target.value)}
                error={!!errors.gmail}
                helperText={errors.gmail || ''}
              />
              <TextField
                sx={{ ...inputStyle, mb: errors.password ? '15px' : '12px' }}
                label="Password"
                autoComplete="off"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password || ''}
              />
            </Box>
            <Button
              type="submit"
              sx={{
                width: '100%',
                color: 'white',
                my: '20px'
              }}
              variant="contained"
            >
              Login
            </Button>
            <Link
              to="/register"
              style={{
                width: '100%',
                height: '36.5px',
                border: '2px solid #E7E7E7',
                borderRadius: '5px',
                fontSize: '14px',
                textDecoration: 'none',
                color: '#828282',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Register
            </Link>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default SignIn
