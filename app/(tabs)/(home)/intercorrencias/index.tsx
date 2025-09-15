import { intercorrencias } from '@/app/data/intercorrencias';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import IntercorrenciaCard from '../_components/IntercorrenciaCard';

export default function intercorrenciasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const filtered = useMemo(() => {
    if (!searchText.trim()) return intercorrencias;
    const lowerSearch = searchText.toLowerCase().trim();

    return intercorrencias.filter(({ titulo }) =>
      titulo.toLowerCase().includes(lowerSearch)
    );
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[styles.container, { paddingBottom: insets.bottom }]}
      >
        {/* Botão voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Intercorrências</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Caixa verde com título e busca */}
          <View style={styles.greenBox}>
            <Text style={styles.subtitle}>Principais intercorrências</Text>

            <View style={styles.searchContainer}>
              <Search size={20} color="#ccc" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar intercorrências..."
                placeholderTextColor="#ccc"
                value={searchText}
                onChangeText={setSearchText}
                returnKeyType="search"
              />
            </View>
          </View>

          {filtered.map((item) => (
            <IntercorrenciaCard key={item.id} id={item.id} titulo={item.titulo} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  greenBox: {
    backgroundColor: '#19856E',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
    fontSize: 16,
  },
});
