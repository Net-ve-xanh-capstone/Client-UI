import{j as e,i as d,k as p,l as N,r as o,m as y,H as z,n as C,h as M,o as B}from"./index-BQMzp9Nc.js";const k="_card_abnce_5",S="_image_abnce_17",F="_card_content_abnce_44",P="_tag_list_abnce_56",w="_tag_abnce_56",I="_text_box_abnce_83",i={card:k,image:S,card_content:F,tag_list:P,tag:w,text_box:I};function R({blogList:s}){return e.jsx(e.Fragment,{children:s!=null&&s.length?s.map(t=>{var c,_,h;return e.jsxs("div",{className:i.card,children:[e.jsx("div",{className:i.image,children:e.jsx("img",{src:t.url,alt:t.title})}),e.jsxs("div",{className:i.card_content,children:[e.jsxs("div",{className:i.text_box,children:[e.jsx("h3",{children:((c=t.title)==null?void 0:c.length)>35?d(t.title,35)+"...":t.title}),e.jsx("p",{children:((_=t.description)==null?void 0:_.length)>200?d(t.description,200)+"...":t.description})]}),e.jsx("div",{className:i.tag_list,children:e.jsxs("div",{className:i.tag,children:[e.jsx("span",{style:{backgroundColor:"#9835FB"}}),e.jsx("h6",{style:{color:"#9835FB"},children:((h=t.categoryName)==null?void 0:h.length)>20?d(t.categoryName,20)+"...":t.categoryName})]})})]})]},t)}):""})}const E="_container_hero_14tb6_2",H="_heros_14tb6_10",$="_heros_title_14tb6_19",D="_search_box_14tb6_32",q="_btn_find_14tb6_46",T="_heros_image_14tb6_62",V="_box_image_14tb6_69",X="_borderMove_14tb6_1",A="_tagheros_14tb6_82",O="_hashtag_14tb6_95",U="_tag_list_14tb6_108",G="_icon_14tb6_117",J="_hashtag_card_14tb6_121",n={container_hero:E,heros:H,heros_title:$,search_box:D,btn_find:q,heros_image:T,box_image:V,borderMove:X,tagheros:A,hashtag:O,tag_list:U,icon:G,hashtag_card:J},K="/Client-UI/assets/herosBlog-Dg2okgbw.png";function Q({activeMoving:s}){return e.jsx("div",{className:n.container_hero,children:e.jsxs("div",{className:n.heros,children:[e.jsxs("div",{className:n.heros_title,children:[e.jsx("h1",{children:"Các bài viết hữu ích"}),e.jsx("p",{children:"Nét Vẽ Xanh thành phố Hồ Chí Minh hiện đang tiến bước trở thành một trong những trang đăng ký rộng mở nhất dành cho các bạn trẻ có mong muốn được thể hiện tài năng của mình."}),e.jsxs("div",{className:n.search_box,children:[e.jsx("p",{children:"Có rất nhiều cuộc thi đang chờ đợi các bạn, hãy tìm hiểu các cuộc thi bạn cần nhé !"}),e.jsx("div",{className:n.search,children:e.jsx("span",{className:n.btn_find,onClick:()=>s(),children:e.jsx("h5",{children:"Xem thêm các bài viết"})})})]})]}),e.jsx("div",{className:n.heros_image,children:e.jsx("div",{className:n.box_image,children:e.jsx("img",{src:K,alt:"Title"})})})]})})}var g={},W=N;Object.defineProperty(g,"__esModule",{value:!0});var b=g.default=void 0,Y=W(p()),Z=e;b=g.default=(0,Y.default)((0,Z.jsx)("path",{d:"M7 11H1v2h6zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12zM13 1h-2v6h2zm5.36 6.05-1.41-1.41-2.12 2.12 1.41 1.41zM17 11v2h6v-2zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3m2.83 7.24 2.12 2.12 1.41-1.41-2.12-2.12zm-9.19.71 1.41 1.41 2.12-2.12-1.41-1.41zM11 23h2v-6h-2z"}),"Flare");const L="_section_17eyd_5",ee="_left_side_17eyd_17",te="_right_side_17eyd_30",se="_sticky_17eyd_36",ne="_topic_17eyd_46",ce="_side_choose_17eyd_55",r={section:L,left_side:ee,right_side:te,sticky:se,topic:ne,side_choose:ce},ae=o.forwardRef((s,t)=>{const{children:c}=s;return e.jsxs("div",{className:r.section,ref:t,children:[e.jsx("div",{className:r.left_side,children:c}),e.jsx("div",{className:r.right_side,children:e.jsxs("div",{className:r.sticky,children:[e.jsxs("div",{className:r.topic,children:[e.jsx(b,{sx:{fontSize:"3rem",color:"#5142fc"}}),e.jsx("h3",{children:"Finding your post"})]}),e.jsxs("div",{className:r.side_choose,children:[e.jsx("input",{type:"text"}),e.jsx(y,{sx:{fontSize:"3rem",color:"#5142fc"}})]})]})})]})}),oe="_container_187un_1",ie="_subcontainer_187un_12",u={container:oe,subcontainer:ie};function _e(){const[s,t]=o.useState([]),[c,_]=o.useState(0),[h,j]=o.useState(1),x=o.useRef(null),f=()=>{var a;(a=x.current)==null||a.scrollIntoView({behavior:"smooth"})},v=(a,l)=>{j(l)},m=async()=>{await B(h).then(a=>{const l=a.data.result;_(l.totalPage),t(l.list)}).catch(a=>console.log(a))};return o.useEffect(()=>{m()},[]),o.useEffect(()=>{m()},[h]),e.jsxs("div",{className:"home-5",children:[e.jsx(z,{}),e.jsx("div",{className:u.container,children:e.jsxs("div",{className:u.subcontainer,children:[e.jsx(Q,{activeMoving:f}),e.jsx(ae,{ref:x,children:e.jsxs(e.Fragment,{children:[e.jsx(R,{blogList:s}),e.jsx(C,{count:c,color:"secondary",size:"large",onChange:v,sx:{width:"70%",display:"flex",justifyContent:"center",".MuiPaginationItem-text":{fontSize:"1.5rem"},".Mui-selected":{backgroundColor:"#5142fc !important",color:"white"}}})]})})]})}),e.jsx(M,{})]})}export{_e as default};
