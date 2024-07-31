import{a8 as D,a7 as S,r as d,s as u,aQ as G,aR as O,af as n,a4 as i,aG as R,a9 as w,aD as Q,a2 as T,aq as V,j as l,aa as m,ab as j,aE as J}from"./index-CfV-X5io.js";function Z(o){return S("MuiDialog",o)}const k=D("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),oo=d.createContext({}),ao=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],eo=u(G,{name:"MuiDialog",slot:"Backdrop",overrides:(o,a)=>a.backdrop})({zIndex:-1}),ro=o=>{const{classes:a,scroll:e,maxWidth:r,fullWidth:t,fullScreen:p}=o,c={root:["root"],container:["container",`scroll${n(e)}`],paper:["paper",`paperScroll${n(e)}`,`paperWidth${n(String(r))}`,t&&"paperFullWidth",p&&"paperFullScreen"]};return j(c,Z,a)},io=u(O,{name:"MuiDialog",slot:"Root",overridesResolver:(o,a)=>a.root})({"@media print":{position:"absolute !important"}}),to=u("div",{name:"MuiDialog",slot:"Container",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.container,a[`scroll${n(e.scroll)}`]]}})(({ownerState:o})=>i({height:"100%","@media print":{height:"auto"},outline:0},o.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},o.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),so=u(R,{name:"MuiDialog",slot:"Paper",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.paper,a[`scrollPaper${n(e.scroll)}`],a[`paperWidth${n(String(e.maxWidth))}`],e.fullWidth&&a.paperFullWidth,e.fullScreen&&a.paperFullScreen]}})(({theme:o,ownerState:a})=>i({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},a.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},a.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},a.maxWidth==="xs"&&{maxWidth:o.breakpoints.unit==="px"?Math.max(o.breakpoints.values.xs,444):`max(${o.breakpoints.values.xs}${o.breakpoints.unit}, 444px)`,[`&.${k.paperScrollBody}`]:{[o.breakpoints.down(Math.max(o.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},a.maxWidth&&a.maxWidth!=="xs"&&{maxWidth:`${o.breakpoints.values[a.maxWidth]}${o.breakpoints.unit}`,[`&.${k.paperScrollBody}`]:{[o.breakpoints.down(o.breakpoints.values[a.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${k.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),go=d.forwardRef(function(a,e){const r=w({props:a,name:"MuiDialog"}),t=Q(),p={enter:t.transitions.duration.enteringScreen,exit:t.transitions.duration.leavingScreen},{"aria-describedby":c,"aria-labelledby":x,BackdropComponent:h,BackdropProps:N,children:F,className:U,disableEscapeKeyDown:W=!1,fullScreen:A=!1,fullWidth:E=!1,maxWidth:I="sm",onBackdropClick:y,onClick:P,onClose:b,open:M,PaperComponent:L=R,PaperProps:$={},scroll:Y="paper",TransitionComponent:_=J,transitionDuration:B=p,TransitionProps:X}=r,z=T(r,ao),g=i({},r,{disableEscapeKeyDown:W,fullScreen:A,fullWidth:E,maxWidth:I,scroll:Y}),f=ro(g),v=d.useRef(),H=s=>{v.current=s.target===s.currentTarget},K=s=>{P&&P(s),v.current&&(v.current=null,y&&y(s),b&&b(s,"backdropClick"))},C=V(x),q=d.useMemo(()=>({titleId:C}),[C]);return l.jsx(io,i({className:m(f.root,U),closeAfterTransition:!0,components:{Backdrop:eo},componentsProps:{backdrop:i({transitionDuration:B,as:h},N)},disableEscapeKeyDown:W,onClose:b,open:M,ref:e,onClick:K,ownerState:g},z,{children:l.jsx(_,i({appear:!0,in:M,timeout:B,role:"presentation"},X,{children:l.jsx(to,{className:m(f.container),onMouseDown:H,ownerState:g,children:l.jsx(so,i({as:L,elevation:24,role:"dialog","aria-describedby":c,"aria-labelledby":C},$,{className:m(f.paper,$.className),ownerState:g,children:l.jsx(oo.Provider,{value:q,children:F})}))})}))}))});function lo(o){return S("MuiDialogContent",o)}D("MuiDialogContent",["root","dividers"]);const no=D("MuiDialogTitle",["root"]),po=["className","dividers"],co=o=>{const{classes:a,dividers:e}=o;return j({root:["root",e&&"dividers"]},lo,a)},uo=u("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.root,e.dividers&&a.dividers]}})(({theme:o,ownerState:a})=>i({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},a.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${no.root} + &`]:{paddingTop:0}})),mo=d.forwardRef(function(a,e){const r=w({props:a,name:"MuiDialogContent"}),{className:t,dividers:p=!1}=r,c=T(r,po),x=i({},r,{dividers:p}),h=co(x);return l.jsx(uo,i({className:m(h.root,t),ownerState:x,ref:e},c))});export{mo as D,go as a,k as d};
