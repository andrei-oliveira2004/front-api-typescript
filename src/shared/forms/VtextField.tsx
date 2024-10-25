import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface VTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;  
  control: Control<any>;  
}

const VTextField: React.FC<VTextFieldProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          onChange={(e) => field.onChange(e)}
        />
      )}
    />
  );
};

export default VTextField;
