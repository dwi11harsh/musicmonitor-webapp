"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BASE_URL, LoginCard, TempNavBar, isLoggedIn } from "ui";

export default function Web() {
  const [userState, setUserState] = useRecoilState(isLoggedIn);
  const router = useRouter();

  if (userState.userEmail) {
    router.push("/tables");
  } else
    return (
      <>
        <main className="min-h-screen">
          <InitUser />
          <TempNavBar />
          <LoginCard />
        </main>
      </>
    );
}

function InitUser() {
  const setUser = useSetRecoilState(isLoggedIn);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}
