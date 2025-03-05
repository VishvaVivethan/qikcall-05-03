"use strict";(self.webpackChunkapp_app=self.webpackChunkapp_app||[]).push([[606],{73606:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});n(65043);var r=n(44101),o=n(44227),a=n(80861),s=n(25104),i=n(96105),l=n(80475),c=n(90777),u=n(84709),d=n(34598),m=n(70579);const f=()=>(0,m.jsx)(r.s,{children:(0,m.jsx)(o.U,{xs:12,children:(0,m.jsxs)(a.E,{className:"mb-4",children:[(0,m.jsxs)(s.V,{children:[(0,m.jsx)("strong",{children:"React Tooltip"})," ",(0,m.jsx)("small",{children:"Basic example"})]}),(0,m.jsxs)(i.W,{children:[(0,m.jsx)("p",{className:"text-body-secondary small",children:"Hover over the links below to see tooltips:"}),(0,m.jsx)(d.Eb,{href:"components/tooltip",children:(0,m.jsxs)("p",{className:"text-body-secondary",children:["Tight pants next level keffiyeh",(0,m.jsx)(l.j,{content:"Tooltip text",children:(0,m.jsx)(c.K,{children:" you probably "})}),"haven'theard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american apparel",(0,m.jsx)(l.j,{content:"Tooltip text",children:(0,m.jsx)(c.K,{children:" have a "})}),"terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney''s cleanse vegan chambray. A really ironic artisan",(0,m.jsx)(l.j,{content:"Tooltip text",children:(0,m.jsx)(c.K,{children:" whatever keytar "})}),"scenester farm-to-table banksy Austin",(0,m.jsx)(l.j,{content:"Tooltip text",children:(0,m.jsx)(c.K,{children:" twitter handle "})}),"freegan cred raw denim single-origin coffee viral."]})}),(0,m.jsx)("p",{className:"text-body-secondary small",children:"Hover over the buttons below to see the four tooltips directions: top, right, bottom, and left. Directions are mirrored when using CoreUI in RTL."}),(0,m.jsxs)(d.Eb,{href:"components/tooltip",children:[(0,m.jsx)(l.j,{content:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",placement:"top",children:(0,m.jsx)(u.Q,{color:"secondary",children:"Tooltip on top"})}),(0,m.jsx)(l.j,{content:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",placement:"right",children:(0,m.jsx)(u.Q,{color:"secondary",children:"Tooltip on right"})}),(0,m.jsx)(l.j,{content:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",placement:"bottom",children:(0,m.jsx)(u.Q,{color:"secondary",children:"Tooltip on bottom"})}),(0,m.jsx)(l.j,{content:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",placement:"left",children:(0,m.jsx)(u.Q,{color:"secondary",children:"Tooltip on left"})})]})]})]})})})},25104:(e,t,n)=>{n.d(t,{V:()=>l});var r=n(22378),o=n(65043),a=n(65173),s=n.n(a),i=n(25196),l=(0,o.forwardRef)((function(e,t){var n=e.children,a=e.as,s=void 0===a?"div":a,l=e.className,c=(0,r.Tt)(e,["children","as","className"]);return o.createElement(s,(0,r.Cl)({className:(0,i.A)("card-header",l)},c,{ref:t}),n)}));l.propTypes={as:s().elementType,children:s().node,className:s().string},l.displayName="CCardHeader"},80475:(e,t,n)=>{n.d(t,{j:()=>p});var r=n(22378),o=n(65043),a=n(25196),s=n(65173),i=n.n(s),l=n(372),c=n(94462),u=n(26356),d=n(75232),m=n(66394),f=n(54633),p=(0,o.forwardRef)((function(e,t){var n=e.children,s=e.animation,i=void 0===s||s,d=e.className,p=e.container,h=e.content,v=e.delay,b=void 0===v?0:v,y=e.fallbackPlacements,g=void 0===y?["top","right","bottom","left"]:y,x=e.offset,j=void 0===x?[0,6]:x,w=e.onHide,T=e.onShow,E=e.placement,N=void 0===E?"top":E,k=e.trigger,C=void 0===k?["hover","focus"]:k,A=e.visible,P=(0,r.Tt)(e,["children","animation","className","container","content","delay","fallbackPlacements","offset","onHide","onShow","placement","trigger","visible"]),R=(0,o.useRef)(null),L=(0,o.useRef)(null),F=(0,c.E2)(t,R),S=(0,o.useRef)("tooltip".concat(Math.floor(1e6*Math.random()))),H=(0,u.E)(),V=H.initPopper,K=H.destroyPopper,M=H.updatePopper,Q=(0,o.useState)(!1),q=Q[0],B=Q[1],D=(0,o.useState)(A),O=D[0],U=D[1],_="number"===typeof b?{show:b,hide:b}:b,I={modifiers:[{name:"arrow",options:{element:".tooltip-arrow"}},{name:"flip",options:{fallbackPlacements:g}},{name:"offset",options:{offset:j}}],placement:(0,f.A)(N,L.current)};return(0,o.useEffect)((function(){U(A)}),[A]),(0,o.useEffect)((function(){return O&&(B(!0),R.current&&(R.current.classList.remove("fade","show"),K()),setTimeout((function(){L.current&&R.current&&(i&&R.current.classList.add("fade"),V(L.current,R.current,I),R.current.style.removeProperty("display"),R.current.classList.add("show"),T&&T())}),_.show)),function(){R.current&&(R.current.classList.remove("show"),w&&w(),(0,m.A)((function(){R.current&&(R.current.style.display="none"),K(),B(!1)}),R.current))}}),[O]),(0,o.useEffect)((function(){M()}),[h]),o.createElement(o.Fragment,null,o.cloneElement(n,(0,r.Cl)((0,r.Cl)((0,r.Cl)((0,r.Cl)((0,r.Cl)({},O&&{"aria-describedby":S.current}),{ref:L}),("click"===C||C.includes("click"))&&{onClick:function(){return U(!O)}}),("focus"===C||C.includes("focus"))&&{onFocus:function(){return U(!0)},onBlur:function(){return U(!1)}}),("hover"===C||C.includes("hover"))&&{onMouseEnter:function(){return U(!0)},onMouseLeave:function(){return U(!1)}})),o.createElement(l.Y,{container:p,portal:!0},q&&o.createElement("div",(0,r.Cl)({className:(0,a.A)("tooltip","bs-tooltip-auto",d),id:S.current,ref:F,role:"tooltip",style:{display:"none"}},P),o.createElement("div",{className:"tooltip-arrow"}),o.createElement("div",{className:"tooltip-inner"},h))))}));p.propTypes={animation:i().bool,children:i().node,container:i().any,content:i().oneOfType([i().string,i().node]),delay:i().oneOfType([i().number,i().shape({show:i().number.isRequired,hide:i().number.isRequired})]),fallbackPlacements:d.sS,offset:i().any,onHide:i().func,onShow:i().func,placement:i().oneOf(["auto","top","right","bottom","left"]),trigger:d.Us,visible:i().bool},p.displayName="CTooltip"},66394:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(48607),o=function(e){"function"===typeof e&&e()},a=function(e,t,n){if(void 0===n&&(n=!0),n){var a=(0,r.A)(t)+5,s=!1,i=function(n){n.target===t&&(s=!0,t.removeEventListener("transitionend",i),o(e))};t.addEventListener("transitionend",i),setTimeout((function(){s||t.dispatchEvent(new Event("transitionend"))}),a)}else o(e)}},54633:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(79438),o=function(e,t){switch(e){case"right":return(0,r.A)(t)?"left":"right";case"left":return(0,r.A)(t)?"right":"left";default:return e}}},48607:(e,t,n)=>{n.d(t,{A:()=>r});var r=function(e){if(!e)return 0;var t=window.getComputedStyle(e),n=t.transitionDuration,r=t.transitionDelay,o=Number.parseFloat(n),a=Number.parseFloat(r);return o||a?(n=n.split(",")[0],r=r.split(",")[0],1e3*(Number.parseFloat(n)+Number.parseFloat(r))):0}}}]);
//# sourceMappingURL=606.e4912461.chunk.js.map