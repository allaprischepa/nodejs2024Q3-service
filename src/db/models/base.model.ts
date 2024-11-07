import { WhereInput } from '../types/types';

export class BaseModel<CD, T extends { id: string }> {
  private data: T[];

  constructor(data: T[], private entityClass: new (dto: CD) => T) {
    this.data = data;
  }

  async create(dto: CD) {
    const entity = new this.entityClass(dto);
    this.data.push(entity);

    return entity;
  }

  async findMany() {
    return this.data;
  }

  async findUnique(condition: string | WhereInput) {
    let entity: T;

    if (typeof condition === 'string') {
      entity = this.data.find((e) => e.id === condition);
    } else {
      entity = this.data.find((e) => {
        const where = condition.where;
        return Object.entries(where).every(([key, value]) => e[key] === value);
      });
    }

    return entity || null;
  }

  async delete(id: string) {
    const index = this.data.findIndex((e) => e.id === id);

    this.data.splice(index, 1);
  }
}
