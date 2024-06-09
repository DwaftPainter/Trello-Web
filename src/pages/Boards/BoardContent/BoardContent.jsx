import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
      overflowX: 'auto',
      overflowY: 'hidden',
      p: '10px 0'
    }}>
      <ListColumn></ListColumn>
    </Box>
  )
}

export default BoardContent
