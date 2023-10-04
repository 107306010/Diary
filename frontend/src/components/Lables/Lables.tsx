import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export type LabelProps = {
    labelarr: { key: number, label: string }[],
    handleSelectionChanged?: (id: number) => void,
    selected?: Set<Number>,
    displayOnly?: boolean,
}
export type LabelArr = Pick<LabelProps, 'labelarr'>;

export default function Labels({labelarr, handleSelectionChanged, selected, displayOnly}: LabelProps){
    // const [labelData, setLabelData] = useState(labelarr);
    if (displayOnly){
        return (
            <Stack direction="row" spacing={1}>
                {labelarr.map((data) => {
                    return (
                        <Chip
                            key={data.key}
                            label={data.label}
                            variant="filled"
                        />
                    );
                })}
            </Stack>
        )
    }

    if (handleSelectionChanged !== undefined && selected !== undefined){
        return (
            <Stack direction="row" spacing={1}>
                {labelarr.map((data) => {
                    return (
                        <Chip
                            key={data.key}
                            label={data.label}
                            onClick={() => handleSelectionChanged(data.key)}
                            variant={selected.has(data.key) ? "filled" : "outlined"}
                        />
                    );
                })}
            </Stack>
        );
    }
}