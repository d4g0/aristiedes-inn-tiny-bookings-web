import { gql } from "~/utils";

export const updateRoomNightPrice = gql`
mutation updateNightPrice($input:UpdateRoomNightPriceInput!){
  updateRoomNightPrice(input:$input){
    id
    hotel_id
    room_name
    night_price
  }
}
`