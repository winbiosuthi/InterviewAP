export interface Customer {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  status: string;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
}

export interface Address {
  id: number;
  addressNumber: string;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  zipCode: string;
  status: string;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
  customerId: number;
  projectId: number;
}

export interface Project {
  id: number;
  projectName: string;
  detail: string;
  type: string;
  status: string;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
}

export interface CustomerRequest {
  id: number;
  subject: string;
  detail: string;
  submitDate: Date;
  status: string;
  createBy: string;
  updateBy: string;
  createDate: Date;
  updateDate: Date;
  customerId: number;
}

export interface Information extends CustomerRequest {
  informationType: string;
}

export interface Complain extends CustomerRequest {
  complainType: string;
}

export interface Repairing extends CustomerRequest {
  repairingType: string;
  problem: string;
  projectId: number;
  addressId: number;
}

export const CUSTOMERS: Customer[] = [
  {
    id: 1,
    title: 'Mr.',
    firstName: 'Alpha',
    lastName: 'Alpha',
    phoneNumber: '0812345678',
    email: 'alpha.a@gmail.com',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  },
  {
    id: 2,
    title: 'Mr.',
    firstName: 'Beta',
    lastName: 'Beta',
    phoneNumber: '0823456789',
    email: 'beta.b@gmail.com',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 5, 15, 13, 42, 19, 0),
    updateDate: new Date(2021, 5, 15, 13, 42, 19, 0)
  },
  {
    id: 3,
    title: 'Mr.',
    firstName: 'Charlie',
    lastName: 'Charlie',
    phoneNumber: '0834567890',
    email: 'charlie.c@gmail.com',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 7, 10, 14, 0, 0, 0),
    updateDate: new Date(2021, 7, 10, 14, 0, 0, 0)
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    projectName: 'Project 1',
    detail: '',
    type: 'Type 1',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  },
  {
    id: 2,
    projectName: 'Project 2',
    detail: '',
    type: 'Type 2',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  }
]

export const ADDRESSES: Address[] = [
  {
    id: 1,
    customerId: 1,
    projectId: 1,
    addressNumber: '101/1',
    street: 'road',
    subDistrict: 'Sub District 1',
    district: 'District 1',
    province: 'Province 1',
    zipCode: '10110',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  },
  {
    id: 1,
    customerId: 1,
    projectId: 2,
    addressNumber: '202/2',
    street: 'road',
    subDistrict: 'Sub District 2',
    district: 'District 2',
    province: 'Province 1',
    zipCode: '10220',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  },
  {
    id: 3,
    customerId: 2,
    projectId: 2,
    addressNumber: '203/3',
    street: 'road',
    subDistrict: 'Sub District 3',
    district: 'District 3',
    province: 'Province 2',
    zipCode: '20330',
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 30, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 30, 0, 0)
  }
]

export const INFORNATIONS: Information[] = [
  {
    id: 1,
    customerId: 1,
    informationType: 'Information Type 1',
    subject: 'Information 1',
    detail: 'Information 1 Detail',
    submitDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 35, 0, 0)
  }
];
export const COMPLAINS: Complain[] = [
  {
    id: 2,
    customerId: 1,
    complainType: 'Complain Type 1',
    subject: 'Complain 1',
    detail: 'Complain 1 Detail',
    submitDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 35, 0, 0)
  }
];
export const REPAIRINGS: Repairing[] = [
  {
    id: 3,
    customerId: 1,
    repairingType: 'Repair Type 1',
    subject: 'Repair 1',
    detail: 'Repair 1 Detail',
    problem: 'Problem',
    projectId: 1,
    addressId: 1,
    submitDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    status: 'active',
    createBy: 'admin',
    updateBy: 'admin',
    createDate: new Date(2021, 0, 31, 9, 35, 0, 0),
    updateDate: new Date(2021, 0, 31, 9, 35, 0, 0)
  }
];
