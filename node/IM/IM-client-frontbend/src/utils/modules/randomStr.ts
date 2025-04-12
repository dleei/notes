/**
 * 生成随机字符串
 * @param length 字符串长度
 * @param charSet 可选自定义字符集（默认包含大小写字母和数字）
 * @returns 随机字符串
 */

export function generateRandomString(
  length: number,
  charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  // 参数校验
  if (length < 1) throw new Error('Length must be a positive integer')
  if (charSet.length === 0) throw new Error('Character set cannot be empty')

  // 使用浏览器 Crypto API 或 Node.js crypto 模块增强随机性（更安全）
  const isBrowser = typeof window !== 'undefined'
  const crypto = isBrowser ? window.crypto : require('crypto')

  // 创建缓冲区存放随机值
  const buffer = new Uint8Array(length)
  crypto.getRandomValues(buffer)

  // 生成随机字符串
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charSet[buffer[i] % charSet.length]
  }

  return result
}
