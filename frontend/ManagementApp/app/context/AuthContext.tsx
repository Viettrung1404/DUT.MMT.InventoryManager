import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string | null;
  login: (token: string, expiryInMs: number) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const checkTokenExpiry = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const expiryTime = await AsyncStorage.getItem('tokenExpiry');

    if (!token || !expiryTime) {
      return null;
    }

    const currentTime = new Date().getTime();
    if (currentTime > parseInt(expiryTime)) {
      // Token đã hết hạn → Xóa token và expiry
      await AsyncStorage.multiRemove(['authToken', 'tokenExpiry']);
      return null;
    }

    return token;
  };

  useEffect(() => {
    const initAuth = async () => {
      const validToken = await checkTokenExpiry();
      setToken(validToken); // Chỉ set token nếu nó hợp lệ
    };
    initAuth();
  }, []);

  const login = async (newToken: string, expiryInMs: number) => {
    const expiryTime = new Date().getTime() + expiryInMs; // Tính thời gian hết hạn
    await AsyncStorage.multiSet([
      ['authToken', newToken],
      ['tokenExpiry', expiryTime.toString()],
    ]);
    setToken(newToken);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'tokenExpiry']); // Xóa cả token và expiry
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);