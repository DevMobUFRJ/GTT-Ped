import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarEvents from 'react-native-calendar-events';

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const categorias = [
  { nome: 'MEDICAMENTO', cor: '#FFA94D' },
  { nome: 'ALIMENTAÇÃO', cor: '#748FFC' },
  { nome: 'CONSULTA', cor: '#40C057' },
  { nome: 'OUTRO', cor: '#868E96' },
];

type Categoria = {
  nome: string;
  cor: string;
};

type Compromisso = {
  id: string;        // id único do item
  serieId?: string;
  calendarEventId?: string;
  titulo: string;
  categoria: Categoria;
  hora: string;
  data: Date;
  repetirEm: number[];
};

type CompromissoForm = Omit<Compromisso, 'id' | 'serieId' | 'data' | 'calendarEventId'>;

function gerarId() {
  return Math.random().toString(36).substring(2, 9);
}

// Função para criar evento no calendário
async function criarEventoCalendario(
  title: string,
  startDate: Date,
  endDate: Date,
  minutesBefore: number = 10
): Promise<string | null> {
  try {
    let status = await CalendarEvents.checkPermissions();
    if (status !== 'authorized') {
      status = await CalendarEvents.requestPermissions();
      if (status !== 'authorized') return null;
    }

    const calendars = await CalendarEvents.findCalendars();
    const defaultCalendar = calendars.find(cal => cal.allowsModifications) || calendars[0];
    if (!defaultCalendar) return null;

    const eventId = await CalendarEvents.saveEvent(title, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      alarms: [{ date: -minutesBefore }],
      calendarId: defaultCalendar.id,
    });

    return eventId ?? null;
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return null;
  }
}

// Função para remover evento do calendário
async function removerEventoCalendario(eventId?: string) {
  if (!eventId) return;
  try {
    await CalendarEvents.removeEvent(eventId);
  } catch (error) {
    console.error('Erro ao remover evento:', error);
  }
}

