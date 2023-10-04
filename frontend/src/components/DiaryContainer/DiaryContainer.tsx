import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DiaryBlock from '../DiaryBlock/DiaryBlock';
import useDiary from '../../hooks/useDiary';

export default function DiaryContainer(){
    const { diaries, fetchDiaries } = useDiary();

    useEffect(() => {
        fetchDiaries()
    },[fetchDiaries])

    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {diaries.map((diary) => (
              <Grid display='flex' justifyContent='center' xs={2} sm={4} md={4} key={diary.id}>
                <DiaryBlock {...diary}/>
              </Grid>
            ))}
            <Grid xs={2} sm={4} md={4}>
                <DiaryBlock isCreateBtn/>
            </Grid>
          </Grid>
        </Box>
    );
}