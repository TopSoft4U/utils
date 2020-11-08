import {Column} from "typeorm";
import {Constructor} from "../connection";
import {IEmailTemplate} from "./WithEmailTemplate";

export const WithEmailLayout = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends Base implements IEmailLayout{
    @Column()
    name: string;

    @Column({type: "longtext"})
    bodyHTML: string;

    @Column({type: "longtext"})
    bodyText: string;

    // @OneToMany(() => EmailTemplate, (x: any) => x.emailLayout)
    abstract emailTemplates: IEmailTemplate[];
  }
  return _Mixin;
};

export interface IEmailLayout {
  name: string;
  bodyHTML: string;
  bodyText: string;
  emailTemplates: IEmailTemplate[];
}
