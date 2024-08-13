import{u as B,r as n,S as O,p as A,a as $,c as G,j as e,D as K,L as C,T as u,C as S,h as M,a2 as z}from"./index-C-1mI_3F.js";import{H as J}from"./HeaderVersion1-DZ8cEOiL.js";import{T as Q}from"./TextareaCommon-Cfp-z8o-.js";import{r as W,a as X,b as Y,D as Z,R as _}from"./Regex-BJVXeJvG.js";import{c as ee,a as d,b as ae,o as se}from"./object-B43CWKON.js";import{S as o}from"./sweetalert2.all-BFHCFkLp.js";import"./listItemButtonClasses-Bij5AdwH.js";const he=()=>{var p,j,g,N,b,v;const{userInfo:l}=B(s=>s.auth),[h,V]=n.useState(null),[x,m]=n.useState(null),[U,E]=n.useState(null),{url:T}=O(U),w=ee().shape({fullname:d().required("Vui lòng nhập tên của bạn").matches(W,"Tên không hợp lệ"),email:d().required("Vui lòng nhập email của bạn").matches(X,"Email không hợp lệ"),phone:d().required("Vui lòng nhập số điện thoại của bạn").matches(Y,"Số điện thoại không hợp lệ"),gender:ae().required("Vui lòng chọn giới tính").typeError("Vui lòng chọn giới tính"),birthday:d().required("Vui lòng chọn ngày sinh").typeError("Vui lòng chọn ngày sinh")}),{handleSubmit:I,control:t,formState:{errors:r}}=A({resolver:se(w),reValidateMode:"onSubmit"}),L=s=>{(s.key==="-"||s.key==="+")&&s.preventDefault()},k=[{value:"0",label:"Nam"},{value:"1",label:"Nữ"}],q=async s=>{const i=S(s.birthday).toISOString();console.log(s);const F={id:l.Id,phone:s.phone,gender:s.gender,fullname:s.fullname,birthday:i,address:s.address,avatar:T||x};o.fire({title:"Bạn có chắc chắn cập nhật?",showCancelButton:!0,confirmButtonText:"Có"}).then(y=>{y.isConfirmed?z.update("accounts",F).then(()=>{o.fire("Cập nhật thành công","","success")}).catch(re=>{o.fire("Cập nhật thất bại thất bại","Hãy thử lại sau bạn nhé","error")}):y.isDenied&&o.fire("Bạn đã hủy","","info")})},D=s=>{const i=s.target.files[0];m(URL.createObjectURL(i)),V(URL.createObjectURL(i)),E(i)};n.useEffect(()=>()=>{h&&URL.revokeObjectURL(h.preview)},[h,l==null?void 0:l.Id]);const{isLoading:R,isError:H,data:c,error:P,refetch:f}=$("accounts/getaccountbyid",`${l.Id}`),a=(p=c==null?void 0:c.data)==null?void 0:p.result;return n.useEffect(()=>{a!==void 0&&(a.avatar?m(a.avatar):m(G)),f()},[c,f,l.Id]),R?e.jsx(K,{}):H?e.jsxs("span",{children:["Error: ",P.message]}):e.jsxs("div",{children:[e.jsx(J,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"THÔNG TIN CÁ NHÂN"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(C,{to:"/Client-UI/",children:"Trang chủ"})}),e.jsx("li",{children:"Thông tin cá nhân"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:e.jsxs("div",{className:"sc-card-profile text-center",children:[e.jsx("div",{className:"card-media",children:e.jsx("img",{id:"profileimg",src:x,alt:"avatar"})}),e.jsxs("div",{id:"upload-profile",children:[e.jsx(C,{to:"#",className:"btn-upload",children:"Cập nhật hình ảnh mới"}),e.jsx("input",{id:"tf-upload-img",type:"file",name:"profile",onChange:D,required:""})]})]})}),e.jsx("div",{className:"col-xl-9 col-lg-9 col-md-12 col-12",children:e.jsx("div",{className:"form-upload-profile",children:e.jsxs("form",{className:"form-profile",onSubmit:I(q),children:[e.jsx("div",{className:"form-infor-profile",children:e.jsxs("div",{className:"info-account",children:[e.jsx("h4",{className:"title-create-item",children:"Thông tin cơ bản"}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Họ và tên"}),e.jsx(u,{control:t,error:(j=r.fullname)==null?void 0:j.message,className:"color-disabled",type:"text",name:"fullname",placeholder:"Họ và tên",defaultValue:a==null?void 0:a.fullName})]}),e.jsx("fieldset",{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-half mr-auto",children:[e.jsx("h4",{className:"title-infor-account",children:"Ngày sinh"}),e.jsx(Z,{PopperProps:{sx:{"&.MuiPickersPopper-root":{border:"4px solid red"}}},future:!1,defaultValue:S(a==null?void 0:a.birthday),control:t,error:(g=r.birthday)==null?void 0:g.message,name:"birthday"})]}),e.jsxs("div",{className:"w-birthday",children:[e.jsx("h4",{className:"title-infor-account",children:"Giới tính"}),e.jsx(_,{control:t,error:(N=r==null?void 0:r.gender)==null?void 0:N.message,defaultValue:a==null?void 0:a.gender,name:"gender",valueArray:k})]})]})}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Số điện thoại"}),e.jsx(u,{control:t,error:(b=r.phone)==null?void 0:b.message,className:"number color-disabled",name:"phone","aria-required":"true",type:"number",defaultValue:a==null?void 0:a.phone,placeholder:"Số điện thoại",onKeyDown:L})]}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Email"}),e.jsx(u,{control:t,className:"color-disabled",error:(v=r.email)==null?void 0:v.message,id:"email",name:"email","aria-required":"true",type:"email",defaultValue:a==null?void 0:a.email,placeholder:"Nhập email"})]}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Địa chỉ"}),e.jsx(Q,{control:t,id:"address",name:"address","aria-required":"true",type:"text",defaultValue:a==null?void 0:a.address,placeholder:"Nhập địa chỉ"})]})]})}),e.jsx("div",{style:{width:"100%"},className:"flex",children:e.jsx("button",{className:"tf-button-submit mg-t-15 button-center",type:"submit",children:"Cập nhật"})})]})})})]})})}),e.jsx(M,{})]})};export{he as default};