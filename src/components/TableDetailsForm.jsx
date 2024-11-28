import React from 'react';
import { Form, useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Switch, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { CheckBox, Label } from '@mui/icons-material';

const TableDetailsForm = ({ roomId, tableId, onSubmit , selectedTable}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const handleFormSubmit = (data) => {
    const tableData = {
      id: tableId,
      ...data,
      online: data.online || false,
      image:selectedTable.image,
      shape:selectedTable.shape,
    };
    onSubmit(roomId, tableData);
    reset(); // resert form inputs values
  };

  const { control } = useForm({
    progressive: true
  });

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h6" mt={2}>Table Details</Typography>
      {/* <Form onSubmit={onSubmit}  method="post" control={control}> */}
      <FormGroup>
        <TextField
          label="Table Name"
          fullWidth
          margin="dense"
          {...register('name', { required: 'Table Name is required' })}
          error={!!errors.tableName}
          helperText={errors.tableName?.message}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Min Covers"
          type="number"
          fullWidth
          margin="dense"
          {...register('minCovers', {
            required: 'Min Covers is required',
            valueAsNumber: true,
            min: { value: 1, message: 'Min Covers must be at least 1' },
          })}
          error={!!errors.minCovers}
          helperText={errors.minCovers?.message}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Max Covers"
          type="number"
          fullWidth
          margin="dense"
          {...register('maxCovers', {
            required: 'Max Covers is required',
            valueAsNumber: true,
            min: { value: 1, message: 'Max Covers must be at least 1' },
          })}
          error={!!errors.maxCovers}
          helperText={errors.maxCovers?.message}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch {...register('online')} />}
          label="Online"
        />
      </FormGroup>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
      {/* </Form> */}

      <FormGroup style={{marginTop:'50px'}}>
         <FormControlLabel  control={<Checkbox />} label="Advanced Settings" />
      </FormGroup>
    </Box>
  );
};

export default TableDetailsForm;
