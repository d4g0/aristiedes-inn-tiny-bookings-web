import { gql } from "~/utils";

export const updateRoomName = gql`
mutation updateRoomName($input: UpdateRoomNameInput!){
	updateRoomName(input:$input){
    id
    room_name
  }
}
`