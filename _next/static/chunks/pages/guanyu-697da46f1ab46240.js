(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[959],{1125:function(n,r,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/guanyu",function(){return e(5663)}])},3713:function(n,r,e){"use strict";e.d(r,{xF:function(){return u},gX:function(){return a},Sk:function(){return d},W3:function(){return f}});var t,i=e(1558),c="IPA",l=Object.fromEntries(i.rawItems.filter((function(n){return n.\u865f})).map((function(n){return[n.\u89c4\u8303.\u8bfb.format(c),n]}))),s=function(n){return l[o(n)]},u=function(n){return!!s(n.\u8bfb.format(c))},a=function(n){var r=s(n.\u8bfb.format(c));return!r||!r.\u865f||r.\u5143.disabled||r.\u5143.flawed},o=function(n){return null===n||void 0===n?void 0:n.replace(/\u02bb/g,"\u02b0").replace("\u02a8","t\u0255").replace("\u02a6","ts").replace("z","\u0290").replace("\u0264","\u0259").replace("\u0278","f").replace("\u0264\u0303","e\u0303").replace("\u0279","\u0290").replace("\u0235\u030d","n").replace("\u0258","\u0259").replace("a\u0303","an").replace("l\u0303","l")},d=function(n){var r,e="number"===typeof n?n:null===(r=s(o(n)))||void 0===r?void 0:r.\u865f;if(e){var i="".concat("/xiangyin","/audio/syllables/F").concat(String(e).padStart(5,"0"),".mp3");t?(t.pause(),t.src=i):t=new Audio(i),Promise.resolve(t.play()).catch((function(){}))}},f=function(n){d(n.\u8bfb.format(c))}},5663:function(n,r,e){"use strict";e.r(r),e.d(r,{default:function(){return _}});var t=e(5893),i=e(312),c=e(6723),l=e(8527),s=e(9042),u=e(949),a=e(7294),o=e(3882),d=e(3869),f=e(3713),h=e(3171),x=e(7438);function p(n,r){(null==r||r>n.length)&&(r=n.length);for(var e=0,t=new Array(r);e<r;e++)t[e]=n[e];return t}function j(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var t,i,c=[],l=!0,s=!1;try{for(e=e.call(n);!(l=(t=e.next()).done)&&(c.push(t.value),!r||c.length!==r);l=!0);}catch(u){s=!0,i=u}finally{try{l||null==e.return||e.return()}finally{if(s)throw i}}return c}}(n,r)||function(n,r){if(!n)return;if("string"===typeof n)return p(n,r);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return p(n,r)}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var m=function(n){var r=n.syllable,e=function(){(0,f.Sk)(r)};return(0,t.jsx)(c.zx,{display:"inline-flex",minWidth:"auto",height:"1.5em",p:"0","aria-label":"\u64ad\u653e",variant:"unstyled",rightIcon:(0,t.jsx)(h.eU,{}),onPointerEnter:e,onClick:e})},y=[1,2,3,4,5,6],T=Object.fromEntries(y.map((function(n){return[n,(0,o.L)(n)]}))),v=[["\u4f8b\u5b57\u7532","t\u0255","y","\u732a\u9664\u4e3b\u53e5\u4f4f\u6a58"],["\u4f8b\u5b57\u4e59","t\u0255","i","\u673a\u671f\u51e0\u8bb0\u5f9b\u6781"]],g=function(){var n=(0,a.useContext)(x.cT).pinyinType;return(0,t.jsx)(l.xu,{children:(0,t.jsx)(s.iA,{size:"xs",css:{th:{whiteSpace:"nowrap"}},children:(0,t.jsxs)(s.p3,{children:[(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:"\u8c03\u540d"}),y.map((function(n){return(0,t.jsx)(s.Th,{children:T[n].\u8c03\u540d},n)}))]}),(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:"\u516d\u4f4d\u6b21\u5e8f"}),y.map((function(n){return(0,t.jsx)(s.Td,{children:n},n)}))]}),(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:"\u516b\u4f4d\u6b21\u5e8f"}),y.map((function(n){return(0,t.jsx)(s.Td,{children:T[n].\u8c03\u53f7},n)}))]}),(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:"\u8c03\u503c"}),y.map((function(n){return(0,t.jsx)(s.Td,{children:T[n].\u8c03\u503c},n)}))]}),(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:"\u8c03\u7b26"}),y.map((function(n){return(0,t.jsx)(s.Td,{fontFamily:"ipa",fontSize:"xl",children:T[n].\u8c03\u7b26},n)}))]}),v.map((function(r){var e=j(r,4),i=e[0],c=e[1],u=e[2],a=e[3];return(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Th,{children:i}),Array.from(a).map((function(r,e){return(0,t.jsx)(s.Td,{children:(0,t.jsxs)(l.kC,{alignItems:"center",children:[(0,t.jsxs)("ruby",{children:[r,(0,t.jsx)("rt",{children:(0,o.P)(c,u,e+1,r).\u8bfb[n].\u97f3})]}),(0,t.jsx)(m,{syllable:c+u+(e+1)})]})},r)}))]},i)}))]})})})},w=function(n){return""===n?"\u2205":n},b=["\u300a\u6e58\u97f3\u68c0\u5b57\u300b","\u300a\u957f\u6c99\u8bdd\u97f3\u6863\u300b","\u300a\u6c49\u8bed\u65b9\u97f3\u5b57\u6c47\u300b","\u300c\u6e58\u62fc\u3007\u300d"],S=d.dw[0].map((function(n,r){return new Set(d.dw.map((function(n){return n[r]})).filter((function(n){return null!==n}))).size})),z=d.EE[0].map((function(n,r){return new Set(d.EE.map((function(n){return n[r]})).filter((function(n){return null!==n}))).size})),E=function(){var n="dark"===u.If().colorMode?"gray.800":"white";return(0,t.jsxs)(l.MI,{width:"100%",columns:2,spacing:12,sx:{th:{position:"sticky",top:0,bg:n,fontSize:"md",verticalAlign:"bottom"},"th div":{display:"inline"},"@media(max-width: 1000px)":{"th div":{display:"block"},"th div:first-of-type, th div:last-of-type":{marginLeft:".3em",width:"1em",height:"1em",transform:"rotate(90deg)"}}},children:[(0,t.jsx)(l.xu,{children:(0,t.jsxs)(s.iA,{variant:"simple",size:"xs",fontSize:"large",children:[(0,t.jsx)(s.Rn,{fontSize:"large",placement:"top",children:"\u58f0\u6bcd"}),(0,t.jsx)(s.hr,{children:(0,t.jsx)(s.Tr,{children:b.map((function(n,r){return(0,t.jsx)(s.Th,{children:Array.from(n).map((function(n){return(0,t.jsx)(l.xu,{children:n},n)}))},r)}))})}),(0,t.jsxs)(s.p3,{fontFamily:"ipa",children:[(0,t.jsx)(s.Tr,{children:b.map((function(n,r){return(0,t.jsx)(s.Td,{children:S[r]},r)}))}),d.dw.map((function(n,r){var e=j(n,4),i=e[0],c=e[1],l=e[2],u=e[3];return(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Td,{children:w(i)}),(0,t.jsx)(s.Td,{children:w(c)}),(0,t.jsx)(s.Td,{children:w(l)}),(0,t.jsx)(s.Td,{children:w(u)})]},r)}))]})]})}),(0,t.jsx)(l.xu,{children:(0,t.jsxs)(s.iA,{variant:"simple",size:"xs",fontSize:"large",children:[(0,t.jsx)(s.Rn,{fontSize:"large",placement:"top",children:"\u97f5\u6bcd"}),(0,t.jsx)(s.hr,{children:(0,t.jsx)(s.Tr,{children:b.map((function(n,r){return(0,t.jsx)(s.Th,{children:Array.from(n).map((function(n){return(0,t.jsx)(l.xu,{children:n},n)}))},r)}))})}),(0,t.jsxs)(s.p3,{fontFamily:"ipa",children:[(0,t.jsx)(s.Tr,{children:b.map((function(n,r){return(0,t.jsx)(s.Td,{children:z[r]},r)}))}),d.EE.map((function(n,r){var e=j(n,4),i=e[0],c=e[1],l=e[2],u=e[3];return(0,t.jsxs)(s.Tr,{children:[(0,t.jsx)(s.Td,{children:i}),(0,t.jsx)(s.Td,{children:c}),(0,t.jsx)(s.Td,{children:l}),(0,t.jsx)(s.Td,{children:u})]},r)}))]})]})})]})},A=function(){return(0,t.jsxs)(l.xu,{children:[(0,t.jsxs)(l.xv,{children:["\u957f\u6c99\u8bdd\u4e2d\u7684\u4e00\u4e9b\u65b9\u8a00\u7528\u5b57\u53ef\u53c2\u8003\uff1a",(0,t.jsx)(l.rU,{isExternal:!0,color:"teal",href:"https://fangyanzi.vercel.app/?group=%E6%B9%98",children:"https://fangyanzi.vercel.app/?group=\u6e58"})]}),(0,t.jsx)(l.X6,{my:8,fontSize:"xl",children:"\u6536\u5b57\u60c5\u51b5"}),(0,t.jsxs)(l.QI,{mt:4,children:[(0,t.jsx)(l.HC,{children:"\u300a\u6e58\u97f3\u68c0\u5b57\u300b1937 \u6536\u5b57\u7ea6 13543"}),(0,t.jsx)(l.HC,{children:"\u300a\u957f\u6c99\u8bdd\u97f3\u6863\u300b1997 \u6536\u5b57\u7ea6 3696"}),(0,t.jsx)(l.HC,{children:"\u300a\u6c49\u8bed\u65b9\u97f3\u5b57\u6c47\u300b2003 \u6536\u5b57\u7ea6 3340"})]}),(0,t.jsx)(l.X6,{my:8,fontSize:"xl",children:"\u58f0\u8c03\u8868"}),(0,t.jsx)(g,{}),(0,t.jsx)(l.X6,{mt:8,fontSize:"xl",children:"\u58f0\u97f5\u8868"}),(0,t.jsx)(E,{})]})};var _=function(n){n=null!==n?n:function(n){throw n}(new TypeError("Cannot destructure undefined"));return(0,t.jsx)(i.Z,{children:(0,t.jsx)(A,{})})}}},function(n){n.O(0,[13,556,148,287,774,888,179],(function(){return r=1125,n(n.s=r);var r}));var r=n.O();_N_E=r}]);