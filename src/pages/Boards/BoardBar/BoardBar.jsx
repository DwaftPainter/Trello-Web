import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  borderRadius: '4px',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  color: 'white',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="Dwarf_Painter Project"
          variant="outlined"
          clickable/>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          variant="outlined"
          clickable/>
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          variant="outlined"
          clickable/>
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          variant="outlined"
          clickable/>
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          variant="outlined"
          clickable/>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          startIcon={<PersonAddIcon />}
          variant="outlined">Invite</Button>
        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              fontSize: '16px',
              width: '34px',
              height: '34px'
            }
          }}
          max={4}>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.naUjSUPa4G8Abi3vWZW0vAHaHN?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.RLva-S1jNB3TPu2Dl97-AAAAAA?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th?q=Dog+Side+Face+Meme&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=strict&t=1&mw=247" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.naUjSUPa4G8Abi3vWZW0vAHaHN?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.naUjSUPa4G8Abi3vWZW0vAHaHN?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.naUjSUPa4G8Abi3vWZW0vAHaHN?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="Dwarf Painter">
            <Avatar
              alt="Dwarf Painter"
              src="https://th.bing.com/th/id/OIP.naUjSUPa4G8Abi3vWZW0vAHaHN?rs=1&pid=ImgDetMain" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
