
import {Column} from "typeorm";
import {Constructor} from "../connection";
import {WithPassword} from "./WithPassword";

export const WithAdmin = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends WithPassword(Base) {
    @Column()
    name: string;

    @Column()
    enabled: boolean;

    @Column()
    login: string;
  }
  return _Mixin;
};
