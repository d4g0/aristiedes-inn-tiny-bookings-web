import { gql } from "~/utils";

export const getRoomTypesQuery = gql`
query getRoomTypes{
  getRoomTypes{
    id
    room_type
  }
}
`