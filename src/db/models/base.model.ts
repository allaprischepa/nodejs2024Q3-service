import { OnDeleteCallback } from '..';
import { WhereInput } from '../types/types';

export class BaseModel<CD, UD, T extends { id: string }> {
  private data: T[];
  private type: string;
  private onDelete: OnDeleteCallback;

  constructor(
    data: T[],
    type: string,
    onDelete: OnDeleteCallback,
    private entityClass: new (dto: CD) => T,
  ) {
    this.data = data;
    this.type = type;
    this.onDelete = onDelete;
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

  async update(id: string, dto: UD) {
    let entity = await this.findUnique(id);

    if (entity) {
      entity = { ...entity, ...dto };
    }

    return entity;
  }

  async delete(id: string) {
    const index = this.data.findIndex((e) => e.id === id);

    this.data.splice(index, 1);

    this.onDelete(id, this.type);
  }
}
