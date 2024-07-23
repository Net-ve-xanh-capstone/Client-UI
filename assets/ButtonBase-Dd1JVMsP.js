import{r as a,_ as A,e as ee,R as W,j as N}from"./index-t7M1JxVt.js";import{_ as Ie,y as ue,k as E,a as me,m as te,s as ne,j as be,z as Ue,g as _e,h as ce,t as ze,e as H,c as Oe}from"./Transition-Dx0NO2sn.js";function dt(...e){return e.reduce((o,r)=>r==null?o:function(...t){o.apply(this,t),r.apply(this,t)},()=>{})}function Ke(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function oe(e,o){var r=function(n){return o&&a.isValidElement(n)?o(n):n},l=Object.create(null);return e&&a.Children.map(e,function(t){return t}).forEach(function(t){l[t.key]=r(t)}),l}function Ae(e,o){e=e||{},o=o||{};function r(f){return f in o?o[f]:e[f]}var l=Object.create(null),t=[];for(var n in e)n in o?t.length&&(l[n]=t,t=[]):t.push(n);var i,c={};for(var u in o){if(l[u])for(i=0;i<l[u].length;i++){var p=l[u][i];c[l[u][i]]=r(p)}c[u]=r(u)}for(i=0;i<t.length;i++)c[t[i]]=r(t[i]);return c}function F(e,o,r){return r[o]!=null?r[o]:e.props[o]}function Xe(e,o){return oe(e.children,function(r){return a.cloneElement(r,{onExited:o.bind(null,r),in:!0,appear:F(r,"appear",e),enter:F(r,"enter",e),exit:F(r,"exit",e)})})}function Ye(e,o,r){var l=oe(e.children),t=Ae(o,l);return Object.keys(t).forEach(function(n){var i=t[n];if(a.isValidElement(i)){var c=n in o,u=n in l,p=o[n],f=a.isValidElement(p)&&!p.props.in;u&&(!c||f)?t[n]=a.cloneElement(i,{onExited:r.bind(null,i),in:!0,exit:F(i,"exit",e),enter:F(i,"enter",e)}):!u&&c&&!f?t[n]=a.cloneElement(i,{in:!1}):u&&c&&a.isValidElement(p)&&(t[n]=a.cloneElement(i,{onExited:r.bind(null,i),in:p.props.in,exit:F(i,"exit",e),enter:F(i,"enter",e)}))}}),t}var We=Object.values||function(e){return Object.keys(e).map(function(o){return e[o]})},He={component:"div",childFactory:function(o){return o}},ie=function(e){Ie(o,e);function o(l,t){var n;n=e.call(this,l,t)||this;var i=n.handleExited.bind(Ke(n));return n.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},n}var r=o.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},o.getDerivedStateFromProps=function(t,n){var i=n.children,c=n.handleExited,u=n.firstRender;return{children:u?Xe(t,c):Ye(t,i,c),firstRender:!1}},r.handleExited=function(t,n){var i=oe(this.props.children);t.key in i||(t.props.onExited&&t.props.onExited(n),this.mounted&&this.setState(function(c){var u=A({},c.children);return delete u[t.key],{children:u}}))},r.render=function(){var t=this.props,n=t.component,i=t.childFactory,c=ee(t,["component","childFactory"]),u=this.state.contextValue,p=We(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,n===null?W.createElement(ue.Provider,{value:u},p):W.createElement(ue.Provider,{value:u},W.createElement(n,c,p))},o}(W.Component);ie.propTypes={};ie.defaultProps=He;function Ge(e){const{className:o,classes:r,pulsate:l=!1,rippleX:t,rippleY:n,rippleSize:i,in:c,onExited:u,timeout:p}=e,[f,g]=a.useState(!1),b=E(o,r.ripple,r.rippleVisible,l&&r.ripplePulsate),T={width:i,height:i,top:-(i/2)+n,left:-(i/2)+t},h=E(r.child,f&&r.childLeaving,l&&r.childPulsate);return!c&&!f&&g(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),N.jsx("span",{className:b,style:T,children:N.jsx("span",{className:h})})}const m=me("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),qe=["center","classes","className"];let G=e=>e,pe,de,fe,he;const Z=550,Je=80,Qe=te(pe||(pe=G`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),Ze=te(de||(de=G`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),et=te(fe||(fe=G`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),tt=ne("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),nt=ne(Ge,{name:"MuiTouchRipple",slot:"Ripple"})(he||(he=G`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,Qe,Z,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,Ze,Z,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,et,({theme:e})=>e.transitions.easing.easeInOut),ot=a.forwardRef(function(o,r){const l=be({props:o,name:"MuiTouchRipple"}),{center:t=!1,classes:n={},className:i}=l,c=ee(l,qe),[u,p]=a.useState([]),f=a.useRef(0),g=a.useRef(null);a.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=a.useRef(!1),T=Ue(),h=a.useRef(null),R=a.useRef(null),U=a.useCallback(d=>{const{pulsate:M,rippleX:y,rippleY:L,rippleSize:I,cb:z}=d;p(x=>[...x,N.jsx(nt,{classes:{ripple:E(n.ripple,m.ripple),rippleVisible:E(n.rippleVisible,m.rippleVisible),ripplePulsate:E(n.ripplePulsate,m.ripplePulsate),child:E(n.child,m.child),childLeaving:E(n.childLeaving,m.childLeaving),childPulsate:E(n.childPulsate,m.childPulsate)},timeout:Z,pulsate:M,rippleX:y,rippleY:L,rippleSize:I},f.current)]),f.current+=1,g.current=z},[n]),j=a.useCallback((d={},M={},y=()=>{})=>{const{pulsate:L=!1,center:I=t||M.pulsate,fakeElement:z=!1}=M;if((d==null?void 0:d.type)==="mousedown"&&b.current){b.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(b.current=!0);const x=z?null:R.current,B=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,D,w;if(I||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)v=Math.round(B.width/2),D=Math.round(B.height/2);else{const{clientX:S,clientY:V}=d.touches&&d.touches.length>0?d.touches[0]:d;v=Math.round(S-B.left),D=Math.round(V-B.top)}if(I)w=Math.sqrt((2*B.width**2+B.height**2)/3),w%2===0&&(w+=1);else{const S=Math.max(Math.abs((x?x.clientWidth:0)-v),v)*2+2,V=Math.max(Math.abs((x?x.clientHeight:0)-D),D)*2+2;w=Math.sqrt(S**2+V**2)}d!=null&&d.touches?h.current===null&&(h.current=()=>{U({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:y})},T.start(Je,()=>{h.current&&(h.current(),h.current=null)})):U({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:y})},[t,U,T]),_=a.useCallback(()=>{j({},{pulsate:!0})},[j]),$=a.useCallback((d,M)=>{if(T.clear(),(d==null?void 0:d.type)==="touchend"&&h.current){h.current(),h.current=null,T.start(0,()=>{$(d,M)});return}h.current=null,p(y=>y.length>0?y.slice(1):y),g.current=M},[T]);return a.useImperativeHandle(r,()=>({pulsate:_,start:j,stop:$}),[_,j,$]),N.jsx(tt,A({className:E(m.root,n.root,i),ref:R},c,{children:N.jsx(ie,{component:null,exit:!0,children:u})}))});function it(e){return _e("MuiButtonBase",e)}const st=me("MuiButtonBase",["root","disabled","focusVisible"]),rt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],at=e=>{const{disabled:o,focusVisible:r,focusVisibleClassName:l,classes:t}=e,i=Oe({root:["root",o&&"disabled",r&&"focusVisible"]},it,t);return r&&l&&(i.root+=` ${l}`),i},lt=ne("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,o)=>o.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${st.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),ft=a.forwardRef(function(o,r){const l=be({props:o,name:"MuiButtonBase"}),{action:t,centerRipple:n=!1,children:i,className:c,component:u="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:T="a",onBlur:h,onClick:R,onContextMenu:U,onDragLeave:j,onFocus:_,onFocusVisible:$,onKeyDown:d,onKeyUp:M,onMouseDown:y,onMouseLeave:L,onMouseUp:I,onTouchEnd:z,onTouchMove:x,onTouchStart:B,tabIndex:v=0,TouchRippleProps:D,touchRippleRef:w,type:S}=l,V=ee(l,rt),O=a.useRef(null),C=a.useRef(null),ge=ce(C,w),{isFocusVisibleRef:se,onFocus:Re,onBlur:Me,ref:ye}=ze(),[k,X]=a.useState(!1);p&&k&&X(!1),a.useImperativeHandle(t,()=>({focusVisible:()=>{X(!0),O.current.focus()}}),[]);const[q,xe]=a.useState(!1);a.useEffect(()=>{xe(!0)},[]);const Ce=q&&!f&&!p;a.useEffect(()=>{k&&b&&!f&&q&&C.current.pulsate()},[f,b,k,q]);function P(s,ae,$e=g){return H(le=>(ae&&ae(le),!$e&&C.current&&C.current[s](le),!0))}const Ee=P("start",y),Te=P("stop",U),ve=P("stop",j),Ve=P("stop",I),Pe=P("stop",s=>{k&&s.preventDefault(),L&&L(s)}),Be=P("start",B),De=P("stop",z),we=P("stop",x),Le=P("stop",s=>{Me(s),se.current===!1&&X(!1),h&&h(s)},!1),Se=H(s=>{O.current||(O.current=s.currentTarget),Re(s),se.current===!0&&(X(!0),$&&$(s)),_&&_(s)}),J=()=>{const s=O.current;return u&&u!=="button"&&!(s.tagName==="A"&&s.href)},Q=a.useRef(!1),ke=H(s=>{b&&!Q.current&&k&&C.current&&s.key===" "&&(Q.current=!0,C.current.stop(s,()=>{C.current.start(s)})),s.target===s.currentTarget&&J()&&s.key===" "&&s.preventDefault(),d&&d(s),s.target===s.currentTarget&&J()&&s.key==="Enter"&&!p&&(s.preventDefault(),R&&R(s))}),Fe=H(s=>{b&&s.key===" "&&C.current&&k&&!s.defaultPrevented&&(Q.current=!1,C.current.stop(s,()=>{C.current.pulsate(s)})),M&&M(s),R&&s.target===s.currentTarget&&J()&&s.key===" "&&!s.defaultPrevented&&R(s)});let Y=u;Y==="button"&&(V.href||V.to)&&(Y=T);const K={};Y==="button"?(K.type=S===void 0?"button":S,K.disabled=p):(!V.href&&!V.to&&(K.role="button"),p&&(K["aria-disabled"]=p));const Ne=ce(r,ye,O),re=A({},l,{centerRipple:n,component:u,disabled:p,disableRipple:f,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:k}),je=at(re);return N.jsxs(lt,A({as:Y,className:E(je.root,c),ownerState:re,onBlur:Le,onClick:R,onContextMenu:Te,onFocus:Se,onKeyDown:ke,onKeyUp:Fe,onMouseDown:Ee,onMouseLeave:Pe,onMouseUp:Ve,onDragLeave:ve,onTouchEnd:De,onTouchMove:we,onTouchStart:Be,ref:Ne,tabIndex:p?-1:v,type:S},K,V,{children:[i,Ce?N.jsx(ot,A({ref:ge,center:n},D)):null]}))});export{ft as B,ie as T,dt as c};
