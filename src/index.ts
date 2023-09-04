type Context = {
  /**  the type of decorated value. As we’ll see, this can be either class, method, getter, setter, field, or accessor */
  kind: "class" | "method" | "field" | "getter" | "setter" | "accessor";
  name?: string;
}

// this `any` is necessary.
// see https://www.typescriptlang.org/docs/handbook/mixins.html
type Constructible<T = {}> = new (...args: any[]) => T;

type WithFuel = {
  fuel: number;
  isEmpty: () => boolean;
}

const WithFuel = <T extends Constructible>(
  TargetClass: T,
  context: Context,
): T & Constructible<WithFuel> => {
  if (context.kind !== "class") {
    throw new TypeError("This decorator can only be applied to classes.");
  }

  // Alternatively, we could have added new methods
  // to the class prototype.
  return class extends TargetClass {
    fuel: number = 50

    isEmpty(): boolean {
      return this.fuel === 0
    }
  }
}

const DeprecatedMethod = (target: Function, context: Context) => {
  if (context.kind !== "method" && context.kind !== "field") {
    throw new TypeError("This decorator can only be applied to methods.");
  }

  return function decorate(...args: any[]) {
    console.log(`${context.name} is deprecated and will be removed in a future version.`)

    return target.apply(decorate, args)
  }
}

@WithFuel
class Rocket {
  @DeprecatedMethod
  getMessage() {
    return 'jeff said jeff a little too much'
  }
}

// Decorators can't influence the types of a class's properties
// so here we use the WithFuel type to ensure that the fuel
// property exists on the instance.
const rocket = new Rocket() as Rocket & WithFuel

console.log(`Is the rocket empty (fuel: ${rocket.fuel})? ${(rocket as any).isEmpty()}`)

console.log(rocket.getMessage())

console.log('----------------------------------------------------')

