// POST /api/photos/upload — Upload de foto (proxy → MinIO)
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { uploadFile } from "@/lib/minio";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user) return apiUnauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("photo") as File | null;
    const clientId = formData.get("clientId") as string;
    const photoId = formData.get("photoId") as string;
    const type = formData.get("type") as string;

    if (!file || !clientId || !photoId) {
      return apiError("Arquivo, clientId e photoId são obrigatórios");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "jpg";
    const objectKey = `clients/${clientId}/${photoId}.${ext}`;

    const path = await uploadFile(objectKey, buffer, file.type || "image/jpeg");

    // Salvar referência no banco
    await prisma.clientPhoto.upsert({
      where: { id: photoId },
      create: {
        id: photoId,
        clientId,
        objectKey: objectKey,
        originalName: file.name,
        type,
      },
      update: {
        objectKey: objectKey,
      },
    });

    return apiSuccess({ objectKey, url: path }, 201);
  } catch (error) {
    console.error("Photo upload error:", error);
    return apiError("Erro ao fazer upload da foto", 500);
  }
}
