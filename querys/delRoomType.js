import { gql } from "~/utils";

export const deleteRoomType = gql`
mutation DeleteRoomType ($input: RoomTypeInput!){
  deleteRoomType(input:$input){
    id,
    room_type
  }
}

`