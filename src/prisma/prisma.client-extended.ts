import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';

type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;

export const extendPrismaClient = (prismaClient: PrismaClient) => {
  const updateArgsUserPassword = <T extends object>(args: T) => {
    if ('data' in args && args.data['password']) {
      args.data['password'] = hashSync(args.data['password'] as string, 10);
    }

    return args;
  };

  return prismaClient.$extends({
    result: {
      user: {
        createdAt: {
          needs: { createdAt: true },
          compute(user) {
            return user.createdAt instanceof Date
              ? user.createdAt.getTime()
              : user.createdAt;
          },
        },
        updatedAt: {
          needs: { updatedAt: true },
          compute(user) {
            return user.updatedAt instanceof Date
              ? user.updatedAt.getTime()
              : user.updatedAt;
          },
        },
      },
    },

    query: {
      user: {
        create({ args, query }) {
          args = updateArgsUserPassword(args);

          return query(args);
        },

        update({ args, query }) {
          args = updateArgsUserPassword(args);
          args.data.version = { increment: 1 };

          return query(args);
        },
      },
    },

    model: {
      user: {
        validatePassword(passwordToCheck: string, currentPassword: string) {
          return compareSync(passwordToCheck, currentPassword);
        },
      },
    },
  });
};

export class PrismaClientExtended extends PrismaClient {
  private readonly _extended: ExtendedPrismaClient;

  constructor() {
    super();

    this._extended = extendPrismaClient(this);
  }

  get extended() {
    return this._extended;
  }
}
