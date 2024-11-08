import { FavsEntity } from 'src/favs/entities/favs.entity';

export class FavsModel {
  private favsEntity: FavsEntity;

  private getFavsController = (type: string) => ({
    add: (id: string) => this.favsEntity[type].push(id),
    delete: (id: string) => {
      const index = this.favsEntity[type].findIndex(
        (entityId: string) => entityId === id,
      );

      this.favsEntity[type].splice(index, 1);
    },
    exists: (id: string) => this.favsEntity[type].includes(id),
  });

  artists = this.getFavsController('artists');
  albums = this.getFavsController('albums');
  tracks = this.getFavsController('tracks');

  constructor(favsEntity: FavsEntity) {
    this.favsEntity = favsEntity;
  }

  findMany() {
    return this.favsEntity.toJSON();
  }
}
