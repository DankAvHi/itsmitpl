import { PrismaService } from '@/prisma/prisma.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => String)
  async ping() {
    const result = await this.prismaService.$queryRaw`SELECT 1`;
    return result ? 'Server OK, DB Ok' : 'Server OK, DB Error';
  }
}
