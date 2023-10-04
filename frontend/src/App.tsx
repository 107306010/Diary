import './App.css'
import Typography from '@mui/material/Typography';
import DiaryContainer from './components/DiaryContainer/DiaryContainer';

function App() {

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Diary
      </Typography>
      <DiaryContainer />
    </>
  )
}

export default App
