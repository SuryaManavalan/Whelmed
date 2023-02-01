import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import CardsSwipe from 'react-native-cards-swipe';

export default function App() {
  const cardsData = ["Do dishes", "Take out trash", "Finish homework 1"];
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState(cardsData);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const reAdd = (item) =>{
    setTaskItems([...taskItems, item]);
  }

  const resetTasks = () => {
    setTaskItems([]);
  }

  // const completeTask = (index) => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy);
  // }

  return (
    <View style={styles.container}>
      {/*Today's tasks*/}
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <CardsSwipe
        cards={taskItems}
        cardContainerStyle={styles.cardContainer}
        renderCard={(item) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
        loop={false}
        onSwipedLeft={(index) => reAdd(taskItems[index])}
        onNoMoreCards={() => resetTasks()}
      />

      {/*Where all the tasks will go */}
      {/* <View style={styles.items}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            )
          })
        }
      </View> */}


      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addText: {},
  cardContainer: {
    width: '100%',
    height: '100%',
    margin: '18%',
    paddingBottom: '22%',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
