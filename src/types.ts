
export type Dictionary<T> = Record<string, T>;

export type ArrayValue<T extends readonly unknown[]> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type USDefVal<T> = T | (() => T);
