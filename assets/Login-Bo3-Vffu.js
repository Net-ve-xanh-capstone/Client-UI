import{r as g,o as j,p as D,q as F,a as L,j as e,L as o,I,s as T,T as f,c as V,g as q,t as B,v as E}from"./index-CuYnwlfn.js";import{H}from"./HeaderVersion1-Cr0Mvc56.js";import{c as M,a as N,o as z}from"./object-Bb3Ft9cv.js";import{D as G,a as O}from"./DialogContent-Gp9UeC-b.js";import{F as P}from"./FadeLoader-CLABYStc.js";const U=()=>{var u,p;const[a,t]=g.useState(!1),{userInfo:v}=j(s=>s.auth),b=M().shape({username:N().required("Vui lòng nhập username của bạn"),password:N().required("Vui lòng nhập mật khẩu của bạn")}),{handleSubmit:w,control:n,trigger:k,reset:i,formState:{errors:l}}=D({resolver:z(b),reValidateMode:"onSubmit"}),{login:{loading:c,success:d,error:r},jwtToken:m}=j(s=>s.auth),y=F(),h=L(),S=async s=>{if(await k())y(E(s)).then(C=>{console.log(C),r&&t(!0)});else return},x=()=>{t(!1)};return g.useEffect(()=>{(d||m)&&(v.role==="Staff"?(i(),h("/staff-management/contest")):(i(),h("/"))),r&&t(!0)},[d,r,m]),e.jsxs("div",{children:[e.jsx(H,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"ĐĂNG NHẬP"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(o,{to:"/",children:"Trang chủ"})}),e.jsx("li",{children:"Đăng nhập"})]})})]})})})]}),e.jsxs(Q,{onClose:x,"aria-labelledby":"customized-dialog-title",open:a,children:[e.jsx(I,{"aria-label":"close",onClick:x,sx:{position:"absolute",right:8,top:6,color:s=>s.palette.grey[500]},children:e.jsx(T,{})}),e.jsx(G,{children:e.jsx("div",{className:"space-y-20 pd-40",children:e.jsx("h4",{className:"text-center font-weight-bold",children:"Sai tài khoản hoặc mật khẩu, xin nhập lại"})})})]}),e.jsx("section",{className:"tf-login tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"flat-form box-login-email",children:e.jsx("div",{className:"form-inner",children:e.jsxs("form",{onSubmit:w(S),className:"select-none",children:[e.jsx(f,{control:n,error:(u=l.username)==null?void 0:u.message,id:"username",name:"username",tabIndex:"1",placeholder:"Tên tài khoản",autoFocus:!0}),e.jsx(f,{control:n,error:(p=l.password)==null?void 0:p.message,id:"password",name:"password",tabIndex:"2","aria-required":"true",type:"password",placeholder:"Mật khẩu"}),e.jsx("div",{className:"row-form style-1 flex-row-reverse",children:e.jsx(o,{to:"#",className:"forgot-pass",children:"Quên mật khẩu ?"})}),e.jsx("button",{className:"submit",children:c?e.jsx(P,{color:V.purple,loading:c,size:2}):"Đăng nhập"}),e.jsxs("div",{className:"mt-5 text-right h5",children:["Bạn chưa có tài khoản? ","",e.jsx(o,{to:"/sign-up",className:"font-weight-bold",children:"đăng ký"})]})]})})})})})})}),e.jsx(q,{})]})},Q=B(O)(({theme:a})=>({"& .MuiDialogContent-root":{padding:a.spacing(5)}}));export{U as default};
