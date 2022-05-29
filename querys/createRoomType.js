import { gql } from "~/utils";

export const createRoomType = gql`
mutation CreateRoomType ($input: RoomTypeInput!){
  createRoomType(input:$input){
    id,
    room_type
  }
}
`