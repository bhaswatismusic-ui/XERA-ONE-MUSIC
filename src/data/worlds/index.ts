import type { WorldId, WorldConfig } from '@/types';
import { studiosConfig } from './studios';
import { maxConfig } from './max';
import { infinityConfig } from './infinity';

export const worldConfigs: Record<WorldId, WorldConfig> = {
  studios: studiosConfig,
  max: maxConfig,
  infinity: infinityConfig,
};

export { studiosConfig, maxConfig, infinityConfig };

export function getWorldConfig(worldId: WorldId): WorldConfig {
  return worldConfigs[worldId];
}

export function getWorldBySlug(slug: string): WorldConfig | undefined {
  return Object.values(worldConfigs).find((config) => config.slug === slug);
}

export function getAllWorlds(): WorldConfig[] {
  return Object.values(worldConfigs);
}
