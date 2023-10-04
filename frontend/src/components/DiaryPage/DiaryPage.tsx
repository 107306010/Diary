import * as React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Labels from '../Lables/Lables';
import useDiary from '../../hooks/useDiary';
import { labelsMapper } from '../../utils/helper';
import { deleteDiary } from '../../utils/client';

export type DiaryPageProps = {
  // handleOpen: () => void,
  handleClose: () => void,
  open: boolean,
  id: string,
  description: string,
  date: string,
  tags: Number[],
  emotions: Number[],
  imageurl: string,
  chilComp?: React.ReactNode
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DiaryPage({
  handleClose,
  open,
  id,
  description,
  date,
  tags,
  emotions,
  imageurl,
  chilComp
}: DiaryPageProps) {

  const { fetchDiaries } = useDiary();

  const handleDeleteDiary = async() =>{
    try {
      await deleteDiary(id);
      fetchDiaries()
    } catch (error) {
      alert("Error: Failed to delete diary");
    } finally {
      handleClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <img src={imageurl}/>
      <DialogTitle id="alert-dialog-title">
        {date}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        <Labels 
              labelarr={tags? labelsMapper(tags, "tags") : []}
              displayOnly
            />
            <Labels 
              labelarr={emotions? labelsMapper(emotions, "emotions") : []}
              displayOnly
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDiary}>刪除</Button>
        {chilComp}
      </DialogActions>
    </Dialog>
  );
}
