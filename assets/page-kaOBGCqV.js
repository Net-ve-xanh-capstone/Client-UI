import{r as a,j as t,Q as p,t as O}from"./index-WK5Y_eAK.js";import{T as w,M as S}from"./index-QtjqVTtZ.js";import{u as M,b as A,c as H,d as z}from"./categoryApi-D-MV4UdX.js";import{S as E}from"./Transition-Dd9lD4t4.js";import{M as h}from"./Modal-Cdo0UoJo.js";import{B as N}from"./Button-BHlyCmGg.js";import"./Paper-CbiWj1zl.js";import"./ButtonBase-BQ82lSln.js";import"./Tooltip-D9H17N7g.js";import"./FormGroup-CQLDB0-G.js";import"./createSvgIcon-D1Fl7GsO.js";import"./createSvgIcon-Bfd-VzuJ.js";import"./Grid-BXGNVnnl.js";import"./LastPage-CYf4MBib.js";import"./Close-PI5ZcNX5.js";import"./Search-7Vt-NraF.js";import"./index-Zr6dffOW.js";import"./removeClass-D0mFdbeO.js";const I="_box_eroz7_1",R="_title_eroz7_17",U="_input_box_eroz7_21",X="_txt_input_eroz7_30",D="_btn_eroz7_46",F="_btn_find_eroz7_53",s={box:I,title:R,input_box:U,txt_input:X,btn:D,btn_find:F};function k({handleClose:m,fetchData:g,isEdit:r=!1,idCategory:b,textCategory:j,setOpenEdit:_}){const[i,x]=a.useState(`${r?j:""}`),l=e=>{for(const o in e)if(e[o]===""||e[o]===null)return!1;return!0},c=async()=>{const e={id:b,name:i,currentUserId:"3fa85f64-5717-4562-b3fc-2c963f66afa6"};l(e)?await M(e).then(()=>{p.success("Đã cập nhật thành công",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),g(),_(null)}).catch(o=>console.log(o)):p.error("Xin hãy điền đầy đủ thông tin !!!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},y=async()=>{const e={currentUserId:"c4c9fb26-344a-44cb-ad18-6fc2d2604c4c",name:i};l(e)?await A(e).then(()=>{p.success("Đã Thêm mới thành công",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),g(),m(null)}).catch(o=>console.log(o)):p.error("Xin hãy điền đầy đủ thông tin !!!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},C=()=>{m(null),_(null)};return t.jsxs("div",{className:s.box,children:[t.jsx("h2",{className:`tf-title pb-20 ${s.title}`,children:r?"Chỉnh sửa thể loại":"Thêm mới thể loại"}),t.jsx("div",{className:s.input_box,children:t.jsx("input",{type:"text",value:i,onChange:e=>x(e.target.value),className:s.txt_input})}),t.jsxs("div",{className:s.btn,children:[t.jsx("span",{className:s.btn_find,onClick:()=>C(),children:t.jsx("h5",{children:"Cancel"})}),r?t.jsx("span",{className:s.btn_find,onClick:()=>c(),children:t.jsx("h5",{children:"Save"})}):t.jsx("span",{className:s.btn_find,onClick:()=>y(),children:t.jsx("h5",{children:"Add"})})]})]})}const L="_container_13h6b_1",$="_main_title_13h6b_15",Q="_section_13h6b_19",V="_card_13h6b_29",W="_addmore_13h6b_45",G="_btnAction_13h6b_60",q="_icon_13h6b_69",J="_btnCreate_13h6b_74",K="_buttonContainer_13h6b_134",u={container:L,main_title:$,section:Q,card:V,addmore:W,btnAction:G,icon:q,btnCreate:J,buttonContainer:K};function bt(){const[m,g]=a.useState([]),[r,b]=a.useState(null),[j,_]=a.useState(""),[i,x]=a.useState(null),[l,c]=a.useState(null),[y,C]=a.useState(null),e=()=>O({typography:{fontSize:20},palette:{background:{default:"#0f172a"},mode:"light"},components:{MuiTableCell:{styleOverrides:{head:{padding:"10px 10px",fontWeight:"bold",borderBottom:"1px solid black"},body:{color:"#000",fontWeight:"bold",borderBottom:"1px solid black"}}}}}),o=[{name:"name",label:"TÊN THỂ LOẠI",options:{customBodyRender:n=>t.jsx("span",{children:n})}},{name:"id",label:"TƯƠNG TÁC",options:{customBodyRender:(n,d)=>t.jsxs("div",{className:u.btnAction,children:[t.jsx("button",{className:"btn btn-info btn-lg",onClick:()=>{B(n,d.rowData[0])},children:"Sữa"}),t.jsx("button",{onClick:()=>{C(n),x(!0)},className:"btn btn-danger btn-lg",children:"Xóa"})]})}}],T={selectableRows:"none",elevation:5,rowsPerPage:5,rowsPerPageOptions:[5,10,20,30],responsive:"standard",print:!1,download:!1,filter:!1},B=(n,d)=>{b(n),_(d)},f=async()=>{await H().then(n=>{const d=n.data.result;g(d)}).catch(n=>console.log(n))},P=async()=>{await z(y).then(()=>{p.success("Đã xoá thành công !!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),f(),v()}).catch(n=>console.log(n))},v=()=>{x(!1),C(null)};return a.useEffect(()=>{f()},[]),t.jsxs("div",{className:u.container,children:[!(l||r!==null)&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:u.buttonContainer,children:t.jsx("button",{className:u.btnCreate,onClick:()=>c(!0),children:t.jsx("span",{children:"Tạo Thể Loại"})})}),t.jsx(E,{injectFirst:!0,children:t.jsx(w,{theme:e(),children:t.jsx("div",{className:u.tableContainer,children:t.jsx(S,{title:"Quản lý thể loại",data:m,columns:o,options:T})})})})]}),l&&t.jsx(k,{handleClose:c,fetchData:f}),r!==null&&t.jsx(k,{isEdit:!0,handleClose:c,fetchData:f,idCategory:r,textCategory:j,setOpenEdit:b}),t.jsxs(h,{show:i,onHide:v,children:[t.jsx(h.Header,{closeButton:!0,children:t.jsx(h.Title,{children:"Xoá thể loại"})}),t.jsx(h.Body,{children:"Bạn có chắc là sẽ xoá thể loại này không ?"}),t.jsxs(h.Footer,{children:[t.jsx(N,{variant:"secondary",onClick:v,children:"Cancel"}),t.jsx(N,{variant:"primary",onClick:P,children:"Confirm"})]})]})]})}export{bt as default};
