import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CalendarDays, Home } from 'lucide-react-native';




export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="(agenda)"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => <CalendarDays color={color} size={28} />,
        }}
      />
      {/* <Tabs.Screen
        name="sondinha"
        options={{
          title: 'Sondinha',
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Settings color={color} size={28} />,
        }}
      /> */}
    </Tabs>
  );
}
