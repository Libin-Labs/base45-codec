# @lp-labs/base45-codec

RFC-style Base45 paired-byte text encoding.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/base45-codec
```

## Working example

```js
import { encodeBase45, decodeBase45 } from '@lp-labs/base45-codec';
const bytes = new Uint8Array([65, 66]);
if (decodeBase45(encodeBase45(bytes))[0] !== bytes[0]) throw new Error('Codec');
```

CommonJS: `const api = require('@lp-labs/base45-codec')`.

## Behavior, customization and limits

encodeBase45/decodeBase45 use alphabet0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ space$%*+-./:. Two big-endian bytes produce3 little-endian base45 digits; final single byte2 digits. Bytes<=1048576,text<=1572864. Rejects invalid groups,overflow and wrong remainder; preserves raw spaces,never trims. O(n)time/storage. Outputs are fresh and original input is not mutated. Encoding is NOT encryption,authentication or file-format auto-detection.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function encodeBase45(input: Uint8Array): string;
export declare function decodeBase45(text: string): Uint8Array;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
