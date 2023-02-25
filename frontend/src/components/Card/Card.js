import {Box} from '@mui/material'

const Card = ({...rest}) => (
  <Box
    sx={{
      margin: '20px auto 0',
      padding: 2,
      width: 500,
      minHeight: 400,
      borderRadius: 3,
      background: '#F4F6F8',
      border: '1px solid #C4CDD5',
    }}
    {...rest}
  />
)

export default Card
