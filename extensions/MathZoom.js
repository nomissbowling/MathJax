/*
 *  /MathJax/extensions/MathZoom.js
 *  
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

(function(a,d,f,c,i){var j="1.1.3";var h=a.CombineConfig("MathZoom",{delay:400,styles:{"#MathJax_Zoom":{position:"absolute","background-color":"#F0F0F0",overflow:"auto",display:"block","z-index":301,padding:".5em",border:"1px solid black",margin:0,"font-family":"serif","font-size":"85%","font-weight":"normal","font-style":"normal","text-align":"left","text-indent":0,"text-transform":"none","line-height":"normal","letter-spacing":"normal","word-spacing":"normal","word-wrap":"normal","white-space":"nowrap","float":"none","box-shadow":"5px 5px 15px #AAAAAA","-webkit-box-shadow":"5px 5px 15px #AAAAAA","-moz-box-shadow":"5px 5px 15px #AAAAAA","-khtml-box-shadow":"5px 5px 15px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"},"#MathJax_ZoomOverlay":{position:"absolute",left:0,top:0,"z-index":300,display:"inline-block",width:"100%",height:"100%",border:0,padding:0,margin:0,"background-color":"white",opacity:0,filter:"alpha(opacity=0)"}}});var e,b;MathJax.Hub.Register.StartupHook("MathEvents Ready",function(){e=MathJax.Extension.MathEvents.Event.False;b=MathJax.Extension.MathEvents.Hover});var g=MathJax.Extension.MathZoom={version:j,settings:a.config.menuSettings,HandleEvent:function(m,k,l){if(g.settings.CTRL&&!m.ctrlKey){return true}if(g.settings.ALT&&!m.altKey){return true}if(g.settings.CMD&&!m.metaKey){return true}if(g.settings.Shift&&!m.shiftKey){return true}if(!g[k]){return true}return g[k](m,l)},Click:function(l,k){if(this.settings.zoom==="Click"){return this.Zoom(k,l)}},DblClick:function(l,k){if(this.settings.zoom==="Double-Click"){return this.Zoom(k,l)}},Hover:function(l,k){if(this.settings.zoom==="Hover"){this.Zoom(k,l);return true}return false},Zoom:function(t,m){this.Remove();b.ClearHoverTimer();var w=t.parentNode;if(w.className==="MathJax_MathContainer"){w=w.parentNode}if(w.parentNode.className==="MathJax_MathContainer"){w=w.parentNode.parentNode}var r=(String(w.className).match(/^MathJax_(MathML|Display)$/)?w:t).nextSibling;var n=a.getJaxFor(r),s=n.root;var p=(c&&n.outputJax.isa(c.constructor)?"HTMLCSS":(i&&n.outputJax.isa(i.constructor)?"MathML":null));if(!p){return}if(n.hover){b.UnHover(n)}var k=Math.floor(0.85*document.body.clientWidth),q=Math.floor(0.85*document.body.clientHeight);var l=d.Element("span",{style:{position:"relative",display:"inline-block",height:0,width:0},id:"MathJax_ZoomFrame"},[["span",{id:"MathJax_ZoomOverlay",onmousedown:this.Remove}],["span",{id:"MathJax_Zoom",onclick:this.Remove,style:{visibility:"hidden",fontSize:this.settings.zscale,"max-width":k+"px","max-height":q+"px"}},[["span"]]]]);var y=l.lastChild,v=y.firstChild,o=l.firstChild;t.parentNode.insertBefore(l,t);if(this.msieZIndexBug){var u=d.addElement(document.body,"img",{src:"about:blank",id:"MathJax_ZoomTracker",width:0,height:0,style:{width:0,height:0,position:"relative"}});l.style.position="relative";l.style.zIndex=h.styles["#MathJax_ZoomOverlay"]["z-index"];l=u}var x=(this["Zoom"+p])(s,v,t,k,q);if(this.msiePositionBug){if(this.msieSizeBug){y.style.height=x.zH+"px";y.style.width=x.zW+"px"}if(y.offsetHeight>q){y.style.height=q+"px"}if(y.offsetWidth>k){y.style.width=k+"px"}if(t.nextSibling){t.parentNode.insertBefore(l,t.nextSibling)}else{w.appendChild(l)}}if(this.operaPositionBug){y.style.width=Math.min(k,x.zW)+"px"}if(y.offsetWidth<=k&&y.offsetHeight<=q){y.style.overflow="visible"}this.Position(y,x,(p==="MathML"&&w.nodeName.toLowerCase()==="div"));y.style.visibility="";if(this.settings.zoom==="Hover"){o.onmouseover=this.Remove}if(window.addEventListener){addEventListener("resize",this.Resize,false)}else{if(window.attachEvent){attachEvent("onresize",this.Resize)}else{this.onresize=window.onresize;window.onresize=this.Resize}}return e(m)},ZoomHTMLCSS:function(q,t,s,k,p){t.className="MathJax";c.idPostfix="-zoom";c.getScales(t,t);q.toHTML(t,t);var u=q.HTMLspanElement().bbox;c.idPostfix="";if(u.width){t.style.width=Math.floor(k-1.5*c.em)+"px";t.style.display="inline-block";var l=(q.id||"MathJax-Span-"+q.spanID)+"-zoom";var m=document.getElementById(l).firstChild;while(m&&m.style.width!==u.width){m=m.nextSibling}if(m){m.style.width="100%"}}t.style.position=s.style.position="absolute";var r=t.offsetWidth,o=t.offsetHeight,v=s.offsetHeight,n=s.offsetWidth;t.style.position=s.style.position="";if(n===0){n=s.offseWidth||s.parentNode.offsetWidth}return{Y:-this.getTop(q,t,s,this.msieTopBug,this.msieBorderBug,false),mW:n,mH:v,zW:r,zH:o}},ZoomMathML:function(k,n,p){k.toNativeMML(n,n);var q=this.getTop(k,n,p,this.msieTopMMLBug,false,this.ffMMLdisplayBug);var r=p.offsetWidth||p.scrollWidth,m=p.offsetHeight||p.scrollHeight;if(this.msieIE8HeightBug){n.style.position="absolute"}var l=n.offsetWidth,o=n.offsetHeight;if(this.msieIE8HeightBug){n.style.position=""}if(this.ffMMLdisplayBug){n.style.display="inline-block";n.style.width=l+"px"}return{Y:-q,mW:r,mH:m,zW:l,zH:o}},getTop:function(q,s,r,t,p,u){s.appendChild(this.topImg);if(u&&r.getAttribute("display")==="block"){r.setAttribute("display","inline");r.MJinline=true;var n=q.NativeMMLelement("mstyle");while(r.firstChild){n.appendChild(r.firstChild)}r.appendChild(n);n.setAttribute("displaystyle","true")}if(r.MJinline){s.insertBefore(this.topImg,s.firstChild);var l=s.childNodes[1],m=q.NativeMMLelement("mstyle");l.setAttribute("display","inline");while(l.firstChild){m.appendChild(l.firstChild)}l.appendChild(m);m.setAttribute("displaystyle","true");m.setAttribute("displaystyle","true")}var o=this.topImg.offsetTop;if(t){var k=r.parentNode.style.whiteSpace;r.parentNode.style.whiteSpace="nowrap";r.parentNode.insertBefore(this.topImg,r);o-=this.topImg.offsetTop-s.parentNode.parentNode.offsetTop;r.parentNode.style.whiteSpace=k}if(p){o+=Math.floor(0.5*c.em)}this.topImg.parentNode.removeChild(this.topImg);return o},Position:function(q,o,s){var l=this.Resize(),n=l.x,m=l.y,k=o.mW;if(this.msieIE8Bug){k=-k}var r=-Math.floor((q.offsetWidth-k)/2),p=o.Y;q.style.left=Math.max(r,10-n)+"px";q.style.top=Math.max(p,10-m)+"px"},Resize:function(m){if(g.onresize){g.onresize(m)}var k=0,p=0,o=document.getElementById("MathJax_ZoomFrame"),n=o,l=document.getElementById("MathJax_ZoomOverlay");if(g.operaPositionBug){o.style.border="1px solid"}if(n.offsetParent){do{k+=n.offsetLeft;p+=n.offsetTop}while(n=n.offsetParent)}if(g.operaPositionBug){o.style.border=""}l.style.left=(-k)+"px";l.style.top=(-p)+"px";if(g.msiePositionBug){setTimeout(g.SetWH,0)}else{g.SetWH()}return{x:k,y:p}},SetWH:function(){var k=document.getElementById("MathJax_ZoomOverlay");k.style.width=k.style.height="1px";k.style.width=document.body.scrollWidth+"px";k.style.height=document.body.scrollHeight+"px"},Remove:function(l){var m=document.getElementById("MathJax_ZoomFrame");if(m){m.parentNode.removeChild(m);m=document.getElementById("MathJax_ZoomTracker");if(m){m.parentNode.removeChild(m)}if(g.operaRefreshBug){var k=d.addElement(document.body,"div",{style:{position:"fixed",left:0,top:0,width:"100%",height:"100%",backgroundColor:"white",opacity:0},id:"MathJax_OperaDiv"});document.body.removeChild(k)}if(window.removeEventListener){removeEventListener("resize",g.Resize,false)}else{if(window.detachEvent){detachEvent("onresize",g.Resize)}else{window.onresize=g.onresize;delete g.onresize}}}return e(l)}};a.Browser.Select({MSIE:function(k){var l=(document.compatMode==="BackCompat");var n=k.versionAtLeast("8.0")&&document.documentMode>7;var m=document.documentMode>=9;g.msiePositionBug=!m;g.msieSizeBug=k.versionAtLeast("7.0")&&(!document.documentMode||document.documentMode===7||document.documentMode===8);g.msieIE8Bug=n&&(document.documentMode===8);g.msieIE8HeightBug=(document.documentMode===8);g.msieZIndexBug=!n;g.msieTopBug=(!k.versionAtLeast("8.0")||document.documentMode===7);g.msieTopMMLBug=g.msieTopBug||(!n||document.documentMode>=9);g.msieBorderBug=l&&k.versionAtLeast("8.0");g.msieInlineBlockAlignBug=(!n||l);if(document.documentMode>=9){delete h.styles["#MathJax_Zoom"].filter}},Opera:function(k){g.operaPositionBug=true;g.operaRefreshBug=true},Firefox:function(k){g.ffMMLdisplayBug=true}});g.topImg=(g.msieInlineBlockAlignBug?d.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}):d.Element("span",{style:{width:0,height:0,display:"inline-block"}}));if(g.operaPositionBug||g.msieTopBug){g.topImg.style.border="1px solid"}MathJax.Callback.Queue(["StartupHook",MathJax.Hub.Register,"Begin Styles",{}],["Styles",f,h.styles],["Post",a.Startup.signal,"MathZoom Ready"],["loadComplete",f,"[MathJax]/extensions/MathZoom.js"])})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.OutputJax["HTML-CSS"],MathJax.OutputJax.NativeMML);

