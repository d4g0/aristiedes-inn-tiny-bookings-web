import { gql } from "~/utils";

export const getAllRoomLocks = gql`
  query getAllRoomLocks($input: GetAllRoomLocksInput!) {
    getAllRoomLocks(input: $input) {
      id
      room_id
      start_date
      end_date
      reason
      is_a_booking
      booking_id
    }
  }
`;
