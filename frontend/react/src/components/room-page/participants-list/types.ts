import type { GetParticipantsResponse, GetRoomResponse } from "@types/api.ts";

export interface ParticipantsListProps {
  roomDetails: GetRoomResponse;
  participants: GetParticipantsResponse;
  onDeleteUser: (id?: number) => void;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  deliveryInfo: string;
  link?: string;
}
export interface PersonalToDelete {
  id: number;
  firstName: string;
  lastName: string;
}
