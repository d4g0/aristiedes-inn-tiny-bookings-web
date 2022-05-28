import { gql } from "~/utils";

export const genDellHotelQuery = (id = 1) => gql`
mutation DellHotel {
  delHotel(id: ${id}){
    id
    hotel_name
  }
}
`