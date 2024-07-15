import { Container, Divider, Grid, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { useState, useEffect } from 'react'
import CreateDialog from '~/components/CreateDialog/CreateDialog'
import BoardCard from '~/pages/Boards/Board'
import { useNavigate } from 'react-router-dom'
import { getUserId } from '~/utils/algorithm'
import { createNewBoardApi, getUserDetails } from '~/apis'

function Home() {
  const navigate = useNavigate()
  const userId = getUserId()
  const [boards, setBoards] = useState([])
  const [active, setActive] = useState('boards')
  const [open, setOpen] = useState(false)
  const [checkBoxState, setCheckBoxState] = useState({
    public: false,
    private: true
  })

  useEffect(() => {
    getUserDetails().then((res) => {
      setBoards(res)
    })
  }, [])

  useEffect(() => {
    if (!boards) {
      navigate('/register') // Redirect to the register page
    }
  }, [boards, navigate])

  const handleChange = (event) => {
    const { name } = event.target
    setCheckBoxState({
      public: name === 'public' ? true : false,
      private: name === 'private' ? true : false
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCheckBoxState({
      public: false,
      private: false
    })
  }

  const buttonStyle = (active) => ({
    justifyContent: 'left',
    py: '10px',
    px: '15px',
    color: (theme) =>
      active
        ? theme.palette.primary.main
        : theme.palette.mode === 'dark'
          ? '#ffffff'
          : '#828282'
  })

  const toggleActiveButton = (buttonName) => {
    setActive((prev) => (prev === buttonName ? null : buttonName))
  }

  const createNewBoard = (title, description, type) => {
    //Call API to create a new board
    createNewBoardApi({
      title: title,
      description: description,
      type: type,
      ownerId: userId
    }).then((newBoard) => {
      setBoards((prevBoards) => [...prevBoards, newBoard])
    })
    //Close dialog after a board has been created
    handleClose()
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar handleClickOpen={handleClickOpen}></AppBar>
      <Box
        sx={{
          height: (theme) => theme.trello.homeContentHeight,
          display: 'flex',
          py: '29px'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            pl: '50px'
          }}
        >
          <Button
            onClick={() => toggleActiveButton('boards')}
            sx={buttonStyle(active === 'boards')}
            startIcon={<SpaceDashboardIcon />}
            variant="text"
          >
            Boards
          </Button>
          <Button
            onClick={() => toggleActiveButton('templates')}
            sx={buttonStyle(active === 'templates')}
            startIcon={<ListAltIcon />}
            variant="text"
          >
            Templates
          </Button>
          <Button
            onClick={() => toggleActiveButton('home')}
            sx={buttonStyle(active === 'home')}
            startIcon={<HomeIcon />}
            variant="text"
          >
            Home
          </Button>
          <Divider />
          <Button
            onClick={handleClickOpen}
            sx={buttonStyle(false)}
            startIcon={<AddToPhotosIcon />}
            variant="text"
          >
            Create a new board
          </Button>
          <CreateDialog
            open={open}
            handleClose={handleClose}
            checkBoxState={checkBoxState}
            handleChange={handleChange}
            createNewBoard={createNewBoard}
          ></CreateDialog>
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            px: '50px'
          }}
        >
          <Typography sx={{ color: '#828282' }} variant="h5" fontWeight="bold">
            Your Boards
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {boards?.map((board) => (
              <BoardCard key={board._id} board={board} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
