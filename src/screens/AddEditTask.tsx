import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addSubTask, addTask, editSubTask, editTask} from '../store/todoslice';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, TextInput, View} from 'react-native';

export default function AddEditTask({route}: any) {
  const {isEdit, task,subTask} = route.params || {};
  let inputText = isEdit ? route?.params?.action === 'Edit Sub' ? subTask?.title : task?.title : ''
  const [title, setTitle] = useState(inputText);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (isEdit) {
      if (route?.params?.action === 'Edit Sub') {
        dispatch(
          editSubTask({
            taskId: task.id,
            title: title,
            subTaskId: subTask.id,
          }),
        );
      } else {
        dispatch(editTask({id: task.id, title}));
      }
    } else {
      if (route?.params?.action === 'Add Sub') {
        dispatch(
          addSubTask({
            id: task.id,
            title: task.title,
            subTasks: [...task.subTasks,{id: Date.now().toString(), title, subTasks: []}],
          }),
        );
      } else {
        dispatch(addTask({id: Date.now().toString(), title, subTasks: []}));
      }
    }
    navigation.goBack();
  };

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          color: '#3c3c3c',
          textAlign: 'center',
          marginBottom: 10,
          fontWeight: '500',
          fontSize: 18,
        }}>
        {route?.params?.action} Task
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter Task title"
        placeholderTextColor={'gray'}
        style={{
          borderWidth: 0.5,
          borderRadius: 5,
          marginBottom: 10,
          color: '#3c3c3cdf',
          paddingHorizontal: 10,
        }}
      />
      <View style={{marginTop:'10%'}}>
      <Button title="Submit" onPress={handleSubmit} />
      </View>

    </View>
  );
}
