import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
    fontSize: 16,
    color: '#000',
  },
  listItem: {
    marginBottom: 6,
    fontSize: 16,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  listContainer: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  listNumber: {
    width: 24,       // largura fixa pra alinhar os números
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
  },
});

export const duvidas = [
  {
    id: '1',
    titulo: 'O que é Gastrostomia?',
    conteudo: (
      <>
        <Text style={styles.paragraph}>
          É uma abertura feita na barriga, que liga o estômago ao meio externo, realizada
          por cirurgia, que tem como objetivo administrar alimentos, líquidos e medicamentos. É
          indicada quando não é possível alimentar a criança pela boca. Pode ser temporária ou
          permanente.
        </Text>
        <Text style={styles.paragraph}>
          Existem quatro tipos de sondas que podem ser usadas na gastrostomia:
        </Text>
        <View style={styles.listContainer}>
          {[
            { num: '1.', bold: 'Gastrostomia Endoscópica Percutânea (GEP):', desc: 'As sondas GEP, são colocadas apenas pelo cirurgião responsável e geralmente isto ocorre apenas na primeira inserção do dispositivo.Estas sondas são produzidas basicamente de dois tipos de material, silicone ou poliuretano, com diâmetros que variam de 16 a 28 Fr. A escolha do calibre em geral é determinada inicialmente pelo cirurgião, mas pode aumentar ou diminuir conforme avaliação da equipe.' },
            { num: '2.', bold: 'Botton:', desc: 'Parecido com um botão, é mais comum ser utilizado em crianças. Possui um balão que facilita as trocas. Pode ser utilizado para administrar alimentação, água, medicação e posteriormente fechado nos intervalos. Vem acompanhado de um extensor para conectar ao equipo da dieta ou seringa.' },
            { num: '3.', bold: 'Sonda de silicone:', desc: 'Esse modelo é mais extenso, pode ter duas ou três vias, 1 viapara o balão, 1 via dieta e 1 via acessória (ausente nas de duas vias) com tampas que devem ser fechadas nos intervalos enquanto a criança não recebe alimentos. Possui um anel externo e numeração que garante a fixação adequada e posicionamento correto.' },
            { num: '4.', bold: 'Sonda Foley:', desc: 'É o mais comum dos dispositivos. Bastante utilizada principalmente em casos de emergência e/ou na ausência de um dispositivo específico. Para gastrostomia em situações em que há a retirada acidental do cateter, coloca-se a foley com o objetivo de evitar que o estoma se feche.' },
          ].map(({ num, bold, desc }) => (
            <View key={num} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{num}</Text>
              <Text style={styles.listItemText}>
                <Text style={styles.bold}>{bold} </Text>
                {desc}
              </Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/gastrostomia.png'),
  },
  {
    id: '2',
    titulo: 'Cuidado com o Óstio',
    conteudo: (
      <>
        <View style={styles.listContainer}>
          {[
            'Deve ter aspecto saudável, limpo, seco, sem: coceira, vermelhidão, edema (inchaço), dor ou líquidos circundantes;',
            'Mantê-lo sempre limpo, utilizando água e sabão, enxaguar bem com água, sempre secando bem com toalha macia, não deixar úmido para evitar infecção e irritação da pele;',
            'Nunca usar álcool, água oxigenada e antisséptico, pois podem causar hiperemia, descamação ou ferimento na pele;',
            'Não ocluir o óstio, deixar aberto para respirar;',
            'Se tiver secreção grudada, passar soro fisiológico ou água e sabão para limpar a pele;',
            'Evite esfregar a pele ao redor do óstio para evitar complicações;',
            'Verificar diariamente a pele sob o anteparo. Em caso de saída de secreção procure um profissional de saúde;',
            'Realizar curativo com gaze somente se houver presença de secreção ou extravasamento. Se tiver com curativo, o mesmo deve ser trocado sempre que estiver úmido ou sujo;',
            'Em caso de extravasamento, aplicar creme/spray barreira (indicado pelo profissional de saúde) ao redor do óstio para proteger a pele da umidade e do ácido;',
            'Caso ocorra extravasamento de dieta pelo óstio, parar a infusão da dieta e procure um serviço de saúde;',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>Como limpar a pele ao redor do óstio:</Text>

        <View style={styles.listContainer}>
          {[
            'Lave as mãos com água e sabão e seque com uma toalha limpa;',
            'Levantar o anteparo que segura a sonda, cuidadosamente, e limpe a pele ao redor do óstio utilizando uma compressa de gaze com água e sabão neutro ou com soro fisiológico 0,9%;',
            'Retire o sabão com uma compressa de gaze com água;',
            'Seque com uma toalha macia (não deixar o local úmido);',
            'Ajuste o anteparo na pele sem apertar;',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_ostio.png'),
  },
  {
    id: '3',
    titulo: 'Cuidado com a Sonda / Botton',
    conteudo: (
      <>
        <View style={styles.listContainer}>
          {[
            'Prender a sonda ao corpo da criança e proteger dentro da roupa (body ou calça) para que não fique solta e corra o risco de agarrar em alguém ou alguma coisa. A sonda pode ser presa com micropore;',
            'Se o cuidador tiver sido treinado, verificar o cuff (balão) para ver se está insuflado com o volume de água certo. Essa verificação pode acontecer semanalmente. Se o volume é menor do que foi colocado anteriormente, o balão pode estar furado. Nesse caso precisa trocar a sonda/ Botton;',
            'Verificar diariamente a marcação da sonda (se a sonda não tiver marcação pode ser feita com um marcador permanente);',
            'Manter o anteparo bem ajustado a pele sem fazer muita pressão;',
            'Manter a sonda fechada quando não estiver em uso.',
            'Sempre antes de administrar alimentação ou medicação, lavar a sonda com água potável, filtrada ou mineral (de acordo com a orientação do profissional de saúde) para evitar que resíduos predam na parede interna da sonda; Se a sonda estiver obstruída injetar com uma seringa de 5 ml água filtrada, fervida ou mineral. Caso não tenha êxito, procurar o serviço de saúde;',
            'Se tiver Botton, a seringa não deve ser conectada diretamente no botton, pois pode danificar a válvula antirrefluxo. A administração somente poderá ser realizada pelo extensor. Desconectar o extensor quando não estiver em uso.;',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_sonda_botton.png'),
  },
  {
    id: '4',
    titulo: 'Cuidados no banho',
    conteudo: (
      <>
        <View style={styles.listContainer}>
          {[
            'Prender a sonda no corpo da criança (pode ser presa com Micropore);',
            'Pode dar banho na banheira (ideal água abaixo do nível da gastrostomia) ou no chuveiro;',
            'Evitar água quente demais, pois pode irritar a pele;',
            'Usar sabonete neutro e toalhas macias;',
            'Secar bem a pele após o banho;',
            'Se for tomar banho na piscina, proteger a sonda com um filme plástico.',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_banho.png'),
  },
  {
    id: '5',
    titulo: 'Cuidados com a alimentação',
    conteudo: (
      <>
        {/* Bloco 1 */}
        <Text style={styles.paragraph}>Antes de preparar a nutrição enteral é importante:</Text>
        <View style={styles.listContainer}>
          {[
            'Manter os cabelos presos ou protegidos com touca, lenço;',
            'Retirar anel, pulseiras, brinco e relógio ao preparar a dieta;',
            'Se estiver com as mãos machucadas (cortes ou feridas), protegê-las para evitar contato direto com os alimentos ou utensílios;',
            'Não fumar, tossir, falar e espirrar durante o preparo da nutrição;',
            'É necessário realizar a lavagem adequada com água e sabão das mãos.',
            'Higienizar todos os alimentos e materiais que serão utilizados, bem como os utensílios e bancada onde se realizará a manipulação;',
            'Os utensílios como talheres, copo, peneira de malha fina, jarra graduada com tampa, copo de liquidificador, etc. devem ser lavados e depois mergulhados em solução clorada (Água sanitária para uso geral a 2 ou 2,5%: utilizar uma colher de sopa rasa (10 ml) para 1 litro de água potável) por 15 minutos. Enxaguar em água corrente e deixar secar em ar ambiente;',
            'As embalagens dos alimentos, suplemento nutricional ou as dietas industrializadas devem ser higienizadas em toda a superfície antes da sua utilização, com água e sabão e álcool à 70%;',
            'As frutas e vegetais devem ser lavadas com água corrente e depois desinfetadas em solução clorada (Água sanitária para uso geral a 2 ou 2,5%: utilizar uma colher de sopa rasa (10 ml) para 1 litro de água potável) por 15 minutos. Enxaguar em água corrente;',
            'A água utilizada para o preparo da nutrição, para lavagem da sonda e para a hidratação deve ser filtrada, fervida ou mineral;',
            'Fazer a dieta variada, com bastante nutrientes (de acordo com a orientação do profissional de saúde).',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Bloco 2 */}
        <Text style={styles.paragraph}>Antes de administrar a nutrição enteral:</Text>
        <View style={styles.listContainer}>
          {[
            'Realizar a lavagem adequada das mãos;',
            'Examine o tubo para ver se está integro sem dobras ou resíduos que impeçam a dieta de ser infundida;',
            'A criança deve estar elevada entre 30° e 45°, se possível sentada para evitar a regurgitação e possível broncoaspiração. Manter elevada durante a administração da dieta e por mais meia hora após administração da dieta;',
            'Administrar a dieta sempre em temperatura ambiente e lentamente, para evitar quadros de diarreia, vômitos e desconforto abdominal; se a dieta estiver guardada na geladeira, é preciso retirá-la antes e deixar em temperatura ambiente por 30 minutos a fim de deixá-la adequada ao uso.',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Bloco 3 */}
        <Text style={styles.paragraph}>Na administração da dieta enteral:</Text>
        <View style={styles.listContainer}>
          {[
            'Fazer a dieta por gavagem (gravidade) com seringa de 20 ou 60ml (conecte a ponta da seringa na sonda de gastrostomia);',
            'Administrar a comida em temperatura ambiente;',
            'Antes de administrar a dieta, deixar a sonda um pouco aberta para sair o ar que está no estômago;',
            'Alertar para a velocidade da passagem da dieta, pois pode causar náuseas, vômitos e diarreia, manter a seringa mais baixa para diminuir a velocidade;',
            'Manter a criança sentada ou com a cabeceira elevada durante a administração da dieta para evitar broncoaspiração/pneumonia;',
            'Administrar todas as dietas na forma líquida, respeitando o volume e o intervalo entre elas;',
            'Administrar água potável, fervida ou mineral antes e após as dietas (de acordo com a orientação do profissional de saúde);',
            'Se fizer a alimentação por equipo, introduzir a ponta do equipo no local indicado no frasco da dieta (industrializada ou caseira) e pendure em local mais elevado. Abra o controlador de fluxo e preencha todo o equipo com a dieta. Conecte a outra ponta do equipo na sonda de gastrostomia. Administre a dieta lentamente para evitar náuseas, vômitos e diarreia.',
            'Quando for levar dieta para rua, dar preferência as industrializadas, levando sempre em bolsa/garrafinha térmica, não esquecendo de levar todos o material necessário dentro de uma mochila/bolsa;',
            'Se houver dor, pare imediatamente a dieta e procure um serviço de saúde;',
            'Em caso de náuseas ou vômitos durante a alimentação, pausar a infusão da dieta enteral e observar as possíveis causas.',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Bloco 4 */}
        <Text style={styles.paragraph}>Após administração da dieta enteral:</Text>
        <View style={styles.listContainer}>
          {[
            'Manter a criança sentada ou com a cabeceira elevada por 30 minutos, no mínimo, após a dieta;',
            'Manter a sonda fechada após o uso. No caso do Botton desconectar o extensor e fechar;',
            'Realizar higiene oral, mesmo que não esteja alimentando-se pela boca no mínimo três vezes ao dia. Molhar uma gaze enrolada num abaixador de língua (espátula de madeira) ou escova de dente macia em solução enxaguatória (de acordo com a orientação do profissional de saúde). Limpar as bochechas, gengivas, língua, palato (céu da boca) e dentes (se houverem).',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_alimentacao.png'),
  },
  {
    id: '6',
    titulo: 'Cuidado com a medicação',
    conteudo: (
      <>
        <View style={styles.listContainer}>
          {[
            'Higienizar as mãos antes de iniciar o preparo e durante todo o processo;',
            'Medicamento líquido: administre a quantidade prescrita pelo médico com a seringa, lentamente pela sonda;',
            'Comprimidos: devem ser amassados até virar um pó. Colocar água potável, fervida ou mineral para dissolvê-los. Misturar bem, aspirar a quantidade prescrita pelo médico, jogar na pia o que sobrou e administrar na sonda lentamente. Realizar esse procedimento 30 minutos antes da administração;',
            'Cápsulas: Abra e dilua o conteúdo da cápsula em água potável, fervida ou mineral, aspirar a quantidade prescrita pelo médico, jogar na pia o que sobrou e administre na sonda lentamente. Realizar esse procedimento 30 minutos antes da administração;',
            'Cheque a medicação atentamente para ser administrada dentro do horário correto (utilize nosso alerta);',
            'Ter uma seringa específica para as medicações (05/10ml), não usar a mesma da dieta;',
            'Administrar água potável (de acordo com a orientação do profissional de saúde) antes, entre uma medicação e outra se tiver mais de uma e após a administração das medicações;',
            'Sempre que tiver mais de uma medicação no mesmo horário, administre uma de cada vez, lavando com água potável, fervida ou mineral entre uma e outra.',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_medicacao.png'),
  },
  {
    id: '7',
    titulo: 'Cuidado com a seringa',
    conteudo: (
      <>
        <View style={styles.listContainer}>
          {[
            'Higienizar as seringas com água e detergente, água sanitária ou cloro, pode ferver, deixar seca em ar ambiente e guardar em um recipiente com tampa, podendo guardar dentro da geladeira;',
            'Trocar as seringas por uma nova sempre que achar necessário.',
          ].map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listNumber}>{index + 1}.</Text>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ),
    imagemUrl: require('@/assets/images/cuidado_seringa.png'),
  },
 
];
export default function Layout() { return null; }