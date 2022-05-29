import { gql } from "~/utils";

export const getDellAdminQuery = (id = 1) => gql`
mutation deleteAdmin{
  deleteAdmin(id:${id}){
    completed
    count
  }
}
`