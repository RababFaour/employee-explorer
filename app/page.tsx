import React from 'react'
import EmployeesProfile from "@/components/EmployeeProfile"
import RecentPosts from "@/components/RecentPost"
import LoadPosts from '@/components/LoadPost';
import {Suspense} from "react";

const page = () => {
  return (
    <main className="px-4 py-6">
      <header className="mb-6 bg-green-800 px-4 py-6 text-center">
      <h1 className="font-heading text-5xl font-bold text-white">Employee Explorer</h1>
      </header>
      <div className="px-4 pb-10">
      <Suspense fallback={<p className="mx-auto my-8 max-w-xl rounded bg-green-50 p-3 text-green-800">
        Loading Employee...</p>}><EmployeesProfile /></Suspense>
      <Suspense fallback={<p className="mx-auto my-8 max-w-xl rounded bg-green-50 p-3 text-green-800"
      >Loading Recent Posts...</p>}><RecentPosts /></Suspense>
      <LoadPosts />
      </div>
    </main>
    
  );
}

export default page;