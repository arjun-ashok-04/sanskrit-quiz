export interface Storage {
    get(key: string): Promise<unknown | null>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    getByPrefix(prefix: string): Promise<Record<string, unknown>>;
}

export const safeParse = (value: string | null): unknown => {
    try {
        return JSON.parse(value ?? "{}");
    } catch (e) {
        return null;
    }
}

export const safeStringify = (value: unknown): string => {
    try {
        return JSON.stringify(value ?? {});
    } catch (e) {
        return "{}";
    }
}

