import { gql } from "~/utils";

export const updateRoomAmenity = gql`
mutation UpdateRoomAmenity ($input:RoomAmenityUpdateInput!){
  updateRoomAmenity(input:$input){
     id,
     amenity
   }
 }
`