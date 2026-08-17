import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Events'>;

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  room: string;
  attending: number;
  capacity: number;
};

const initialEvents: EventItem[] = [
  {
    id: 1,
    title: 'Pizza party',
    date: 'Today',
    time: '6:00pm',
    room: 'Room P005',
    attending: 13,
    capacity: 30,
  },
  {
    id: 2,
    title: 'Group study session',
    date: 'Today',
    time: '9:00pm',
    room: 'Room P109',
    attending: 2,
    capacity: 5,
  },
  {
    id: 3,
    title: 'FIFA tournament',
    date: '19th Apr',
    time: '4:00pm',
    room: 'Room D408',
    attending: 16,
    capacity: 16,
  },
];

const EventsScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  const [events, setEvents] = useState<EventItem[]>(initialEvents);

  const [createVisible, setCreateVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newCapacity, setNewCapacity] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const joinEvent = (id: number) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id) {
          if (e.attending >= e.capacity) {
            Alert.alert('Event full', 'Sorry, this event has no spaces left.');
            return e;
          }
          return { ...e, attending: e.attending + 1 };
        }
        return e;
      })
    );
  };

  const leaveEvent = (id: number) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id && e.attending > 0) {
          return { ...e, attending: e.attending - 1 };
        }
        return e;
      })
    );
  };

  const createEvent = () => {
    if (!newTitle || !newRoom || !newCapacity || !newDate || !newTime) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }

    const newEvent: EventItem = {
      id: Date.now(),
      title: newTitle,
      room: newRoom,
      capacity: parseInt(newCapacity),
      attending: 0,
      date: newDate,
      time: newTime,
    };

    setEvents(prev => [...prev, newEvent]);

    setNewTitle('');
    setNewRoom('');
    setNewCapacity('');
    setNewDate('');
    setNewTime('');
    setCreateVisible(false);
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        
        <View style={styles.contentWrapper}>
          <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
            wellbeing
          </Text>

          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            Find events & meet new people.
          </Text>

          <Text style={[styles.pageTitle, { fontSize: fs(22) }, highContrast && styles.highContrastText]}>
            Events
          </Text>

          {/* Events list */}
          {events.map(event => (
            <View key={event.id} style={[styles.eventCard, highContrast && styles.highContrastCard]}>
              <Text style={[styles.eventTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
                {event.title}
              </Text>

              <Text style={[styles.eventDetail, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {event.date}, {event.time}
              </Text>

              <Text style={[styles.eventDetail, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {event.room}
              </Text>

              <Text style={[styles.eventDetail, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {event.attending}/{event.capacity} attending
              </Text>

              {event.attending >= event.capacity ? (
                <TouchableOpacity style={[styles.fullButton, highContrast && styles.highContrastCard]}>
                  <Text style={[styles.fullButtonText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                    Event full
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.registerButton, highContrast && styles.highContrastCard]}
                  onPress={() => joinEvent(event.id)}
                >
                  <Text style={[styles.registerButtonText, { fontSize: fs(14) }]}>
                    Register
                  </Text>
                </TouchableOpacity>
              )}

              {event.attending > 0 && (
                <TouchableOpacity
                  style={[styles.leaveButton, highContrast && styles.highContrastCard]}
                  onPress={() => leaveEvent(event.id)}
                >
                  <Text style={[styles.leaveButtonText, { fontSize: fs(14) }]}>
                    Leave event
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Create event section */}
          <View style={[styles.createSection, highContrast && styles.highContrastCard]}>
            <Text style={[styles.createTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Want to make your own event?
            </Text>

            <TouchableOpacity
              style={[styles.createButton, highContrast && styles.highContrastCard]}
              onPress={() => setCreateVisible(true)}
            >
              <Text style={[styles.createButtonText, { fontSize: fs(16) }]}>
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Create Event Modal */}
      <Modal visible={createVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.modalTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Create an event
            </Text>

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Event name"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Room number"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newRoom}
              onChangeText={setNewRoom}
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Max spaces"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newCapacity}
              onChangeText={setNewCapacity}
              keyboardType="numeric"
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Date (e.g. 20th Apr)"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newDate}
              onChangeText={setNewDate}
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Time (e.g. 4:00pm)"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newTime}
              onChangeText={setNewTime}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, highContrast && styles.highContrastCard]} onPress={createEvent}>
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>
                  Submit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setCreateVisible(false)}
              >
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  contentWrapper: { paddingHorizontal: 25 },

  highContrastBg: { backgroundColor: '#000' },
  highContrastText: { color: '#fff' },
  highContrastCard: {
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 1,
  },
  highContrastNav: { backgroundColor: '#111', borderColor: '#444' },
  highContrastInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#555',
    borderWidth: 1,
  },

  logo: { fontWeight: 'bold', marginTop: 40 },
  tagline: { marginBottom: 20 },
  pageTitle: { fontWeight: '700', marginBottom: 20 },

  eventCard: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  eventTitle: { fontWeight: '600', marginBottom: 5 },
  eventDetail: { marginBottom: 5 },

  registerButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

  leaveButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  leaveButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

  fullButton: {
    backgroundColor: '#FACC15',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  fullButtonText: { textAlign: 'center', fontWeight: '600' },

  createSection: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  createTitle: { fontWeight: '600', color: '#fff', marginBottom: 10 },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
  },
  createButtonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontWeight: '600', marginBottom: 15 },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },

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

export default EventsScreen;
