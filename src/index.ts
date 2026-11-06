function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function bytes(v: Uint8Array, max = 1048576): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > max) throw new RangeError('Byte budget exceeded');
}
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
export function encodeBase45(input: Uint8Array): string {
  bytes(input);
  let out = '';
  for (let i = 0; i < input.length; i += 2) {
    let n = input[i]!;
    const pair = i + 1 < input.length;
    if (pair) n = n * 256 + input[i + 1]!;
    out += alphabet[n % 45]! + alphabet[Math.floor(n / 45) % 45]!;
    if (pair) out += alphabet[Math.floor(n / 2025)]!;
  }
  return out;
}
export function decodeBase45(text: string): Uint8Array {
  strictText(text, 1572864);
  if (text.length % 3 === 1) throw new RangeError('Invalid group length');
  const out: number[] = [];
  for (let i = 0; i < text.length; i += 3) {
    const width = Math.min(3, text.length - i);
    let n = 0;
    for (let j = 0; j < width; j++) {
      const d = alphabet.indexOf(text[i + j]!);
      if (d < 0) throw new RangeError('Invalid Base45 digit');
      n += d * 45 ** j;
    }
    if (n > (width === 3 ? 65535 : 255)) throw new RangeError('Group overflow');
    if (width === 3) out.push(n >> 8, n & 255);
    else out.push(n);
  }
  return Uint8Array.from(out);
}
