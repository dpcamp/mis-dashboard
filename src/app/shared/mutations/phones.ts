import gql from 'graphql-tag'
export const createPhone = gql`
  mutation createPhone($input: newPhoneInput!) {
      createPhone(input: $input) {
        id
        full_number
        extension
        vm_id
        drop_num
        port_num
        binding_post
        provider
        long_distance
        line_type
        monthly_cost
        date_installed
        disconnect_now
        disconnect_later
        need_voicemail
        investigate
        notes
        switch_comments
        function_info
        location
        model
        owners {
          user_name
          display_name
        }
    }
  }
`;
export const updatePhone = gql`
  mutation updatePhone($id: String, $input: uPhoneInput!) {
    updatePhone(id: $id, input: $input) {
        id
        full_number
        extension
        vm_id
        drop_num
        port_num
        binding_post
        provider
        long_distance
        line_type
        monthly_cost
        date_installed
        disconnect_now
        disconnect_later
        need_voicemail
        investigate
        notes
        switch_comments
        function_info
        location
        model
        owners {
          user_name
          display_name
        }
    }
  }
`;
export const deletePhone = gql`
  mutation deletePhone($id: String!) {
    deletePhone(id: $id) {
        message
    }
  }
`;

export const updatePhoneOwners = gql`
  mutation updatePhoneOwners($id: ID, $ext: String, $owners: String) {
    updatePhoneOwners(id: $id, ext: $ext, owners: $owners) {
      id
      extension
      owners {
        user_name
        display_name
      }
    }
  }
`;
