import {Column} from "typeorm";
import {Constructor} from "../connection";
import {IEmailAccount} from "./WithEmailAccount";
import {IEmailLayout} from "./WithEmailLayout";

export const WithEmailTemplate = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends Base implements IEmailTemplate {
    @Column()
    name: string;

    // @Column({type: "enum"})
    abstract type: any;

    @Column()
    enabled: boolean;

    @Column()
    subject: string;

    @Column({type: "longtext"})
    bodyHTML: string;

    @Column({type: "longtext"})
    bodyText: string;

    @Column()
    bcc: string;

    // @ManyToOne(() => EmailAccount, (x) => x.emailTemplates, {nullable: false})
    abstract emailAccount: any;

    // @ManyToOne(() => EmailLayout, (x) => x.emailTemplates)
    abstract emailLayout: any
  }

  return _Mixin;
};

export interface IEmailTemplate {
  name: string;
  type: any;
  enabled: boolean;
  subject: string;
  bodyHTML: string;
  bodyText: string;
  bcc: string;
  emailAccount: IEmailAccount;
  emailLayout: IEmailLayout;
}
