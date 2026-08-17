import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.wrapper}>

          {/* Header */}
          <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
            wellbeing
          </Text>
          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            How you feel matters.
          </Text>

          {/* Welcome Back */}
          <Text style={[styles.welcome, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            Welcome back!
          </Text>

          {/* Daily Check-In */}
          <TouchableOpacity
            style={[styles.dailyCheckIn, highContrast && styles.highContrastCard]}
            onPress={() => navigation.navigate('Mood')}
          >
            <Text style={[styles.dailyCheckInText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Daily check in — Track your mood 💜
            </Text>
          </TouchableOpacity>

          {/* Menu Grid */}
          <Text style={[styles.menuTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
            Menu
          </Text>

          <View style={styles.menuGrid}>

            {/* Mood Tracker */}
            <TouchableOpacity
              style={[styles.menuButton, highContrast && styles.highContrastCard]}
              onPress={() => navigation.navigate('Mood')}
            >
              <Text style={[styles.menuButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                💜 Mood tracker
              </Text>
            </TouchableOpacity>

            {/* Quick Help */}
            <TouchableOpacity
              style={[styles.menuButton, highContrast && styles.highContrastCard]}
              onPress={() => navigation.navigate('QuickHelp')}
            >
              <Text style={[styles.menuButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                ❗ Quick help
              </Text>
            </TouchableOpacity>

            {/* Support Hub */}
            <TouchableOpacity
              style={[styles.menuButton, highContrast && styles.highContrastCard]}
              onPress={() => navigation.navigate('SupportHub')}
            >
              <Text style={[styles.menuButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                👤 Support hub
              </Text>
            </TouchableOpacity>

            {/* Planner */}
            <TouchableOpacity
              style={[styles.menuButton, highContrast && styles.highContrastCard]}
              onPress={() => navigation.navigate('Planner')}
            >
              <Text style={[styles.menuButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                🔖 Planner
              </Text>
            </TouchableOpacity>

          </View>

          {/* Upcoming Events */}
          <View style={[styles.eventsBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.eventsTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Upcoming events
            </Text>
            <Text style={[styles.eventsItem, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              Group session — Coding  
              Today at 3:00pm
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, highContrast && styles.highContrastNav]}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>🏠</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Mood')}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>💜</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Mood
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Community')}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>👥</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Community
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Events')}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>📅</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>⚙️</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
  },
  wrapper: {
    paddingHorizontal: 25,
  },

  highContrastBg: { backgroundColor: '#000' },
  highContrastText: { color: '#fff' },
  highContrastCard: {
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 1,
  },
  highContrastNav: {
    backgroundColor: '#111',
    borderColor: '#444',
  },

  logo: {
    fontWeight: 'bold',
    marginTop: 40,
  },
  tagline: {
    marginBottom: 20,
  },
  welcome: {
    marginBottom: 15,
    fontWeight: '600',
  },

  dailyCheckIn: {
    backgroundColor: '#C4B5FD',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 25,
  },
  dailyCheckInText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  menuTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  menuButton: {
    backgroundColor: '#E0E7FF',
    width: '48%',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  menuButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  eventsBox: {
    backgroundColor: '#D1FAE5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  eventsTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  eventsItem: {
    fontWeight: '500',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 22,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 3,
  },
});
