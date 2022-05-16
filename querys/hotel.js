import { gql } from "~/utils";

export const genhotelQuery = (id = 1) => gql`
query Hotel{
    hotel(id:${id}){
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