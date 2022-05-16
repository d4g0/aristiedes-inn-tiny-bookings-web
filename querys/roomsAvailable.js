import { gql } from "~/utils";

export const roomsAvailable = gql`
query getRoomsAvailableIn($input:getRoomsAvailableInput!){
  getRoomsAvailable(input:$input){
		id
    hotel_id
    room_name
    night_price
    capacity
    number_of_beds
    room_type_id
    room_type_key
    room_pictures{
      room_picture_id
      filename
    }
    room_amenities{
      amenity_id
      amenity
    }
  }
}
`