import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import SelectMode from '~/components/ModeSelect'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Template from './Menus/Template'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpIcon from '@mui/icons-material/Help'
import Profile from './Menus/Profile'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }}></AppsIcon>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }}></SvgIcon>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
          <Workspace/>
          <Recent/>
          <Started/>
          <Template/>
          <Button startIcon={<LibraryAddIcon />} variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField sx={{ minWidth: '120px' }} id="outlined-basic" label="Search..." variant="outlined" size='small' />
        <SelectMode/>

        <Tooltip title="Notification">
          <Badge badgeContent={4} variant='dot' color="secondary">
            <NotificationsIcon sx={{ color: 'primary.main' }}></NotificationsIcon>
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpIcon sx={{ color: 'primary.main' }}/>
        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar
