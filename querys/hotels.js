import { gql } from "~/utils";

export const getHotels = gql`
{
  hotels{
    id
    hotel_name
    maximun_free_calendar_days
    check_in_hour_time
    check_out_hour_time
    iana_time_zone
  }
}
`