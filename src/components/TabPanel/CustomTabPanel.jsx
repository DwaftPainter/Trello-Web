import Box from '@mui/material/Box'

function CustomTabPanel(props) {
  const { children, value, index, sx } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
    >
      {value === index && <Box sx={sx}>{children}</Box>}
    </div>
  )
}

export default CustomTabPanel