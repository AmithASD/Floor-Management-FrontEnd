import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Draggable from 'react-draggable';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Delete, RotateRight, ViewHeadline } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTable, updateTable } from '../redux/tableSlice';

const DroppableCanvas = ({ onDeleteTable, roomId }) => {
    const [droppedTables, setDroppedTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const dispatch = useDispatch()

    // const [{ isOver }, dropRef] = useDrop({
    //     accept: 'table',
    //     drop: (item, monitor) => {
    //         const offset = monitor.getClientOffset();
    //         const newTable = {
    //             ...item,
    //             x: offset.x,
    //             y: offset.y,
    //         };
    //         console.log("offset.x ====>", offset.x)
    //         setDroppedTables((prev) => [...prev, newTable]);
    //     },
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // });

    const controlledPosition = (e) => {
        console.log("position ====> ", e.pageX)
    }
    const tables = useSelector((state) => {
        const room = state.tables.rooms.find((room) => room.id === roomId);
        return room ? room.tables : [];
    });

    const handleDeleteTable = (tableId) => {
        dispatch(removeTable({ roomId, tableId }));
    };

    const handleTableDoubleClick = (table) => {
        setSelectedTable(table);
        setEditModalOpen(true);
    };

    const handleSaveTableChanges = () => {
        if (selectedTable) {
            const { id, x, y, ...updatedData } = selectedTable;
            dispatch(
                updateTable({
                    roomId,
                    tableId: id,
                    x,
                    y,
                    ...updatedData, // Pass any other updated data
                })
            );
        }
        setEditModalOpen(false);
    };

    const handleDragStop = (e, data, tableId) => {
        const canvasWidth = 100;
        const canvasHeight = 800;
        const tableWidth = 100; 
        const tableHeight = 100; 
        
        const correctedX = Math.max(0, Math.min(data.x, canvasWidth - tableWidth));
        const correctedY = Math.max(0, Math.min(data.y, canvasHeight - tableHeight));

        dispatch(updateTable({ roomId, tableId, x: correctedX, y: correctedY }));
    };


    return (
        <Box
            // ref={dropRef}
            p={2}
            border={ '2px dashed gray'}
            borderRadius="8px"
            height="75vh"
            width='73vw'
            bgcolor="transparent"
            position="relative"
            id="main-room-outer"
        >
            {/* Display Dropped Tables */}
            {/* {droppedTables.map((table, index) => ( */}
            {tables.map((table, index) => (
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                     bounds="#main-room-outer"
                    onMouseDown={(event) => controlledPosition(event)}
                    onStop={(e, data) => handleDragStop(e, data, table.id)}
                >
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
                        draggable="false"
                        onDoubleClick={() => handleTableDoubleClick(table)}
                    >
                        <Typography>{table.name}</Typography>
                        <img src={table.image}></img>

                        <Box mt={1}>
                            <IconButton onClick={() => handleDeleteTable(table.id)}>
                                <Delete />
                            </IconButton>
                            <IconButton>
                                <RotateRight />
                            </IconButton>
                        </Box>

                        {/* Modal for Editing Table */}
                        <Dialog
                            open={isEditModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            maxWidth="sm"
                            fullWidth
                        >
                            <DialogTitle>Edit Table</DialogTitle>
                            <DialogContent>
                                {selectedTable && (
                                    <>
                                        <TextField
                                            margin="dense"
                                            label="Name"
                                            fullWidth
                                            value={selectedTable.name}
                                            onChange={(e) =>
                                                setSelectedTable({ ...selectedTable, name: e.target.value })
                                            }
                                        />
                                        <TextField
                                            margin="dense"
                                            label="Min Covers"
                                            type="number"
                                            fullWidth
                                            value={selectedTable.minCovers}
                                            onChange={(e) =>
                                                setSelectedTable({
                                                    ...selectedTable,
                                                    minCovers: e.target.value,
                                                })
                                            }
                                        />
                                        <TextField
                                            margin="dense"
                                            label="Max Covers"
                                            type="number"
                                            fullWidth
                                            value={selectedTable.maxCovers}
                                            onChange={(e) =>
                                                setSelectedTable({
                                                    ...selectedTable,
                                                    maxCovers: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
                                <Button
                                    onClick={handleSaveTableChanges}
                                    variant="contained"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Draggable>
            ))}
        </Box>
    );
};

export default DroppableCanvas;
