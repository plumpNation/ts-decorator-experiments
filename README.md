```ts
// You don't provide the context, typescript will create this
// based on the item you are decorating.
type Context = {
  /**  the type of decorated value. As we’ll see, this can be either class, method, getter, setter, field, or accessor */
  kind: "class" | "method" | "field" | "getter" | "setter" | "accessor";
  /** the name of the decorated object */
  name: string | symbol;
  /** an object with references to a getter and setter method to access the decorated object */
  access?: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  /** whether the decorated object is a private class member */
  private?: boolean;
  /** whether the decorated object is a static class member */
  static?: boolean;
  /** a way to add custom initialization logic at the beginning of the constructor (or when the class is defined) */
  addInitializer?(initializer: () => void): void;
}

type Decorator = (
  /** represents the element we’re decorating, whose type is Input */
  target: Input,
  /** contains metadata about how the decorated method was declared */
  context: Context,
) => Output | void;
/** represents the type of value returned by the Decorator function */
```