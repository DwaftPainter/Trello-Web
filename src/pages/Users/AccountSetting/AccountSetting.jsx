import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import { useState, useEffect } from 'react'
import { updateUserDetails } from '~/apis'

function AccountSetting({ user }) {
  const [displayName, setDisplayName] = useState(user?.displayName)
  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.gmail)
  const [bio, setBio] = useState(user?.bio)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!displayName) {
      newErrors.displayName = 'Display name is required'
    }

    if (!username) {
      newErrors.username = 'Username is required'
    }

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    return newErrors
  }

  useEffect(() => {
    setDisplayName(user.displayName)
    setUsername(user.username)
    setEmail(user.gmail)
    setBio(user?.bio)
  }, [user] )

  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Account Setting</Typography>
      <Grid
        container
        component='form'
        rowSpacing={4}
        columnSpacing={5}
        sx={{ mt: '20px' }}
        onSubmit={(e) => {
          e.preventDefault()
          const newErrors = validate()
          if (Object.keys(newErrors).length === 0) {
            updateUserDetails({ displayName, username, gmail: email, bio })
          } else {
            setErrors(newErrors)
          }
        }}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={displayName || ''}
            error={!!errors.displayName}
            helperText={errors.displayName ? `${errors.displayName}` : ''}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '' : '#FAFAFA') }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              )
            }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={username || ''}
            error={!!errors.username}
            helperText={errors.username ? `${errors.username}` : ''}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '' : '#FAFAFA' ) }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFileRenameOutlineIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              ) }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={email || ''}
            error={!!errors.email}
            helperText={errors.email ? `${errors.email}` : ''}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '' : '#FAFAFA') }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              ) }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ color: '#A9A3C5' }}>Bio</Typography>
            <TextField
              fullWidth
              multiline
              autoComplete="off"
              minRows={5}
              value={bio || ''}
              sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '' : '#FAFAFA') }}
              onChange={(e) => setBio(e.target.value)}
            >
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type='submit' variant='contained'>Update</Button>
            <Button
              sx={{
                bgcolor: '#EFEFEF',
                color: '#828282',
                '&:hover': { bgcolor: 'white' } }}
              type='button'
              variant='contained'>Cancel</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default AccountSetting