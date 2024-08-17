import { concatHex, padHex, sliceHex, toBytes, toHex } from "viem";

export function stringToBytes32(str: string): `0x${string}` {
    const strBytes = toHex(toBytes(str)); // Convert the string to a hex string
    const paddedBytes = padHex(sliceHex(concatHex([strBytes, '0x'.padEnd(66, '0') as `0x${string}`]), 0, 32), { size: 32 });
    return paddedBytes as `0x${string}`;
}

