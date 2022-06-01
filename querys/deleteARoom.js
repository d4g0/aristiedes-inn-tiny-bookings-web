import { gql } from "~/utils";

export const deleteARoom = gql`
mutation deleteARoom($input: DeleteRoomInput!){
	deleteRoom(input:$input){
    completed
    count
  }
}
`