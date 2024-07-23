var Z=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var r=(e,t,s)=>(Z(e,t,"read from private field"),s?s.call(e):t.get(e)),h=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},u=(e,t,s,i)=>(Z(e,t,"write to private field"),i?i.call(e,s):t.set(e,s),s);var l=(e,t,s)=>(Z(e,t,"access private method"),s);import{aq as Et,ar as m,as as tt,at as K,au as Qt,av as pt,aw as yt,ax as It,ay as xt,az as Dt,aA as bt,aB as Ct,r as w,aC as Ft,x as M}from"./index-t7M1JxVt.js";var y,a,L,p,Q,F,g,_,U,T,I,x,S,P,D,B,k,et,j,st,$,rt,z,it,N,at,V,nt,W,ot,q,Ot,mt,Ut=(mt=class extends Et{constructor(t,s){super();h(this,D);h(this,k);h(this,j);h(this,$);h(this,z);h(this,N);h(this,V);h(this,W);h(this,q);h(this,y,void 0);h(this,a,void 0);h(this,L,void 0);h(this,p,void 0);h(this,Q,void 0);h(this,F,void 0);h(this,g,void 0);h(this,_,void 0);h(this,U,void 0);h(this,T,void 0);h(this,I,void 0);h(this,x,void 0);h(this,S,void 0);h(this,P,new Set);this.options=s,u(this,y,t),u(this,g,null),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,a).addObserver(this),vt(r(this,a),this.options)?l(this,D,B).call(this):this.updateResult(),l(this,z,it).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ht(r(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ht(r(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,N,at).call(this),l(this,V,nt).call(this),r(this,a).removeObserver(this)}setOptions(t,s){const i=this.options,f=r(this,a);if(this.options=r(this,y).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof m(this.options.enabled,r(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");l(this,W,ot).call(this),r(this,a).setOptions(this.options),i._defaulted&&!tt(this.options,i)&&r(this,y).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,a),observer:this});const c=this.hasListeners();c&&Rt(r(this,a),f,this.options,i)&&l(this,D,B).call(this),this.updateResult(s),c&&(r(this,a)!==f||m(this.options.enabled,r(this,a))!==m(i.enabled,r(this,a))||K(this.options.staleTime,r(this,a))!==K(i.staleTime,r(this,a)))&&l(this,k,et).call(this);const n=l(this,j,st).call(this);c&&(r(this,a)!==f||m(this.options.enabled,r(this,a))!==m(i.enabled,r(this,a))||n!==r(this,S))&&l(this,$,rt).call(this,n)}getOptimisticResult(t){const s=r(this,y).getQueryCache().build(r(this,y),t),i=this.createResult(s,t);return Pt(this,i)&&(u(this,p,i),u(this,F,this.options),u(this,Q,r(this,a).state)),i}getCurrentResult(){return r(this,p)}trackResult(t,s){const i={};return Object.keys(t).forEach(f=>{Object.defineProperty(i,f,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(f),s==null||s(f),t[f])})}),i}trackProp(t){r(this,P).add(t)}getCurrentQuery(){return r(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=r(this,y).defaultQueryOptions(t),i=r(this,y).getQueryCache().build(r(this,y),s);return i.isFetchingOptimistic=!0,i.fetch().then(()=>this.createResult(i,s))}fetch(t){return l(this,D,B).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,p)))}createResult(t,s){var ft;const i=r(this,a),f=this.options,c=r(this,p),n=r(this,Q),d=r(this,F),C=t!==i?t.state:r(this,L),{state:O}=t;let o={...O},A=!1,b;if(s._optimisticResults){const v=this.hasListeners(),Y=!v&&vt(t,s),St=v&&Rt(t,i,s,f);(Y||St)&&(o={...o,...Dt(O.data,t.options)}),s._optimisticResults==="isRestoring"&&(o.fetchStatus="idle")}let{error:H,errorUpdatedAt:ct,status:E}=o;if(s.select&&o.data!==void 0)if(c&&o.data===(n==null?void 0:n.data)&&s.select===r(this,_))b=r(this,U);else try{u(this,_,s.select),b=s.select(o.data),b=bt(c==null?void 0:c.data,b,s),u(this,U,b),u(this,g,null)}catch(v){u(this,g,v)}else b=o.data;if(s.placeholderData!==void 0&&b===void 0&&E==="pending"){let v;if(c!=null&&c.isPlaceholderData&&s.placeholderData===(d==null?void 0:d.placeholderData))v=c.data;else if(v=typeof s.placeholderData=="function"?s.placeholderData((ft=r(this,T))==null?void 0:ft.state.data,r(this,T)):s.placeholderData,s.select&&v!==void 0)try{v=s.select(v),u(this,g,null)}catch(Y){u(this,g,Y)}v!==void 0&&(E="success",b=bt(c==null?void 0:c.data,v,s),A=!0)}r(this,g)&&(H=r(this,g),b=r(this,U),ct=Date.now(),E="error");const G=o.fetchStatus==="fetching",J=E==="pending",X=E==="error",lt=J&&G,dt=b!==void 0;return{status:E,fetchStatus:o.fetchStatus,isPending:J,isSuccess:E==="success",isError:X,isInitialLoading:lt,isLoading:lt,data:b,dataUpdatedAt:o.dataUpdatedAt,error:H,errorUpdatedAt:ct,failureCount:o.fetchFailureCount,failureReason:o.fetchFailureReason,errorUpdateCount:o.errorUpdateCount,isFetched:o.dataUpdateCount>0||o.errorUpdateCount>0,isFetchedAfterMount:o.dataUpdateCount>C.dataUpdateCount||o.errorUpdateCount>C.errorUpdateCount,isFetching:G,isRefetching:G&&!J,isLoadingError:X&&!dt,isPaused:o.fetchStatus==="paused",isPlaceholderData:A,isRefetchError:X&&dt,isStale:ut(t,s),refetch:this.refetch}}updateResult(t){const s=r(this,p),i=this.createResult(r(this,a),this.options);if(u(this,Q,r(this,a).state),u(this,F,this.options),r(this,Q).data!==void 0&&u(this,T,r(this,a)),tt(i,s))return;u(this,p,i);const f={},c=()=>{if(!s)return!0;const{notifyOnChangeProps:n}=this.options,d=typeof n=="function"?n():n;if(d==="all"||!d&&!r(this,P).size)return!0;const R=new Set(d??r(this,P));return this.options.throwOnError&&R.add("error"),Object.keys(r(this,p)).some(C=>{const O=C;return r(this,p)[O]!==s[O]&&R.has(O)})};(t==null?void 0:t.listeners)!==!1&&c()&&(f.listeners=!0),l(this,q,Ot).call(this,{...f,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,z,it).call(this)}},y=new WeakMap,a=new WeakMap,L=new WeakMap,p=new WeakMap,Q=new WeakMap,F=new WeakMap,g=new WeakMap,_=new WeakMap,U=new WeakMap,T=new WeakMap,I=new WeakMap,x=new WeakMap,S=new WeakMap,P=new WeakMap,D=new WeakSet,B=function(t){l(this,W,ot).call(this);let s=r(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(Qt)),s},k=new WeakSet,et=function(){l(this,N,at).call(this);const t=K(this.options.staleTime,r(this,a));if(pt||r(this,p).isStale||!yt(t))return;const i=It(r(this,p).dataUpdatedAt,t)+1;u(this,I,setTimeout(()=>{r(this,p).isStale||this.updateResult()},i))},j=new WeakSet,st=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,a)):this.options.refetchInterval)??!1},$=new WeakSet,rt=function(t){l(this,V,nt).call(this),u(this,S,t),!(pt||m(this.options.enabled,r(this,a))===!1||!yt(r(this,S))||r(this,S)===0)&&u(this,x,setInterval(()=>{(this.options.refetchIntervalInBackground||xt.isFocused())&&l(this,D,B).call(this)},r(this,S)))},z=new WeakSet,it=function(){l(this,k,et).call(this),l(this,$,rt).call(this,l(this,j,st).call(this))},N=new WeakSet,at=function(){r(this,I)&&(clearTimeout(r(this,I)),u(this,I,void 0))},V=new WeakSet,nt=function(){r(this,x)&&(clearInterval(r(this,x)),u(this,x,void 0))},W=new WeakSet,ot=function(){const t=r(this,y).getQueryCache().build(r(this,y),this.options);if(t===r(this,a))return;const s=r(this,a);u(this,a,t),u(this,L,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},q=new WeakSet,Ot=function(t){Ct.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(r(this,p))}),r(this,y).getQueryCache().notify({query:r(this,a),type:"observerResultsUpdated"})})},mt);function Tt(e,t){return m(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function vt(e,t){return Tt(e,t)||e.state.data!==void 0&&ht(e,t,t.refetchOnMount)}function ht(e,t,s){if(m(t.enabled,e)!==!1){const i=typeof s=="function"?s(e):s;return i==="always"||i!==!1&&ut(e,t)}return!1}function Rt(e,t,s,i){return(e!==t||m(i.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&ut(e,s)}function ut(e,t){return m(t.enabled,e)!==!1&&e.isStaleByTime(K(t.staleTime,e))}function Pt(e,t){return!tt(e.getCurrentResult(),t)}var wt=w.createContext(!1),At=()=>w.useContext(wt);wt.Provider;function Mt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var Bt=w.createContext(Mt()),Lt=()=>w.useContext(Bt);function _t(e,t){return typeof e=="function"?e(...t):!!e}var kt=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},jt=e=>{w.useEffect(()=>{e.clearReset()},[e])},$t=({result:e,errorResetBoundary:t,throwOnError:s,query:i})=>e.isError&&!t.isReset()&&!e.isFetching&&i&&_t(s,[e.error,i]),zt=e=>{e.suspense&&typeof e.staleTime!="number"&&(e.staleTime=1e3)},Nt=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Vt=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function Wt(e,t,s){var C,O,o,A;const i=Ft(),f=At(),c=Lt(),n=i.defaultQueryOptions(e);(O=(C=i.getDefaultOptions().queries)==null?void 0:C._experimental_beforeQuery)==null||O.call(C,n),n._optimisticResults=f?"isRestoring":"optimistic",zt(n),kt(n,c),jt(c);const[d]=w.useState(()=>new t(i,n)),R=d.getOptimisticResult(n);if(w.useSyncExternalStore(w.useCallback(b=>{const H=f?()=>{}:d.subscribe(Ct.batchCalls(b));return d.updateResult(),H},[d,f]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),w.useEffect(()=>{d.setOptions(n,{listeners:!1})},[n,d]),Nt(n,R))throw Vt(n,d,c);if($t({result:R,errorResetBoundary:c,throwOnError:n.throwOnError,query:i.getQueryCache().get(n.queryHash)}))throw R.error;return(A=(o=i.getDefaultOptions().queries)==null?void 0:o._experimental_afterQuery)==null||A.call(o,n,R),n.notifyOnChangeProps?R:d.trackResult(R)}function Ht(e,t){return Wt(e,Ut)}const gt={fetchAll:async e=>await M.get(e),getById:async(e,t)=>await M.get(`${e}/${t}`),create:async(e,t)=>await M.post(e,t),update:async(e,t)=>await M.put(e,t),delete:async(e,t)=>await M.delete(`${e}/${t}`)},Kt=async(e,t)=>{let s=null;if(t?s=await gt.getById(e,t):s=await gt.fetchAll(e),s.status===200)return s;throw new Error("Network response was not ok")},Xt=(e,t)=>Ht({queryKey:[e],queryFn:async()=>await Kt(e,t),retry:3});export{gt as m,Xt as u};
