var s=Object.defineProperty;var l=(t,n,i)=>n in t?s(t,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[n]=i;var e=(t,n,i)=>(l(t,typeof n!="symbol"?n+"":n,i),i);class o extends HTMLElement{constructor(){super();e(this,"onClick",()=>{this.downloading||(this.downloading=!0,this.iconEl!=null&&(this.iconEl.style.display="none"),this.spanEl.innerHTML="Downloading...")});this.downloading=!1}connectedCallback(){this.iconEl=this.querySelector("svg, img"),this.spanEl=this.querySelector("span"),this.ogText=this.spanEl?.innerHTML,this.addEventListener("click",this.onClick)}}export{o as default};
