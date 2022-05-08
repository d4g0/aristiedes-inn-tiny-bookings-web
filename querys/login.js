import { gql } from "~/utils";

export const loginQuery = gql`
    query login($input: loginInput! ){
        login(input:$input){  
            user{
                __typename
                ... on Admin{
                    id
                    admin_name,
                    admin_description,
                user_role
                    created_at
                }
                ... on Client{
                id
                user_role
                client_name
                            client_last_name
                created_at	
                }
                
            },
            token
            token_created_at
        }
    }
`;