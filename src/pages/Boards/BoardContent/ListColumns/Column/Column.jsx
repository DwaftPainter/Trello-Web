import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContentCut from '@mui/icons-material/ContentCut'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCard'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
import { CSS } from '@dnd-kit/utilities'

function Column({ column, createNewCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column?._id, data: { ...column } })

  const DndColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const orderedCards = column?.cards

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openForm, setOpenForm] = useState(false)
  const toggleOpenForm = () => setOpenForm(!openForm)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter your card title')
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)

    //Close add cardstatus
    toggleOpenForm()
    setNewCardTitle('')
  }
  return (
    <div ref={setNodeRef} style={DndColumnStyle} {...attributes} >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          height: 'fit-content',
          ml: 2,
          borderRadius: '6px',
          bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2
        }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>{column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              </ExpandMoreIcon>
            </Tooltip>
            <Menu
              sx={{ width: 320, maxWidth: '100%' }}
              id="basic-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /> </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /> </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <ListCard cards={orderedCards}></ListCard>

        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}>
          { !openForm ?
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Button onClick={toggleOpenForm} startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}></DragHandleIcon>
              </Tooltip>
            </Box> :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
            data-no-dnd="true"
            >
              <TextField
                type='text'
                id="outlined-basic"
                label="Type card title..."
                variant="outlined"
                size='small'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': { color: (theme) => theme.palette.primary.main },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '333643' : 'white' },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input' : {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Button
                  variant='contained'
                  color="success"
                  size='small'
                  onClick={ addNewCard }
                  sx={{
                    color: 'white',
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: ((theme) => theme.palette.success.main ) }
                  }}>
              Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  onClick={() => {
                    toggleOpenForm()
                    setNewCardTitle('')
                  }}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.palette.warning.light }
                  }} />
              </Box>
            </Box> }
        </Box>
      </Box>
    </div>
  )
}

export default Column