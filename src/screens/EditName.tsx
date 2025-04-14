import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { resetUser, setName } from '../store/userSlice';

const EditName = ({navigation}:any) => {
  const dispatch = useDispatch();
  const currentName = useSelector((state: RootState) => state.user.name);
  const [name, setLocalName] = useState(currentName || '');

  const handleSetName = () => {
    dispatch(setName(name));
    setLocalName('');
    navigation.goBack()
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
      <View style={styles.buttonContainer}>
        <Button title="save" onPress={handleSetName} />
        {/* <Button title="Reset" onPress={handleReset} color="red" /> */}
      </View>
      {/* <Text style={styles.current}>Current Name in Redux: {currentName}</Text> */}
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
  },
  current: {
    fontSize: 16,
    marginTop: 12,
  },
});

export default EditName;
