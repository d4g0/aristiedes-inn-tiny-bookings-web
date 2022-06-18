import { gql } from "~/utils";

export const createARoomLockPeriod = gql`
mutation createARoomLock($input: createRoomLockInput!) {
  createARoomLockPeriod(input: $input) {
    id
    room_id
    start_date
    end_date
    reason
    created_at
  }
}
`