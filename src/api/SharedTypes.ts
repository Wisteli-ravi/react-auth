
interface PhoneNumber {
    readonly title: string;
    readonly number: string;
  }
  
  export interface UserData {
    readonly name: string;
    readonly userName: string;
    readonly firstName: string;
    readonly email: string;
    readonly lastName: string;
    readonly city: string;
    readonly zipCode: string;
    readonly cell: string;
    readonly role: string;
    readonly picture: string[];
    readonly phoneNumbers: PhoneNumber[];
    readonly userOrg: number | number[];
    readonly remote_monitoring: string;
    readonly dbid: number;
    readonly internal_id: string;
    readonly billing_permission: string;
    readonly degree: string;
    readonly specialty: string;
    readonly dob?: string;
    readonly gender?: string;
  }

export interface ResetPasswordResponse {
    readonly message: string;
    readonly statusCode: number;
  }
  
  export interface DiagnosesList {
    readonly desc: string;
    readonly code: string;
    readonly detail_desc: string;
    readonly checked?: boolean;
  }

  export interface Client {
    key: string;
    name: string;
    identifier: string;
    displayName: string;
  }