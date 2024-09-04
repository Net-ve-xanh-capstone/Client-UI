import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Controller } from 'react-hook-form';
import { Fallback } from '../../constant/Fallback';
import dayjs from 'dayjs';
const DatepickerCommon = props => {
  const {
    control,
    error = '',
    disablePast = true,
    disableFuture = true,
    defaultValue,
    name,
    className,
    ...rest
  } = props;

  const minDate = dayjs('2001-01-01T00:00:00.000');
  return (
    <div>
      {error ? <span className="text-danger h5">{error}</span> : null}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        onChange={e => e.preventDefault()}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              disableFuture={disableFuture}
              minDate={minDate}
              onChange={(value, event) => {
                onChange(value);
              }}
              slotProps={{ textField: { variant: 'standard' } }}
              sx={{
                width: '80%',
                '& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before': {
                  content: 'none',
                },
              }}
              onKeyDown={e => e.preventDefault()}
              value={value}
              {...rest}
            />
          );
        }}></Controller>
    </div>
  );
};

export default withErrorBoundary(DatepickerCommon, {
  FallbackComponent: Fallback,
});
