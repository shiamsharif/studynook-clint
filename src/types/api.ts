export interface User {
  _id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface Owner {
  _id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

export interface Room {
  _id: string;
  roomName: string;
  description: string;
  image: string;
  floor: string | number;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  owner: string | Owner;
  bookingCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomInput {
  roomName: string;
  description: string;
  image: string;
  floor: string;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
}

export type BookingStatus = "confirmed" | "cancelled" | string;

export interface Booking {
  _id: string;
  room: Room | string;
  date: string;
  startTime: string;
  endTime: string;
  specialNote?: string;
  totalCost: number;
  cost?: number;
  status: BookingStatus;
}

export interface BookingInput {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  specialNote: string;
}

export interface ValidationError {
  path?: string;
  field?: string;
  message: string;
}

export interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
  user?: User;
  room?: Room;
  rooms?: Room[];
  booking?: Booking;
  bookings?: Booking[];
}
