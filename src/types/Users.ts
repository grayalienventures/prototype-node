
export type CapabilityT = {
    [key in string]: boolean;
}

export interface CoordinateT {
    longitude: number
    latitude: number
}
export interface AddressDetailsT {
    id?: string
    address: string,
    verboseAddress?: string
    latitude: number | string,
    longitude: number | string,
    country: string,
    state: string,
    city: string,
    addressLineOne: string,
    addressLineTwo: string,
    zipcode: string,
}
export interface UserLocationT {
    latitude: number
    longitude: number
}

export interface UserLocationT {
    latitude: number
    longitude: number
}

export interface UserT {
    id: number
    address: string
    address2: string
    addressDetails: AddressDetailsT
    email: string
    firstName: string
    lastName: string
    phone: string
    profilePic: string
    location?: UserLocationT
    roles?: Array<string>
    isSales?: boolean
    capabilities?: CapabilityT
    extra_capabilities?: CapabilityT
}

export const initUserLocationObj: UserLocationT = {
    latitude: 0,
    longitude: 0
}
export interface ClientT extends UserT { }





export const initUserObj: UserT = {
    id: 0,
    address: "",
    address2: "",
    addressDetails: {
        "address": "",
        "latitude": "",
        "longitude": "",
        "country": "",
        "state": "",
        "city": "",
        "addressLineOne": "",
        "addressLineTwo": "",
        "zipcode": "",
    },
    email: '',
    firstName: '',

    lastName: '',
    phone: '',
    profilePic: '',
    location: initUserLocationObj,
    roles: [],
}

