import { gql } from "~/utils";

export const getUserRolesQuery = gql`
query gUR{
  getUserRoles{
    id
    user_role
  }
}
`