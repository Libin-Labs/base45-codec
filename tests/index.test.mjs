import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wire fixture', () => {
  assert.equal(api.encodeBase45(new Uint8Array([65, 66])), 'BB8');
});
test('decode fixture', () => {
  assert.deepEqual([...api.decodeBase45('BB8')], [65, 66]);
});
test('byte roundtrips', () => {
  for (let n = 0; n < 100; n++) {
    const v = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) % 256);
    assert.deepEqual(api.decodeBase45(api.encodeBase45(v)), v);
  }
});
test('invalid grammar', () => {
  assert.throws(() => api.decodeBase45('0'));
});
test('extra convention', () => {
  assert.equal(api.encodeBase45(new TextEncoder().encode('Hello!!')), '%69 VD92EX0');
});
test('type contract', () => {
  assert.throws(() => api.encodeBase45([]));
  assert.throws(() => api.decodeBase45(1));
});
