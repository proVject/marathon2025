export interface PersonalToDeleteProps {
  firstName: string;
  lastName: string;
}

export interface ParticipantDeleteModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onDelete: () => void;
  personalInfoData: PersonalToDeleteProps;
}
