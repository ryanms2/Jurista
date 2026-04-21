// ============================================
// MinIO Client
// ============================================

import { Client } from "minio";

const endpointUrlStr = process.env.MINIO_ENDPOINT || "http://localhost:9000";
// Make sure it has a protocol to parse cleanly
const safeUrlStr = endpointUrlStr.startsWith("http") ? endpointUrlStr : `http://${endpointUrlStr}`;
const parsedUrl = new URL(safeUrlStr);

const isSSL =
  process.env.MINIO_USE_SSL === "true" || parsedUrl.protocol === "https:";
const defaultPort = isSSL ? 443 : 80;

// Se tem https e não tem porta explícita na própria URL
let finalPort: number | undefined = parsedUrl.port ? parseInt(parsedUrl.port, 10) : undefined;
// Só usamos o MINIO_PORT caso não seja https (ambiente dev local)
if (!parsedUrl.port && process.env.MINIO_PORT && !isSSL) {
  finalPort = parseInt(process.env.MINIO_PORT, 10);
}

// Omitir portas padrões para não quebrar a assinatura XML do Presigned URL
if (isSSL && finalPort === 443) finalPort = undefined;
if (!isSSL && finalPort === 80) finalPort = undefined;

const minioClient = new Client({
  endPoint: parsedUrl.hostname,
  port: finalPort,
  useSSL: isSSL,
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

const BUCKET_NAME = process.env.MINIO_BUCKET || process.env.MINIO_BUCKET_PHOTOS || "jurista-photos";

/**
 * Garantir que o bucket existe
 */
export async function ensureBucket(): Promise<void> {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME);
  }
}

/**
 * Upload de arquivo para o MinIO
 */
export async function uploadFile(
  objectKey: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  await ensureBucket();

  await minioClient.putObject(BUCKET_NAME, objectKey, buffer, buffer.length, {
    "Content-Type": contentType,
  });

  return `${BUCKET_NAME}/${objectKey}`;
}

/**
 * Gerar URL pré-assinada para download (válida por 7 dias)
 */
export async function getPresignedUrl(objectKey: string): Promise<string> {
  return minioClient.presignedGetObject(BUCKET_NAME, objectKey, 7 * 24 * 60 * 60);
}

/**
 * Deletar arquivo do MinIO
 */
export async function deleteFile(objectKey: string): Promise<void> {
  await minioClient.removeObject(BUCKET_NAME, objectKey);
}

export { minioClient, BUCKET_NAME };
