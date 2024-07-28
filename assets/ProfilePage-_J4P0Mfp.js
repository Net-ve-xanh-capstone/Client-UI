import{a as H,r as n,j as e,a8 as A,L as v,e as y}from"./index-0h_SDAPj.js";import{H as B}from"./HeaderVersion1-Be7KpaHc.js";import{a as O}from"./TooltipMenu-keG4s0O1.js";import{u as $,m as K}from"./useQueryData-6wX8JnFC.js";import{c as M,a as o,b as G,u as z,T as u,o as J}from"./object-BuZwcCpF.js";import{T as Q}from"./TextareaCommon-BqkWu8kU.js";import{r as W,a as X,b as Y,D as Z,R as _}from"./Regex-2EqhfhDR.js";import{a as ee}from"./imageDefault-DrZ7cyyx.js";import{u as ae}from"./useUploadImage-C6mgYR25.js";import{S as d}from"./sweetalert2.all-DInjZVFQ.js";import"./Transition-CCsBKYIx.js";import"./Tooltip-tzlMdmSY.js";import"./index-BCOSzsmT.js";import"./FormGroup-CfbNFbFd.js";import"./ButtonBase-D4LnX9Gn.js";import"./Paper-LxqktcM2.js";import"./createSvgIcon-D7Ek13s2.js";import"./removeClass-D0mFdbeO.js";import"./Dialog-BLeOdvGK.js";import"./config-VkUvCR_3.js";const Se=()=>{var p,x,f,j,g,N;const{userInfo:i}=H(s=>s.auth),[m,S]=n.useState(null),[V,h]=n.useState(null),[C,E]=n.useState(null),{url:U}=ae(C),w=M().shape({fullname:o().required("Vui lòng nhập tên của bạn").matches(W,"Tên không hợp lệ"),email:o().required("Vui lòng nhập email của bạn").matches(X,"Email không hợp lệ"),phone:o().required("Vui lòng nhập số điện thoại của bạn").matches(Y,"Số điện thoại không hợp lệ"),gender:G().required("Vui lòng chọn giới tính").typeError("Vui lòng chọn giới tính"),birthday:o().required("Vui lòng chọn ngày sinh").typeError("Vui lòng chọn ngày sinh")}),{handleSubmit:L,control:t,formState:{errors:r}}=z({resolver:J(w),reValidateMode:"onSubmit"}),T=s=>{(s.key==="-"||s.key==="+")&&s.preventDefault()},k=[{value:"0",label:"Nam"},{value:"1",label:"Nữ"}],q=async s=>{const l=y(s.birthday).toISOString();console.log(s);const F={id:i.Id,phone:s.phone,gender:s.gender,fullname:s.fullname,birthday:l,address:s.address,avatar:U};d.fire({title:"Bạn có chắc chắn cập nhật?",showCancelButton:!0,confirmButtonText:"Có"}).then(b=>{b.isConfirmed?K.update("accounts",F).then(()=>{d.fire("Cập nhật thành công","","success")}).catch(se=>{d.fire("Cập nhật thất bại thất bại","Hãy thử lại sau bạn nhé","error")}):b.isDenied&&d.fire("Bạn đã hủy","","info")})},R=s=>{const l=s.target.files[0];h(URL.createObjectURL(l)),S(URL.createObjectURL(l)),E(l)};n.useEffect(()=>()=>{m&&URL.revokeObjectURL(m.preview)},[m,i==null?void 0:i.Id]);const{isLoading:D,isError:I,data:c,error:P}=$("accounts/getaccountbyid",`${i.Id}`),a=(p=c==null?void 0:c.data)==null?void 0:p.result;return n.useEffect(()=>{a!==void 0&&(a.avatar?h(a.avatar):h(ee))},[c]),D?e.jsx(A,{}):I?e.jsxs("span",{children:["Error: ",P.message]}):e.jsxs("div",{children:[e.jsx(B,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"Thông tin cá nhân"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(v,{to:"/",children:"Trang chủ"})}),e.jsx("li",{children:"Thông tin cá nhân"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:e.jsxs("div",{className:"sc-card-profile text-center",children:[e.jsx("div",{className:"card-media",children:e.jsx("img",{id:"profileimg",src:V,alt:"Axies"})}),e.jsxs("div",{id:"upload-profile",children:[e.jsx(v,{to:"#",className:"btn-upload",children:"Cập nhật hình ảnh mới"}),e.jsx("input",{id:"tf-upload-img",type:"file",name:"profile",onChange:R,required:""})]})]})}),e.jsx("div",{className:"col-xl-9 col-lg-9 col-md-12 col-12",children:e.jsx("div",{className:"form-upload-profile",children:e.jsxs("form",{className:"form-profile",onSubmit:L(q),children:[e.jsx("div",{className:"form-infor-profile",children:e.jsxs("div",{className:"info-account",children:[e.jsx("h4",{className:"title-create-item",children:"Thông tin cơ bản"}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Họ và tên"}),e.jsx(u,{control:t,error:(x=r.fullname)==null?void 0:x.message,className:"color-disabled",type:"text",name:"fullname",placeholder:"Họ và tên",defaultValue:a==null?void 0:a.fullName})]}),e.jsx("fieldset",{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-half mr-auto",children:[e.jsx("h4",{className:"title-infor-account",children:"Ngày sinh"}),e.jsx(Z,{PopperProps:{sx:{"&.MuiPickersPopper-root":{border:"4px solid red"}}},defaultValue:y(a==null?void 0:a.birthday),control:t,error:(f=r.birthday)==null?void 0:f.message,name:"birthday"})]}),e.jsxs("div",{className:"w-birthday",children:[e.jsx("h4",{className:"title-infor-account",children:"Giới tính"}),e.jsx(_,{control:t,error:(j=r==null?void 0:r.gender)==null?void 0:j.message,defaultValue:a==null?void 0:a.gender,name:"gender",valueArray:k})]})]})}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Số điện thoại"}),e.jsx(u,{control:t,error:(g=r.phone)==null?void 0:g.message,className:"number color-disabled",name:"phone","aria-required":"true",type:"number",defaultValue:a==null?void 0:a.phone,placeholder:"Số điện thoại",onKeyDown:T})]}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Email"}),e.jsx(u,{control:t,className:"color-disabled",error:(N=r.email)==null?void 0:N.message,id:"email",name:"email","aria-required":"true",type:"email",defaultValue:a==null?void 0:a.email,placeholder:"Nhập email"})]}),e.jsxs("fieldset",{children:[e.jsx("h4",{className:"title-infor-account",children:"Địa chỉ"}),e.jsx(Q,{control:t,id:"address",name:"address","aria-required":"true",type:"text",defaultValue:a==null?void 0:a.address,placeholder:"Nhập địa chỉ"})]})]})}),e.jsx("div",{style:{width:"100%"},className:"flex",children:e.jsx("button",{className:"tf-button-submit mg-t-15 button-center",type:"submit",children:"Cập nhật"})})]})})})]})})}),e.jsx(O,{})]})};export{Se as default};