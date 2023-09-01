declare const reference: unique symbol;
export type Reference<T, TReference extends string> = T & { [reference]: TReference };
