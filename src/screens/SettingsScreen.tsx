import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const {
    fontSize,
    highContrast,
    reduceMotion,
    setFontSize,
    setHighContrast,
    setReduceMotion,
  } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      
      {/* Content wrapper (fixes navbar width issue) */}
      <View style={styles.contentWrapper}>

        {/* Header */}
        <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
          wellbeing
        </Text>

        <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
          Personalise your experience.
        </Text>

        <Text style={[styles.sectionTitle, { fontSize: fs(22) }, highContrast && styles.highContrastText]}>
          Settings
        </Text>

        {/* Accessibility Section */}
        <View style={[styles.sectionBox, highContrast && styles.highContrastCard]}>
          <Text style={[styles.sectionHeader, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
            Accessibility
          </Text>

          {/* Font Size */}
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Text size
            </Text>

            <View style={styles.fontButtonsRow}>
              {/* Small */}
              <TouchableOpacity
                style={[
                  styles.fontButton,
                  fontSize === 'small' && styles.fontButtonActive,
                  highContrast && styles.highContrastCard
                ]}
                onPress={() => setFontSize('small')}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    { fontSize: fs(14) },
                    highContrast && { color: '#fff' },
                    fontSize === 'small' && { color: '#fff' }
                  ]}
                >
                  Small
                </Text>
              </TouchableOpacity>

              {/* Medium */}
              <TouchableOpacity
                style={[
                  styles.fontButton,
                  fontSize === 'medium' && styles.fontButtonActive,
                  highContrast && styles.highContrastCard
                ]}
                onPress={() => setFontSize('medium')}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    { fontSize: fs(14) },
                    highContrast && { color: '#fff' },
                    fontSize === 'medium' && { color: '#fff' }
                  ]}
                >
                  Medium
                </Text>
              </TouchableOpacity>

              {/* Large */}
              <TouchableOpacity
                style={[
                  styles.fontButton,
                  fontSize === 'large' && styles.fontButtonActive,
                  highContrast && styles.highContrastCard
                ]}
                onPress={() => setFontSize('large')}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    { fontSize: fs(14) },
                    highContrast && { color: '#fff' },
                    fontSize === 'large' && { color: '#fff' }
                  ]}
                >
                  Large
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* High Contrast Basically Dark Mode lol */}
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              High contrast mode
            </Text>
            <Switch value={highContrast} onValueChange={setHighContrast} />
          </View>

          {/* Reduced Motion */}
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Reduced motion
            </Text>
            <Switch value={reduceMotion} onValueChange={setReduceMotion} />
          </View>
        </View>

        {/* Support Section */}
        <View style={[styles.sectionBox, highContrast && styles.highContrastCard]}>
          <Text style={[styles.sectionHeader, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
            Support
          </Text>

          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingLabel, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Contact support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingLabel, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Privacy policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          style={[styles.signOutButton, highContrast && styles.highContrastCard]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.signOutText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
            Sign out
          </Text>
        </TouchableOpacity>

      </View>

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

        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, { fontSize: fs(22) }]}>⚙️</Text>
          <Text style={[styles.navLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F7FF' },

  contentWrapper: { paddingHorizontal: 25 },

  highContrastBg: { backgroundColor: '#000' },
  highContrastText: { color: '#fff' },
  highContrastCard: {
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 1,
  },
  highContrastNav: { backgroundColor: '#111', borderColor: '#444' },

  logo: { fontWeight: 'bold', marginTop: 40 },
  tagline: { marginBottom: 20 },
  sectionTitle: { fontWeight: '700', marginBottom: 20 },

  sectionBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  sectionHeader: { fontWeight: '600', marginBottom: 15 },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingLabel: { fontWeight: '500' },

  fontButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  fontButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  fontButtonActive: {
    backgroundColor: '#3B82F6',
  },
  fontButtonText: {
    fontWeight: '600',
  },

  signOutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 80,
  },
  signOutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
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
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: {},
  navLabel: { marginTop: 3 },
});

export default SettingsScreen;
