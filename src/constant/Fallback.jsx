/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p className="h1 text-white bg-danger text-danger-sub p-2">Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
    </div>
  );
}
