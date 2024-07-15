import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ListColumn({ columns, createNewColumn, createNewCard, deleteColumnDetail }) {
  const [openForm, setOpenForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenForm = () => setOpenForm(!openForm)

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter your column title')
      return
    }

    const newColumnData = {
      title: newColumnTitle
    }

    await createNewColumn(newColumnData)

    //Close add column status
    toggleOpenForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        bgcolor: 'inherit',
        '&::webkit-scrollbar-track': { m: 2 } }}>

        {columns?.map(column => <Column
          key={column._id}
          column={column}
          createNewCard={createNewCard}
          deleteColumnDetail={deleteColumnDetail}/> )}

        {!openForm
          ?
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              bgcolor: '#ffffff3d',
              borderRadius: '6px',
              height: 'fit-content'
            }}>
            <Button
              startIcon={<NoteAddIcon />}
              onClick={toggleOpenForm}
              sx={{
                color: 'white',
                py: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              Add New Column
            </Button>
          </Box>
          :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            display: 'flex',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              type='text'
              id="outlined-basic"
              label="Type column title..."
              variant="outlined"
              size='small'
              autoFocus
              autoComplete="off"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white'
                },
                '& input': { color: 'white'
                },
                '& label.Mui-focused': { color: 'white'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
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
                onClick={ addNewColumn }
                sx={{
                  color: 'white',
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: ((theme) => theme.palette.success.main ) }
                }}>
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                onClick={toggleOpenForm}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: ((theme) => theme.palette.warning.light ) }
                }} />
            </Box>
          </Box> }

      </Box>
    </SortableContext>
  )
}

export default ListColumn