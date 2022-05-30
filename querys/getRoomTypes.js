import { gql } from "~/utils";

export const getRoomTypes = gql`
query getRoomTypes{
  getRoomTypes{
    id
    room_type
  }
}
`