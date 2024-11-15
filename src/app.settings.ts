import 'dotenv/config';
import { env } from 'process';

export const port = env.PORT || 4000;

export const appName = 'Home Library Service';

export const appDescription =
  'The Home Library Service allows users to manage data about Artists, Tracks, and Albums by performing CRUD operations (Create, Read, Update, Delete) and adding them to their Favorites in a personalized home library.';
