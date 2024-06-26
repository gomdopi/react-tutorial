import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">
      <strong>{children}</strong>
      <button className="btn-close" data-bs-dismiss="alert" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
