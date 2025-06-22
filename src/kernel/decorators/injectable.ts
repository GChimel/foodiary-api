import { Contructor } from "../../shared/types/contructor";
import { Registry } from "../di/registry";

export function Injectable(): ClassDecorator {
  return (target) => {
    Registry.getInstance().register(target as unknown as Contructor);
  };
}
