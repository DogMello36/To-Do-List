import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import TaskItem from '../components/TaskItem';
import { useTheme } from '../styles/theme';

const STORAGE_KEY = '@todo_tasks';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Carrega as tarefas salvas ao abrir o app
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setTasks(JSON.parse(saved));
      } catch (e) {
        console.log('Erro ao carregar tarefas', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Salva sempre que a lista mudar (depois do carregamento inicial)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((e) =>
      console.log('Erro ao salvar tarefas', e)
    );
  }, [tasks, loaded]);

  function addTask() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = { id: Date.now().toString(), text: trimmed, done: false };
    setTasks((prev) => [newTask, ...prev]);
    setText('');
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Minhas Tarefas
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={theme.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Campo de texto + botão adicionar */}
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            placeholder="Digite uma tarefa..."
            placeholderTextColor={theme.textMuted}
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={addTask}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={26} color={theme.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Contador */}
        <Text style={[styles.counter, { color: theme.textMuted }]}>
          Total: {tasks.length} • Concluídas: {doneCount}
        </Text>

        {/* Lista de tarefas */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onRemove={removeTask}
              theme={theme}
            />
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.textMuted }]}>
              Nenhuma tarefa cadastrada.
            </Text>
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  addButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 14,
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});