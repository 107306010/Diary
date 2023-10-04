import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import EditCreateDiaryPage from '../EditCreateDiaryPage/EditCreateDiaryPage';

type ECsectionProps = {
    handleECopen: () => void,
    handleECclose: () => void,
    ECopen: boolean,
    isCreate: boolean,
    id?: string,
    description?: string,
    date?: string,
    tags?: Number[],
    emotions?: Number[],
}

const CreateButton = styled(ButtonBase)(({ theme }) => ({
    // position: 'relative',
    height: 200,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '& .MuiTypography-root': {
      boxSizing: 'border-box',
      width: 150
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

export default function EditCreateSection({
    handleECopen, handleECclose, ECopen, isCreate, id, description, date, tags, emotions
    }: ECsectionProps){
    
    if (isCreate){
        return (
        <div>
            <CreateButton onClick={handleECopen}>
                <Typography>Create new diary</Typography>
            </CreateButton>
            <EditCreateDiaryPage
                isCreate={true}
                open={ECopen}
                handleClose={handleECclose}
            />
        </div>
      )
    }

    return (
        <div>
            <Button onClick={handleECopen}>編輯</Button>
            <EditCreateDiaryPage
                isCreate={false}
                open={ECopen}
                handleClose={handleECclose}
                id={id}
                description={description}
                date={date}
                tags={tags}
                emotions={emotions}
            />
        </div>
    )
  }