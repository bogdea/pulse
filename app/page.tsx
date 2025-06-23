"use client";

import AuthSection from "@/components/AuthSection";
import Dashboard from "@/components/Dashboard";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <AuthSection />
        </div>
      )}
    </>
  );
};

export default Home;
