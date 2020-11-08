import {Column} from "typeorm";
import {Constructor} from "../connection";
import {IEmailTemplate} from "./WithEmailTemplate";

export const WithEmailAccount = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends Base implements IEmailAccount {
    @Column()
    name: string;

    @Column()
    host: string;

    @Column()
    port: number;

    @Column()
    username: string;

    @Column()
    password?: string;

    @Column()
    email: string;

    @Column({nullable: true})
    replyTo?: string;

    @Column()
    senderName: string;

    @Column()
    useAuth: boolean;

    @Column()
    useSSL: boolean;

    // @OneToMany(() => EmailTemplate, (x) => x.emailAccount)
    abstract emailTemplates: IEmailTemplate[];
  }

  return _Mixin;
};

export interface IEmailAccount {
  name: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  email: string;
  replyTo?: string;
  senderName: string;
  useAuth: boolean;
  useSSL: boolean;
  emailTemplates: IEmailTemplate[];
}
