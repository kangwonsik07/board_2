import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const MyProfile = () => {
   return (
      <Card sx={{ minWidth: 275 }}>
         <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}></Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>자기소개</Typography>
            <Typography variant="body2"></Typography>
         </CardContent>
         <CardActions sx={{ p: 2 }}>
            <Button variant="contained">Follow</Button>
         </CardActions>
      </Card>
   )
}

export default MyProfile
