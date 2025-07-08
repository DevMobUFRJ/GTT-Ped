import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Início', headerShown: false }}
      />
      <Stack.Screen
        name="duvidas"
        options={{ title: 'Dúvidas', headerShown: false }}
      />
    </Stack>
  );
}
