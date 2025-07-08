import { useRouter } from 'expo-router';
import { ArrowUpRight } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DuvidaCardProps = {
    id: string;
    titulo: string;
    conteudo: React.ReactNode;
    imagemUrl: string;
};

export default function DuvidaCard({ id, titulo, conteudo, imagemUrl }: DuvidaCardProps) {
    const router = useRouter();

    function handlePress() {
        router.push(`/(tabs)/(home)/duvidas/${id}`);
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
            <Image source={{ uri: imagemUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {titulo}
                </Text>
                <ArrowUpRight size={24} color="#19856E" />
            </View>
            <View style={{ paddingHorizontal: 12, paddingBottom: 12, maxHeight: 100, overflow: 'hidden' }}>
                {conteudo}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,

        // Android shadow
        elevation: 4,

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#ccc'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 24,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#19856E',
        flex: 1,
        marginRight: 8,
    },

});
