import { gql } from "~/utils";

export const createABookingAsAdmin = gql`
  mutation createABookingAsAdmin($input: createBookingAsAdmin!) {
    createBookingAsAdmin(input: $input) {
      id
      hotel_id
      client_id
      booking_state
      total_price
      start_date
      end_date
      number_of_guests
      is_cancel
      created_at
    }
  }
`;
