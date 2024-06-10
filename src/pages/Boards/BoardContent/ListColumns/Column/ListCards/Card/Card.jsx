import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ card }) {
  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {card?.cover &&
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.pinimg.com/736x/0c/96/7c/0c967c4af27aa805391e3be495936acd.jpg"
        title="green iguana"
      />
      }
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography >{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length && <Button startIcon={<GroupIcon />} size="small">{card.memberIds.length}</Button>}
        {!!card?.comments?.length && <Button startIcon={<CommentIcon />} size="small">{card.comments.length}</Button>}
        {!!card?.attachments?.length && <Button startIcon={<AttachmentIcon />} size="small">{card.attachments.length}</Button>}
      </CardActions>
      }
    </MuiCard>
  )
}

export default Card