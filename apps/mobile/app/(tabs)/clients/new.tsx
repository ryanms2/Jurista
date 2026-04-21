// ============================================
// Cadastro Completo de Cliente
// ============================================
// Form com validação + upload de fotos
// ============================================

import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Crypto from "expo-crypto";
import { getDatabase } from "../../../src/services";
import { enqueueSync } from "../../../src/services/sync";
import { Input, Button, Separator } from "../../../src/components";
import { maskCpf, maskPhone, maskRg, onlyDigits } from "../../../src/components/masks";

interface PhotoItem {
  id: string;
  uri: string;
  type: "rg" | "selfie" | "facade" | "other";
  name: string;
}

const PHOTO_TYPES = [
  { value: "rg", label: "📄 RG", icon: "📄" },
  { value: "selfie", label: "🤳 Cliente", icon: "🤳" },
  { value: "facade", label: "🏠 Fachada", icon: "🏠" },
  { value: "other", label: "📎 Outro", icon: "📎" },
] as const;

export default function NewClientScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  // Form fields
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    const cpfDigits = onlyDigits(cpf);
    if (cpfDigits.length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    if (!rg.trim() || rg.trim().length < 5) {
      newErrors.rg = "RG deve ter pelo menos 5 caracteres";
    }

    if (!address.trim() || address.trim().length < 10) {
      newErrors.address = "Endereço deve ter pelo menos 10 caracteres";
    }

    const phone1Digits = onlyDigits(phone1);
    if (phone1Digits.length < 10 || phone1Digits.length > 11) {
      newErrors.phone1 = "Telefone inválido";
    }

    const phone2Digits = onlyDigits(phone2);
    if (phone2 && phone2Digits.length > 0 && (phone2Digits.length < 10 || phone2Digits.length > 11)) {
      newErrors.phone2 = "Telefone 2 inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickPhoto = async (type: PhotoItem["type"]) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newPhotos = result.assets.map((asset) => ({
        id: Crypto.randomUUID(),
        uri: asset.uri,
        type,
        name: asset.fileName || `${type}_${Date.now()}.jpg`,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const takePhoto = async (type: PhotoItem["type"]) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão", "Precisamos de acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0]!;
      setPhotos((prev) => [
        ...prev,
        {
          id: Crypto.randomUUID(),
          uri: asset.uri,
          type,
          name: `${type}_${Date.now()}.jpg`,
        },
      ]);
    }
  };

  const showPhotoOptions = (type: PhotoItem["type"]) => {
    Alert.alert("Adicionar Foto", "Escolha a origem:", [
      { text: "📷 Câmera", onPress: () => takePhoto(type) },
      { text: "🖼️ Galeria", onPress: () => pickPhoto(type) },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    setLoading(true);

    try {
      const db = await getDatabase();
      const clientId = Crypto.randomUUID();
      const cpfDigits = onlyDigits(cpf);
      const phone1Digits = onlyDigits(phone1);
      const phone2Digits = onlyDigits(phone2);

      // Verificar CPF duplicado
      const existing = await db.getFirstAsync<{ id: string }>(
        `SELECT id FROM clients WHERE cpf = ?`,
        [cpfDigits]
      );

      if (existing) {
        Alert.alert("Erro", "Já existe um cliente com este CPF.");
        setLoading(false);
        return;
      }

      // Inserir cliente
      await db.runAsync(
        `INSERT INTO clients (id, name, cpf, rg, address, phone1, phone2)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [clientId, name.trim(), cpfDigits, rg.trim(), address.trim(), phone1Digits, phone2Digits || null]
      );

      // Inserir fotos (local path)
      for (const photo of photos) {
        await db.runAsync(
          `INSERT INTO client_photos (id, client_id, local_path, type, description, uploaded)
           VALUES (?, ?, ?, ?, ?, 0)`,
          [photo.id, clientId, photo.uri, photo.type, photo.name]
        );
      }

      // Enfileirar para sync
      await enqueueSync("client", clientId, "create", {
        id: clientId,
        name: name.trim(),
        cpf: cpfDigits,
        rg: rg.trim(),
        address: address.trim(),
        phone1: phone1Digits,
        phone2: phone2Digits || null,
        photos: photos.map((p) => ({
          id: p.id,
          type: p.type,
          localPath: p.uri,
        })),
      });

      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Create client error:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Dados Pessoais */}
        <Text className="text-text-primary font-sans-bold text-lg mb-4">
          👤 Dados Pessoais
        </Text>

        <Input
          label="Nome Completo"
          value={name}
          onChangeText={setName}
          placeholder="Ex: João da Silva"
          autoCapitalize="words"
          error={errors.name}
        />

        <Input
          label="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(maskCpf(text))}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          maxLength={14}
          error={errors.cpf}
        />

        <Input
          label="RG"
          value={rg}
          onChangeText={(text) => setRg(maskRg(text))}
          placeholder="00.000.000-0"
          maxLength={13}
          error={errors.rg}
        />

        <Input
          label="Endereço Completo"
          value={address}
          onChangeText={setAddress}
          placeholder="Rua, número, bairro, cidade"
          multiline
          numberOfLines={2}
          error={errors.address}
        />

        <Separator label="CONTATO" />

        <Input
          label="Telefone 1"
          leftIcon="📱"
          value={phone1}
          onChangeText={(text) => setPhone1(maskPhone(text))}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
          maxLength={15}
          error={errors.phone1}
        />

        <Input
          label="Telefone 2 (opcional)"
          leftIcon="📞"
          value={phone2}
          onChangeText={(text) => setPhone2(maskPhone(text))}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
          maxLength={15}
          error={errors.phone2}
        />

        <Separator label="FOTOS" />

        {/* Photo Buttons */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {PHOTO_TYPES.map((pt) => (
            <TouchableOpacity
              key={pt.value}
              onPress={() => showPhotoOptions(pt.value)}
              className="bg-surface border border-border border-dashed rounded-xl px-4 py-3 flex-row items-center"
              activeOpacity={0.7}
            >
              <Text className="text-base mr-2">{pt.icon}</Text>
              <Text className="text-text-secondary text-sm">{pt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <View className="flex-row flex-wrap gap-2 mb-4">
            {photos.map((photo) => (
              <View key={photo.id} className="relative">
                <Image
                  source={{ uri: photo.uri }}
                  className="w-24 h-24 rounded-xl"
                  resizeMode="cover"
                />
                <View className="absolute bottom-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
                  <Text className="text-white text-[9px]">
                    {PHOTO_TYPES.find((t) => t.value === photo.type)?.icon} {photo.type}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removePhoto(photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-danger rounded-full items-center justify-center"
                >
                  <Text className="text-white text-xs font-sans-bold">×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <Text className="text-text-muted text-xs mb-6">
          💡 Adicione quantas fotos precisar: RG, foto do cliente, fachada, etc.
        </Text>

        {/* Submit */}
        <Button
          title="Cadastrar Cliente"
          icon="✅"
          loading={loading}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
