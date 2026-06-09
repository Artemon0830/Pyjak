import { StatusEnum } from "../enums/status.enum";

export interface IPlace {
  _id: string

  name: string
  description: string

  address: Address[]

  phone?: string
  email?: string
  website?: string

  _userId: string | undefined

  photos: string[]

  rating: number
  averageCheck: number

  tags: string[]
  features: string[]

  workSchedule: WorkSchedule[]

  status: StatusEnum
  rejectReason: string

  createdAt: Date
  updatedAt: Date
}

export interface WorkSchedule {
  day: string
  open: string
  closed: string
}

export interface Address {
  country?: string
  city: string
  street: string
  houseNumber: string
  postalCode?: string
}
export type ICreatePlace = Omit<
  IPlace,
  "_id" | "createdAt" | "updatedAt" | "rating" | "rejectReason"
>