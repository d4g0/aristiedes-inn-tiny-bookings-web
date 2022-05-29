import { gql } from "~/utils";

export const getAdmins = gql`
{
  admins{
    id
    user_role
    email
    admin_name
    admin_description
    created_at
  }
}
`