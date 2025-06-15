import Redis from 'ioredis'

import { initialData} from '@/data'
import type { NoteData } from '@/types'

const redis = new Redis()


export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length === 0) {
    // 使用 hset 初始化多个字段
    await redis.hmset("notes", initialData);
  }
  return data;
}

export async function addNote(data: NoteData) {
  const uuid = Date.now().toString();
  // 使用 hset 添加单个字段
  await redis.hset("notes", uuid, JSON.stringify(data));
  return uuid;
}

export async function updateNote(uuid: string, data: NoteData) {
  // 使用 hset 更新字段
  await redis.hset("notes", uuid, JSON.stringify(data));
}

export async function getNote(uuid: string) {
  const data = await redis.hget("notes", uuid);
  return data ? JSON.parse(data) : null;
}

export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid);
}

export default redis
