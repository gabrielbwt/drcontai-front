type Address = {
    street: string | null;
    number: string | null;
    postalCode: string | null;
    city: string | null;
    state: string | null;
    district: string | null;
    complement: string | null;
};

type Subscription = {
    status: string;
    contract: string | null;
    price: number | null;
    paymentMethod: string | null;
    dueDate: string | null;
    discount: number;
    contractStatus: string;
    contractType: string;
    discountType: string;
    paymentStatus: string | null;
    paymentStartDate: string | null;
    discountDueDate: string | null;
    benefits: string | null;
    churnDate: string | null;
    churnReason: string | null;
    isAmbassador: string;
};

type Referral = {
    clientReferralCpf: string | null;
    influencerReferralCpf: string | null;
    ambassadorReferralCpf: string | null;
};

type Company = {
    name: string | null;
    tradeName: string | null;
    cnpj: string | null;
    crm: string | null;
    cityRegistrationNumber: string | null;
    isActive: boolean;
    headCount: number | null;
    averageMonthlyRevenue: number | null;
    activityDescription: string | null;
    internalEmail: string | null;
    s3BucketFolder: string | null;
    legalRepresentative: string | null;
    openingStatus: string[];
    address: Address;
};

type DefaultContactInfo = {
    phoneNumber: string;
    email: string;
    channelLinkWhatsapp: string | null;
};

export type TypeUser = {
    mentoring: string;
    contractClosingDate: string | null;
    university: string | null;
    acquisitionSalesChannel: string | null;
    salesSubChannel: string | null;
    subscription: Subscription;
    referral: Referral;
    driveUrl: string | null;
    companies: Company[];
    activityStatus: string[];
    id: string;
    name: string;
    cpf: string;
    birthday: string;
    gender: string | null;
    graduationDate: string | null;
    defaultContactInfo: DefaultContactInfo;
    address: Address;
    createdAt: string;
    updatedAt: string;
    s3BucketPath: string | null;
    crm: string | null;
};

export type TypeUsers = TypeUser[];
