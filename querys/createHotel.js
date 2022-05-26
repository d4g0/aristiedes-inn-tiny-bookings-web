import { gql } from "~/utils/index"

export const createHotel = gql`
mutation createHotel($input: HotelInput!){
    createHotel(input: $input){
        id
        hotel_name
        maximun_free_calendar_days
        check_in_hour_time
        check_out_hour_time
        minimal_prev_days_to_cancel
        iana_time_zone
    }
}
`