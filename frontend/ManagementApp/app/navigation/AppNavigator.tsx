import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useAuth(); // Sử dụng context xác thực
  console.log('Token:', token); // Kiểm tra giá trị token

  return (
    
      <Stack.Navigator>
        {!token ? (
          // Chưa đăng nhập: Hiển thị AuthStack
          <Stack.Screen 
            name="Auth" 
            component={AuthStack} 
            options={{ headerShown: false }}
          />
        ) : (
          // Đã đăng nhập: Hiển thị MainStack
          <Stack.Screen 
            name="Main" 
            component={MainStack} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
  );
};

export default AppNavigator;