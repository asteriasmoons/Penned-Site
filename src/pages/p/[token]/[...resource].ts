import type { APIRoute } from "astro";
import { publicationIdentifier, readerCookieName } from "../../../lib/publishing.ts";
import { publishingProject } from "../../../lib/public-document.ts";
export const prerender=false;
const headers={"Cache-Control":"private, no-store, max-age=0","CDN-Cache-Control":"no-store","Vercel-CDN-Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer"};
export const ALL: APIRoute = async context=>{
  const {params,request,cookies}=context,token=params.token||"",resource=params.resource||"";
  if(!publicationIdentifier.test(token))return new Response(null,{status:404,headers});
  let path="",method=request.method;
  if(resource==="status"&&method==="GET"){path="";method="HEAD";}
  else if(/^media\/[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(resource)&&["GET","HEAD"].includes(method))path="/"+resource;
  else if(["access","email"].includes(resource)&&method==="POST"){
    if(request.headers.get("origin")!==new URL(request.url).origin)return new Response(null,{status:403,headers});
    const length=Number(request.headers.get("content-length")||0);
    if(length>4096)return new Response(null,{status:413,headers});
    path="/"+resource;
  }else return new Response(null,{status:404,headers});
  try{
    const forwarded=new Headers({"Content-Type":"application/json"});
    const grant=cookies.get(readerCookieName(token))?.value;
    if(grant)forwarded.set("X-Penned-Reader",grant);
    if(request.headers.has("range"))forwarded.set("Range",request.headers.get("range")!);
    if(method==="POST"){
      try{forwarded.set("X-Forwarded-For",context.clientAddress);}catch{forwarded.set("X-Forwarded-For","unknown");}
    }
    const body=method==="POST"?await request.text():undefined;
    if(body&&body.length>4096)return new Response(null,{status:413,headers});
    const response=await fetch(`${publishingProject}/functions/v1/penned-publishing/public/${token}${path}`,{method,body,headers:forwarded,redirect:"error",cache:"no-store",signal:AbortSignal.timeout(30000)});
    if(resource==="status"){
      const version=Number(response.headers.get("etag")?.match(/^(?:W\/)?"(\d+)"$/)?.[1]);
      if(response.ok&&!Number.isSafeInteger(version))return Response.json({error:"version_unavailable"},{status:503,headers});
      return Response.json({version:Number.isSafeInteger(version)?version:0},{status:response.status,headers});
    }
    if(method==="POST"){
      const data=await response.json();
      if(response.ok&&typeof data.readerToken==="string"&&/^prg_[a-f\d]{64}$/.test(data.readerToken)){
        cookies.set(readerCookieName(token),data.readerToken,{httpOnly:true,secure:new URL(request.url).protocol==="https:",sameSite:"lax",path:"/p/"+token,maxAge:7*86400});
        return Response.json({authorized:true},{headers});
      }
      return Response.json({sent:data.sent===true,error:data.error},{status:response.status,headers});
    }
    const result=new Headers(headers);
    for(const key of ["content-type","content-range","accept-ranges","content-disposition","content-security-policy"])if(response.headers.has(key))result.set(key,response.headers.get(key)!);
    // Fetch decodes upstream compression; its encoded byte count is no longer valid.
    if(!response.headers.has("content-encoding")&&response.headers.has("content-length"))result.set("Content-Length",response.headers.get("content-length")!);
    return new Response(response.body,{status:response.status,headers:result});
  }catch{return Response.json({error:"connection_unavailable"},{status:503,headers});}
};
