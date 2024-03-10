importScripts("/static/marked.js"),onmessage=t=>{const{id:e,markdown:s}=t.data;let r={id:e,type:"success",html:"",error:""};try{r.html=marked(s)}catch(a){r.error=a,r.type="error"}postMessage(r)};
