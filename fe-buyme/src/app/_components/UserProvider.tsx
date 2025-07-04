"use client";
import { redirect, useRouter } from "next/navigation";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type UserData = {
  userId: string | null;
  isAdmin: boolean;
  profile: null | {
    id: number;
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
  };
};

type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
  // logOut: () => void;
};
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  // const tokenChecker = async (token: string) => {
  //   try {
  //     console.log("Working");
  //     const response = await axios.post("http://localhost:8000/verify", {
  //       token: token,
  //     });
  //     // const user = response.data.user;
  //     setUser({
  //       user,
  //       userId: response.data.destructToken.userId,
  //       profile: user?.profile ?? null,
  //       // isAdmin: response.data.destructToken.isAdmin,
  //     });
  //   } catch (err) {
  //     localStorage.removeItem("token");
  //     router.push("/login");
  //   }
  // };
  const tokenChecker = async (token: string) => {
    try {
      console.log("Working");
      const response = await axios.post("http://localhost:8000/verify", {
        token: token,
      });

      const user = response.data.user; // 👉 энэ байх ёстой
      const userId = response.data.destructToken.userId;

      setUser({
        userId,
        isAdmin: response.data.destructToken.isAdmin ?? false,
        profile: user?.profile ?? null,
      });
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, tokenChecker }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext<AuthContextType>(AuthContext);
//login hiisnii daraa buh huudsuud user iin medeeliig hadgalah heregtei
