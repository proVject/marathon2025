import Modal from "../modal/Modal";
import type { ParticipantDeleteModalProps } from "./types";
import Button from "@components/common/button/Button.tsx";
import "./ParticipantDeleteModal.scss";

const ParticipantDeleteModal = ({
  isOpen = false,
  onClose,
  onDelete,
  personalInfoData,
}: ParticipantDeleteModalProps) => {
  const fullName = `${personalInfoData.firstName} ${personalInfoData.lastName}`;
  const description = (
    <>
      Are you sure you want to delete <b>{fullName}</b> from the from the romm?
    </>
  );

  const customButtons = (
    <div className="participant-delete-modal participant-delete-modal__custom-button">
      <Button variant="secondary" size="medium" width={225} onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" size="medium" width={225} onClick={onDelete}>
        Remove participant
      </Button>
    </div>
  );

  return (
    <Modal
      title="Remove participant"
      description={description}
      iconName="delete"
      iconSize="small"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onClose}
      customButtons={customButtons}
    >
      <></>
    </Modal>
  );
};
export default ParticipantDeleteModal;
