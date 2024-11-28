import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../redux/tableSlice";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AddRoomModal = ({ open, onClose }) => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([{ id: '1', name: 'Main Room' }]); 

  const handleAddRoom = () => {
    const roomId = `room-${Date.now()}`; 
    dispatch(addRoom({ id: roomId, name: roomName }));
    setRoomName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Room NJew</DialogTitle>
      <DialogContent>
        <TextField
          label="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddRoom} color="primary">Add Room</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomModal;
