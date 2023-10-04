import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Labels from '../Lables/Lables';
import { TAGS, EMOTIONS } from '../../config/config'
import { createDiaries, updateDiaries } from '../../utils/client';
import useDiary from '../../hooks/useDiary';


export type EditCreateDiaryPageProps = {
  // handleOpen: () => void,
  handleClose: () => void,
  open: boolean,
  id?: string,
  description?: string,
  date?: string,
  tags?: Number[],
  emotions?: Number[],
  imageurl?: string,
  isCreate: boolean,
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditCreateDiaryPage({
    handleClose, 
    open,
    id,
    description, 
    date,
    tags,
    emotions,
    imageurl,
    isCreate,
    }: EditCreateDiaryPageProps) {

    const textfieldRef = useRef<HTMLInputElement>(null);
    const [allTags, setAllTags] = useState(TAGS);
    const [allEmotions, setAllEmotions] = useState(EMOTIONS);
    const [selectedTags, setSelectedTags] = useState<Set<Number>>(
        isCreate? new Set() : new Set(tags)
    );
    const [selectedEmotions, setSelectedEmotions] = useState<Set<Number>>(
        isCreate? new Set() : new Set(emotions)
    );
    const { fetchDiaries } = useDiary();

    const handleTagsChanged = (id: number) => {
        const newTagsSet = new Set(selectedTags);
        if (newTagsSet.has(id)) newTagsSet.delete(id);
        else newTagsSet.add(id);
        setSelectedTags(newTagsSet);
    }
    const handleEmotionsChanged = (id: number) => {
        const newEmotionsSet = new Set(selectedEmotions);
        if (newEmotionsSet.has(id)) newEmotionsSet.delete(id);
        else newEmotionsSet.add(id);
        setSelectedEmotions(newEmotionsSet);
    }
    const customHandleClose = () => {
        handleClose();
        setSelectedTags(new Set());
        setSelectedEmotions(new Set());
    }
    const handleCreateDiary = async() =>{
        try {
            await createDiaries({
                description: textfieldRef.current?.value ?? "",
                tags: [...selectedTags],
                emotions: [...selectedEmotions],
                date: new Date().toDateString(),
            });
            fetchDiaries()
        } catch (error) {
            alert("Error: Failed to create list");
        } finally {
            customHandleClose();
        }
    }
    const handleUpdateDiary = async() =>{
        try {
            await updateDiaries(id!, {
                description: textfieldRef.current?.value ?? "",
                tags: [...selectedTags],
                emotions: [...selectedEmotions],
            });
            fetchDiaries()
        } catch (error) {
            alert("Error: Failed to create list");
        } finally {
            customHandleClose();
        }
    }
    
    
    if (isCreate){
        return (
            <Dialog
                open={open}
                onClose={customHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <img src={imageurl}/>
                <DialogTitle id="alert-dialog-title">
                    {"title"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"content text"}
                    </DialogContentText>
                    <Box sx={{ my: 3, mx: 2 }}>
                        <TextField
                            inputRef={textfieldRef}
                            id="outlined-multiline-static"
                            fullWidth
                            label="內文"
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ m: 2 }}>
                        <Typography gutterBottom variant="body1">
                            選擇類型標籤
                        </Typography>
                        <Labels 
                            labelarr={allTags}
                            handleSelectionChanged={handleTagsChanged}
                            selected={selectedTags}
                        />
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Typography gutterBottom variant="body1">
                            選擇心情標籤
                        </Typography>
                        <Labels 
                            labelarr={allEmotions}
                            handleSelectionChanged={handleEmotionsChanged}
                            selected={selectedEmotions}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={customHandleClose}>取消</Button>
                    <Button onClick={handleCreateDiary}>確認</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return(
        <Dialog
            open={open}
            onClose={customHandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <img src={imageurl}/>
            <DialogTitle id="alert-dialog-title">
                {date}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {"content text"}
                </DialogContentText>
                <Box sx={{ my: 3, mx: 2 }}>
                    <TextField
                        inputRef={textfieldRef}
                        id="outlined-multiline-static"
                        fullWidth
                        label="內文"
                        multiline
                        rows={4}
                        defaultValue={description}
                    />
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }}>
                    <Typography gutterBottom variant="body1">
                        選擇類型標籤
                    </Typography>
                    <Labels 
                        labelarr={allTags}
                        handleSelectionChanged={handleTagsChanged}
                        selected={selectedTags}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <Typography gutterBottom variant="body1">
                        選擇心情標籤
                    </Typography>
                    <Labels 
                        labelarr={allEmotions}
                        handleSelectionChanged={handleEmotionsChanged}
                        selected={selectedEmotions}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={customHandleClose}>取消</Button>
                <Button onClick={handleUpdateDiary}>確認</Button>
            </DialogActions>
        </Dialog>
    )

}
