import {createClient} from "redis";
import {safeParse, safeStringify, Storage} from "@/server/cache/storage";

export class RedisStorage implements Storage {
    private client;

    constructor(redisUrl: string) {
        this.client = createClient({ url: redisUrl });
        this.client.connect().catch(console.error);
    }

    async get(key: string): Promise<unknown | null> {
        return safeParse(await this.client.get(key));
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, safeStringify(value));
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    async getByPrefix(prefix: string): Promise<Record<string, unknown>> {
        const stream = this.client.scanIterator({ MATCH: `${prefix}*` });
        const result: Record<string, unknown> = {};

        for await (const key of stream) {
            const value = safeParse(await this.client.get(key));
            if (value !== null) result[key] = value;
        }

        return result;
    }
}