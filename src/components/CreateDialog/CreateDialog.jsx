import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import ArticleIcon from '@mui/icons-material/Article'
import AbcIcon from '@mui/icons-material/Abc'
import DialogTitle from '@mui/material/DialogTitle'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'

function CreateDialog({ open, handleClose, checkBoxState, handleChange, createNewBoard }) {
  const [titleIsEmpty, setTitleIsEmpty] = useState(false)
  const [descriptionIsEmpty, setDescriptionIsEmpty] = useState(false)
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose()
        setTitleIsEmpty(false)
        setDescriptionIsEmpty(false)}}
      sx={{
        maxWidth: '494.4'
      }}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          const formData = new FormData(event.target)
          const formJson = Object.fromEntries(formData.entries())
          const title = formJson.title
          const description = formJson.description
          const type = formJson.private ? 'private' : 'public'
          //Validate data before calling API
          let hasError = false
          if (!title) {
            setTitleIsEmpty(true)
            hasError = true
          }
          if (!description) {
            setDescriptionIsEmpty(true)
            hasError = true
          }
          if (hasError) {
            return
          }
          createNewBoard(title, description, type)
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AddToPhotosIcon />Create a new board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete='off'
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          error={titleIsEmpty}
          helperText={titleIsEmpty ? 'You have to enter your board title' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AbcIcon />
              </InputAdornment>
            ) }}
        />
        <TextField
          autoFocus
          autoComplete='off'
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          error={descriptionIsEmpty}
          helperText={descriptionIsEmpty ? 'You have to enter your board description' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ArticleIcon />
              </InputAdornment>
            ) }}
        />
        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControlLabel
            control={<Checkbox onClick={handleChange} name='public' checked={checkBoxState.public} />}
            label="Public" />
          <FormControlLabel
            control={<Checkbox onClick={handleChange} name='private' checked={checkBoxState.private} />}
            label="Private" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          handleClose()
          setTitleIsEmpty(false)
          setDescriptionIsEmpty(false)
        }}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateDialog