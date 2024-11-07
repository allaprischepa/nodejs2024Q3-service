export class BaseModel<CD, T> {
  private data: T[];

  constructor(data: T[], private entityClass: new (dto: CD) => T) {
    this.data = data;
  }

  async create(dto: CD) {
    const entity = new this.entityClass(dto);
    this.data.push(entity);
  }
}
