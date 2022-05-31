import { gql } from "~/utils";

export const deleteRoomAmenity = gql`
mutation delRoomAmenity ($input: RoomAmenityInput!){
  deleteRoomAmenity(input:$input){
     id,
     amenity
   }
}
`