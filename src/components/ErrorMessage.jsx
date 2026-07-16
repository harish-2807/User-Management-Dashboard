function ErrorMessage({ message }) {
  return (
    <div className="error-card" role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;
