import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store/store';
import {resetUser, setName} from '../store/userSlice';

const EditName = ({navigation}: any) => {
  const dispatch = useDispatch();
  const currentName = useSelector((state: RootState) => state.user.name);
  const [name, setLocalName] = useState(currentName || '');

  const handleSetName = () => {
    dispatch(setName(name));
    setLocalName('');
    navigation.goBack();
  };

  const handleReset = () => {
    dispatch(resetUser());
    setLocalName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setLocalName}
        placeholder="Enter your name"
      />
      <TouchableOpacity style={styles.customButton} onPress={handleSetName}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
    marginTop: '10%',
  },
  current: {
    fontSize: 16,
    marginTop: 12,
  },
  customButton: {
    backgroundColor: '#007bff', // Blue color, you can change
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditName;