export default function AgendaScreen() {
  const [compromissoSelecionado, setCompromissoSelecionado] = useState<Compromisso | null>(null);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const hoje = new Date();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoCompromisso, setNovoCompromisso] = useState<CompromissoForm>({
    titulo: '',
    categoria: categorias[0],
    hora: '12:00',
    repetirEm: [],
  });

  const dias = Array.from({ length: 30 }, (_, i) => {
    const data = new Date();
    data.setDate(hoje.getDate() + i);
    return {
      data,
      dia: data.getDate(),
      semana: diasDaSemana[data.getDay()],
    };
  });

  const tituloDia = `${dias[selectedDayIndex].dia} de ${meses[dias[selectedDayIndex].data.getMonth()]}, ${dias[selectedDayIndex].data.getFullYear()}`;

  useEffect(() => {
    carregarCompromissos();
  }, []);

  async function salvarCompromisso(
    form: CompromissoForm,
    dataSelecionada: Date
  ) {
    const [hora, minuto] = form.hora.split(':');
    const base = new Date(dataSelecionada);
    base.setHours(Number(hora), Number(minuto), 0, 0);

    // 🔹 SEM repetição (evento único)
    if (form.repetirEm.length === 0) {
      const fim = new Date(base);
      fim.setMinutes(fim.getMinutes() + 10);

      const calendarEventId = await criarEventoCalendario(form.titulo, base, fim, 10);

      const novo: Compromisso = {
        ...form,
        id: gerarId(),
        data: base,
        calendarEventId: calendarEventId ?? undefined,
      };

      const todos = [...compromissos, novo];
      setCompromissos(todos);
      await AsyncStorage.setItem('compromissos', JSON.stringify(todos));
      return;
    }

    // 🔹 COM repetição (série)
    const serieId = gerarId();
    const novos: Compromisso[] = [];

    for (let i = 0; i < 42; i++) {
      const novaData = new Date(base);
      novaData.setDate(base.getDate() + i);

      if (form.repetirEm.includes(novaData.getDay())) {
        const fim = new Date(novaData);
        fim.setMinutes(fim.getMinutes() + 10);

        const calendarEventId = await criarEventoCalendario(form.titulo, novaData, fim, 10);

        novos.push({
          ...form,
          id: gerarId(),
          serieId,
          data: novaData,
          calendarEventId: calendarEventId ?? undefined,
        });
      }
    }

    const todos = [...compromissos, ...novos];
    setCompromissos(todos);
    await AsyncStorage.setItem('compromissos', JSON.stringify(todos));
  }

  async function editarCompromisso() {
    if (!compromissoSelecionado) return;

    const antesEraSerie = !!compromissoSelecionado.serieId;
    const depoisEhSerie = novoCompromisso.repetirEm.length > 0;

    // 🔹 DATA BASE do evento original
    const base = new Date(compromissoSelecionado.data);
    const [hora, minuto] = novoCompromisso.hora.split(':');
    base.setHours(Number(hora), Number(minuto), 0, 0);

    // remove do calendário o que vai ser substituído
    if (antesEraSerie) {
      const daSerie = compromissos.filter(c => c.serieId === compromissoSelecionado.serieId);
      for (const c of daSerie) {
        await removerEventoCalendario(c.calendarEventId);
      }
    } else {
      await removerEventoCalendario(compromissoSelecionado.calendarEventId);
    }

    // 🔹 CASO 1: NÃO ERA série e CONTINUA não sendo
    if (!antesEraSerie && !depoisEhSerie) {
      const fim = new Date(base);
      fim.setMinutes(fim.getMinutes() + 10);
      const calendarEventId = await criarEventoCalendario(novoCompromisso.titulo, base, fim, 10);

      const atualizados = compromissos.map(c =>
        c.id === compromissoSelecionado.id
          ? { ...c, ...novoCompromisso, data: base, calendarEventId: calendarEventId ?? undefined }
          : c
      );

      setCompromissos(atualizados);
      await AsyncStorage.setItem('compromissos', JSON.stringify(atualizados));
    }

    // 🔹 CASO 2: NÃO ERA série e AGORA É
    if (!antesEraSerie && depoisEhSerie) {
      // remove o evento único
      const filtrados = compromissos.filter(
        c => c.id !== compromissoSelecionado.id
      );

      const serieId = gerarId();
      const novos: Compromisso[] = [];

      for (let i = 0; i < 42; i++) {
        const novaData = new Date(base);
        novaData.setDate(base.getDate() + i);

        if (novoCompromisso.repetirEm.includes(novaData.getDay())) {
          const fim = new Date(novaData);
          fim.setMinutes(fim.getMinutes() + 10);
          const calendarEventId = await criarEventoCalendario(novoCompromisso.titulo, novaData, fim, 10);

          novos.push({
            ...novoCompromisso,
            id: gerarId(),
            serieId,
            data: novaData,
            calendarEventId: calendarEventId ?? undefined,
          });
        }
      }

      setCompromissos([...filtrados, ...novos]);
      await AsyncStorage.setItem(
        'compromissos',
        JSON.stringify([...filtrados, ...novos])
      );
    }

    // 🔹 CASO 3: ERA série e CONTINUA sendo
    if (antesEraSerie && depoisEhSerie) {
      const filtrados = compromissos.filter(
        c => c.serieId !== compromissoSelecionado.serieId
      );

      const serieId = gerarId();
      const novos: Compromisso[] = [];

      for (let i = 0; i < 42; i++) {
        const novaData = new Date(base);
        novaData.setDate(base.getDate() + i);

        if (novoCompromisso.repetirEm.includes(novaData.getDay())) {
          const fim = new Date(novaData);
          fim.setMinutes(fim.getMinutes() + 10);
          const calendarEventId = await criarEventoCalendario(novoCompromisso.titulo, novaData, fim, 10);

          novos.push({
            ...novoCompromisso,
            id: gerarId(),
            serieId,
            data: novaData,
            calendarEventId: calendarEventId ?? undefined,
          });
        }
      }

      setCompromissos([...filtrados, ...novos]);
      await AsyncStorage.setItem(
        'compromissos',
        JSON.stringify([...filtrados, ...novos])
      );
    }

    // 🔹 CASO 4: ERA série e AGORA NÃO É
    if (antesEraSerie && !depoisEhSerie) {
      // remove toda a série antiga
      const filtrados = compromissos.filter(
        c => c.serieId !== compromissoSelecionado.serieId
      );

      const fim = new Date(base);
      fim.setMinutes(fim.getMinutes() + 10);
      const calendarEventId = await criarEventoCalendario(novoCompromisso.titulo, base, fim, 10);

      // cria UM evento único
      const unico: Compromisso = {
        ...novoCompromisso,
        id: gerarId(),
        data: base,
        calendarEventId: calendarEventId ?? undefined,
      };

      setCompromissos([...filtrados, unico]);
      await AsyncStorage.setItem(
        'compromissos',
        JSON.stringify([...filtrados, unico])
      );
    }

    setModalEditarVisible(false);
    setCompromissoSelecionado(null);
  }

  async function excluirCompromisso() {
    if (!compromissoSelecionado) return;

    // remove no calendário primeiro
    if (compromissoSelecionado.serieId) {
      const daSerie = compromissos.filter(c => c.serieId === compromissoSelecionado.serieId);
      for (const c of daSerie) {
        await removerEventoCalendario(c.calendarEventId);
      }
    } else {
      await removerEventoCalendario(compromissoSelecionado.calendarEventId);
    }

    const filtrados = compromissoSelecionado.serieId
      ? compromissos.filter(c => c.serieId !== compromissoSelecionado.serieId)
      : compromissos.filter(c => c.id !== compromissoSelecionado.id);

    setCompromissos(filtrados);
    await AsyncStorage.setItem('compromissos', JSON.stringify(filtrados));

    setModalEditarVisible(false);
    setCompromissoSelecionado(null);
  }

  async function carregarCompromissos() {
    const data = JSON.parse(await AsyncStorage.getItem('compromissos') || '[]');
    setCompromissos(data);
  }

  const compromissosDoDia = compromissos.filter(c => {
    const cData = new Date(c.data);
    const d = dias[selectedDayIndex].data;
    return cData.getDate() === d.getDate() &&
      cData.getMonth() === d.getMonth() &&
      cData.getFullYear() === d.getFullYear();
  });

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 60 }]}>
      <Text style={styles.title}>{tituloDia}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'stretch', // importante!
          paddingVertical: 8,
          gap: 10,
        }}
      >

        {dias.map((dia, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayItem, { width: screenWidth / 5 }, isSelected && styles.selectedDay]}
              onPress={() => setSelectedDayIndex(index)}
            >
              <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>{dia.dia}</Text>
              <Text style={[styles.dayLabel, isSelected && styles.selectedText]}>{dia.semana}</Text>
              <View style={[styles.badge, isSelected && styles.selectedBadge]}>
                <Text style={[styles.badgeText, isSelected && styles.selectedBadgeText]}>
                  {compromissos.filter(c => {
                    const cData = new Date(c.data);
                    return (
                      cData.getDate() === dia.data.getDate() &&
                      cData.getMonth() === dia.data.getMonth() &&
                      cData.getFullYear() === dia.data.getFullYear()
                    );
                  }).length}

                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={compromissosDoDia}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setCompromissoSelecionado(item);
              setNovoCompromisso({
                titulo: item.titulo,
                categoria: item.categoria,
                hora: item.hora,
                repetirEm: item.repetirEm,
              });
              setModalEditarVisible(true);
            }}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.cardHour}>{item.hora}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.categoryDot, { backgroundColor: item.categoria.cor }]} />
                <Text style={[styles.cardCategory, { color: item.categoria.cor }]}>
                  {item.categoria.nome}
                </Text>
              </View>
              <Text style={styles.cardDesc}>{item.titulo}</Text>
            </View>
          </TouchableOpacity>
        )}

      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Compromisso</Text>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={novoCompromisso.titulo}
              onChangeText={(t) => setNovoCompromisso({ ...novoCompromisso, titulo: t })}
            />
            <TextInput
              placeholder="Hora (HH:MM)"
              style={styles.input}
              value={novoCompromisso.hora}
              onChangeText={(t) => setNovoCompromisso({ ...novoCompromisso, hora: t })}
            />
            <Text style={{ marginBottom: 8 }}>Repetir em:</Text>
            <View style={styles.categoriasRow}>
              {diasDaSemana.map((dia, index) => {
                const selecionado = novoCompromisso.repetirEm.includes(index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoriaBtn,
                      selecionado && { backgroundColor: '#19856E' }
                    ]}
                    onPress={() => {
                      const novosDias = selecionado
                        ? novoCompromisso.repetirEm.filter(d => d !== index)
                        : [...novoCompromisso.repetirEm, index];
                      setNovoCompromisso({ ...novoCompromisso, repetirEm: novosDias });
                    }}
                  >
                    <Text style={[styles.categoriaText, selecionado && { color: '#fff' }]}>
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={{ marginBottom: 8 }}>Categoria:</Text>
            <View style={styles.categoriasRow}>
              {categorias.map(cat => (
                <TouchableOpacity
                  key={cat.nome}
                  style={[
                    styles.categoriaBtn,
                    novoCompromisso.categoria.nome === cat.nome && { backgroundColor: cat.cor }
                  ]}
                  onPress={() => setNovoCompromisso({ ...novoCompromisso, categoria: cat })}
                >
                  <Text style={styles.categoriaText}>{cat.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              {/* Salvar - ESQUERDA */}
              <TouchableOpacity
                onPress={() => {
                  salvarCompromisso(
                    novoCompromisso,
                    dias[selectedDayIndex].data
                  );

                  setModalVisible(false);
                  setNovoCompromisso({
                    titulo: '',
                    categoria: categorias[0],
                    hora: '12:00',
                    repetirEm: [],
                  });
                }}
              >
                <Text style={styles.modalBtn}>Salvar</Text>
              </TouchableOpacity>

              {/* Cancelar - DIREITA */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setNovoCompromisso({
                    titulo: '',
                    categoria: categorias[0],
                    hora: '12:00',
                    repetirEm: [],
                  });
                }}
              >
                <Text style={[styles.modalBtn, { color: '#999' }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      <Modal visible={modalEditarVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Compromisso</Text>

            <TextInput
              style={styles.input}
              value={novoCompromisso.titulo}
              onChangeText={t =>
                setNovoCompromisso({ ...novoCompromisso, titulo: t })
              }
            />

            <TextInput
              style={styles.input}
              value={novoCompromisso.hora}
              onChangeText={t =>
                setNovoCompromisso({ ...novoCompromisso, hora: t })
              }
            />

            {/* REPETIR EM */}
            <Text style={{ marginBottom: 8 }}>Repetir em:</Text>
            <View style={styles.categoriasRow}>
              {diasDaSemana.map((dia, index) => {
                const selecionado = novoCompromisso.repetirEm.includes(index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoriaBtn,
                      selecionado && { backgroundColor: '#19856E' },
                    ]}
                    onPress={() => {
                      const novosDias = selecionado
                        ? novoCompromisso.repetirEm.filter(d => d !== index)
                        : [...novoCompromisso.repetirEm, index];

                      setNovoCompromisso({
                        ...novoCompromisso,
                        repetirEm: novosDias,
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.categoriaText,
                        selecionado && { color: '#fff' },
                      ]}
                    >
                      {dia}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* CATEGORIA */}
            <Text style={{ marginBottom: 8 }}>Categoria:</Text>
            <View style={styles.categoriasRow}>
              {categorias.map(cat => (
                <TouchableOpacity
                  key={cat.nome}
                  style={[
                    styles.categoriaBtn,
                    novoCompromisso.categoria.nome === cat.nome && {
                      backgroundColor: cat.cor,
                    },
                  ]}
                  onPress={() =>
                    setNovoCompromisso({ ...novoCompromisso, categoria: cat })
                  }
                >
                  <Text style={styles.categoriaText}>{cat.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* BOTÕES */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              <TouchableOpacity onPress={editarCompromisso}>
                <Text style={styles.modalBtn}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={excluirCompromisso}>
                <Text style={[styles.modalBtn, { color: '#E03131' }]}>
                  Excluir
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalEditarVisible(false)}>
                <Text style={[styles.modalBtn, { color: '#999' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 16
  },

  daysRow: {
    marginBottom: 16,
    padding: 10
  },

  dayItem: {
    width: 72,
    minHeight: 90,      // nunca menor que isso
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    paddingVertical: 12, // permite crescer quando tem espaço
    gap: 4,
  },

  selectedDay: {
    backgroundColor: '#19856E'
  },

  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },

  dayLabel: {
    fontSize: 14,
    color: '#555'
  },

  selectedText: {
    color: '#fff'
  },

  badge: {
    backgroundColor: '#ccc',
    marginTop: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedBadge: {
    backgroundColor: '#fff'
  },

  badgeText: {
    fontSize: 14,
    color: '#000'
  },

  selectedBadgeText: {
    color: '#19856E'
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
    shadowRadius: 2
  },

  cardLeft: {
    flex: 1
  },

  cardHour: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },

  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4
  },

  cardCategory: {
    fontSize: 14,
    fontWeight: 'bold'
  },

  cardDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4
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
    shadowRadius: 4
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },

  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  categoriaBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8
  },

  categoriaText: {
    fontSize: 12
  },

  modalBtn: {
    fontSize: 16,
    color: '#19856E',
    fontWeight: 'bold'
  }
});
