import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_TYPE = {
  COLUMN: 'ACTIVE_DRAG_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_TYPE_CARD'
}

function BoardContent({ board }) {

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const mySensor = useSensors(mouseSensor, touchSensor)

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: {
        opacity: 0.5
      } }
    })
  }

  const [orderedColumnsState, setOrderedColumnsState] = useState([])
  const [activeDragId, setActiveDragId] = useState(null)
  const [activeDragType, setActiveDragType] = useState(null)
  const [activeDragData, setActiveDragData] = useState(null)
  const [oldActiveColumn, setOldActiveColumn] = useState(null)

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find(column => column.cards.map(card => card._id).includes(cardId))
  }

  const exchangeCardBetweenTwoColumns = (
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState(preColumn => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex

      const isBelowOverItem =
      over &&
      active.rect.current.translated && active.rect.current.translated.top >
      over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(preColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    } )
  }

  const handleDragStart = (event) => {
    setActiveDragId(event?.active.id)
    setActiveDragType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_TYPE.CARD : ACTIVE_DRAG_TYPE.COLUMN)
    setActiveDragData(event?.active?.data?.current)

    if (ACTIVE_DRAG_TYPE.CARD) {
      setOldActiveColumn(findColumnByCardId(event?.active.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) return

    if (!event?.active || !event?.over) return

    const { active, over } = event

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      exchangeCardBetweenTwoColumns(
        overColumn,
        overCardId,
        over,
        active,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (activeDragType === ACTIVE_DRAG_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldActiveColumn._id !== overColumn._id) {
        exchangeCardBetweenTwoColumns(
          overColumn,
          overCardId,
          over,
          active,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        const oldCardIndex = oldActiveColumn?.cards.findIndex(c => c._id === activeDragId)
        const newCardIndex = overColumn?.cards.findIndex(c => c._id === overCardId)
        const dndCards = arrayMove(oldActiveColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnsState(preColumn => {
          const nextColumn = cloneDeep(preColumn)
          const targetColumn = nextColumn.find(c => c._id === overColumn._id )

          targetColumn.cards = dndCards
          targetColumn.cardOrderIds = dndCards.map(c => c._id)

          return nextColumn
        })
      }
    }

    if (activeDragType === ACTIVE_DRAG_TYPE.COLUMN) {
      if (!active || !over) return
      if (active.id !== over.id) {
        const oldIndex = orderedColumnsState.findIndex(c => c._id === activeDragId)
        const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumnsState(dndOrderedColumns)
      }
    }


    setActiveDragId(null)
    setActiveDragType(null)
    setActiveDragData(null)
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={mySensor}>
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
        <DragOverlay dropAnimation={customDropAnimation}>
          {( !activeDragId && !activeDragType ) && null }
          {( activeDragType === ACTIVE_DRAG_TYPE.COLUMN && activeDragId) &&
          <Column column={activeDragData}/>
          }
          {(activeDragType === ACTIVE_DRAG_TYPE.CARD && activeDragId) &&
          <Card card={activeDragData}/>
          }

        </DragOverlay >
      </Box>
    </DndContext>
  )
}

export default BoardContent
