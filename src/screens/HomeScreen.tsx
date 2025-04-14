import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {deleteSubTask, deleteTask, resetTasks} from '../store/todoslice';
import {resetUser} from '../store/userSlice';

const HomeScreen = ({navigation}: any) => {
  const [searchValue, setSearchQuery] = useState('');
  const currentName = useSelector((state: RootState) => state?.user?.name);
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const dispatch = useDispatch();
  const [filteredTasks, setFilteredTasks] = useState(tasks);


  

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      setFilteredTasks(tasks);
      return;
    }

    const lowerSearch = searchValue.toLowerCase();
    const filtered = tasks
      .map(task => {
        const taskMatches = task.title.toLowerCase().includes(lowerSearch);
        const matchedSubTasks = task.subTasks.filter(sub =>
          sub.title.toLowerCase().includes(lowerSearch),
        );

        if (taskMatches || matchedSubTasks.length) {
          return {
            ...task,
            subTasks: matchedSubTasks.length ? matchedSubTasks : task.subTasks,
          };
        }

        return null;
      })
      .filter(Boolean) as typeof tasks;

    setFilteredTasks(filtered);
  };

  return (
    <View style={styles.containe}>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <Text style={styles.editText}>Name:</Text>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#3c3c3c',
            flex: 1,
            paddingLeft: 20,
          }}>
          <Text>{currentName}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditNameScreen', {name: currentName})
          }>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.editText}>Name:</Text>
        <TextInput
          value={searchValue}
          style={[styles.input, {borderWidth: 1, marginLeft: 12}]}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextColor={'#3c3c3c'}
          placeholder="search here"
        />

        <TouchableOpacity style={styles.editButton} onPress={handleSearch}>
          <Text style={styles.editText}>search</Text>
        </TouchableOpacity>
      </View>
      {filteredTasks.length ? (
        filteredTasks.map(item => {
          console.log({item});
          return (
            <>
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 10,
                  // marginHorizontal: 10,
                  marginTop: 20,
                  borderRadius: 12,
                }}>
                <View style={styles.task}>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddEditTask', {
                        isEdit: false,
                        action: 'Add Sub',
                        task: item,
                      })
                    }
                    style={styles.taskButton}>
                    <Text style={styles.editText}>add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddEditTask', {
                        isEdit: true,
                        action: 'Edit',
                        task: item,
                      });
                    }}
                    style={styles.taskButton}>
                    <Text style={styles.editText}>edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteTask(item.id));
                    }}
                    style={[styles.taskButton, {}]}>
                    <Text style={styles.editText}>delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {item.subTasks.length ? (
                item.subTasks.map(subItem => {
                  console.log({subItem});
                  return (
                    <View
                      key={subItem.id}
                      style={{
                        width: '90%',
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        padding: 10,
                        // marginHorizontal: 10,
                        marginTop: 20,
                        borderRadius: 12,
                      }}>
                      <View style={styles.task}>
                        <Text>{subItem.title}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('AddEditTask', {
                              isEdit: true,
                              action: 'Edit Sub',
                              task: item,
                              subTask: subItem,
                            });
                          }}
                          style={styles.taskButton}>
                          <Text style={styles.editText}>edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(
                              deleteSubTask({
                                taskId: item.id,
                                subTaskId: subItem.id,
                              }),
                            );
                          }}
                          style={[styles.taskButton, {}]}>
                          <Text style={styles.editText}>delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </>
          );
        })
      ) : (
        <View
          style={{
            padding: 10,
            marginTop: 10,
            alignItems: 'center',
            backgroundColor: 'orange',
          }}>
          <Text style={{color: '#3c3c3c'}}>No Tasks Added</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddEditTask', {
            isEdit: false,
            action: 'Add',
            task: {},
          })
        }
        style={[styles.editButton, {marginTop: 20}]}>
        <Text style={styles.editText}>Add new Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(resetTasks());
          dispatch(resetUser());
        }}
        style={[styles.editButton, {marginTop: 20, backgroundColor: 'red'}]}>
        <Text style={[styles.editText, {color: '#fff', fontWeight: '500'}]}>
          Reset Name And Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    color: '#000',
    // marginTop: 30,
    width: '60%',
    borderColor: '#3c3c3c',
    backgroundColor: '#ffff',
  },
  editButton: {
    borderWidth: 1,
    // marginLeft: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  taskButton: {
    borderWidth: 1,
    // marginLeft: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginLeft: 5,
    paddingRight: 20,
    // width:'20%'
  },
  task: {},
  editText: {
    color: '#000',
  },
});

export default HomeScreen;
