import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Mood'>;

const moods = [
  { label: 'Excellent', emoji: '😁', value: 5, color: '#22C55E' },
  { label: 'Good', emoji: '🙂', value: 4, color: '#4ADE80' },
  { label: 'Okay', emoji: '😐', value: 3, color: '#FACC15' },
  { label: 'Bad', emoji: '☹️', value: 2, color: '#FB923C' },
  { label: 'Terrible', emoji: '😢', value: 1, color: '#EF4444' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type MoodEntry = {
  value: number;
  color: string;
};

const MoodScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  const [weekData, setWeekData] = useState<(MoodEntry | null)[]>(Array(7).fill(null));
  const [currentDay, setCurrentDay] = useState(0);

  const handleMoodSelect = (mood: MoodEntry) => {
    if (currentDay > 6) {
      Alert.alert(
        'Reset mood week?',
        'Are you sure you want to start a new week?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes, reset',
            style: 'destructive',
            onPress: () => {
              setWeekData(Array(7).fill(null));
              setCurrentDay(0);
            },
          },
        ]
      );
      return;
    }

    setWeekData(prev => {
      const copy = [...prev];
      copy[currentDay] = mood;
      return copy;
    });

    setCurrentDay(prev => prev + 1);
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        
        <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
          wellbeing
        </Text>

        <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
          How you feel matters.
        </Text>

        <Text style={[styles.question, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
          How are you feeling today?
        </Text>

        {/* Mood Options */}
        <View style={styles.moodRow}>
          {moods.map(mood => (
            <TouchableOpacity
              key={mood.label}
              style={[
                styles.moodButton,
                { backgroundColor: mood.color + '33' },
                highContrast && styles.highContrastCard
              ]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={[styles.moodEmoji, { fontSize: fs(32) }]}>{mood.emoji}</Text>
              <Text style={[styles.moodLabel, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trend Title */}
        <Text style={[styles.trendTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
          Weekly mood trend
        </Text>

        {/* Graph */}
        <View style={styles.graphContainer}>
          <View style={styles.yAxis}>
            {[5, 4, 3, 2, 1].map(level => (
              <View key={level} style={styles.yRow}>
                <Text style={[styles.yLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
                  {level}
                </Text>
                <View style={[styles.yLine, highContrast && styles.highContrastLine]} />
              </View>
            ))}
          </View>

          {/* Graph Area */}
          <View style={styles.graphArea}>
            <View style={styles.graphDotsRow}>
              {weekData.map((entry, index) => {
                if (!entry) {
                  return (
                    <View key={index} style={styles.graphDayColumn}>
                      <View style={styles.emptyDotPlaceholder} />
                    </View>
                  );
                }

                const maxHeight = 100;
                const offset = ((5 - entry.value) / 4) * maxHeight;

                return (
                  <View key={index} style={styles.graphDayColumn}>
                    <View style={[styles.dotWrapper, { marginTop: offset }]}>
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: entry.color },
                          highContrast && styles.highContrastDot
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.xAxisLabels}>
              {days.map(day => (
                <Text key={day} style={[styles.xLabel, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
                  {day}
                </Text>
              ))}
            </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F7FF' },
  highContrastBg: { backgroundColor: '#000' },
  highContrastText: { color: '#fff' },
  highContrastCard: { backgroundColor: '#222' },
  highContrastNav: { backgroundColor: '#111', borderColor: '#444' },
  highContrastLine: { backgroundColor: '#555' },
  highContrastDot: { borderColor: '#fff' },

  logo: {
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 25,
  },
  tagline: {
    marginLeft: 25,
    marginBottom: 20,
  },
  question: {
    marginLeft: 25,
    marginBottom: 20,
    fontWeight: '600',
  },

  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  moodButton: {
    width: '30%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  moodEmoji: {},
  moodLabel: { marginTop: 5, fontWeight: '500' },

  trendTitle: {
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 15,
    fontWeight: '600',
  },

  graphContainer: { flexDirection: 'row', paddingHorizontal: 25 },
  yAxis: { width: 40, marginRight: 10 },
  yRow: { flexDirection: 'row', alignItems: 'center', height: 25 },
  yLabel: { width: 20, textAlign: 'right', marginRight: 5 },
  yLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },

  graphArea: { flex: 1 },
  graphDotsRow: {
    flexDirection: 'row',
    height: 110,
    alignItems: 'flex-start',
  },
  graphDayColumn: { flex: 1, alignItems: 'center' },
  dotWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  emptyDotPlaceholder: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },

  xAxisLabels: { flexDirection: 'row', marginTop: 8 },
  xLabel: { flex: 1, textAlign: 'center' },

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

export default MoodScreen;
