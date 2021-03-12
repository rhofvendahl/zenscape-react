(this["webpackJsonpzenscape-react"]=this["webpackJsonpzenscape-react"]||[]).push([[0],{14:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var c=n(4),a=n.n(c),o=n(3),r=n(0),s=(n(14),n(1)),i=function(e){return Object(s.jsx)("div",{className:"stripe",children:Object(s.jsxs)("div",{className:"stripe-contents",children:[Object(s.jsx)("div",{className:"stripe-logo",children:"ZS"}),Object(s.jsx)("button",{className:"controls-toggle",onClick:function(){return e.toggleControls()},children:"[controls]"})]})})},l=n(5),u=(n(19),20),d=20,h=20,j=5,b=100,f=1,O=1,m=1,g={MIN:10,MAX:40},x={MIN:.25,MAX:2},p={MIN:.5,MAX:2},v={MIN:.1,MAX:10},N=(n(20),function(e){var t=e.className,n=e.handlers,c=e.values,a=e.reset;return Object(s.jsx)("div",{className:t,children:Object(s.jsxs)("div",{className:"controls-contents",children:[Object(s.jsxs)("div",{className:"control control-size",children:[Object(s.jsx)("div",{className:"control-label",children:"size"}),Object(s.jsx)(l.a,{onChange:n.onSizeChange,value:c.size,step:.01,min:g.MIN,max:g.MAX})]}),Object(s.jsxs)("div",{className:"control control-height",children:[Object(s.jsx)("div",{className:"control-label",children:"height"}),Object(s.jsx)(l.a,{onChange:n.onHeightChange,value:c.height,step:.01,min:x.MIN,max:x.MAX})]}),Object(s.jsxs)("div",{className:"control control-width",children:[Object(s.jsx)("div",{className:"control-label",children:"width"}),Object(s.jsx)(l.a,{onChange:n.onWidthChange,value:c.width,step:.01,min:p.MIN,max:p.MAX})]}),Object(s.jsxs)("div",{className:"control control-speed",children:[Object(s.jsx)("div",{className:"control-label",children:"speed"}),Object(s.jsx)(l.a,{onChange:n.onSpeedChange,value:c.speed,step:.01,min:v.MIN,max:v.MAX})]}),Object(s.jsx)("div",{className:"controls-reset",onClick:function(){return a()},children:"[reset]"})]})})}),C=function(e){var t=e.translate,n=e.rotate,c=e.width,a=e.height,o=e.backgroundColor,r=e.borderRadius,i="translate3d(".concat(t.x,"px, ").concat(t.y,"px, ").concat(t.z,"px)")+" rotateX(".concat(n.x,"deg) rotateY(").concat(n.y,"deg) rotateZ(").concat(n.z,"deg)");return Object(s.jsx)("div",{className:"face object",style:{width:c,height:a,marginLeft:-c/2,marginTop:-a/2,transform:i,backgroundColor:o,borderRadius:r}})},w=function(e){var t=e.boxName,n=e.handleClick,c=e.pallete,a=e.dimensions,o=e.coordinates,r=e.roundCorners,i=a.y/8+"px";return Object(s.jsxs)("div",{className:"".concat(t," box object"),onMouseDown:n,children:[Object(s.jsx)(C,{backgroundColor:c.light,width:a.x,height:a.z,translate:{x:o.x+a.x/2,y:-(o.y+a.y),z:o.z+a.z/2},rotate:{x:90,y:0,z:0},borderRadius:"".concat(r.backTopLeft?i:"0"," ").concat(r.backTopRight?i:"0"," 0 0")}),Object(s.jsx)(C,{backgroundColor:c.medium,width:a.x,height:a.y,translate:{x:o.x+a.x/2,y:-(o.y+a.y/2),z:o.z+a.z},rotate:{x:0,y:0,z:0},borderRadius:"0 0 ".concat(r.frontBottomRight?i:"0"," ").concat(r.frontBottomLeft?i:"0")})]})},M={WATER:{light:"#4081F2",medium:"#346dC7",dark:"#275799"},SAND:{light:"#FFF089",medium:"#C1B367",dark:"#817847"},FOLIAGE:{light:"#2AA330",medium:"#1F8C28",dark:"#106E1F"},ROCK:{light:"#BEBEBE",medium:"#8E8E8E",dark:"#606060"},SNOW:{light:"#FFFFFF",medium:"#BEBEBE",dark:"#7F7F7F"},BASE:{light:"#9D9D9D",medium:"#7F7F7F",dark:"#4E4E4E"}},k=function(e){for(var t=e.scapeMap,n=e.cellSize,c=e.handleClick,a=[],o=0;o<t.length;o++)for(var r=function(e){var r,i=o+"-"+e,l={backTopLeft:0==o&&0==e||t[o][e],backTopRight:o==t.length-1&&0==e||t[o][e],frontBottomLeft:0==o&&e==t[0].length-1||t[o][e],frontBottomRight:o==t.length-1&&e==t[0].length-1||t[o][e]};a.push(Object(s.jsx)(w,{boxName:i,dimensions:{x:n,y:n,z:n},coordinates:{x:o*n,y:t[o][e]*n,z:e*n},handleClick:function(){return c(i)},pallete:(r=t[o][e],r<=.2*3?M.WATER:r<=.3*3?M.SAND:r<=.6*3?M.FOLIAGE:r<=3?M.ROCK:M.SNOW),roundCorners:l},i))},i=0;i<t[0].length;i++)r(i);return Object(s.jsxs)("div",{className:"scape object",style:{marginLeft:-t.length*n/2+"px",marginTop:-t[0].length*n/2+"px",transform:"rotateX(-30deg)",top:"50%"},children:[a,Object(s.jsx)(w,{className:"base",dimensions:{x:t.length*n,y:n,z:t[0].length*n},coordinates:{x:0,y:1.5*-n,z:0},pallete:M.BASE,roundCorners:{backTopLeft:!0,backTopRight:!0,frontBottomLeft:!0,frontBottomRight:!0}})]})},z=(n(21),function(e){var t=e.xCells,n=e.zCells,c=e.cellSize,a=e.clickMemory,i=e.updateInterval,l=e.wave,u=Object(r.useState)([[5,6,Date.now()],[5,6,Date.now()],[14,14,Date.now()+500],[16,4,Date.now()+1e3]]),d=Object(o.a)(u,2),h=d[0],j=d[1],b=Object(r.useState)(new Array(t).fill(0).map((function(){return new Array(n).fill(0)}))),f=Object(o.a)(b,2),O=f[0],m=f[1],g=Object(r.useCallback)((function(){for(var e=new Array(t).fill(0).map((function(){return new Array(n).fill(0)})),c=0;c<e.length;c++)for(var o=0;o<e[0].length;o++)for(var r=0;r<a&&r<h.length;r++){var s=h[h.length-1-r],i=(Date.now()-s[2])/1e3,u=Math.pow(Math.pow(c-s[0],2)+Math.pow(o-s[1],2),.5),d=Math.abs(u/2-i*l.speed)/l.width;d<Math.PI&&(e[c][o]+=(Math.cos(d)+1)/2*l.height)}m(e)}),[a,h,t,n,l]),x=Object(r.useRef)(g);return Object(r.useEffect)((function(){x.current=g}),[g,t,n]),Object(r.useEffect)((function(){var e=setInterval((function(){x.current()}),i);return function(){clearInterval(e)}}),[i]),Object(s.jsx)("div",{className:"scape-manager",children:Object(s.jsx)(k,{cellSize:c,handleClick:function(e){return function(e){var t=[parseInt(e.split("-")[0]),parseInt(e.split("-")[1]),Date.now()];j(h.concat([t]))}(e)},scapeMap:O})})}),S=(n(22),function(){var e=Object(r.useState)(u),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(d),l=Object(o.a)(a,2),g=l[0],x=l[1],p=Object(r.useState)(h),v=Object(o.a)(p,2),C=v[0],w=v[1],M=Object(r.useState)(j),k=Object(o.a)(M,2),S=k[0],y=(k[1],Object(r.useState)(b)),E=Object(o.a)(y,2),A=E[0],F=(E[1],Object(r.useState)(f)),I=Object(o.a)(F,2),R=I[0],B=I[1],D=Object(r.useState)(O),T=Object(o.a)(D,2),L=T[0],X=T[1],W=Object(r.useState)(m),G=Object(o.a)(W,2),H=G[0],J=G[1],K=Object(r.useState)(null),Z=Object(o.a)(K,2),P=Z[0],Y=Z[1],q=Object(r.useState)(!1),Q=Object(o.a)(q,2),U=Q[0],V=Q[1],$=Object(r.useRef)(P);Object(r.useEffect)((function(){$.current=P}),[P]);var _=Object(r.useCallback)((function(){var e=P;Y(!e),e?V(!1):setTimeout((function(){$.current&&V(!0)}),1e3)}),[P]),ee=Object(r.useRef)(_);Object(r.useEffect)((function(){ee.current=_}),[_]),Object(r.useEffect)((function(){setTimeout((function(){null==$.current&&ee.current()}),2e3)}),[]);var te={onSizeChange:function(e){w(Math.round(400/e)),c(Math.round(e)),x(Math.round(e))},onHeightChange:function(e){B(e)},onWidthChange:function(e){X(e)},onSpeedChange:function(e){J(e)}};return Object(s.jsxs)("div",{className:"app",children:[Object(s.jsxs)("div",{className:"viewport",children:[Object(s.jsx)(i,{toggleControls:_}),Object(s.jsx)(z,{xCells:n,zCells:g,cellSize:C,clickMemory:S,updateInterval:A,wave:{height:R,width:L,speed:H}}),Object(s.jsx)("div",{className:"guide-wrapper",children:Object(s.jsx)("div",{className:"guide",children:"^ click scape ^"})})]}),Object(s.jsx)(N,{className:function(){var e="controls";return U?"controls controls-removed":null==P?"controls controls-initial":P?"controls controls-hidden":e}(),handlers:te,values:{size:n,height:R,width:L,speed:H},reset:function(){c(u),x(d),w(h),B(f),X(O),J(m)}})]})});n(23);a.a.render(Object(s.jsx)(S,{}),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.bae991fc.chunk.js.map