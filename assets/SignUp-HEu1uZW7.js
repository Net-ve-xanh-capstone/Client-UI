import{x as G,y as W,z as I,A as V,q as P,a as J,r as q,o as Q,p as X,B as Z,j as t,L as A,G as d,T as O,I as ee,s as te,c as se,g as ie,t as H,C as re,E as ae}from"./index-8mRTlcDg.js";import{H as ne}from"./HeaderVersion1-Cy2FRNMX.js";import{c as oe,a as w,b as le,o as ce}from"./object-DBvYDCG8.js";import{r as B,a as ue,b as he,D as de,R as me}from"./Regex-D_Z3wNlS.js";import"./index-kASSenzk.js";import{D as fe,a as ge}from"./DialogContent-Dz3rfXfB.js";import{F as pe}from"./FadeLoader-BCxTRvWX.js";var K={exports:{}};(function(f,M){(function(y,j){f.exports=j()})(G,function(){var y="minute",j=/[+-]\d\d(?::?\d\d)?/g,T=/([+-]|\d\d)/g;return function(k,c,g){var a=c.prototype;g.utc=function(e){var r={date:e,utc:!0,args:arguments};return new c(r)},a.utc=function(e){var r=g(this.toDate(),{locale:this.$L,utc:!0});return e?r.add(this.utcOffset(),y):r},a.local=function(){return g(this.toDate(),{locale:this.$L,utc:!1})};var D=a.parse;a.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),D.call(this,e)};var N=a.init;a.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else N.call(this)};var z=a.utcOffset;a.utcOffset=function(e,r){var u=this.$utils().u;if(u(e))return this.$u?0:u(this.$offset)?z.call(this):this.$offset;if(typeof e=="string"&&(e=function(h){h===void 0&&(h="");var b=h.match(j);if(!b)return null;var m=(""+b[0]).match(T)||["-",0,0],$=m[0],x=60*+m[1]+ +m[2];return x===0?0:$==="+"?x:-x}(e),e===null))return this;var o=Math.abs(e)<=16?60*e:e,s=this;if(r)return s.$offset=o,s.$u=e===0,s;if(e!==0){var p=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(s=this.local().add(o+p,y)).$offset=o,s.$x.$localOffset=p}else s=this.utc();return s};var n=a.format;a.format=function(e){var r=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return n.call(this,r)},a.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var l=a.toDate;a.toDate=function(e){return e==="s"&&this.$offset?g(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var i=a.diff;a.diff=function(e,r,u){if(e&&this.$u===e.$u)return i.call(this,e,r,u);var o=this.local(),s=g(e).local();return i.call(o,s,r,u)}}})})(K);var xe=K.exports;const ve=W(xe);var _={exports:{}};(function(f,M){(function(y,j){f.exports=j()})(G,function(){var y={year:0,month:1,day:2,hour:3,minute:4,second:5},j={};return function(T,k,c){var g,a=function(n,l,i){i===void 0&&(i={});var e=new Date(n),r=function(u,o){o===void 0&&(o={});var s=o.timeZoneName||"short",p=u+"|"+s,h=j[p];return h||(h=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:u,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:s}),j[p]=h),h}(l,i);return r.formatToParts(e)},D=function(n,l){for(var i=a(n,l),e=[],r=0;r<i.length;r+=1){var u=i[r],o=u.type,s=u.value,p=y[o];p>=0&&(e[p]=parseInt(s,10))}var h=e[3],b=h===24?0:h,m=e[0]+"-"+e[1]+"-"+e[2]+" "+b+":"+e[4]+":"+e[5]+":000",$=+n;return(c.utc(m).valueOf()-($-=$%1e3))/6e4},N=k.prototype;N.tz=function(n,l){n===void 0&&(n=g);var i=this.utcOffset(),e=this.toDate(),r=e.toLocaleString("en-US",{timeZone:n}),u=Math.round((e-new Date(r))/1e3/60),o=c(r,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(e.getTimezoneOffset()/15)-u,!0);if(l){var s=o.utcOffset();o=o.add(i-s,"minute")}return o.$x.$timezone=n,o},N.offsetName=function(n){var l=this.$x.$timezone||c.tz.guess(),i=a(this.valueOf(),l,{timeZoneName:n}).find(function(e){return e.type.toLowerCase()==="timezonename"});return i&&i.value};var z=N.startOf;N.startOf=function(n,l){if(!this.$x||!this.$x.$timezone)return z.call(this,n,l);var i=c(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return z.call(i,n,l).tz(this.$x.$timezone,!0)},c.tz=function(n,l,i){var e=i&&l,r=i||l||g,u=D(+c(),r);if(typeof n!="string")return c(n).tz(r);var o=function(b,m,$){var x=b-60*m*1e3,S=D(x,$);if(m===S)return[x,m];var C=D(x-=60*(S-m)*1e3,$);return S===C?[x,S]:[b-60*Math.min(S,C)*1e3,Math.max(S,C)]}(c.utc(n,e).valueOf(),u,r),s=o[0],p=o[1],h=c(s).utcOffset(p);return h.$x.$timezone=r,h},c.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},c.tz.setDefault=function(n){g=n}}})})(_);var je=_.exports;const $e=W(je),R="address",ye={getDistrict:async()=>await I.get(R),getWard:async f=>await I.get(`${R}/${f}`)},Oe=()=>{var m,$,x,S,C,U,Y,F;V.extend(ve),V.extend($e),V.tz.setDefault("Asia/Ho_Chi_Minh");const f=V(new Date),M=P(),y=J(),[j,T]=q.useState(!1),[k,c]=q.useState({districts:[],wards:[],selectedDistrict:""}),g=()=>{T(!1)},{register:{success:a,message:D,loading:N},jwtToken:z}=Q(v=>v.auth),n=oe().shape({lastname:w().required("Vui lòng nhập Họ của bạn").matches(B,"Họ không hợp lệ"),firstname:w().required("Vui lòng nhập Tên của bạn").matches(B,"Tên không hợp lệ"),email:w().matches(ue,"Email không hợp lệ").required("Vui lòng nhập email của bạn"),phone:w().matches(he,"Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại của bạn"),userName:w().required("Vui lòng nhập tên tài khoản của bạn"),password:w().required("Vui lòng nhập mật khẩu của bạn"),gender:le().required("Vui lòng chọn giới tính").typeError("Vui lòng chọn giới tính"),birthday:w().required("Vui lòng chọn ngày sinh").typeError("Vui lòng chọn ngày sinh")}),{handleSubmit:l,control:i,trigger:e,setValue:r,setError:u,watch:o,formState:{errors:s}}=X({resolver:ce(n),reValidateMode:"onSubmit"});r("gender",0),q.useEffect(()=>(z&&y("/"),a!==null&&(T(!0),setTimeout(()=>{T(!1),M(Z())},3e3)),a&&setTimeout(()=>{T(!1),M(Z()),y("/login")},3e3),()=>{clearTimeout()}),[a]),q.useEffect(()=>{async function v(){var L;const E=await ye.getDistrict();c({...k,districts:(L=E==null?void 0:E.data)==null?void 0:L.result})}v()},[]);const p=async v=>{if(await e())await M(ae(v)).then(()=>{D&&T(!0)});else return},h=v=>{(v.key==="-"||v.key==="+")&&v.preventDefault()},b=[{value:"0",label:"Nam"},{value:"1",label:"Nữ"}];return t.jsxs("div",{children:[t.jsx(ne,{}),t.jsxs("section",{className:"flat-title-page inner",children:[t.jsx("div",{className:"overlay"}),t.jsx("div",{className:"themesflat-container",children:t.jsx("div",{className:"row",children:t.jsxs("div",{className:"col-md-12",children:[t.jsx("div",{className:"page-title-heading mg-bt-12",children:t.jsx("h1",{className:"heading text-center",children:"ĐĂNG KÝ"})}),t.jsx("div",{className:"breadcrumbs style2",children:t.jsxs("ul",{children:[t.jsx("li",{children:t.jsx(A,{to:"/Client-UI",children:"Trang chủ"})}),t.jsx("li",{children:"Đăng ký"})]})})]})})})]}),t.jsx("section",{className:"tf-login tf-section",children:t.jsx("div",{className:"themesflat-container",children:t.jsx("div",{className:"row",children:t.jsx("div",{className:"col-12",children:t.jsx("div",{className:"flat-form box-login-email",children:t.jsx("div",{className:"form-inner",children:t.jsxs("form",{action:"#",id:"contactform",className:"select-none",onSubmit:l(p),children:[t.jsxs(d,{container:!0,spacing:4,children:[t.jsx(d,{item:!0,md:6,children:t.jsx(O,{control:i,error:(m=s.lastname)==null?void 0:m.message,id:"lastname",name:"lastname","aria-required":"true",type:"text",placeholder:"Họ"})}),t.jsx(d,{item:!0,md:6,children:t.jsx(O,{control:i,error:($=s.firstname)==null?void 0:$.message,id:"firstname",name:"firstname","aria-required":"true",type:"text",placeholder:"Tên"})})]}),t.jsxs(d,{sx:{marginTop:"-10px",marginBottom:"24px"},container:!0,spacing:2,children:[t.jsxs(d,{item:!0,md:6,children:[t.jsx("p",{className:"font-weight-bold h5",children:"Ngày sinh"}),t.jsx(de,{defaultValue:f,control:i,error:(x=s.birthday)==null?void 0:x.message,name:"birthday"})]}),t.jsxs(d,{item:!0,md:6,children:[t.jsx("p",{className:"font-weight-bold h5",children:"Giới tính"}),t.jsx(me,{control:i,error:(S=s==null?void 0:s.gender)==null?void 0:S.message,name:"gender",valueArray:b})]})]}),t.jsxs(d,{container:!0,spacing:2,children:[t.jsx(d,{item:!0,md:6,children:t.jsx(O,{control:i,error:(C=s.email)==null?void 0:C.message,id:"email",name:"email","aria-required":"true",type:"email",placeholder:"Email"})}),t.jsx(d,{item:!0,md:6,children:t.jsx(O,{control:i,error:(U=s.phone)==null?void 0:U.message,id:"phone",name:"phone","aria-required":"true",type:"number",placeholder:"Số điện thoại",className:"number",onKeyDown:h})}),t.jsx(d,{item:!0,md:3})]}),t.jsx(d,{sx:{marginBottom:"12px"},container:!0,children:t.jsx(d,{item:!0,md:12,children:t.jsx(O,{control:i,error:(Y=s.userName)==null?void 0:Y.message,id:"userName",name:"userName","aria-required":"true",type:"text",placeholder:"Tên tài khoản"})})}),t.jsx(d,{container:!0,children:t.jsx(d,{item:!0,md:12,children:t.jsx(O,{control:i,id:"password",error:(F=s.password)==null?void 0:F.message,name:"password","aria-required":"true",type:"password",placeholder:"Mật khẩu"})})}),t.jsxs(De,{onClose:g,"aria-labelledby":"customized-dialog-title",open:j,children:[t.jsx(ee,{"aria-label":"close",onClick:g,sx:{position:"absolute",right:8,top:6,color:v=>v.palette.grey[500]},children:t.jsx(te,{})}),t.jsx(fe,{children:t.jsx("div",{className:"space-y-20 pd-40",children:t.jsx("h4",{className:"text-center font-weight-bold",children:D||""})})})]}),t.jsx("button",{className:"submit",children:N?t.jsx(pe,{color:se.purple,loading:N,size:2}):"Đăng ký"}),t.jsxs("div",{className:"mt-5 text-right h5",children:["Bạn đã có tài khoản? ","",t.jsx(A,{to:"/login",className:"font-weight-bold",children:"đăng nhập"})]})]})})})})})})}),t.jsx(ie,{})]})};H(re)({"& .MuiSvgIcon-root":{fontSize:24},"& .MuiTypography-root":{fontSize:16,fontFamily:"REM"}});const De=H(ge)(({theme:f})=>({"& .MuiDialogContent-root":{padding:f.spacing(5)}}));H("div")(({theme:f})=>({color:f.palette.text.primary,fontSize:14,fontWeight:f.typography.fontWeightMedium}));export{Oe as default};