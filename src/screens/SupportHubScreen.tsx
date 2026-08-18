import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SupportHub'>;

const SupportHubScreen = ({ navigation }: Props) => {
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
            Support Hub
          </Text>

          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            You’re not alone — support is always available.
          </Text>

          {/* Crisis Box */}
          <View style={[styles.crisisBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.crisisTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              In a crisis?
            </Text>
            <Text style={[styles.crisisText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              If you feel at risk, you are not alone. Tap below to contact emergency services immediately:
            </Text>

            <TouchableOpacity style={[styles.crisisButton, highContrast && styles.highContrastCard]}>
              <Text style={[styles.crisisButtonText, { fontSize: fs(16) }]}>
                Call 999
              </Text>
            </TouchableOpacity>
          </View>

          {/* 24/7 */}
          <Text style={[styles.sectionTitle, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            24/7 Services
          </Text>

          <View style={styles.serviceList}>
            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Emergency Services
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Life-threatening emergencies
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Samaritans
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Emotional support helpline
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Student Nightline
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Listening service for students
              </Text>
            </TouchableOpacity>
          </View>

          {/* Services */}
          <Text style={[styles.sectionTitle, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            University Services
          </Text>

          <View style={styles.serviceList}>
            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Counselling Service
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Book appointment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Well-being Team
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Contact team
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.serviceItem, highContrast && styles.highContrastCard]}>
              <Text style={[styles.serviceName, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                Peer Support
              </Text>
              <Text style={[styles.serviceDesc, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Find support
              </Text>
            </TouchableOpacity>
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

export default SupportHubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
  },
  wrapper: {
    paddingHorizontal: 25,
  },

  highContrastBg: {
    backgroundColor: '#000',
  },
  highContrastText: {
    color: '#fff',
  },
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

  crisisBox: {
    backgroundColor: '#FFE4E6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  crisisTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  crisisText: {
    marginBottom: 15,
  },
  crisisButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 10,
  },
  crisisButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  serviceList: {
    marginBottom: 25,
  },
  serviceItem: {
    backgroundColor: '#E0E7FF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceName: {
    fontWeight: '600',
  },
  serviceDesc: {
    marginTop: 3,
    color: '#555',
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
