import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@jurista/database";
import { getPresignedUrl } from "@/lib/minio";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const photoId = resolvedParams.id;

    if (!photoId) {
      return NextResponse.json({ error: "ID da foto não fornecido" }, { status: 400 });
    }

    const photo = await prisma.clientPhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Foto não encontrada" }, { status: 404 });
    }

    // Gerar URL pré-assinada do MinIO
    const url = await getPresignedUrl(photo.objectKey);

    // Redirecionar para a URL do MinIO (o navegador fará o download/exibição direto dele)
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Erro ao buscar foto:", error);
    return NextResponse.json({ error: "Erro interno ao buscar foto" }, { status: 500 });
  }
}
