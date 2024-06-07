import { AxiosResponse } from "axios";
import { Room } from "../models/rooms-model";
import axiosInstance from "../axios-instace";
import { AUTH_TOKEN } from "../../core/constants/keys-constans";

async function apiGetRooms ({ page, size }: { page: number, size: number }): Promise<AxiosResponse<{ message: string, data: Room[] }>> {
  return await axiosInstance.get(`/api/room/list`, {
    params: {
      page,
      size
    }
  });
}

async function apiDeleteRoom ({ idRoom }: { idRoom: number }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.delete(`/api/room/delete`, {
    headers: getHeaders(),
    params: {
      id_room: idRoom
    }
  });
}

async function apiCreateRoom ({ number, type, value }: { number: number, type: string, value: number }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.post(`/api/room/create`,
    {
      number,
      type,
      value
    },
    {
      headers: getHeaders()
    }
  );
}

async function apiUpdateRoom ({ id_room, number, type, value }: { id_room: number, number: number, type: string, value: number }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.post(`/api/room/update`,
    {
      id_room,
      number,
      type,
      value
    },
    {
      headers: getHeaders()
    }
  );
}

function getHeaders (): { Authorization: string } {
  const token = localStorage.getItem(AUTH_TOKEN);
  return { "Authorization": `Bearer ${token}` }
}

export const roomService = {
  getRooms: apiGetRooms,
  deleteRoom: apiDeleteRoom,
  createRoom: apiCreateRoom,
  updateRoom: apiUpdateRoom,
}