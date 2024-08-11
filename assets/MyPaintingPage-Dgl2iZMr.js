var K=(i,e,n)=>{if(!e.has(i))throw TypeError("Cannot "+n)};var r=(i,e,n)=>(K(i,e,"read from private field"),n?n.call(i):e.get(i)),w=(i,e,n)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,n)},I=(i,e,n,l)=>(K(i,e,"write to private field"),l?l.call(i,n):e.set(i,n),n);var T=(i,e,n)=>(K(i,e,"access private method"),n);import{aV as Is,aW as Ts,aX as Q,aY as Es,aZ as is,a_ as ls,r as c,a$ as Ms,b0 as Os,p as Y,u as rs,b1 as ks,a as cs,j as s,b2 as A,L,T as As,a2 as Z,b as Ls,f as Ds,G as _s,e as E,h as Ps}from"./index-B1MbLdmT.js";import{H as Fs}from"./HeaderVersion1-BoZWmFhI.js";import{A as Hs}from"./index-BSc_Ri-D.js";import{T as Rs,a as Vs,b as z,c as J}from"./TabPanel-On9hLFv8.js";import{b as Us}from"./Status-jgyUBKC1.js";import{D as k}from"./index-t_VTjJ_h.js";import{a as Bs}from"./TextareaCommon-BsrM9Xia.js";import{c as ss,a as es,o as ts}from"./object-4HkoOfUR.js";var f,C,x,N,M,V,D,$,ns,qs=(ns=class extends Is{constructor(e,n){super();w(this,M);w(this,D);w(this,f,void 0);w(this,C,void 0);w(this,x,void 0);w(this,N,void 0);I(this,f,e),this.setOptions(n),this.bindMethods(),T(this,M,V).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var l;const n=this.options;this.options=r(this,f).defaultMutationOptions(e),Ts(this.options,n)||r(this,f).getMutationCache().notify({type:"observerOptionsUpdated",mutation:r(this,x),observer:this}),n!=null&&n.mutationKey&&this.options.mutationKey&&Q(n.mutationKey)!==Q(this.options.mutationKey)?this.reset():((l=r(this,x))==null?void 0:l.state.status)==="pending"&&r(this,x).setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=r(this,x))==null||e.removeObserver(this)}onMutationUpdate(e){T(this,M,V).call(this),T(this,D,$).call(this,e)}getCurrentResult(){return r(this,C)}reset(){var e;(e=r(this,x))==null||e.removeObserver(this),I(this,x,void 0),T(this,M,V).call(this),T(this,D,$).call(this)}mutate(e,n){var l;return I(this,N,n),(l=r(this,x))==null||l.removeObserver(this),I(this,x,r(this,f).getMutationCache().build(r(this,f),this.options)),r(this,x).addObserver(this),r(this,x).execute(e)}},f=new WeakMap,C=new WeakMap,x=new WeakMap,N=new WeakMap,M=new WeakSet,V=function(){var n;const e=((n=r(this,x))==null?void 0:n.state)??Es();I(this,C,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},D=new WeakSet,$=function(e){is.batch(()=>{var n,l,d,p,u,m,b,g;if(r(this,N)&&this.hasListeners()){const h=r(this,C).variables,j=r(this,C).context;(e==null?void 0:e.type)==="success"?((l=(n=r(this,N)).onSuccess)==null||l.call(n,e.data,h,j),(p=(d=r(this,N)).onSettled)==null||p.call(d,e.data,null,h,j)):(e==null?void 0:e.type)==="error"&&((m=(u=r(this,N)).onError)==null||m.call(u,e.error,h,j),(g=(b=r(this,N)).onSettled)==null||g.call(b,void 0,e.error,h,j))}this.listeners.forEach(h=>{h(r(this,C))})})},ns);function Ks(i,e){const n=ls(),[l]=c.useState(()=>new qs(n,i));c.useEffect(()=>{l.setOptions(i)},[l,i]);const d=c.useSyncExternalStore(c.useCallback(u=>l.subscribe(is.batchCalls(u)),[l]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),p=c.useCallback((u,m)=>{l.mutate(u,m).catch(Ms)},[l]);if(d.error&&Os(l.options.throwOnError,[d.error]))throw d.error;return{...d,mutate:p,mutateAsync:d.mutate}}const as="collections/getcollectionbyaccountid",$s="collections",Gs="paintingcollections/addpaintingtocollection",Ws=i=>{var X;const e=ss().shape({collection:es().required("Vui lòng chọn bộ sưu tập")}),n=ss().shape({name:es().required("Vui lòng nhập tên của bộ sưu tập")}),{watch:l,formState:{errors:d},setValue:p,setError:u,reset:m,handleSubmit:b}=Y({resolver:ts(e),reValidateMode:"onChange"}),{formState:{errors:g},setError:h,control:j,reset:S,handleSubmit:O}=Y({resolver:ts(n),reValidateMode:"onChange"}),[_,t]=c.useState(0),[v,os]=c.useState([]),[U,P]=c.useState([]),[ds,Js]=c.useState(!1),[hs,us]=c.useState(""),[F,H]=c.useState(""),[xs,B]=c.useState(""),ms=ls(),q=rs(a=>a.auth.userInfo),G=i.paintingId,ps=(a,o="")=>l(a)||o,js=(a,o)=>{p(a,o.name),us(o.id),u(a,"")},W=(a,o,y)=>Ks({mutationFn:a,onSuccess:()=>{ms.invalidateQueries([as,q.Id]),H(o)},onError:()=>{H(y)}}),bs=W(a=>Z.create($s,a),"Tạo bộ sưu tập thành công","Tạo bộ sưu tập thất bại"),gs=W(a=>Z.create(Gs,a),"Thêm vào bộ sưu tập thành công","Đã có tranh trong bộ sưu tập"),vs=a=>{const o={name:a.name,description:a.description,currentUserId:q.Id,listPaintingId:[G]};bs.mutate(o)},Ns=()=>{const a={collectionId:hs,paintingId:G};gs.mutate(a)},fs=async a=>{if(!v)return;const o=v.filter(y=>y.name.toLowerCase().includes(a.toLowerCase()));P(o)},Cs=c.useCallback(ks.debounce(a=>fs(a),500),[v]),ys=a=>{const o=a.target.value;B(o),Cs(o)},ws=()=>{i.onHide(),m(),S(),H(""),B(""),P(v)},Ss=a=>{t(a),H(""),B(""),h("name",""),u("collection",""),P(v)},{isLoading:se,isError:ee,data:R,error:te}=cs(as,q.Id);return c.useEffect(()=>{var o,y;const a=(o=R==null?void 0:R.data)==null?void 0:o.result;((y=a==null?void 0:a.list)==null?void 0:y.length)>0?(t(0),os(a==null?void 0:a.list),P(a==null?void 0:a.list)):t(1)},[R,ds]),s.jsxs(A,{animation:!0,scrollable:!0,show:i.show,onHide:ws,children:[s.jsx(A.Header,{closeButton:!0}),s.jsx("div",{className:"modal-body space-y-20 pd-40",style:{height:"500px"},children:s.jsx("div",{className:"flat-tabs themesflat-tabs",children:s.jsxs(Rs,{defaultIndex:_,onSelect:Ss,children:[s.jsxs(Vs,{children:[s.jsx(z,{children:"Đã có bộ sưu tập"}),s.jsx(z,{children:"Chưa có bộ sưu tập"})]}),s.jsxs(J,{className:"mt-5",selected:!0,allowFullScreen:!0,children:[s.jsx("div",{id:"item-create",className:"dropdown mt-5",children:U&&U.length>0?s.jsxs("div",{children:[s.jsx("h3",{className:"mb-5",children:"Thêm vào bộ sưu tập"}),d.collection&&s.jsx("span",{className:"text-danger h5",children:d.collection.message}),s.jsxs(k,{children:[s.jsx(k.Select,{placeholder:ps("collection","Chọn collection của bạn")}),s.jsxs(k.List,{children:[s.jsx(k.Search,{defaultValue:xs,onChange:ys}),U.map((a,o)=>s.jsx(k.Option,{onClick:()=>js("collection",a),children:a==null?void 0:a.name},o))]})]}),s.jsx(L,{to:"#",onClick:b(Ns),className:"btn btn-primary mt-4","data-toggle":"modal","data-target":"#popup_bid_success","data-dismiss":"modal","aria-label":"Close",children:"Thêm"}),F&&s.jsx("div",{className:"mt-4 text-center",children:s.jsx("p",{style:{color:"#000000",fontWeight:"bold"},children:F})})]}):s.jsxs("div",{children:[s.jsx("h3",{children:"Bạn chưa có bộ sưu tập nào"}),s.jsx("div",{id:"item-create",className:"dropdown mt-5",children:s.jsx("h4",{className:"text-center",children:"Hãy tạo bộ sưu tập mới"})})]})}),s.jsx("div",{className:"hr"})]}),s.jsxs(J,{className:"mt-5",allowFullScreen:!0,children:[s.jsx("h3",{className:"mb-15",children:"Tạo bộ sưu tập mới"}),s.jsx(As,{control:j,error:(X=g.name)==null?void 0:X.message,id:"name",name:"name",tabIndex:"1",placeholder:"Nhập tên của bộ sưu tập",className:"mb-15",autoFocus:!0}),s.jsx("div",{className:"hr"}),s.jsx(Bs,{control:j,id:"description",name:"description",tabIndex:"1",placeholder:"Nhập mô tả của bức tranh",className:"mb-15",autoFocus:!0}),s.jsx(L,{to:"#",className:"btn btn-primary mt-4","data-toggle":"modal","data-target":"#popup_bid_success","data-dismiss":"modal",onClick:O(vs),"aria-label":"Close",children:"Thêm và tạo bộ sưu tập mới"}),F&&s.jsx("div",{className:"mt-4 text-center",children:s.jsx("p",{style:{color:"#000000",fontWeight:"bold"},children:F})})]})]})})})]})},Xs=i=>{const e=i.data,n=i.loading,[l,d]=c.useState(6),[p,u]=c.useState(!1),[m,b]=c.useState(!1),[g,h]=c.useState(null),j=Ls(),S=()=>{d(t=>t+6)},O=t=>{h(t),u(!0)},_=(t,v)=>{Us.includes(t)?j(`/Client-UI/submit/${v}`):b(!0)};return s.jsx(c.Fragment,{children:n?s.jsx(Qs,{}):s.jsxs("div",{children:[s.jsxs("div",{className:"explore",children:[s.jsx("div",{className:"box-epxlore justify-content-start",children:e.length>0?e.slice(0,l).map((t,v)=>s.jsxs("div",{className:"sc-card-product mr-4 explode style2 mg-bt",children:[s.jsxs("div",{className:"card-media select-none",children:[s.jsx("div",{children:s.jsx("img",{className:"img-painting object-fit-contain",style:{height:"320px"},src:t==null?void 0:t.image,alt:"painting"})}),s.jsxs("div",{className:"button-place-bid",children:[s.jsx("button",{onClick:()=>O(t.id),className:"sc-button style-place-bid style fl-button pri-3",style:{width:"220px"},children:s.jsx("span",{children:"Thêm vào bộ sưu tập"})}),s.jsx("button",{onClick:()=>_(t==null?void 0:t.status,t==null?void 0:t.contestId),className:"sc-button style-place-bid style fl-button pri-3 mt-5",style:{width:"220px"},children:s.jsx("span",{children:"Chỉnh sửa bài nộp"})})]}),s.jsx("div",{className:"coming-soon",children:t==null?void 0:t.award})]}),s.jsx("div",{onClick:()=>_(t==null?void 0:t.status,t==null?void 0:t.contestId),className:"card-title",children:s.jsx("h5",{children:s.jsx("div",{className:"cursor-pointer",children:t==null?void 0:t.name})})}),s.jsxs("div",{className:"meta-info",style:{display:"flex",flexDirection:"row",justifyContent:"space-around !important",alignItems:"center"},children:[s.jsxs("div",{children:[s.jsx("div",{className:"author",children:s.jsxs("div",{className:"info",children:[s.jsx("span",{children:"Người vẽ"}),s.jsx("h6",{children:s.jsx("div",{className:"cursor-none",children:t==null?void 0:t.ownerName})})]})}),s.jsx("div",{className:"author",children:s.jsxs("div",{className:"info",children:[s.jsx("span",{children:"Cấp"}),s.jsx("h6",{children:s.jsx("div",{className:"cursor-none",children:t==null?void 0:t.level})})]})})]}),s.jsxs("div",{children:[s.jsx("div",{className:"author",children:s.jsxs("div",{className:"info",children:[s.jsx("span",{children:"Cuộc thi"}),s.jsx("h6",{children:s.jsx("div",{className:"cursor-none",children:t==null?void 0:t.contestName})})]})}),s.jsx("div",{className:"author",children:s.jsx("div",{className:"author",children:s.jsxs("div",{className:"info",children:[s.jsx("span",{children:"Thời gian nộp"}),s.jsx("h6",{children:s.jsx("div",{className:"price-details",children:Ds(t==null?void 0:t.submitTime)})})]})})})]})]}),s.jsxs("div",{className:"card-bottom style-explode justify-content-around mb-4",children:[s.jsxs("div",{className:"price w-50",children:[s.jsx("span",{children:"Tên chủ đề"}),s.jsx("div",{className:"price-details",children:s.jsx("h5",{children:t.topicName})})]}),s.jsxs("div",{className:"price w-50",children:[s.jsx("span",{children:"Mô tả"}),s.jsx("div",{className:"price-details",children:s.jsx("h5",{children:t==null?void 0:t.description})})]})]}),s.jsx(L,{to:`/Client-UI/history/${t.id}`,className:"view-history reload",children:"Xem lịch sử"})]},v)):s.jsx(_s,{ml:16,children:s.jsx("h2",{className:"centered-message-container",children:"Bạn chưa có tranh nào!"})})}),l<e.length&&s.jsx("div",{className:"btn-auction center",children:s.jsx(L,{to:"#",id:"load-more",className:"sc-button loadmore fl-button pri-3",onClick:S,children:s.jsx("span",{children:"Xem thêm"})})})]}),s.jsx(Ws,{paintingId:g,show:p,onHide:()=>u(!1)}),s.jsx(Ys,{showReject:m,onHide:()=>b(!1)})]})})},Qs=()=>s.jsx("div",{className:"explore",children:s.jsx("div",{className:"box-epxlore justify-content-start",children:Array(3).fill().map((i,e)=>s.jsxs("div",{className:"sc-card-product explode style2 mg-bt",children:[s.jsx("div",{className:"card-media",children:s.jsx(E,{width:"290px",height:"290px",radius:"16px"})}),s.jsx("div",{className:"card-title",children:s.jsx(E,{width:"100%",height:"30px",radius:"16px"})}),s.jsxs("div",{className:"meta-info",children:[s.jsxs("div",{className:"author",children:[s.jsx("div",{className:"avatar",children:s.jsx(E,{width:"40px",height:"40px",radius:"16px"})}),s.jsx("div",{className:"info",children:s.jsx(E,{width:"120px",height:"40px",radius:"16px"})})]}),s.jsx("div",{className:"tag",children:s.jsx(E,{width:"50px",height:"40px",radius:"16px"})})]}),s.jsx("div",{className:"card-bottom style-explode",children:s.jsx("div",{className:"price",children:s.jsx(E,{width:"132px",height:"45px",radius:"16px"})})})]},e))})}),Ys=({showReject:i,onHide:e})=>s.jsxs(A,{animation:!0,scrollable:!0,show:i,onHide:e,centered:!0,children:[s.jsx(A.Header,{closeButton:!0}),s.jsx(A.Body,{children:s.jsx("div",{className:"space-y-20 pd-40",children:s.jsx("h4",{className:"text-center font-weight-bold",children:"Tranh của bạn không thể chỉnh sửa sau khi nộp"})})})]}),Zs=i=>{var b,g;const e=i.data,{userInfo:n}=rs(h=>h.auth),{isLoading:l,isError:d,data:p,error:u}=cs("paintings/listpaintingbyaccountid",`${n.Id}`),m=(g=(b=p==null?void 0:p.data)==null?void 0:b.result)==null?void 0:g.list;return d?s.jsxs("span",{children:["Error: ",u.message]}):s.jsx("section",{className:"tf-explore tf-section",children:s.jsx("div",{className:"themesflat-container",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-xl-9 col-lg-9 col-md-12",children:s.jsx(Xs,{data:m,loading:l})}),s.jsx("div",{className:"col-xl-3 col-lg-3 col-md-12",children:s.jsx("div",{id:"side-bar",className:"side-bar style-3",children:(m==null?void 0:m.length)>0?e.map((h,j)=>s.jsx("div",{className:"widget widget-category mgbt-24 boder-bt",children:s.jsx("div",{className:"content-wg-category",children:s.jsx(Hs,{title:h.title,show:!0,children:s.jsx("form",{action:"#",children:h.content.map((S,O)=>s.jsxs("div",{children:[s.jsxs("label",{children:[S.field,s.jsx("input",{type:"checkbox",defaultChecked:S.checked}),s.jsx("span",{className:"btn-checkbox"})]}),s.jsx("br",{})]},O))})})})},j)):null})})]})})})},zs=[{id:1,title:"Bộ sưu tập",content:[{field:"Mùa xuân"},{field:"Mùa thu"}]}],ue=()=>s.jsxs("div",{children:[s.jsx(Fs,{}),s.jsxs("section",{className:"flat-title-page inner",children:[s.jsx("div",{className:"overlay"}),s.jsx("div",{className:"themesflat-container",children:s.jsx("div",{className:"row",children:s.jsxs("div",{className:"col-md-12",children:[s.jsx("div",{className:"page-title-heading mg-bt-12",children:s.jsx("h1",{className:"heading text-center",children:"TRANH CỦA TÔI"})}),s.jsx("div",{className:"breadcrumbs style2",children:s.jsxs("ul",{children:[s.jsx("li",{children:s.jsx(L,{to:"/Client-UI/",children:"Trang chủ"})}),s.jsx("li",{children:"Tranh của tôi"})]})})]})})})]}),s.jsx(Zs,{data:zs}),s.jsx(Ps,{})]});export{ue as default};
