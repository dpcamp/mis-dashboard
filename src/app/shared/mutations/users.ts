import gql from 'graphql-tag'

export const newUserForm = gql`
mutation createUserForm($input: uFormInput!) {
createUserForm(input: $input) {
    form{
        id
        first_name
        last_name
        submit_user
        {
            email
            user_name
        }
    }
}
}
`
export const updateUserForm = gql`
mutation createUserForm($input: uFormInput!) {
createUserForm(input: $input) {
    form{
        id
        first_name
        last_name
        user_name
        status
        copy_user
        needs_onbase
        needs_stellar
        needs_dl
        submit_user
        {
            email
            user_name
        }
    }
}
}
`