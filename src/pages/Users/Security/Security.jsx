import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import PasswordIcon from '@mui/icons-material/Password'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import SyncIcon from '@mui/icons-material/Sync'
import { useState } from 'react'
import { changePassword } from '~/apis'
import { toast } from 'react-toastify'

function Security() {
  const [errors, setErrors] = useState({})
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Security</Typography>
      <Grid
        container
        component='form'
        rowSpacing={4}
        columnSpacing={5}
        sx={{ mt: '20px' }}
        onSubmit={(e) => {
          e.preventDefault()
          const validate = () => {
            const newErrors = {}
            if (!oldPassword) {
              newErrors.oldPassword = 'Old password is required'
            }
            if (!newPassword) {
              newErrors.newPassword = 'New password is required'
            } else if (oldPassword === newPassword) {
              newErrors.newPassword = 'The new password coincides with the old password'
            }
            if (!confirmNewPassword) {
              newErrors.confirmNewPassword = 'Confirming your new password'
            } else if (newPassword !== confirmNewPassword) {
              newErrors.confirmNewPassword = 'Passwords do not match'
            }
            return newErrors
          }
          const newErrors = validate()
          if (Object.keys(newErrors).length === 0) {
            changePassword({
              oldPassword,
              newPassword,
              confirmNewPassword
            })
            toast.success('You have changed your password')
            setErrors({})
            setNewPassword('')
            setOldPassword('')
            setConfirmNewPassword('')
          } else {
            setErrors(newErrors)
          }
        }}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            name='oldPassword'
            type='password'
            autoComplete="off"
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword ? `${errors.oldPassword}` : ''}
            sx={{ bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '' : '#FAFAFA') }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              )
            }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name='newPassword'
            type='password'
            autoComplete="off"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? `${errors.newPassword}` : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SyncIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              )
            }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name='confirmNewPassword'
            type='password'
            autoComplete="off"
            variant="outlined"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword ? `${errors.confirmNewPassword}` : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SyncLockIcon sx={{ color: '#A9A3C5' }}/>
                  <Divider sx={{ height: 51, pl: '14px' }} orientation='vertical'></Divider>
                </InputAdornment>
              )
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type='submit' variant='contained'>Update</Button>
            <Button sx={{ bgcolor: '#EFEFEF', color: '#828282' }} type='button' variant='contained'>Cancel</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Security