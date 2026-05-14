import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
    fontSize: 16,
    color: '#000',
  },
  paragraph2: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'justify',
    fontSize: 16,
    color: '#000',
  },
});

export const intercorrencias = [
  {
    id: '1',
    titulo: 'Se a sonda sair',
    textoBusca:
      'sonda sair emergência gastrostomia cuidador introduzir nova sonda',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          Se a sonda sair, levar a criança na emergência mais próxima. O cuidador pode
          introduzir uma nova sonda, desde que ele seja treinado pelo profissional de
          saúde. É importante saber o tamanho e ter em casa a sonda de gastrostomia do
          seu filho. Após repassar a sonda, procurar um serviço de saúde para verificar
          se a sonda está bem posicionada.
        </Text>
        <Text style={styles.paragraph2}>
          <Text style={{ fontWeight: 'bold' }}>Atenção!!! </Text>
          O óstio da gastrostomia fecha muito rápido, portanto é importante
          ir imediatamente ao serviço de saúde para a introdução de uma nova sonda.
        </Text>
      </>
    ),
    imagemUrl: require('@/assets/images/se_a_sonda_sair.png'),
  },

  {
    id: '2',
    titulo: 'Em caso de dermatite',
    textoBusca:
      'dermatite pele irritada gaze seca avaliação médica enfermeiro',
    conteudo: (
      <Text style={styles.paragraph}>
        Em caso de dermatite, não esfregar a pele irritada. Proteger com gaze seca,
        trocando sempre que estiver suja e levar a criança para uma avaliação médica
        ou do enfermeiro especialista.
      </Text>
    ),
    imagemUrl: require('@/assets/images/dermatite.png'),
  },

  {
    id: '3',
    titulo: 'Se houver sangramento ao redor',
    textoBusca:
      'sangramento pressão estancar médico enfermeiro',
    conteudo: (
      <Text style={styles.paragraph}>
        Se houver sangramento ao redor, aplicar pressão para estancar o sangramento
        por até dez minutos. Se o sangramento não parar, entre em contato com o médico
        ou enfermeiro do seu filho.
      </Text>
    ),
    imagemUrl: require('@/assets/images/sangramento.png'),
  },

  {
    id: '4',
    titulo: 'Em caso de granuloma',
    textoBusca:
      'granuloma limpeza água sabão soro fisiológico pomada',
    conteudo: (
      <Text style={styles.paragraph}>
        Em caso de granuloma, este deve ser tratado logo após o aparecimento. Limpar
        sempre o local com água e sabão ou soro fisiológico e cobrir com uma gaze para
        evitar molhar o granuloma. Uma pomada ou creme especial será prescrito para ser
        aplicado no granuloma (não na pele ao redor) até que o tecido de granulação
        desapareça.
      </Text>
    ),
    imagemUrl: require('@/assets/images/granuloma.png'),
  },

  {
    id: '5',
    titulo: 'Se apresentar algum sintoma diferente',
    textoBusca:
      'infecção coceira pele vermelha dor pus febre mau cheiro',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          Se estiver com infecção, se apresentar coceira, pele vermelha, dor ao mexer a
          sonda, mau cheiro, pus, febre e pele quente, procure um serviço de saúde.
        </Text>
        <Text style={styles.paragraph2}>
          <Text style={{ fontWeight: 'bold' }}>Atenção!!! </Text>
          Pode ser necessário o uso de antibiótico, por isso, já no início dos primeiros
          sintomas, procure um serviço de saúde para uma avaliação e evitar complicações.
        </Text>
      </>
    ),
    imagemUrl: require('@/assets/images/sintoma_diferente.png'),
  },

  {
    id: '6',
    titulo: 'Se a sonda migrar',
    textoBusca:
      'sonda migrar tração ajustar anteparo parede abdominal',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          Se a sonda migrar, aplicar uma leve tração e, em seguida, ajustar o anteparo
          para que se encaixe perfeitamente na parede abdominal.
        </Text>
        <Text style={styles.paragraph2}>
          <Text style={{ fontWeight: 'bold' }}>Atenção!!! </Text>
          Se a sonda estiver muito introduzida e tiver dificuldade de tracionar, não
          force, procure um serviço de saúde para uma avaliação.
        </Text>
      </>
    ),
    imagemUrl: require('@/assets/images/se_sonda_migrar.png'),
  },

  {
    id: '7',
    titulo: 'Em caso de extravasamento pelo óstio',
    textoBusca:
      'extravasamento óstio secreção gaze umidade',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          Em caso de extravasamento, limpar a pele ao redor do óstio com soro fisiológico
          e colocar uma compressa de gaze para absorver o excesso de umidade e proteger a
          pele, trocando sempre que estiver suja ou úmida.
        </Text>
        <Text style={styles.paragraph2}>
          <Text style={{ fontWeight: 'bold' }}>Atenção!!! </Text>
          Procurar um serviço de saúde para ver a causa do extravasamento, pois pode ser
          necessário trocar a sonda ou ajustar a que está no óstio.
        </Text>
      </>
    ),
    imagemUrl: require('@/assets/images/extravasamento_ostio.png'),
  },

  {
    id: '8',
    titulo: 'Via correta da sonda',
    textoBusca:
      'via correta sonda balão medicamentos alimentos',
    conteudo: (
      <Text style={styles.paragraph}>
        Observar se os medicamentos e alimentos estão sendo administrados pela via
        correta da sonda. A entrada para insuflar o balão geralmente é colorida, a
        outra entrada que é para administração de alimentos e medicamentos.
      </Text>
    ),
    imagemUrl: require('@/assets/images/via_correta_sonda.png'),
  },

  {
    id: '9',
    titulo: 'Quando trocar a sonda',
    textoBusca:
      'trocar sonda obstruída quebrada infecção ressecada rachada',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          A troca da sonda deve ocorrer se estiver obstruída, a tampa ou o tubo da sonda
          quebrar, em caso de infecção, se estiver ressecada, rachada, opaca, endurecida
          ou amolecida.
        </Text>
        <Text style={styles.paragraph2}>
          <Text style={{ fontWeight: 'bold' }}>Atenção!!! </Text>
          Realizar a troca da sonda somente se você for treinado e tiver segurança para
          realizar o procedimento, caso contrário, procure um serviço de saúde.
        </Text>
      </>
    ),
    imagemUrl: require('@/assets/images/trocar_sonda.png'),
  },
];
export default function Layout() { return null; }
