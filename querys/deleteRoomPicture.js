import { gql } from "~/utils";

export const deleteRoomPicture = gql`
mutation deleteRoomPicture($input: DeleteRoomPictureInput!){
  deleteRoomPicture(input: $input){
    id
    room_id
    filename
  }
}
`