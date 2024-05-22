import { Button } from '@mui/material';
import React from 'react';

export const ButtonComponent = ({ children, ...props }) => {
    return (
        <>
            <Button variant="contained" {...props} sx={{ margin: "5px 10px" }}>
                {children}
            </Button>
        </>
    )
}

// export const ButtonComponent = ({ ...props }) => {
//     return (
//         <Button variant="contained" className={props.className} onClick={props.onClick} disabled={props.disabled}>
//             {props.buttonValue}
//         </Button>
//     )
// }
