import { useRouter } from 'expo-router';
import { ArrowUpRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DuvidaCardProps = {
  id: string;
  titulo: string;
};

export default function DuvidaCard({ id, titulo }: DuvidaCardProps) {
  const router = useRouter();

  function handlePress() {
    router.push(`/(tabs)/(home)/duvidas/${id}`);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {titulo}
        </Text>
        <ArrowUpRight size={20} color="#19856E" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,

    // Android shadow
    elevation: 2,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#19856E',
    flex: 1,
    marginRight: 8,
  },
});
