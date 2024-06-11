import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const mySensor = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      setOrderedColumnsState(dndOrderedColumns)
    }

  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensor}>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        overflowX: 'auto',
        overflowY: 'hidden',
        p: '10px 0'
      }}>
        <ListColumn columns={orderedColumnsState}></ListColumn>
      </Box>
    </DndContext>
  )
}

export default BoardContent
