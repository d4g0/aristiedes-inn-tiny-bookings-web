import { gql } from "~/utils";

export const loginAsAdmin = gql`
    query loginAsAdmin($input: loginInput! ){
        loginAsAdmin(input:$input){  
            admin{ 
                    id
                    user_role
                    email
                    admin_name
                    admin_description
                    created_at       
            },
            token
            token_created_at
        }
    }
`;