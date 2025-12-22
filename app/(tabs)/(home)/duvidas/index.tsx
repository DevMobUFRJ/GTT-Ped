import { duvidas } from '@/app/data/duvidas';
import { useRouter } from 'expo-router';
import { ChevronLeft, Search } from 'lucide-react-native';
import React, { isValidElement, ReactNode, useMemo, useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DuvidaCard from '../_components/DuvidaCard';

export default function DuvidasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const filteredDuvidas = useMemo(() => {
    if (!searchText.trim()) return duvidas;
    const lowerSearch = searchText.toLowerCase().trim();

    function extractText(node: ReactNode): string {
      if (typeof node === 'string') {
        return node;
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join(' ');
      }
      if (isValidElement(node)) {
        const props = node.props as { children?: ReactNode };
        return extractText(props.children);
      }
      return '';
    }

    return duvidas.filter(({ titulo, conteudo }) => {
      const conteudoStr = extractText(conteudo).toLowerCase();
      return (
        titulo.toLowerCase().includes(lowerSearch) ||
        conteudoStr.includes(lowerSearch)
      );
    });
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[styles.container, { paddingTop: 40, paddingBottom: insets.bottom }]}
      >
        {/* Botão voltar */}
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={28} color="#000" />

          </TouchableOpacity>
          <Text style={styles.title}>Dúvidas</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Caixa verde com título e busca */}
          <View style={styles.greenBox}>

            <Text style={styles.subtitle}>Dúvidas mais comuns com gastrostomia</Text>

            <View style={styles.searchContainer}>
              <Search size={20} color="#ccc" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar dúvidas..."
                placeholderTextColor="#ccc"
                value={searchText}
                onChangeText={setSearchText}
                keyboardType="default"
                returnKeyType="search"
              />
            </View>
          </View>

          {filteredDuvidas.map((duvida) => (
            <DuvidaCard
              key={duvida.id}
              id={duvida.id}
              titulo={duvida.titulo}
            />
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

  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },

  greenBox: {
    backgroundColor: '#19856E',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  subtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // fundo branco
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000', // texto preto
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 6 : 0,
  },

});
