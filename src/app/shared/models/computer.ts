import { Application } from '../models/applications'
export class Computer {
  constructor(
  // public computer_id: string,
  // public computer_name: string,
  // public computer_type: string,
  // public ip_address: string,
  // public mac_address: string
  public id: number,
  public computer_id: number,
  public host_name: string,
  public ad_last_logon: string,
  public memory: number,
  public os_name: string,
  public os_service_pack: string,
  public ad_when_created: string,
  public status: string,
  public online_user: string,
  public chassis: string,
  public pdq_nic_ips: string,
  public pdq_displays: string,
  public pdq_applications: Application,  
  ){}

}