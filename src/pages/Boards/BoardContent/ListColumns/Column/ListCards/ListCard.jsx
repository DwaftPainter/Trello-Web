import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCard() {
  return (
    <Box sx={{
      m: '0 5px',
      p: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
      ${theme.trello.boardContentHeight} 
    - ${theme.spacing(5)}
    - ${theme.trello.columnFooterHeight}
    - ${theme.trello.columnHeaderHeight})`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      <Card></Card>
      <Card TemporaryHideMedia></Card>
    </Box>
  )
}

export default ListCard