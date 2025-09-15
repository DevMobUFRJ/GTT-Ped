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

export const intercorrencias = [
    {
        id: '0',
        titulo: 'Eventos adversos',
        conteudo: (
            <>
                <View style={styles.listContainer}>
                    {[
                        'Se a sonda sair, levar a criança na emergência mais próxima. O cuidador pode introduzir uma nova sonda, desde que ele seja treinado pelo profissional de saúde. É importante saber o tamanho e ter em casa a sonda de gastrostomia do seu filho. Após repassar a sonda, procurar um serviço de saúde para verificar se a sonda está bem posicionada;',
                        'Em caso de dermatite, não esfregar a pele irritada, proteger com gaze seca, trocando sempre que estiver suja e levar a criança para uma avaliação médica ou do enfermeiro especialista;',
                        'Se estiver vazando algo pelo óstio, limpar com soro fisiológico, colocar uma compressa de gaze para proteger a pele, trocando sempre que estiver suja ou úmida;',
                        'Se houver sangramento ao redor, aplicar pressão para estancar o sangramento por até dez minutos. Se o sangramento não parar, entre em contato com o médico ou enfermeiro do seu filho;',
                        'Em caso de granuloma, este deve ser tratado logo após o aparecimento. Limpar sempre o local com água e sabão ou soro fisiológico e cobrir com uma gaze para evitar molhar o granuloma. Uma pomada ou creme especial será prescrito para ser aplicado no granuloma (não na pele ao redor) até que o tecido de granulação desapareça;',
                        'Se estiver com infecção, se apresentar coceira, pele vermelha, dor ao mexer a sonda, mau cheiro, pus, febre e pele quente, procure um serviço de saúde;',
                        'Se a sonda migrar, aplicar uma leve tração e, em seguida, ajustar o anteparo para que se encaixe perfeitamente na parede abdominal;',
                        'Se tiver extravasamento pelo óstio, utilizar gaze para absorver o excesso de secreção. Trocar sempre que estiver úmido ou sujo;',
                        'Observar se os medicamentos e alimentos estão sendo administrados pela via correta da sonda. A entrada para insuflar o balão geralmente é colorida, a outra entrada que é para administração de alimentos e medicamentos;',
                        'A troca da sonda deve ocorrer se estiver obstruída, a tampa ou o tubo da sonda quebrar, em caso de infecção, se estiver ressecada, rachada, opaca, endurecida ou amolecida.',
                    ].map((item, index) => (
                        <View key={index} style={styles.listItemRow}>
                            <Text style={styles.listNumber}>{index + 1}.</Text>
                            <Text style={styles.listItemText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </>
        ),
        imagemUrl: '',
    },

    {
        id: '1',
        titulo: 'Se a sonda sair',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se a sonda sair, levar a criança na emergência mais próxima. O cuidador pode introduzir uma nova sonda, desde que ele seja treinado pelo profissional de saúde. É importante saber o tamanho e ter em casa a sonda de gastrostomia do seu filho. Após repassar a sonda, procurar um serviço de saúde para verificar se a sonda está bem posicionada.
                </Text>
            </>
        ),
    },

    {
        id: '2',
        titulo: 'Em caso de dermatite',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Em caso de dermatite, não esfregar a pele irritada. Proteger com gaze seca, trocando sempre que estiver suja e levar a criança para uma avaliação médica ou do enfermeiro especialista.
                </Text>
            </>
        ),
    },
    
    {
        id: '3',
        titulo: 'Em caso de vazamento pelo óstio',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se estiver vazando algo pelo óstio, limpar com soro fisiológico, colocar uma compressa de gaze para proteger a pele, trocando sempre que estiver suja ou úmida.
                </Text>
            </>
        ),
    },

    {
        id: '4',
        titulo: 'Se houver sangramento ao redor',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se houver sangramento ao redor, aplicar pressão para estancar o sangramento por até dez minutos. Se o sangramento não parar, entre em contato com o médico ou enfermeiro do seu filho.
                </Text>
            </>
        ),
    },

    {
        id: '5',
        titulo: 'Em caso de granuloma',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Em caso de granuloma, este deve ser tratado logo após o aparecimento. Limpar sempre o local com água e sabão ou soro fisiológico e cobrir com uma gaze para evitar molhar o granuloma. Uma pomada ou creme especial será prescrito para ser aplicado no granuloma (não na pele ao redor) até que o tecido de granulação desapareça.
                </Text>
            </>
        ),
    },

    {
        id: '6',
        titulo: 'Se apresentar algum sintoma diferente',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se estiver com infecção, se apresentar coceira, pele vermelha, dor ao mexer a sonda, mau cheiro, pus, febre e pele quente, procure um serviço de saúde.
                </Text>
            </>
        ),
    },

    {
        id: '7',
        titulo: 'Se a sonda migrar',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se a sonda migrar, aplicar uma leve tração e, em seguida, ajustar o anteparo para que se encaixe perfeitamente na parede abdominal.
                </Text>
            </>
        ),
    },

    {
        id: '8',
        titulo: 'Em caso de extravasamento pelo óstio',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Se tiver extravasamento pelo óstio, utilizar gaze para absorver o excesso de secreção. Trocar sempre que estiver úmido ou sujo.
                </Text>
            </>
        ),
    },

    {
        id: '9',
        titulo: 'Via correta da sonda',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    Observar se os medicamentos e alimentos estão sendo administrados pela via correta da sonda. A entrada para insuflar o balão geralmente é colorida, a outra entrada que é para administração de alimentos e medicamentos.
                </Text>
            </>
        ),
        imagemUrl: '',
    },

    {
        id: '10',
        titulo: 'Quando trocar a sonda',
        conteudo: (
            <>
                <Text style={styles.paragraph}>
                    A troca da sonda deve ocorrer se estiver obstruída, a tampa ou o tubo da sonda quebrar, em caso de infecção, se estiver ressecada, rachada, opaca, endurecida ou amolecida.
                </Text>
            </>
        ),
    },
];
