import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
}

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    // Add a new room
    addRoom: (state, action) => {
      const { id, name } = action.payload;
      state.rooms.push({ id, name, tables: [] });
    },
    // Add a table to a room
    addTable: (state, action) => {
      const { roomId, table } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.tables.push(table);
      }
    },
    // Update table position (drag and drop)
    updateTable: (state, action) => {
      const { roomId, tableId, x, y, ...updatedData } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        const table = room.tables.find((t) => t.id === tableId);
        if (table) {
          table.x = x;
          table.y = y;
          Object.assign(table, updatedData); // Update other properties
        }
      }
    },
    // Delete a table
    removeTable: (state, action) => {
      const { roomId, tableId } = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
          room.tables = room.tables.filter((table) => table.id !== tableId);
      }
  },
  },
});

export const { addRoom, addTable, updateTable, removeTable } = tableSlice.actions;
export default tableSlice.reducer;

// Save state to localStorage
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem("floorManagementState", JSON.stringify(state));
};

// Load state from localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("floorManagementState");
    return savedState ? JSON.parse(savedState) : { rooms: [] };
  } catch (err) {
    console.error("Error loading from localStorage", err);
    return null;
  }
};


