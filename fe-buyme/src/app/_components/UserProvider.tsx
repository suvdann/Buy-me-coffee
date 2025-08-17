"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";

type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
};

type UserData = {
  userId: string | null;
  isAdmin: boolean;
  profile: Profile | null;
};

type AuthContextType = {
  user: UserData | null;
  token: string | null; // ← нэмж өглөө
  authReady: boolean; // ← нэмж өглөө (анхны ачаалал дууссан эсэх)
  tokenChecker: (token: string) => Promise<void>; // таны verify-г үргэлжлүүлнэ
  login: (token: string) => Promise<void>; // login хийсний дараа дуудах
  logout: () => void; // гарах
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Та одоогоор body-р token явуулж байгаа тул хэвээр нь үлдээв
  const tokenChecker = async (rawToken: string) => {
    const res = await axios.post("http://localhost:8000/verify", {
      token: rawToken,
    });

    const u = res.data?.user;
    const destruct = res.data?.destructToken || {};
    setUser({
      userId: destruct.userId ?? null,
      isAdmin: !!destruct.isAdmin,
      profile: u?.profile ?? null,
    });
  };

  const login = async (rawToken: string) => {
    // token хадгалж, дараа нь verify хийж user state-ээ шинэчилнэ
    setToken(rawToken);
    localStorage.setItem("token", rawToken);
    await tokenChecker(rawToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // App нээгдэхэд localStorage-с сэргээх
  useEffect(() => {
    const init = async () => {
      try {
        const saved = localStorage.getItem("token");
        if (saved) {
          setToken(saved);
          await tokenChecker(saved);
        }
      } catch {
        // verify амжилтгүй бол бүхнийг цэвэрлэнэ
        logout();
      } finally {
        setAuthReady(true);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // value-г тогтвортой байлгах
  const value = useMemo<AuthContextType>(
    () => ({ user, token, authReady, tokenChecker, login, logout }),
    [user, token, authReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
