import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { addTable } from "../redux/tableSlice";

const TableItemDraggable = ({ table, roomId, onClick }) => {
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);

    const [, dragRef] = useDrag({
        type: 'table',
        item: table,
        end: (item) => {
            if (item) {
                dispatch(
                    addTable({
                        roomId,
                        table: { ...item, id: `table-${Date.now()}`, x: 0, y: 0 },
                    })
                );
            }
        },
    });

    const handleTableClick = () => {
        setIsSelected((prev) => !prev); // Toggle the selected state
    };

    return (
        <Box
            ref={dragRef}
            sx={{
                border: `2px solid ${isSelected ? 'blue' : 'red'}`,
                borderRadius: '4px',
                padding: 1,
                textAlign: 'center',
                cursor: 'grab',
                width: '250px',
                bgcolor: '#f9f9f9',
            }}
            onClick={onClick}

        >
            <img
                src={table.image}
                alt={`${table.shape} Table`}
                style={{ width: '100%', height: '100%', marginBottom: '8px', bgcolor: 'transparent' }}
            />
            {/* <Typography variant="body1">{table.id}</Typography> */}
            <Typography variant="body2" color="textSecondary">
                {table.shape}
            </Typography>
            {/* <Typography variant="body2">
                Covers: {table.minCovers}-{table.maxCovers}
            </Typography> */}
        </Box>
    );
};

export default TableItemDraggable;
