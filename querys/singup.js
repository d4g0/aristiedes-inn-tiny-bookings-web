import { gql } from '~/utils'
export const singup = gql`
    mutation SingUp($input: SingUpInput!){
  singUp(input:$input){
    user{
      __typename
      ... on Client{
          id
          user_role
          client_name
					client_last_name
          email
          created_at
        }
    }
    token
    token_created_at
  }
}




`