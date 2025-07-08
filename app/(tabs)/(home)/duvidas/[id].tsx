import { duvidas } from '@/app/data/duvidas';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DuvidaDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [duvida, setDuvida] = useState<null | typeof duvidas[0]>(null);

  useEffect(() => {
    if (!id) return;
    const found = duvidas.find((d) => d.id === id);
    setDuvida(found ?? null);
  }, [id]);

  if (!duvida) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Carregando dúvida...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: duvida.imagemUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#19856E" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {duvida.titulo}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 100 }}>
          {duvida.conteudo}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 4,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#19856E',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
