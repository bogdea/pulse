"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginState = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // login
    if (isLogin) {
      let loginEmail = email;

      if (!loginEmail.includes("@")) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", loginEmail)
          .single();

        if (profileError || !profile) {
          toast.error("username not found");
          return;
        }

        const { data: profileWithEmail, error: profileEmailError } =
          await supabase
            .from("profiles")
            .select("email")
            .eq("id", profile.id)
            .single();

        if (profileEmailError || !profileWithEmail) {
          toast.error(profileEmailError.message);
          return;
        }

        loginEmail = profileWithEmail.email;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (loginError) {
        toast.error(loginError.message);
      }
    } else {
      // register
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        toast.error(signupError.message);
        return;
      }

      if (data.user) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        await supabase
          .from("profiles")
          .insert({ id: session?.user.id, username, email });

        toast.success("registration successful");

        setEmail("");
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <form
      className="m-auto flex w-[300px] flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="username"
        className={`h-8.5 rounded-lg border border-[var(--gray)] bg-[var(--dark-gray)] px-3 py-1.5 leading-none text-[var(--extra-light-gray)] outline-none placeholder:text-[var(--soft-gray)] focus:border-[var(--extra-light-gray)] ${
          isLogin ? "hidden" : ""
        }`}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type={isLogin ? "text" : "email"}
        placeholder={isLogin ? "email or username" : "email"}
        className="h-8.5 rounded-lg border border-[var(--gray)] bg-[var(--dark-gray)] px-3 py-1.5 leading-none text-[var(--extra-light-gray)] outline-none placeholder:text-[var(--soft-gray)] focus:border-[var(--extra-light-gray)]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="h-8.5 rounded-lg border border-[var(--gray)] bg-[var(--dark-gray)] px-3 py-1.5 leading-none text-[var(--extra-light-gray)] outline-none placeholder:text-[var(--soft-gray)] focus:border-[var(--extra-light-gray)]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="mt-2 cursor-pointer rounded-lg bg-[var(--soft-purple)] px-3 py-1 text-white transition hover:bg-[var(--light-purple)]"
      >
        {isLogin ? "login" : "register"}
      </button>

      <p
        className="mt-2 cursor-pointer text-center text-[14px] font-medium text-[var(--medium-light-gray)] transition hover:text-[var(--very-light-gray)]"
        onClick={handleLoginState}
      >
        {isLogin ? "not registered?" : "already registered?"}
      </p>
    </form>
  );
};
export default AuthForm;
