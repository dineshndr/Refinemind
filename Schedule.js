import React, { useState,useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function Schedule() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { name: newTask }]);
      setNewTask('');
    }
  };
  useEffect(() => {
    const getNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log('Notification permission not granted');
        }
      }
    };
    getNotificationPermissions();
  }, []);
  

  const handleTaskChange = (index, name) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = name;
    setTasks(updatedTasks);
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <View key={index} style={styles.taskRow}>
        <TextInput
          style={styles.input}
          placeholder={`Task ${index + 1}`}
          value={task.name}
          onChangeText={(text) => handleTaskChange(index, text)}
        />
      </View>
    ));
  };

  const handleAddMoreTasks = () => {
    setTasks((prevTasks) => [...prevTasks, { name: '' }]);
  };

  const handleSetReminder = async (task) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: `Don't forget to do your task: ${task.name}`,
        },
        trigger: {
          date: selectedDate,
        },
      });
  
      console.log(`Reminder for task "${task.name}" set at ${selectedDate}`);
    } catch (error) {
      console.error('Error setting reminder:', error);
    }
  };
  
  const handleSetReminderForAllTasks = () => {
    tasks.forEach((task) => {
      handleSetReminder(task);
    });
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      {renderTasks()}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMoreTasks}>
        <Text>Add More Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={() => handleSetReminderForAllTasks()}>
  <Text>Set Reminders</Text>
</TouchableOpacity>

      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={selectedDate}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 8,
  },
  taskRow: {
    marginBottom: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
