// ============================================
// Serviço de Upload de Fotos (MinIO)
// ============================================
// Envia fotos locais para o MinIO via API
// Atualiza registro local com URL remota
// ============================================

import * as FileSystem from "expo-file-system/legacy";
import { getDatabase } from "./database";
import { getAuthHeaders, getToken } from "./auth";

interface PendingPhoto {
  id: string;
  client_id: string;
  local_path: string;
  type: string;
}

let uploadApiUrl = "";

/**
 * Configurar URL da API para upload
 */
export function setUploadApiUrl(url: string) {
  uploadApiUrl = url;
}

/**
 * Upload de uma foto para o servidor (que faz proxy para o MinIO)
 */
async function uploadSinglePhoto(photo: PendingPhoto): Promise<boolean> {
  if (!uploadApiUrl) return false;

  try {
    const token = await getToken();
    if (!token) return false;

    // Usar FileSystem.uploadAsync para enviar o arquivo
    const result = await FileSystem.uploadAsync(
      `${uploadApiUrl}/api/photos/upload`,
      photo.local_path,
      {
        httpMethod: "POST",
        uploadType: 1, // FileSystemUploadType.MULTIPART
        fieldName: "photo",
        parameters: {
          clientId: photo.client_id,
          photoId: photo.id,
          type: photo.type,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Bypass-Tunnel-Reminder": "true"
        },
      }
    );

    if (result.status === 200 || result.status === 201) {
      const parsedBody = JSON.parse(result.body);
      const responseData = parsedBody.data;
      const db = await getDatabase();

      // Atualizar registro local com URL remota
      await db.runAsync(
        `UPDATE client_photos
         SET remote_url = ?, uploaded = 1
         WHERE id = ?`,
        [responseData?.url || responseData?.objectKey, photo.id]
      );

      return true;
    } else {
      console.log(`[Upload] HTTP Status não-200: ${result.status} | Body: ${result.body}`);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
/**
 * Processar fila de fotos pendentes de upload
 */
export async function processPhotoUploads(): Promise<{
  uploaded: number;
  failed: number;
}> {
  const db = await getDatabase();
  let uploaded = 0;
  let failed = 0;

  try {
    const pending = await db.getAllAsync<PendingPhoto>(
      `SELECT id, client_id, local_path, type
       FROM client_photos
       WHERE uploaded = 0 AND local_path IS NOT NULL
       ORDER BY created_at ASC
       LIMIT 10`
    );

    for (const photo of pending) {
      try {
        const success = await uploadSinglePhoto(photo);
        if (success) {
          uploaded++;
        } else {
          console.log(`[Upload] Foto ${photo.id} falhou com retorno false.`);
          failed++;
        }
      } catch (err: any) {
        console.error(`[Upload] Exceção na foto ${photo.id}:`, err);
        if (err?.message?.includes("ENOENT") || err?.message?.includes("does not exist")) {
           // File deleted locally
           await db.runAsync(
             `UPDATE client_photos SET uploaded = 1 WHERE id = ?`,
             [photo.id]
           );
        } else {
          failed++;
        }
      }
    }
  } catch (error) {
    console.error("Photo upload batch error:", error);
  }

  return { uploaded, failed };
}

/**
 * Obter contagem de fotos pendentes
 */
export async function getPendingPhotoCount(): Promise<number> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM client_photos WHERE uploaded = 0 AND local_path IS NOT NULL`
  );
  return result?.count || 0;
}
