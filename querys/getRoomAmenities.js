import { gql } from "~/utils";

export const getRoomAmenities = gql`
query {
  getRoomAmenities{
    id
    amenity
  }
}
`