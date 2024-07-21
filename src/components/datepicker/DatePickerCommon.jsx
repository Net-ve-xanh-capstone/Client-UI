import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Controller } from 'react-hook-form';
import { Fallback } from '../../constant/Fallback';
const DatepickerCommon = (props) => {
  const { control, error = '', disablePast = true, defaultValue, name, className, ...rest } = props;
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
