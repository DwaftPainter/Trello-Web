import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Container from '@mui/material/Container'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import CustomTabPanel from '~/components/TabPanel/CustomTabPanel'
import AccountSetting from './AccountSetting/AccountSetting'
import Security from './Security/Security'
import { getUserDetails, updateUserDetails } from '~/apis'

export const AccountContext = createContext({})

function Account() {
  const [user, setUser] = useState([])
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || null)
  const location = useLocation()
  const navigate = useNavigate()
  const pathToIndex = {
    '/setting/account': 0,
    '/setting/security': 1
  }
  const indexToPath = ['/setting/account', '/setting/security']
  const currentTab = pathToIndex[location.pathname]
  const handleChange = (event, newValue) => {
    navigate(indexToPath[newValue])
  }

  useEffect(() => {
    getUserDetails().then(res => {
      setUser(res.user)
    })
  }, [])

  //Handle File used to change avatar
  const handleUploadFile = (e) => {
    const avatarFile = e.target.files[0]
    if (avatarFile) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result
        setAvatar(base64String)
        localStorage.setItem('avatar', base64String)
        updateUserDetails({ avatar: base64String })
      }

      reader.readAsDataURL(avatarFile)
    }
  }

  return (
    <AccountContext.Provider
      value={{
        avatar
      }}
    >
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar/>
        <Box sx={{ width: '100%', display: 'flex', height: (theme) => theme.trello.homeContentHeight }}>
          <Box sx={{ width: '20%', borderBottom: 1, border: '1px solid', borderColor: 'divider' }}>
            <Box
              sx={{
                height: '35%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center' }}>
              <Stack>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <>
                      <input
                        accept='image/*'
                        type='file'
                        id='add-new-avatar'
                        style={{ display: 'none' }}
                        onChange={handleUploadFile}
                      ></input>
                      <label htmlFor='add-new-avatar'>
                        <IconButton
                          sx={{
                            bgcolor: (theme) => theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: (theme) => theme.palette.primary.dark
                            }
                          }}
                          component="span">
                          <AddAPhotoIcon sx={{ color:'white' }} fontSize='small'></AddAPhotoIcon>
                        </IconButton>
                      </label>
                    </>
                  }>
                  <Avatar sx={{ height: '120px', width: '120px', border: '1px solid', bgcolor: 'divider' }} src={avatar}></Avatar>
                </Badge>
              </Stack>
              <Box sx={{ textAlign: 'center' }}>
                <Typography fontWeight='bold' variant='h7'>{user.displayName}</Typography>
                <Typography sx={{ fontSize: '10px !important', color: '#707070' }}>@{user.username}</Typography>
              </Box>
            </Box>
            <Tabs sx={{ height: '65%' }} orientation="vertical" onChange={handleChange} value={currentTab} aria-label="basic tabs example">
              <Tab
                sx={{ color: '#828282', borderTop: '1px solid', borderColor: 'divider' }}
                label="Account Setting"
                value={0} />
              <Tab
                sx={{ color: '#828282', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}
                label="Security"
                value={1} />
            </Tabs>
          </Box>
          <Box sx={{ width: '80%', py: '90px', px: '50px' }}>
            <Routes>
              <Route path="account" element={
                <CustomTabPanel value={currentTab} index={0}><AccountSetting user={user}/></CustomTabPanel>
              } />
              <Route path="security" element={
                <CustomTabPanel value={currentTab} index={1}><Security/></CustomTabPanel>
              } />
            </Routes>
          </Box>
        </Box>
      </Container>
    </AccountContext.Provider>
  )
}

export default Account