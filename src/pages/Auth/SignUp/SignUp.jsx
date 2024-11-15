/* eslint-disable no-console */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createNewAccountAPis } from '~/apis'
import { parseErrorMessages } from '~/utils/fomatter'
import { inputStyle } from '~/utils/style'

function SignUp() {
  const [displayName, setDisplayName] = useState()
  const [password, setPassword] = useState()
  const [gmail, setGmail] = useState()
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const createNewAccount = async (e) => {
    e.preventDefault()
    try {
      const response = await createNewAccountAPis({
        displayName: displayName,
        gmail: gmail,
        password: password })
      if (response.acknowledged) {
        navigate('/login')
        setGmail('')
        setPassword('')
        setDisplayName('')
        setErrors({})
      }
    } catch (error) {
      const errorMessages = await parseErrorMessages(error.response.data.message)
      setErrors(errorMessages)
    }
  }

  return (
    <>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        bgcolor: '#CBDBFF'
        // backgroundImage: 'url(https://i.pinimg.com/564x/36/74/2a/36742a392b7d9508b649fb4a48d3e318.jpg)'
      }}>
        <Box sx={{
          minHeight: '400px',
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
            width: '50%',
            minHeight: '400px',
            maxHeight: '500px',
            bgcolor: '#CBDBFF',
            borderRadius: '8px'
          }}>
          </Box>
          <form
            onSubmit={createNewAccount}
            style={{
              width: '350px',
              display: 'flex',
              backgroundColor: 'transparent',
              gap: '20px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
            <Typography color={'#170700'} variant='h6'>Create new account</Typography>
            <Box>
              <TextField
                sx={{ ...inputStyle, mb : errors.gmail ? '30px' : '12px' }}
                label="Gmail"
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setGmail(e.target.value)}
                error={!!errors.gmail}
                helperText={errors.gmail || ''} />
              <TextField
                sx={{ ...inputStyle, mb : errors.username ? '30px' : '12px' }}
                label="Username"
                autoComplete="off"
                variant="outlined"
                onChange={(e) => setDisplayName(e.target.value)}
                error={!!errors.username}
                helperText={errors.username || ''} />
              <TextField
                sx={{ ...inputStyle, mb : errors.password ? '30px' : '12px' }}
                label="Password"
                autoComplete="off"
                variant="outlined"
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password || ''} />
            </Box>
            <Button
              type='submit'
              sx={{
                width: '100%',
                color: 'white'
              }}
              variant="contained">Register</Button>
            <Link
              to="/login"
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
            >Already have an account?</Link>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default SignUp