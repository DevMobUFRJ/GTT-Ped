import { intercorrencias } from '@/app/data/intercorrencias';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IntercorrenciaDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [intercorrencia, setIntercorrencia] = useState<null | typeof intercorrencias[0]>(null);

  useEffect(() => {
    if (!id) return;
    const found = intercorrencias.find((d) => d.id === id);
    setIntercorrencia(found ?? null);
  }, [id]);

  if (!intercorrencia) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Carregando intercorrência...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={intercorrencia.imagemUrl}
        style={styles.image}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#19856E" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {intercorrencia.titulo}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 100 }}>
          {intercorrencia.conteudo}
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
    height: '30%',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    aspectRatio: 2,
    resizeMode: 'contain',
    alignSelf: 'center',    
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
