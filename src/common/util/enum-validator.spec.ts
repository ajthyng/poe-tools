import { enumValidator } from './enum-validator';

describe('enumValidator', () => {
  enum TestEnum {
    test1 = 'test1',
    test2 = 'test2',
    name = 'TestEnum',
  }

  it('should throw error if value is nil', () => {
    expect(() => enumValidator(TestEnum, null)).toThrowError('Nil value for TestEnum');
  });

  it('should throw error if value is not in enum', () => {
    expect(() => enumValidator(TestEnum, 'test')).toThrowError('Invalid TestEnum: test');
  });

  it('should return value if value is in enum', () => {
    expect(enumValidator(TestEnum, 'test1')).toBe('test1');
  });

  it('should return value if value is in enum', () => {
    expect(enumValidator(TestEnum, 'test2')).toBe('test2');
  });
});
