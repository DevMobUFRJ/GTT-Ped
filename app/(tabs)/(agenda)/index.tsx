import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const compromissosMock = [
  { hora: '13:30', categoria: 'MEDICAMENTO', cor: '#FFA94D', descricao: 'Antibiótico profilaxia', tempo: 'Em 10min' },
  { hora: '14:00', categoria: 'ALIMENTAÇÃO', cor: '#748FFC', descricao: 'Sopa de legumes', tempo: 'Em 30min' },
  { hora: '18:30', categoria: 'CONSULTA', cor: '#40C057', descricao: 'Gastro', tempo: 'Em 5 h' },
  { hora: '21:30', categoria: 'MEDICAMENTO', cor: '#FFA94D', descricao: 'Antibiótico profilaxia', tempo: 'Em 8 h' },
];

export default function AgendaScreen() {
  const screenWidth = Dimensions.get('window').width;
  const hoje = new Date();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const dias = Array.from({ length: 30 }, (_, i) => {
    const data = new Date();
    data.setDate(hoje.getDate() + i);
    return {
      data,
      dia: data.getDate(),
      semana: diasDaSemana[data.getDay()],
      compromissos: 2,
    };
  });

  const titulo = `${dias[selectedDayIndex].dia} de ${meses[dias[selectedDayIndex].data.getMonth()]}, ${dias[selectedDayIndex].data.getFullYear()}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysRow}
        contentContainerStyle={{ gap: 10 }}
      >
        {dias.map((dia, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayItem, { width: screenWidth / 5, }, isSelected && styles.selectedDay]}
              onPress={() => setSelectedDayIndex(index)}
            >
              <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>{dia.dia}</Text>
              <Text style={[styles.dayLabel, isSelected && styles.selectedText]}>{dia.semana}</Text>
              <View style={[styles.badge, isSelected && styles.selectedBadge]}>
                <Text style={[styles.badgeText, isSelected && styles.selectedBadgeText]}>{dia.compromissos}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={compromissosMock}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardHour}>{item.hora}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.categoryDot, { backgroundColor: item.cor }]} />
                <Text style={[styles.cardCategory, { color: item.cor }]}>{item.categoria}</Text>
              </View>
              <Text style={styles.cardDesc}>{item.descricao}</Text>
            </View>
            <Text style={styles.cardTime}>{item.tempo}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 16,
  },

  daysRow: {
    marginBottom: 16,
    padding: 10
  },

  dayItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    gap: 4
  },

  selectedDay: {
    backgroundColor: '#19856E',
  },

  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  dayLabel: {
    fontSize: 14,
    color: '#555',
  },

  selectedText: {
    color: '#fff',
  },

  badge: {
    backgroundColor: '#ccc',
    marginTop: 4,
    width: 30,
    height: 30,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedBadge: {
    backgroundColor: '#fff',
  },

  badgeText: {
    fontSize: 14,
    color: '#000',
  },

  selectedBadgeText: {
    color: '#19856E',
  },

  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  cardLeft: {
    flex: 1,
  },

  cardHour: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  cardCategory: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  cardDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },

  cardTime: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-start',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#19856E',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
