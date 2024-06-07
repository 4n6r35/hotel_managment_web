import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Room } from "../../data/models/rooms-model"

interface RoomModalZustand {
  createRoom: {
    isOpen: boolean
    callback: () => void
  },
  editRoom: {
    isOpen: boolean
    room: Room,
    callback: () => void
  },
}

interface RoomModalZustandActions {
  tooggleModalRoomCreate: () => void,
  tooggleModalRoomUpdate: (room: Room) => void,
  tooggleModalRoomUpdateClose: () => void,
}


export const roomModalZustand = create(
  persist<RoomModalZustand & RoomModalZustandActions>((set) => ({
    createRoom: {
      isOpen: false,
      callback: () => { }
    },
    editRoom: {
      isOpen: false,
      room: {
        id_room: 0,
        number: 0,
        type: "",
        value: "",
        is_available: false,
        state: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      callback: () => { }
    },
    deleteRoom: {
      isOpen: false,
      callback: () => { }
    },
    tooggleModalRoomCreate: () => {
      set(state => ({
        createRoom: {
          ...state.createRoom,
          isOpen: !state.createRoom.isOpen
        }
      }))
    },
    tooggleModalRoomUpdate: (room: Room) => {
      set(state => ({
        editRoom: {
          ...state.editRoom,
          room: room,
          isOpen: !state.editRoom.isOpen
        }
      }))
    },
    tooggleModalRoomUpdateClose: () => {
      set(state => ({
        editRoom: {
          ...state.editRoom,
          isOpen: false
        }
      }))
    },
  }),
    {
      name: 'rooms-modal',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)