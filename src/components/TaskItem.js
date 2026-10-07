import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task, onToggle, onRemove, theme }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {/* Toque na tarefa: marca/desmarca como concluída */}
      <TouchableOpacity
        style={styles.left}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={task.done ? 'checkbox' : 'square-outline'}
          size={24}
          color={task.done ? theme.success : theme.textMuted}
        />
        <Text
          style={[
            styles.text,
            { color: task.done ? theme.textMuted : theme.text },
            task.done && styles.textDone,
          ]}
        >
          {task.text}
        </Text>
      </TouchableOpacity>

      {/* Botão de remover */}
      <TouchableOpacity
        onPress={() => onRemove(task.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={22} color={theme.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
});