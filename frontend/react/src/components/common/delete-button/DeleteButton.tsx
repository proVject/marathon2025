import IconButton from "../icon-button/IconButton";
import type { DeleteButtonProps } from "./types";
import "./DeleteButton.scss";

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <div className="delete-button">
      <IconButton iconName="delete" color="red" onClick={onClick} />
    </div>
  );
};

export default DeleteButton;
