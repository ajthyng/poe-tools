export const enumValidator = <T extends object & { name: string }>(enumType: T, value: unknown) => {
  if (!value) {
    throw new Error(`Nil value for ${enumType.name}`);
  }

  if (!Object.values(enumType).includes(value as string)) {
    throw new Error(`Invalid ${enumType.name}: ${value}`);
  }

  return value as T[keyof T];
};
