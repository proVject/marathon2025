import type { GetParticipantsResponse } from "@types/api.ts";

export interface ParticipantsListProps {
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
