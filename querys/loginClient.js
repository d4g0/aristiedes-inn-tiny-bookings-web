import { gql } from "~/utils";

export const loginAsClient = gql`
    query login($input: loginInput! ){
        loginAsClient(input:$input){  
            client  { 
        	    id
      		    user_role
       		    email
        	    client_name
                client_last_name
                created_at
            },
            token
            token_created_at
        }
    }
`;