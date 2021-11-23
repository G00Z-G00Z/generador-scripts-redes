import { IpAddressInfo } from "../types/redes-types";

export class IpAddress implements IpAddressInfo {
	private isNet: boolean;
	private address: string;
	private mask: string;

	constructor(address: string, mask: string, isNetwork: boolean) {
		this.isNet = isNetwork;
		this.address = address;
		this.mask = mask;
	}

	isNetwork(): boolean {
		return this.isNet;
	}
	get ipAddress() {
		return this.address;
	}

	get ipMask() {
		return this.mask;
	}

	get full() {
		return `${this.ipAddress} ${this.ipMask}`;
	}
}
