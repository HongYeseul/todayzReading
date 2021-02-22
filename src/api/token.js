import AsyncStorage from '@react-native-community/async-storage'

export const getToken = async () => {
    try{
        const value = await AsyncStorage.getItem('@auth_token');
        if(value !== null){
            return value;
        }
    }catch(e){
        return null;
    }
};

export const setToken = async (token) => {
    try{
        await AsyncStorage.setItem('@auth_token', token);
        // alert('Data successfully saved')
    } catch(e){
        // alert('Failed to save the data to the storage')
        return null;
    }
};

export const getIdToken = async () => {
    try{
        const value = await AsyncStorage.getItem('@userId_token');
        if(value !== null){
            return value;
        }
    }catch(e){
        return null;
    }
};

export const setIdToken = async (token) => {
    try{
        await AsyncStorage.setItem('@userId_token', token);
        // alert('Data successfully saved')
    } catch(e){
        // alert('Failed to save the data to the storage')
        return null;
    }
};