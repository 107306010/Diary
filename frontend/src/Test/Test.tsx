// import * as React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';

// customization
const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    // width: 100,
    // color: theme.palette.success.main,
    // '& .MuiSlider-thumb': {
    //   '&:hover, &.Mui-focusVisible': {
    //     boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    //   },
    //   '&.Mui-active': {
    //     boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    //   },
    // },
  }));

export default function ContainedButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <CustomButton variant="contained">Contained</CustomButton>
      <CustomButton variant="contained" disabled>
        Disabled
      </CustomButton>
      <CustomButton variant="contained" href="#contained-Buttons">
        Link
      </CustomButton>
    </Stack>
  );
}