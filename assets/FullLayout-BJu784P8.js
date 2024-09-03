import{aa as c,bc as yt,bd as Ct,az as k,r as f,ac as E,j as a,be as jt,bf as It,ao as N,aj as _,z as b,av as w,aQ as Y,ay as T,bg as $t,ar as Bt,bh as nt,aR as F,at as Rt,ad as st,ak as q,aJ as it,aG as Q,bi as Lt,bj as lt,ag as Tt,bk as Pt,bl as Z,bm as Et,al as St,t as Mt,I as ct,bn as Dt,aO as At,L as dt,a1 as Nt,P as O,bo as wt,bp as zt,b9 as Ot,b5 as tt,aU as pt,bq as Wt,br as Gt,a0 as Ft,u as Ut,b as Vt,bs as _t,a2 as Ht,bt as Xt}from"./index-D2yD7EI1.js";import{B as R}from"./Box-DmHx2adP.js";import{A as Yt,E as qt,P as Qt,x as Jt}from"./index.esm-X0W0p2vg.js";import{l as z,g as Kt,u as Zt}from"./listItemButtonClasses-C_4Ku1hu.js";const te=["className","component","disableGutters","fixed","maxWidth","classes"],ee=yt(),oe=Ct("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`maxWidth${k(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),re=t=>It({props:t,name:"MuiContainer",defaultTheme:ee}),ae=(t,e)=>{const o=u=>_(e,u),{classes:r,fixed:s,disableGutters:l,maxWidth:n}=t,i={root:["root",n&&`maxWidth${k(String(n))}`,s&&"fixed",l&&"disableGutters"]};return N(i,o,r)};function ne(t={}){const{createStyledComponent:e=oe,useThemeProps:o=re,componentName:r="MuiContainer"}=t,s=e(({theme:n,ownerState:i})=>c({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!i.disableGutters&&{paddingLeft:n.spacing(2),paddingRight:n.spacing(2),[n.breakpoints.up("sm")]:{paddingLeft:n.spacing(3),paddingRight:n.spacing(3)}}),({theme:n,ownerState:i})=>i.fixed&&Object.keys(n.breakpoints.values).reduce((u,d)=>{const x=d,g=n.breakpoints.values[x];return g!==0&&(u[n.breakpoints.up(x)]={maxWidth:`${g}${n.breakpoints.unit}`}),u},{}),({theme:n,ownerState:i})=>c({},i.maxWidth==="xs"&&{[n.breakpoints.up("xs")]:{maxWidth:Math.max(n.breakpoints.values.xs,444)}},i.maxWidth&&i.maxWidth!=="xs"&&{[n.breakpoints.up(i.maxWidth)]:{maxWidth:`${n.breakpoints.values[i.maxWidth]}${n.breakpoints.unit}`}}));return f.forwardRef(function(i,u){const d=o(i),{className:x,component:g="div",disableGutters:h=!1,fixed:P=!1,maxWidth:y="lg"}=d,C=E(d,te),j=c({},d,{component:g,disableGutters:h,fixed:P,maxWidth:y}),I=ae(j,r);return a.jsx(s,c({as:g,ownerState:j,className:jt(I.root,x),ref:u},C))})}const se=["className"],ie=t=>{const{alignItems:e,classes:o}=t;return N({root:["root",e==="flex-start"&&"alignItemsFlexStart"]},$t,o)},le=b("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.alignItems==="flex-start"&&e.alignItemsFlexStart]}})(({theme:t,ownerState:e})=>c({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex"},e.alignItems==="flex-start"&&{marginTop:8})),ce=f.forwardRef(function(e,o){const r=w({props:e,name:"MuiListItemIcon"}),{className:s}=r,l=E(r,se),n=f.useContext(Y),i=c({},r,{alignItems:n.alignItems}),u=ie(i);return a.jsx(le,c({className:T(u.root,s),ownerState:i,ref:o},l))}),de=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected","className"],pe=(t,e)=>{const{ownerState:o}=t;return[e.root,o.dense&&e.dense,o.alignItems==="flex-start"&&e.alignItemsFlexStart,o.divider&&e.divider,!o.disableGutters&&e.gutters]},ue=t=>{const{alignItems:e,classes:o,dense:r,disabled:s,disableGutters:l,divider:n,selected:i}=t,d=N({root:["root",r&&"dense",!l&&"gutters",n&&"divider",s&&"disabled",e==="flex-start"&&"alignItemsFlexStart",i&&"selected"]},Kt,o);return c({},o,d)},xe=b(Bt,{shouldForwardProp:t=>nt(t)||t==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:pe})(({theme:t,ownerState:e})=>c({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${z.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:F(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${z.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:F(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${z.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:F(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:F(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${z.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${z.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity}},e.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},e.alignItems==="flex-start"&&{alignItems:"flex-start"},!e.disableGutters&&{paddingLeft:16,paddingRight:16},e.dense&&{paddingTop:4,paddingBottom:4})),fe=f.forwardRef(function(e,o){const r=w({props:e,name:"MuiListItemButton"}),{alignItems:s="center",autoFocus:l=!1,component:n="div",children:i,dense:u=!1,disableGutters:d=!1,divider:x=!1,focusVisibleClassName:g,selected:h=!1,className:P}=r,y=E(r,de),C=f.useContext(Y),j=f.useMemo(()=>({dense:u||C.dense||!1,alignItems:s,disableGutters:d}),[s,C.dense,u,d]),I=f.useRef(null);Rt(()=>{l&&I.current&&I.current.focus()},[l]);const D=c({},r,{alignItems:s,dense:j.dense,disableGutters:d,divider:x,selected:h}),$=ue(D),B=st(I,o);return a.jsx(Y.Provider,{value:j,children:a.jsx(xe,c({ref:B,href:y.href||y.to,component:(y.href||y.to)&&n==="div"?"button":n,focusVisibleClassName:T($.focusVisible,g),ownerState:D,className:T($.root,P)},y,{classes:$,children:i}))})});function ge(t){return _("MuiAppBar",t)}q("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);const be=["className","color","enableColorOnDark","position"],he=t=>{const{color:e,position:o,classes:r}=t,s={root:["root",`color${k(e)}`,`position${k(o)}`]};return N(s,ge,r)},U=(t,e)=>t?`${t==null?void 0:t.replace(")","")}, ${e})`:e,me=b(it,{name:"MuiAppBar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`position${k(o.position)}`],e[`color${k(o.color)}`]]}})(({theme:t,ownerState:e})=>{const o=t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[900];return c({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},e.position==="fixed"&&{position:"fixed",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},e.position==="absolute"&&{position:"absolute",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0},e.position==="sticky"&&{position:"sticky",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0},e.position==="static"&&{position:"static"},e.position==="relative"&&{position:"relative"},!t.vars&&c({},e.color==="default"&&{backgroundColor:o,color:t.palette.getContrastText(o)},e.color&&e.color!=="default"&&e.color!=="inherit"&&e.color!=="transparent"&&{backgroundColor:t.palette[e.color].main,color:t.palette[e.color].contrastText},e.color==="inherit"&&{color:"inherit"},t.palette.mode==="dark"&&!e.enableColorOnDark&&{backgroundColor:null,color:null},e.color==="transparent"&&c({backgroundColor:"transparent",color:"inherit"},t.palette.mode==="dark"&&{backgroundImage:"none"})),t.vars&&c({},e.color==="default"&&{"--AppBar-background":e.enableColorOnDark?t.vars.palette.AppBar.defaultBg:U(t.vars.palette.AppBar.darkBg,t.vars.palette.AppBar.defaultBg),"--AppBar-color":e.enableColorOnDark?t.vars.palette.text.primary:U(t.vars.palette.AppBar.darkColor,t.vars.palette.text.primary)},e.color&&!e.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":e.enableColorOnDark?t.vars.palette[e.color].main:U(t.vars.palette.AppBar.darkBg,t.vars.palette[e.color].main),"--AppBar-color":e.enableColorOnDark?t.vars.palette[e.color].contrastText:U(t.vars.palette.AppBar.darkColor,t.vars.palette[e.color].contrastText)},!["inherit","transparent"].includes(e.color)&&{backgroundColor:"var(--AppBar-background)"},{color:e.color==="inherit"?"inherit":"var(--AppBar-color)"},e.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),ve=f.forwardRef(function(e,o){const r=w({props:e,name:"MuiAppBar"}),{className:s,color:l="primary",enableColorOnDark:n=!1,position:i="fixed"}=r,u=E(r,be),d=c({},r,{color:l,position:i,enableColorOnDark:n}),x=he(d);return a.jsx(me,c({square:!0,component:"header",ownerState:d,elevation:4,className:T(x.root,s,i==="fixed"&&"mui-fixed"),ref:o},u))});function ke(t){return _("MuiListSubheader",t)}q("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const ye=["className","color","component","disableGutters","disableSticky","inset"],Ce=t=>{const{classes:e,color:o,disableGutters:r,inset:s,disableSticky:l}=t,n={root:["root",o!=="default"&&`color${k(o)}`,!r&&"gutters",s&&"inset",!l&&"sticky"]};return N(n,ke,e)},je=b("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,o.color!=="default"&&e[`color${k(o.color)}`],!o.disableGutters&&e.gutters,o.inset&&e.inset,!o.disableSticky&&e.sticky]}})(({theme:t,ownerState:e})=>c({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(t.vars||t).palette.text.secondary,fontFamily:t.typography.fontFamily,fontWeight:t.typography.fontWeightMedium,fontSize:t.typography.pxToRem(14)},e.color==="primary"&&{color:(t.vars||t).palette.primary.main},e.color==="inherit"&&{color:"inherit"},!e.disableGutters&&{paddingLeft:16,paddingRight:16},e.inset&&{paddingLeft:72},!e.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(t.vars||t).palette.background.paper})),ut=f.forwardRef(function(e,o){const r=w({props:e,name:"MuiListSubheader"}),{className:s,color:l="default",component:n="li",disableGutters:i=!1,disableSticky:u=!1,inset:d=!1}=r,x=E(r,ye),g=c({},r,{color:l,component:n,disableGutters:i,disableSticky:u,inset:d}),h=Ce(g);return a.jsx(je,c({as:n,className:T(h.root,s),ref:o,ownerState:g},x))});ut.muiSkipListHighlight=!0;const Ie=ne({createStyledComponent:b("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`maxWidth${k(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),useThemeProps:t=>w({props:t,name:"MuiContainer"})}),$e=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Be(t,e,o){const r=e.getBoundingClientRect(),s=o&&o.getBoundingClientRect(),l=lt(e);let n;if(e.fakeTransform)n=e.fakeTransform;else{const d=l.getComputedStyle(e);n=d.getPropertyValue("-webkit-transform")||d.getPropertyValue("transform")}let i=0,u=0;if(n&&n!=="none"&&typeof n=="string"){const d=n.split("(")[1].split(")")[0].split(",");i=parseInt(d[4],10),u=parseInt(d[5],10)}return t==="left"?s?`translateX(${s.right+i-r.left}px)`:`translateX(${l.innerWidth+i-r.left}px)`:t==="right"?s?`translateX(-${r.right-s.left-i}px)`:`translateX(-${r.left+r.width-i}px)`:t==="up"?s?`translateY(${s.bottom+u-r.top}px)`:`translateY(${l.innerHeight+u-r.top}px)`:s?`translateY(-${r.top-s.top+r.height-u}px)`:`translateY(-${r.top+r.height-u}px)`}function Re(t){return typeof t=="function"?t():t}function V(t,e,o){const r=Re(o),s=Be(t,e,r);s&&(e.style.webkitTransform=s,e.style.transform=s)}const Le=f.forwardRef(function(e,o){const r=Q(),s={enter:r.transitions.easing.easeOut,exit:r.transitions.easing.sharp},l={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:n,appear:i=!0,children:u,container:d,direction:x="down",easing:g=s,in:h,onEnter:P,onEntered:y,onEntering:C,onExit:j,onExited:I,onExiting:D,style:$,timeout:B=l,TransitionComponent:H=Tt}=e,A=E(e,$e),v=f.useRef(null),X=st(u.ref,v,o),S=p=>m=>{p&&(m===void 0?p(v.current):p(v.current,m))},M=S((p,m)=>{V(x,p,d),Pt(p),P&&P(p,m)}),L=S((p,m)=>{const K=Z({timeout:B,style:$,easing:g},{mode:"enter"});p.style.webkitTransition=r.transitions.create("-webkit-transform",c({},K)),p.style.transition=r.transitions.create("transform",c({},K)),p.style.webkitTransform="none",p.style.transform="none",C&&C(p,m)}),W=S(y),G=S(D),mt=S(p=>{const m=Z({timeout:B,style:$,easing:g},{mode:"exit"});p.style.webkitTransition=r.transitions.create("-webkit-transform",m),p.style.transition=r.transitions.create("transform",m),V(x,p,d),j&&j(p)}),vt=S(p=>{p.style.webkitTransition="",p.style.transition="",I&&I(p)}),kt=p=>{n&&n(v.current,p)},J=f.useCallback(()=>{v.current&&V(x,v.current,d)},[x,d]);return f.useEffect(()=>{if(h||x==="down"||x==="right")return;const p=Lt(()=>{v.current&&V(x,v.current,d)}),m=lt(v.current);return m.addEventListener("resize",p),()=>{p.clear(),m.removeEventListener("resize",p)}},[x,h,d]),f.useEffect(()=>{h||J()},[h,J]),a.jsx(H,c({nodeRef:v,onEnter:M,onEntered:W,onEntering:L,onExit:mt,onExited:vt,onExiting:G,addEndListener:kt,appear:i,in:h,timeout:B},A,{children:(p,m)=>f.cloneElement(u,c({ref:X,style:c({visibility:p==="exited"&&!h?"hidden":void 0},$,u.props.style)},m))}))});function Te(t){return _("MuiDrawer",t)}q("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const Pe=["BackdropProps"],Ee=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],xt=(t,e)=>{const{ownerState:o}=t;return[e.root,(o.variant==="permanent"||o.variant==="persistent")&&e.docked,e.modal]},Se=t=>{const{classes:e,anchor:o,variant:r}=t,s={root:["root"],docked:[(r==="permanent"||r==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${k(o)}`,r!=="temporary"&&`paperAnchorDocked${k(o)}`]};return N(s,Te,e)},Me=b(Et,{name:"MuiDrawer",slot:"Root",overridesResolver:xt})(({theme:t})=>({zIndex:(t.vars||t).zIndex.drawer})),et=b("div",{shouldForwardProp:nt,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:xt})({flex:"0 0 auto"}),De=b(it,{name:"MuiDrawer",slot:"Paper",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.paper,e[`paperAnchor${k(o.anchor)}`],o.variant!=="temporary"&&e[`paperAnchorDocked${k(o.anchor)}`]]}})(({theme:t,ownerState:e})=>c({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(t.vars||t).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},e.anchor==="left"&&{left:0},e.anchor==="top"&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},e.anchor==="right"&&{right:0},e.anchor==="bottom"&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},e.anchor==="left"&&e.variant!=="temporary"&&{borderRight:`1px solid ${(t.vars||t).palette.divider}`},e.anchor==="top"&&e.variant!=="temporary"&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`},e.anchor==="right"&&e.variant!=="temporary"&&{borderLeft:`1px solid ${(t.vars||t).palette.divider}`},e.anchor==="bottom"&&e.variant!=="temporary"&&{borderTop:`1px solid ${(t.vars||t).palette.divider}`})),ft={left:"right",right:"left",top:"down",bottom:"up"};function Ae(t){return["left","right"].indexOf(t)!==-1}function Ne({direction:t},e){return t==="rtl"&&Ae(e)?ft[e]:e}const ot=f.forwardRef(function(e,o){const r=w({props:e,name:"MuiDrawer"}),s=Q(),l=St(),n={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{anchor:i="left",BackdropProps:u,children:d,className:x,elevation:g=16,hideBackdrop:h=!1,ModalProps:{BackdropProps:P}={},onClose:y,open:C=!1,PaperProps:j={},SlideProps:I,TransitionComponent:D=Le,transitionDuration:$=n,variant:B="temporary"}=r,H=E(r.ModalProps,Pe),A=E(r,Ee),v=f.useRef(!1);f.useEffect(()=>{v.current=!0},[]);const X=Ne({direction:l?"rtl":"ltr"},i),M=c({},r,{anchor:i,elevation:g,open:C,variant:B},A),L=Se(M),W=a.jsx(De,c({elevation:B==="temporary"?g:0,square:!0},j,{className:T(L.paper,j.className),ownerState:M,children:d}));if(B==="permanent")return a.jsx(et,c({className:T(L.root,L.docked,x),ownerState:M,ref:o},A,{children:W}));const G=a.jsx(D,c({in:C,direction:ft[X],timeout:$,appear:v.current},I,{children:W}));return B==="persistent"?a.jsx(et,c({className:T(L.root,L.docked,x),ownerState:M,ref:o},A,{children:G})):a.jsx(Me,c({BackdropProps:c({},u,P,{transitionDuration:$}),className:T(L.root,L.modal,x),open:C,ownerState:M,onClose:y,hideBackdrop:h,ref:o},A,H,{children:G}))}),we="/assets/user-1-CznVQ9Sv.jpg",ze=()=>{const[t,e]=f.useState(null),o=Mt(),r=n=>{e(n.currentTarget)},s=()=>{e(null)},l=()=>{o(Nt())};return a.jsxs(R,{children:[a.jsx(ct,{size:"large","aria-label":"show 11 new notifications",color:"inherit","aria-controls":"msgs-menu","aria-haspopup":"true",sx:{...typeof t=="object"&&{color:"primary.main"}},onClick:r,children:a.jsx(Yt,{src:we,alt:"avatar",sx:{width:35,height:35}})}),a.jsx(Dt,{id:"msgs-menu",anchorEl:t,keepMounted:!0,open:!!t,onClose:s,anchorOrigin:{horizontal:"right",vertical:"bottom"},transformOrigin:{horizontal:"right",vertical:"top"},sx:{"& .MuiMenu-paper":{width:"200px"}},children:a.jsx(R,{mt:1,py:1,px:2,children:a.jsx(At,{onClick:l,variant:"outlined",color:"primary",component:dt,fullWidth:!0,children:"Đăng xuất"})})})]})},gt=t=>{const e=b(ve)(({theme:r})=>({boxShadow:"none",background:r.palette.background.paper,justifyContent:"center",backdropFilter:"blur(4px)",[r.breakpoints.up("lg")]:{minHeight:"70px"}})),o=b(wt)(({theme:r})=>({width:"100%",color:r.palette.text.secondary}));return a.jsx(e,{position:"sticky",color:"default",children:a.jsxs(o,{children:[a.jsx(ct,{color:"inherit","aria-label":"menu",onClick:t.toggleMobileSidebar,sx:{display:{lg:"none",xs:"inline"}},children:a.jsx(qt,{width:"20",height:"20"})}),a.jsx(R,{flexGrow:1}),a.jsx(zt,{spacing:1,direction:"row",alignItems:"center",children:a.jsx(ze,{})})]})})};gt.propTypes={sx:O.object};const Oe=b(dt)(()=>({height:"180px",width:"180px",overflow:"hidden",display:"block"})),rt=()=>a.jsx(Oe,{className:"select-none mb-15",to:"/admin-management/dashboard",children:a.jsx("img",{className:"select-none",src:Ot,alt:"logo"})}),We=[{navlabel:!0,subheader:"Trang chủ"},{id:tt.uniqueId(),title:"Thống kê",icon:Qt,href:"/admin-management/dashboard"},{navlabel:!0,subheader:"Quản lý"},{id:tt.uniqueId(),title:"Tài khoản",icon:Jt,href:"/admin-management/account"}],bt=({item:t,level:e,pathDirect:o,onClick:r})=>{const s=t.icon,l=Q(),n=a.jsx(s,{stroke:1.5,size:"1.3rem"}),i=b(fe)(()=>({whiteSpace:"nowrap",marginBottom:"2px",padding:"8px 10px",borderRadius:"8px",fontSize:"14px",backgroundColor:e>1?"transparent !important":"inherit",color:l.palette.text.secondary,paddingLeft:"10px","&:hover":{backgroundColor:l.palette.primary.light,color:l.palette.primary.main},"&.Mui-selected":{color:"white",backgroundColor:l.palette.primary.main,"&:hover":{backgroundColor:l.palette.primary.main,color:"white"}}}));return a.jsx(pt,{component:"li",disablePadding:!0,children:a.jsxs(i,{button:!0,component:t.external?"a":Wt,to:t.href,href:t.external?t.href:"",disabled:t.disabled,selected:o===t.href,target:t.external?"_blank":"",onClick:r,children:[a.jsx(ce,{sx:{minWidth:"36px",p:"3px 0",color:"inherit"},children:n}),a.jsx(Gt,{sx:{"& .MuiListItemText-primary":{fontSize:"12px"}},children:a.jsx(a.Fragment,{children:t.title})})]})},t.id)};bt.propTypes={item:O.object,level:O.number,pathDirect:O.any};const ht=({item:t})=>{const e=b(o=>a.jsx(ut,{disableSticky:!0,...o}))(({theme:o})=>({...o.typography.overline,fontWeight:"700",fontSize:"16px",marginTop:o.spacing(3),marginBottom:o.spacing(0),color:o.palette.text.primary,lineHeight:"26px",padding:"3px 12px"}));return a.jsx(e,{children:t.subheader})};ht.propTypes={item:O.object};const at=()=>{const{pathname:t}=Ft(),e=t;return a.jsx(R,{sx:{px:4},children:a.jsx(pt,{className:"sidebarNav",children:We.map(o=>o.subheader?a.jsx(ht,{item:o},o.subheader):a.jsx(bt,{item:o,pathDirect:e},o.id))})})},Ge=t=>{const e=Zt(r=>r.breakpoints.up("lg")),o="270px";return e?a.jsx(R,{sx:{width:o,flexShrink:0},children:a.jsx(ot,{anchor:"left",open:t.isSidebarOpen,variant:"permanent",PaperProps:{sx:{width:o,boxSizing:"border-box"}},children:a.jsxs(R,{sx:{height:"100%"},children:[a.jsx(R,{px:3,children:a.jsx(rt,{})}),a.jsx(R,{children:a.jsx(at,{})})]})})}):a.jsxs(ot,{anchor:"left",open:t.isMobileSidebarOpen,onClose:t.onSidebarClose,variant:"temporary",PaperProps:{sx:{width:o,boxShadow:r=>r.shadows[8]}},children:[a.jsx(R,{px:2,children:a.jsx(rt,{})}),a.jsx(at,{})]})},Fe=b("div")(()=>({display:"flex",minHeight:"100vh",width:"100%"})),Ue=b("div")(()=>({display:"flex",flexGrow:1,paddingBottom:"60px",flexDirection:"column",zIndex:1,backgroundColor:"transparent"})),Ye=()=>{const[t,e]=f.useState(!0),[o,r]=f.useState(!1),{userInfo:s}=Ut(i=>i.auth),l=Vt();f.useEffect(()=>{s||l("/login")},[s]);const n=Xt;return a.jsx(_t,{theme:n,children:a.jsxs(Fe,{className:"mainwrapper",children:[a.jsx(Ge,{isSidebarOpen:t,isMobileSidebarOpen:o,onSidebarClose:()=>r(!1)}),a.jsxs(Ue,{className:"page-wrapper",children:[a.jsx(gt,{toggleSidebar:()=>e(!t),toggleMobileSidebar:()=>r(!0)}),a.jsx(Ie,{maxWidth:"xl",sx:{paddingTop:"20px"},children:a.jsx(R,{sx:{minHeight:"calc(100vh - 170px)"},children:a.jsx(Ht,{})})})]})]})})};export{Ye as default};
