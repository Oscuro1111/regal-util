(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{12:function(e,t,a){e.exports=a(27)},17:function(e,t,a){},18:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(10),c=a.n(l),r=(a(17),a(1)),s=a(2),i=a(4),m=a(3),u=a(5),h=(a(18),function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"header_component"},o.a.createElement("span",null,o.a.createElement("i",{className:"fa fa-book"}),"Regal-util"),o.a.createElement("button",{className:"btn btn-success",onClick:function(){document.location.href="http://localhost:3000/logout"},id:"logOut"},"Logout"))}}]),t}(o.a.Component)),p=a(6),d=(a(9),a(19),a(22),function(e){var t=e.name,a=e.clickEvent;return o.a.createElement("div",{id:"location_c",onClick:function(e){e.preventDefault(),a&&a(t)},className:"btn btn-primary"},t)}),b=a(11),f=(a(24),a(25),a(7)),E=a.n(f),y={"Varanisi(U.P-1)":"locationA","Sultanpur(U.P-2)":"locationB","Jhabua(M.P)":"locationC","Solan(H.P)":"locationD",Punjab:"locationE"},v={"Diesel Record":"typeA","Suppliers Bill":"typeB","Debtors Bill":"typeC","Imprest Report":"typeD"},k=function(e){return o.a.createElement("table",{className:"table table-hover",id:"tbl"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Date"),o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Download Link"))),o.a.createElement("tbody",null,e.children))},w=function(e){var t=e.date,a=e.fileName,n=e.downloadLink;return o.a.createElement("tr",null,o.a.createElement("td",null,t),o.a.createElement("td",null,a),o.a.createElement("td",{className:"btn btn-success"},o.a.createElement("a",{href:n},"Download")))},g=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={value:""},e.ref=null,e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onChangeEvent",value:function(e){this.setState({value:this.ref&&this.ref.value})}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{className:"form-control",id:"filterBr",ref:function(t){return e.ref=t},type:"text",value:this.state.value,placeholder:"search for file...",onChange:this.onChangeEvent.bind(this)}),o.a.createElement(O,{data:this.props.data,location:this.props.location,pattern:this.state.value}))}}]),t}(o.a.Component),O=function(e){var t=e.data,a=e.location,n=e.pattern,l=[];return t.forEach((function(e,t){0!==n.length&&" "!==n?e.name.search(n)>-1&&l.push(o.a.createElement(w,{key:t,date:e.date,fileName:e.name,downloadLink:"/download/"+y[a]+"/"+e.workType+"/"+e.name})):l.push(o.a.createElement(w,{key:t,date:e.date,fileName:e.name,downloadLink:"/download/"+y[a]+"/"+e.workType+"/"+e.name}))})),o.a.createElement(k,null,l)},j=function(e){var t=e.location,a=e.type;return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"card-header",id:"upload_msg"},"Upload files by dragging files or folders below in white area or by selecting browse option ."),o.a.createElement(b.FilePond,{allowMultiple:!0,server:"http://localhost:3000/uploads/"+y[t]+"/"+v[a]+"/"}))},N=function(e){var t=e.showUploadComponent;return o.a.createElement("button",{onClick:t,className:"btn btn-success",style:{width:"100%"}},o.a.createElement("i",{className:"fa fa-upload"}),"Upload Files")},C=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={data:[{name:"files-fa",date:"Date"},{name:"fio",date:"Date"},{name:"C.wgfli",date:"Date"},{name:"D.name",date:"Date"},{name:"Fdd,wttdf",date:"Date"}],status:"Loading",phoneView:!(window.innerWidth>650)},e.refresh=e.refresh.bind(Object(p.a)(e)),e.showUploadComponent=e.showUploadComponent.bind(Object(p.a)(e)),e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"refresh",value:function(){var e=this;this.setState({status:"Loading"}),E.a.getJSON("/fetchReq/"+y[this.props.location]+"/"+v[this.props.type],(function(t){console.log(t),e.setState({status:"Done",data:t.data})}))}},{key:"componentDidMount",value:function(){var e=this;E.a.getJSON("/fetchReq/"+y[this.props.location]+"/"+v[this.props.type],(function(t){console.log(t),e.setState({status:"Done",data:t.data})}))}},{key:"showUploadComponent",value:function(){this.setState({phoneView:!1})}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"",id:"tableShow"},o.a.createElement("span",{className:"uploadComponent"},!this.state.phoneView&&o.a.createElement(j,{location:this.props.location,type:this.props.type}),this.state.phoneView&&o.a.createElement(N,{showUploadComponent:this.showUploadComponent})),o.a.createElement("p",{className:"tableDiscription"},o.a.createElement("span",{id:"disc"},this.props.location+" > "+this.props.type),o.a.createElement("span",{className:"btn btn-success",onClick:this.props.back},"Back"),o.a.createElement("span",{className:"btn btn-primary",onClick:this.props.backHome},"Home"),o.a.createElement("span",{className:"btn btn-info",onClick:this.refresh},"Refresh")),"Done"===this.state.status&&o.a.createElement(g,{data:this.state.data,location:this.props.location}),"Loading"===this.state.status&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{id:"spinners"},o.a.createElement("div",{className:"spinner-grow text-dark",style:{width:"2rem",height:"2rem"},role:"status"},o.a.createElement("span",{className:"sr-only"},"Loading...")),o.a.createElement("div",{className:"spinner-grow text-success",style:{width:"2rem",height:"2rem"},role:"status"},o.a.createElement("span",{className:"sr-only"},"Loading...")),o.a.createElement("div",{className:"spinner-grow text-info",style:{width:"2rem",height:"2rem"},role:"status"},o.a.createElement("span",{className:"sr-only"},"Loading...")),o.a.createElement("div",{className:"spinner-grow text-danger",style:{width:"2rem",height:"2rem"},role:"status"},o.a.createElement("span",{class:"sr-only"},"Loading...")),o.a.createElement("div",{className:"spinner-grow text-primary",style:{width:"2rem",height:"2rem"},role:"status"},o.a.createElement("span",{className:"sr-only"},"Loading..."))))))}}]),t}(o.a.Component),T=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={locations:[{name:"Diesel Record"},{name:"Suppliers Bill"},{name:"Debtors Bill"},{name:"Imprest Report"}],showTable:!1,currentChoice:""},e.showTable=e.showTable.bind(Object(p.a)(e)),e.offTable=e.offTable.bind(Object(p.a)(e)),e.backHome=e.backHome.bind(Object(p.a)(e)),e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"showTable",value:function(e){this.setState({currentChoice:e,showTable:!0})}},{key:"offTable",value:function(){this.setState({showTable:!1})}},{key:"backHome",value:function(){this.offTable(),this.props.backHome()}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,!this.state.showTable&&o.a.createElement("center",null,o.a.createElement("div",{className:"content_component"},o.a.createElement("p",{className:"card-header_"},o.a.createElement("span",null,o.a.createElement("button",{id:"typeBtn",className:"btn btn-primary",onClick:this.props.backHome},"Back"),this.props.locationName+">choose Type of Work")," "),this.state.locations.map((function(t,a){return o.a.createElement(d,{clickEvent:e.showTable,key:a,name:t.name})})))),this.state.showTable&&o.a.createElement(C,{location:this.props.locationName,back:this.offTable,backHome:this.backHome,type:this.state.currentChoice}))}}]),t}(o.a.Component),D=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={locations:[{name:"Varanisi(U.P-1)"},{name:"Sultanpur(U.P-2)"},{name:"Jhabua(M.P)"},{name:"Solan(H.P)"},{name:"Punjab"}],changeToTypes:!1,currentActive:""},e.showType=e.showType.bind(Object(p.a)(e)),e.backHome=e.backHome.bind(Object(p.a)(e)),e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"showType",value:function(e){this.setState({changeToTypes:!0,currentActive:e})}},{key:"backHome",value:function(){this.setState({changeToTypes:!1})}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,!this.state.changeToTypes&&o.a.createElement("center",null,o.a.createElement("div",{className:"content_component"},o.a.createElement("p",{className:"card-header_"},"Select work Location"),this.state.locations.map((function(t,a){return o.a.createElement(d,{key:a,clickEvent:e.showType,name:t.name})})))),this.state.changeToTypes&&o.a.createElement(T,{backHome:this.backHome,locationName:this.state.currentActive}))}}]),t}(o.a.Component),S=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"Footer_component"},"Footer")}}]),t}(o.a.Component),H=(a(26),function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"rootContainer"},o.a.createElement("div",{className:"headerBox"},o.a.createElement(h,null)),o.a.createElement("div",{className:"contentBox"},o.a.createElement(D,null)),o.a.createElement("div",{className:"footerBox"},o.a.createElement(S,null))))}}]),t}(o.a.Component)),B=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(H,null)}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,a){}},[[12,1,2]]]);
//# sourceMappingURL=main.48bdcf42.chunk.js.map