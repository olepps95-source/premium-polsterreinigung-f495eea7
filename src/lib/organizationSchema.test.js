import { expect, test } from 'bun:test';
import { organizationSchema } from './organizationSchema.ts';

test('ReinWerk uses the confirmed telephone number in structured data', () => {
  expect(organizationSchema.telephone).toBe('+491636986317');
});