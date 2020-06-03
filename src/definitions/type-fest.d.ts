// https://github.com/sindresorhus/type-fest

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>

type SetOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not optional from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be optional from the base type and make them optional.
    Partial<Pick<BaseType, Keys>> extends infer InferredType // If `InferredType` extends the previous, then for each key, use the inferred type key.
    ? { [KeyType in keyof InferredType]: InferredType[KeyType] }
    : never

type SetRequired<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not required from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be required from the base type and make them required.
    Required<Pick<BaseType, Keys>> extends infer InferredType // If `InferredType` extends the previous, then for each key, use the inferred type key.
    ? { [KeyType in keyof InferredType]: InferredType[KeyType] }
    : never
