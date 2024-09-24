import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(order);
    return order;
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new Error(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id: id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new Error(`Order #${id} not found`);
    }
    await this.orderRepository.save(order);
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    this.orderRepository.remove(order);
    return order;
  }
}
