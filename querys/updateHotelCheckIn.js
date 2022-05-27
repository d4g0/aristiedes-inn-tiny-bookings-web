import { gql } from "~/utils/index"

export const updateHotelCheckIn = gql`
mutation updateHotelCheckIn($input: UpdateHotelCheckIn!){
    updateHotelCheckIn(input:$input){
      id
      hotel_name
      check_in_hour_time
    }
  }
`