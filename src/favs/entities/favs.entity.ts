import { CreateFavsDto } from '../dto/create-favs.dto';
import db from 'src/db';

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavsEntity implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(createFavsDto?: CreateFavsDto) {
    const { artists, albums, tracks } = createFavsDto || {};

    this.artists = artists || [];
    this.albums = albums || [];
    this.tracks = tracks || [];
  }

  async toJSON() {
    const artists = await Promise.all(
      this.artists.map(async (id) => await db.artist.findUnique(id)),
    );
    const albums = await Promise.all(
      this.albums.map(async (id) => await db.album.findUnique(id)),
    );
    const tracks = await Promise.all(
      this.tracks.map(async (id) => await db.track.findUnique(id)),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }
}
