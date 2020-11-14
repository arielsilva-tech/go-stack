import cache from '@config/cache';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IORedis, { Redis } from 'ioredis';

export default class RedisCacheProvider implements ICacheProvider {
  private client: Redis;

  constructor() {
    this.client = new IORedis(cache.config.redis);
  }

  public async invalidatePrefix(key: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(value => {
      pipeline.del(value);
    });

    await pipeline.exec();
  }

  public async invalidate(key: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedDate = JSON.parse(data) as T;
    return parsedDate;
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
}
