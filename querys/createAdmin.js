import { gql } from "~/utils";

export const createAdminQuery = gql`
mutation createAdmin($input:CreateAdminInput!){
  createAdmin(input:$input){
		id
    user_role
    email
    admin_name
    admin_description
    hash_password
    created_at
  }
}
`