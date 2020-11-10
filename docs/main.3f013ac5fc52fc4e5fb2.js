!function(e){function t(t){for(var n,u,c=t[0],a=t[1],l=t[2],s=0,p=[];s<c.length;s++)u=c[s],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&p.push(o[u][0]),o[u]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(f&&f(t);p.length;)p.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,c=1;c<r.length;c++){var a=r[c];0!==o[a]&&(n=!1)}n&&(i.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},o={0:0},i=[];function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var f=a;i.push([1,1]),r()}([,function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"GAME",(function(){return i})),r.d(n,"PRELOAD",(function(){return u}));var o={};r.r(o),r.d(o,"TILE_SIZE",(function(){return c}));r(0);var i="game",u="preload",c=200;function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=y(e);if(t){var o=y(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return p(this,r)}}function p(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(c,Phaser.Scene);var t,r,i,u=s(c);function c(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),d(h(e=u.call(this,n.GAME)),"board_rows",void 0),d(h(e),"board_cols",void 0),d(h(e),"tileActive",void 0),d(h(e),"tileSum",void 0),d(h(e),"tileGroup",void 0),e}return t=c,(r=[{key:"init",value:function(){var e=this.scale.width;this.board_cols=Math.floor(e/o.TILE_SIZE),this.board_rows=3,this.tileSum=this.board_rows*this.board_cols,this.tileGroup=this.add.group()}},{key:"preload",value:function(){}},{key:"create",value:function(){this.layout(),this.input.on("gameobjectdown",this.handleTile,this)}},{key:"layout",value:function(){for(var e,t=this.createShuffledIndexArray(),r=0,n=0;n<this.board_rows;n++)for(var i=0;i<this.board_cols;i++)e=this.tileGroup.create(i*o.TILE_SIZE,n*o.TILE_SIZE,"bg",t[r]),t[r]===this.tileSum-1&&(e.blank=!0,e.setVisible(!1),e.setDepth(-1)),e.setOrigin(0),e.setInteractive(),e.row=n,e.col=i,e.tileIndex=r,e.rightIndex=t[r],r++}},{key:"handleTile",value:function(e,t){var r=this.canMove(t);r&&this.moveTile(t,r)}},{key:"canMove",value:function(e){var t=null,r=e.row,n=e.col;return Phaser.Actions.Call(this.tileGroup.getChildren(),(function(e){e.blank&&(e.row===r-1&&e.col===n||e.row===r+1&&e.col===n||e.col===n-1&&e.row===r||e.col===n+1&&e.row===r)&&(t=e)}),this),t}},{key:"moveTile",value:function(e,t){var r=this,n={x:e.x,y:e.y,row:e.row,col:e.col,tileIndex:e.tileIndex};this.add.tween({targets:e,x:t.x,y:t.y,duration:300,onComplete:function(){r.swapeProps(e,t,n),r.checkFinished()}})}},{key:"swapeProps",value:function(e,t,r){e.row=t.row,e.col=t.col,e.tileIndex=t.tileIndex,t.x=r.x,t.y=r.y,t.row=r.row,t.col=r.col,t.tileIndex=r.tileIndex}},{key:"checkFinished",value:function(){var e=!0;Phaser.Actions.Call(this.tileGroup.getChildren(),(function(t){t.tileIndex===t.rightIndex||(e=!1)}),this),e&&console.log("成功了")}},{key:"createShuffledIndexArray",value:function(){for(var e=[],t=0;t<this.tileSum;t++)e.push(t);return this.shuffle(e)}},{key:"shuffle",value:function(e){for(var t=e.length;t;){var r=Math.floor(Math.random()*t--),n=[e[t],e[r]];e[r]=n[0],e[t]=n[1]}return e}}])&&l(t.prototype,r),i&&l(t,i),c}();function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=_(e);if(t){var o=_(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return O(this,r)}}function O(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=[function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(c,Phaser.Scene);var t,r,i,u=m(c);function c(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),u.call(this,n.PRELOAD)}return t=c,(r=[{key:"preload",value:function(){this.load.image("test","assets/images/moon.png"),this.load.spritesheet("bg","assets/images/bg.jpg",{frameWidth:o.TILE_SIZE,frameHeight:o.TILE_SIZE})}},{key:"create",value:function(){this.scene.start(n.GAME)}},{key:"update",value:function(){}}])&&w(t.prototype,r),i&&w(t,i),c}(),b],P={type:Phaser.AUTO,scale:{mode:Phaser.Scale.NONE,autoCenter:Phaser.Scale.CENTER_BOTH,parent:"root",width:800,height:600},physics:{default:"arcade",arcade:{debug:!0,gravity:{y:200}}},scene:S};t.default=new Phaser.Game(P)}]);