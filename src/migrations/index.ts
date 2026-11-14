import * as migration_20260822_101939 from './20260822_101939';
import * as migration_20261114_095435_add_secondary_phone from './20261114_095435_add_secondary_phone';

export const migrations = [
  {
    up: migration_20260822_101939.up,
    down: migration_20260822_101939.down,
    name: '20260822_101939',
  },
  {
    up: migration_20261114_095435_add_secondary_phone.up,
    down: migration_20261114_095435_add_secondary_phone.down,
    name: '20261114_095435_add_secondary_phone'
  },
];
