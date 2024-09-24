import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn()
  id: number;

  @Column('text')
  product: string;

  @Column('int')
  quantity: number;

  @Column('boolean', { default: true })
  isPaid: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
