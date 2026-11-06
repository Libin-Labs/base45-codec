import { encodeBase45, decodeBase45 } from '@lp-labs/base45-codec';
const bytes = new Uint8Array([65, 66]);
if (decodeBase45(encodeBase45(bytes))[0] !== bytes[0]) throw new Error('Codec');
// @ts-expect-error invalid argument must be rejected by declarations
encodeBase45([1]);
