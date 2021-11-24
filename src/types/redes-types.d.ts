
// Ip information
export type IpAddressForm = string

export type IpAddressWithMask = string

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

type CableTypes = "serial" | "fastethernet" | "gigabitethernet";

// Router Interfaces
export type RouterInterfaceCables =
    {
        type: "fastethernet" | "gigabitethernet",
        port: string
    } |
    {
        port: string
        type: "serial",
        isFemale: boolean
    }


export type RouterInterface = {
    interfaceCableType: RouterInterfaceCables,
    description: string,
    ipAddress: string,
    ipMask: string,
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
    interfaces: Map<string, RouterInterface>

}


