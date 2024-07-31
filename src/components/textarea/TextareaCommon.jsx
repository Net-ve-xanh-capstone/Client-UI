import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import classNames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../constant/Fallback';

export const TextareaCommon = (props) => {
  const { control, name, placeholder, className, error = '', children, defaultValue, ...rest } = props;

  const { field: {value, onChange}  } = useController({
    control,
    name,
    defaultValue,
  });
  
  return (
    <div>
      {error ? <span className="text-danger h5">{error}</span> : null}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        className={classNames(className, error.length > 0 ? 'border-danger' : '', children)}
      />
      {children && <span className="select-none">{children}</span>}
    </div>
  );
};

TextareaCommon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired
};

export default withErrorBoundary(TextareaCommon, {
  FallbackComponent: Fallback
});
