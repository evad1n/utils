(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99],{4834:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/russ-ipsum",function(){return n(823)}])},823:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(1527),s=n(959),i=n(4464),a=n.n(i);let u=[".","!","?"],o=[",",";"];class l{generate(e){let t=[];for(let n=0;n<e;n++)t.push(this.generateParagraph());return t}generateParagraph(){let e="",t=Math.floor(3*Math.random())+3;for(let n=0;n<t;n++)e+=this.generateSentence();return e}generateSentence(){let e="",t=0,n=this.generateNextToken(!0);for(;!this.isSentenceEnding(n);){this.isPunctuation(n)&&(e=e.trim()),e+=n+" ",t++;let r=n;n=this.generateNextToken(t<3||this.isPunctuation(r))}return e.trim()+n+" "}generateNextToken(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e)return this.generateWord();let t=Math.floor(100*Math.random());if(t<=10){let e=Math.floor(Math.random()*this.sentenceEndings.length);return this.sentenceEndings[e]}if(!(t<=20))return this.generateWord();{let e=Math.floor(Math.random()*this.punctuation.length);return this.punctuation[e]}}generateWord(){let e=Math.floor(Math.random()*this.words.length);return this.words[e]}isPunctuation(e){return this.allPunctuation.includes(e)}isSentenceEnding(e){return this.sentenceEndings.includes(e)}constructor({words:e,sentenceEndings:t=u,punctuation:n=o}){this.words=e,this.sentenceEndings=t,this.punctuation=n,this.allPunctuation=[...t,...n]}}let h=["raspberry pi","cambridge","harvard","red-black tree","self-balancing","lisp","JVM","Nancy","foccacia bread","chestnut trees","pubs","See's Candies","pubs","borscht","dropouts","RISC-V","Intel","binary","distributed","Golang"],c=e=>{let t=new l({words:h}),n=t.generate(e);return n};function d(){let[e,t]=(0,s.useState)(5),[n,i]=(0,s.useState)([]),u=()=>{let t=c(e);i(t)};return(0,r.jsxs)("div",{className:a().page,children:[(0,r.jsxs)("label",{children:[(0,r.jsx)("p",{children:"Number of paragraphs"}),(0,r.jsx)("input",{type:"number",value:e,onChange:e=>t(parseInt(e.target.value))})]}),(0,r.jsx)("button",{onClick:u,children:"Generate"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{children:"Output:"}),(0,r.jsx)("div",{className:a().output,children:n.map((e,t)=>(0,r.jsx)("p",{children:e},t))})]})]})}},4464:function(e){e.exports={page:"russ-ipsum_page__9qZeQ",output:"russ-ipsum_output__fiyxJ"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4834)}),_N_E=e.O()}]);