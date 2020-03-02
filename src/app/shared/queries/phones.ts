import gql from 'graphql-tag'

export const phonesQuery = gql`query {
allPhones {
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
}`
;