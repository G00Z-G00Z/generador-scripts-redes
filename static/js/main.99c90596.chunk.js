(this["webpackJsonpgenerador-scripts-redes"]=this["webpackJsonpgenerador-scripts-redes"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(4),o=n(2),s=n(3);function l(e,t){return i(e,t,window.sessionStorage)}function i(e,t,n){var c=Object(a.useState)((function(){var a=n.getItem(e);return null!==a?JSON.parse(a):t})),r=Object(s.a)(c,2),o=r[0],l=r[1];Object(a.useEffect)((function(){if(void 0===o)return n.removeItem(e);n.setItem(e,JSON.stringify(o))}),[e,o,n]);var i=Object(a.useCallback)((function(){l(void 0),n.removeItem(e)}),[]);return[o,l,i]}var d=n(7),u=n.n(d),j=u.a.mark(b);function b(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=0;case 1:return t.next=3,e.toString();case 3:e++,t.next=1;break;case 6:case"end":return t.stop()}}),j)}var p,m={hostname:"",interfaces:{},security:{bannerMord:"",encription:!1,lineConsole:!1,vty:!1},hasRip:!1},f={description:"",interfaceCableType:{type:"fastethernet",port:""},ipAddress:"",ipMask:"",dhcp:Object(o.a)({},{dnsServer:"",excluded:[],poolName:""})},h=Object(a.createContext)({routerConfig:m,dispatch:function(e){}}),O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(a.useState)(e),n=Object(s.a)(t,2),c=n[0],r=n[1],o=function(){r(!c)};return[c,o]};!function(e){e[e.hostname=0]="hostname",e[e.banner=1]="banner",e[e.vty=2]="vty",e[e.console=3]="console",e[e.encription=4]="encription",e[e.eraseInterface=5]="eraseInterface",e[e.update=6]="update",e[e.createNewInterface=7]="createNewInterface",e[e.setRip=8]="setRip",e[e.updateAllRouter=9]="updateAllRouter"}(p||(p={}));var v=function(e,t){var n;switch(t.type){case p.hostname:return Object(o.a)(Object(o.a)({},e),{},{hostname:t.payload});case p.updateAllRouter:return t.payload.router;case p.banner:return(n=Object(o.a)({},e)).security.bannerMord=t.payload,n;case p.setRip:return(n=Object(o.a)({},e)).hasRip=t.payload.value,n;case p.vty:return(n=Object(o.a)({},e)).security.vty=t.payload,n;case p.console:return(n=Object(o.a)({},e)).security.lineConsole=t.payload,n;case p.encription:return(n=Object(o.a)({},e)).security.encription=t.payload,n;case p.eraseInterface:return delete(n=Object(o.a)({},e)).interfaces[t.payload.key],n;case p.update:n=Object(o.a)({},e);var a=t.payload,c=a.key,r=a.routerInterface;return n.interfaces[c]=r,n;case p.createNewInterface:n=Object(o.a)({},e);var s=t.payload.key;return n.interfaces[s]=Object(o.a)({},f),n;default:return e}},x=n(8),y=/(\d+\.\d+\.\d+)\.\d+/gm,g=function(e){return e.replace(y,"$1.0")},N=function(e){for(var t=[],n=0;n<4;n++){var a=Math.min(e,8);t.push(256-Math.pow(2,8-a)),e-=a}return t.join(".")},C=/(\d+\.\d+\.\d+)\.\d+/gm,S=function(e){return e.replace(C,"$1.255")},k=function(e){var t=e.hostname,n=e.security,a=e.hasRip,c="\nenable\nconfigure terminal \nhostname ".concat(t,"\n").concat(n.lineConsole?"enable secret cisco\nline console 0\npassword cisco\nlogin\nexit":"","\n").concat(n.vty?"line vty 0 4\npassword cisco\nlogin\nexit":"","\nbanner motd #").concat(n.bannerMord,"#\n").concat(n.encription?"service password-encryption":"","\n"),r=[];for(var o in e.interfaces){var s=e.interfaces[o],l=s.description,i=s.ipAddress,d=s.ipMask,u=s.interfaceCableType,j=s.dhcp,b=j.dnsServer,p=j.excluded,m=j.poolName,f=u.port,h=u.type,O=g(i),v=S(i),y=N(Number(d));a&&r.push(O);var C="serial"===s.interfaceCableType.type&&s.interfaceCableType.isFemale,k="interface ".concat(h," ").concat(f,"\n").concat(C?"clock rate 64000":"","\ndescription ").concat(l,"\nip address ").concat(i," ").concat(y,"\nno shutdown\nexit\n");if(c+=k,"serial"!==u.type){c+="ip dhcp pool ".concat(m,"\ndefault-router ").concat(i,"\nnetwork ").concat(O," ").concat(y,"\n").concat(""!==b?"dns-server ".concat(b):"","\nip dhcp excluded-address ").concat(i,"\nip dhcp excluded-address ").concat(v,"\n").concat(v===b||""===b?"":"ip dhcp excluded-address ".concat(b),"\n");var w,I=Object(x.a)(p);try{for(I.s();!(w=I.n()).done;){var R=w.value;""!==R&&(c+="ip dhcp excluded-address ".concat(R,"\n"))}}catch(A){I.e(A)}finally{I.f()}c+="exit\n"}}return a&&(c+="router rip\nversion 2\n",r.forEach((function(e){c+="network ".concat(e,"\n")}))),c+="exit\n"},w=n(0),I=function(e){var t=e.onChange,n=e.label,a=e.value,c=e.name;return Object(w.jsxs)("div",{className:"form-check",children:[Object(w.jsx)("input",{className:"form-check-input",type:"checkbox",checked:a,name:c,onChange:t}),Object(w.jsx)("label",{className:"form-check-label",htmlFor:c,children:n})]})},R=function(){var e=Object(a.useContext)(h),t=e.routerConfig,n=e.dispatch,c=Object(a.useState)(""),r=Object(s.a)(c,2),o=r[0],l=r[1],i=Object(a.useState)(""),d=Object(s.a)(i,2),u=d[0],j=d[1],b=Object(a.useRef)(null),m=Object(a.useState)(20),f=Object(s.a)(m,2),v=f[0],x=f[1],y=O(!0),g=Object(s.a)(y,2),N=g[0],C=g[1];return Object(a.useEffect)((function(){b.current&&clearTimeout(b.current),N&&(b.current=setTimeout((function(){l(JSON.stringify(t,null,2)),j(k(t)),x(Math.max(10,o.split(/\r\n|\r|\n/).length,u.split(/\r\n|\r|\n/).length)+4)}),1e3))}),[t,N]),Object(w.jsxs)("p",{className:"container mt-2 border-top",children:[Object(w.jsxs)("h2",{className:"text-center",children:["Script de ",t.hostname||"router"]}),Object(w.jsxs)("p",{children:["Aqui es donde se genera el script.",Object(w.jsx)("b",{children:"Si cambias algo en los campos de arriba, se ver\xe1n reflejados aqui abajo."}),"Sin embargo, tu puedes cambiar lo que quieras en el script, y permanecer\xe1 aqui. Tambi\xe9n, puedes hacer tu propio archivo de configuraci\xf3n json. Si es v\xe1lido, se generar\xe1 el router."]}),Object(w.jsxs)("div",{className:"row",children:[Object(w.jsx)("p",{className:"offset-md-5 col-md-5",children:"Adicionalmente, puedes desactivar que se genere aqui:"}),Object(w.jsx)("div",{className:"col-md-2 text",children:Object(w.jsx)(I,{label:"Generar C\xf3digo",name:"hot-reload",onChange:C,value:N})})]}),Object(w.jsxs)("div",{className:"row",children:[Object(w.jsxs)("div",{className:"col-md-5 order-1 order-md-0",children:[Object(w.jsx)("h3",{children:"JSON generado "}),Object(w.jsx)("textarea",{value:o,className:"form-control",rows:v,spellCheck:!1,onChange:function(e){var t,a,c=e.target;try{a=JSON.parse(c.value),t=k(a)}catch(r){return}l(c.value),j(t),n({type:p.updateAllRouter,payload:{router:a}})}})]}),Object(w.jsxs)("div",{className:"col-md-7",children:[Object(w.jsx)("h3",{children:"Script generado "}),Object(w.jsx)("textarea",{value:u,className:"form-control",rows:v,onChange:function(e){var t=e.target;j(t.value)},spellCheck:!1})]})]})]})},A=function(){var e=Object(a.useContext)(h),t=e.routerConfig,n=e.dispatch,c=t.hostname,r=t.security,o=t.hasRip,s=r.bannerMord,l=r.encription,i=r.lineConsole,d=r.vty;return Object(w.jsxs)("div",{className:"row p-2",children:[Object(w.jsx)("h3",{className:"text-center mt-2",children:"Configuraci\xf3n b\xe1sica"}),Object(w.jsxs)("div",{className:"col col-5",children:[Object(w.jsx)("label",{htmlFor:"hostname",className:"form-label",children:"Hostname del Router:"}),Object(w.jsx)("input",{type:"text",className:"form-control",name:"hostname",placeholder:"Hostname",value:c,onChange:function(e){n({type:p.hostname,payload:e.target.value})}}),Object(w.jsx)("label",{htmlFor:"banner",className:"form-label",children:"Poner el Banner motd"}),Object(w.jsx)("input",{type:"text",className:"form-control",name:"banner",placeholder:"banner",value:s,onChange:function(e){n({type:p.banner,payload:e.target.value})}})]}),Object(w.jsxs)("div",{className:"col col-6",children:[Object(w.jsx)(I,{label:"Tiene encription",name:"encription",value:l,onChange:function(){n({type:p.encription,payload:!l})}}),Object(w.jsx)(I,{label:"Tiene line console security",name:"lineconsole",value:i,onChange:function(){n({type:p.console,payload:!i})}}),Object(w.jsx)(I,{label:"Tiene vty",name:"vty",value:d,onChange:function(){n({type:p.vty,payload:!d})}}),Object(w.jsx)(I,{label:"Tiene rip",name:"vty",value:o,onChange:function(){n({type:p.setRip,payload:{value:!o}})}})]})]})},F=function(e){var t=Object(a.useState)(e),n=Object(s.a)(t,2),c=n[0],l=n[1];return Object(o.a)(Object(o.a)({},c),{},{formulario:c,onChange:function(e,t){l(Object(o.a)(Object(o.a)({},c),{},Object(r.a)({},t,e)))},clearFormulario:function(){l((function(e){return Object.keys(e).map((function(t,n){e[t]=""})),e}))}})},P=function(e){var t=e.name,n=e.label,a=e.placeHolder,c=e.value,r=e.onChange;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("label",{htmlFor:t,className:"form-label",children:n}),Object(w.jsx)("input",{type:"text",className:"form-control",name:t,placeholder:a,value:c,onChange:function(e){r(e.target.value,t)}})]})},M=function(e){var t,n=e.id_interface,c=e.routerInterface,r=Object(a.useContext)(h).dispatch,s=c.dhcp,l=F({dnsServer:s.dnsServer,poolName:s.poolName,excluded:s.excluded.join(",")}),i=l.dnsServer,d=l.poolName,u=l.excluded,j=l.formulario,b=l.onChange;return Object(a.useEffect)((function(){var e=j.excluded.split(",").map((function(e){return e.trim()}));r({type:p.update,payload:{key:n,routerInterface:Object(o.a)(Object(o.a)({},c),{},{dhcp:{dnsServer:i,poolName:d,excluded:e}})}})}),[r,i,u,d]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("h5",{children:["DHCP Configuration ",null!==(t="DHCP::".concat(d))&&void 0!==t?t:""]}),Object(w.jsxs)("div",{className:"dhcp-config-form",children:[Object(w.jsx)(P,{label:"Pon el nombre del pool name",onChange:b,value:d,placeHolder:"Pon el poolName",name:"poolName"}),Object(w.jsx)(P,{label:"Pon la ip del dnsServer",onChange:b,value:i,placeHolder:"Pon el dnsServer",name:"dnsServer"}),Object(w.jsx)(P,{label:"Pon las ip excluidas, separadas por commas",onChange:b,value:u,placeHolder:"Pon el excluded",name:"excluded"})]})]})},T=function(e){var t=e.id,n=e.routerInter,c=n.description,r=n.interfaceCableType,l=n.ipMask,i=n.ipAddress,d=Object(a.useContext)(h).dispatch,u=Object(a.useState)(r.type),j=Object(s.a)(u,2),b=j[0],m=j[1],f=F({ipMas:l,ipAdd:i,port:r.port,descriptionForm:c}),v=f.onChange,x=f.ipAdd,y=f.ipMas,g=f.descriptionForm,N=f.port,C=O("serial"===r.type&&r.isFemale),S=Object(s.a)(C,2),k=S[0],R=S[1];return Object(a.useEffect)((function(){var e="serial"===b?{type:"serial",isFemale:k,port:N}:{type:b,port:N};d({type:p.update,payload:{key:t,routerInterface:Object(o.a)(Object(o.a)({},n),{},{description:g,interfaceCableType:e,ipAddress:x,ipMask:y})}})}),[k,g,d,t,x,y,N,b]),Object(w.jsxs)("div",{className:"container",children:[Object(w.jsxs)("div",{className:"row",children:[Object(w.jsxs)("div",{className:"col-6",children:[Object(w.jsx)("strong",{children:"Select Type of cable"}),Object(w.jsxs)("select",{className:"form-select","aria-label":"Default select example",value:b,onChange:function(e){return m(e.target.value)},children:[Object(w.jsx)("option",{value:"fastethernet",children:"Fast Ethernet"}),Object(w.jsx)("option",{value:"serial",children:"Serial "}),Object(w.jsx)("option",{value:"gigabitethernet",children:"Gigabit"})]}),"serial"===b&&Object(w.jsx)(I,{label:"Es hembra?",value:k,name:"es-hembra",onChange:function(){R()}})]}),Object(w.jsx)("div",{className:"col-6",children:Object(w.jsx)(P,{label:"Pon el port number",name:"port",onChange:v,placeHolder:"Port number",value:N})}),Object(w.jsx)("div",{children:Object(w.jsx)(P,{label:"Pon el description",name:"descriptionForm",onChange:v,placeHolder:"description",value:g})})]}),Object(w.jsx)("strong",{children:"Ip address"})," ",Object(w.jsx)("br",{}),Object(w.jsx)("small",{children:"Pones la direccion normal y luego pones diagonal algo"}),Object(w.jsxs)("div",{className:"input-group",children:[Object(w.jsx)("div",{className:"col-9",children:Object(w.jsx)("input",{type:"text",className:"form-control col-9",name:"ipAddress",placeholder:"ipAddress del router",value:x,onChange:function(e){v(e.target.value,"ipAdd")}})}),Object(w.jsx)("span",{className:"input-group-text",children:"/"}),Object(w.jsx)("input",{type:"text",className:"form-control",name:"ipMask",placeholder:"ex. 24",value:y,onChange:function(e){v(e.target.value,"ipMas")}})]}),"serial"!==n.interfaceCableType.type&&Object(w.jsx)("div",{className:"dhcp-config-container mt-4",children:Object(w.jsx)(M,{id_interface:t,routerInterface:n})})]})},E=b(),H=function(){var e=Object(a.useContext)(h),t=e.routerConfig,n=e.dispatch,c=Object(a.useRef)(null);return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h3",{className:"text-center mt-3 border-bottom",children:"Configuraci\xf3n de las interfaces"}),Object(w.jsx)("div",{className:"interfaces",ref:c,children:Object.keys(t.interfaces).map((function(e){var a=t.interfaces[e];return Object(w.jsx)("div",{className:"interface row border-bottom p-3 p-md-1",children:Object(w.jsxs)("div",{className:"my-1",children:[Object(w.jsx)(T,{id:e,routerInter:a}),Object(w.jsx)("button",{className:"btn btn-danger col-4 offset-4 mt-2",onClick:function(){n({type:p.eraseInterface,payload:{key:e}})},children:"Eliminar interface"})]})},e)}))}),Object(w.jsx)("button",{className:"btn btn-success col-6 offset-3 mt-2",onClick:function(){var e,t,a=null!==(e=null===E||void 0===E||null===(t=E.next())||void 0===t?void 0:t.value)&&void 0!==e?e:"1";n({type:p.createNewInterface,payload:{key:a}})},children:"Add interface"})]})},q=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsxs)("div",{className:"container",children:[Object(w.jsx)("div",{className:"row border-top",children:Object(w.jsx)(A,{})}),Object(w.jsx)("div",{className:"row border-top",children:Object(w.jsx)(H,{})})]})})},J=function(e){var t=e.routerConfigParameters,n=e.id,c=l("router_".concat(n),t),r=Object(s.a)(c,3),o=r[0],i=r[1],d=r[2],u=Object(a.useReducer)(v,o||m),j=Object(s.a)(u,2),b=j[0],p=j[1];return Object(a.useEffect)((function(){i(b)}),[b,i]),Object(a.useEffect)((function(){return function(){d()}}),[]),Object(w.jsx)(h.Provider,{value:{routerConfig:b,dispatch:p},children:Object(w.jsxs)("div",{className:"container mb-3 border shadow-sm",children:[Object(w.jsxs)("h2",{className:"text-center",children:["Configuracion de"," ","".concat(b.hostname?"router:".concat(b.hostname):"router")]}),Object(w.jsx)(q,{}),Object(w.jsx)(R,{})]})})},D=b(),G=function(){var e=l("routerConfig",{}),t=Object(s.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(null!==n&&void 0!==n?n:{}),d=Object(s.a)(i,2),u=d[0],j=d[1],b=function(e,t){j((function(n){var a=Object(o.a)({},n);return a[e]=t,a}))};return Object(a.useEffect)((function(){c(u),console.log("Algo se esta cambiando")}),[u,c]),Object(w.jsxs)("div",{className:"container my-5 px-md-5 px-1",children:[Object(w.jsx)("h1",{children:"Generador de Scripts de Router"}),Object(w.jsxs)("p",{children:['Este es un generador de Scripts de router para el examen de redes. Para usarlo, solamente picale al bot\xf3n de "Add router" para a\xf1adir un router.'," "]}),Object(w.jsx)("h1",{children:"Routers"}),Object.entries(u).map((function(e){var t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(w.jsxs)("div",{className:"container my-3",children:[Object(w.jsx)(J,{routerConfigParameters:a,id:n,updateRouter:b}),Object(w.jsxs)("button",{className:"btn btn-danger col-4 offset-4",onClick:function(){j((function(e){var t=Object(o.a)({},e);return delete t[n],t}))},children:["Delete ",a.hostname||"Router"]})]},n)})),Object(w.jsx)("button",{className:"btn btn-success col-10 offset-1 mb-5",onClick:function(){var e="";do{var t,n;e=null!==(t=null===(n=D.next())||void 0===n?void 0:n.value)&&void 0!==t?t:"1"}while(u[e]);j(Object(o.a)(Object(o.a)({},u),{},Object(r.a)({},e,Object(o.a)({},m))))},children:"Add Router"})]})};var _=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(G,{})})},B=n(9);n.n(B).a.render(Object(w.jsx)(c.a.StrictMode,{children:Object(w.jsx)(_,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.99c90596.chunk.js.map