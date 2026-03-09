import { useState } from 'react';

interface Props {
  heading: string;
  message: string;
}

const Alert = ({ heading, message }: Props) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>{heading}</strong> {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setVisible(false)}
      ></button>
    </div>
  );
};

export default Alert;
