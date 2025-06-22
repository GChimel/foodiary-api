import { Contructor } from "../../shared/types/contructor";

export class Registry {
  private static instance: Registry | undefined;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Registry();
    }

    return this.instance;
  }

  private constructor() {}

  private readonly providers = new Map<string, Registry.Provider>();

  register(impl: Contructor) {
    const token = impl.name;

    if (this.providers.has(token)) {
      throw new Error(`Provider with token ${token} already registered`);
    }

    const deps = Reflect.getMetadata("design:paramtypes", impl) ?? [];

    this.providers.set(token, { impl, deps });
  }

  resolve<TImpl extends Contructor>(impl: TImpl): InstanceType<TImpl> {
    const token = impl.name;

    const provider = this.providers.get(token);

    if (!provider) {
      throw new Error(`Provider with token ${token} not found`);
    }

    const deps = provider.deps.map((dep) => this.resolve(dep));
    const isntance = new provider.impl(...deps);

    return isntance;
  }
}

export namespace Registry {
  export type Provider = {
    impl: Contructor;
    deps: Contructor[];
  };
}
