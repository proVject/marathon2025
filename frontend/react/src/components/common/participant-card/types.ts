import type { GetRoomResponse } from "@types/api.ts";

export interface ParticipantCardProps {
  roomDetails: GetRoomResponse;
  firstName: string;
  lastName: string;
  isCurrentUser?: boolean;
  isAdmin?: boolean;
  isCurrentUserAdmin?: boolean;
  adminInfo?: string;
  participantLink?: string;
  onInfoButtonClick?: () => void;
  onDeleteButtonClick: () => void;
}
