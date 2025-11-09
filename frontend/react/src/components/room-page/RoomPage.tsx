import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type {
  GetParticipantsResponse,
  GetRoomResponse,
  DrawRoomResponse,
} from "@types/api.ts";
import Loader from "@components/common/loader/Loader.tsx";
import { useFetch } from "@hooks/useFetch.ts";
import useToaster from "@hooks/useToaster.ts";
import { BASE_API_URL } from "@utils/general.ts";
import RoomPageContent from "./room-page-content/RoomPageContent.tsx";
import { ROOM_PAGE_TITLE } from "./utils.ts";
import "./RoomPage.scss";

const RoomPage = () => {
  const { showToast } = useToaster();
  const { userCode } = useParams();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    document.title = ROOM_PAGE_TITLE;
  }, []);

  const {
    data: roomDetails,
    isLoading: isLoadingRoomDetails,
    fetchData: fetchRoomDetails,
  } = useFetch<GetRoomResponse>(
    {
      url: `${BASE_API_URL}/api/rooms?userCode=${userCode}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      onError: () => {
        showToast("Something went wrong. Try again.", "error", "large");
      },
    },
    true,
  );

  const {
    data: participants,
    isLoading: isLoadingParticipants,
    fetchData: fetchParticipants,
  } = useFetch<GetParticipantsResponse>({
    url: `${BASE_API_URL}/api/users?userCode=${userCode}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    onError: () => {
      showToast("Something went wrong. Try again.", "error", "large");
    },
  });

  const { fetchData: fetchRandomize, isLoading: isRandomizing } =
    useFetch<DrawRoomResponse>(
      {
        url: `${BASE_API_URL}/api/rooms/draw?userCode=${userCode}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        onSuccess: () => {
          showToast(
            "Success! All participants are matched.\nLet the gifting magic start!",
            "success",
            "large",
          );
          fetchRoomDetails();
          fetchParticipants();
        },
        onError: () => {
          showToast("Something went wrong. Try again.", "error", "large");
        },
      },
      false,
    );

  const { fetchData: deleteUser, isLoading: isDeleting } = useFetch<void>(
    {
      url: `${BASE_API_URL}/api/users/${idToDelete}?userCode=${userCode}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      onSuccess: () => {
        showToast(
          "Success! The participant was removed successfully.",
          "success",
          "large",
        );
        fetchRoomDetails();
        fetchParticipants();
      },
      onError: () => {
        showToast("Something went wrong. Try again.", "error", "large");
      },
    },
    false,
  );

  const onDeleteUser = (id?: number) => {
    if (!id) {
      showToast("Something went wrong. Try again.", "error", "large");
      return;
    }

    setIdToDelete(id);
  };

  useEffect(() => {
    if (!idToDelete) return;

    deleteUser();
    setIdToDelete(null);
  }, [deleteUser, idToDelete]);

  const isLoading =
    isLoadingRoomDetails ||
    isLoadingParticipants ||
    isRandomizing ||
    isDeleting;

  if (!userCode) {
    showToast("Something went wrong. Try again.", "error", "large");
    return null;
  }

  return (
    <main className="room-page">
      {isLoading ? <Loader /> : null}

      <RoomPageContent
        participants={participants ?? []}
        roomDetails={roomDetails ?? ({} as GetRoomResponse)}
        onDrawNames={() => fetchRandomize()}
        onDeleteUser={onDeleteUser}
      />
    </main>
  );
};

export default RoomPage;
