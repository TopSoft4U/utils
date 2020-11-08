import {Column,  PrimaryGeneratedColumn} from "typeorm";
import {Constructor} from "../connection";

export const WithBase = <TBase extends Constructor>(Base: TBase) => {
  abstract class _Base extends Base {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({nullable: true, default: () => "CURRENT_TIMESTAMP()", select: false})
    createdAt?: Date;
    @Column({nullable: true, onUpdate: "CURRENT_TIMESTAMP()", select: false})
    modifiedAt?: Date;

    // @OneToOne(() => BaseAdmin)
    abstract creator?: any;

    // @OneToOne(() => BaseAdmin)
    abstract modifier?: any;
  }
  return _Base;
};
