import { gql } from "~/utils";

export const genGetBookingsQuery = (id = 1) => gql`
query getBookings($input: GetBookingsInput!){
  getBookings(input: $input){
    results{
      id
      hotel_id
#       booking_state
      total_price
      start_date
      end_date
#       number_of_guests
      is_cancel
      created_at
      client {
#       	id
        client_name
        client_last_name
#         email
      }
      rooms{
#         id
        room_name
        night_price
        capacity
        number_of_beds
#         created_at
#         room_type_id
        room_type_key
#         room_pictures{
#           room_picture_id
#           filename
#         }
#         room_amenities{
#           amenity_id
#           amenity
#         }
      }
    }
    count
  }
}
`