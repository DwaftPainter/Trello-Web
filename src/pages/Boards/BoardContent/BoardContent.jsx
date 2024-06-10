import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
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
      <ListColumn columns={orderedColumns}></ListColumn>
    </Box>
  )
}

export default BoardContent
