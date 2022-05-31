import { gql } from "~/utils";

export const createRoomAmenity = gql`
mutation CreateRoomAmenity ($input: RoomAmenityInput!){
  createRoomAmenity(input:$input){
    id,
    amenity
  }
}
`