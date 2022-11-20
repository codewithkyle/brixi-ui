import{randomFloat as i}from"./numpy.js";/**
 * @see https://material.io/design/sound/sound-resources.html
 * @license CC-BY-4.0
 */class a{constructor(){this.mousemove=e=>{this.hasPointer=!0,window.removeEventListener("mousemove",this.mousemove)};this.mouseleave=e=>{const t=e.target;t instanceof HTMLElement&&t.getAttribute("sfx")==="button"&&(t.dataset.isMouseOver="0")};this.mouseover=e=>{const t=e.target;t instanceof HTMLElement&&e instanceof MouseEvent&&t.getAttribute("sfx")==="button"&&t.dataset.isMouseOver!=="1"&&(t.dataset.isMouseOver="1",this.hover())};this.focus=e=>{if(this.hasPointer||this.hasTouched)return;const t=e.target;t instanceof HTMLElement&&t.getAttribute("sfx")==="button"&&(t.dataset.isMouseOver==="0"||!t.dataset.isMouseOver)&&this.hover()};this.click=e=>{window.TouchEvent&&e instanceof TouchEvent&&(this.hasTouched=!0);const t=e.target;let o=!1;e instanceof KeyboardEvent&&e.key.toLowerCase()===" "&&(o=!0),t instanceof HTMLElement&&(t.getAttribute("sfx")==="button"||t.closest('[sfx="button"]')!==null)&&(o||!(e instanceof KeyboardEvent))&&this.tap()};this.hasTouched=!1,this.hasPointer=!1,this.doButtonSounds=!localStorage.getItem("disable-button-sfx"),this.doNotificationSounds=!localStorage.getItem("disable-notification-sfx"),this.doToggleSounds=!localStorage.getItem("disable-toggle-sfx"),this.doErrorSounds=!localStorage.getItem("disable-error-sfx"),this.doCameraSounds=!localStorage.getItem("disable-camera-sfx"),this.button={hover:new Audio("/audio/mouseover.wav"),click:new Audio("/audio/mouseclick.wav")},this.button.hover.load(),this.button.click.load(),this.notifications={error:new Audio("/audio/error-alert.wav"),success:new Audio("/audio/success.wav"),alert:new Audio("/audio/notification.wav"),snackbar:new Audio("/audio/snackbar.wav"),warning:new Audio("/audio/warning.wav")},this.notifications.error.load(),this.notifications.success.load(),this.notifications.alert.load(),this.notifications.snackbar.load(),this.notifications.warning.load(),this.toggle={activate:new Audio("/audio/activate.wav"),deactivate:new Audio("/audio/deactivate.wav")},this.toggle.activate.load(),this.toggle.deactivate.load(),this.general={error:new Audio("/audio/error.wav")},this.general.error.load(),this.camera=new Audio("/audio/camera.wav"),this.camera.load(),this.addButtonListeners()}addButtonListeners(){window.addEventListener("mousemove",this.mousemove,{capture:!0,passive:!0}),window.addEventListener("mouseenter",this.mouseover,{capture:!0,passive:!0}),window.addEventListener("mouseleave",this.mouseleave,{capture:!0,passive:!0}),window.addEventListener("focus",this.focus,{capture:!0,passive:!0}),window.addEventListener("blur",this.mouseleave,{capture:!0,passive:!0}),window.addEventListener("mousedown",this.click,{capture:!0,passive:!0}),window.addEventListener("touchstart",this.click,{capture:!0,passive:!0}),window.addEventListener("keydown",this.click,{capture:!0,passive:!0})}errorAlert(){if(this.doNotificationSounds){const e=this.notifications.error.cloneNode();e.volume=1,e.play()}}warning(){if(this.doNotificationSounds){const e=this.notifications.warning.cloneNode();e.volume=1,e.play()}}alert(){if(this.doNotificationSounds){const e=this.notifications.alert.cloneNode();e.volume=1,e.play()}}success(){if(this.doNotificationSounds){const e=this.notifications.success.cloneNode();e.volume=1,e.play()}}error(){if(this.doErrorSounds){const e=this.general.error.cloneNode();e.volume=.5,e.play()}}snackbar(){if(this.doNotificationSounds){const e=this.notifications.snackbar.cloneNode();e.volume=1,e.play()}}tap(){if(this.doButtonSounds){const e=this.button.click.cloneNode();e.volume=.5,e.play()}}hover(){if(this.doButtonSounds){const e=this.button.hover.cloneNode();e.volume=.5,e.play()}}activate(){if(this.doToggleSounds){const e=this.toggle.activate.cloneNode();e.playbackRate=i(.75,1),e.play()}}deactivate(){if(this.doToggleSounds){const e=this.toggle.deactivate.cloneNode();e.playbackRate=i(.75,1),e.play()}}cameraShutter(){this.doCameraSounds&&this.camera.cloneNode().play()}toggleSFX(e,t){switch(t?localStorage.removeItem(`disable-${e}-sfx`):localStorage.setItem(`disable-${e}-sfx`,"1"),e){case"button":this.doButtonSounds=t;break;case"camera":this.doCameraSounds=t;break;case"error":this.doErrorSounds=t;break;case"notification":this.doNotificationSounds=t;break;case"toggle":this.doToggleSounds=t;break}}}const s=new a;export{s as default};
