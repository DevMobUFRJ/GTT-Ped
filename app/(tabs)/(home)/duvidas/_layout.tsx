// app/(tabs)/(home)/home/duvidas/layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function DuvidasLayout() {
  return (
    <Stack>
      {/* Aqui você pode configurar a tela de listagem */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Lista de Dúvidas',
          headerShown: false,
        }}
      />

      {/* Tela da dúvida individual */}
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalhes da Dúvida',
          headerBackTitle: 'Voltar',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
