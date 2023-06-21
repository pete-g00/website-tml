import React from 'react';
import { ButtonGroup, Button, Divider } from '@mui/material';

interface DrawerTileProps<E> {
    values:E[];
    activeOption?: E;
    title: string;
    onOptionChosen:(value:E) => void;
    convertToString:(value:E) => string;
}

function DrawerTile<E>({ values, activeOption, title, onOptionChosen, convertToString } : DrawerTileProps<E>) {
    return (<div className='editor-settings-tile'>
        <h3>{ title }</h3>
        <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
        {values.map((value, i) => {
            return <Button key={i}
                className={activeOption === value ? 'active-option' : undefined} 
                onClick={() => onOptionChosen(value)}>{convertToString(value)}</Button>;
        })}
        </ButtonGroup>
        <Divider />
    </div>);
}

export default DrawerTile;