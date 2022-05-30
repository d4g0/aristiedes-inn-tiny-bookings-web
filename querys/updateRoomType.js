import { gql } from "~/utils";

export const updateRoomType = gql`
mutation UpdateRoomType ($input: RoomTypeUpdateInput!){
  updateRoomType(input:$input){
    id,
    room_type
  }
}
`