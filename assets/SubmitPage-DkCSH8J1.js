import{x as v,y as W,r as d,a as Y,j as e,L as T}from"./index-ZXEa8yfF.js";import{H as Z}from"./HeaderVersion2-D_m77BI0.js";import{a as _}from"./TooltipMenu-Dn8h3PyQ.js";/* empty css                   */import{d as ee}from"./imageDefault-DrZ7cyyx.js";import{u as te}from"./useUploadImage-kn-oguMb.js";import{c as se,d as ae,a as S,o as ie}from"./object-BdjTEWmS.js";import{u as ne}from"./index.esm-CBjfu8mc.js";import{T as ce}from"./TextfieldCommon-BQBEs6JI.js";import{T as re,S as f}from"./sweetalert2.all-qqFpS-IX.js";import{D as y}from"./index-eZkjXQMk.js";import{c as le}from"./index-C1rxnSHW.js";import{p as oe,a as k}from"./Status-BVExqqWS.js";import"./Transition-CHKTC27M.js";import"./Tooltip-DuYRBHwk.js";import"./config-VkUvCR_3.js";const de={getAllTopic:async(n,a,c,g)=>await v.get(n,{params:{AccountId:a,ContestId:c},...g})},w={postPainting:async(n,a,c)=>await v.post(n,a,c),getAllPaintingByContestAccountId:async(n,a,c)=>await v.get(n,{params:{contestId:a,accountId:c}}),updatePainting:async(n,a,c)=>await v.put(n,a,c)},me="paintings/getpaintingbyaccountcontest",Le=()=>{var R,V,E,$;const{contestId:n}=W(),[a,c]=d.useState(null),[g,j]=d.useState(null),[m,I]=d.useState(null),[b,N]=d.useState([]),[l,P]=d.useState(null),[r,C]=d.useState(!1),[G,D]=d.useState(!1),{progress:he,url:L,error:pe}=te(g),i=Y(t=>t.auth.userInfo),H=new Date().toISOString().slice(0,10);d.useEffect(()=>{(async()=>{const s=await de.getAllTopic("roundtopics/getalltopic",i.Id,n);N(s.data.result)})()},[]);const q=se().shape({file:ae().required("Vui lòng chọn ảnh"),name:S().required("Vui lòng nhập tên của bức tranh"),description:S(),topic:S().required("Vui lòng chọn chủ đề")}),{handleSubmit:U,control:A,setValue:x,trigger:B,watch:J,setError:O,formState:{errors:h}}=ne({resolver:ie(q),reValidateMode:"onChange"}),M=t=>{const s=t.target.files[0];s.preview=URL.createObjectURL(s),c(URL.createObjectURL(s)),x("file",s),O("file",""),j(s)},X=async t=>{if(!await B())return;let o={},p="",u="";m?(u="PUT",p="paintings/update",o={id:m,image:a,name:t.name,description:t.description,status:k.DRAFT,roundTopicId:l,currentUserId:i.Id}):(u="POST",p="paintings/draftepainting1stround",o={image:L,name:t.name,description:t.description,roundTopicId:l,accountId:i.Id}),F("Bạn có chắc chắn lưu bài?",p,u,o,"Lưu bài thành công","Lưu bài thất bại","Bạn đã hủy lưu bài",D)},z=async t=>{if(!await B())return;let o={},p="",u="";m?(u="PUT",p="paintings/update",o={id:m,image:a,name:t.name,description:t.description,status:k.SUBMITTED,roundTopicId:l,currentUserId:i.Id}):(u="POST",p="paintings/submitepainting1stround",o={image:L,name:t.name,description:t.description,roundTopicId:l,accountId:i.Id}),F("Bạn có chắc chắn nộp bài?",p,u,o,"Nộp bài thành công","Nộp bài thất bại","Bạn đã hủy nộp bài",D)},K=(t,s="")=>J(t)||s,Q=(t,s)=>{x(t,s.name),P(s.id),O(t,"")};return d.useEffect(()=>()=>{a&&URL.revokeObjectURL(a.preview)},[a,i==null?void 0:i.Id]),d.useEffect(()=>{w.getAllPaintingByContestAccountId(me,n,i==null?void 0:i.Id).then(t=>{const s=t.data.result;c(s.image),I(s.id),x("name",s.name),x("description",s.description),x("topic",s.topicName),P(s.roundTopicId),x("file",s.image),oe.some(o=>o===s.status)?C(!0):C(!1)})},[i==null?void 0:i.Id,n,G]),e.jsxs("div",{className:"create-item",children:[e.jsx(Z,{}),e.jsxs("section",{className:"flat-title-page inner",children:[e.jsx("div",{className:"overlay"}),e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsx("div",{className:"page-title-heading mg-bt-12",children:e.jsx("h1",{className:"heading text-center",children:"Đăng ký tham gia"})}),e.jsx("div",{className:"breadcrumbs style2",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(T,{to:"/",children:"Trang chủ"})}),e.jsx("li",{children:e.jsx(T,{to:"#",children:"Trang"})}),e.jsx("li",{children:"Đăng ký"})]})})]})})})]}),e.jsx("div",{className:"tf-create-item tf-section",children:e.jsx("div",{className:"themesflat-container",children:e.jsxs("div",{className:"row",children:[a&&e.jsxs("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[e.jsx("h4",{style:{marginBottom:"20px"},className:"title-create-item",children:"Xem trước"}),e.jsxs("div",{className:"sc-card-product",children:[e.jsx("div",{className:"card-media",children:e.jsx(T,{className:"cursor-none",to:"#",children:e.jsx("img",{src:a||ee,alt:"preview"})})}),e.jsxs("div",{className:"meta-info",children:[e.jsx("div",{className:"author",children:e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Tác giả"}),e.jsx("h5",{children:i.nameid})]})}),e.jsxs("div",{className:"text",children:[e.jsx("span",{children:"Ngày nộp"}),e.jsx("h5",{children:H})]})]})]})]}),e.jsx("div",{className:`${a?"col-xl-9 col-lg-6 col-md-12 col-12":"col-xl-12 col-lg-12 col-md-12 col-12"}`,children:e.jsx("div",{className:"form-create-item",style:{left:"50%"},children:e.jsxs("form",{children:[e.jsx("h4",{className:"title-create-item",children:"Tải ảnh"}),e.jsxs("label",{className:le(r?"read-only":"","uploadFile",((V=(R=h.file)==null?void 0:R.message)==null?void 0:V.length)>0?"border-danger":""),children:[a?e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}):h.file?e.jsx("span",{className:"text-danger h5",children:h.file.message}):e.jsx("span",{className:"filename",children:"PNG, JPG. tối đa 20mb."}),e.jsx("input",{onChange:M,type:"file",className:`${r?"read-only":""} inputfile form-control`,name:"file",disabled:r})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"title-create-item disable-select",children:"Tên bức tranh"}),e.jsx(ce,{control:A,error:(E=h.name)==null?void 0:E.message,id:"name",name:"name",tabIndex:"1",placeholder:"Nhập tên của bức tranh",className:`${r?"read-only":""} mb-15`,autoFocus:!0,disabled:r,readOnly:r}),e.jsx("h4",{className:"title-create-item",children:"Mô tả bức tranh"}),e.jsx(re,{control:A,id:"description",name:"description",tabIndex:"1",placeholder:"Nhập mô tả của bức tranh",className:`${r?"read-only":""} mb-15`,autoFocus:!0,disabled:r}),e.jsx("div",{className:"inner-row-form style-2",children:e.jsxs("div",{id:"item-create",className:"dropdown",children:[e.jsx("h4",{className:"title-create-item",children:"Chủ đề"}),h.topic&&e.jsx("span",{className:"text-danger h5",children:h.topic.message}),e.jsxs(y,{disabled:r,errors:($=h.topic)==null?void 0:$.message,children:[e.jsx(y.Select,{placeholder:K("topic","Chọn chủ đề")}),e.jsx(y.List,{children:b.map(t=>e.jsx(y.Option,{onClick:()=>Q("topic",t),children:t.name},t.name))})]})]})})]}),e.jsxs("div",{className:"flex justify-content-center align-items-center mt-5",children:[e.jsx("button",{type:"submit",className:`${r?"button-read-only":""} btn-submit`,disabled:r,onClick:U(X),children:"Lưu bản vẽ"}),e.jsx("button",{type:"submit",className:`${r?"button-read-only":""} btn-submit`,disabled:r,onClick:U(z),children:"Nộp bản vẽ"})]})]})})})]})})}),e.jsx(_,{})]})},F=(n,a,c,g,j,m,I,b)=>{f.fire({title:n,showCancelButton:!0,confirmButtonText:"Lưu"}).then(N=>{N.isConfirmed?c==="POST"?w.postPainting(a,g).then(()=>{f.fire(j,"","success").then(()=>{b(l=>!l)})}).catch(l=>{f.fire(m,"Hãy thử lại sau bạn nhé","error")}):c==="PUT"&&w.updatePainting(a,g).then(()=>{f.fire(j,"","success").then(()=>{b(l=>!l)})}).catch(l=>{f.fire(m,"Hãy thử lại sau bạn nhé","error")}):N.isDismissed&&f.fire(I,"","info")})};export{Le as default};
