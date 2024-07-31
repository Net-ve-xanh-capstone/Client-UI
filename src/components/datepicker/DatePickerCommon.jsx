import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Controller } from 'react-hook-form';
import { Fallback } from '../../constant/Fallback';
const DatepickerCommon = (props) => {
  const { control, error = '', disablePast = true, disableFuture = true, defaultValue, name, className, ...rest } = props;
  return (
    <div>
      {error ? <span className="text-danger h5">{error}</span> : null}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              disableFuture={disableFuture}
              slotProps={{ textField: { variant: 'standard', 
                }}}
              sx={{ width: '100%',
                '& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before': {
                  content: 'none',
                },
              }}
              onChange={onChange}
              onAccept={onChange}
              value={value}
              {...rest}
            />
          );
        }}
      ></Controller>
    </div>
  );
};

export default withErrorBoundary(DatepickerCommon, {
  FallbackComponent: Fallback
});
