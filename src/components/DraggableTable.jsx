import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Draggable from 'react-draggable';
import { Delete, RotateRight } from '@mui/icons-material';
import { Box, Grid, Typography, IconButton } from '@mui/material';


const DraggableTable = ({ id, position,onDeleteTable, tables }) => {

    const [droppedTables, setDroppedTables] = useState([]);
    const handleDrag = (e, data) => {
        console.log('Position =======:', data.x, data.y);
    }
    return (
        <Draggable>
            <div>
            <Box
            p={2}
            border={ '2px dashed gray'}
            borderRadius="8px"
            height="75vh"
            bgcolor="transparent"
            position="relative"
        >
            {/* Display Dropped Tables */}
            {droppedTables.map((table, index) => (
                <Box
                    key={`${table.id}-${index}`}
                    position="absolute"
                    left={table.x}
                    top={table.y}
                    //   border="1px solid gray"
                    borderRadius="4px"
                    bgcolor="white"
                    p={1}
                    textAlign="center"
                    draggable="false" // Prevent native dragging after drop
                >
                    <Typography>{table.id}</Typography>
                    <img src={table.image}></img>
                    <Box mt={1}>
                        <IconButton onClick={() => onDeleteTable(table.id)}>
                            <Delete />
                        </IconButton>
                        <IconButton>
                            <RotateRight />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Box>
        </div>
        </Draggable>
    );
};

export default DraggableTable;
