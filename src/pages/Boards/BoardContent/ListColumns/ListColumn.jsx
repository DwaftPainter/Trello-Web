import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumn({ columns }) {
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

        {columns?.map(column => <Column key={column._id} column={column} /> )}

        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            bgcolor: '#ffffff3d',
            borderRadius: '6px',
            height: 'fit-content'
          }}>
          <Button
            startIcon={<NoteAddIcon />}
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
      </Box>
    </SortableContext>
  )
}

export default ListColumn