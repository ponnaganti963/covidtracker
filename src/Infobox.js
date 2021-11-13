import { Card ,CardContent, Typography} from '@mui/material'
import React from 'react';
import './Infobox.css';

function Infobox({ title , cases ,isRed,active, total, ...props}) {

    return (

        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'Red--Info'}`}
            onClick = {props.onClick}
        >
            <CardContent>
                <Typography color='textSecondary' className='infoBox_title'>
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${isRed && 'Red--Info'}`}>{cases}</h2>
                <Typography className='infoBox_total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
