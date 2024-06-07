import { AxiosResponse } from "axios";
import { AUTH_TOKEN } from "../../core/constants/keys-constans";
import axiosInstance from "../axios-instace";
import { Booking } from "../models/booking-model";

async function apiGetBookings ({ page, size }: { page: number, size: number }): Promise<AxiosResponse<{ message: string, data: Booking[] }>> {
  return await axiosInstance.get(`/api/booking/list`, {
    headers: getHeaders(),
    params: {
      page,
      size
    }
  });
}

async function apiDeleteBooking ({ idBooking: idBooking }: { idBooking: number }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.delete(`/api/booking/delete`, {
    headers: getHeaders(),
    params: {
      id_booking: idBooking
    }
  });
}

async function apiCreateBooking ({ id_room, entry_date, exit_date }: { id_room: number, entry_date: string, exit_date: string }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.post(`/api/booking/create`,
    {
      id_room,
      entry_date,
      exit_date
    },
    {
      headers: getHeaders()
    }
  );
}

async function apiUpdateBooking ({ id_booking, id_room, entry_date, exit_date }: { id_booking: number, id_room: number, entry_date: string, exit_date: string }): Promise<AxiosResponse<{
  status: boolean,
  menssage: string
}>> {
  return await axiosInstance.post(`/api/booking/update`,
    {
      id_booking,
      id_room,
      entry_date,
      exit_date
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

export const bookingService = {
  getBokings: apiGetBookings,
  deleteBooking: apiDeleteBooking,
  createBooking: apiCreateBooking,
  updateBooking: apiUpdateBooking,
}