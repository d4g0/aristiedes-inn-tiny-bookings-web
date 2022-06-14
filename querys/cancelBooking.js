import { gql } from "~/utils";

export const gencancelABooking = (id = 1) => gql`
  mutation cancelABooking {
    cancelBooking(bookingId: ${id}) {
      id
      client_id
      hotel_id
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
