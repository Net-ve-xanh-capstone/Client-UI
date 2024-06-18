import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import classNames from "classnames";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../../constant/Fallback";

export const TextFieldCommon = (props) => {
  const {
    control,
    name,
    type = "text",
    placeholder,
    className,
    error = "",
    children,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const handleOnChange = (e) => {
    e.target.classList.remove("border-danger placeholder-danger");
  };

  return (
    <div>
      {error ? <span className="text-danger h5">{error}</span> : null}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        {...field}
        {...rest}
        className={classNames(
          className,
          error.length > 0 ? "border-danger" : "",
          children
        )}
      />
      {children && <span className="select-none">{children}</span>}
    </div>
  );
};

TextFieldCommon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
};

export default withErrorBoundary(TextFieldCommon, {
  FallbackComponent: Fallback,
});
