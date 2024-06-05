import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? Component : <Redirect to="/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
export default ProtectedRoute;
