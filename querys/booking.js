import { gql } from "~/utils";

export const genBookingQuery = (id = 1) => gql`
{
  getBooking(id:${id}){
    id
    total_price
    start_date
    end_date
    number_of_guests
    client {
      client_name
      client_last_name
    }
  }
}
`