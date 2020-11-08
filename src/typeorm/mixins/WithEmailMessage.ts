import {Column} from "typeorm";
import {Constructor} from "../connection";
import {EmailMessageStatus} from "../../enums/EmailMessageStatus";

export const WithEmailMessage = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Mixin extends Base implements IEmailMessage {
    @Column()
    to: string;

    @Column()
    subject: string;

    @Column({nullable: true})
    bcc: string;

    @Column({nullable: true})
    replyTo?: string;

    @Column({type: "enum", enum: EmailMessageStatus, default: EmailMessageStatus.Pending})
    status: EmailMessageStatus

    @Column({type: "longtext"})
    bodyHTML: string;

    @Column({type: "longtext"})
    bodyText: string;

    @Column({type: "mediumtext", nullable: true})
    errorMessage?: string;
  }

  return _Mixin;
};

export interface IEmailMessage {
  to: string;
  subject: string;
  bcc: string;
  replyTo?: string;
  status: EmailMessageStatus
  bodyHTML: string;
  bodyText: string;
  errorMessage?: string;
}
