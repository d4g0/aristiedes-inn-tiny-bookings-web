import { gql } from "~/utils";

export const updateRoomCapacity = gql`
mutation updateCapacity($input:UpdateRoomCapacityInput!){
  updateRoomCapacity(input:$input){
    id
    room_name
    capacity
  }
}
`