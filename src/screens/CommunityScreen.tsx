import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibilityContext } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Community'>;

type Comment = {
  name: string;
  text: string;
};

type Post = {
  id: number;
  category: string;
  title: string;
  text: string;
  time: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
};

const categories = ['All', 'Exams', 'IT', 'Other'];

const initialPosts: Post[] = [
  {
    id: 1,
    category: 'Exams',
    title: 'Im so screwed',
    text: 'Geez exams are tomorrow and I forgot to study ffs',
    time: '2 hours ago',
    likes: 12,
    dislikes: 4,
    comments: [
      { name: 'Anonymous', text: 'You got this bro' },
      { name: 'Sam', text: 'Same here 😭😭' },
    ],
  },
  {
    id: 2,
    category: 'IT',
    title: 'PC issues',
    text: 'uhh guys is anyone elses macs not turning on??!!!!!!!',
    time: '7 hours ago',
    likes: 54,
    dislikes: 14,
    comments: [
      { name: 'Anonymous', text: 'Mine crashed too' },
      { name: 'Jess', text: 'Try holding the power button' },
    ],
  },
  {
    id: 3,
    category: 'Other',
    title: 'Ik im right',
    text: 'Call of duty is better than battlefield',
    time: '11 hours ago',
    likes: 98,
    dislikes: 67,
    comments: [
      { name: 'Anonymous', text: 'Battlefield clears 💀' },
      { name: 'Tom', text: 'COD gang 🔥🔥🔥' },
    ],
  },
];

