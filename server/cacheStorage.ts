import {Storage  } from "@/server/cache/storage";
import {SQLiteStorage} from "@/server/cache/sqlite";
import {RedisStorage} from "@/server/cache/redis";

const storage: Storage = process.env.REDIS_STORAGE_URL
    ? new RedisStorage(process.env.REDIS_STORAGE_URL)
    : new SQLiteStorage();


export const getEntry = async (key: string) => await storage.get(key);
export const setEntry = async (key: string, value: unknown) => await storage.set(key, value);
export const deleteEntry = async (key: string) => await storage.delete(key);
export const getByPrefix = async (key: string) => await storage.getByPrefix(key);
