function i(){const e=(new Date().getTime()+performance.now())*100;return Math.round(e)}function r(){let t;return"randomUUID"in crypto?t=crypto.randomUUID():"getRandomValues"in crypto?t=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)):t=Array.from(Array(32)).map((e,o)=>{let n=o===12?4:(+new Date+Math.random()*16)%16|0;return`${~[8,12,16,20].indexOf(o)?"-":""}${(o===16?n&3|8:n).toString(16)}`}).join(""),t.toString()}function a(){const e=i().toString(16),n=r().split("-");return n[0]=e.slice(0,8),n[1]=e.slice(8,12),n.join("-")}export{r as UUID,a as orderedUUID};
