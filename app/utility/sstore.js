import AsyncStorage from "@react-native-async-storage/async-storage";

const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
