import * as migration_20260822_101939 from './20260822_101939';

export const migrations = [
  {
    up: migration_20260822_101939.up,
    down: migration_20260822_101939.down,
    name: '20260822_101939'
  },
];
