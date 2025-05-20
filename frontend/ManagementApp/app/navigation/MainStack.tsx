import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import FormScreen from '../screens/FormScreen';
import { RootStackParamList } from '@/src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen 
        name="ProductList" 
        component={ListScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={DetailScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductForm" 
        component={FormScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;