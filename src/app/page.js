'use client'
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Home() {

  const startBackend = async() => {
      window.location.href = "/mid";
  }

  return (
    <main className="min-h-screen text-white">
      <button onClick={startBackend}>Home</button>
    </main>
  );
}
