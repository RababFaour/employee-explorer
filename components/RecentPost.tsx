import {connection} from "next/server";
import { url, id } from "@/components/config";
 
type Post= {
    id:number;
    title:string;
};

async function getPosts():Promise<Post[]|null>{
    try{
        await connection();
        await new Promise((resolve)=>setTimeout(resolve,2000));

        const response = await fetch(`${url}/posts?userId=${id}`);
        if(!response.ok){
            throw new Error("Couldn't load posts");
        }
        return await response.json();
    }catch{
        return null;
    }
}
export default async function RecentPosts(){
    const posts= await getPosts();
    if(!posts){
        return (
         <section className="rounded-xl border border-[#b2cbb8] bg-[#d3e5d5] p-5 shadow-lg shadow-green-900/15" style={{ backgroundColor: "#d3e5d5", borderColor: "#b2cbb8", boxShadow: "0 8px 22px rgba(21, 61, 41, 0.14)" }}>
        <h2 className="mb-4 font-heading text-4xl font-bold text-green-800">Recent Posts</h2>
        <p className="rounded bg-red-50 p-3 font-medium text-red-700">Sorry, we could not load recent posts right now.</p>);
        </section>);
    }
    return(
        <section className="rounded-xl border border-[#b2cbb8] bg-[#d3e5d5] p-5 shadow-lg shadow-green-900/15" style={{ backgroundColor: "#d3e5d5", borderColor: "#b2cbb8", boxShadow: "0 8px 22px rgba(21, 61, 41, 0.14)" }}>
        <h2 className="mb-4 font-heading text-4xl font-bold text-green-800">Recent Posts</h2>
        <ul className="space-y-3">
        {posts.slice(0,3).map((post)=>(         //i use slice for showing 3 titles only
            <li key={post.id} className="rounded-lg border border-[#cfddcf] bg-[#f7faf7] p-4" style={{ backgroundColor: "#f7faf7", borderColor: "#cfddcf" }}>{post.title}</li>
        ))}
        </ul>
        </section>
    )
}