import { gql } from "~/utils";

export const updateNumberOfBeds = gql`
mutation updateNumberOfBeds($input:UpdateRoomNumberOfBedsInput!){
  updateRoomNumberOfBeds(input:$input){
    id
    room_name
    number_of_beds
  }
}
`