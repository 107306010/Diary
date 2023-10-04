import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import DiaryPage from '../DiaryPage/DiaryPage';
import EditCreateSection from '../EditCreateSection/EditCreateSection';
import Labels from '../Lables/Lables';
import { parseDate, labelsMapper } from '../../utils/helper';
import styles from './DiaryBlockStyle';

type DiaryBlockProps = {
  id?: string,
  description?: string,
  date?: string,
  tags?: Array<Number>,
  emotions?: Array<Number>,
  isCreateBtn?: boolean
}

export default function DiaryBlock({ id, description, date, tags, emotions, isCreateBtn }: DiaryBlockProps) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ECopen, setECopen] = useState(false)
  const handleECopen = () => setECopen(true);
  const handleECclose = () => setECopen(false);

  const date_obj = date? parseDate(date) : {year:'', month:'',day:'',day_of_week:''}
  const date_str:string = 
    date_obj.year + "." + date_obj.month + "." + date_obj.day + " " + date_obj.day_of_week
  
  if (isCreateBtn) {
    return(
      <EditCreateSection 
        handleECopen={handleECopen}
        handleECclose={handleECclose}
        ECopen={ECopen}
        isCreate={true}
      />
    )
  }
  return (
    <>
      <ButtonBase onClick={handleOpen} sx={styles.buttonBase}>
        <Card>
          <CardMedia
            sx={{ height: 140 }}
            image="/src/assets/react.svg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {date_str}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Labels 
              labelarr={tags? labelsMapper(tags, "tags") : []}
              displayOnly
            />
            <Labels 
              labelarr={emotions? labelsMapper(emotions, "emotions") : []}
              displayOnly
            />
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </ButtonBase>
      <DiaryPage 
        open={open}
        handleClose={handleClose}
        id={id!}
        description={description ?? ''}
        date={date_str ?? 'Empty date'}
        tags={tags ?? []}
        emotions={emotions ?? []}
        imageurl={'/src/assets/react.svg' ?? ''}
        chilComp={
          <EditCreateSection 
            handleECopen={handleECopen}
            handleECclose={handleECclose}
            ECopen={ECopen}
            isCreate={false}
            id={id}
            description={description}
            date={date_str ?? 'Empty date'}
            tags={tags}
            emotions={emotions}
          />
        }
      />
    </>
  );
}