import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useNavigate } from 'react-router-dom'
import { getRandomRGBColor } from '~/utils/algorithm'

function BoardCard({ board }) {
  const navigate = useNavigate()

  return (
    <Grid item md={3}>
      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardHeader
            sx={{ height: '10px', bgcolor: `${getRandomRGBColor()}` }}
          ></CardHeader>
          <CardContent>
            <Typography fontWeight={'bold'} gutterBottom variant="h5" component="div">
              {board?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {board?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => {
              navigate(`/boards/${board._id}`)
            }}
            size="small"
            color="primary"
            endIcon={<PlayArrowIcon />}
          >
            Go to board
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BoardCard
