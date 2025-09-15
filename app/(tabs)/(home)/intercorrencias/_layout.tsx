// app/(tabs)/(home)/home/intercorrencias/layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function IntercorrenciasLayout() {
  return (
    <Stack>
      {/* Aqui você pode configurar a tela de listagem */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Lista de Intercorrências',
          headerShown: false,
        }}
      />

      {/* Tela da intercorrência individual */}
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalhes da Intercorrência',
          headerBackTitle: 'Voltar',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
