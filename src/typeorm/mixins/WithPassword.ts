import bcrypt from "bcrypt";
import {BeforeInsert, BeforeUpdate, Column} from "typeorm";

import {Constructor} from "../connection";
import {isDev} from "../../utils";

export const WithPassword = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends Base {
    @Column({select: false})
    password?: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password)
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(plainText: string) {
      if (isDev() && this.password === plainText)
        return true;
      else if (this.password)
        return await bcrypt.compare(plainText, this.password);
      return false;
    }

    static async getHashedPassword(plainText: string) {
      return await bcrypt.hash(plainText, 10);
    }
  }
  return _Mixin;
};
