import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import {Issue} from "./issue.model"
import {Height} from "./height.model"

@Entity_()
export class IssueCancellation {
  constructor(props?: Partial<IssueCancellation>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_({unique: true})
  @OneToOne_(() => Issue, {nullable: false})
  @JoinColumn_()
  issue!: Issue

  @Index_()
  @ManyToOne_(() => Height, {nullable: false})
  height!: Height

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date
}
