import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableItems from './TableItems';
import DroppableCanvas from './DropTableCanvas';
import TableDetailsForm from './TableDetailsForm';
import DraggableTable from './DraggableTable';
import AddRoomModal from './AddRoomModel';
import { useDispatch } from "react-redux";
import { addRoom, addTable } from "../redux/tableSlice";

const FloorManagement = () => {
  const [tables, setTables] = useState([]);
  // const [rooms, setRooms] = useState([{ id: '1', name: 'Main Room' }]); 
  const [rooms, setRooms] = useState([]); 
  const [value, setValue] = useState('1'); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState(''); 
  const [positionX, setPositionX] = useState(); 
  const [positionY, setPositionY] = useState();
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState(null);

  const handleAddTable = (table) => {
    const newTable = {
      id: `${table.id}-${tables.length + 1}`,
      shape: table.shape,
      minCovers: table.minCovers,
      maxCovers: table.maxCovers,
    };
    setTables([...tables, newTable]);
  };

  const handleDeleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewRoomName('');
  };

  const handleSaveRoom = () => {
    if (newRoomName.trim() === '') return; 
    const newRoomId =  `room-${Date.now()}`; 
    dispatch(addRoom({ id: newRoomId, name: newRoomName }));
    setRoomName("");
    setRooms([...rooms, { id: newRoomId, name: newRoomName }]); 
    setValue(newRoomId); 
    handleCloseModal(); 
  };

  const handleAddTableToRoom = (roomId, tableData) => {
    dispatch(
      addTable({
        roomId,
        table: {
          ...tableData,
          x: positionX || 0, // Optional: Include position
          y: positionY || 0,
        },
      })
    );
  };

  const getRelativeCoords = (event) => {
    setPositionX(event.pageX)
    setPositionY(event.pageY)
  }

  const handleTableClick = (table) => {
    console.log(" execute the function inside ")
    setSelectedTable(table);
    console.log(" Choose table =======>>>>>", selectedTable)
  }

  const handleRoomSubmit = () => {
    alert('added succefully')
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex" height="100vh">
        {/* Left Panel */}
        <Box width="20%" p={2} bgcolor="#f5f5f5" display="flex" flexDirection="column">
          <Typography variant="h3">Tables</Typography>
          <hr />
          <TableItems onAddTable={handleAddTable} onClick={handleTableClick}/>
          <TableDetailsForm 
            roomId={value}
            tableId={`table-${Date.now()}`} 
            onSubmit={handleAddTableToRoom}
            selectedTable={selectedTable}
          />
        </Box>

        {/* Main Canvas */}
        <Box flex={1} p={2} position="relative">
          <Box component="section" sx={{ p: 2 }}>
            <Button variant="contained" color="success" onClick={handleOpenModal}>
              Add Room
            </Button>
            <Button variant="outlined" style={{marginLeft:'10px'}} onClick={handleRoomSubmit}>Save Room</Button>
          </Box>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  {rooms.map((room) => (
                    <Tab key={room.id} label={room.name} value={room.id} />
                  ))}
                </TabList>
              </Box>
              {rooms.map((room) => (
                <TabPanel key={room.id} value={room.id} style={{border:'1px sild red'}}>
                  <div onMouseMove={(event) => getRelativeCoords(event)}>
                    <DroppableCanvas
                      id="canvas"
                      positionX={positionX}
                      positionY={positionY}
                      tables={tables}
                      onDeleteTable={handleDeleteTable}
                      roomId={room.id} 
                    />
                  </div>

                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </Box>

        {/* Footer */}
        <Box position="fixed" bottom={0} width="100%" bgcolor="#ddd" p={2}>
          <Typography>
            {tables.length} Tables | Online Capacity: {tables.length * 4} Max Covers
          </Typography>
        </Box>
      </Box>

      {/* Modal for Adding Room */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            fullWidth
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveRoom} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* <AddRoomModal  open={isModalOpen} onClose={handleCloseModal}/> */}
    </DndProvider>
  );
};

export default FloorManagement;
