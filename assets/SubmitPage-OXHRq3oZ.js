import{M as W,N as Y,r,O as Z,o as _,p as ee,Q as S,j as e,H as se,L as T,S as te,U as ae,T as ie,g as ne,V as ce}from"./index-CCVB7hGB.js";/* empty css                   */import{c as re,d as le,a as I,o as de}from"./object-SWzzLpY8.js";import{T as oe}from"./TextareaCommon-lhFCnWCM.js";import{D as v}from"./index-BiwEpv6A.js";import{p as me,a as F}from"./Status-B5MSIRN5.js";import{S as u}from"./sweetalert2.all-DCAEqCK_.js";const he="https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",pe={get:async()=>await W.get(he)},ue="paintings/getpaintingbyaccountcontest",Se=()=>{var V,B,R,E;const{contestId:x}=Y(),[i,g]=r.useState(null),[f,j]=r.useState(null),[o,y]=r.useState(null),[b,N]=r.useState([]),[l,w]=r.useState(null),[n,P]=r.useState(!1),[k,D]=r.useState(!1),{progress:xe,url:C,error:ge}=Z(f),a=_(s=>s.auth.userInfo),G=new Date().toISOString().slice(0,10),[fe,H]=r.useState({cities:[],districts:[],wards:[],selectedCity:"",selectedDistrict:""});r.useEffect(()=>{(async()=>{const t=await ce.getAllTopic("roundtopics/getalltopic",a.Id,x),c=await pe.get();N(t.data.result),H(d=>({...d,cities:c.data}))})()},[]);const q=re().shape({file:le().required("Vui lòng chọn ảnh"),name:I().required("Vui lòng nhập tên của bức tranh"),description:I(),topic:I().required("Vui lòng chọn chủ đề")}),{handleSubmit:U,control:L,setValue:p,trigger:A,watch:M,setError:O,formState:{errors:m}}=ee({resolver:de(q),reValidateMode:"onChange"}),J=s=>{const t=s.target.files[0];t.preview=URL.createObjectURL(t),g(URL.createObjectURL(t)),p("file",t),O("file",""),j(t)},z=async s=>{if(!await A())return;let c={},d="",h="";o?(h="PUT",d="paintings/update",c={id:o,image:i,name:s.name,description:s.description,status:F.DRAFT,roundTopicId:l,currentUserId:a.Id}):(h="POST",d="paintings/draftepainting1stround",c={image:C,name:s.name,description:s.description,roundTopicId:l,accountId:a.Id}),$("Bạn có chắc chắn lưu bài?",d,h,c,"Lưu bài thành công","Lưu bài thất bại","Bạn đã hủy lưu bài",D)},K=async s=>{if(!await A())return;let c={},d="",h="";o?(h="PUT",d="paintings/update",c={id:o,image:i,name:s.name,description:s.description,status:F.SUBMITTED,roundTopicId:l,currentUserId:a.Id}):(h="POST",d="paintings/submitepainting1stround",c={image:C,name:s.name,description:s.description,roundTopicId:l,accountId:a.Id}),$("Bạn có chắc chắn nộp bài?",d,h,c,"Nộp bài thành công","Nộp bài thất bại","Bạn đã hủy nộp bài",D)},Q=(s,t="")=>M(s)||t,X=(s,t)=>{p(s,t.name),w(t.id),O(s,"")};return r.useEffect(()=>()=>{i&&URL.revokeObjectURL(i.preview)},[i,a==null?void 0:a.Id]),r.useEffect(()=>{S.getAllPaintingByContestAccountId(ue,x,a==null?void 0:a.Id).then(s=>{const t=s.data.result;g(t.image),y(t.id),p("name",t.name),p("description",t.description),p("topic",t.topicName),w(t.roundTopicId),p("file",t.image),me.some(c=>c===t.status)?P(!0):P(!1)})},[a==null?void 0:a.Id,x,k]),e.jsxs("div",{className:"create-item",children:[e.jsx(se,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"ĐĂNG KÝ THAM GIA"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(T,{to:"/",children:"Trang chủ"})}),e.jsx("li",{children:e.jsx(T,{to:"#",children:"Trang"})}),e.jsx("li",{children:"Đăng ký"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[i&&e.jsxs("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[e.jsx("h4",{style:{marginBottom:"20px"},className:"title-create-item",children:"Xem trước"}),e.jsxs("div",{className:"sc-card-product",children:[e.jsx("div",{className:"card-media",children:e.jsx(T,{className:"cursor-none",to:"#",children:e.jsx("img",{src:i||te,alt:"preview"})})}),e.jsxs("div",{className:"meta-info",children:[e.jsx("div",{className:"author",children:e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Tác giả"}),e.jsx("h5",{children:a.nameid})]})}),e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Ngày nộp"}),e.jsx("h5",{children:G})]})]})]})]}),e.jsx("div",{className:`${i?"col-xl-9 col-lg-6 col-md-12 col-12":"col-xl-12 col-lg-12 col-md-12 col-12"}`,children:e.jsx("div",{className:"form-create-item",style:{left:"50%"},children:e.jsxs("form",{children:[e.jsx("h4",{className:"title-create-item",children:"Tải ảnh"}),e.jsxs("label",{className:ae(n?"read-only":"","uploadFile",((B=(V=m.file)==null?void 0:V.message)==null?void 0:B.length)>0?"border-danger":""),children:[i?e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}):m.file?e.jsx("span",{className:"text-danger h5",children:m.file.message}):e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}),e.jsx("input",{onChange:J,type:"file",className:`${n?"read-only":""} inputfile form-control`,name:"file",disabled:n})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"title-create-item disable-select",children:"Tên bức tranh"}),e.jsx(ie,{control:L,error:(R=m.name)==null?void 0:R.message,id:"name",name:"name",tabIndex:"1",placeholder:"Nhập tên của bức tranh",className:`${n?"read-only":""} mb-15`,autoFocus:!0,disabled:n,readOnly:n}),e.jsx("h4",{className:"title-create-item",children:"Mô tả bức tranh"}),e.jsx(oe,{control:L,id:"description",name:"description",tabIndex:"1",placeholder:"Nhập mô tả của bức tranh",className:`${n?"read-only":""} mb-15`,autoFocus:!0,disabled:n}),e.jsx("div",{className:"inner-row-form style-2",children:e.jsxs("div",{id:"item-create",className:"dropdown",children:[e.jsx("h4",{className:"title-create-item",children:"Chủ đề"}),m.topic&&e.jsx("span",{className:"text-danger h5",children:m.topic.message}),e.jsxs(v,{disabled:n,classname:"mb-15",errors:(E=m.topic)==null?void 0:E.message,children:[e.jsx(v.Select,{placeholder:Q("topic","Chọn chủ đề")}),e.jsx(v.List,{children:b.map(s=>e.jsx(v.Option,{onClick:()=>X("topic",s),children:s.name},s.name))})]})]})})]}),e.jsxs("div",{className:"flex justify-content-center align-items-center mt-5",children:[e.jsx("button",{type:"submit",className:`${n?"button-read-only":""} btn-submit`,disabled:n,onClick:U(z),children:"Lưu bản vẽ"}),e.jsx("button",{type:"submit",className:`${n?"button-read-only":""} btn-submit`,disabled:n,onClick:U(K),children:"Nộp bản vẽ"})]})]})})})]})})}),e.jsx(ne,{})]})},$=(x,i,g,f,j,o,y,b)=>{u.fire({title:x,showCancelButton:!0,confirmButtonText:"Lưu"}).then(N=>{N.isConfirmed?g==="POST"?S.postPainting(i,f).then(()=>{u.fire(j,"","success").then(()=>{b(l=>!l)})}).catch(l=>{u.fire(o,"Hãy thử lại sau bạn nhé","error")}):g==="PUT"&&S.updatePainting(i,f).then(()=>{u.fire(j,"","success").then(()=>{b(l=>!l)})}).catch(l=>{u.fire(o,"Hãy thử lại sau bạn nhé","error")}):N.isDismissed&&u.fire(y,"","info")})};export{Se as default};
