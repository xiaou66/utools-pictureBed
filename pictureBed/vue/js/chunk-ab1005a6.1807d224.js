(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ab1005a6"],{"79d9":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("a-page-header",{staticStyle:{border:"1px solid rgb(235, 237, 240)"},attrs:{title:"设置"},on:{back:function(){return e.$router.replace({name:"index"})}}}),n("a-tabs",{staticStyle:{padding:"10px 15px"},on:{change:t.tabsChange},model:{value:t.currentTab,callback:function(e){t.currentTab=e},expression:"currentTab"}},t._l(t.tabsData,(function(e){return n("a-tab-pane",{key:e.name,attrs:{tab:e.name}},[n("router-view",{staticStyle:{"max-height":"85vh"}})],1)})),1)],1)},r=[],i=(a("7db0"),a("b0c0"),a("ac1f"),a("5319"),{data:function(){return{tabsData:[{name:"阿里OSS",router:{name:"aliOss"}},{name:"腾讯OSS",router:{name:"tencentOss"}},{name:"Hidove",router:{name:"Hidove"}},{name:"如优",router:{name:"rruu"}},{name:"支持",router:{name:"contributions"}}],currentTab:"阿里OSS"}},methods:{tabsChange:function(e){var t=this.tabsData.find((function(t){return t.name===e}));this.$router.replace(t.router)}}}),u=i,o=a("2877"),c=Object(o["a"])(u,n,r,!1,null,"ef54e310",null);t["default"]=c.exports},"7db0":function(e,t,a){"use strict";var n=a("23e7"),r=a("b727").find,i=a("44d2"),u=a("ae40"),o="find",c=!0,s=u(o);o in[]&&Array(1)[o]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!s},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(o)}}]);