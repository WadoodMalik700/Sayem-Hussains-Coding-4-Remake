import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'QuickHelp'>;

const QuickHelpScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  const [search, setSearch] = useState('');

  const faqs = [
    { q: 'When do our exams start?', a: 'July 18th' },
    { q: 'How long can we keep the loaned macbooks?', a: 'Around 6pm on the same day' },
    { q: 'Are we allowed to use AI?', a: 'Make sure you mention you’ve used it if you have used AI' },
    { q: 'Is cod black ops 7 worth buying?', a: 'Ewww absolutely not! If you buy it you’re getting suspended' },
  ];

  const filteredFaqs = faqs.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.wrapper}>

          {/* Header */}
          <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
            Quick help
          </Text>

          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            Ask any question or browse common answers.
          </Text>

          {/* Search Bar */}
          <TextInput
            style={[
              styles.searchBar,
              highContrast && styles.highContrastInput,
              { fontSize: fs(14) }
            ]}
            placeholder="Ask any question"
            placeholderTextColor={highContrast ? '#aaa' : '#666'}
            value={search}
            onChangeText={setSearch}
          />

          <Text style={[styles.sectionTitle, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            Frequently asked questions
          </Text>

          {filteredFaqs.map((item, index) => (
            <View
              key={index}
              style={[styles.faqBox, highContrast && styles.highContrastCard]}
            >
              <Text style={[styles.faqQuestion, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                {item.q}
              </Text>
              <Text style={[styles.faqAnswer, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {item.a}
              </Text>
            </View>
          ))}

          {/* If no results */}
          {filteredFaqs.length === 0 && (
            <Text style={[styles.noResults, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              No answers found. Try another question.
            </Text>
          )}

          {/* Bottom message */}
          <Text style={[styles.bottomMessage, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            If you cannot find the answer you’re looking for, you can talk to someone:
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.bottomButton, highContrast && styles.highContrastCard]}
            onPress={() => navigation.navigate('SupportHub')}
          >
            <Text style={[styles.bottomButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Support hub
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomButton, highContrast && styles.highContrastCard]}
            onPress={() => navigation.navigate('Community')}
          >
            <Text style={[styles.bottomButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Community tab
            </Text>
          </TouchableOpacity>

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

export default QuickHelpScreen;

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
  highContrastInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#555',
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

  searchBar: {
    backgroundColor: '#E5E7EB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  faqBox: {
    backgroundColor: '#D1FAE5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  faqQuestion: {
    fontWeight: '600',
    marginBottom: 5,
  },
  faqAnswer: {
    color: '#333',
  },

  noResults: {
    marginTop: 10,
    marginBottom: 20,
    fontStyle: 'italic',
  },

  bottomMessage: {
    marginTop: 20,
    marginBottom: 10,
  },

  bottomButton: {
    backgroundColor: '#FACC15',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  bottomButtonText: {
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
