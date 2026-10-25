'use client'
import {useState} from "react";
import { ApiError } from "./ApiError";
import { url, id } from "@/components/config";

type Post={

    id:number;
    title:string;
    body:string;
}
type State="idle"|"loading"|"empty"|"error"|"success";
type Scenario="success"|"slow"|"http-error"|"empty";



async function getResponse(scenario:Scenario):Promise<Response>{
    if(scenario==="slow"){
        await new Promise((resolve)=>setTimeout(resolve,2000));
    }
    if(scenario==="http-error"){
        return new Response(null,{status:503}); //Response(body,options) -> hon no need for body so we put null
    } //here in ststus 503  it makes response.ok become false so it throw ApiError,we dont call .json() laen it throws abl ma tusalla.
    if(scenario==="empty"){
        return new Response(JSON.stringify([]),{
            status : 200 ,
            headers:{"Content-Type":"application/json"},
        });
    }
    return fetch(`${url}/posts?userId=${id}`);
}


export default function LoadPosts(){
    const[state, setState] = useState<State>("idle");
    const [posts, setPosts] = useState<Post[]>([]);
    const [scenario, setScenario] = useState<Scenario>("success");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLoad(){    //run when click the button
        setState("loading"); //shows loading txt and disable the button to prevent duplicating clicks  
        try{
            const response = await getResponse(scenario);
            if(!response.ok){
                throw new ApiError("Request failed",response.status);
            }
            const data:Post[]=await response.json();
            setPosts(data);
            setState(data.length===0 ? "empty" : "success");
        }catch(error){
            if(error instanceof ApiError){
                setErrorMessage(
                   `Posts is unavailable (error ${error.status}). Try Again.`
                );
            }
            else{
                setErrorMessage(
                    "Check your connection and try again."
                );

            }
            setState("error");  //setState here will change the state
        }
    }
    return(
        <section className="rounded-xl border border-[#b2cbb8] bg-[#d3e5d5] p-5 shadow-lg shadow-green-900/15
        focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" style={{ backgroundColor: "#d3e5d5", borderColor: "#b2cbb8", boxShadow: "0 8px 22px rgba(21, 61, 41, 0.14)" }}>
            <h2 className="mb-4 font-heading text-4xl font-bold text-green-800">All Posts</h2>

            <label>Demo Scenario
                <select value={scenario} onChange={(e)=>setScenario(e.target.value as Scenario)}
                disabled={state==="loading"}
                className="w-full rounded-xl border border-[#c5d7ca] bg-white px-4 py-3 shadow-sm disabled:opacity-50
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    <option value="success">Success</option>
                    <option value="slow">Slow</option>
                    <option value="http-error">HTTP Error</option>
                    <option value="empty">Empty</option> 
                </select>
            </label>

            <button onClick={handleLoad} disabled={state==="loading"} 
            className="mb-4 w-full rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"> 
            {state==="loading"?"Loading...":state==="error"?"Retry":"Load posts"}
            </button>       

            {state==="idle"&& <p className="rounded bg-gray-100 p-3 text-gray-700">
                Click the button to load the posts.</p>}
            {state==="loading"&&<p className="rounded bg-blue-50 p-3 text-blue-700">
                Loading posts...</p>}
            {state==="empty"&&<p className="rounded bg-yellow-50 p-3 text-yellow-800">
                No post found.</p>}
            {state==="error"&&<p className="rounded bg-red-50 p-3 font-medium text-red-700">
                {errorMessage}</p>}
            {state==="success"&&(
                <ul className="space-y-3">
                    {posts.map((post)=>(
                        <li key={post.id} className="rounded-lg border border-[#cfddcf] bg-[#f7faf7] p-4" style={{ backgroundColor: "#f7faf7", borderColor: "#cfddcf" }}>
                            <h3 className="mb-1 font-semibold capitalize">{post.title}</h3>
                            <p className="text-sm text-gray-700">{post.body}</p>
                        </li>
                    ))}
                </ul>
                    )}   
                     
        </section>      //in button we didnt put handleLoad with paranthesis since the fct must wait for click instead of run during rendering            
    );
}