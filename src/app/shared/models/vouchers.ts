export interface VoucherQueryResponse {
  voucher: AXVoucher
}

export interface VouchersQueryResponse {
  allVouchers: AXVoucher[]
}

export class AXVoucher {
  constructor(
  public inputKey?: string,
  public checkDate?: string,
  public vendorCode?: string,
  public invoiceNum?: string,
  public onbase?: OBVoucher

  ) {}
}
export class OBVoucher {
  constructor(
  public input?: string,
  public itemName?: string,
  public batchNum?: string,
  public username?: string,
  public realName?: string,
  public dateStored?: string,
  ) {}
}

