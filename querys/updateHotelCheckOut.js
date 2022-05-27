import { gql } from "~/utils/index"

export const updateHotelCheckOut = gql`
mutation updateHotelCheckOut($input: UpdateHotelCheckOut!){
  updateHotelCheckOut(input:$input){
    id
    hotel_name
    check_out_hour_time
  }
}
`