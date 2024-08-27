import{Q as W,r as d,S as z,u as Y,p as Z,U as P,j as e,H as _,L as y,V as ee,W as se,T as te,h as ae,X as ie}from"./index-BN_jQgva.js";import{c as ne,d as ce,a as S,o as le}from"./object-DHZVx7rX.js";import{T as re}from"./TextareaCommon-BZfvIlao.js";import{D as T}from"./index-vgnoeeNj.js";import{a as de,b as F}from"./Status-Dy47yu5a.js";import{S as g}from"./sweetalert2.all-DXft1fFk.js";const oe="paintings/getpaintingbyaccountcontest",be=()=>{var V,A,R,E;const{contestId:f}=W(),[i,j]=d.useState(null),[b,N]=d.useState(null),[u,v]=d.useState(null),[I,n]=d.useState([]),[l,o]=d.useState(null),[c,w]=d.useState(!1),[k,C]=d.useState(!1),{progress:me,url:D,error:he}=z(b),a=Y(s=>s.auth.userInfo),G=new Date().toISOString().slice(0,10);d.useEffect(()=>{(async()=>{const t=await ie.getAllTopic("roundtopics/getalltopic",a.Id,f);n(t.data.result)})()},[]);const H=ne().shape({file:ce().required("Vui lòng chọn ảnh"),name:S().required("Vui lòng nhập tên của bức tranh"),description:S(),topic:S().required("Vui lòng chọn chủ đề")}),{handleSubmit:U,control:L,setValue:x,trigger:O,watch:q,setError:B,formState:{errors:m}}=Z({resolver:le(H),reValidateMode:"onChange"}),M=s=>{const t=s.target.files[0];t.preview=URL.createObjectURL(t),j(URL.createObjectURL(t)),x("file",t),B("file",""),N(t)},J=async s=>{if(!await O())return;let r={},h="",p="";u?(p="PUT",h="paintings/update",r={id:u,image:i,name:s.name,description:s.description,status:F.DRAFT,roundTopicId:l,currentUserId:a.Id}):(p="POST",h="paintings/draftepainting1stround",r={image:D,name:s.name,description:s.description,roundTopicId:l,accountId:a.Id}),$("Bạn có chắc chắn lưu bài?",h,p,r,"Lưu bài thành công","Bạn đã hủy lưu bài",C)},X=async s=>{if(!await O())return;let r={},h="",p="";u?(p="PUT",h="paintings/update",r={id:u,image:i,name:s.name,description:s.description,status:F.SUBMITTED,roundTopicId:l,currentUserId:a.Id}):(p="POST",h="paintings/submitpainting1stround",r={accountId:a.Id,image:D,name:s.name,description:s.description,roundTopicId:l}),$("Bạn có chắc chắn nộp bài?",h,p,r,"Nộp bài thành công","Bạn đã hủy nộp bài",C)},K=(s,t="")=>q(s)||t,Q=(s,t)=>{x(s,t.name),o(t.id),B(s,"")};return d.useEffect(()=>()=>{i&&URL.revokeObjectURL(i.preview)},[i,a==null?void 0:a.Id]),d.useEffect(()=>{P.getAllPaintingByContestAccountId(oe,f,a==null?void 0:a.Id).then(s=>{const t=s.data.result;j(t.image),v(t.id),x("name",t.name),x("description",t.description),x("topic",t.topicName),o(t.roundTopicId),x("file",t.image),de.some(r=>r===t.status)?w(!0):w(!1)})},[a==null?void 0:a.Id,f,k]),e.jsxs("div",{className:"create-item",children:[e.jsx(_,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"ĐĂNG KÝ THAM GIA"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(y,{to:"/Client-UI/",children:"Trang chủ"})}),e.jsx("li",{children:e.jsx(y,{to:"#",children:"Trang"})}),e.jsx("li",{children:"Đăng ký"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[i&&e.jsxs("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[e.jsx("h4",{style:{marginBottom:"20px"},className:"title-create-item",children:"Xem trước"}),e.jsxs("div",{className:"sc-card-product",children:[e.jsx("div",{className:"card-media",children:e.jsx(y,{className:"cursor-none",to:"#",children:e.jsx("img",{src:i||ee,alt:"preview"})})}),e.jsxs("div",{className:"meta-info",children:[e.jsx("div",{className:"author",children:e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Tác giả"}),e.jsx("h5",{children:a.nameid})]})}),e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Ngày nộp"}),e.jsx("h5",{children:G})]})]})]})]}),e.jsx("div",{className:`${i?"col-xl-9 col-lg-6 col-md-12 col-12":"col-xl-12 col-lg-12 col-md-12 col-12"}`,children:e.jsx("div",{className:"form-create-item",style:{left:"50%"},children:e.jsxs("form",{children:[e.jsx("h4",{className:"title-create-item",children:"Tải ảnh"}),e.jsxs("label",{className:se(c?"read-only":"","uploadFile",((A=(V=m.file)==null?void 0:V.message)==null?void 0:A.length)>0?"border-danger":""),children:[i?e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}):m.file?e.jsx("span",{className:"text-danger h5",children:m.file.message}):e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}),e.jsx("input",{onChange:M,type:"file",className:`${c?"read-only":""} inputfile form-control`,name:"file",disabled:c})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"title-create-item disable-select",children:"Tên bức tranh"}),e.jsx(te,{control:L,error:(R=m.name)==null?void 0:R.message,id:"name",name:"name",tabIndex:"1",placeholder:"Nhập tên của bức tranh",className:`${c?"read-only":""} mb-15`,autoFocus:!0,disabled:c,readOnly:c}),e.jsx("h4",{className:"title-create-item",children:"Mô tả bức tranh"}),e.jsx(re,{control:L,id:"description",name:"description",tabIndex:"1",placeholder:"Nhập mô tả của bức tranh",className:`${c?"read-only":""} mb-15`,autoFocus:!0,disabled:c}),e.jsx("div",{className:"inner-row-form style-2",children:e.jsxs("div",{id:"item-create",className:"dropdown",children:[e.jsx("h4",{className:"title-create-item",children:"Chủ đề"}),m.topic&&e.jsx("span",{className:"text-danger h5",children:m.topic.message}),e.jsxs(T,{disabled:c,classname:"mb-15",errors:(E=m.topic)==null?void 0:E.message,children:[e.jsx(T.Select,{placeholder:K("topic","Chọn chủ đề")}),e.jsx(T.List,{children:I.map(s=>e.jsx(T.Option,{onClick:()=>Q("topic",s),children:s.name},s.name))})]})]})})]}),e.jsxs("div",{className:"flex justify-content-center align-items-center mt-5",children:[e.jsx("button",{type:"submit",className:`${c?"button-read-only":""} btn-submit`,disabled:c,onClick:U(J),children:"Lưu bản vẽ"}),e.jsx("button",{type:"submit",className:`${c?"button-read-only":""} btn-submit`,disabled:c,onClick:U(X),children:"Nộp bản vẽ"})]})]})})})]})})}),e.jsx(ae,{})]})},$=(f,i,j,b,N,u,v)=>{g.fire({title:f,showCancelButton:!0,confirmButtonText:"Lưu"}).then(I=>{I.isConfirmed?j==="POST"?P.postPainting(i,b).then(()=>{g.fire(N,"","success").then(()=>{v(n=>!n)})}).catch(n=>{var l,o;g.fire((o=(l=n==null?void 0:n.response)==null?void 0:l.data)==null?void 0:o.message,"Hãy thử lại sau bạn nhé","error")}):j==="PUT"&&P.updatePainting(i,b).then(()=>{g.fire(N,"","success").then(()=>{v(n=>!n)})}).catch(n=>{var l,o;g.fire((o=(l=n==null?void 0:n.response)==null?void 0:l.data)==null?void 0:o.message,"Hãy thử lại sau bạn nhé","error")}):I.isDismissed&&g.fire(u,"","info")})};export{be as default};
