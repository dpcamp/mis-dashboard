export class User {
  constructor(
  public id: string,
  public first_name: string,
  public last_name: string,
  public email: string,
  public title: string,
  public department: string,
  public user_name: string,
  public display_name: string,
  public extension: string,
  public length: string,
  public is_admin?: boolean
  ) {}
}
export class CreateUser {
  constructor(
  public id?: string,
  public first_name?: string,
  public last_name?: string,
  public display_name?: string,
  public employee_id?: string, 
  public job_title?: string, 
  public building?: string, 
  public need_computer?: boolean,
  public needs_ax?: boolean,
  public needs_ice?: boolean,
  public needs_stellar?: boolean,
  public needs_onbase?: boolean,
  public needs_dl?: boolean,
  public needs_scan?: boolean,
  public needs_PDF?: boolean,
  public needs_autocad?: boolean,
  public needs_publisher?: boolean,
  public needs_visio?: boolean,
  public needs_shoretel?: boolean,
  public needs_sec?: boolean,
  public needs_deskphone?: boolean,
  public needs_cell?: boolean,
  public pc_number?: string, 
  public user_name?: string,
  public share_mbx?: string,
  public description?: string,
  public copy_user?: string,
  public phone_ext?: string,
  public sup_man_execs?: boolean,
  public create_mbx?: boolean,
  public home_drive?: boolean,
  public submitted_by?: string, 
  public created_by?: string, 
  public status?: string, 


  ) {}
}
export class LoggedUser {
  constructor(
  public guid: string,
  public user_name: string,
  public is_authenticated: string,
  public is_admin: boolean,
  public timestamp: string

  ) {}
}

