import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Planner'>;

const PlannerScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  const [tasks, setTasks] = useState([
    { title: 'Math assessment', date: 'April 16th', priority: 'high', completed: false },
    { title: 'Optional lecture', date: 'April 17th', priority: 'medium', completed: false },
    { title: 'Pizza party', date: 'April 18th', priority: 'low', completed: false },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { title: 'Group session', date: 'April 15th', priority: 'completed', completed: true },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('low');
  const [newDate, setNewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addTask = () => {
    const formattedDate = newDate.toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric'
    });

    setTasks([...tasks, {
      title: newTitle,
      date: formattedDate,
      priority: newPriority,
      completed: false
    }]);

    setNewTitle('');
    setNewPriority('low');
    setModalVisible(false);
  };

  const toggleComplete = (index: number) => {
    const updated = [...tasks];
    const item = updated[index];
    updated.splice(index, 1);
    setTasks(updated);
    setCompletedTasks([...completedTasks, { ...item, completed: true, priority: 'completed' }]);
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.wrapper}>

          <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
            Planner
          </Text>
          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            Stay organised and manage your workload.
          </Text>

          <View style={[styles.workloadBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.workloadTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              This week’s workload
            </Text>
            <Text style={[styles.workloadText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              Monday — Friday  
              Average: 5 hours/day
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            Upcoming tasks
          </Text>

          {tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.taskBox, highContrast && styles.highContrastCard]}
              onPress={() => toggleComplete(index)}
            >
              <Text style={[styles.taskTitle, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                {task.title}
              </Text>

              <Text style={[styles.taskDate, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {task.date}
              </Text>

              <Text
                style={[
                  styles.priorityLabel,
                  task.priority === 'high' && styles.priorityHigh,
                  task.priority === 'medium' && styles.priorityMedium,
                  task.priority === 'low' && styles.priorityLow
                ]}
              >
                {task.priority.toUpperCase()} PRIORITY
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
            Completed
          </Text>

          {completedTasks.map((task, index) => (
            <View
              key={index}
              style={[styles.taskBox, highContrast && styles.highContrastCard]}
            >
              <Text style={[styles.taskTitle, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                {task.title}
              </Text>

              <Text style={[styles.taskDate, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {task.date}
              </Text>

              <Text style={styles.priorityCompleted}>
                COMPLETED
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.actionButton, highContrast && styles.highContrastCard]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.actionButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Add additional tasks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, highContrast && styles.highContrastCard]}
          >
            <Text style={[styles.actionButtonText, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
              Turn on reminders
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, highContrast && styles.highContrastCard]}>

            <Text style={[styles.modalTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Add new task
            </Text>

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Task name"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={[styles.modalLabel, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              Priority:
            </Text>

            <View style={styles.priorityRow}>
              {['high', 'medium', 'low'].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.priorityButton,
                    newPriority === level && styles.prioritySelected
                  ]}
                  onPress={() => setNewPriority(level as any)}
                >
                  <Text style={[styles.priorityText, { fontSize: fs(14) }]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.dateButton, highContrast && styles.highContrastCard]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateButtonText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Select date
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newDate}
                mode="date"
                display="default"
                onChange={(event: any, selectedDate: Date | undefined) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewDate(selectedDate);
                  }
                }}
              />
            )}

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, highContrast && styles.highContrastCard]}
                onPress={addTask}
              >
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>
                  Add
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, highContrast && styles.highContrastCard]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
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

export default PlannerScreen;

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

  workloadBox: {
    backgroundColor: '#E0E7FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  workloadTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  workloadText: {
    color: '#333',
  },

  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  taskBox: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  taskTitle: {
    fontWeight: '600',
  },
  taskDate: {
    marginTop: 3,
    color: '#333',
  },

  priorityLabel: {
    marginTop: 5,
    fontWeight: '700',
  },
  priorityHigh: {
    color: '#EF4444',
  },
  priorityMedium: {
    color: '#FACC15',
  },
  priorityLow: {
    color: '#10B981',
  },
  priorityCompleted: {
    marginTop: 5,
    fontWeight: '700',
    color: '#3B82F6',
  },

  actionButton: {
    backgroundColor: '#C4B5FD',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  actionButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },

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
  modalTitle: {
    fontWeight: '700',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalLabel: {
    marginBottom: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  priorityButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  prioritySelected: {
    backgroundColor: '#3B82F6',
  },
  priorityText: {
    color: '#000',
  },

  dateButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
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
