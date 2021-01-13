(this.webpackJsonpwiliot=this.webpackJsonpwiliot||[]).push([[0],{169:function(t,e,s){},170:function(t,e,s){},304:function(t,e,s){"use strict";s.r(e);var a=s(6),c=s(0),r=s.n(c),n=s(48),i=s.n(n),o=s(20),d=s(157),j=s(77),l=s(78),b=s(84),h=s(83),p=(s(169),function(t){Object(b.a)(s,t);var e=Object(h.a)(s);function s(){return Object(j.a)(this,s),e.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){var t=this.props.status,e=t.server,s=t.info,c=t.error?"fail":"good";return Object(a.jsxs)("footer",{children:[Object(a.jsxs)("span",{children:["Copyright: ",Object(a.jsx)("span",{className:"primary",children:"\xa9 Wiliot, 2021\xa0\xa0"})]}),Object(a.jsxs)("span",{children:["Status: ",Object(a.jsxs)("span",{className:c,children:[s,"\xa0"]})]}),Object(a.jsxs)("span",{children:["Server: ",Object(a.jsxs)("span",{className:"primary",children:[e,"\xa0"]})]})]})}}]),s}(c.Component)),O=s(312),u=s(310),f=s(309),x=s(154),m=s(155),g=s(65),k=s(67),v=s(158),y=(s(170),function(t){Object(b.a)(s,t);var e=Object(h.a)(s);function s(t){var a;return Object(j.a)(this,s),(a=e.call(this,t)).draw=function(){if(a.state.id1.data<=100&&a.state.id2.data<=100){var t=Object(d.a)(a.state.graphArr);t.shift(),t.push({legend:t.length+1,ID1:a.state.id1.data,ID2:a.state.id2.data}),a.setState({graphArr:t.map((function(t,e){return Object(o.a)(Object(o.a)({},t),{},{legend:(e+1).toString()})}))})}},a.hundred=function(t){if(t>100)return"warning"},a.state={socket:"ws://localhost:8999",messages:[],id1:{},id2:{},graphArr:Array(10).fill({legend:void 0,ID1:void 0,ID2:void 0}),status:{server:"",info:"",error:!1}},a}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var t=this;this.socket=new WebSocket(this.state.socket),this.setState({status:Object(o.a)(Object(o.a)({},this.state.status),{},{server:this.state.socket})}),this.socket.onopen=function(){t.setState({status:Object(o.a)(Object(o.a)({},t.state.status),{},{info:"Connected",error:!1})})},this.socket.onmessage=function(e){var s=JSON.parse(e.data);t.setState({messages:s}),t.setState({id1:s[0]}),t.setState({id2:s[1]}),t.draw()},this.socket.onerror=function(e){t.setState({status:Object(o.a)(Object(o.a)({},t.state.status),{},{info:"Socket encountered error: ".concat(e.message,". Closing socket"),error:!0})}),t.socket.close()},this.socket.onclose=function(e){e.wasClean?t.setState({status:Object(o.a)(Object(o.a)({},t.state.status),{},{info:"Socket was closed clearly, code=".concat(e.code),error:!0})}):t.setState({status:Object(o.a)(Object(o.a)({},t.state.status),{},{info:"The connection was lost",error:!0})})}}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("header",{className:"header",children:Object(a.jsxs)("div",{className:"header__trunc",children:[Object(a.jsx)("p",{className:"header__trunc__title",children:"WILIOT"}),Object(a.jsx)("p",{className:"header__trunc__subtitle",children:"Demo version"})]})}),Object(a.jsxs)("div",{className:"wrapper",children:[Object(a.jsxs)("div",{className:"temp",children:[Object(a.jsxs)("span",{className:"temp__block",children:[Object(a.jsx)("p",{className:"temp__block__id",children:"ID1"}),Object(a.jsxs)("p",{children:["Temperature: ",Object(a.jsx)("strong",{children:this.state.id1.temperature})," \xb0C; \xa0",Object(a.jsxs)("span",{className:this.hundred(this.state.id1.data),children:["data: ",Object(a.jsx)("strong",{children:this.state.id1.data}),"."]})]})]}),Object(a.jsx)("span",{className:"temp__block-space",children:"\xa0"}),Object(a.jsxs)("span",{className:"temp__block",children:[Object(a.jsx)("p",{className:"temp__block__id",children:"ID2"}),Object(a.jsxs)("p",{children:["Temperature: ",Object(a.jsx)("strong",{children:this.state.id2.temperature})," \xb0C; \xa0",Object(a.jsxs)("span",{className:this.hundred(this.state.id2.data),children:["data: ",Object(a.jsx)("strong",{children:this.state.id2.data}),"."]})]})]})]}),Object(a.jsx)(O.a,{height:400,debounce:1,children:Object(a.jsxs)(u.a,{data:this.state.graphArr,margin:{top:20,right:0,left:10,bottom:5},children:[Object(a.jsxs)("defs",{children:[Object(a.jsxs)("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(a.jsx)("stop",{offset:"5%",stopColor:"#002df4",stopOpacity:.6}),Object(a.jsx)("stop",{offset:"95%",stopColor:"#002df4",stopOpacity:0})]}),Object(a.jsxs)("linearGradient",{id:"colorPv",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(a.jsx)("stop",{offset:"5%",stopColor:"#b100ba",stopOpacity:.45}),Object(a.jsx)("stop",{offset:"95%",stopColor:"#b100ba",stopOpacity:0})]})]}),Object(a.jsx)(f.a,{strokeDasharray:"3 3"}),Object(a.jsx)(x.a,{dataKey:"legend"}),Object(a.jsx)(m.a,{label:{value:"Data",angle:-90,offset:0,position:"insideLeft",fontSize:25,fontWeight:"bold"}}),Object(a.jsx)(g.a,{iconSize:20}),Object(a.jsx)(k.a,{}),Object(a.jsx)(v.a,{type:"monotoneX",dataKey:"ID1",stroke:"#002df4",strokeWidth:2,fillOpacity:1,fill:"url(#colorUv)",animationDuration:700,animationEasing:"ease-in-out"}),Object(a.jsx)(v.a,{type:"monotoneX",dataKey:"ID2",stroke:"#b100ba",strokeWidth:2,fillOpacity:1,fill:"url(#colorPv)",animationDuration:700,animationEasing:"ease-in-out"})]})}),Object(a.jsx)(p,{status:this.state.status})]})]})}}]),s}(r.a.Component));i.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(y,{})}),document.getElementById("root"))}},[[304,1,2]]]);
//# sourceMappingURL=main.7a25cee6.chunk.js.map