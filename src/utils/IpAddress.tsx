import {
	IpAddressInfo,
	IpAddressForm,
	IpAddressWithMask,
} from "../types/redes-types";

export class IpAddress implements IpAddressInfo {
	isNetwork(): boolean {
		return false;
	}
	get ipAddress() {
		return "0.10.8.1";
	}

	get ipMask() {
		return "0.10.15.8";
	}

	get full() {
		return `${this.ipAddress} ${this.ipMask}`;
	}
}
