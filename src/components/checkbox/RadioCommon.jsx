import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Controller } from 'react-hook-form';
import { Fallback } from '../../constant/Fallback';

const RadioCommon = props => {
    const { control, error = '', name, valueArray, defaultValue, ...rest } = props;
    return (
        <div>
            {error ? <span className="text-danger h5">{error}</span> : null}
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue ? 1 : 0}
                rules={{ required: true }}
                render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                }) => {
                    return (
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            value={value}
                            onChange={event => onChange(event.target.value)}
                            sx={{ marginTop: '10px' }}
                        >
                            {valueArray.map((item, index) => {
                                return (
                                    <FormControlLabelStyled
                                        key={index}
                                        control={<Radio />}
                                        value={item.value}
                                        label={item.label}
                                        {...rest}
                                    />
                                );
                            })}
                        </RadioGroup>
                    );
                }}
            />
        </div>
    );
};

const FormControlLabelStyled = styled(FormControlLabel)({
    '& .MuiSvgIcon-root': {
        fontSize: 24,
    },
    // Font size
    '& .MuiTypography-root': {
        fontSize: 16,
        fontFamily: 'REM',
    },
});

export default withErrorBoundary(RadioCommon, {
    FallbackComponent: Fallback,
});
