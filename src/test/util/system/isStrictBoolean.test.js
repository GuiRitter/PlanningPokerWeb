import { isStrictBoolean } from '../../../util/system';

test('null is not strict boolean', () => {
	expect(isStrictBoolean(null)).toStrictEqual(false);
});

test('undefined is not strict boolean', () => {
	expect(isStrictBoolean(undefined)).toStrictEqual(false);
});

test('zero is not strict boolean', () => {
	expect(isStrictBoolean(0)).toStrictEqual(false);
});

test('empty string is not strict boolean', () => {
	expect(isStrictBoolean('')).toStrictEqual(false);
});

test('empty array is not strict boolean', () => {
	expect(isStrictBoolean([])).toStrictEqual(false);
});

test('false is strict boolean', () => {
	expect(isStrictBoolean(false)).toStrictEqual(true);
});

test('true is strict boolean', () => {
	expect(isStrictBoolean(true)).toStrictEqual(true);
});
