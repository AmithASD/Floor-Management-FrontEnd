import React from 'react';
import { Box, Typography } from '@mui/material';
import TableItemDraggable from './TableItemDragable';
import roundTable from '../assets/images/table/roundtble.jpg'
import squareTable from '../assets/images/table/squaretable.jpg'
import DoubleChairs from '../assets/images/table/doubleChairsjpg.jpg'

const TableItems = ({onClick}) => {
  const tableOptions = [
    { id: 'T-01', shape: 'Round-4', minCovers: 1, maxCovers: 4, image: roundTable },
    { id: 'T-02', shape: 'Square', minCovers: 2, maxCovers: 6, image: squareTable },
    { id: 'T-02', shape: 'Double', minCovers: 1, maxCovers: 2, image: DoubleChairs },
  ];

  return (
    <Box>
      <Typography variant="h6">Table Options</Typography>
      <Box display="flex" gap={2}>
        {tableOptions.map((table) => (
          <TableItemDraggable key={table.id} table={table} onClick={() => onClick(table)} />
        ))}
      </Box>
    </Box>
  );
};

export default TableItems;
