import { Typography } from '@mui/material';

export const LabelComponent = ({ children, className = "d-inline mx-2 me-4", variant }) => {
    return (
        <>
            <Typography className={className} variant={variant}>
                {children}
            </Typography>
        </>
    )
};