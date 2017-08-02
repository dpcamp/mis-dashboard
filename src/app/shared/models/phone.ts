export class Phone {
  id?: string;
  full_number?: string;
  telephone?: string;
  division_id?: number;
  department?: string;
  position?:string;
  UserSAMAccountName?: string;
  location?: string;
  function_info?: string;
  notes?: string;
  account_number?:string;
  date_installed?:string;
  monthly_cost?:string;
  investigate?: boolean;
  model?: string;
  line_type?: string;
  long_distance?: string;
  need_voicemail?: boolean;
  disconnect_now?: boolean;
  disconnect_later?: boolean;
  phone_number?: string;
  ld_changed?:string;
  new_phone?:string;
  switch_comments?:string;
  new_location?: string;
  drop_num?: string;
  port_num?: number;
  extension?: number;
  vm_id?: number;
  binding_post?: number;
  provider?: string;
  pin?: string;
  date_created?:string;
  User?: {
    sAMAccountName?: string;
    displayName?: string;
  }


  message?: string;

  //owner: string;
}