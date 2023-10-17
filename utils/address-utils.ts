export function trimLeadingZero(address: string | undefined): string | undefined {
    // Removes leading zeros from hex string, if address is undefined, return undefined
    return address ? address.replace(/^0x0+/, '0x') : undefined;
}