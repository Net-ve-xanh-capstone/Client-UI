import{K as z,r,M as W,m as Y,n as Z,N as S,j as e,H as _,L as y,d as ee,O as se,T as te,e as ae,Q as ie}from"./index-Dxp6WZi-.js";import{p as ne,a as $}from"./react-tabs-CDt5bx7Q.js";import{c as ce,d as le,a as I,o as re}from"./object-DQsqqwX9.js";import{T as de}from"./TextareaCommon-DTacRyMN.js";import{D as v}from"./index-zabog1tj.js";import{S as u}from"./sweetalert2.all-BbM00BiG.js";const oe="paintings/getpaintingbyaccountcontest",be=()=>{var R,V,E,F;const{contestId:x}=z(),[i,g]=r.useState(null),[f,j]=r.useState(null),[d,T]=r.useState(null),[b,N]=r.useState([]),[c,P]=r.useState(null),[n,w]=r.useState(!1),[A,D]=r.useState(!1),{progress:me,url:C,error:he}=W(f),a=Y(s=>s.auth.userInfo),G=new Date().toISOString().slice(0,10);r.useEffect(()=>{(async()=>{const t=await ie.getAllTopic("roundtopics/getalltopic",a.Id,x);N(t.data.result)})()},[]);const H=ce().shape({file:le().required("Vui lòng chọn ảnh"),name:I().required("Vui lòng nhập tên của bức tranh"),description:I(),topic:I().required("Vui lòng chọn chủ đề")}),{handleSubmit:L,control:U,setValue:p,trigger:O,watch:q,setError:B,formState:{errors:o}}=Z({resolver:re(H),reValidateMode:"onChange"}),J=s=>{const t=s.target.files[0];t.preview=URL.createObjectURL(t),g(URL.createObjectURL(t)),p("file",t),B("file",""),j(t)},M=async s=>{if(!await O())return;let l={},m="",h="";d?(h="PUT",m="paintings/update",l={id:d,image:i,name:s.name,description:s.description,status:$.DRAFT,roundTopicId:c,currentUserId:a.Id}):(h="POST",m="paintings/draftepainting1stround",l={image:C,name:s.name,description:s.description,roundTopicId:c,accountId:a.Id}),k("Bạn có chắc chắn lưu bài?",m,h,l,"Lưu bài thành công","Lưu bài thất bại","Bạn đã hủy lưu bài",D)},K=async s=>{if(!await O())return;let l={},m="",h="";d?(h="PUT",m="paintings/update",l={id:d,image:i,name:s.name,description:s.description,status:$.SUBMITTED,roundTopicId:c,currentUserId:a.Id}):(h="POST",m="paintings/submitepainting1stround",l={image:C,name:s.name,description:s.description,roundTopicId:c,accountId:a.Id}),k("Bạn có chắc chắn nộp bài?",m,h,l,"Nộp bài thành công","Nộp bài thất bại","Bạn đã hủy nộp bài",D)},Q=(s,t="")=>q(s)||t,X=(s,t)=>{p(s,t.name),P(t.id),B(s,"")};return r.useEffect(()=>()=>{i&&URL.revokeObjectURL(i.preview)},[i,a==null?void 0:a.Id]),r.useEffect(()=>{S.getAllPaintingByContestAccountId(oe,x,a==null?void 0:a.Id).then(s=>{const t=s.data.result;g(t.image),T(t.id),p("name",t.name),p("description",t.description),p("topic",t.topicName),P(t.roundTopicId),p("file",t.image),ne.some(l=>l===t.status)?w(!0):w(!1)})},[a==null?void 0:a.Id,x,A]),e.jsxs("div",{className:"create-item",children:[e.jsx(_,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"Đăng ký tham gia"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(y,{to:"/",children:"Trang chủ"})}),e.jsx("li",{children:e.jsx(y,{to:"#",children:"Trang"})}),e.jsx("li",{children:"Đăng ký"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[i&&e.jsxs("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[e.jsx("h4",{style:{marginBottom:"20px"},className:"title-create-item",children:"Xem trước"}),e.jsxs("div",{className:"sc-card-product",children:[e.jsx("div",{className:"card-media",children:e.jsx(y,{className:"cursor-none",to:"#",children:e.jsx("img",{src:i||ee,alt:"preview"})})}),e.jsxs("div",{className:"meta-info",children:[e.jsx("div",{className:"author",children:e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Tác giả"}),e.jsx("h5",{children:a.nameid})]})}),e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Ngày nộp"}),e.jsx("h5",{children:G})]})]})]})]}),e.jsx("div",{className:`${i?"col-xl-9 col-lg-6 col-md-12 col-12":"col-xl-12 col-lg-12 col-md-12 col-12"}`,children:e.jsx("div",{className:"form-create-item",style:{left:"50%"},children:e.jsxs("form",{children:[e.jsx("h4",{className:"title-create-item",children:"Tải ảnh"}),e.jsxs("label",{className:se(n?"read-only":"","uploadFile",((V=(R=o.file)==null?void 0:R.message)==null?void 0:V.length)>0?"border-danger":""),children:[i?e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}):o.file?e.jsx("span",{className:"text-danger h5",children:o.file.message}):e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}),e.jsx("input",{onChange:J,type:"file",className:`${n?"read-only":""} inputfile form-control`,name:"file",disabled:n})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"title-create-item disable-select",children:"Tên bức tranh"}),e.jsx(te,{control:U,error:(E=o.name)==null?void 0:E.message,id:"name",name:"name",tabIndex:"1",placeholder:"Nhập tên của bức tranh",className:`${n?"read-only":""} mb-15`,autoFocus:!0,disabled:n,readOnly:n}),e.jsx("h4",{className:"title-create-item",children:"Mô tả bức tranh"}),e.jsx(de,{control:U,id:"description",name:"description",tabIndex:"1",placeholder:"Nhập mô tả của bức tranh",className:`${n?"read-only":""} mb-15`,autoFocus:!0,disabled:n}),e.jsx("div",{className:"inner-row-form style-2",children:e.jsxs("div",{id:"item-create",className:"dropdown",children:[e.jsx("h4",{className:"title-create-item",children:"Chủ đề"}),o.topic&&e.jsx("span",{className:"text-danger h5",children:o.topic.message}),e.jsxs(v,{disabled:n,errors:(F=o.topic)==null?void 0:F.message,children:[e.jsx(v.Select,{placeholder:Q("topic","Chọn chủ đề")}),e.jsx(v.List,{children:b.map(s=>e.jsx(v.Option,{onClick:()=>X("topic",s),children:s.name},s.name))})]})]})})]}),e.jsxs("div",{className:"flex justify-content-center align-items-center mt-5",children:[e.jsx("button",{type:"submit",className:`${n?"button-read-only":""} btn-submit`,disabled:n,onClick:L(M),children:"Lưu bản vẽ"}),e.jsx("button",{type:"submit",className:`${n?"button-read-only":""} btn-submit`,disabled:n,onClick:L(K),children:"Nộp bản vẽ"})]})]})})})]})})}),e.jsx(ae,{})]})},k=(x,i,g,f,j,d,T,b)=>{u.fire({title:x,showCancelButton:!0,confirmButtonText:"Lưu"}).then(N=>{N.isConfirmed?g==="POST"?S.postPainting(i,f).then(()=>{u.fire(j,"","success").then(()=>{b(c=>!c)})}).catch(c=>{u.fire(d,"Hãy thử lại sau bạn nhé","error")}):g==="PUT"&&S.updatePainting(i,f).then(()=>{u.fire(j,"","success").then(()=>{b(c=>!c)})}).catch(c=>{u.fire(d,"Hãy thử lại sau bạn nhé","error")}):N.isDismissed&&u.fire(T,"","info")})};export{be as default};
