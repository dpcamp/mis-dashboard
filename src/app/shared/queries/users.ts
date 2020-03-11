import gql from 'graphql-tag'

export const usersQuery = gql`
query {
  allUsers {
    user_name
    display_name
  }
}
`;

export const userQuery = gql`
query user($user_name: String!) {
  user(user_name: $user_name) {
    user_name
    display_name
    first_name
    last_name
  }
}
`;
export const userDetailQuery = gql`
query user($user_name: String, $ext: String) {
  user(user_name: $user_name, ext: $ext) {
    first_name
    last_name
    display_name
    user_name
    email
    department
    title
    phones {
      full_number
      extension
    }
    pdq_computers {
      computer_id
      host_name
    }
    service_requests {
      id
      title
    }
  }
}

`;
export const usersDetailQuery = gql`
query {
  allUsers {
    first_name
    last_name
    display_name
    user_name
    email
    department
    title
    phones {
      full_number
      extension
    }
    pdq_computers {
      computer_id
      host_name
    }
    service_requests {
      id
      title
    }
  }
}
`

export const pendingQuery = gql`
query	{
    allUserForms {
      pending_count
    }
  }
`;

export const getUserFormDetail = gql`
query userForm($id: String!){
    userForm(id: $id) {
    form {
        id
        first_name
        last_name
        display_name
        user_name
        employee_id
        description
        building
        additional_items
        copy_user
        create_mbx
        shared_mbx
        sup_man_execs
        home_drive
        status
        needs_computer
        needs_ax
        needs_ice
        needs_stellar
        needs_onbase
        needs_dl
        needs_scan
        needs_pdf
        needs_autocad
        needs_publisher
        needs_visio
        needs_shoretel
        needs_sec
        needs_deskphone
        needs_cell
        phone_ext
        pc_number
        start_date
        updatedAt
        createdAt
        create_user{
        first_name
        last_name
        }
        submit_user{
            email
          user_name
        }
      }
    }
    

}`

export const dfUserQuery = gql`
query dfUser($id: String!){
  dfUser(emp_id: $id){
    FirstName
    Title
    LastName
    Department
    Description

  }
}`