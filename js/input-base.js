import t from"./supercomponent.js";import{parseDataset as r}from"./general.js";import i from"./soundscape.js";class l extends t{constructor(e){super(),this.state=e?.disabled?"DISABLED":"IDLING",this.stateMachine={IDLING:{ERROR:"ERROR",DISABLE:"DISABLED"},ERROR:{RESET:"IDLING",ERROR:"ERROR"},DISABLED:{ENABLE:"IDLING"}},this.model={error:null,name:"",required:!1,value:"",disabled:!1},this.setAttribute("form-input",""),this.model=r(this.dataset,this.model),this.set(e,!0)}reset(){this.set({value:null});const e=this.querySelector("input");e&&(e.value="")}clearError(){this.state==="ERROR"&&this.trigger("RESET")}setError(e){e?.length&&(this.set({error:e}),this.trigger("ERROR"),i.play("error"))}validate(){let e=!0;return this.model.required&&!this.model.value&&(e=!1,this.setError("This field is required.")),e&&this.clearError(),e}getName(){return this.model?.name??""}getValue(){return this.model?.value??null}}export{l as InputBase};