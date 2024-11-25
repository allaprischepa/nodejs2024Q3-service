import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from './prisma.client-extended';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
