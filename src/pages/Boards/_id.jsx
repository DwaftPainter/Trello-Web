import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { generatePlaceholderCard } from '~/utils/fomatter'
import { isEmpty } from 'lodash'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import {
  createNewColumnAPIs,
  createNewCardAPIs,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToOtherColumnsApi,
  deleteColumnDetailsAPI } from '~/apis/index'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
import { useParams } from 'react-router-dom'
import { mapOrder } from '~/utils/sorts'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'

function Board() {

  const [board, setBoard] = useState(null)
  const boardId = '667cdc7b12347ccf0c245d9e'

  useEffect( () => {
    //Call APIs
    fetchBoardDetailsAPI(boardId).then( board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach( c => {
        if (isEmpty(c.cards)) {
          c.cards = [generatePlaceholderCard(c)]
          c.cardOrderIds = [generatePlaceholderCard(c)._id]
        } else {
          c.cards = mapOrder(c?.cards, c?.cardOrderIds, '_id')
        }
      })

      setBoard(board)
    })
  }, [boardId])

  const createNewColumn = async (newColumnData) => {
    const createColumn = await createNewColumnAPIs({
      ...newColumnData,
      boardId: boardId }
    )

    createColumn.cards = [generatePlaceholderCard(createColumn)]
    createColumn.cardOrderIds = [generatePlaceholderCard(createColumn)._id]

    //Update state board
    const newBoard = { ...board }
    newBoard.columns.push(createColumn)
    newBoard.columnOrderIds.push(createColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createCard = await createNewCardAPIs({
      ...newCardData,
      boardId: boardId }
    )

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find (c => c._id === createCard.columnId)
    if (columnToUpdate.cards.some(card => card.FE_placeholderCard)) {
      columnToUpdate.cards = [createCard]
      columnToUpdate.cardOrderIds = [createCard._id]
    } else {
      columnToUpdate.cards.push(createCard)
      columnToUpdate.cardOrderIds.push(createCard._id)
    }

    setBoard(newBoard)
  }

  /* When moving column:
     We just need to call API to update columnOrderIds */
  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    updateBoardDetailsAPI(boardId, { columnOrderIds: dndOrderedColumnsIds })
  }

  /* When moving card in the columns:
     We just need to call API to update cardOrderIds */
  const moveCardWithinColumns = (dndCards, dndOrderedCardIds, columnId) => {
    // Update board state data correctly
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find (c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    //Calling API to update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToOtherColumns = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //Handle the issue when dragging the last card out of the column
    let prevCardOrderIds = dndOrderedColumns.find(c => (c._id === prevColumnId))?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    //Call API from Back End
    moveCardToOtherColumnsApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => (c._id === nextColumnId))?.cardOrderIds
    })
  }

  const deleteColumnDetail = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100vh',
        maxWidth: '100%' }}>
        <CircularProgress />
        <Typography>Loading page...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardWithinColumns={moveCardWithinColumns}
        moveCardToOtherColumns={moveCardToOtherColumns}
        deleteColumnDetail={deleteColumnDetail} />
    </Container>
  )
}

export default Board
