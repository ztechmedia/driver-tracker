import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateObject = (currentObject, updatedProperties) => {
  return {
    ...currentObject,
    ...updatedProperties,
  };
};

export const updateArray = (currentArray, updatedProperties) => {
  return [...currentArray, updatedProperties];
};

export const saveDataToStorage = async (storageName, objectData) => {
  return await AsyncStorage.setItem(storageName, JSON.stringify(objectData));
};

export const removeDataFromStorage = async (storageName) => {
  return await AsyncStorage.removeItem(storageName);
};

export const getDataFromStorage = async (storageName) => {
  const data = await AsyncStorage.getItem(storageName);
  return JSON.parse(data);
};
