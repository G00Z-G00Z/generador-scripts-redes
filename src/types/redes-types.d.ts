// Ip information
export type IpAddressForm = `${number}.${number}.${number}.${number}`

export type IpAddressWithMask = `${IpAddressForm} ${IpAddressForm}`

export interface IpAddressInfo {
    isNetwork(): boolean
    get ipAddress(): IpAddressForm
    get ipMask(): IpAddressForm
    get full(): IpAddressWithMask
}



// DHCP configuration
export interface DHCPConfiguration {
    excluded: IpAddressForm[]
    network: IpAddressWithMask
    defaultRouter: IpAddressForm,
    dnsServer: IpAddressForm
    poolName: string
}

// Router Interfaces
export type RouterInterfaceCables =
    {
        type: "fastethernet" | "gigabitethernet",
        port: `${number}/${number}`
    } |
    {
        port: `${number}/${number}`
        type: "serial",
        isFemale: boolean
    }


export type RouterInterface = {
    interfaceCableType: RouterInterfaceCables,
    description: string,
    ipAddress: IpAddressWithMask,
    dhcp?: DHCPConfiguration,
}

// Router
export interface Router {
    hostname: string,
    security: {
        lineConsole: boolean,
        vty: boolean,
        encription: boolean,
        bannerMord: string
    }
    interfaces: RouterInterface[]

}