const CommunityScreen = ({ navigation }: Props) => {
  const { fontSize, highContrast } = useContext(AccessibilityContext);

  const fs = (base: number) => {
    if (fontSize === 'small') return base - 2;
    if (fontSize === 'large') return base + 4;
    return base;
  };

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [createVisible, setCreateVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newName, setNewName] = useState('');
  const [newAnon, setNewAnon] = useState(false);

  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [replyAnon, setReplyAnon] = useState(false);
  const [activePostId, setActivePostId] = useState<number | null>(null);

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(p => p.category === selectedCategory);

  const createPost = () => {
    if (!newTitle || !newText) return;

    const nameToUse = newAnon ? 'Anonymous' : newName || 'Anonymous';

    const newPost: Post = {
      id: Date.now(),
      category: selectedCategory === 'All' ? 'Other' : selectedCategory,
      title: newTitle,
      text: newText,
      time: 'Just now',
      likes: 0,
      dislikes: 0,
      comments: [{ name: nameToUse, text: newText }],
    };

    setPosts(prev => [newPost, ...prev]);

    setNewTitle('');
    setNewText('');
    setNewName('');
    setNewAnon(false);
    setCreateVisible(false);
  };

  const submitReply = () => {
    if (!replyText || activePostId === null) return;

    const nameToUse = replyAnon ? 'Anonymous' : replyName || 'Anonymous';

    setPosts(prev =>
      prev.map(p =>
        p.id === activePostId
          ? { ...p, comments: [...p.comments, { name: nameToUse, text: replyText }] }
          : p
      )
    );

    setReplyText('');
    setReplyName('');
    setReplyAnon(false);
    setReplyVisible(false);
  };

  return (
    <View style={[styles.container, highContrast && styles.highContrastBg]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.contentWrapper}>

          <Text style={[styles.logo, { fontSize: fs(28) }, highContrast && styles.highContrastText]}>
            wellbeing
          </Text>

          <Text style={[styles.tagline, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
            How you feel matters.
          </Text>

          {/* Guidelines */}
          <View style={[styles.guidelinesBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.guidelinesTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Community guidelines
            </Text>
            <Text style={[styles.guidelineText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              • Be kind and supportive
            </Text>
            <Text style={[styles.guidelineText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              • Report concerning content
            </Text>
            <Text style={[styles.guidelineText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
              • Do not share personal info
            </Text>
          </View>

          {/* Create Post */}
          <TouchableOpacity
            style={[styles.shareButton, highContrast && styles.highContrastCard]}
            onPress={() => setCreateVisible(true)}
          >
            <Text style={[styles.shareButtonText, { fontSize: fs(16) }]}>
              Share your thoughts anonymously
            </Text>
          </TouchableOpacity>

          {/* Category Filters */}
          <View style={styles.categoryRow}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categorySelected,
                  highContrast && styles.highContrastCard
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { fontSize: fs(14) },
                    selectedCategory === cat && styles.categoryTextSelected,
                    highContrast && styles.highContrastText
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Posts */}
          {filteredPosts.map(post => (
            <View key={post.id} style={[styles.postBox, highContrast && styles.highContrastCard]}>
              <Text style={[styles.postCategory, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
                {post.category}
              </Text>

              <Text style={[styles.postTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
                {post.title}
              </Text>

              <Text style={[styles.postText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                {post.text}
              </Text>

              <Text style={[styles.postTime, { fontSize: fs(12) }, highContrast && styles.highContrastText]}>
                {post.time}
              </Text>

              <View style={styles.reactionRow}>
                <TouchableOpacity
                  onPress={() =>
                    setPosts(prev =>
                      prev.map(p =>
                        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                      )
                    )
                  }
                >
                  <Text style={[styles.reactionIcon, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                    👍 {post.likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    setPosts(prev =>
                      prev.map(p =>
                        p.id === post.id ? { ...p, dislikes: p.dislikes + 1 } : p
                      )
                    )
                  }
                >
                  <Text style={[styles.reactionIcon, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                    👎 {post.dislikes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setActivePostId(post.id);
                    setReplyVisible(true);
                  }}
                >
                  <Text style={[styles.reactionIcon, { fontSize: fs(16) }, highContrast && styles.highContrastText]}>
                    💬 {post.comments.length}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Comments */}
              {post.comments.map((c, i) => (
                <View key={i} style={[styles.commentBox, highContrast && styles.highContrastCard]}>
                  <Text style={[styles.commentName, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                    {c.name}
                  </Text>
                  <Text style={[styles.commentText, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                    {c.text}
                  </Text>
                </View>
              ))}
            </View>
          ))}

        </View>
      </ScrollView>

      {/* Create Post Modal */}
      <Modal visible={createVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.modalTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Create a post
            </Text>

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Post title"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { height: 80, fontSize: fs(14) }]}
              placeholder="Write your thoughts..."
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newText}
              onChangeText={setNewText}
              multiline
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Your name (optional)"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={newName}
              onChangeText={setNewName}
            />

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setNewAnon(!newAnon)}
            >
              <Text style={[styles.checkbox, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
                {newAnon ? '☑' : '☐'}
              </Text>
              <Text style={[styles.checkboxLabel, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Post anonymously
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, highContrast && styles.highContrastCard]} onPress={createPost}>
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setCreateVisible(false)}
              >
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reply Modal */}
      <Modal visible={replyVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, highContrast && styles.highContrastCard]}>
            <Text style={[styles.modalTitle, { fontSize: fs(18) }, highContrast && styles.highContrastText]}>
              Write a reply
            </Text>

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { height: 80, fontSize: fs(14) }]}
              placeholder="Your reply..."
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />

            <TextInput
              style={[styles.input, highContrast && styles.highContrastInput, { fontSize: fs(14) }]}
              placeholder="Your name (optional)"
              placeholderTextColor={highContrast ? '#aaa' : '#666'}
              value={replyName}
              onChangeText={setReplyName}
            />

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setReplyAnon(!replyAnon)}
            >
              <Text style={[styles.checkbox, { fontSize: fs(20) }, highContrast && styles.highContrastText]}>
                {replyAnon ? '☑' : '☐'}
              </Text>
              <Text style={[styles.checkboxLabel, { fontSize: fs(14) }, highContrast && styles.highContrastText]}>
                Reply anonymously
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={[styles.modalButton, highContrast && styles.highContrastCard]} onPress={submitReply}>
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setReplyVisible(false)}
              >
                <Text style={[styles.modalButtonText, { fontSize: fs(14) }]}>Cancel</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
  },

  contentWrapper: {
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

  highContrastInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#555',
    borderWidth: 1,
  },

  logo: {
    fontWeight: 'bold',
    marginTop: 40,
  },

  tagline: {
    marginBottom: 20,
  },

  guidelinesBox: {
    backgroundColor: '#E0E7FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  guidelinesTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },

  guidelineText: {
    marginBottom: 5,
  },

  shareButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  shareButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  categorySelected: {
    backgroundColor: '#3B82F6',
  },

  categoryText: {
    color: '#000',
  },

  categoryTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },

  postBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  postCategory: {
    color: '#6B7280',
    marginBottom: 5,
  },

  postTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },

  postText: {
    marginBottom: 10,
  },

  postTime: {
    color: '#6B7280',
    marginBottom: 10,
  },

  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  reactionIcon: {
    fontSize: 16,
  },

  commentBox: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  commentName: {
    fontWeight: '600',
    marginBottom: 3,
  },

  commentText: {
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },

  checkboxLabel: {
    fontSize: 14,
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

  modalButtonText: {
    color: '#fff',
    fontSize: 14,
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

export default CommunityScreen;
