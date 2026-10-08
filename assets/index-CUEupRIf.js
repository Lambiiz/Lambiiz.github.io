(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const qo="186",lu=0,Dl=1,cu=2,Os=1,hu=2,Us=3,Di=0,qt=1,jt=2,Ln=0,Bs=1,Rn=2,Ul=3,Nl=4,uu=5,rs=100,du=101,fu=102,pu=103,mu=104,gu=200,vu=201,_u=202,xu=203,ch=204,hh=205,Mu=206,Su=207,yu=208,bu=209,Tu=210,Eu=211,wu=212,Au=213,Cu=214,Za=0,$a=1,Ka=2,qs=3,Ja=4,Qa=5,ja=6,eo=7,Yo=0,Ru=1,Pu=2,Dn=0,Zo=1,$o=2,Ko=3,ta=4,Jo=5,Qo=6,jo=7,uh=300,Ui=301,fs=302,ha=303,ua=304,na=306,cs=1e3,qn=1001,to=1002,Lt=1003,Iu=1004,lr=1005,Dt=1006,da=1007,di=1008,rn=1009,dh=1010,fh=1011,Ys=1012,el=1013,Un=1014,vn=1015,Yt=1016,tl=1017,nl=1018,Zs=1020,ph=35902,mh=35899,gh=1021,vh=1022,_n=1023,Qn=1026,Ri=1027,il=1028,sl=1029,Ni=1030,rl=1031,al=1033,zr=33776,kr=33777,Hr=33778,Gr=33779,no=35840,io=35841,so=35842,ro=35843,ao=36196,oo=37492,lo=37496,co=37488,ho=37489,qr=37490,uo=37491,fo=37808,po=37809,mo=37810,go=37811,vo=37812,_o=37813,xo=37814,Mo=37815,So=37816,yo=37817,bo=37818,To=37819,Eo=37820,wo=37821,Ao=36492,Co=36494,Ro=36495,Po=36283,Io=36284,Yr=36285,Lo=36286,Lu=3200,Zr=0,Du=1,ui="",Qt="srgb",$r="srgb-linear",Kr="linear",lt="srgb",fa=7680,Uu=519,Nu=512,Fu=513,Ou=514,ol=515,Bu=516,zu=517,ll=518,ku=519,Hu=35044,pi=35048,Fl="300 es",Pn=2e3,$s=2001;function Gu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Jr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vu(){const i=Jr("canvas");return i.style.display="block",i}const Ol={};function Bl(...i){const e="THREE."+i.shift();console.log(e,...i)}function _h(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=_h(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function nt(...i){i=_h(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function hs(...i){const e=i.join(" ");e in Ol||(Ol[e]=!0,Ge(...i))}function Wu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Xu={[Za]:$a,[Ka]:ja,[Ja]:eo,[qs]:Qa,[$a]:Za,[ja]:Ka,[eo]:Ja,[Qa]:qs};class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zl=1234567;const zs=Math.PI/180,Ks=180/Math.PI;function Bi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function cl(i,e){return(i%e+e)%e}function qu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yu(i,e,t){return i!==e?(t-i)/(e-i):0}function ks(i,e,t){return(1-t)*i+t*e}function Zu(i,e,t,n){return ks(i,e,1-Math.exp(-t*n))}function $u(i,e=1){return e-Math.abs(cl(i,e*2)-e)}function Ku(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ju(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Qu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ju(i,e){return i+Math.random()*(e-i)}function ed(i){return i*(.5-Math.random())}function td(i){i!==void 0&&(zl=i);let e=zl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nd(i){return i*zs}function id(i){return i*Ks}function sd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function rd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ad(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function od(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function as(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Js={DEG2RAD:zs,RAD2DEG:Ks,generateUUID:Bi,clamp:Je,euclideanModulo:cl,mapLinear:qu,inverseLerp:Yu,lerp:ks,damp:Zu,pingpong:$u,smoothstep:Ku,smootherstep:Ju,randInt:Qu,randFloat:ju,randFloatSpread:ed,seededRandom:td,degToRad:nd,radToDeg:id,isPowerOfTwo:sd,ceilPowerOfTwo:rd,floorPowerOfTwo:ad,setQuaternionFromProperEuler:od,normalize:Vt,denormalize:as};class ae{static{ae.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],S=r[a+3];if(d!==S||l!==u||c!==f||h!==g){let p=l*u+c*f+h*g+d*S;p<0&&(u=-u,f=-f,g=-g,S=-S,p=-p);let m=1-o;if(p<.9995){const M=Math.acos(p),w=Math.sin(M);m=Math.sin(m*M)/w,o=Math.sin(o*M)/w,l=l*m+u*o,c=c*m+f*o,h=h*m+g*o,d=d*m+S*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+g*o,d=d*m+S*o;const M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new C,kl=new Zt;class Xe{static{Xe.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],S=s[0],p=s[3],m=s[6],M=s[1],w=s[4],x=s[7],T=s[2],b=s[5],R=s[8];return r[0]=a*S+o*M+l*T,r[3]=a*p+o*w+l*b,r[6]=a*m+o*x+l*R,r[1]=c*S+h*M+d*T,r[4]=c*p+h*w+d*b,r[7]=c*m+h*x+d*R,r[2]=u*S+f*M+g*T,r[5]=u*p+f*w+g*b,r[8]=u*m+f*x+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=d*S,e[1]=(s*c-h*n)*S,e[2]=(o*n-s*a)*S,e[3]=u*S,e[4]=(h*t-s*l)*S,e[5]=(s*r-o*t)*S,e[6]=f*S,e[7]=(n*l-c*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ma.makeScale(e,t)),this}rotate(e){return hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Xe,Hl=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gl=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ld(){const i={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=us(s.r),s.g=us(s.g),s.b=us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?Kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$r]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:Hl,fromXYZ:Gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Hl,fromXYZ:Gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}const et=ld();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vi;class cd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vi===void 0&&(Vi=Jr("canvas")),Vi.width=e.width,Vi.height=e.height;const s=Vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Jr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($n(t[n]/255)*255):t[n]=$n(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hd=0;class hl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ga(s[a].image)):r.push(ga(s[a]))}else r=ga(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ga(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let ud=0;const va=new C;class zt extends Oi{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=qn,s=qn,r=Dt,a=di,o=_n,l=rn,c=zt.DEFAULT_ANISOTROPY,h=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=Bi(),this.name="",this.source=new hl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cs:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cs:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=uh;zt.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],S=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-S)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+S)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,x=(f+1)/2,T=(m+1)/2,b=(h+u)/4,R=(d+S)/4,_=(g+p)/4;return w>x&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=R/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=b/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=_/r),this.set(n,s,r,t),this}let M=Math.sqrt((p-g)*(p-g)+(d-S)*(d-S)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-S)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dd extends Oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new zt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new hl(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kt extends dd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class xh extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fd extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class tt{static{tt.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,S,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,S,p)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,S,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=S,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Wi.setFromMatrixColumn(e,0).length(),r=1/Wi.setFromMatrixColumn(e,1).length(),a=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,S=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-S*c,t[9]=-o*l,t[2]=S-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,S=c*d;t[0]=u+S*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=S+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,S=c*d;t[0]=u-S*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=S-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,S=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+S,t[1]=l*d,t[5]=S*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,S=o*c;t[0]=l*h,t[4]=S-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-S*d}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,S=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+S,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=S*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pd,e,md)}lookAt(e,t,n){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ii.crossVectors(n,en),ii.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ii.crossVectors(n,en)),ii.normalize(),cr.crossVectors(en,ii),s[0]=ii.x,s[4]=cr.x,s[8]=en.x,s[1]=ii.y,s[5]=cr.y,s[9]=en.y,s[2]=ii.z,s[6]=cr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],S=n[6],p=n[10],m=n[14],M=n[3],w=n[7],x=n[11],T=n[15],b=s[0],R=s[4],_=s[8],E=s[12],I=s[1],D=s[5],F=s[9],G=s[13],N=s[2],B=s[6],K=s[10],V=s[14],se=s[3],X=s[7],j=s[11],ie=s[15];return r[0]=a*b+o*I+l*N+c*se,r[4]=a*R+o*D+l*B+c*X,r[8]=a*_+o*F+l*K+c*j,r[12]=a*E+o*G+l*V+c*ie,r[1]=h*b+d*I+u*N+f*se,r[5]=h*R+d*D+u*B+f*X,r[9]=h*_+d*F+u*K+f*j,r[13]=h*E+d*G+u*V+f*ie,r[2]=g*b+S*I+p*N+m*se,r[6]=g*R+S*D+p*B+m*X,r[10]=g*_+S*F+p*K+m*j,r[14]=g*E+S*G+p*V+m*ie,r[3]=M*b+w*I+x*N+T*se,r[7]=M*R+w*D+x*B+T*X,r[11]=M*_+w*F+x*K+T*j,r[15]=M*E+w*G+x*V+T*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],S=e[7],p=e[11],m=e[15],M=l*f-c*u,w=o*f-c*d,x=o*u-l*d,T=a*f-c*h,b=a*u-l*h,R=a*d-o*h;return t*(S*M-p*w+m*x)-n*(g*M-p*T+m*b)+s*(g*w-S*T+m*R)-r*(g*x-S*b+p*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],S=e[13],p=e[14],m=e[15],M=t*o-n*a,w=t*l-s*a,x=t*c-r*a,T=n*l-s*o,b=n*c-r*o,R=s*c-r*l,_=h*S-d*g,E=h*p-u*g,I=h*m-f*g,D=d*p-u*S,F=d*m-f*S,G=u*m-f*p,N=M*G-w*F+x*D+T*I-b*E+R*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/N;return e[0]=(o*G-l*F+c*D)*B,e[1]=(s*F-n*G-r*D)*B,e[2]=(S*R-p*b+m*T)*B,e[3]=(u*b-d*R-f*T)*B,e[4]=(l*I-a*G-c*E)*B,e[5]=(t*G-s*I+r*E)*B,e[6]=(p*x-g*R-m*w)*B,e[7]=(h*R-u*x+f*w)*B,e[8]=(a*F-o*I+c*_)*B,e[9]=(n*I-t*F-r*_)*B,e[10]=(g*b-S*x+m*M)*B,e[11]=(d*x-h*b-f*M)*B,e[12]=(o*E-a*D-l*_)*B,e[13]=(t*D-n*E+s*_)*B,e[14]=(S*w-g*T-p*M)*B,e[15]=(h*T-d*w+u*M)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,S=a*h,p=a*d,m=o*d,M=l*c,w=l*h,x=l*d,T=n.x,b=n.y,R=n.z;return s[0]=(1-(S+m))*T,s[1]=(f+x)*T,s[2]=(g-w)*T,s[3]=0,s[4]=(f-x)*b,s[5]=(1-(u+m))*b,s[6]=(p+M)*b,s[7]=0,s[8]=(g+w)*R,s[9]=(p-M)*R,s[10]=(1-(u+S))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Wi.set(s[0],s[1],s[2]).length();const o=Wi.set(s[4],s[5],s[6]).length(),l=Wi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),fn.copy(this);const c=1/a,h=1/o,d=1/l;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,t.setFromRotationMatrix(fn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Pn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let g,S;if(l)g=r/(a-r),S=a*r/(a-r);else if(o===Pn)g=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===$s)g=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Pn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,S;if(l)g=1/(a-r),S=a/(a-r);else if(o===Pn)g=-2/(a-r),S=-(a+r)/(a-r);else if(o===$s)g=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Wi=new C,fn=new tt,pd=new C(0,0,0),md=new C(1,1,1),ii=new C,cr=new C,en=new C,Vl=new tt,Wl=new Zt;class It{constructor(e=0,t=0,n=0,s=It.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wl.setFromEuler(this),this.setFromQuaternion(Wl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}It.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gd=0;const Xl=new C,Xi=new Zt,Fn=new tt,hr=new C,bs=new C,vd=new C,_d=new Zt,ql=new C(1,0,0),Yl=new C(0,1,0),Zl=new C(0,0,1),$l={type:"added"},xd={type:"removed"},qi={type:"childadded",child:null},_a={type:"childremoved",child:null};class yt extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new C,t=new It,n=new Zt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new Xe}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(ql,e)}rotateY(e){return this.rotateOnAxis(Yl,e)}rotateZ(e){return this.rotateOnAxis(Zl,e)}translateOnAxis(e,t){return Xl.copy(e).applyQuaternion(this.quaternion),this.position.add(Xl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ql,e)}translateY(e){return this.translateOnAxis(Yl,e)}translateZ(e){return this.translateOnAxis(Zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hr.copy(e):hr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(bs,hr,this.up):Fn.lookAt(hr,bs,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($l),qi.child=e,this.dispatchEvent(qi),qi.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xd),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($l),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,e,vd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,_d,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}yt.DEFAULT_UP=new C(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class un extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Md={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const S of e.hand.values()){const p=t.getJointPose(S,n),m=this._getHandJoint(c,S);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Md)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Ma(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=cl(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ma(a,r,e+1/3),this.g=Ma(a,r,e),this.b=Ma(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const n=Mh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=us(e.r),this.g=us(e.g),this.b=us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return et.workingToColorSpace(Ot.copy(this),e),Math.round(Je(Ot.r*255,0,255))*65536+Math.round(Je(Ot.g*255,0,255))*256+Math.round(Je(Ot.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Ot.copy(this),t);const n=Ot.r,s=Ot.g,r=Ot.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Qt){et.workingToColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,s=Ot.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(ur);const n=ks(si.h,ur.h,t),s=ks(si.s,ur.s,t),r=ks(si.l,ur.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new we;we.NAMES=Mh;class Sh extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new It,this.environmentIntensity=1,this.environmentRotation=new It,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const pn=new C,On=new C,Sa=new C,Bn=new C,Yi=new C,Zi=new C,Kl=new C,ya=new C,ba=new C,Ta=new C,Ea=new mt,wa=new mt,Aa=new mt;class gn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),pn.subVectors(e,t),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){pn.subVectors(s,t),On.subVectors(n,t),Sa.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(On),l=pn.dot(Sa),c=On.dot(On),h=On.dot(Sa),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ea.setScalar(0),wa.setScalar(0),Aa.setScalar(0),Ea.fromBufferAttribute(e,t),wa.fromBufferAttribute(e,n),Aa.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ea,r.x),a.addScaledVector(wa,r.y),a.addScaledVector(Aa,r.z),a}static isFrontFacing(e,t,n,s){return pn.subVectors(n,t),On.subVectors(e,t),pn.cross(On).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),pn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Yi.subVectors(s,n),Zi.subVectors(r,n),ya.subVectors(e,n);const l=Yi.dot(ya),c=Zi.dot(ya);if(l<=0&&c<=0)return t.copy(n);ba.subVectors(e,s);const h=Yi.dot(ba),d=Zi.dot(ba);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Yi,a);Ta.subVectors(e,r);const f=Yi.dot(Ta),g=Zi.dot(Ta);if(g>=0&&f<=g)return t.copy(r);const S=f*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Zi,o);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Kl.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Kl,o);const m=1/(p+S+u);return a=S*m,o=u*m,t.copy(n).addScaledVector(Yi,a).addScaledVector(Zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zi{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(r,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),dr.copy(n.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),fr.subVectors(this.max,Ts),$i.subVectors(e.a,Ts),Ki.subVectors(e.b,Ts),Ji.subVectors(e.c,Ts),ri.subVectors(Ki,$i),ai.subVectors(Ji,Ki),Mi.subVectors($i,Ji);let t=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-Mi.z,Mi.y,ri.z,0,-ri.x,ai.z,0,-ai.x,Mi.z,0,-Mi.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-Mi.y,Mi.x,0];return!Ca(t,$i,Ki,Ji,fr)||(t=[1,0,0,0,1,0,0,0,1],!Ca(t,$i,Ki,Ji,fr))?!1:(pr.crossVectors(ri,ai),t=[pr.x,pr.y,pr.z],Ca(t,$i,Ki,Ji,fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const zn=[new C,new C,new C,new C,new C,new C,new C,new C],mn=new C,dr=new zi,$i=new C,Ki=new C,Ji=new C,ri=new C,ai=new C,Mi=new C,Ts=new C,fr=new C,pr=new C,Si=new C;function Ca(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Si.fromArray(i,r);const o=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),l=e.dot(Si),c=t.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Mt=new C,mr=new ae;let Sd=0;class Ut extends Oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hu,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=as(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=as(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=as(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=as(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=as(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class yh extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bh extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class it extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}const yd=new zi,Es=new C,Ra=new C;class jn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):yd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Es.subVectors(e,this.center);const t=Es.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ra.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Es.copy(e.center).add(Ra)),this.expandByPoint(Es.copy(e.center).sub(Ra))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bd=0;const on=new tt,Pa=new yt,Qi=new C,tn=new zi,ws=new zi,Et=new C;class vt extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gu(e)?bh:yh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return Pa.lookAt(e),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new it(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(tn.min,ws.min),tn.expandByPoint(Et),Et.addVectors(tn.max,ws.max),tn.expandByPoint(Et)):(tn.expandByPoint(ws.min),tn.expandByPoint(ws.max))}tn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(Qi.fromBufferAttribute(e,c),Et.add(Qi)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ut(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new C,l[_]=new C;const c=new C,h=new C,d=new C,u=new ae,f=new ae,g=new ae,S=new C,p=new C;function m(_,E,I){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,I),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(S.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),o[_].add(S),o[E].add(S),o[I].add(S),l[_].add(p),l[E].add(p),l[I].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let _=0,E=M.length;_<E;++_){const I=M[_],D=I.start,F=I.count;for(let G=D,N=D+F;G<N;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const w=new C,x=new C,T=new C,b=new C;function R(_){T.fromBufferAttribute(s,_),b.copy(T);const E=o[_];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),x.crossVectors(b,E);const D=x.dot(l[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,D)}for(let _=0,E=M.length;_<E;++_){const I=M[_],D=I.start,F=I.count;for(let G=D,N=D+F;G<N;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),S=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let S=0,p=l.length;S<p;S++){o.isInterleavedBufferAttribute?f=l[S]*o.data.stride+o.offset:f=l[S]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new Ut(u,h,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ia=new C,Td=new C,Ed=new Xe;class Wn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ia.subVectors(n,t).cross(Td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Ia),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ed.getNormalMatrix(e),s=this.coplanarPoint(Ia).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let wd=0;class ki extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=Bs,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ch,this.blendDst=hh,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fa,this.stencilZFail=fa,this.stencilZPass=fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Wn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kn=new C,La=new C,gr=new C,vr=new C;class dl{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){La.copy(e).add(t).multiplyScalar(.5),gr.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(La);const r=e.distanceTo(t)*.5,a=-this.direction.dot(gr),o=vr.dot(this.direction),l=-vr.dot(gr),c=vr.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const S=1/h;d*=S,u*=S,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(La).addScaledVector(gr,u),f}intersectSphere(e,t){if(e.radius<0)return null;kn.subVectors(e.center,this.origin);const n=kn.dot(this.direction),s=kn.dot(kn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,S=t.y-a.y,p=t.z-a.z,m=n.x-a.x,M=n.y-a.y,w=n.z-a.z,x=Math.abs(l),T=Math.abs(c),b=Math.abs(h);let R,_,E,I,D,F,G,N,B,K,V,se;if(x>=T&&x>=b?(E=l,F=d,B=g,se=m,l>=0?(R=c,_=h,I=u,D=f,G=S,N=p,K=M,V=w):(R=h,_=c,I=f,D=u,G=p,N=S,K=w,V=M)):T>=b?(E=c,F=u,B=S,se=M,c>=0?(R=h,_=l,I=f,D=d,G=p,N=g,K=w,V=m):(R=l,_=h,I=d,D=f,G=g,N=p,K=m,V=w)):(E=h,F=f,B=p,se=w,h>=0?(R=l,_=c,I=d,D=u,G=g,N=S,K=m,V=M):(R=c,_=l,I=u,D=d,G=S,N=g,K=M,V=m)),E===0)return null;const X=R/E,j=_/E,ie=1/E,Ce=I-X*F,Te=D-j*F,Qe=G-X*B,qe=N-j*B,Ye=K-X*se,$=V-j*se,ne=Ye*qe-$*Qe,ge=Ce*$-Te*Ye,Fe=Qe*Te-qe*Ce;if(s){if(ne<0||ge<0||Fe<0)return null}else if((ne<0||ge<0||Fe<0)&&(ne>0||ge>0||Fe>0))return null;const q=ne+ge+Fe;if(q===0)return null;const te=ie*(ne*F+ge*B+Fe*se);return(q>0?te<0:te>0)?null:this.at(te/q,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jl=new tt,yi=new dl,_r=new jn,Ql=new C,xr=new C,Mr=new C,Sr=new C,Da=new C,yr=new C,jl=new C,br=new C;class Ne extends yt{constructor(e=new vt,t=new Ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Da.fromBufferAttribute(d,e),a?yr.addScaledVector(Da,h):yr.addScaledVector(Da.sub(t),h))}t.add(yr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(_r.containsPoint(yi.origin)===!1&&(yi.intersectSphere(_r,Ql)===null||yi.origin.distanceToSquared(Ql)>(e.far-e.near)**2))&&(Jl.copy(r).invert(),yi.copy(e.ray).applyMatrix4(Jl),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,S=u.length;g<S;g++){const p=u[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let x=M,T=w;x<T;x+=3){const b=o.getX(x),R=o.getX(x+1),_=o.getX(x+2);s=Tr(this,m,e,n,c,h,d,b,R,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),S=Math.min(o.count,f.start+f.count);for(let p=g,m=S;p<m;p+=3){const M=o.getX(p),w=o.getX(p+1),x=o.getX(p+2);s=Tr(this,a,e,n,c,h,d,M,w,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,S=u.length;g<S;g++){const p=u[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let x=M,T=w;x<T;x+=3){const b=x,R=x+1,_=x+2;s=Tr(this,m,e,n,c,h,d,b,R,_),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let p=g,m=S;p<m;p+=3){const M=p,w=p+1,x=p+2;s=Tr(this,a,e,n,c,h,d,M,w,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Ad(i,e,t,n,s,r,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Di,o),l===null)return null;br.copy(o),br.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(br);return c<t.near||c>t.far?null:{distance:c,point:br.clone(),object:i}}function Tr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,xr),i.getVertexPosition(l,Mr),i.getVertexPosition(c,Sr);const h=Ad(i,e,t,n,xr,Mr,Sr,jl);if(h){const d=new C;gn.getBarycoord(jl,xr,Mr,Sr,d),s&&(h.uv=gn.getInterpolatedAttribute(s,o,l,c,d,new ae)),r&&(h.uv1=gn.getInterpolatedAttribute(r,o,l,c,d,new ae)),a&&(h.normal=gn.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};gn.getNormal(xr,Mr,Sr,u.normal),h.face=u,h.barycoord=d}return h}class Th extends zt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Lt,h=Lt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ec extends Ut{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ji=new tt,tc=new tt,Er=[],nc=new zi,Cd=new tt,As=new Ne,Cs=new jn;class In extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ec(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ji),nc.copy(e.boundingBox).applyMatrix4(ji),this.boundingBox.union(nc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ji),Cs.copy(e.boundingSphere).applyMatrix4(ji),this.boundingSphere.union(Cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(As.geometry=this.geometry,As.material=this.material,As.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cs.copy(this.boundingSphere),Cs.applyMatrix4(n),e.ray.intersectsSphere(Cs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ji),tc.multiplyMatrices(n,ji),As.matrixWorld=tc,As.raycast(e,Er);for(let a=0,o=Er.length;a<o;a++){const l=Er[a];l.instanceId=r,l.object=this,t.push(l)}Er.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ec(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Th(new Float32Array(s*this.count),s,this.count,il,vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bi=new jn,Rd=new ae(.5,.5),wr=new C;class fl{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],S=r[9],p=r[10],m=r[11],M=r[12],w=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,m-g,T-M).normalize(),s[1].setComponents(c+a,f+h,m+g,T+M).normalize(),s[2].setComponents(c+o,f+d,m+S,T+w).normalize(),s[3].setComponents(c-o,f-d,m-S,T-w).normalize(),n)s[4].setComponents(l,u,p,x).normalize(),s[5].setComponents(c-l,f-u,m-p,T-x).normalize();else if(s[4].setComponents(c-l,f-u,m-p,T-x).normalize(),t===Pn)s[5].setComponents(c+l,f+u,m+p,T+x).normalize();else if(t===$s)s[5].setComponents(l,u,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){bi.center.set(0,0,0);const t=Rd.distanceTo(e.center);return bi.radius=.7071067811865476+t,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(wr.x=s.normal.x>0?e.max.x:e.min.x,wr.y=s.normal.y>0?e.max.y:e.min.y,wr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(wr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Pd extends ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ic=new tt,Do=new dl,Ar=new jn,Cr=new C;class Id extends yt{constructor(e=new vt,t=new Pd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(s),Ar.radius+=r,e.ray.intersectsSphere(Ar)===!1)return;ic.copy(s).invert(),Do.copy(e.ray).applyMatrix4(ic);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,S=f;g<S;g++){const p=c.getX(g);Cr.fromBufferAttribute(d,p),sc(Cr,p,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,S=f;g<S;g++)Cr.fromBufferAttribute(d,g),sc(Cr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function sc(i,e,t,n,s,r,a){const o=Do.distanceSqToPoint(i);if(o<t){const l=new C;Do.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Eh extends zt{constructor(e=[],t=Ui,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ld extends zt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qs extends zt{constructor(e,t,n=Un,s,r,a,o=Lt,l=Lt,c,h=Qn,d=1){if(h!==Qn&&h!==Ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Dd extends Qs{constructor(e,t=Un,n=Ui,s,r,a=Lt,o=Lt,l,c=Qn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class wh extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xn extends vt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(d,2));function g(S,p,m,M,w,x,T,b,R,_,E){const I=x/R,D=T/_,F=x/2,G=T/2,N=b/2,B=R+1,K=_+1;let V=0,se=0;const X=new C;for(let j=0;j<K;j++){const ie=j*D-G;for(let Ce=0;Ce<B;Ce++){const Te=Ce*I-F;X[S]=Te*M,X[p]=ie*w,X[m]=N,c.push(X.x,X.y,X.z),X[S]=0,X[p]=0,X[m]=b>0?1:-1,h.push(X.x,X.y,X.z),d.push(Ce/R),d.push(1-j/_),V+=1}}for(let j=0;j<_;j++)for(let ie=0;ie<R;ie++){const Ce=u+ie+B*j,Te=u+ie+B*(j+1),Qe=u+(ie+1)+B*(j+1),qe=u+(ie+1)+B*j;l.push(Ce,Te,qe),l.push(Te,Qe,qe),se+=6}o.addGroup(f,se,E),f+=se,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class pl extends vt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new C,h=new ae;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class wi extends vt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const S=[],p=n/2;let m=0;M(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(f,2));function M(){const x=new C,T=new C;let b=0;const R=(t-e)/n;for(let _=0;_<=r;_++){const E=[],I=_/r,D=I*(t-e)+e;for(let F=0;F<=s;F++){const G=F/s,N=G*l+o,B=Math.sin(N),K=Math.cos(N);T.x=D*B,T.y=-I*n+p,T.z=D*K,d.push(T.x,T.y,T.z),x.set(B,R,K).normalize(),u.push(x.x,x.y,x.z),f.push(G,1-I),E.push(g++)}S.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const I=S[E][_],D=S[E+1][_],F=S[E+1][_+1],G=S[E][_+1];(e>0||E!==0)&&(h.push(I,D,G),b+=3),(t>0||E!==r-1)&&(h.push(D,F,G),b+=3)}c.addGroup(m,b,0),m+=b}function w(x){const T=g,b=new ae,R=new C;let _=0;const E=x===!0?e:t,I=x===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,p*I,0),u.push(0,I,0),f.push(.5,.5),g++;const D=g;for(let F=0;F<=s;F++){const N=F/s*l+o,B=Math.cos(N),K=Math.sin(N);R.x=E*K,R.y=p*I,R.z=E*B,d.push(R.x,R.y,R.z),u.push(0,I,0),b.x=B*.5+.5,b.y=K*.5*I+.5,f.push(b.x,b.y),g++}for(let F=0;F<s;F++){const G=T+F,N=D+F;x===!0?h.push(N,N+1,G):h.push(N+1,N,G),_+=3}c.addGroup(m,_,x===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ia extends vt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(r.slice(),3)),this.setAttribute("uv",new it(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const w=new C,x=new C,T=new C;for(let b=0;b<t.length;b+=3)f(t[b+0],w),f(t[b+1],x),f(t[b+2],T),l(w,x,T,M)}function l(M,w,x,T){const b=T+1,R=[];for(let _=0;_<=b;_++){R[_]=[];const E=M.clone().lerp(x,_/b),I=w.clone().lerp(x,_/b),D=b-_;for(let F=0;F<=D;F++)F===0&&_===b?R[_][F]=E:R[_][F]=E.clone().lerp(I,F/D)}for(let _=0;_<b;_++)for(let E=0;E<2*(b-_)-1;E++){const I=Math.floor(E/2);E%2===0?(u(R[_][I+1]),u(R[_+1][I]),u(R[_][I])):(u(R[_][I+1]),u(R[_+1][I+1]),u(R[_+1][I]))}}function c(M){const w=new C;for(let x=0;x<r.length;x+=3)w.x=r[x+0],w.y=r[x+1],w.z=r[x+2],w.normalize().multiplyScalar(M),r[x+0]=w.x,r[x+1]=w.y,r[x+2]=w.z}function h(){const M=new C;for(let w=0;w<r.length;w+=3){M.x=r[w+0],M.y=r[w+1],M.z=r[w+2];const x=p(M)/2/Math.PI+.5,T=m(M)/Math.PI+.5;a.push(x,1-T)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){const w=a[M+0],x=a[M+2],T=a[M+4],b=Math.max(w,x,T),R=Math.min(w,x,T);b>.9&&R<.1&&(w<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,w){const x=M*3;w.x=e[x+0],w.y=e[x+1],w.z=e[x+2]}function g(){const M=new C,w=new C,x=new C,T=new C,b=new ae,R=new ae,_=new ae;for(let E=0,I=0;E<r.length;E+=9,I+=6){M.set(r[E+0],r[E+1],r[E+2]),w.set(r[E+3],r[E+4],r[E+5]),x.set(r[E+6],r[E+7],r[E+8]),b.set(a[I+0],a[I+1]),R.set(a[I+2],a[I+3]),_.set(a[I+4],a[I+5]),T.copy(M).add(w).add(x).divideScalar(3);const D=p(T);S(b,I+0,M,D),S(R,I+2,w,D),S(_,I+4,x,D)}}function S(M,w,x,T){T<0&&M.x===1&&(a[w]=M.x-1),x.x===0&&x.z===0&&(a[w]=T/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.vertices,e.indices,e.radius,e.detail)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ae:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,s=[],r=[],a=[],o=new C,l=new tt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ml extends Nn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ae){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ud extends ml{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function gl(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const rc=new C,ac=new C,Ua=new gl,Na=new gl,Fa=new gl;class Nd extends Nn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(ac.subVectors(s[0],s[1]).add(s[0]),c=ac);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(rc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=rc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),S=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);S<1e-4&&(S=1),g<1e-4&&(g=S),p<1e-4&&(p=S),Ua.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,S,p),Na.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,S,p),Fa.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,S,p)}else this.curveType==="catmullrom"&&(Ua.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Na.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Fa.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Ua.calc(l),Na.calc(l),Fa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function oc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Fd(i,e){const t=1-i;return t*t*e}function Od(i,e){return 2*(1-i)*i*e}function Bd(i,e){return i*i*e}function Hs(i,e,t,n){return Fd(i,e)+Od(i,t)+Bd(i,n)}function zd(i,e){const t=1-i;return t*t*t*e}function kd(i,e){const t=1-i;return 3*t*t*i*e}function Hd(i,e){return 3*(1-i)*i*i*e}function Gd(i,e){return i*i*i*e}function Gs(i,e,t,n,s){return zd(i,e)+kd(i,t)+Hd(i,n)+Gd(i,s)}class Ah extends Nn{constructor(e=new ae,t=new ae,n=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ae){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Gs(e,s.x,r.x,a.x,o.x),Gs(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vd extends Nn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Gs(e,s.x,r.x,a.x,o.x),Gs(e,s.y,r.y,a.y,o.y),Gs(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ch extends Nn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wd extends Nn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rh extends Nn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Hs(e,s.x,r.x,a.x),Hs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xd extends Nn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Hs(e,s.x,r.x,a.x),Hs(e,s.y,r.y,a.y),Hs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ph extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(oc(o,l.x,c.x,h.x,d.x),oc(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ae().fromArray(s))}return this}}var Uo=Object.freeze({__proto__:null,ArcCurve:Ud,CatmullRomCurve3:Nd,CubicBezierCurve:Ah,CubicBezierCurve3:Vd,EllipseCurve:ml,LineCurve:Ch,LineCurve3:Wd,QuadraticBezierCurve:Rh,QuadraticBezierCurve3:Xd,SplineCurve:Ph});class qd extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Uo[s.type]().fromJSON(s))}return this}}class No extends qd{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ch(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Rh(this.currentPoint.clone(),new ae(e,t),new ae(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Ah(this.currentPoint.clone(),new ae(e,t),new ae(n,s),new ae(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ph(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new ml(e,t,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class _s extends No{constructor(e){super(e),this.uuid=Bi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new No().fromJSON(s))}return this}}function Yd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Ih(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Qd(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,d=l;for(let u=t;u<s;u+=t){const f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return js(r,a,t,o,l,c,0),a}function Ih(i,e,t,n,s){let r;if(s===hf(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=lc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=lc(a/n|0,i[a],i[a+1],r);return r&&ps(r,r.next)&&(tr(r),r=r.next),r}function Fi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ps(t,t.next)||gt(t.prev,t,t.next)===0)){if(tr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function js(i,e,t,n,s,r,a){if(!i)return;!a&&r&&sf(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?$d(i,n,s,r):Zd(i)){e.push(l.i,i.i,c.i),tr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Kd(Fi(i),e),js(i,e,t,n,s,r,2)):a===2&&Jd(i,e,t,n,s,r):js(Fi(i),e,t,n,s,r,1);break}}}function Zd(i){const e=i.prev,t=i,n=i.next;if(gt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Ns(s,o,r,l,a,c,g.x,g.y)&&gt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function $d(i,e,t,n){const s=i.prev,r=i,a=i.next;if(gt(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),S=Math.max(o,l,c),p=Math.max(h,d,u),m=Fo(f,g,e,t,n),M=Fo(S,p,e,t,n);let w=i.prevZ,x=i.nextZ;for(;w&&w.z>=m&&x&&x.z<=M;){if(w.x>=f&&w.x<=S&&w.y>=g&&w.y<=p&&w!==s&&w!==a&&Ns(o,h,l,d,c,u,w.x,w.y)&&gt(w.prev,w,w.next)>=0||(w=w.prevZ,x.x>=f&&x.x<=S&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ns(o,h,l,d,c,u,x.x,x.y)&&gt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;w&&w.z>=m;){if(w.x>=f&&w.x<=S&&w.y>=g&&w.y<=p&&w!==s&&w!==a&&Ns(o,h,l,d,c,u,w.x,w.y)&&gt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=S&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ns(o,h,l,d,c,u,x.x,x.y)&&gt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Kd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!ps(n,s)&&Dh(n,t,t.next,s)&&er(n,s)&&er(s,n)&&(e.push(n.i,t.i,s.i),tr(t),tr(t.next),t=i=s),t=t.next}while(t!==i);return Fi(t)}function Jd(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&of(a,o)){let l=Uh(a,o);a=Fi(a,a.next),l=Fi(l,l.next),js(a,e,t,n,s,r,0),js(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Qd(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Ih(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(af(c))}s.sort(jd);for(let r=0;r<s.length;r++)t=ef(s[r],t);return t}function jd(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function ef(i,e){const t=tf(i,e);if(!t)return e;const n=Uh(t,i);return Fi(n,n.next),Fi(t,t.next)}function tf(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(ps(i,t))return t;do{if(ps(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Lh(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const d=Math.abs(s-t.y)/(n-t.x);er(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&nf(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function nf(i,e){return gt(i.prev,i,e.prev)<0&&gt(e.next,i,i.next)<0}function sf(i,e,t,n){let s=i;do s.z===0&&(s.z=Fo(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rf(s)}function rf(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Fo(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function af(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Lh(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Ns(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Lh(i,e,t,n,s,r,a,o)}function of(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!lf(i,e)&&(er(i,e)&&er(e,i)&&cf(i,e)&&(gt(i.prev,i,e.prev)||gt(i,e.prev,e))||ps(i,e)&&gt(i.prev,i,i.next)>0&&gt(e.prev,e,e.next)>0)}function gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ps(i,e){return i.x===e.x&&i.y===e.y}function Dh(i,e,t,n){const s=Pr(gt(i,e,t)),r=Pr(gt(i,e,n)),a=Pr(gt(t,n,i)),o=Pr(gt(t,n,e));return!!(s!==r&&a!==o||s===0&&Rr(i,t,e)||r===0&&Rr(i,n,e)||a===0&&Rr(t,i,n)||o===0&&Rr(t,e,n))}function Rr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Pr(i){return i>0?1:i<0?-1:0}function lf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Dh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function er(i,e){return gt(i.prev,i,i.next)<0?gt(i,e,i.next)>=0&&gt(i,i.prev,e)>=0:gt(i,e,i.prev)<0||gt(i,i.next,e)<0}function cf(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Uh(i,e){const t=Oo(i.i,i.x,i.y),n=Oo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function lc(i,e,t,n){const s=Oo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function tr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Oo(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hf(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class uf{static triangulate(e,t,n=2){return Yd(e,t,n)}}class Yn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Yn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];cc(e),hc(n,e);let a=e.length;t.forEach(cc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,hc(n,t[l]);const o=uf.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function cc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function hc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class nr extends vt{constructor(e=new _s([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new it(s,3)),this.setAttribute("uv",new it(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,S=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:df;let w,x=!1,T,b,R,_;if(m){w=m.getSpacedPoints(h),x=!0,u=!1;const W=m.isCatmullRomCurve3?m.closed:!1;T=m.computeFrenetFrames(h,W),b=new C,R=new C,_=new C}u||(p=0,f=0,g=0,S=0);const E=o.extractPoints(c);let I=E.shape;const D=E.holes;if(!Yn.isClockWise(I)){I=I.reverse();for(let W=0,re=D.length;W<re;W++){const he=D[W];Yn.isClockWise(he)&&(D[W]=he.reverse())}}function G(W){const he=10000000000000001e-36;let ce=W[0];for(let pe=1;pe<=W.length;pe++){const ze=pe%W.length,Oe=W[ze],He=Oe.x-ce.x,Ve=Oe.y-ce.y,L=He*He+Ve*Ve,rt=Math.max(Math.abs(Oe.x),Math.abs(Oe.y),Math.abs(ce.x),Math.abs(ce.y)),Ze=he*rt*rt;if(L<=Ze){W.splice(ze,1),pe--;continue}ce=Oe}}G(I),D.forEach(G);const N=D.length,B=I;for(let W=0;W<N;W++){const re=D[W];I=I.concat(re)}function K(W,re,he){return re||nt("ExtrudeGeometry: vec does not exist"),W.clone().addScaledVector(re,he)}const V=I.length;function se(W,re,he){let ce,pe,ze;const Oe=W.x-re.x,He=W.y-re.y,Ve=he.x-W.x,L=he.y-W.y,rt=Oe*Oe+He*He,Ze=Oe*L-He*Ve;if(Math.abs(Ze)>Number.EPSILON){const A=Math.sqrt(rt),v=Math.sqrt(Ve*Ve+L*L),O=re.x-He/A,H=re.y+Oe/A,Z=he.x-L/v,ue=he.y+Ve/v,fe=((Z-O)*L-(ue-H)*Ve)/(Oe*L-He*Ve);ce=O+Oe*fe-W.x,pe=H+He*fe-W.y;const J=ce*ce+pe*pe;if(J<=2)return new ae(ce,pe);ze=Math.sqrt(J/2)}else{let A=!1;Oe>Number.EPSILON?Ve>Number.EPSILON&&(A=!0):Oe<-Number.EPSILON?Ve<-Number.EPSILON&&(A=!0):Math.sign(He)===Math.sign(L)&&(A=!0),A?(ce=-He,pe=Oe,ze=Math.sqrt(rt)):(ce=Oe,pe=He,ze=Math.sqrt(rt/2))}return new ae(ce/ze,pe/ze)}const X=[];for(let W=0,re=B.length,he=re-1,ce=W+1;W<re;W++,he++,ce++)he===re&&(he=0),ce===re&&(ce=0),X[W]=se(B[W],B[he],B[ce]);const j=[];let ie,Ce=X.concat();for(let W=0,re=N;W<re;W++){const he=D[W];ie=[];for(let ce=0,pe=he.length,ze=pe-1,Oe=ce+1;ce<pe;ce++,ze++,Oe++)ze===pe&&(ze=0),Oe===pe&&(Oe=0),ie[ce]=se(he[ce],he[ze],he[Oe]);j.push(ie),Ce=Ce.concat(ie)}let Te;if(p===0)Te=Yn.triangulateShape(B,D);else{const W=[],re=[];for(let he=0;he<p;he++){const ce=he/p,pe=f*Math.cos(ce*Math.PI/2),ze=g*Math.sin(ce*Math.PI/2)+S;for(let Oe=0,He=B.length;Oe<He;Oe++){const Ve=K(B[Oe],X[Oe],ze);ge(Ve.x,Ve.y,-pe),ce===0&&W.push(Ve)}for(let Oe=0,He=N;Oe<He;Oe++){const Ve=D[Oe];ie=j[Oe];const L=[];for(let rt=0,Ze=Ve.length;rt<Ze;rt++){const A=K(Ve[rt],ie[rt],ze);ge(A.x,A.y,-pe),ce===0&&L.push(A)}ce===0&&re.push(L)}}Te=Yn.triangulateShape(W,re)}const Qe=Te.length,qe=g+S;for(let W=0;W<V;W++){const re=u?K(I[W],Ce[W],qe):I[W];x?(R.copy(T.normals[0]).multiplyScalar(re.x),b.copy(T.binormals[0]).multiplyScalar(re.y),_.copy(w[0]).add(R).add(b),ge(_.x,_.y,_.z)):ge(re.x,re.y,0)}for(let W=1;W<=h;W++)for(let re=0;re<V;re++){const he=u?K(I[re],Ce[re],qe):I[re];x?(R.copy(T.normals[W]).multiplyScalar(he.x),b.copy(T.binormals[W]).multiplyScalar(he.y),_.copy(w[W]).add(R).add(b),ge(_.x,_.y,_.z)):ge(he.x,he.y,d/h*W)}for(let W=p-1;W>=0;W--){const re=W/p,he=f*Math.cos(re*Math.PI/2),ce=g*Math.sin(re*Math.PI/2)+S;for(let pe=0,ze=B.length;pe<ze;pe++){const Oe=K(B[pe],X[pe],ce);ge(Oe.x,Oe.y,d+he)}for(let pe=0,ze=D.length;pe<ze;pe++){const Oe=D[pe];ie=j[pe];for(let He=0,Ve=Oe.length;He<Ve;He++){const L=K(Oe[He],ie[He],ce);x?ge(L.x,L.y+w[h-1].y,w[h-1].x+he):ge(L.x,L.y,d+he)}}}Ye(),$();function Ye(){const W=s.length/3;if(u){let re=0,he=V*re;for(let ce=0;ce<Qe;ce++){const pe=Te[ce];Fe(pe[2]+he,pe[1]+he,pe[0]+he)}re=h+p*2,he=V*re;for(let ce=0;ce<Qe;ce++){const pe=Te[ce];Fe(pe[0]+he,pe[1]+he,pe[2]+he)}}else{for(let re=0;re<Qe;re++){const he=Te[re];Fe(he[2],he[1],he[0])}for(let re=0;re<Qe;re++){const he=Te[re];Fe(he[0]+V*h,he[1]+V*h,he[2]+V*h)}}n.addGroup(W,s.length/3-W,0)}function $(){const W=s.length/3;let re=0;ne(B,re),re+=B.length;for(let he=0,ce=D.length;he<ce;he++){const pe=D[he];ne(pe,re),re+=pe.length}n.addGroup(W,s.length/3-W,1)}function ne(W,re){let he=W.length;for(;--he>=0;){const ce=he;let pe=he-1;pe<0&&(pe=W.length-1);for(let ze=0,Oe=h+p*2;ze<Oe;ze++){const He=V*ze,Ve=V*(ze+1),L=re+ce+He,rt=re+pe+He,Ze=re+pe+Ve,A=re+ce+Ve;q(L,rt,Ze,A)}}}function ge(W,re,he){l.push(W),l.push(re),l.push(he)}function Fe(W,re,he){te(W),te(re),te(he);const ce=s.length/3,pe=M.generateTopUV(n,s,ce-3,ce-2,ce-1);Me(pe[0]),Me(pe[1]),Me(pe[2])}function q(W,re,he,ce){te(W),te(re),te(ce),te(re),te(he),te(ce);const pe=s.length/3,ze=M.generateSideWallUV(n,s,pe-6,pe-3,pe-2,pe-1);Me(ze[0]),Me(ze[1]),Me(ze[3]),Me(ze[1]),Me(ze[2]),Me(ze[3])}function te(W){s.push(l[W*3+0]),s.push(l[W*3+1]),s.push(l[W*3+2])}function Me(W){r.push(W.x),r.push(W.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ff(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Uo[s.type]().fromJSON(s)),new nr(n,e.options)}}const df={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ae(r,a),new ae(o,l),new ae(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],g=e[s*3+2],S=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ae(a,1-l),new ae(c,1-d),new ae(u,1-g),new ae(S,1-m)]:[new ae(o,1-l),new ae(h,1-d),new ae(f,1-g),new ae(p,1-m)]}};function ff(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ds extends vt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Je(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,d=new C,u=new ae,f=new C,g=new C,S=new C;let p=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:p=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-p,f.z=m*0,S.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(S.x,S.y,S.z);break;default:p=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=S.x,f.y+=S.y,f.z+=S.z,f.normalize(),l.push(f.x,f.y,f.z),S.copy(g)}for(let M=0;M<=t;M++){const w=n+M*h*s,x=Math.sin(w),T=Math.cos(w);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*x,d.y=e[b].y,d.z=e[b].x*T,a.push(d.x,d.y,d.z),u.x=M/t,u.y=b/(e.length-1),o.push(u.x,u.y);const R=l[3*b+0]*x,_=l[3*b+1],E=l[3*b+0]*T;c.push(R,_,E)}}for(let M=0;M<t;M++)for(let w=0;w<e.length-1;w++){const x=w+M*e.length,T=x,b=x+e.length,R=x+e.length+1,_=x+1;r.push(T,b,_),r.push(R,_,b)}this.setIndex(r),this.setAttribute("position",new it(a,3)),this.setAttribute("uv",new it(o,2)),this.setAttribute("normal",new it(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.points,e.segments,e.phiStart,e.phiLength)}}class vl extends ia{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vl(e.radius,e.detail)}}class Bt extends vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],S=[],p=[];for(let m=0;m<h;m++){const M=m*u-a;for(let w=0;w<c;w++){const x=w*d-r;g.push(x,-M,0),S.push(0,0,1),p.push(w/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const w=M+c*m,x=M+c*(m+1),T=M+1+c*(m+1),b=M+1+c*m;f.push(w,x,b),f.push(x,T,b)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(S,3)),this.setAttribute("uv",new it(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ii extends vt{constructor(e=new _s([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new it(s,3)),this.setAttribute("normal",new it(r,3)),this.setAttribute("uv",new it(a,2));function c(h){const d=s.length/3,u=h.extractPoints(t);let f=u.shape;const g=u.holes;Yn.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){const M=g[p];Yn.isClockWise(M)===!0&&(g[p]=M.reverse())}const S=Yn.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){const M=g[p];f=f.concat(M)}for(let p=0,m=f.length;p<m;p++){const M=f[p];s.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let p=0,m=S.length;p<m;p++){const M=S[p],w=M[0]+d,x=M[1]+d,T=M[2]+d;n.push(w,x,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return pf(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Ii(n,e.curveSegments)}}function pf(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Pi extends vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new C,u=new C,f=[],g=[],S=[],p=[];for(let m=0;m<=n;m++){const M=[],w=m/n,x=a+w*o,T=e*Math.cos(x),b=Math.sqrt(e*e-T*T);let R=0;m===0&&a===0?R=.5/t:m===n&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const E=_/t,I=s+E*r;d.x=-b*Math.cos(I),d.y=T,d.z=b*Math.sin(I),g.push(d.x,d.y,d.z),u.copy(d).normalize(),S.push(u.x,u.y,u.z),p.push(E+R,1-w),M.push(c++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){const w=h[m][M+1],x=h[m][M],T=h[m+1][M],b=h[m+1][M+1];(m!==0||a>0)&&f.push(w,x,b),(m!==n-1||l<Math.PI)&&f.push(x,T,b)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(S,3)),this.setAttribute("uv",new it(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _l extends ia{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _l(e.radius,e.detail)}}class sn extends vt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new C,f=new C,g=new C;for(let S=0;S<=n;S++){const p=a+S/n*o;for(let m=0;m<=s;m++){const M=m/s*r;f.x=(e+t*Math.cos(p))*Math.cos(M),f.y=(e+t*Math.cos(p))*Math.sin(M),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(m/s),d.push(S/n)}}for(let S=1;S<=n;S++)for(let p=1;p<=s;p++){const m=(s+1)*S+p-1,M=(s+1)*(S-1)+p-1,w=(s+1)*(S-1)+p,x=(s+1)*S+p;l.push(m,M,x),l.push(M,w,x)}this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function ms(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(uc(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(uc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Wt(i){const e={};for(let t=0;t<i.length;t++){const n=ms(i[t]);for(const s in n)e[s]=n[s]}return e}function uc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function mf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Nh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const ir={clone:ms,merge:Wt};var gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class St extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gf,this.fragmentShader=vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=mf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(s.value);break;case"v2":this.uniforms[n].value=new ae().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new tt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Fh extends St{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ct extends ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _f extends ct{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xf extends ki{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.combine=Yo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mf extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sf extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class xl extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class yf extends xl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Oa=new tt,dc=new C,fc=new C;class Oh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fl,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;dc.setFromMatrixPosition(e.matrixWorld),t.position.copy(dc),fc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Oa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oa,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===$s||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ir=new C,Lr=new Zt,bn=new C;class Bh extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ir,Lr,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ir,Lr,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const oi=new C,pc=new ae,mc=new ae;class cn extends Bh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ks*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,pc,mc),t.subVectors(mc,pc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class bf extends Oh{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0}}class zh extends xl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new bf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class rr extends Bh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Tf extends Oh{constructor(){super(new rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gc extends xl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Tf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const es=-90,ts=1;class Ef extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new cn(es,ts,e,t);s.layers=this.layers,this.add(s);const r=new cn(es,ts,e,t);r.layers=this.layers,this.add(r);const a=new cn(es,ts,e,t);a.layers=this.layers,this.add(a);const o=new cn(es,ts,e,t);o.layers=this.layers,this.add(o);const l=new cn(es,ts,e,t);l.layers=this.layers,this.add(l);const c=new cn(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$s)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wf extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Af{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Cf.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Cf(){this._document.hidden===!1&&this.reset()}const vc=new tt;class _c{constructor(e,t,n=0,s=1/0){this.ray=new dl(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):nt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(e,t=!0,n=[]){return Bo(e,this,n,t),n.sort(xc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Bo(e[s],this,n,t);return n.sort(xc),n}}function xc(i,e){return i.distance-e.distance}function Bo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Bo(r[a],e,t,!0)}}class kh{static{kh.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function Mc(i,e,t,n){const s=Rf(n);switch(t){case gh:return i*e;case il:return i*e/s.components*s.byteLength;case sl:return i*e/s.components*s.byteLength;case Ni:return i*e*2/s.components*s.byteLength;case rl:return i*e*2/s.components*s.byteLength;case vh:return i*e*3/s.components*s.byteLength;case _n:return i*e*4/s.components*s.byteLength;case al:return i*e*4/s.components*s.byteLength;case zr:case kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Hr:case Gr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case io:case ro:return Math.max(i,16)*Math.max(e,8)/4;case no:case so:return Math.max(i,8)*Math.max(e,8)/2;case ao:case oo:case co:case ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:case qr:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _o:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Co:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Po:case Io:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Yr:case Lo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rf(i){switch(i){case rn:case dh:return{byteLength:1,components:1};case Ys:case fh:case Yt:return{byteLength:2,components:1};case tl:case nl:return{byteLength:2,components:4};case Un:case el:case vn:return{byteLength:4,components:1};case ph:case mh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);function Hh(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Pf(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],S=d[f];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++u,d[u]=S)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const S=d[f];i.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var If=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Df=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Of=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ep=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,np=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,op="gl_FragColor = linearToOutputTexel( gl_FragColor );",lp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_p=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ip=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Np=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Op=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,em=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,im=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,am=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,pm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_m=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ym=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Em=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,zm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,km=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Km=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,n0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:If,alphahash_pars_fragment:Lf,alphamap_fragment:Df,alphamap_pars_fragment:Uf,alphatest_fragment:Nf,alphatest_pars_fragment:Ff,aomap_fragment:Of,aomap_pars_fragment:Bf,batching_pars_vertex:zf,batching_vertex:kf,begin_vertex:Hf,beginnormal_vertex:Gf,bsdfs:Vf,iridescence_fragment:Wf,bumpmap_pars_fragment:Xf,clipping_planes_fragment:qf,clipping_planes_pars_fragment:Yf,clipping_planes_pars_vertex:Zf,clipping_planes_vertex:$f,color_fragment:Kf,color_pars_fragment:Jf,color_pars_vertex:Qf,color_vertex:jf,common:ep,cube_uv_reflection_fragment:tp,defaultnormal_vertex:np,displacementmap_pars_vertex:ip,displacementmap_vertex:sp,emissivemap_fragment:rp,emissivemap_pars_fragment:ap,colorspace_fragment:op,colorspace_pars_fragment:lp,envmap_fragment:cp,envmap_common_pars_fragment:hp,envmap_pars_fragment:up,envmap_pars_vertex:dp,envmap_physical_pars_fragment:bp,envmap_vertex:fp,fog_vertex:pp,fog_pars_vertex:mp,fog_fragment:gp,fog_pars_fragment:vp,gradientmap_pars_fragment:_p,lightmap_pars_fragment:xp,lights_lambert_fragment:Mp,lights_lambert_pars_fragment:Sp,lights_pars_begin:yp,lights_toon_fragment:Tp,lights_toon_pars_fragment:Ep,lights_phong_fragment:wp,lights_phong_pars_fragment:Ap,lights_physical_fragment:Cp,lights_physical_pars_fragment:Rp,lights_fragment_begin:Pp,lights_fragment_maps:Ip,lights_fragment_end:Lp,lightprobes_pars_fragment:Dp,logdepthbuf_fragment:Up,logdepthbuf_pars_fragment:Np,logdepthbuf_pars_vertex:Fp,logdepthbuf_vertex:Op,map_fragment:Bp,map_pars_fragment:zp,map_particle_fragment:kp,map_particle_pars_fragment:Hp,metalnessmap_fragment:Gp,metalnessmap_pars_fragment:Vp,morphinstance_vertex:Wp,morphcolor_vertex:Xp,morphnormal_vertex:qp,morphtarget_pars_vertex:Yp,morphtarget_vertex:Zp,normal_fragment_begin:$p,normal_fragment_maps:Kp,normal_pars_fragment:Jp,normal_pars_vertex:Qp,normal_vertex:jp,normalmap_pars_fragment:em,clearcoat_normal_fragment_begin:tm,clearcoat_normal_fragment_maps:nm,clearcoat_pars_fragment:im,iridescence_pars_fragment:sm,opaque_fragment:rm,packing:am,premultiplied_alpha_fragment:om,project_vertex:lm,dithering_fragment:cm,dithering_pars_fragment:hm,roughnessmap_fragment:um,roughnessmap_pars_fragment:dm,shadowmap_pars_fragment:fm,shadowmap_pars_vertex:pm,shadowmap_vertex:mm,shadowmask_pars_fragment:gm,skinbase_vertex:vm,skinning_pars_vertex:_m,skinning_vertex:xm,skinnormal_vertex:Mm,specularmap_fragment:Sm,specularmap_pars_fragment:ym,tonemapping_fragment:bm,tonemapping_pars_fragment:Tm,transmission_fragment:Em,transmission_pars_fragment:wm,uv_pars_fragment:Am,uv_pars_vertex:Cm,uv_vertex:Rm,worldpos_vertex:Pm,background_vert:Im,background_frag:Lm,backgroundCube_vert:Dm,backgroundCube_frag:Um,cube_vert:Nm,cube_frag:Fm,depth_vert:Om,depth_frag:Bm,distance_vert:zm,distance_frag:km,equirect_vert:Hm,equirect_frag:Gm,linedashed_vert:Vm,linedashed_frag:Wm,meshbasic_vert:Xm,meshbasic_frag:qm,meshlambert_vert:Ym,meshlambert_frag:Zm,meshmatcap_vert:$m,meshmatcap_frag:Km,meshnormal_vert:Jm,meshnormal_frag:Qm,meshphong_vert:jm,meshphong_frag:e0,meshphysical_vert:t0,meshphysical_frag:n0,meshtoon_vert:i0,meshtoon_frag:s0,points_vert:r0,points_frag:a0,shadow_vert:o0,shadow_frag:l0,sprite_vert:c0,sprite_frag:h0},Se={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},An={basic:{uniforms:Wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Wt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Wt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new we(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Wt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Wt([Se.points,Se.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Wt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Wt([Se.common,Se.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Wt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Wt([Se.sprite,Se.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Wt([Se.common,Se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Wt([Se.lights,Se.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};An.physical={uniforms:Wt([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Dr={r:0,b:0,g:0},u0=new tt,Gh=new Xe;Gh.set(-1,0,0,0,1,0,0,0,1);function d0(i,e,t,n,s,r){const a=new we(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){const x=M.backgroundBlurriness>0;w=e.get(w,x)}return w}function g(M){let w=!1;const x=f(M);x===null?p(a,o):x&&x.isColor&&(p(x,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(M,w){const x=f(w);x&&(x.isCubeTexture||x.mapping===na)?(c===void 0&&(c=new Ne(new xn(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:ms(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(u0.makeRotationFromEuler(w.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Gh),c.material.toneMapped=et.getTransfer(x.colorSpace)!==lt,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ne(new Bt(2,2),new St({name:"BackgroundMaterial",uniforms:ms(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=et.getTransfer(x.colorSpace)!==lt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,w){M.getRGB(Dr,Nh(i)),t.buffers.color.setClear(Dr.r,Dr.g,Dr.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:S,dispose:m}}function f0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(D,F,G,N,B){let K=!1;const V=d(D,N,G,F);r!==V&&(r=V,c(r.object)),K=f(D,N,G,B),K&&g(D,N,G,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(D,F,G,N),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function d(D,F,G,N){const B=N.wireframe===!0;let K=n[F.id];K===void 0&&(K={},n[F.id]=K);const V=D.isInstancedMesh===!0?D.id:0;let se=K[V];se===void 0&&(se={},K[V]=se);let X=se[G.id];X===void 0&&(X={},se[G.id]=X);let j=X[B];return j===void 0&&(j=u(l()),X[B]=j),j}function u(D){const F=[],G=[],N=[];for(let B=0;B<t;B++)F[B]=0,G[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:N,object:D,attributes:{},index:null}}function f(D,F,G,N){const B=r.attributes,K=F.attributes;let V=0;const se=G.getAttributes();for(const X in se)if(se[X].location>=0){const ie=B[X];let Ce=K[X];if(Ce===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Ce=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Ce=D.instanceColor)),ie===void 0||ie.attribute!==Ce||Ce&&ie.data!==Ce.data)return!0;V++}return r.attributesNum!==V||r.index!==N}function g(D,F,G,N){const B={},K=F.attributes;let V=0;const se=G.getAttributes();for(const X in se)if(se[X].location>=0){let ie=K[X];ie===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor));const Ce={};Ce.attribute=ie,ie&&ie.data&&(Ce.data=ie.data),B[X]=Ce,V++}r.attributes=B,r.attributesNum=V,r.index=N}function S(){const D=r.newAttributes;for(let F=0,G=D.length;F<G;F++)D[F]=0}function p(D){m(D,0)}function m(D,F){const G=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;G[D]=1,N[D]===0&&(i.enableVertexAttribArray(D),N[D]=1),B[D]!==F&&(i.vertexAttribDivisor(D,F),B[D]=F)}function M(){const D=r.newAttributes,F=r.enabledAttributes;for(let G=0,N=F.length;G<N;G++)F[G]!==D[G]&&(i.disableVertexAttribArray(G),F[G]=0)}function w(D,F,G,N,B,K,V){V===!0?i.vertexAttribIPointer(D,F,G,B,K):i.vertexAttribPointer(D,F,G,N,B,K)}function x(D,F,G,N){S();const B=N.attributes,K=G.getAttributes(),V=F.defaultAttributeValues;for(const se in K){const X=K[se];if(X.location>=0){let j=B[se];if(j===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){const ie=j.normalized,Ce=j.itemSize,Te=e.get(j);if(Te===void 0)continue;const Qe=Te.buffer,qe=Te.type,Ye=Te.bytesPerElement,$=qe===i.INT||qe===i.UNSIGNED_INT||j.gpuType===el;if(j.isInterleavedBufferAttribute){const ne=j.data,ge=ne.stride,Fe=j.offset;if(ne.isInstancedInterleavedBuffer){for(let q=0;q<X.locationSize;q++)m(X.location+q,ne.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let q=0;q<X.locationSize;q++)p(X.location+q);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let q=0;q<X.locationSize;q++)w(X.location+q,Ce/X.locationSize,qe,ie,ge*Ye,(Fe+Ce/X.locationSize*q)*Ye,$)}else{if(j.isInstancedBufferAttribute){for(let ne=0;ne<X.locationSize;ne++)m(X.location+ne,j.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ne=0;ne<X.locationSize;ne++)p(X.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let ne=0;ne<X.locationSize;ne++)w(X.location+ne,Ce/X.locationSize,qe,ie,Ce*Ye,Ce/X.locationSize*ne*Ye,$)}}else if(V!==void 0){const ie=V[se];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(X.location,ie);break;case 3:i.vertexAttrib3fv(X.location,ie);break;case 4:i.vertexAttrib4fv(X.location,ie);break;default:i.vertexAttrib1fv(X.location,ie)}}}}M()}function T(){E();for(const D in n){const F=n[D];for(const G in F){const N=F[G];for(const B in N){const K=N[B];for(const V in K)h(K[V].object),delete K[V];delete N[B]}}delete n[D]}}function b(D){if(n[D.id]===void 0)return;const F=n[D.id];for(const G in F){const N=F[G];for(const B in N){const K=N[B];for(const V in K)h(K[V].object),delete K[V];delete N[B]}}delete n[D.id]}function R(D){for(const F in n){const G=n[F];for(const N in G){const B=G[N];if(B[D.id]===void 0)continue;const K=B[D.id];for(const V in K)h(K[V].object),delete K[V];delete B[D.id]}}}function _(D){for(const F in n){const G=n[F],N=D.isInstancedMesh===!0?D.id:0,B=G[N];if(B!==void 0){for(const K in B){const V=B[K];for(const se in V)h(V[se].object),delete V[se];delete B[K]}delete G[N],Object.keys(G).length===0&&delete n[F]}}}function E(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:S,enableAttribute:p,disableUnusedAttributes:M}}function p0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function m0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==_n&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===Yt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==rn&&R!==vn&&!_&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ge("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:x,maxSamples:T,samples:b}}function g0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Wn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,S=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const M=r?0:n,w=M*4;let x=m.clippingState||null;l.value=x,x=h(g,u,w,f);for(let T=0;T!==w;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const S=d!==null?d.length:0;let p=null;if(S!==0){if(p=l.value,g!==!0||p===null){const m=f+S*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let w=0,x=f;w!==S;++w,x+=4)a.copy(d[w]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}const ls=4,v0=6,_0=20,x0=256,Rs=new rr,Sc=new we;let Ba=null,za=0,ka=0,Ha=!1;const M0=new C,Ti=new C;class zo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=M0}=r;Ba=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ba,za,ka),this._renderer.xr.enabled=Ha,e.scissorTest=!1,ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ba=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Yt,format:_n,colorSpace:$r,depthBuffer:!1},s=yc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=S0(r)),this._blurMaterial=b0(r,e,t),this._ggxMaterial=y0(r,e,t)}return s}_compileMaterial(e){const t=new Ne(new vt,e);this._renderer.compile(t,Rs)}_sceneToCubeUV(e,t,n,s,r){const l=new cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Sc),d.toneMapping=Dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ne(new xn,new Ct({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,p=S.material;let m=!1;const M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,m=!0):(p.color.copy(Sc),m=!0);for(let w=0;w<6;w++){const x=w%3;x===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):x===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;ns(s,x*T,w>2?T:0,T,T),d.setRenderTarget(s),m&&d.render(S,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ui||e.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ns(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Rs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,S=this._sizeLods[n],p=3*S*(n>g-ls?n-g+ls:0),m=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,ns(r,p,m,3*S,2*S),s.setRenderTarget(r),s.render(o,Rs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,ns(e,p,m,3*S,2*S),s.setRenderTarget(e),s.render(o,Rs)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],d=3*h*(s>this._lodMax-ls?s-this._lodMax+ls:0),u=4*(this._cubeSize-h);ns(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Rs)}}function S0(i){const e=[],t=[];let n=i;const s=i-ls+1+v0;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),S=new Float32Array(f*u*d);for(let m=0;m<d;m++){const M=m%3*2/3-1,w=m>2?0:-1,x=[M,w,0,M+2/3,w,0,M+2/3,w+1,0,M,w,0,M+2/3,w+1,0,M,w+1,0];g.set(x,f*u*m);for(let T=0;T<u;T++){const b=h[T*2]*2-1,R=h[T*2+1]*2-1;m===0?Ti.set(1,R,b):m===1?Ti.set(-b,1,-R):m===2?Ti.set(-b,R,1):m===3?Ti.set(-1,R,-b):m===4?Ti.set(-b,-1,R):Ti.set(b,R,-1),Ti.toArray(S,(m*u+T)*f)}}const p=new vt;p.setAttribute("position",new Ut(g,f)),p.setAttribute("outputDirection",new Ut(S,f)),t.push(new Ne(p,null)),n>ls&&n--}return{lodMeshes:t,sizeLods:e}}function yc(i,e,t){const n=new kt(i,e,t);return n.texture.mapping=na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ns(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function y0(i,e,t){return new St({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:x0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function b0(i,e,t){return new St({name:"SphericalGaussianBlur",defines:{SAMPLES:_0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function bc(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Tc(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function sa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Vh extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Eh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new xn(5,5,5),r=new St({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Ln});r.uniforms.tEquirect.value=t;const a=new Ne(s,r),o=t.minFilter;return t.minFilter===di&&(t.minFilter=Dt),new Ef(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function T0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===ha||f===ua)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const S=new Vh(g.height);return S.fromEquirectangularTexture(i,u),e.set(u,S),u.addEventListener("dispose",c),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===ha||f===ua,S=f===Ui||f===fs;if(g||S){let p=t.get(u);const m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new zo(i)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const M=u.image;return g&&M&&M.height>0||S&&M&&l(M)?(n===null&&(n=new zo(i)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===ha?u.mapping=Ui:f===ua&&(u.mapping=fs),u}function l(u){let f=0;const g=6;for(let S=0;S<g;S++)u[S]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function E0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&hs("WebGLRenderer: "+n+" extension not supported."),s}}}function w0(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let S=0;if(g===void 0)return;if(f!==null){const M=f.array;S=f.version;for(let w=0,x=M.length;w<x;w+=3){const T=M[w+0],b=M[w+1],R=M[w+2];u.push(T,b,b,R,R,T)}}else{const M=g.array;S=g.version;for(let w=0,x=M.length/3-1;w<x;w+=3){const T=w+0,b=w+1,R=w+2;u.push(T,b,b,R,R,T)}}const p=new(g.count>=65535?bh:yh)(u,1);p.version=S;const m=r.get(d);m&&e.remove(m),r.set(d,p)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function A0(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let S=0;for(let p=0;p<f;p++)S+=u[p];t.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function C0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function R0(i,e,t){const n=new WeakMap,s=new mt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let I=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",I)};var f=I;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),S===!0&&(x=2),p===!0&&(x=3);let T=o.attributes.position.count*x,b=1;T>e.maxTextureSize&&(b=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*b*4*d),_=new xh(R,T,b,d);_.type=vn,_.needsUpdate=!0;const E=x*4;for(let D=0;D<d;D++){const F=m[D],G=M[D],N=w[D],B=T*b*4*D;for(let K=0;K<F.count;K++){const V=K*E;g===!0&&(s.fromBufferAttribute(F,K),R[B+V+0]=s.x,R[B+V+1]=s.y,R[B+V+2]=s.z,R[B+V+3]=0),S===!0&&(s.fromBufferAttribute(G,K),R[B+V+4]=s.x,R[B+V+5]=s.y,R[B+V+6]=s.z,R[B+V+7]=0),p===!0&&(s.fromBufferAttribute(N,K),R[B+V+8]=s.x,R[B+V+9]=s.y,R[B+V+10]=s.z,R[B+V+11]=N.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new ae(T,b)},n.set(o,u),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const S=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",S),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function P0(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const I0={[Zo]:"LINEAR_TONE_MAPPING",[$o]:"REINHARD_TONE_MAPPING",[Ko]:"CINEON_TONE_MAPPING",[ta]:"ACES_FILMIC_TONE_MAPPING",[Qo]:"AGX_TONE_MAPPING",[jo]:"NEUTRAL_TONE_MAPPING",[Jo]:"CUSTOM_TONE_MAPPING"};function L0(i,e,t,n,s,r){const a=new kt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new vt;c.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new it([0,2,0,0,2,0],2));const h=new Fh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ne(c,h),u=new rr(-1,1,1,-1,0,1);let f=null,g=null,S=!1,p,m=null,M=[],w=!1;this.setSize=function(x,T){a.setSize(x,T),o!==null&&o.setSize(x,T),l!==null&&l.setSize(x,T);for(let b=0;b<M.length;b++){const R=M[b];R.setSize&&R.setSize(x,T)}},this.setEffects=function(x){M=x,w=M.length>0&&M[0].isRenderPass===!0;const T=a.width,b=a.height;M.length>0&&o===null&&(o=new kt(T,b,{type:Yt,depthBuffer:!1,stencilBuffer:!1}),l=new kt(T,b,{type:Yt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){const _=M[R];_.setSize&&_.setSize(T,b)}},this.begin=function(x,T){if(S||x.toneMapping===Dn&&M.length===0)return!1;if(m=T,T!==null){const b=T.width,R=T.height;(a.width!==b||a.height!==R)&&this.setSize(b,R)}return w===!1&&x.setRenderTarget(a),p=x.toneMapping,x.toneMapping=Dn,!0},this.hasRenderPass=function(){return w},this.end=function(x,T){x.toneMapping=p,S=!0;let b=a,R=o;for(let _=0;_<M.length;_++){const E=M[_];E.enabled!==!1&&(E.render(x,R,b,T),E.needsSwap!==!1&&(b=R,R=R===o?l:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},et.getTransfer(f)===lt&&(h.defines.SRGB_TRANSFER="");const _=I0[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(m),x.render(d,u),m=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const Wh=new zt,ko=new Qs(1,1),Xh=new xh,qh=new fd,Yh=new Eh,Ec=[],wc=[],Ac=new Float32Array(16),Cc=new Float32Array(9),Rc=new Float32Array(4);function xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ec[s];if(r===void 0&&(r=new Float32Array(s),Ec[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ra(i,e){let t=wc[e];t===void 0&&(t=new Int32Array(e),wc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function D0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function U0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function N0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function F0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function O0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Rc.set(n),i.uniformMatrix2fv(this.addr,!1,Rc),Tt(t,n)}}function B0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Cc.set(n),i.uniformMatrix3fv(this.addr,!1,Cc),Tt(t,n)}}function z0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(bt(t,n))return;Ac.set(n),i.uniformMatrix4fv(this.addr,!1,Ac),Tt(t,n)}}function k0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function H0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function G0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function V0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function W0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function X0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function q0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function Y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function Z0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ko.compareFunction=t.isReversedDepthBuffer()?ll:ol,r=ko):r=Wh,t.setTexture2D(e||r,s)}function $0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||qh,s)}function K0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Yh,s)}function J0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Xh,s)}function Q0(i){switch(i){case 5126:return D0;case 35664:return U0;case 35665:return N0;case 35666:return F0;case 35674:return O0;case 35675:return B0;case 35676:return z0;case 5124:case 35670:return k0;case 35667:case 35671:return H0;case 35668:case 35672:return G0;case 35669:case 35673:return V0;case 5125:return W0;case 36294:return X0;case 36295:return q0;case 36296:return Y0;case 35678:case 36198:case 36298:case 36306:case 35682:return Z0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return J0}}function j0(i,e){i.uniform1fv(this.addr,e)}function eg(i,e){const t=xs(e,this.size,2);i.uniform2fv(this.addr,t)}function tg(i,e){const t=xs(e,this.size,3);i.uniform3fv(this.addr,t)}function ng(i,e){const t=xs(e,this.size,4);i.uniform4fv(this.addr,t)}function ig(i,e){const t=xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function sg(i,e){const t=xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function rg(i,e){const t=xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ag(i,e){i.uniform1iv(this.addr,e)}function og(i,e){i.uniform2iv(this.addr,e)}function lg(i,e){i.uniform3iv(this.addr,e)}function cg(i,e){i.uniform4iv(this.addr,e)}function hg(i,e){i.uniform1uiv(this.addr,e)}function ug(i,e){i.uniform2uiv(this.addr,e)}function dg(i,e){i.uniform3uiv(this.addr,e)}function fg(i,e){i.uniform4uiv(this.addr,e)}function pg(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ko:a=Wh;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function mg(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||qh,r[a])}function gg(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Yh,r[a])}function vg(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Xh,r[a])}function _g(i){switch(i){case 5126:return j0;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return sg;case 35676:return rg;case 5124:case 35670:return ag;case 35667:case 35671:return og;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return hg;case 36294:return ug;case 36295:return dg;case 36296:return fg;case 35678:case 36198:case 36298:case 36306:case 35682:return pg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return vg}}class xg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Q0(t.type)}}class Mg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_g(t.type)}}class Sg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ga=/(\w+)(\])?(\[|\.)?/g;function Pc(i,e){i.seq.push(e),i.map[e.id]=e}function yg(i,e,t){const n=i.name,s=n.length;for(Ga.lastIndex=0;;){const r=Ga.exec(n),a=Ga.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Pc(t,c===void 0?new xg(o,i,e):new Mg(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Sg(o),Pc(t,d)),t=d}}}class Vr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);yg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ic(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const bg=37297;let Tg=0;function Eg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Lc=new Xe;function wg(i){et._getMatrix(Lc,et.workingColorSpace,i);const e=`mat3( ${Lc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Kr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Dc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Eg(i.getShaderSource(e),o)}else return r}function Ag(i,e){const t=wg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Cg={[Zo]:"Linear",[$o]:"Reinhard",[Ko]:"Cineon",[ta]:"ACESFilmic",[Qo]:"AgX",[jo]:"Neutral",[Jo]:"Custom"};function Rg(i,e){const t=Cg[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ur=new C;function Pg(){et.getLuminanceCoefficients(Ur);const i=Ur.x.toFixed(4),e=Ur.y.toFixed(4),t=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ig(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Lg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Dg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Fs(i){return i!==""}function Uc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ho(i){return i.replace(Ug,Fg)}const Ng=new Map;function Fg(i,e){let t=Ke[e];if(t===void 0){const n=Ng.get(e);if(n!==void 0)t=Ke[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ho(t)}const Og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(i){return i.replace(Og,Bg)}function Bg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const zg={[Os]:"SHADOWMAP_TYPE_PCF",[Us]:"SHADOWMAP_TYPE_VSM"};function kg(i){return zg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Hg={[Ui]:"ENVMAP_TYPE_CUBE",[fs]:"ENVMAP_TYPE_CUBE",[na]:"ENVMAP_TYPE_CUBE_UV"};function Gg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Hg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Vg={[fs]:"ENVMAP_MODE_REFRACTION"};function Wg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Vg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Xg={[Yo]:"ENVMAP_BLENDING_MULTIPLY",[Ru]:"ENVMAP_BLENDING_MIX",[Pu]:"ENVMAP_BLENDING_ADD"};function qg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Xg[i.combine]||"ENVMAP_BLENDING_NONE"}function Yg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Zg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=kg(t),c=Gg(t),h=Wg(t),d=qg(t),u=Yg(t),f=Ig(t),g=Lg(r),S=s.createProgram();let p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fs).join(`
`),m.length>0&&(m+=`
`)):(p=[Oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),m=[Oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Dn?Rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Ag("linearToOutputTexel",t.outputColorSpace),Pg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Ho(a),a=Uc(a,t),a=Nc(a,t),o=Ho(o),o=Uc(o,t),o=Nc(o,t),a=Fc(a),o=Fc(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const w=M+p+a,x=M+m+o,T=Ic(s,s.VERTEX_SHADER,w),b=Ic(s,s.FRAGMENT_SHADER,x);s.attachShader(S,T),s.attachShader(S,b),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function R(D){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(S)||"",G=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(b)||"",B=F.trim(),K=G.trim(),V=N.trim();let se=!0,X=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,T,b);else{const j=Dc(s,T,"vertex"),ie=Dc(s,b,"fragment");nt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+j+`
`+ie)}else B!==""?Ge("WebGLProgram: Program Info Log:",B):(K===""||V==="")&&(X=!1);X&&(D.diagnostics={runnable:se,programLog:B,vertexShader:{log:K,prefix:p},fragmentShader:{log:V,prefix:m}})}s.deleteShader(T),s.deleteShader(b),_=new Vr(s,S),E=Dg(s,S)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(S,bg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tg++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=T,this.fragmentShader=b,this}let $g=0;class Kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Jg(e),t.set(e,n)),n}}class Jg{constructor(e){this.id=$g++,this.code=e,this.usedTimes=0}}function Qg(i){return i===Ni||i===qr||i===Yr}function jg(i,e,t,n,s,r){const a=new ul,o=new Kg,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function S(_,E,I,D,F,G){const N=D.fog,B=F.geometry,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?D.environment:null,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,se=e.get(_.envMap||K,V),X=se&&se.mapping===na?se.image.height:null,j=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ge("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const ie=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ce=ie!==void 0?ie.length:0;let Te=0;B.morphAttributes.position!==void 0&&(Te=1),B.morphAttributes.normal!==void 0&&(Te=2),B.morphAttributes.color!==void 0&&(Te=3);let Qe,qe,Ye,$;if(j){const dt=An[j];Qe=dt.vertexShader,qe=dt.fragmentShader}else{Qe=_.vertexShader,qe=_.fragmentShader;const dt=o.getVertexShaderStage(_),at=o.getFragmentShaderStage(_);o.update(_,dt,at),Ye=dt.id,$=at.id}const ne=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Fe=F.isInstancedMesh===!0,q=F.isBatchedMesh===!0,te=!!_.map,Me=!!_.matcap,W=!!se,re=!!_.aoMap,he=!!_.lightMap,ce=!!_.bumpMap&&_.wireframe===!1,pe=!!_.normalMap,ze=!!_.displacementMap,Oe=!!_.emissiveMap,He=!!_.metalnessMap,Ve=!!_.roughnessMap,L=_.anisotropy>0,rt=_.clearcoat>0,Ze=_.dispersion>0,A=_.retroreflectivity>0,v=_.iridescence>0,O=_.sheen>0,H=_.transmission>0,Z=L&&!!_.anisotropyMap,ue=rt&&!!_.clearcoatMap,fe=rt&&!!_.clearcoatNormalMap,J=rt&&!!_.clearcoatRoughnessMap,ee=v&&!!_.iridescenceMap,me=v&&!!_.iridescenceThicknessMap,Le=O&&!!_.sheenColorMap,_e=O&&!!_.sheenRoughnessMap,ve=!!_.specularMap,Re=!!_.specularColorMap,ke=!!_.specularIntensityMap,We=H&&!!_.transmissionMap,P=H&&!!_.thicknessMap,oe=!!_.gradientMap,Q=!!_.alphaMap,de=_.alphaTest>0,xe=!!_.alphaHash,le=!!_.extensions;let Be=Dn;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Be=i.toneMapping);const De={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:Qe,fragmentShader:qe,defines:_.defines,customVertexShaderID:Ye,customFragmentShaderID:$,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:q,batchingColor:q&&F._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&F.instanceColor!==null,instancingMorph:Fe&&F.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:te,matcap:Me,envMap:W,envMapMode:W&&se.mapping,envMapCubeUVHeight:X,aoMap:re,lightMap:he,bumpMap:ce,normalMap:pe,displacementMap:ze,emissiveMap:Oe,normalMapObjectSpace:pe&&_.normalMapType===Du,normalMapTangentSpace:pe&&_.normalMapType===Zr,packedNormalMap:pe&&_.normalMapType===Zr&&Qg(_.normalMap.format),metalnessMap:He,roughnessMap:Ve,anisotropy:L,anisotropyMap:Z,clearcoat:rt,clearcoatMap:ue,clearcoatNormalMap:fe,clearcoatRoughnessMap:J,dispersion:Ze,retroreflection:A,iridescence:v,iridescenceMap:ee,iridescenceThicknessMap:me,sheen:O,sheenColorMap:Le,sheenRoughnessMap:_e,specularMap:ve,specularColorMap:Re,specularIntensityMap:ke,transmission:H,transmissionMap:We,thicknessMap:P,gradientMap:oe,opaque:_.transparent===!1&&_.blending===Bs&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:de,alphaHash:xe,combine:_.combine,mapUv:te&&g(_.map.channel),aoMapUv:re&&g(_.aoMap.channel),lightMapUv:he&&g(_.lightMap.channel),bumpMapUv:ce&&g(_.bumpMap.channel),normalMapUv:pe&&g(_.normalMap.channel),displacementMapUv:ze&&g(_.displacementMap.channel),emissiveMapUv:Oe&&g(_.emissiveMap.channel),metalnessMapUv:He&&g(_.metalnessMap.channel),roughnessMapUv:Ve&&g(_.roughnessMap.channel),anisotropyMapUv:Z&&g(_.anisotropyMap.channel),clearcoatMapUv:ue&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:me&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(_.sheenRoughnessMap.channel),specularMapUv:ve&&g(_.specularMap.channel),specularColorMapUv:Re&&g(_.specularColorMap.channel),specularIntensityMapUv:ke&&g(_.specularIntensityMap.channel),transmissionMapUv:We&&g(_.transmissionMap.channel),thicknessMapUv:P&&g(_.thicknessMap.channel),alphaMapUv:Q&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(pe||L),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(te||Q),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&pe===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Te,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:te&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:Oe&&_.emissiveMap.isVideoTexture===!0&&et.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===jt,flipSided:_.side===qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:le&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&_.extensions.multiDraw===!0||q)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function p(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const I in _.defines)E.push(I),E.push(_.defines[I]);return _.isRawShaderMaterial===!1&&(m(E,_),M(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function M(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const E=f[_.type];let I;if(E){const D=An[E];I=ir.clone(D.uniforms)}else I=_.uniforms;return I}function x(_,E){let I=h.get(E);return I!==void 0?++I.usedTimes:(I=new Zg(i,E,_,s),c.push(I),h.set(E,I)),I}function T(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function R(){o.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:w,acquireProgram:x,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:R}}function ev(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function tv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Bc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,S,p,m){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:p,group:m},i[e]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=g,M.materialVariant=a(u),M.groupOrder=S,M.renderOrder=u.renderOrder,M.z=p,M.group=m),e++,M}function l(u,f,g,S,p,m,M){M.reversedDepth===!0&&(p=-p);const w=o(u,f,g,S,p,m);g.transmission>0?n.push(w):g.transparent===!0?s.push(w):t.push(w)}function c(u,f,g,S,p,m){const M=o(u,f,g,S,p,m);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,f){t.length>1&&t.sort(u||tv),n.length>1&&n.sort(f||Bc),s.length>1&&s.sort(f||Bc)}function d(){for(let u=e,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function nv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new zc,i.set(n,[a])):s>=r.length?(a=new zc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function iv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new we};break;case"SpotLight":t={position:new C,direction:new C,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function sv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rv=0;function av(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ov(i){const e=new iv,t=sv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new tt,a=new tt;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let f=0,g=0,S=0,p=0,m=0,M=0,w=0,x=0,T=0,b=0,R=0,_=0,E=0,I=0;c.sort(av);for(let F=0,G=c.length;F<G;F++){const N=c[F],B=N.color,K=N.intensity,V=N.distance;let se=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ni?se=N.shadow.map.texture:se=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=B.r*K,d+=B.g*K,u+=B.b*K;else if(N.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(N.sh.coefficients[X],K);I++}else if(N.isSunLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const j=N.shadow,ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[g]=ie,n.sunShadowMap[g]=se;const Ce=j.getViewportCount();for(let Te=0;Te<Ce;Te++)n.sunShadowMatrix[S+Te]=j.getMatrix(Te),n.sunShadowCascade[S+Te]=j._cascadeData[Te];S+=Ce,g++}n.sun[f]=X,f++}else if(N.isDirectionalLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const j=N.shadow,ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[p]=ie,n.directionalShadowMap[p]=se,n.directionalShadowMatrix[p]=N.shadow.matrix,T++}n.directional[p]=X,p++}else if(N.isSpotLight){const X=e.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(B).multiplyScalar(K),X.distance=V,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,n.spot[M]=X;const j=N.shadow;if(N.map&&(n.spotLightMap[_]=N.map,_++,j.updateMatrices(N),N.castShadow&&E++),n.spotLightMatrix[M]=j.matrix,N.castShadow){const ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[M]=ie,n.spotShadowMap[M]=se,R++}M++}else if(N.isRectAreaLight){const X=e.get(N);X.color.copy(B).multiplyScalar(K),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),n.rectArea[w]=X,w++}else if(N.isPointLight){const X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),X.distance=N.distance,X.decay=N.decay,N.castShadow){const j=N.shadow,ie=t.get(N);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[m]=ie,n.pointShadowMap[m]=se,n.pointShadowMatrix[m]=N.shadow.matrix,b++}n.point[m]=X,m++}else if(N.isHemisphereLight){const X=e.get(N);X.skyColor.copy(N.color).multiplyScalar(K),X.groundColor.copy(N.groundColor).multiplyScalar(K),n.hemi[x]=X,x++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const D=n.hash;(D.sunLength!==f||D.directionalLength!==p||D.pointLength!==m||D.spotLength!==M||D.rectAreaLength!==w||D.hemiLength!==x||D.numSunShadows!==g||D.numDirectionalShadows!==T||D.numPointShadows!==b||D.numSpotShadows!==R||D.numSpotMaps!==_||D.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=p,n.spot.length=M,n.rectArea.length=w,n.point.length=m,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=I,D.sunLength=f,D.directionalLength=p,D.pointLength=m,D.spotLength=M,D.rectAreaLength=w,D.hemiLength=x,D.numSunShadows=g,D.numDirectionalShadows=T,D.numPointShadows=b,D.numSpotShadows=R,D.numSpotMaps=_,D.numLightProbes=I,n.version=rv++)}function l(c,h){let d=0,u=0,f=0,g=0,S=0,p=0;const m=h.matrixWorldInverse;for(let M=0,w=c.length;M<w;M++){const x=c[M];if(x.isSunLight){const T=n.sun[d];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),d++}else if(x.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),u++}else if(x.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const T=n.rectArea[S];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),S++}else if(x.isPointLight){const T=n.point[f];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const T=n.hemi[p];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:n}}function kc(i){const e=new ov(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function lv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new kc(i),e.set(s,[o])):r>=a.length?(o=new kc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const cv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,uv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],dv=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Hc=new tt,Ps=new C,Va=new C;function fv(i,e,t){let n=new fl;const s=new ae,r=new ae,a=new mt,o=new Mf,l=new Sf,c={},h=t.maxTextureSize,d={[Di]:qt,[qt]:Di,[jt]:jt},u=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:cv,fragmentShader:hv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new vt;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Ne(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Os;let m=this.type;this.render=function(b,R,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===hu&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Os);const E=i.getRenderTarget(),I=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ln),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=m!==this.type;G&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=b.length;N<B;N++){const K=b[N],V=K.shadow;if(V===void 0){Ge("WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const se=V.getFrameExtents();s.multiply(se),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/se.x),s.x=r.x*se.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/se.y),s.y=r.y*se.y,V.mapSize.y=r.y));const X=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=X,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Us){if(K.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new kt(s.x,s.y,{format:Ni,type:Yt,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),V.map.texture.name=K.name+".shadowMap",V.map.depthTexture=new Qs(s.x,s.y,vn),V.map.depthTexture.name=K.name+".shadowMapDepth",V.map.depthTexture.format=Qn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt}else K.isPointLight?(V.map=new Vh(s.x),V.map.depthTexture=new Dd(s.x,Un)):(V.map=new kt(s.x,s.y),V.map.depthTexture=new Qs(s.x,s.y,Un)),V.map.depthTexture.name=K.name+".shadowMap",V.map.depthTexture.format=Qn,this.type===Os?(V.map.depthTexture.compareFunction=X?ll:ol,V.map.depthTexture.minFilter=Dt,V.map.depthTexture.magFilter=Dt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Lt,V.map.depthTexture.magFilter=Lt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);const j=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();K.isPointLight!==!0&&V.updateMatrices(K,_);for(let ie=0;ie<j;ie++){const Ce=V.getCamera(ie);if(K.isPointLight){const Te=V.camera,Qe=V.matrix,qe=K.distance||Te.far;qe!==Te.far&&(Te.far=qe,Te.updateProjectionMatrix()),Ps.setFromMatrixPosition(K.matrixWorld),Te.position.copy(Ps),Va.copy(Te.position),Va.add(uv[ie]),Te.up.copy(dv[ie]),Te.lookAt(Va),Te.updateMatrixWorld(),Qe.makeTranslation(-Ps.x,-Ps.y,-Ps.z),Hc.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Hc,Te.coordinateSystem,Te.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(V.map),i.clear());const Te=V.getViewport(ie);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),F.viewport(a)}n=V.getFrustum(ie),x(R,_,Ce,K,this.type)}V.isPointLightShadow!==!0&&this.type===Us&&M(V,_),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,I,D)};function M(b,R){const _=e.update(S);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new kt(s.x,s.y,{format:Ni,type:Yt}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,_,u,S,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,_,f,S,null)}function w(b,R,_,E){let I=null;const D=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)I=D;else if(I=_.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=I.uuid,G=R.uuid;let N=c[F];N===void 0&&(N={},c[F]=N);let B=N[G];B===void 0&&(B=I.clone(),N[G]=B,R.addEventListener("dispose",T)),I=B}if(I.visible=R.visible,I.wireframe=R.wireframe,E===Us?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:d[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,_.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const F=i.properties.get(I);F.light=_}return I}function x(b,R,_,E,I){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===Us)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const G=e.update(b),N=b.material;if(Array.isArray(N)){const B=G.groups;for(let K=0,V=B.length;K<V;K++){const se=B[K],X=N[se.materialIndex];if(X&&X.visible){const j=w(b,X,E,I);b.onBeforeShadow(i,b,R,_,G,j,se),i.renderBufferDirect(_,null,G,j,b,se),b.onAfterShadow(i,b,R,_,G,j,se)}}}else if(N.visible){const B=w(b,N,E,I);b.onBeforeShadow(i,b,R,_,G,B,null),i.renderBufferDirect(_,null,G,B,b,null),b.onAfterShadow(i,b,R,_,G,B,null)}}const F=b.children;for(let G=0,N=F.length;G<N;G++)x(F[G],R,_,E,I)}function T(b){b.target.removeEventListener("dispose",T);for(const _ in c){const E=c[_],I=b.target.uuid;I in E&&(E[I].dispose(),delete E[I])}}}function pv(i,e){function t(){let P=!1;const oe=new mt;let Q=null;const de=new mt(0,0,0,0);return{setMask:function(xe){Q!==xe&&!P&&(i.colorMask(xe,xe,xe,xe),Q=xe)},setLocked:function(xe){P=xe},setClear:function(xe,le,Be,De,dt){dt===!0&&(xe*=De,le*=De,Be*=De),oe.set(xe,le,Be,De),de.equals(oe)===!1&&(i.clearColor(xe,le,Be,De),de.copy(oe))},reset:function(){P=!1,Q=null,de.set(-1,0,0,0)}}}function n(){let P=!1,oe=!1,Q=null,de=null,xe=null;return{setReversed:function(le){if(oe!==le){const Be=e.get("EXT_clip_control");le?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),oe=le;const De=xe;xe=null,this.setClear(De)}},getReversed:function(){return oe},setTest:function(le){le?ne(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(le){Q!==le&&!P&&(i.depthMask(le),Q=le)},setFunc:function(le){if(oe&&(le=Xu[le]),de!==le){switch(le){case Za:i.depthFunc(i.NEVER);break;case $a:i.depthFunc(i.ALWAYS);break;case Ka:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case Qa:i.depthFunc(i.GEQUAL);break;case ja:i.depthFunc(i.GREATER);break;case eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=le}},setLocked:function(le){P=le},setClear:function(le){xe!==le&&(xe=le,oe&&(le=1-le),i.clearDepth(le))},reset:function(){P=!1,Q=null,de=null,xe=null,oe=!1}}}function s(){let P=!1,oe=null,Q=null,de=null,xe=null,le=null,Be=null,De=null,dt=null;return{setTest:function(at){P||(at?ne(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(at){oe!==at&&!P&&(i.stencilMask(at),oe=at)},setFunc:function(at,dn,Sn){(Q!==at||de!==dn||xe!==Sn)&&(i.stencilFunc(at,dn,Sn),Q=at,de=dn,xe=Sn)},setOp:function(at,dn,Sn){(le!==at||Be!==dn||De!==Sn)&&(i.stencilOp(at,dn,Sn),le=at,Be=dn,De=Sn)},setLocked:function(at){P=at},setClear:function(at){dt!==at&&(i.clearStencil(at),dt=at)},reset:function(){P=!1,oe=null,Q=null,de=null,xe=null,le=null,Be=null,De=null,dt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],S=null,p=!1,m=null,M=null,w=null,x=null,T=null,b=null,R=null,_=new we(0,0,0),E=0,I=!1,D=null,F=null,G=null,N=null,B=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,se=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=se>=1):X.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=se>=2);let j=null,ie={};const Ce=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),Qe=new mt().fromArray(Ce),qe=new mt().fromArray(Te);function Ye(P,oe,Q,de){const xe=new Uint8Array(4),le=i.createTexture();i.bindTexture(P,le),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<Q;Be++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(oe+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return le}const $={};$[i.TEXTURE_2D]=Ye(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Ye(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Ye(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Ye(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(qs),ce(!1),pe(Dl),ne(i.CULL_FACE),re(Ln);function ne(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function ge(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Fe(P,oe){return u[P]!==oe?(i.bindFramebuffer(P,oe),u[P]=oe,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=oe),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function q(P,oe){let Q=g,de=!1;if(P){Q=f.get(oe),Q===void 0&&(Q=[],f.set(oe,Q));const xe=P.textures;if(Q.length!==xe.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Be=xe.length;le<Be;le++)Q[le]=i.COLOR_ATTACHMENT0+le;Q.length=xe.length,de=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,de=!0);de&&i.drawBuffers(Q)}function te(P){return S!==P?(i.useProgram(P),S=P,!0):!1}const Me={[rs]:i.FUNC_ADD,[du]:i.FUNC_SUBTRACT,[fu]:i.FUNC_REVERSE_SUBTRACT};Me[pu]=i.MIN,Me[mu]=i.MAX;const W={[gu]:i.ZERO,[vu]:i.ONE,[_u]:i.SRC_COLOR,[ch]:i.SRC_ALPHA,[Tu]:i.SRC_ALPHA_SATURATE,[yu]:i.DST_COLOR,[Mu]:i.DST_ALPHA,[xu]:i.ONE_MINUS_SRC_COLOR,[hh]:i.ONE_MINUS_SRC_ALPHA,[bu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[Eu]:i.CONSTANT_COLOR,[wu]:i.ONE_MINUS_CONSTANT_COLOR,[Au]:i.CONSTANT_ALPHA,[Cu]:i.ONE_MINUS_CONSTANT_ALPHA};function re(P,oe,Q,de,xe,le,Be,De,dt,at){if(P===Ln){p===!0&&(ge(i.BLEND),p=!1);return}if(p===!1&&(ne(i.BLEND),p=!0),P!==uu){if(P!==m||at!==I){if((M!==rs||T!==rs)&&(i.blendEquation(i.FUNC_ADD),M=rs,T=rs),at)switch(P){case Bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rn:i.blendFunc(i.ONE,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:nt("WebGLState: Invalid blending: ",P);break}else switch(P){case Bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ul:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nl:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",P);break}w=null,x=null,b=null,R=null,_.set(0,0,0),E=0,m=P,I=at}return}xe=xe||oe,le=le||Q,Be=Be||de,(oe!==M||xe!==T)&&(i.blendEquationSeparate(Me[oe],Me[xe]),M=oe,T=xe),(Q!==w||de!==x||le!==b||Be!==R)&&(i.blendFuncSeparate(W[Q],W[de],W[le],W[Be]),w=Q,x=de,b=le,R=Be),(De.equals(_)===!1||dt!==E)&&(i.blendColor(De.r,De.g,De.b,dt),_.copy(De),E=dt),m=P,I=!1}function he(P,oe){P.side===jt?ge(i.CULL_FACE):ne(i.CULL_FACE);let Q=P.side===qt;oe&&(Q=!Q),ce(Q),P.blending===Bs&&P.transparent===!1?re(Ln):re(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const de=P.stencilWrite;o.setTest(de),de&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Oe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(P){D!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),D=P)}function pe(P){P!==lu?(ne(i.CULL_FACE),P!==F&&(P===Dl?i.cullFace(i.BACK):P===cu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),F=P}function ze(P){P!==G&&(V&&i.lineWidth(P),G=P)}function Oe(P,oe,Q){P?(ne(i.POLYGON_OFFSET_FILL),(N!==oe||B!==Q)&&(N=oe,B=Q,a.getReversed()&&(oe=-oe),i.polygonOffset(oe,Q))):ge(i.POLYGON_OFFSET_FILL)}function He(P){P?ne(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function Ve(P){P===void 0&&(P=i.TEXTURE0+K-1),j!==P&&(i.activeTexture(P),j=P)}function L(P,oe,Q){Q===void 0&&(j===null?Q=i.TEXTURE0+K-1:Q=j);let de=ie[Q];de===void 0&&(de={type:void 0,texture:void 0},ie[Q]=de),(de.type!==P||de.texture!==oe)&&(j!==Q&&(i.activeTexture(Q),j=Q),i.bindTexture(P,oe||$[P]),de.type=P,de.texture=oe)}function rt(){const P=ie[j];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(P){nt("WebGLState:",P)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(P){nt("WebGLState:",P)}}function v(){try{i.texSubImage2D(...arguments)}catch(P){nt("WebGLState:",P)}}function O(){try{i.texSubImage3D(...arguments)}catch(P){nt("WebGLState:",P)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(P){nt("WebGLState:",P)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(P){nt("WebGLState:",P)}}function ue(){try{i.texStorage2D(...arguments)}catch(P){nt("WebGLState:",P)}}function fe(){try{i.texStorage3D(...arguments)}catch(P){nt("WebGLState:",P)}}function J(){try{i.texImage2D(...arguments)}catch(P){nt("WebGLState:",P)}}function ee(){try{i.texImage3D(...arguments)}catch(P){nt("WebGLState:",P)}}function me(P){return d[P]!==void 0?d[P]:i.getParameter(P)}function Le(P,oe){d[P]!==oe&&(i.pixelStorei(P,oe),d[P]=oe)}function _e(P){Qe.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Qe.copy(P))}function ve(P){qe.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),qe.copy(P))}function Re(P,oe){let Q=c.get(oe);Q===void 0&&(Q=new WeakMap,c.set(oe,Q));let de=Q.get(P);de===void 0&&(de=i.getUniformBlockIndex(oe,P.name),Q.set(P,de))}function ke(P,oe){const de=c.get(oe).get(P);l.get(oe)!==de&&(i.uniformBlockBinding(oe,de,P.__bindingPointIndex),l.set(oe,de))}function We(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,ie={},u={},f=new WeakMap,g=[],S=null,p=!1,m=null,M=null,w=null,x=null,T=null,b=null,R=null,_=new we(0,0,0),E=0,I=!1,D=null,F=null,G=null,N=null,B=null,Qe.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:ge,bindFramebuffer:Fe,drawBuffers:q,useProgram:te,setBlending:re,setMaterial:he,setFlipSided:ce,setCullFace:pe,setLineWidth:ze,setPolygonOffset:Oe,setScissorTest:He,activeTexture:Ve,bindTexture:L,unbindTexture:rt,compressedTexImage2D:Ze,compressedTexImage3D:A,texImage2D:J,texImage3D:ee,pixelStorei:Le,getParameter:me,updateUBOMapping:Re,uniformBlockBinding:ke,texStorage2D:ue,texStorage3D:fe,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:Z,scissor:_e,viewport:ve,reset:We}}function mv(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(A,v){return g?new OffscreenCanvas(A,v):Jr("canvas")}function p(A,v,O){let H=1;const Z=Ze(A);if((Z.width>O||Z.height>O)&&(H=O/Math.max(Z.width,Z.height)),H<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ue=Math.floor(H*Z.width),fe=Math.floor(H*Z.height);u===void 0&&(u=S(ue,fe));const J=v?S(ue,fe):u;return J.width=ue,J.height=fe,J.getContext("2d").drawImage(A,0,0,ue,fe),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ue+"x"+fe+")."),J}else return"data"in A&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function m(A){return A.generateMipmaps}function M(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(A,v,O,H,Z,ue=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let fe;H&&(fe=e.get("EXT_texture_norm16"),fe||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=v;if(v===i.RED&&(O===i.FLOAT&&(J=i.R32F),O===i.HALF_FLOAT&&(J=i.R16F),O===i.UNSIGNED_BYTE&&(J=i.R8),O===i.UNSIGNED_SHORT&&fe&&(J=fe.R16_EXT),O===i.SHORT&&fe&&(J=fe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.R8UI),O===i.UNSIGNED_SHORT&&(J=i.R16UI),O===i.UNSIGNED_INT&&(J=i.R32UI),O===i.BYTE&&(J=i.R8I),O===i.SHORT&&(J=i.R16I),O===i.INT&&(J=i.R32I)),v===i.RG&&(O===i.FLOAT&&(J=i.RG32F),O===i.HALF_FLOAT&&(J=i.RG16F),O===i.UNSIGNED_BYTE&&(J=i.RG8),O===i.UNSIGNED_SHORT&&fe&&(J=fe.RG16_EXT),O===i.SHORT&&fe&&(J=fe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RG8UI),O===i.UNSIGNED_SHORT&&(J=i.RG16UI),O===i.UNSIGNED_INT&&(J=i.RG32UI),O===i.BYTE&&(J=i.RG8I),O===i.SHORT&&(J=i.RG16I),O===i.INT&&(J=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RGB8UI),O===i.UNSIGNED_SHORT&&(J=i.RGB16UI),O===i.UNSIGNED_INT&&(J=i.RGB32UI),O===i.BYTE&&(J=i.RGB8I),O===i.SHORT&&(J=i.RGB16I),O===i.INT&&(J=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),O===i.UNSIGNED_INT&&(J=i.RGBA32UI),O===i.BYTE&&(J=i.RGBA8I),O===i.SHORT&&(J=i.RGBA16I),O===i.INT&&(J=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_SHORT&&fe&&(J=fe.RGB16_EXT),O===i.SHORT&&fe&&(J=fe.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),v===i.RGBA){const ee=ue?Kr:et.getTransfer(Z);O===i.FLOAT&&(J=i.RGBA32F),O===i.HALF_FLOAT&&(J=i.RGBA16F),O===i.UNSIGNED_BYTE&&(J=ee===lt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&fe&&(J=fe.RGBA16_EXT),O===i.SHORT&&fe&&(J=fe.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function T(A,v){let O;return A?v===null||v===Un||v===Zs?O=i.DEPTH24_STENCIL8:v===vn?O=i.DEPTH32F_STENCIL8:v===Ys&&(O=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Un||v===Zs?O=i.DEPTH_COMPONENT24:v===vn?O=i.DEPTH_COMPONENT32F:v===Ys&&(O=i.DEPTH_COMPONENT16),O}function b(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==Dt?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function R(A){const v=A.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function _(A){const v=A.target;v.removeEventListener("dispose",_),D(v)}function E(A){const v=n.get(A);if(v.__webglInit===void 0)return;const O=A.source,H=f.get(O);if(H){const Z=H[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(A),Object.keys(H).length===0&&f.delete(O)}n.remove(A)}function I(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const O=A.source,H=f.get(O);delete H[v.__cacheKey],a.memory.textures--}function D(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let Z=0;Z<v.__webglFramebuffer[H].length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[H][Z]);else i.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)i.deleteFramebuffer(v.__webglFramebuffer[H]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let H=0,Z=O.length;H<Z;H++){const ue=n.get(O[H]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(O[H])}n.remove(A)}let F=0;function G(){F=0}function N(){return F}function B(A){F=A}function K(){const A=F;return A>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,A}function V(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function se(A,v){const O=n.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const H=A.image;if(H===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ge(O,A,v);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function X(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ge(O,A,v);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function j(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ge(O,A,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function ie(A,v){const O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Fe(O,A,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const Ce={[cs]:i.REPEAT,[qn]:i.CLAMP_TO_EDGE,[to]:i.MIRRORED_REPEAT},Te={[Lt]:i.NEAREST,[Iu]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[Dt]:i.LINEAR,[da]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},Qe={[Nu]:i.NEVER,[ku]:i.ALWAYS,[Fu]:i.LESS,[ol]:i.LEQUAL,[Ou]:i.EQUAL,[ll]:i.GEQUAL,[Bu]:i.GREATER,[zu]:i.NOTEQUAL};function qe(A,v){if(v.type===vn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Dt||v.magFilter===da||v.magFilter===lr||v.magFilter===di||v.minFilter===Dt||v.minFilter===da||v.minFilter===lr||v.minFilter===di)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ce[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ce[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ce[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Te[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Te[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Qe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==lr&&v.minFilter!==di||v.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ye(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",R));const H=v.source;let Z=f.get(H);Z===void 0&&(Z={},f.set(H,Z));const ue=V(v);if(ue!==A.__cacheKey){Z[ue]===void 0&&(Z[ue]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[ue].usedTimes++;const fe=Z[A.__cacheKey];fe!==void 0&&(Z[A.__cacheKey].usedTimes--,fe.usedTimes===0&&I(v)),A.__cacheKey=ue,A.__webglTexture=Z[ue].texture}return O}function $(A,v,O){return Math.floor(Math.floor(A/O)/v)}function ne(A,v,O,H){const ue=A.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,H,v.data);else{ue.sort((Le,_e)=>Le.start-_e.start);let fe=0;for(let Le=1;Le<ue.length;Le++){const _e=ue[fe],ve=ue[Le],Re=_e.start+_e.count,ke=$(ve.start,v.width,4),We=$(_e.start,v.width,4);ve.start<=Re+1&&ke===We&&$(ve.start+ve.count-1,v.width,4)===ke?_e.count=Math.max(_e.count,ve.start+ve.count-_e.start):(++fe,ue[fe]=ve)}ue.length=fe+1;const J=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Le=0,_e=ue.length;Le<_e;Le++){const ve=ue[Le],Re=Math.floor(ve.start/4),ke=Math.ceil(ve.count/4),We=Re%v.width,P=Math.floor(Re/v.width),oe=ke,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,We),t.pixelStorei(i.UNPACK_SKIP_ROWS,P),t.texSubImage2D(i.TEXTURE_2D,0,We,P,oe,Q,O,H,v.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function ge(A,v,O){let H=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=i.TEXTURE_3D);const Z=Ye(A,v),ue=v.source;t.bindTexture(H,A.__webglTexture,i.TEXTURE0+O);const fe=n.get(ue);if(ue.version!==fe.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const Q=et.getPrimaries(et.workingColorSpace),de=v.colorSpace===ui?null:et.getPrimaries(v.colorSpace),xe=v.colorSpace===ui||Q===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=p(v.image,!1,s.maxTextureSize);ee=rt(v,ee);const me=r.convert(v.format,v.colorSpace),Le=r.convert(v.type);let _e=x(v.internalFormat,me,Le,v.normalized,v.colorSpace,v.isVideoTexture);qe(H,v);let ve;const Re=v.mipmaps,ke=v.isVideoTexture!==!0,We=fe.__version===void 0||Z===!0,P=ue.dataReady,oe=b(v,ee);if(v.isDepthTexture)_e=T(v.format===Ri,v.type),We&&(ke?t.texStorage2D(i.TEXTURE_2D,1,_e,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,_e,ee.width,ee.height,0,me,Le,null));else if(v.isDataTexture)if(Re.length>0){ke&&We&&t.texStorage2D(i.TEXTURE_2D,oe,_e,Re[0].width,Re[0].height);for(let Q=0,de=Re.length;Q<de;Q++)ve=Re[Q],ke?P&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ve.width,ve.height,me,Le,ve.data):t.texImage2D(i.TEXTURE_2D,Q,_e,ve.width,ve.height,0,me,Le,ve.data);v.generateMipmaps=!1}else ke?(We&&t.texStorage2D(i.TEXTURE_2D,oe,_e,ee.width,ee.height),P&&ne(v,ee,me,Le)):t.texImage2D(i.TEXTURE_2D,0,_e,ee.width,ee.height,0,me,Le,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ke&&We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,_e,Re[0].width,Re[0].height,ee.depth);for(let Q=0,de=Re.length;Q<de;Q++)if(ve=Re[Q],v.format!==_n)if(me!==null)if(ke){if(P)if(v.layerUpdates.size>0){const xe=Mc(ve.width,ve.height,v.format,v.type);for(const le of v.layerUpdates){const Be=ve.data.subarray(le*xe/ve.data.BYTES_PER_ELEMENT,(le+1)*xe/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,le,ve.width,ve.height,1,me,Be)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ve.width,ve.height,ee.depth,me,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,_e,ve.width,ve.height,ee.depth,0,ve.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ve.width,ve.height,ee.depth,me,Le,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,_e,ve.width,ve.height,ee.depth,0,me,Le,ve.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ke&&We&&t.texStorage2D(i.TEXTURE_2D,oe,_e,Re[0].width,Re[0].height);for(let Q=0,de=Re.length;Q<de;Q++)ve=Re[Q],v.format!==_n?me!==null?ke?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,ve.width,ve.height,me,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,_e,ve.width,ve.height,0,ve.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?P&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ve.width,ve.height,me,Le,ve.data):t.texImage2D(i.TEXTURE_2D,Q,_e,ve.width,ve.height,0,me,Le,ve.data)}else if(v.isDataArrayTexture)if(ke){if(We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,_e,ee.width,ee.height,ee.depth),P)if(v.layerUpdates.size>0){const Q=Mc(ee.width,ee.height,v.format,v.type);for(const de of v.layerUpdates){const xe=ee.data.subarray(de*Q/ee.data.BYTES_PER_ELEMENT,(de+1)*Q/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,de,ee.width,ee.height,1,me,Le,xe)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,me,Le,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,ee.width,ee.height,ee.depth,0,me,Le,ee.data);else if(v.isData3DTexture)ke?(We&&t.texStorage3D(i.TEXTURE_3D,oe,_e,ee.width,ee.height,ee.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,me,Le,ee.data)):t.texImage3D(i.TEXTURE_3D,0,_e,ee.width,ee.height,ee.depth,0,me,Le,ee.data);else if(v.isFramebufferTexture){if(We)if(ke)t.texStorage2D(i.TEXTURE_2D,oe,_e,ee.width,ee.height);else{let Q=ee.width,de=ee.height;for(let xe=0;xe<oe;xe++)t.texImage2D(i.TEXTURE_2D,xe,_e,Q,de,0,me,Le,null),Q>>=1,de>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),ee.parentNode!==Q){Q.appendChild(ee),d.add(v),Q.onpaint=de=>{const xe=de.changedElements;for(const le of d)xe.includes(le.image)&&(le.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{const xe=i.RGBA,le=i.RGBA,Be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,le,Be,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Re.length>0){if(ke&&We){const Q=Ze(Re[0]);t.texStorage2D(i.TEXTURE_2D,oe,_e,Q.width,Q.height)}for(let Q=0,de=Re.length;Q<de;Q++)ve=Re[Q],ke?P&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,me,Le,ve):t.texImage2D(i.TEXTURE_2D,Q,_e,me,Le,ve);v.generateMipmaps=!1}else if(ke){if(We){const Q=Ze(ee);t.texStorage2D(i.TEXTURE_2D,oe,_e,Q.width,Q.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Le,ee)}else t.texImage2D(i.TEXTURE_2D,0,_e,me,Le,ee);m(v)&&M(H),fe.__version=ue.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Fe(A,v,O){if(v.image.length!==6)return;const H=Ye(A,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const ue=n.get(Z);if(Z.version!==ue.__version||H===!0){t.activeTexture(i.TEXTURE0+O);const fe=et.getPrimaries(et.workingColorSpace),J=v.colorSpace===ui?null:et.getPrimaries(v.colorSpace),ee=v.colorSpace===ui||fe===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const me=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,_e=[];for(let le=0;le<6;le++)!me&&!Le?_e[le]=p(v.image[le],!0,s.maxCubemapSize):_e[le]=Le?v.image[le].image:v.image[le],_e[le]=rt(v,_e[le]);const ve=_e[0],Re=r.convert(v.format,v.colorSpace),ke=r.convert(v.type),We=x(v.internalFormat,Re,ke,v.normalized,v.colorSpace),P=v.isVideoTexture!==!0,oe=ue.__version===void 0||H===!0,Q=Z.dataReady;let de=b(v,ve);qe(i.TEXTURE_CUBE_MAP,v);let xe;if(me){P&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,de,We,ve.width,ve.height);for(let le=0;le<6;le++){xe=_e[le].mipmaps;for(let Be=0;Be<xe.length;Be++){const De=xe[Be];v.format!==_n?Re!==null?P?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,0,0,De.width,De.height,Re,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,We,De.width,De.height,0,De.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,0,0,De.width,De.height,Re,ke,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be,We,De.width,De.height,0,Re,ke,De.data)}}}else{if(xe=v.mipmaps,P&&oe){xe.length>0&&de++;const le=Ze(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,de,We,le.width,le.height)}for(let le=0;le<6;le++)if(Le){P?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,_e[le].width,_e[le].height,Re,ke,_e[le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,We,_e[le].width,_e[le].height,0,Re,ke,_e[le].data);for(let Be=0;Be<xe.length;Be++){const dt=xe[Be].image[le].image;P?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,0,0,dt.width,dt.height,Re,ke,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,We,dt.width,dt.height,0,Re,ke,dt.data)}}else{P?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Re,ke,_e[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,We,Re,ke,_e[le]);for(let Be=0;Be<xe.length;Be++){const De=xe[Be];P?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,0,0,Re,ke,De.image[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Be+1,We,Re,ke,De.image[le])}}}m(v)&&M(i.TEXTURE_CUBE_MAP),ue.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function q(A,v,O,H,Z,ue){const fe=r.convert(O.format,O.colorSpace),J=r.convert(O.type),ee=x(O.internalFormat,fe,J,O.normalized,O.colorSpace),me=n.get(v),Le=n.get(O);if(Le.__renderTarget=v,!me.__hasExternalTextures){const _e=Math.max(1,v.width>>ue),ve=Math.max(1,v.height>>ue);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ue,ee,_e,ve,v.depth,0,fe,J,null):t.texImage2D(Z,ue,ee,_e,ve,0,fe,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,Z,Le.__webglTexture,0,He(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,Z,Le.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(A,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const H=v.depthTexture,Z=H&&H.isDepthTexture?H.type:null,ue=T(v.stencilBuffer,Z),fe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(v),ue,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(v),ue,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ue,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,A)}else{const H=v.textures;for(let Z=0;Z<H.length;Z++){const ue=H[Z],fe=r.convert(ue.format,ue.colorSpace),J=r.convert(ue.type),ee=x(ue.internalFormat,fe,J,ue.normalized,ue.colorSpace);Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(v),ee,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(A,v,O){const H=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v.depthTexture);const me=r.convert(v.depthTexture.format),Le=r.convert(v.depthTexture.type);let _e;v.depthTexture.format===Qn?_e=i.DEPTH_COMPONENT24:v.depthTexture.format===Ri&&(_e=i.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,_e,v.width,v.height,0,me,Le,null)}}else se(v.depthTexture,0);const ue=Z.__webglTexture,fe=He(v),J=H?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,ee=v.depthTexture.format===Ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Qn)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,ue,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,ue,0);else if(v.depthTexture.format===Ri)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,ue,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function W(A){const v=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const H=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",Z)};H.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=H}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)Me(v.__webglFramebuffer[H],A,H);else{const H=A.texture.mipmaps;H&&H.length>0?Me(v.__webglFramebuffer[0],A,0):Me(v.__webglFramebuffer,A,0)}else if(O){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=i.createRenderbuffer(),te(v.__webglDepthbuffer[H],A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ue)}}else{const H=A.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),te(v.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(A,v,O){const H=n.get(A);v!==void 0&&q(H.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&W(A)}function he(A){const v=A.texture,O=n.get(A),H=n.get(v);A.addEventListener("dispose",_);const Z=A.textures,ue=A.isWebGLCubeRenderTarget===!0,fe=Z.length>1;if(fe||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=v.version,a.memory.textures++),ue){O.__webglFramebuffer=[];for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[J]=[];for(let ee=0;ee<v.mipmaps.length;ee++)O.__webglFramebuffer[J][ee]=i.createFramebuffer()}else O.__webglFramebuffer[J]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let J=0;J<v.mipmaps.length;J++)O.__webglFramebuffer[J]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(fe)for(let J=0,ee=Z.length;J<ee;J++){const me=n.get(Z[J]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Ve(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let J=0;J<Z.length;J++){const ee=Z[J];O.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[J]);const me=r.convert(ee.format,ee.colorSpace),Le=r.convert(ee.type),_e=x(ee.internalFormat,me,Le,ee.normalized,ee.colorSpace,A.isXRRenderTarget===!0),ve=He(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,_e,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,O.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),te(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v);for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)q(O.__webglFramebuffer[J][ee],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ee);else q(O.__webglFramebuffer[J],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let J=0,ee=Z.length;J<ee;J++){const me=Z[J],Le=n.get(me);let _e=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(_e=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,Le.__webglTexture),qe(_e,me),q(O.__webglFramebuffer,A,me,i.COLOR_ATTACHMENT0+J,_e,0),m(me)&&M(_e)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,H.__webglTexture),qe(J,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)q(O.__webglFramebuffer[ee],A,v,i.COLOR_ATTACHMENT0,J,ee);else q(O.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,J,0);m(v)&&M(J),t.unbindTexture()}A.depthBuffer&&W(A)}function ce(A){const v=A.textures;for(let O=0,H=v.length;O<H;O++){const Z=v[O];if(m(Z)){const ue=w(A),fe=n.get(Z).__webglTexture;t.bindTexture(ue,fe),M(ue),t.unbindTexture()}}}const pe=[],ze=[];function Oe(A){if(A.samples>0){if(Ve(A)===!1){const v=A.textures,O=A.width,H=A.height;let Z=i.COLOR_BUFFER_BIT;const ue=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(A),J=v.length>1;if(J)for(let me=0;me<v.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const ee=A.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let me=0;me<v.length;me++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[me]);const Le=n.get(v[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,O,H,0,0,O,H,Z,i.NEAREST),l===!0&&(pe.length=0,ze.length=0,pe.push(i.COLOR_ATTACHMENT0+me),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(pe.push(ue),ze.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let me=0;me<v.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,fe.__webglColorRenderbuffer[me]);const Le=n.get(v[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function He(A){return Math.min(s.maxSamples,A.samples)}function Ve(A){const v=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function L(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function rt(A,v){const O=A.colorSpace,H=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==$r&&O!==ui&&(et.getTransfer(O)===lt?(H!==_n||Z!==rn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",O)),v}function Ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=G,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=se,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=ie,this.rebindTextures=re,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=W,this.setupFrameBufferTexture=q,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function gv(i,e){function t(n,s=ui){let r;const a=et.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===tl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ph)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===mh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===dh)return i.BYTE;if(n===fh)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===el)return i.INT;if(n===Un)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Yt)return i.HALF_FLOAT;if(n===gh)return i.ALPHA;if(n===vh)return i.RGB;if(n===_n)return i.RGBA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===Ri)return i.DEPTH_STENCIL;if(n===il)return i.RED;if(n===sl)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===rl)return i.RG_INTEGER;if(n===al)return i.RGBA_INTEGER;if(n===zr||n===kr||n===Hr||n===Gr)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===no||n===io||n===so||n===ro)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ao||n===oo||n===lo||n===co||n===ho||n===qr||n===uo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ao||n===oo)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===lo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===co)return r.COMPRESSED_R11_EAC;if(n===ho)return r.COMPRESSED_SIGNED_R11_EAC;if(n===qr)return r.COMPRESSED_RG11_EAC;if(n===uo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo||n===Mo||n===So||n===yo||n===bo||n===To||n===Eo||n===wo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===po)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===mo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===go)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_o)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===So)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===To)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ao||n===Co||n===Ro)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ao)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Po||n===Io||n===Yr||n===Lo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Po)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const vv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_v=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new wh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new St({vertexShader:vv,fragmentShader:_v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new Bt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Mv extends Oi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const S=typeof XRWebGLBinding<"u",p=new xv,m={},M=t.getContextAttributes();let w=null,x=null;const T=[],b=[],R=new ae;let _=null,E=null;const I=new cn;I.viewport=new mt;const D=new cn;D.viewport=new mt;const F=[I,D],G=new wf;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=T[$];return ne===void 0&&(ne=new xa,T[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=T[$];return ne===void 0&&(ne=new xa,T[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=T[$];return ne===void 0&&(ne=new xa,T[$]=ne),ne.getHandSpace()};function K($){const ne=b.indexOf($.inputSource);if(ne===-1)return;const ge=T[ne];ge!==void 0&&(ge.update($.inputSource,$.frame,c||a),ge.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",se);for(let $=0;$<T.length;$++){const ne=b[$];ne!==null&&(b[$]=null,T[$].disconnect(ne))}N=null,B=null,p.reset();for(const $ in m)delete m[$];if(e.setRenderTarget(w),f=null,u=null,d=null,s=null,x=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),E!==null){const $=E.camera;$.fov=E.fov,$.zoom=E.zoom,$.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",V),s.addEventListener("inputsourceschange",se),M.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Fe=null,q=null;M.depth&&(q=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=M.stencil?Ri:Qn,Fe=M.stencil?Zs:Un);const te={colorFormat:t.RGBA8,depthFormat:q,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(te),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new kt(u.textureWidth,u.textureHeight,{format:_n,type:rn,depthTexture:new Qs(u.textureWidth,u.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ge={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new kt(f.framebufferWidth,f.framebufferHeight,{format:_n,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function se($){for(let ne=0;ne<$.removed.length;ne++){const ge=$.removed[ne],Fe=b.indexOf(ge);Fe>=0&&(b[Fe]=null,T[Fe].disconnect(ge))}for(let ne=0;ne<$.added.length;ne++){const ge=$.added[ne];let Fe=b.indexOf(ge);if(Fe===-1){for(let te=0;te<T.length;te++)if(te>=b.length){b.push(ge),Fe=te;break}else if(b[te]===null){b[te]=ge,Fe=te;break}if(Fe===-1)break}const q=T[Fe];q&&q.connect(ge)}}const X=new C,j=new C;function ie($,ne,ge){X.setFromMatrixPosition(ne.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);const Fe=X.distanceTo(j),q=ne.projectionMatrix.elements,te=ge.projectionMatrix.elements,Me=q[14]/(q[10]-1),W=q[14]/(q[10]+1),re=(q[9]+1)/q[5],he=(q[9]-1)/q[5],ce=(q[8]-1)/q[0],pe=(te[8]+1)/te[0],ze=Me*ce,Oe=Me*pe,He=Fe/(-ce+pe),Ve=He*-ce;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ve),$.translateZ(He),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),q[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const L=Me+He,rt=W+He,Ze=ze-Ve,A=Oe+(Fe-Ve),v=re*W/rt*L,O=he*W/rt*L;$.projectionMatrix.makePerspective(Ze,A,v,O,L,rt),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ce($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ne=$.near,ge=$.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(ge=p.depthFar)),G.near=D.near=I.near=ne,G.far=D.far=I.far=ge,(N!==G.near||B!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),N=G.near,B=G.far),G.layers.mask=$.layers.mask|6,I.layers.mask=G.layers.mask&-5,D.layers.mask=G.layers.mask&-3;const Fe=$.parent,q=G.cameras;Ce(G,Fe);for(let te=0;te<q.length;te++)Ce(q[te],Fe);q.length===2?ie(G,I,D):G.projectionMatrix.copy(I.projectionMatrix),E===null&&$.isPerspectiveCamera&&(E={camera:$,fov:$.fov,zoom:$.zoom}),Te($,G,Fe)};function Te($,ne,ge){ge===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(ge.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ks*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function($){return m[$]};let Qe=null;function qe($,ne){if(h=ne.getViewerPose(c||a),g=ne,h!==null){const ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Fe=!1;ge.length!==G.cameras.length&&(G.cameras.length=0,Fe=!0);for(let W=0;W<ge.length;W++){const re=ge[W];let he=null;if(f!==null)he=f.getViewport(re);else{const pe=d.getViewSubImage(u,re);he=pe.viewport,W===0&&(e.setRenderTargetTextures(x,pe.colorTexture,pe.depthStencilTexture),e.setRenderTarget(x))}let ce=F[W];ce===void 0&&(ce=new cn,ce.layers.enable(W),ce.viewport=new mt,F[W]=ce),ce.matrix.fromArray(re.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(re.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(he.x,he.y,he.width,he.height),W===0&&(G.matrix.copy(ce.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Fe===!0&&G.cameras.push(ce)}const q=s.enabledFeatures;if(q&&q.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=n.getBinding();const W=d.getDepthInformation(ge[0]);W&&W.isValid&&W.texture&&p.init(W,s.renderState)}if(q&&q.includes("camera-access")&&S){e.state.unbindTexture(),d=n.getBinding();for(let W=0;W<ge.length;W++){const re=ge[W].camera;if(re){let he=m[re];he||(he=new wh,m[re]=he);const ce=d.getCameraImage(re);he.sourceTexture=ce}}}}for(let ge=0;ge<T.length;ge++){const Fe=b[ge],q=T[ge];Fe!==null&&q!==void 0&&q.update(Fe,ne,c||a)}Qe&&Qe($,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const Ye=new Hh;Ye.setAnimationLoop(qe),this.setAnimationLoop=function($){Qe=$},this.dispose=function(){}}}const Sv=new tt,Zh=new Xe;Zh.set(-1,0,0,0,1,0,0,0,1);function yv(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Nh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,w,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,x)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),S(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,w):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===qt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===qt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m),w=M.envMap,x=M.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(Sv.makeRotationFromEuler(x)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Zh),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,w){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=w*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function S(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function bv(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){const b=T.program;n.uniformBlockBinding(x,b)}function c(x,T){let b=s[x.id];b===void 0&&(p(x),b=h(x),s[x.id]=b,x.addEventListener("dispose",M));const R=T.program;n.updateUBOMapping(x,R);const _=e.render.frame;r[x.id]!==_&&(u(x),r[x.id]=_)}function h(x){const T=d();x.__bindingPointIndex=T;const b=i.createBuffer(),R=x.__size,_=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const T=s[x.id],b=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=b.length;_<E;_++){const I=b[_];if(Array.isArray(I))for(let D=0,F=I.length;D<F;D++)f(I[D],_,D,R);else f(I,_,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,T,b,R){if(S(x,T,b,R)===!0){const _=x.__offset,E=x.value;if(Array.isArray(E)){let I=0;for(let D=0;D<E.length;D++){const F=E[D],G=m(F);g(F,x.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,x.__data)}}function g(x,T,b){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,b)}function S(x,T,b,R){const _=x.value,E=T+"_"+b;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{const I=R[E];if(typeof _=="number"||typeof _=="boolean"){if(I!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(I.equals(_)===!1)return I.copy(_),!0}}return!1}function p(x){const T=x.uniforms;let b=0;const R=16;for(let E=0,I=T.length;E<I;E++){const D=Array.isArray(T[E])?T[E]:[T[E]];for(let F=0,G=D.length;F<G;F++){const N=D[F],B=Array.isArray(N.value)?N.value:[N.value];for(let K=0,V=B.length;K<V;K++){const se=B[K],X=m(se),j=b%R,ie=j%X.boundary,Ce=j+ie;b+=ie,Ce!==0&&R-Ce<X.storage&&(b+=R-Ce),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=X.storage}}}const _=b%R;return _>0&&(b+=R-_),x.__size=b,x.__cache={},this}function m(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",x),T}function M(x){const T=x.target;T.removeEventListener("dispose",M);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const Tv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Tn=null;function Ev(){return Tn===null&&(Tn=new Th(Tv,16,16,Ni,Yt),Tn.name="DFG_LUT",Tn.minFilter=Dt,Tn.magFilter=Dt,Tn.wrapS=qn,Tn.wrapT=qn,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}class wv{constructor(e={}){const{canvas:t=Vu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const S=f,p=new Set([al,rl,sl]),m=new Set([rn,Un,Ys,Zs,tl,nl]),M=new Uint32Array(4),w=new Int32Array(4),x=new C;let T=null,b=null;const R=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let D=!1,F=null,G=null,N=null,B=null;this._outputColorSpace=Qt;let K=0,V=0,se=null,X=-1,j=null;const ie=new mt,Ce=new mt;let Te=null;const Qe=new we(0);let qe=0,Ye=t.width,$=t.height,ne=1,ge=null,Fe=null;const q=new mt(0,0,Ye,$),te=new mt(0,0,Ye,$);let Me=!1;const W=new fl;let re=!1,he=!1;const ce=new tt,pe=new C,ze=new mt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function Ve(){return se===null?ne:1}let L=n;function rt(y,U){return t.getContext(y,U)}let Ze,A,v,O,H,Z,ue,fe,J,ee,me,Le,_e,ve,Re,ke,We,P,oe,Q,de,xe,le;try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",dn,!1),L===null){const U="webgl2";if(L=rt(U,y),L===null)throw rt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Be()}catch(y){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",dn,!1),nt("WebGLRenderer: "+y.message),y}function Be(){Ze=new E0(L),Ze.init(),de=new gv(L,Ze),A=new m0(L,Ze,e,de),v=new pv(L,Ze),A.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),G=L.createFramebuffer(),N=L.createFramebuffer(),B=L.createFramebuffer(),O=new C0(L),H=new ev,Z=new mv(L,Ze,v,H,A,de,O),ue=new T0(I),fe=new Pf(L),xe=new f0(L,fe),J=new w0(L,fe,O,xe),ee=new P0(L,J,fe,xe,O),P=new R0(L,A,Z),Re=new g0(H),me=new jg(I,ue,Ze,A,xe,Re),Le=new yv(I,H),_e=new nv,ve=new lv(Ze),We=new d0(I,ue,v,ee,g,l),ke=new fv(I,ee,A),le=new bv(L,O,A,v),oe=new p0(L,Ze,O),Q=new A0(L,Ze,O),O.programs=me.programs,I.capabilities=A,I.extensions=Ze,I.properties=H,I.renderLists=_e,I.shadowMap=ke,I.state=v,I.info=O}S!==rn&&(E=new L0(S,t.width,t.height,o,s,r));const De=new Mv(I,L);this.xr=De,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(y){y!==void 0&&(ne=y,this.setSize(Ye,$,!1))},this.getSize=function(y){return y.set(Ye,$)},this.setSize=function(y,U,Y=!0){if(De.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}Ye=y,$=U,t.width=Math.floor(y*ne),t.height=Math.floor(U*ne),Y===!0&&(t.style.width=y+"px",t.style.height=U+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Ye*ne,$*ne).floor()},this.setDrawingBufferSize=function(y,U,Y){Ye=y,$=U,ne=Y,t.width=Math.floor(y*Y),t.height=Math.floor(U*Y),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(S===rn){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ie)},this.getViewport=function(y){return y.copy(q)},this.setViewport=function(y,U,Y,z){y.isVector4?q.set(y.x,y.y,y.z,y.w):q.set(y,U,Y,z),v.viewport(ie.copy(q).multiplyScalar(ne).round())},this.getScissor=function(y){return y.copy(te)},this.setScissor=function(y,U,Y,z){y.isVector4?te.set(y.x,y.y,y.z,y.w):te.set(y,U,Y,z),v.scissor(Ce.copy(te).multiplyScalar(ne).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(y){v.setScissorTest(Me=y)},this.setOpaqueSort=function(y){ge=y},this.setTransparentSort=function(y){Fe=y},this.getClearColor=function(y){return y.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,Y=!0){let z=0;if(y){let k=!1;if(se!==null){const be=se.texture.format;k=p.has(be)}if(k){const be=se.texture.type,Ae=m.has(be),ye=We.getClearColor(),Pe=We.getClearAlpha(),Ue=ye.r,$e=ye.g,je=ye.b;Ae?(M[0]=Ue,M[1]=$e,M[2]=je,M[3]=Pe,L.clearBufferuiv(L.COLOR,0,M)):(w[0]=Ue,w[1]=$e,w[2]=je,w[3]=Pe,L.clearBufferiv(L.COLOR,0,w))}else z|=L.COLOR_BUFFER_BIT}U&&(z|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),F=y},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",dn,!1),We.dispose(),_e.dispose(),ve.dispose(),H.dispose(),ue.dispose(),ee.dispose(),xe.dispose(),le.dispose(),me.dispose(),De.dispose(),De.removeEventListener("sessionstart",Tl),De.removeEventListener("sessionend",El),xi.stop()};function dt(y){y.preventDefault(),Bl("WebGLRenderer: Context Lost."),D=!0}function at(){Bl("WebGLRenderer: Context Restored."),D=!1;const y=O.autoReset,U=ke.enabled,Y=ke.autoUpdate,z=ke.needsUpdate,k=ke.type;Be(),O.autoReset=y,ke.enabled=U,ke.autoUpdate=Y,ke.needsUpdate=z,ke.type=k}function dn(y){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Sn(y){const U=y.target;U.removeEventListener("dispose",Sn),tu(U)}function tu(y){nu(y),H.remove(y)}function nu(y){const U=H.get(y).programs;U!==void 0&&(U.forEach(function(Y){me.releaseProgram(Y)}),y.isShaderMaterial&&me.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,Y,z,k,be){U===null&&(U=Oe);const Ae=k.isMesh&&k.matrixWorld.determinantAffine()<0,ye=ru(y,U,Y,z,k);v.setMaterial(z,Ae);let Pe=Y.index,Ue=1;if(z.wireframe===!0){if(Pe=J.getWireframeAttribute(Y),Pe===void 0)return;Ue=2}const $e=Y.drawRange,je=Y.attributes.position;let Ie=$e.start*Ue,ot=($e.start+$e.count)*Ue;be!==null&&(Ie=Math.max(Ie,be.start*Ue),ot=Math.min(ot,(be.start+be.count)*Ue)),Pe!==null?(Ie=Math.max(Ie,0),ot=Math.min(ot,Pe.count)):je!=null&&(Ie=Math.max(Ie,0),ot=Math.min(ot,je.count));const xt=ot-Ie;if(xt<0||xt===1/0)return;xe.setup(k,z,ye,Y,Pe);let pt,ut=oe;if(Pe!==null&&(pt=fe.get(Pe),ut=Q,ut.setIndex(pt)),k.isMesh)z.wireframe===!0?(v.setLineWidth(z.wireframeLinewidth*Ve()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(k.isLine){let Nt=z.linewidth;Nt===void 0&&(Nt=1),v.setLineWidth(Nt*Ve()),k.isLineSegments?ut.setMode(L.LINES):k.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else k.isPoints?ut.setMode(L.POINTS):k.isSprite&&ut.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))ut.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Nt=k._multiDrawStarts,Ee=k._multiDrawCounts,Ht=k._multiDrawCount,st=Pe?fe.get(Pe).bytesPerElement:1,an=H.get(z).currentProgram.getUniforms();for(let yn=0;yn<Ht;yn++)an.setValue(L,"_gl_DrawID",yn),ut.render(Nt[yn]/st,Ee[yn])}else if(k.isInstancedMesh)ut.renderInstances(Ie,xt,k.count);else if(Y.isInstancedBufferGeometry){const Nt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ee=Math.min(Y.instanceCount,Nt);ut.renderInstances(Ie,xt,Ee)}else ut.render(Ie,xt)};function bl(y,U,Y,z){F!==null&&y.isNodeMaterial&&F.setObject(z,y),re===!0&&Re.setState(y,Y,!1),y.transparent===!0&&y.side===jt&&y.forceSinglePass===!1?(y.side=qt,y.needsUpdate=!0,or(y,U,z),y.side=Di,y.needsUpdate=!0,or(y,U,z),y.side=jt):or(y,U,z)}this.compile=function(y,U,Y=null){Y===null&&(Y=y),F!==null&&F.renderStart(y,U,Y),b=ve.get(Y),b.init(U),_.push(b),Y.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),y!==Y&&y.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),b.setupLights(),F!==null&&F.updateLights(b.state.lightsArray),he=this.localClippingEnabled,re=Re.init(this.clippingPlanes,he),re===!0&&Re.setGlobalState(this.clippingPlanes,U),F!==null&&ke.render(b.state.shadowsArray,Y,U);const z=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const be=k.material;if(be)if(Array.isArray(be))for(let Ae=0;Ae<be.length;Ae++){const ye=be[Ae];bl(ye,Y,U,k),z.add(ye)}else bl(be,Y,U,k),z.add(be)}),b=_.pop(),F!==null&&F.renderEnd(),z},this.compileAsync=function(y,U,Y=null){const z=this.compile(y,U,Y);return new Promise(k=>{function be(){if(z.forEach(function(Ae){const Pe=H.get(Ae).currentProgram;(Pe===void 0||Pe.isReady())&&z.delete(Ae)}),z.size===0){k(y);return}setTimeout(be,10)}Ze.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let la=null;function iu(y){la&&la(y)}function Tl(){xi.stop()}function El(){xi.start()}const xi=new Hh;xi.setAnimationLoop(iu),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(y){la=y,De.setAnimationLoop(y),y===null?xi.stop():xi.start()},De.addEventListener("sessionstart",Tl),De.addEventListener("sessionend",El),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(y,U);const Y=De.enabled===!0&&De.isPresenting===!0,z=E!==null&&(se===null||Y)&&E.begin(I,se);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(U),U=De.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,U,se),b=ve.get(y,_.length),b.init(U),b.state.textureUnits=Z.getTextureUnits(),_.push(b),ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),W.setFromProjectionMatrix(ce,Pn,U.reversedDepth),he=this.localClippingEnabled,re=Re.init(this.clippingPlanes,he),T=_e.get(y,R.length),T.init(),R.push(T),De.enabled===!0&&De.isPresenting===!0){const Ae=I.xr.getDepthSensingMesh();Ae!==null&&ca(Ae,U,-1/0,I.sortObjects)}ca(y,U,0,I.sortObjects),T.finish(),F!==null&&F.updateLights(b.state.lightsArray),I.sortObjects===!0&&T.sort(ge,Fe),He=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,He&&We.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&Re.beginShadows();const k=b.state.shadowsArray;if(ke.render(k,y,U),re===!0&&Re.endShadows(),(z&&E.hasRenderPass())===!1){const Ae=T.opaque,ye=T.transmissive;if(b.setupLights(),U.isArrayCamera){const Pe=U.cameras;if(ye.length>0)for(let Ue=0,$e=Pe.length;Ue<$e;Ue++){const je=Pe[Ue];Al(Ae,ye,y,je)}He&&We.render(y);for(let Ue=0,$e=Pe.length;Ue<$e;Ue++){const je=Pe[Ue];wl(T,y,je,je.viewport)}}else ye.length>0&&Al(Ae,ye,y,U),He&&We.render(y),wl(T,y,U)}se!==null&&V===0&&(Z.updateMultisampleRenderTarget(se),Z.updateRenderTargetMipmap(se)),z&&E.end(I),y.isScene===!0&&y.onAfterRender(I,y,U),xe.resetDefaultState(),X=-1,j=null,_.pop(),_.length>0?(b=_[_.length-1],Z.setTextureUnits(b.state.textureUnits),re===!0&&Re.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,F!==null&&F.renderEnd()};function ca(y,U,Y,z){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)Y=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(W)){z&&ze.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ce);const Ae=ee.update(y),ye=y.material;ye.visible&&T.push(y,Ae,ye,Y,ze.z,null,U)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(W))){const Ae=ee.update(y),ye=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ze.copy(y.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ze.copy(Ae.boundingSphere.center)),ze.applyMatrix4(y.matrixWorld).applyMatrix4(ce)),Array.isArray(ye)){const Pe=Ae.groups;for(let Ue=0,$e=Pe.length;Ue<$e;Ue++){const je=Pe[Ue],Ie=ye[je.materialIndex];Ie&&Ie.visible&&T.push(y,Ae,Ie,Y,ze.z,je,U)}}else ye.visible&&T.push(y,Ae,ye,Y,ze.z,null,U)}}const be=y.children;for(let Ae=0,ye=be.length;Ae<ye;Ae++)ca(be[Ae],U,Y,z)}function wl(y,U,Y,z){const{opaque:k,transmissive:be,transparent:Ae}=y;b.setupLightsView(Y),re===!0&&Re.setGlobalState(I.clippingPlanes,Y),z&&v.viewport(ie.copy(z)),k.length>0&&ar(k,U,Y),be.length>0&&ar(be,U,Y),Ae.length>0&&ar(Ae,U,Y),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Al(y,U,Y,z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[z.id]===void 0){const Ie=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[z.id]=new kt(1,1,{generateMipmaps:!0,type:Ie?Yt:rn,minFilter:di,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}const be=b.state.transmissionRenderTarget[z.id],Ae=z.viewport||ie;be.setSize(Ae.z*I.transmissionResolutionScale,Ae.w*I.transmissionResolutionScale);const ye=I.getRenderTarget(),Pe=I.getActiveCubeFace(),Ue=I.getActiveMipmapLevel();I.setRenderTarget(be),I.getClearColor(Qe),qe=I.getClearAlpha(),qe<1&&I.setClearColor(16777215,.5),I.clear(),He&&We.render(Y);const $e=I.toneMapping;I.toneMapping=Dn;const je=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),b.setupLightsView(z),re===!0&&Re.setGlobalState(I.clippingPlanes,z),ar(y,Y,z),Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ot=0,xt=U.length;ot<xt;ot++){const pt=U[ot],{object:ut,geometry:Nt,material:Ee,group:Ht}=pt;if(Ee.side===jt&&ut.layers.test(z.layers)){const st=Ee.side;Ee.side=qt,Ee.needsUpdate=!0,Cl(ut,Y,z,Nt,Ee,Ht),Ee.side=st,Ee.needsUpdate=!0,Ie=!0}}Ie===!0&&(Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be))}I.setRenderTarget(ye,Pe,Ue),I.setClearColor(Qe,qe),je!==void 0&&(z.viewport=je),I.toneMapping=$e}function ar(y,U,Y){const z=U.isScene===!0?U.overrideMaterial:null;for(let k=0,be=y.length;k<be;k++){const Ae=y[k],{object:ye,geometry:Pe,group:Ue}=Ae;let $e=Ae.material;$e.allowOverride===!0&&z!==null&&($e=z),ye.layers.test(Y.layers)&&Cl(ye,U,Y,Pe,$e,Ue)}}function Cl(y,U,Y,z,k,be){F!==null&&k.isNodeMaterial&&F.setObject(y,k),y.onBeforeRender(I,U,Y,z,k,be),y.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(I,U,Y,z,y,be),k.transparent===!0&&k.side===jt&&k.forceSinglePass===!1?(k.side=qt,k.needsUpdate=!0,I.renderBufferDirect(Y,U,z,k,y,be),k.side=Di,k.needsUpdate=!0,I.renderBufferDirect(Y,U,z,k,y,be),k.side=jt):I.renderBufferDirect(Y,U,z,k,y,be),y.onAfterRender(I,U,Y,z,k,be)}function or(y,U,Y){U.isScene!==!0&&(U=Oe);const z=H.get(y),k=b.state.lights,be=b.state.shadowsArray,Ae=k.state.version,ye=me.getParameters(y,k.state,be,U,Y,b.state.lightProbeGridArray),Pe=me.getProgramCacheKey(ye);let Ue=z.programs;z.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;z.envMap=ue.get(y.envMap||z.environment,$e),z.envMapRotation=z.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ue===void 0&&(y.addEventListener("dispose",Sn),Ue=new Map,z.programs=Ue);let je=Ue.get(Pe);if(je!==void 0){if(z.currentProgram===je&&z.lightsStateVersion===Ae)return Pl(y,ye),je}else ye.uniforms=me.getUniforms(y),F!==null&&y.isNodeMaterial&&F.build(y,Y,ye),y.onBeforeCompile(ye,I),je=me.acquireProgram(ye,Pe),Ue.set(Pe,je),z.uniforms=ye.uniforms;const Ie=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=Re.uniform),Pl(y,ye),z.needsLights=ou(y),z.lightsStateVersion=Ae,z.needsLights&&(Ie.ambientLightColor.value=k.state.ambient,Ie.lightProbe.value=k.state.probe,Ie.sunLights.value=k.state.sun,Ie.sunLightShadows.value=k.state.sunShadow,Ie.directionalLights.value=k.state.directional,Ie.directionalLightShadows.value=k.state.directionalShadow,Ie.spotLights.value=k.state.spot,Ie.spotLightShadows.value=k.state.spotShadow,Ie.rectAreaLights.value=k.state.rectArea,Ie.ltc_1.value=k.state.rectAreaLTC1,Ie.ltc_2.value=k.state.rectAreaLTC2,Ie.pointLights.value=k.state.point,Ie.pointLightShadows.value=k.state.pointShadow,Ie.hemisphereLights.value=k.state.hemi,Ie.sunShadowMatrix.value=k.state.sunShadowMatrix,Ie.sunShadowCascade.value=k.state.sunShadowCascade,Ie.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ie.spotLightMatrix.value=k.state.spotLightMatrix,Ie.spotLightMap.value=k.state.spotLightMap,Ie.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=b.state.lightProbeGridArray.length>0,z.currentProgram=je,z.uniformsList=null,je}function Rl(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=Vr.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Pl(y,U){const Y=H.get(y);Y.outputColorSpace=U.outputColorSpace,Y.batching=U.batching,Y.batchingColor=U.batchingColor,Y.instancing=U.instancing,Y.instancingColor=U.instancingColor,Y.instancingMorph=U.instancingMorph,Y.skinning=U.skinning,Y.morphTargets=U.morphTargets,Y.morphNormals=U.morphNormals,Y.morphColors=U.morphColors,Y.morphTargetsCount=U.morphTargetsCount,Y.numClippingPlanes=U.numClippingPlanes,Y.numIntersection=U.numClipIntersection,Y.vertexAlphas=U.vertexAlphas,Y.vertexTangents=U.vertexTangents,Y.toneMapping=U.toneMapping}function su(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;x.setFromMatrixPosition(U.matrixWorld);for(let Y=0,z=y.length;Y<z;Y++){const k=y[Y];if(k.texture!==null&&k.boundingBox.containsPoint(x))return k}return null}function ru(y,U,Y,z,k){U.isScene!==!0&&(U=Oe),Z.resetTextureUnits();const be=U.fog,Ae=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,ye=se===null?I.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:et.workingColorSpace,Pe=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ue=ue.get(z.envMap||Ae,Pe),$e=z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,je=!!Y.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ie=!!Y.morphAttributes.position,ot=!!Y.morphAttributes.normal,xt=!!Y.morphAttributes.color;let pt=Dn;z.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(pt=I.toneMapping);const ut=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Nt=ut!==void 0?ut.length:0,Ee=H.get(z),Ht=b.state.lights;if(re===!0&&(he===!0||y!==j)){const ft=y===j&&z.id===X;Re.setState(z,y,ft)}let st=!1;z.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ht.state.version||Ee.outputColorSpace!==ye||k.isBatchedMesh&&Ee.batching===!1||!k.isBatchedMesh&&Ee.batching===!0||k.isBatchedMesh&&Ee.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Ee.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Ee.instancing===!1||!k.isInstancedMesh&&Ee.instancing===!0||k.isSkinnedMesh&&Ee.skinning===!1||!k.isSkinnedMesh&&Ee.skinning===!0||k.isInstancedMesh&&Ee.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ee.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ee.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ee.instancingMorph===!1&&k.morphTexture!==null||Ee.envMap!==Ue||z.fog===!0&&Ee.fog!==be||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Re.numPlanes||Ee.numIntersection!==Re.numIntersection)||Ee.vertexAlphas!==$e||Ee.vertexTangents!==je||Ee.morphTargets!==Ie||Ee.morphNormals!==ot||Ee.morphColors!==xt||Ee.toneMapping!==pt||Ee.morphTargetsCount!==Nt||!!Ee.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Ee.__version=z.version);let an=Ee.currentProgram;st===!0&&(an=or(z,U,k),F&&z.isNodeMaterial&&F.onUpdateProgram(z,an,Ee));let yn=!1,ei=!1,Hi=!1;const ht=an.getUniforms(),_t=Ee.uniforms;if(v.useProgram(an.program)&&(yn=!0,ei=!0,Hi=!0),z.id!==X&&(X=z.id,ei=!0),Ee.needsLights){const ft=su(b.state.lightProbeGridArray,k);Ee.lightProbeGrid!==ft&&(Ee.lightProbeGrid=ft,ei=!0)}if(yn||j!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ht.setValue(L,"projectionMatrix",y.projectionMatrix),ht.setValue(L,"viewMatrix",y.matrixWorldInverse);const ni=ht.map.cameraPosition;ni!==void 0&&ni.setValue(L,pe.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ht.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ht.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),j!==y&&(j=y,ei=!0,Hi=!0)}if(Ee.needsLights&&(Ht.state.sunShadowMap.length>0&&ht.setValue(L,"sunShadowMap",Ht.state.sunShadowMap,Z),Ht.state.directionalShadowMap.length>0&&ht.setValue(L,"directionalShadowMap",Ht.state.directionalShadowMap,Z),Ht.state.spotShadowMap.length>0&&ht.setValue(L,"spotShadowMap",Ht.state.spotShadowMap,Z),Ht.state.pointShadowMap.length>0&&ht.setValue(L,"pointShadowMap",Ht.state.pointShadowMap,Z)),k.isSkinnedMesh){ht.setOptional(L,k,"bindMatrix"),ht.setOptional(L,k,"bindMatrixInverse");const ft=k.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ht.setValue(L,"boneTexture",ft.boneTexture,Z))}k.isBatchedMesh&&(ht.setOptional(L,k,"batchingTexture"),ht.setValue(L,"batchingTexture",k._matricesTexture,Z),ht.setOptional(L,k,"batchingIdTexture"),ht.setValue(L,"batchingIdTexture",k._indirectTexture,Z),ht.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&ht.setValue(L,"batchingColorTexture",k._colorsTexture,Z));const ti=Y.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&P.update(k,Y,an),(ei||Ee.receiveShadow!==k.receiveShadow)&&(Ee.receiveShadow=k.receiveShadow,ht.setValue(L,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(_t.envMapIntensity.value=U.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=Ev()),ei){if(ht.setValue(L,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&au(_t,Hi),be&&z.fog===!0&&Le.refreshFogUniforms(_t,be),Le.refreshMaterialUniforms(_t,z,ne,$,b.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const ft=Ee.lightProbeGrid;_t.probesSH.value=ft.texture,_t.probesMin.value.copy(ft.boundingBox.min),_t.probesMax.value.copy(ft.boundingBox.max),_t.probesResolution.value.copy(ft.resolution)}Vr.upload(L,Rl(Ee),_t,Z)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Vr.upload(L,Rl(Ee),_t,Z),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ht.setValue(L,"center",k.center),ht.setValue(L,"modelViewMatrix",k.modelViewMatrix),ht.setValue(L,"normalMatrix",k.normalMatrix),ht.setValue(L,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const ft=z.uniformsGroups;for(let ni=0,Gi=ft.length;ni<Gi;ni++){const Ll=ft[ni];le.update(Ll,an),le.bind(Ll,an)}}return an}function au(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.sunLights.needsUpdate=U,y.sunLightShadows.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function ou(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(y,U,Y){const z=H.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(y.texture).__webglTexture=U,H.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:Y,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const Y=H.get(y);Y.__webglFramebuffer=U,Y.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,Y=0){se=y,K=U,V=Y;let z=null,k=!1,be=!1;if(y){const ye=H.get(y);if(ye.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(L.FRAMEBUFFER,ye.__webglFramebuffer),ie.copy(y.viewport),Ce.copy(y.scissor),Te=y.scissorTest,v.viewport(ie),v.scissor(Ce),v.setScissorTest(Te),X=-1;return}else if(ye.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(ye.__hasExternalTextures)Z.rebindTextures(y,H.get(y.texture).__webglTexture,H.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(ye.__boundDepthTexture!==$e){if($e!==null&&H.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Pe=y.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(be=!0);const Ue=H.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?z=Ue[U][Y]:z=Ue[U],k=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?z=H.get(y).__webglMultisampledFramebuffer:Array.isArray(Ue)?z=Ue[Y]:z=Ue,ie.copy(y.viewport),Ce.copy(y.scissor),Te=y.scissorTest}else ie.copy(q).multiplyScalar(ne).floor(),Ce.copy(te).multiplyScalar(ne).floor(),Te=Me;if(Y!==0&&(z=G),v.bindFramebuffer(L.FRAMEBUFFER,z)&&v.drawBuffers(y,z),v.viewport(ie),v.scissor(Ce),v.setScissorTest(Te),k){const ye=H.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,ye.__webglTexture,Y)}else if(be){const ye=U;for(let Pe=0;Pe<y.textures.length;Pe++){const Ue=H.get(y.textures[Pe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Pe,Ue.__webglTexture,Y,ye)}}else if(y!==null&&Y!==0){const ye=H.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ye.__webglTexture,Y)}X=-1};function Il(y){const U=H.get(y);return(U.__readFormat!==y.format||U.__readType!==y.type)&&(U.__readFormat=y.format,U.__readType=y.type,U.__formatReadable=A.textureFormatReadable(y.format),U.__typeReadable=A.textureTypeReadable(y.type)),U}this.readRenderTargetPixels=function(y,U,Y,z,k,be,Ae,ye=0){if(!(y&&y.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){v.bindFramebuffer(L.FRAMEBUFFER,Pe);try{const Ue=y.textures[ye],$e=Ue.format,je=Ue.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);const Ie=Il(Ue);if(Ie.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-z&&Y>=0&&Y<=y.height-k&&L.readPixels(U,Y,z,k,de.convert($e),de.convert(je),be)}finally{const Ue=se!==null?H.get(se).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(y,U,Y,z,k,be,Ae,ye=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe)if(U>=0&&U<=y.width-z&&Y>=0&&Y<=y.height-k){v.bindFramebuffer(L.FRAMEBUFFER,Pe);const Ue=y.textures[ye],$e=Ue.format,je=Ue.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);const Ie=Il(Ue);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.bufferData(L.PIXEL_PACK_BUFFER,be.byteLength,L.STREAM_READ),L.readPixels(U,Y,z,k,de.convert($e),de.convert(je),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const xt=se!==null?H.get(se).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,xt);const pt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Wu(L,pt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,be),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(ot),L.deleteSync(pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,Y=0){const z=Math.pow(2,-Y),k=Math.floor(y.image.width*z),be=Math.floor(y.image.height*z),Ae=U!==null?U.x:0,ye=U!==null?U.y:0;Z.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,Ae,ye,k,be),v.unbindTexture()},this.copyTextureToTexture=function(y,U,Y=null,z=null,k=0,be=0){let Ae,ye,Pe,Ue,$e,je,Ie,ot,xt;const pt=y.isCompressedTexture?y.mipmaps[be]:y.image;if(Y!==null)Ae=Y.max.x-Y.min.x,ye=Y.max.y-Y.min.y,Pe=Y.isBox3?Y.max.z-Y.min.z:1,Ue=Y.min.x,$e=Y.min.y,je=Y.isBox3?Y.min.z:0;else{const _t=Math.pow(2,-k);Ae=Math.floor(pt.width*_t),ye=Math.floor(pt.height*_t),y.isDataArrayTexture?Pe=pt.depth:y.isData3DTexture?Pe=Math.floor(pt.depth*_t):Pe=1,Ue=0,$e=0,je=0}z!==null?(Ie=z.x,ot=z.y,xt=z.z):(Ie=0,ot=0,xt=0);const ut=de.convert(U.format),Nt=de.convert(U.type);let Ee;U.isData3DTexture?(Z.setTexture3D(U,0),Ee=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),Ee=L.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),Ee=L.TEXTURE_2D),v.activeTexture(L.TEXTURE0),v.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const Ht=v.getParameter(L.UNPACK_ROW_LENGTH),st=v.getParameter(L.UNPACK_IMAGE_HEIGHT),an=v.getParameter(L.UNPACK_SKIP_PIXELS),yn=v.getParameter(L.UNPACK_SKIP_ROWS),ei=v.getParameter(L.UNPACK_SKIP_IMAGES);v.pixelStorei(L.UNPACK_ROW_LENGTH,pt.width),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt.height),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),v.pixelStorei(L.UNPACK_SKIP_ROWS,$e),v.pixelStorei(L.UNPACK_SKIP_IMAGES,je);const Hi=y.isDataArrayTexture||y.isData3DTexture,ht=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const _t=H.get(y),ti=H.get(U),ft=H.get(_t.__renderTarget),ni=H.get(ti.__renderTarget);v.bindFramebuffer(L.READ_FRAMEBUFFER,ft.__webglFramebuffer),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let Gi=0;Gi<Pe;Gi++)Hi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,H.get(y).__webglTexture,k,je+Gi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,H.get(U).__webglTexture,be,xt+Gi)),L.blitFramebuffer(Ue,$e,Ae,ye,Ie,ot,Ae,ye,L.DEPTH_BUFFER_BIT,L.NEAREST);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||H.has(y)){const _t=H.get(y),ti=H.get(U);v.bindFramebuffer(L.READ_FRAMEBUFFER,N),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,B);for(let ft=0;ft<Pe;ft++)Hi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_t.__webglTexture,k,je+ft):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_t.__webglTexture,k),ht?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ti.__webglTexture,be,xt+ft):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ti.__webglTexture,be),k!==0?L.blitFramebuffer(Ue,$e,Ae,ye,Ie,ot,Ae,ye,L.COLOR_BUFFER_BIT,L.NEAREST):ht?L.copyTexSubImage3D(Ee,be,Ie,ot,xt+ft,Ue,$e,Ae,ye):L.copyTexSubImage2D(Ee,be,Ie,ot,Ue,$e,Ae,ye);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ht?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(Ee,be,Ie,ot,xt,Ae,ye,Pe,ut,Nt,pt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ee,be,Ie,ot,xt,Ae,ye,Pe,ut,pt.data):L.texSubImage3D(Ee,be,Ie,ot,xt,Ae,ye,Pe,ut,Nt,pt):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,be,Ie,ot,Ae,ye,ut,Nt,pt.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,be,Ie,ot,pt.width,pt.height,ut,pt.data):L.texSubImage2D(L.TEXTURE_2D,be,Ie,ot,Ae,ye,ut,Nt,pt);v.pixelStorei(L.UNPACK_ROW_LENGTH,Ht),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,st),v.pixelStorei(L.UNPACK_SKIP_PIXELS,an),v.pixelStorei(L.UNPACK_SKIP_ROWS,yn),v.pixelStorei(L.UNPACK_SKIP_IMAGES,ei),be===0&&U.generateMipmaps&&L.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(y){H.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){K=0,V=0,se=null,v.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Ai=1/60,Av=.1,Gc=6,Mn={halfX:3.9,halfZ:3.5,maxHealth:100},Go={boardRadius:10.6,spawnRadius:9.5},mi=6,Xt={needle:{id:"needle",name:"Memory Needle",kind:"weapon",pattern:"projectile",interval:1.2,damage:9,range:11,projectileSpeed:18,projectileLife:2,summary:"Fast homing needle. Single target.",flavor:"It remembers where the crack began."},light:{id:"light",name:"Last Light",kind:"weapon",pattern:"lance",interval:3,damage:32,range:11,summary:"Heavy instant lance. Single target.",flavor:"The final sunrise, held in two lenses."},thread:{id:"thread",name:"Kindred Thread",kind:"weapon",pattern:"chain",interval:2.4,damage:12,range:11,chainDamage:[12,9,7],chainHopRange:3.2,summary:"Chains through up to 3 nearby foes.",flavor:"What was bound in life stays bound."},bell:{id:"bell",name:"Mercy Bell",kind:"weapon",pattern:"pulse",interval:3.2,damage:16,range:6.8,pulseRadius:6.8,summary:"Rings all foes near the Base.",flavor:"Rung once for every name forgotten."}},Cv={polish:{id:"polish",name:"Polished Memory",kind:"boon",summary:"+15% damage for all weapons (max 2).",flavor:"Rubbed bright by repetition."},mend:{id:"mend",name:"Mend the Vessel",kind:"boon",summary:"Restore 20 Integrity.",flavor:"Gold in the seams, stronger than before."}},gs={polishPerStack:.15,polishMaxStacks:2,mendAmount:20},Vs=["needle","light","thread","bell"],Rv=["polish","mend"];function Ms(i){return Xt[i]??Cv[i]}function gi(i){return i in Xt}const $h={echo:{kind:"echo",name:"Veiled Echo",hp:18,speed:.7,contactDamage:6,radius:.42},moth:{kind:"moth",name:"Folded Moth",hp:10,speed:1.15,contactDamage:4,radius:.36},urn:{kind:"urn",name:"Burden Urn",hp:65,speed:.4,contactDamage:14,radius:.55}},Vc=["echo","moth","urn"],Ml=[{durationSeconds:30,spawnRateStart:.28,spawnRateEnd:.42,weights:{echo:1},hpMultiplier:1,packSize:[1,1],forecast:"Veiled Echoes drift in slowly."},{durationSeconds:30,spawnRateStart:.42,spawnRateEnd:.6,weights:{echo:.7,moth:.3},hpMultiplier:1.1,packSize:[1,2],forecast:"Folded Moths join — fast and fragile."},{durationSeconds:30,spawnRateStart:.5,spawnRateEnd:.72,weights:{echo:.6,moth:.25,urn:.15},hpMultiplier:1.2,packSize:[1,2],forecast:"The first Burden Urns: slow, heavy, and hard to break."},{durationSeconds:30,spawnRateStart:.62,spawnRateEnd:.88,weights:{echo:.5,moth:.3,urn:.2},hpMultiplier:1.3,packSize:[1,3],forecast:"A mixed procession of all three."},{durationSeconds:30,spawnRateStart:.95,spawnRateEnd:1.25,weights:{echo:.78,moth:.14,urn:.08},hpMultiplier:1.4,packSize:[3,5],forecast:"Crowd: a dense tide of Veiled Echoes."},{durationSeconds:30,spawnRateStart:1,spawnRateEnd:1.35,weights:{moth:.68,echo:.24,urn:.08},hpMultiplier:1.5,packSize:[2,4],forecast:"Swarm: fast Folded Moths from every side."},{durationSeconds:30,spawnRateStart:.62,spawnRateEnd:.86,weights:{urn:.5,echo:.36,moth:.14},hpMultiplier:1.6,packSize:[1,2],forecast:"Burden: a procession of armored Urns."},{durationSeconds:30,spawnRateStart:1.1,spawnRateEnd:1.4,weights:{echo:.5,moth:.34,urn:.16},hpMultiplier:1.7,packSize:[2,3],forecast:"The final trial. Then the way home opens."}],Ws=Ml.length,Pv="Reclaim your memories. Endure eight trials. Return to life.";class Iv{accumulator=0;alpha=1;reset(){this.accumulator=0,this.alpha=1}advance(e,t,n){if(!t)return this.reset(),"continue";this.accumulator+=Math.min(Math.max(e,0),Av);let s=0;for(;this.accumulator>=Ai-1e-12&&s<Gc;){this.accumulator-=Ai,s++;const r=n();if(r!=="continue")return this.reset(),r}return s===Gc&&this.accumulator>Ai&&(this.accumulator=Ai),this.accumulator=Math.max(0,this.accumulator),this.alpha=Math.min(1,this.accumulator/Ai),"continue"}}function Lv(i){const e=[];return i.polishStacks<gs.polishMaxStacks&&e.push("polish"),i.baseHp<Mn.maxHealth&&e.push("mend"),e}function Dv(i,e){const t=[],n=Vs.filter(r=>!e.ownedWeapons.has(r));n.length>0&&t.push(i.pick(n));const s=e.draftIndex>=2?Lv(e):[];for(;t.length<3;){const r=t.filter(g=>Vs.includes(g)).length,a=3-t.length,o=r+a<=2,l=Vs.filter(g=>!t.includes(g)),c=o?[]:s.filter(g=>!t.includes(g)),h=[...l.map(g=>({id:g,w:1})),...c.map(g=>({id:g,w:.9}))],d=h.reduce((g,S)=>g+S.w,0);let u=i.next()*d,f=h[h.length-1].id;for(const g of h)if(u-=g.w,u<0){f=g.id;break}t.push(f)}for(let r=t.length-1;r>0;r--){const a=i.int(r+1);[t[r],t[a]]=[t[a],t[r]]}return t}class Kh{s;constructor(e){this.s=e>>>0}next(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e){return Math.floor(this.next()*e)}pick(e){return e[this.int(e.length)]}}function Uv(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Vo(i,e){return new Kh((i^Uv(e))>>>0)}function Wa(){return(Math.floor(Math.random()*4294967295)^Date.now())>>>0||1}const Kt=1e-9;function Sl(i,e,t=Mn.halfX,n=Mn.halfZ){const s=Math.max(Math.abs(i)-t,0),r=Math.max(Math.abs(e)-n,0);return Math.hypot(s,r)}function Nv(i){return Sl(i.x,i.z)<=i.radius}class Wc{seed;trials;spawningEnabled;tick=0;simTime=0;trialIndex=0;trialTime=0;clearing=!1;spawnProgress=0;baseHp=Mn.maxHealth;polishStacks=0;enemies=[];projectiles=[];slots=new Array(mi).fill(null);kills=0;arrivals=0;totalDamageDealt=0;nextEnemyId=1;nextWeaponId=1;nextProjectileId=1;spawnRng;events=[];constructor(e){this.seed=e.seed,this.trials=e.trials??Ml,this.spawningEnabled=e.spawning??!0,this.spawnRng=Vo(e.seed,"spawns")}get trial(){return this.trials[this.trialIndex]}get damageMultiplier(){return 1+gs.polishPerStack*this.polishStacks}weaponsInOrder(){const e=[];for(const t of this.slots)t&&e.push(t);return e.sort((t,n)=>t.id-n.id),e}installWeapon(e,t){if(e<0||e>=mi)throw new Error(`bad slot ${e}`);const n={id:this.nextWeaponId++,defId:t,slot:e,elapsed:0,shots:0};return this.slots[e]=n,n}permuteSlots(e){const t=this.slots.slice(),n=new Array(mi).fill(null);t.forEach((s,r)=>{const a=e[r];n[a]=s,s&&(s.slot=a)}),this.slots=n}spawnEnemy(e,t,n,s=this.trial.hpMultiplier){const r=$h[e],a=Math.round(r.hp*s),o={id:this.nextEnemyId++,kind:e,x:t,z:n,prevX:t,prevZ:n,hp:a,maxHp:a,radius:r.radius,speed:r.speed,contactDamage:r.contactDamage,alive:!0,spawnedAt:this.simTime};return this.enemies.push(o),this.events.push({type:"spawned",t:this.simTime,enemyId:o.id,kind:e,x:t,z:n}),o}spawnRate(){const e=this.trial,t=Math.min(1,Math.max(0,this.trialTime/e.durationSeconds));return e.spawnRateStart+(e.spawnRateEnd-e.spawnRateStart)*t}isSpawningWindow(){return this.spawningEnabled&&!this.clearing&&this.trialTime<this.trial.durationSeconds-Kt}drainEvents(){const e=this.events;return this.events=[],e}step(){const e=Ai;if(this.tick++,this.simTime=this.tick*e,this.isSpawningWindow())for(this.spawnProgress+=this.spawnRate()*e;this.spawnProgress>=1;)this.spawnProgress-=this.spawnScheduled();for(const n of this.enemies){if(n.prevX=n.x,n.prevZ=n.z,!n.alive)continue;const s=Math.hypot(n.x,n.z);if(s>Kt){const r=Math.min(n.speed*e,s);n.x-=n.x/s*r,n.z-=n.z/s*r}}for(const n of this.projectiles)n.prevX=n.x,n.prevZ=n.z;for(const n of this.weaponsInOrder())this.updateWeapon(n,e);this.updateProjectiles(e),this.enemies.some(n=>!n.alive)&&(this.enemies=this.enemies.filter(n=>n.alive));let t=!1;for(const n of this.enemies)n.alive&&Nv(n)&&(n.alive=!1,t=!0,this.arrivals++,this.baseHp=Math.max(0,this.baseHp-n.contactDamage),this.events.push({type:"arrived",t:this.simTime,enemyId:n.id,kind:n.kind,damage:n.contactDamage,x:n.x,z:n.z}),this.events.push({type:"baseDamaged",t:this.simTime,amount:n.contactDamage,hp:this.baseHp}));return t&&(this.enemies=this.enemies.filter(n=>n.alive)),this.baseHp<=0?"defeat":(this.trialTime+=e,this.clearing?this.enemies.length===0?"victory":"continue":this.trialTime>=this.trial.durationSeconds-Kt?(this.trialTime=this.trial.durationSeconds,this.trialIndex<this.trials.length-1?"boundary":(this.clearing=!0,this.enemies.length===0?"victory":"clearingStarted")):"continue")}beginNextTrial(){this.trialIndex<this.trials.length-1&&(this.trialIndex++,this.trialTime=0)}heal(e){const t=this.baseHp;this.baseHp=Math.min(Mn.maxHealth,this.baseHp+e);const n=this.baseHp-t;return this.events.push({type:"healed",t:this.simTime,amount:n,hp:this.baseHp}),n}spawnScheduled(){const e=this.trial,[t,n]=e.packSize??[1,1],s=t+this.spawnRng.int(n-t+1),r=this.spawnRng.next()*Math.PI*2;for(let a=0;a<s;a++){const o=Fv(this.spawnRng,e.weights),l=r+(a===0?0:this.spawnRng.range(-.16,.16)),c=Go.spawnRadius+(a===0?0:this.spawnRng.range(.1,.9));this.spawnEnemy(o,Math.cos(l)*c,Math.sin(l)*c)}return s}nearestThreat(e,t){let n=null,s=1/0;for(const r of this.enemies){if(!r.alive||t&&t.has(r.id)||Math.hypot(r.x,r.z)>e+Kt)continue;const a=Sl(r.x,r.z);(a<s-Kt||Math.abs(a-s)<=Kt&&n&&r.id<n.id)&&(n=r,s=a)}return n}nearestTo(e,t,n,s){let r=null,a=1/0;for(const o of this.enemies){if(!o.alive||s.has(o.id))continue;const l=Math.hypot(o.x-e,o.z-t);l>n+Kt||(l<a-Kt||Math.abs(l-a)<=Kt&&r&&o.id<r.id)&&(r=o,a=l)}return r}anyInPulse(e){return this.enemies.some(t=>t.alive&&Math.hypot(t.x,t.z)<=e+Kt)}hasTarget(e){return e.pattern==="pulse"?this.anyInPulse(e.pulseRadius??e.range):this.nearestThreat(e.range)!==null}updateWeapon(e,t){const n=Xt[e.defId],s=e.elapsed>=n.interval-Kt;if(e.elapsed+=t,!(e.elapsed<n.interval-Kt)){if(!this.hasTarget(n)){e.elapsed=n.interval;return}e.elapsed=s?0:Math.min(Math.max(0,e.elapsed-n.interval),t),e.shots++,this.fire(e,n)}}damage(e,t,n){e.alive&&(e.hp-=t,this.totalDamageDealt+=t,this.events.push({type:"damaged",t:this.simTime,enemyId:e.id,amount:t,hp:Math.max(0,e.hp),source:n,x:e.x,z:e.z}),e.hp<=1e-6&&(e.hp=0,e.alive=!1,this.kills++,this.events.push({type:"died",t:this.simTime,enemyId:e.id,kind:e.kind,x:e.x,z:e.z})))}fire(e,t){const n=this.damageMultiplier,s={type:"fired",t:this.simTime,weaponId:e.id,defId:t.id,slot:e.slot};switch(t.pattern){case"projectile":{const r=this.nearestThreat(t.range);this.projectiles.push({id:this.nextProjectileId++,weaponId:e.id,x:0,z:0,prevX:0,prevZ:0,targetId:r.id,damage:t.damage*n,speed:t.projectileSpeed??18,life:t.projectileLife??2,retargeted:!1,bornAt:this.simTime}),this.events.push({...s,targets:[r.id],points:[{x:r.x,z:r.z}]});break}case"lance":{const r=this.nearestThreat(t.range),a={x:r.x,z:r.z};this.events.push({...s,targets:[r.id],points:[a]}),this.damage(r,t.damage*n,t.id);break}case"chain":{const r=t.chainDamage??[t.damage],a=new Set,o=[],l=[];let c=this.nearestThreat(t.range);const h=[];for(let d=0;d<r.length&&c;d++)a.add(c.id),o.push(c.id),l.push({x:c.x,z:c.z}),h.push({e:c,dmg:r[d]*n}),c=this.nearestTo(c.x,c.z,t.chainHopRange??2.8,a);this.events.push({...s,targets:o,points:l});for(const d of h)this.damage(d.e,d.dmg,t.id);break}case"pulse":{const r=t.pulseRadius??t.range,a=this.enemies.filter(o=>o.alive&&Math.hypot(o.x,o.z)<=r+Kt).sort((o,l)=>o.id-l.id);this.events.push({...s,targets:a.map(o=>o.id),points:[]});for(const o of a)this.damage(o,t.damage*n,t.id);break}}}updateProjectiles(e){if(this.projectiles.length===0)return;const t=[];for(const n of this.projectiles){let s=this.enemies.find(c=>c.id===n.targetId&&c.alive);if(!s&&(n.retargeted||(n.retargeted=!0,s=this.nearestTo(n.x,n.z,1/0,new Set)??void 0,s&&Math.hypot(s.x,s.z)>Xt.needle.range+Kt&&(s=void 0),s&&(n.targetId=s.id)),!s)){this.events.push({type:"projectileExpired",t:this.simTime,projectileId:n.id,x:n.x,z:n.z});continue}const r=s.x-n.x,a=s.z-n.z,o=Math.hypot(r,a),l=n.speed*e;if(o<=l+s.radius*.5){n.x=s.x,n.z=s.z,this.damage(s,n.damage,"needle");continue}if(n.x+=r/o*l,n.z+=a/o*l,n.life-=e,n.life<=0){this.events.push({type:"projectileExpired",t:this.simTime,projectileId:n.id,x:n.x,z:n.z});continue}t.push(n)}this.projectiles=t}}function Fv(i,e){const t=Object.entries(e).filter(([,r])=>r>0),n=t.reduce((r,[,a])=>r+a,0);let s=i.next()*n;for(const[r,a]of t)if(s-=a,s<0)return r;return t[t.length-1][0]}function Wo(i){const e=Xt[i.defId];return Math.min(1,Math.max(0,i.elapsed/e.interval))}const Ov=.34;class Bv{phase="TITLE";sim;draft=null;suspended=!1;pausedFrom=null;pauseReason=null;seed;transitions=0;offerRng;listeners=new Set;trials;constructor(e,t={}){this.trials=t.trials??Ml,this.seed=e,this.sim=new Wc({seed:e,trials:this.trials}),this.offerRng=Vo(e,"offers")}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(e){for(const t of this.listeners)t(e)}setPhase(e){if(e===this.phase)return;const t=this.phase;this.phase=e,this.transitions++,this.emit({type:"phase",from:t,to:e})}isRunning(){return(this.phase==="COMBAT"||this.phase==="CLEARING")&&!this.suspended}startRun(e){this.seed=e,this.sim=new Wc({seed:e,trials:this.trials}),this.offerRng=Vo(e,"offers"),this.draft=null,this.suspended=!1,this.pausedFrom=null,this.pauseReason=null,this.sim.installWeapon(0,"needle"),this.emit({type:"runStarted",seed:e}),this.setPhase("COMBAT")}handleOutcome(e){switch(e){case"continue":return;case"defeat":this.draft=null,this.setPhase("DEFEAT");return;case"victory":this.setPhase("VICTORY");return;case"clearingStarted":this.setPhase("CLEARING");return;case"boundary":this.openDraft();return}}openDraft(){const e=new Set;for(const n of this.sim.slots)n&&e.add(n.defId);const t=Dv(this.offerRng,{draftIndex:this.sim.trialIndex,ownedWeapons:e,polishStacks:this.sim.polishStacks,baseHp:this.sim.baseHp});this.draft={draftIndex:this.sim.trialIndex,offer:t,selected:null,stage:"choosing",pendingSlot:null,settleRemaining:0,resolved:null},this.setPhase("DRAFT"),this.emit({type:"offer",draft:this.draft})}nextTrialForecast(){return this.trials[Math.min(this.sim.trialIndex+1,this.trials.length-1)].forecast}inputLocked(){return this.suspended||!this.draft}selectOffer(e){const t=this.draft;return this.inputLocked()||!t||t.stage!=="choosing"&&t.stage!=="boonSelected"&&t.stage!=="placing"||e<0||e>=t.offer.length?!1:(t.selected=e,t.pendingSlot=null,gi(t.offer[e])?(t.stage="placing",this.setPhase("PLACEMENT")):(t.stage="boonSelected",this.setPhase("DRAFT")),this.emit({type:"selection",index:e}),!0)}cancelSelection(){const e=this.draft;!e||e.stage!=="placing"&&e.stage!=="boonSelected"&&e.stage!=="confirmReplace"||(e.selected=null,e.pendingSlot=null,e.stage="choosing",this.setPhase("DRAFT"),this.emit({type:"replacePreview",slot:null}),this.emit({type:"selection",index:null}))}selectedCard(){const e=this.draft;return e&&e.selected!==null?e.offer[e.selected]:null}requestPlace(e){const t=this.draft;if(this.inputLocked()||!t||t.stage!=="placing"||t.selected===null||e<0||e>=mi)return"rejected";const n=t.offer[t.selected];return gi(n)?this.sim.slots[e]?(t.stage="confirmReplace",t.pendingSlot=e,this.emit({type:"replacePreview",slot:e}),"confirm"):(this.commit(e,n),"committed"):"rejected"}confirmReplace(){const e=this.draft;if(this.inputLocked()||!e||e.stage!=="confirmReplace"||e.pendingSlot===null||e.selected===null)return!1;const t=e.offer[e.selected];return gi(t)?(this.commit(e.pendingSlot,t),!0):!1}cancelReplace(){const e=this.draft;!e||e.stage!=="confirmReplace"||this.cancelSelection()}commit(e,t){const n=this.draft,s=this.sim.slots[e],r=this.sim.installWeapon(e,t),a=n.selected;n.stage="settling",n.pendingSlot=null,n.settleRemaining=Ov,n.resolved={card:t,slot:e},this.emit({type:"replacePreview",slot:null}),this.emit({type:"committed",slot:e,instance:r,replaced:s,offerIndex:a})}useBoon(){const e=this.draft;if(this.inputLocked()||!e||e.stage!=="boonSelected"||e.selected===null)return!1;const t=e.offer[e.selected];if(t==="polish")this.sim.polishStacks=Math.min(gs.polishMaxStacks,this.sim.polishStacks+1);else if(t==="mend")this.sim.heal(gs.mendAmount);else return!1;return e.stage="resolved",e.resolved={card:t,slot:null},this.emit({type:"boonUsed",id:t,offerIndex:e.selected}),this.setPhase("DRAFT"),!0}canContinue(){return!!this.draft&&this.draft.stage==="resolved"&&!this.suspended}continueRun(){return this.canContinue()?(this.draft=null,this.sim.beginNextTrial(),this.setPhase("COMBAT"),!0):!1}updatePresentation(e){const t=this.draft;!t||this.suspended||t.stage==="settling"&&(t.settleRemaining-=e,t.settleRemaining<=0&&(t.settleRemaining=0,t.stage="resolved",this.setPhase("DRAFT"),this.emit({type:"settled"})))}pause(){return this.phase!=="COMBAT"&&this.phase!=="CLEARING"?!1:(this.pausedFrom=this.phase,this.pauseReason="manual",this.setPhase("PAUSED"),!0)}resume(){if(this.suspended)return this.suspended=!1,this.emit({type:"suspended",value:!1}),!0;if(this.phase!=="PAUSED"||!this.pausedFrom)return!1;const e=this.pausedFrom;return this.pausedFrom=null,this.pauseReason=null,this.setPhase(e),!0}suspend(){this.phase==="COMBAT"||this.phase==="CLEARING"?(this.pausedFrom=this.phase,this.pauseReason="suspended",this.setPhase("PAUSED")):(this.phase==="DRAFT"||this.phase==="PLACEMENT")&&!this.suspended&&(this.suspended=!0,this.emit({type:"suspended",value:!0}))}cardName(e){return Ms(e).name}}const zv=14;class kv{ctx=null;master=null;combatBus=null;uiBus=null;noise=null;voices=new Set;lastPlayed=new Map;muted=!1;volume=.7;unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-16,t.ratio.value=4,this.master=this.ctx.createGain(),this.combatBus=this.ctx.createGain(),this.uiBus=this.ctx.createGain(),this.combatBus.connect(this.master),this.uiBus.connect(this.master),this.master.connect(t),t.connect(this.ctx.destination);const n=this.ctx.sampleRate*1;this.noise=this.ctx.createBuffer(1,n,this.ctx.sampleRate);const s=this.noise.getChannelData(0);let r=12345;for(let a=0;a<n;a++)r=r*1664525+1013904223>>>0,s[a]=r/4294967296*2-1;this.applyVolume()}this.ctx.state==="suspended"&&this.ctx.resume()}get ready(){return!!this.ctx}get activeVoices(){return this.voices.size}setMuted(e){this.muted=e,this.applyVolume()}setVolume(e){this.volume=e,this.applyVolume()}applyVolume(){!this.ctx||!this.master||this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.02)}setCombatActive(e){!this.ctx||!this.combatBus||this.combatBus.gain.setTargetAtTime(e?1:1e-4,this.ctx.currentTime,e?.05:.08)}stopAll(){for(const e of this.voices)try{e.stop()}catch{}this.voices.clear()}throttle(e,t){if(!this.ctx)return!1;const n=this.ctx.currentTime,s=this.lastPlayed.get(e)??-1;return n-s<t?!1:(this.lastPlayed.set(e,n),!0)}track(e){this.voices.add(e),e.onended=()=>this.voices.delete(e)}canPlay(){return!!this.ctx&&this.voices.size<zv&&this.ctx.state==="running"}tone(e,t,n={}){if(!this.canPlay())return;const s=this.ctx,r=s.currentTime+(n.delay??0),a=s.createOscillator();a.type=n.type??"sine",a.frequency.setValueAtTime(e,r),n.glide&&a.frequency.exponentialRampToValueAtTime(Math.max(20,e*n.glide),r+t),n.detune&&(a.detune.value=n.detune);const o=s.createGain(),l=n.gain??.2,c=n.attack??.004;o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(l,r+c),o.gain.exponentialRampToValueAtTime(1e-4,r+t);let h=a;if(n.lowpass){const d=s.createBiquadFilter();d.type="lowpass",d.frequency.value=n.lowpass,a.connect(d),h=d}h.connect(o),o.connect(n.bus==="ui"?this.uiBus:this.combatBus),a.start(r),a.stop(r+t+.05),this.track(a)}noiseHit(e,t,n,s,r="combat",a="bandpass",o=0){if(!this.canPlay()||!this.noise)return;const l=this.ctx,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this.noise;const d=l.createBiquadFilter();d.type=a,d.frequency.value=t,d.Q.value=n;const u=l.createGain();u.gain.setValueAtTime(s,c),u.gain.exponentialRampToValueAtTime(1e-4,c+e),h.connect(d),d.connect(u),u.connect(r==="ui"?this.uiBus:this.combatBus),h.start(c,Math.random()*.5),h.stop(c+e+.02),this.track(h)}weapon(e){if(this.throttle(`w-${e}`,.05))switch(e){case"needle":this.tone(2850,.07,{type:"triangle",gain:.09}),this.tone(4200,.04,{type:"sine",gain:.05}),this.noiseHit(.035,6e3,4,.06);break;case"light":this.tone(98,.9,{type:"sine",gain:.32,glide:.82,attack:.006}),this.tone(196,.55,{type:"triangle",gain:.1,glide:.9,lowpass:900}),this.tone(588,.25,{type:"sine",gain:.05}),this.noiseHit(.12,900,1.2,.12);break;case"thread":for(const[t,n]of[[330,-6],[415,4],[494,9]])this.tone(t,.32,{type:"sawtooth",gain:.035,detune:n,lowpass:2400,attack:.01});this.noiseHit(.18,3200,6,.04);break;case"bell":for(const[t,n,s]of[[1,.16,1.6],[2.41,.07,1],[2.98,.05,.8],[4.16,.03,.5]])this.tone(262*t,s,{type:"sine",gain:n,lowpass:2200,attack:.003});break}}enemyDeath(e){if(!this.throttle("death",.06))return;const t=e==="urn"?700:e==="moth"?2600:1500;this.noiseHit(.14,t,2.5,.13),this.tone(t*.7,.09,{type:"triangle",gain:.04,glide:.6})}baseHit(){this.throttle("base",.08)&&(this.tone(70,.4,{type:"sine",gain:.35,glide:.7}),this.tone(311,.3,{type:"triangle",gain:.06,detune:30}),this.tone(330,.3,{type:"triangle",gain:.06}),this.noiseHit(.2,400,1,.15,"combat","lowpass"))}cardHover(){this.throttle("hover",.06)&&this.tone(1800,.05,{type:"sine",gain:.025,bus:"ui"})}cardPick(){this.tone(660,.12,{type:"triangle",gain:.06,bus:"ui"}),this.noiseHit(.06,2500,2,.04,"ui")}cardPlace(){this.tone(180,.18,{type:"sine",gain:.25,bus:"ui",glide:.7}),this.noiseHit(.08,1400,1.5,.12,"ui"),this.tone(880,.4,{type:"sine",gain:.05,bus:"ui",delay:.04}),this.tone(1320,.5,{type:"sine",gain:.03,bus:"ui",delay:.07})}cardReturn(){this.tone(440,.1,{type:"triangle",gain:.04,bus:"ui",glide:.8})}boon(){for(const[e,t]of[[523,0],[659,.08],[784,.16]])this.tone(e,.6,{type:"sine",gain:.07,bus:"ui",delay:t})}phase(e){switch(e){case"draft":this.tone(392,.9,{type:"sine",gain:.08,bus:"ui"}),this.tone(587,.9,{type:"sine",gain:.05,bus:"ui",delay:.1});break;case"resume":case"start":this.tone(294,.5,{type:"triangle",gain:.07,bus:"ui"}),this.tone(440,.6,{type:"sine",gain:.06,bus:"ui",delay:.08});break;case"clearing":this.tone(220,1.2,{type:"sine",gain:.08,bus:"ui"}),this.tone(330,1.2,{type:"sine",gain:.05,bus:"ui",delay:.15});break;case"defeat":for(const[t,n]of[[196,0],[185,.25],[147,.5]])this.tone(t,1.6,{type:"triangle",gain:.08,bus:"ui",delay:n,lowpass:900});break;case"victory":for(const[t,n]of[[392,0],[494,.15],[587,.3],[784,.5],[988,.7]])this.tone(t,1.8,{type:"sine",gain:.07,bus:"ui",delay:n});break}}dispose(){this.stopAll(),this.ctx?.close(),this.ctx=null}}const Ci=2.04,Vn=2.72,os=.06,ci=Ci+.1,hi=Vn+.1,En=.22,li=.9,Wr=.98,Jh=.14,Qh=.035,Rt=Wr+Jh+Qh,jh=Rt-.15,Hv=jh+os/2+.002,Nr=Mn.halfX*2-.3,Xa=Mn.halfZ*2-.3,Gv=[-2.3400000000000003,0,ci+.2],Vv=[-1.6800000000000002,.27+hi/2];function Li(i){if(i<0||i>=mi)throw new Error("bad slot");return{x:Gv[i%3],z:Vv[Math.floor(i/3)]}}const At={x:0,y:Rt+.36,z:0},wt={y:1.55,z:8.3,spacing:3.2,scale:1.32,tilt:-.62},hn={x:-11.9,y:.1,z:3.4},Pt="#1b2234",Wv="rgba(27,34,52,0.55)",Qr="#e6dec7",Xv="#d3c8aa",fi="#a88a52",Kn="#d5bd84",sr="#3fb3aa",eu="#c8604f",Ss="#1b2a48",Xc='"Cormorant Garamond", "Iowan Old Style", Georgia, serif',qc='Inter, "Segoe UI", system-ui, sans-serif',qv=576,Yv=768;function _i(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function $t(i,e){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");return[t,n]}function Jn(i,e){const t=new Ld(i);return t.colorSpace=Qt,t.anisotropy=e?Math.min(8,e.capabilities.getMaxAnisotropy()):4,t.generateMipmaps=!0,t.minFilter=di,t.magFilter=Dt,t.needsUpdate=!0,t}function Xn(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.lineTo(e+n-r,t),i.quadraticCurveTo(e+n,t,e+n,t+r),i.lineTo(e+n,t+s-r),i.quadraticCurveTo(e+n,t+s,e+n-r,t+s),i.lineTo(e+r,t+s),i.quadraticCurveTo(e,t+s,e,t+s-r),i.lineTo(e,t+r),i.quadraticCurveTo(e,t,e+r,t),i.closePath()}function aa(i,e,t,n,s,r){const[a,o,l,c]=r,h=a+l/2,d=o+c/2,u=Math.hypot(l,c)/2+t;i.save(),i.clip(),i.translate(h,d),i.rotate(e),i.strokeStyle=s,i.lineWidth=n,i.beginPath();for(let f=-u;f<=u;f+=t)i.moveTo(-u,f),i.lineTo(u,f);i.stroke(),i.restore()}function vi(i,e,t,n,s,r=1.5){i.save(),i.translate(e,t),i.strokeStyle=s,i.fillStyle=s,i.lineWidth=r,i.beginPath(),i.arc(0,0,n*.42,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(0,0,n*.12,0,Math.PI*2),i.fill();for(let a=0;a<4;a++)i.rotate(Math.PI/2),i.beginPath(),i.moveTo(-n*.06,-n*.5),i.lineTo(0,-n),i.lineTo(n*.06,-n*.5),i.closePath(),i.fill();i.restore()}function Zn(i,e,t,n,s,r=1.2){i.save(),i.strokeStyle=s,i.fillStyle=s,i.lineWidth=r,i.beginPath(),i.moveTo(e,t-n),i.lineTo(e+n*.6,t),i.lineTo(e,t+n),i.lineTo(e-n*.6,t),i.closePath(),i.stroke(),i.beginPath(),i.arc(e,t,n*.18,0,Math.PI*2),i.fill(),i.restore()}function Zv(i,e,t,n,s,r){i.save(),i.translate(e,t),i.rotate(s),i.strokeStyle=r,i.lineWidth=1.6;for(let a=1;a<=3;a++)i.beginPath(),i.arc(0,0,n*a/3,0,Math.PI/2),i.stroke();for(let a=0;a<=4;a++){const o=a/4*(Math.PI/2);i.beginPath(),i.moveTo(Math.cos(o)*n*.33,Math.sin(o)*n*.33),i.lineTo(Math.cos(o)*n,Math.sin(o)*n),i.stroke()}i.restore()}function $v(i,e,t,n,s=Qr){i.fillStyle=s,i.fillRect(0,0,e,t);const r=_i(n);for(let o=0;o<2600;o++){const l=r()*e,c=r()*t,h=2+r()*7,d=r()*Math.PI;i.strokeStyle=r()<.5?"rgba(120,98,60,0.07)":"rgba(255,250,235,0.10)",i.lineWidth=.8,i.beginPath(),i.moveTo(l,c),i.lineTo(l+Math.cos(d)*h,c+Math.sin(d)*h),i.stroke()}for(let o=0;o<9;o++){const l=r()<.5,c=l?r()<.5?r()*60:e-r()*60:r()*e,h=l?r()*t:r()<.5?r()*60:t-r()*60,d=12+r()*34,u=i.createRadialGradient(c,h,0,c,h,d);u.addColorStop(0,"rgba(140,105,55,0.10)"),u.addColorStop(1,"rgba(140,105,55,0)"),i.fillStyle=u,i.fillRect(c-d,h-d,d*2,d*2)}const a=i.createRadialGradient(e/2,t/2,Math.min(e,t)*.3,e/2,t/2,Math.max(e,t)*.75);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,"rgba(70,52,28,0.28)"),i.fillStyle=a,i.fillRect(0,0,e,t)}function Kv(i){const e=[[-30,-175],[-8,-110],[-36,-60],[6,-10],[-14,40],[22,95],[4,175]],t=s=>{i.save(),i.translate(s*9,s*4),i.beginPath(),s<0?(i.moveTo(e[0][0],e[0][1]),i.arc(0,0,170,-Math.PI/2-.18,Math.PI/2+.02,!0)):(i.moveTo(e[0][0],e[0][1]),i.arc(0,0,170,-Math.PI/2-.18,Math.PI/2+.02,!1));for(let r=e.length-1;r>=0;r--)i.lineTo(e[r][0],e[r][1]);i.closePath(),i.fillStyle=Ss,i.fill(),i.save(),i.clip(),i.strokeStyle=Xv,i.lineWidth=10,i.beginPath(),i.arc(0,0,150,0,Math.PI*2),i.stroke(),i.lineWidth=1.4,i.strokeStyle="rgba(230,222,199,0.45)";for(let r=40;r<140;r+=14)i.beginPath(),i.arc(0,0,r,0,Math.PI*2),i.stroke();i.restore(),aa(i,s<0?.9:-.9,7,1.1,"rgba(0,0,0,0.25)",[-180,-180,360,360]),i.restore()};t(-1),t(1),i.strokeStyle=sr,i.lineWidth=5,i.lineCap="round";for(let s=0;s<6;s++){const r=-135+s*52;i.beginPath(),i.moveTo(-34,r-10),i.lineTo(32,r+12),i.stroke()}i.save(),i.rotate(-.78);const n=250;i.beginPath(),i.moveTo(-n,0),i.lineTo(n-70,-11),i.quadraticCurveTo(n-20,-11,n-18,0),i.quadraticCurveTo(n-20,11,n-70,11),i.closePath(),i.fillStyle=Kn,i.fill(),i.lineWidth=3,i.strokeStyle=Pt,i.stroke(),i.beginPath(),i.ellipse(n-52,0,16,4.5,0,0,Math.PI*2),i.fillStyle=Pt,i.fill(),i.beginPath(),i.moveTo(-n,0),i.lineTo(-n+60,-7),i.lineTo(-n+60,7),i.closePath(),i.fillStyle=Pt,i.fill(),i.strokeStyle="rgba(27,34,52,0.4)",i.lineWidth=1;for(let s=-n+70;s<n-80;s+=9)i.beginPath(),i.moveTo(s,4),i.lineTo(s+5,9),i.stroke();i.restore(),i.strokeStyle=sr,i.lineWidth=3,i.beginPath(),i.moveTo(140,-150),i.bezierCurveTo(200,-120,120,-40,175,10),i.stroke()}function Jv(i){i.beginPath(),i.arc(0,0,178,0,Math.PI*2),i.fillStyle=Ss,i.fill(),i.save();for(let t=0;t<24;t++){i.rotate(Math.PI*2/24);const n=t%2===0;i.beginPath(),i.moveTo(-9,-70),i.lineTo(0,n?-168:-128),i.lineTo(9,-70),i.closePath(),i.fillStyle=n?Kn:"rgba(213,189,132,0.7)",i.fill()}i.restore();const e=i.createRadialGradient(-15,-15,10,0,0,72);e.addColorStop(0,"#fbf3dc"),e.addColorStop(1,"#d9c088"),i.beginPath(),i.arc(0,0,70,0,Math.PI*2),i.fillStyle=e,i.fill(),i.lineWidth=3,i.strokeStyle=Pt,i.stroke(),i.beginPath(),i.moveTo(-82,-40),i.lineTo(-30,-18),i.lineTo(-12,8),i.lineTo(18,2),i.lineTo(40,30),i.lineTo(86,44),i.lineWidth=6,i.strokeStyle=Pt,i.stroke(),i.lineWidth=2,i.strokeStyle=eu,i.stroke();for(const[t,n]of[[182,14],[150,7]])i.beginPath(),i.arc(0,0,t,0,Math.PI*2),i.lineWidth=n+4,i.strokeStyle=Pt,i.stroke(),i.lineWidth=n,i.strokeStyle=fi,i.stroke();i.strokeStyle=Pt,i.lineWidth=2;for(let t=0;t<48;t++){const n=t/48*Math.PI*2,s=t%4===0?160:165;i.beginPath(),i.moveTo(Math.cos(n)*s,Math.sin(n)*s),i.lineTo(Math.cos(n)*172,Math.sin(n)*172),i.stroke()}i.beginPath(),i.arc(0,0,182,-2.5,-1.9),i.lineWidth=4,i.strokeStyle="#fff6df",i.stroke()}function Yc(i,e,t,n,s){i.save(),i.translate(e,t),i.rotate(n),i.scale(s,1),i.beginPath(),i.moveTo(0,-105),i.bezierCurveTo(70,-105,82,-20,66,30),i.bezierCurveTo(52,80,22,110,0,112),i.bezierCurveTo(-22,110,-52,80,-66,30),i.bezierCurveTo(-82,-20,-70,-105,0,-105),i.closePath(),i.fillStyle=Ss,i.fill(),i.lineWidth=4,i.strokeStyle=Pt,i.stroke(),i.save(),aa(i,.5,6,1.1,"rgba(230,222,199,0.18)",[-90,-110,180,230]),i.restore(),i.fillStyle=Qr;for(const r of[-1,1])i.beginPath(),i.ellipse(r*30,-18,20,10,r*-.25,0,Math.PI*2),i.fill();i.fillStyle=Pt;for(const r of[-1,1])i.beginPath(),i.ellipse(r*30,-16,7,7,0,0,Math.PI*2),i.fill();i.strokeStyle=Qr,i.lineWidth=4,i.beginPath(),i.moveTo(-22,58),i.quadraticCurveTo(0,66,22,58),i.stroke(),vi(i,0,-66,15,Kn,2),i.restore()}function Qv(i){i.lineCap="round";const e=[[-60,-40,60,-40,-80],[-60,20,60,20,30],[-60,70,60,70,120]];for(const[t,n,s,r,a]of e)i.strokeStyle=Pt,i.lineWidth=6,i.beginPath(),i.moveTo(t,n),i.quadraticCurveTo(0,a,s,r),i.stroke(),i.strokeStyle=sr,i.lineWidth=3,i.stroke();Yc(i,-88,0,-.22,1),Yc(i,88,0,.22,-1);for(const[t,n]of[[-50,-38],[50,-38],[-50,22],[50,22],[-48,70],[48,70]])i.beginPath(),i.arc(t,n,5,0,Math.PI*2),i.fillStyle=Kn,i.fill(),i.lineWidth=1.5,i.strokeStyle=Pt,i.stroke()}function jv(i){i.save(),i.translate(0,112);for(let t=0;t<5;t++)i.beginPath(),i.ellipse(0,0,40+t*34,9+t*8.5,0,0,Math.PI*2),i.lineWidth=t===0?4:3,i.strokeStyle=t%2===0?Pt:sr,i.stroke();i.restore(),i.beginPath(),i.moveTo(0,46),i.quadraticCurveTo(12,72,0,80),i.quadraticCurveTo(-12,72,0,46),i.fillStyle=sr,i.fill(),i.save(),i.translate(0,-40),i.beginPath(),i.moveTo(-125,-95),i.bezierCurveTo(-110,-70,-70,-40,-64,0),i.bezierCurveTo(-60,40,-38,62,0,64),i.bezierCurveTo(38,62,60,40,64,0),i.bezierCurveTo(70,-40,110,-70,125,-95),i.closePath(),i.fillStyle="#5a4524",i.fill(),i.save(),i.clip();const e=i.createLinearGradient(-125,0,125,0);e.addColorStop(0,"rgba(0,0,0,0.35)"),e.addColorStop(.35,"rgba(213,189,132,0.55)"),e.addColorStop(.55,"rgba(255,240,200,0.25)"),e.addColorStop(1,"rgba(0,0,0,0.45)"),i.fillStyle=e,i.fillRect(-130,-100,260,170),aa(i,0,7,1.2,"rgba(27,34,52,0.35)",[-130,-100,260,170]),i.strokeStyle=Kn,i.lineWidth=4;for(const t of[-58,-30,22])i.beginPath(),i.moveTo(-130,t),i.lineTo(130,t),i.stroke();for(let t=-3;t<=3;t++)Zn(i,t*22,-44,8,Kn,1.6);i.restore(),i.lineWidth=4,i.strokeStyle=Pt,i.stroke(),i.beginPath(),i.ellipse(0,-95,125,20,0,0,Math.PI*2),i.fillStyle="#2a2014",i.fill(),i.lineWidth=6,i.strokeStyle=Kn,i.stroke(),i.beginPath(),i.arc(0,78,14,0,Math.PI*2),i.lineWidth=6,i.strokeStyle=Pt,i.stroke(),i.restore()}function e_(i){i.save(),i.rotate(-.35),i.beginPath(),i.roundRect(-16,80,32,120,10),i.fillStyle=fi,i.fill(),i.lineWidth=3,i.strokeStyle=Pt,i.stroke(),i.beginPath(),i.ellipse(0,-30,105,125,0,0,Math.PI*2),i.fillStyle=fi,i.fill(),i.stroke(),i.beginPath(),i.ellipse(0,-30,88,108,0,0,Math.PI*2);const e=i.createLinearGradient(-80,-130,80,80);e.addColorStop(0,"#9fd9d3"),e.addColorStop(.5,Ss),e.addColorStop(1,"#0f1626"),i.fillStyle=e,i.fill(),i.stroke(),i.restore(),i.fillStyle="#fff7e2",i.save(),i.translate(-30,-70);for(let t=0;t<4;t++)i.rotate(Math.PI/4),i.beginPath(),i.moveTo(-5,0),i.lineTo(0,t%2?-40:-70),i.lineTo(5,0),i.lineTo(0,t%2?40:70),i.closePath(),i.fill();i.restore()}function t_(i){i.beginPath(),i.moveTo(-40,-150),i.lineTo(40,-150),i.bezierCurveTo(40,-110,30,-95,50,-70),i.bezierCurveTo(130,0,120,110,60,150),i.lineTo(-60,150),i.bezierCurveTo(-120,110,-130,0,-50,-70),i.bezierCurveTo(-30,-95,-40,-110,-40,-150),i.closePath(),i.fillStyle=Ss,i.fill(),i.lineWidth=4,i.strokeStyle=Pt,i.stroke(),i.save(),i.clip(),aa(i,.7,7,1.1,"rgba(230,222,199,0.16)",[-130,-150,260,300]),i.strokeStyle="#e6c46e",i.lineWidth=5,i.beginPath(),i.moveTo(-120,-10),i.lineTo(-40,10),i.lineTo(-10,-40),i.lineTo(40,20),i.lineTo(120,0),i.moveTo(-10,-40),i.lineTo(0,-150),i.moveTo(40,20),i.lineTo(20,150),i.stroke(),i.restore()}const n_={needle:Kv,light:Jv,thread:Qv,bell:jv,polish:e_,mend:t_};function i_(i){const e=Ms(i);if(e.kind==="boon")return i==="polish"?"+15% DAMAGE":"+20 INTEGRITY";const t=Xt[e.id],n={projectile:"SINGLE",lance:"HEAVY",chain:"CHAIN ×3",pulse:"RING"}[t.pattern];return`${Math.round(t.damage)} · ${t.interval.toFixed(1)}s · ${n}`}function s_(i){const e=qv,t=Yv,[n,s]=$t(e,t),r=Ms(i),a=r.kind==="boon";$v(s,e,t,i.charCodeAt(0)*31+i.length,a?"#e2dac8":Qr),s.lineWidth=9,s.strokeStyle=fi,Xn(s,14,14,e-28,t-28,26),s.stroke(),s.lineWidth=2,s.strokeStyle=Pt,Xn(s,30,30,e-60,t-60,16),s.stroke(),Xn(s,38,38,e-76,t-76,12),s.lineWidth=1,s.stroke();for(const[h,d,u]of[[38,38,0],[e-38,38,Math.PI/2],[e-38,t-38,Math.PI],[38,t-38,-Math.PI/2]])Zv(s,h,d,34,u,fi);const o=108;s.fillStyle=Pt,s.font=`700 60px ${Xc}`,s.textAlign="center",s.textBaseline="alphabetic";let l=60;for(;s.measureText(r.name).width>e-120&&l>40;)l-=2,s.font=`700 ${l}px ${Xc}`;s.fillText(r.name,e/2,o),s.strokeStyle=fi,s.lineWidth=2,s.beginPath(),s.moveTo(80,o+20),s.lineTo(e/2-28,o+20),s.moveTo(e/2+28,o+20),s.lineTo(e-80,o+20),s.stroke(),vi(s,e/2,o+20,14,a?eu:fi,1.6),s.save(),s.translate(e/2,382),s.scale(.98,.98),n_[i](s),s.restore();const c=t-150;return s.fillStyle="rgba(27,34,52,0.92)",Xn(s,54,c,e-108,84,12),s.fill(),s.strokeStyle=Kn,s.lineWidth=2,Xn(s,60,c+6,e-120,72,9),s.stroke(),s.fillStyle="#efe6cd",s.font=`600 31px ${qc}`,s.textAlign="center",s.textBaseline="middle",s.fillText(i_(i),e/2,c+43),s.fillStyle=Wv,s.font=`600 18px ${qc}`,s.fillText(a?"BOON · USED ONCE":"WEAPON · BASE EMITTER",e/2,t-46),n}function r_(){const[t,n]=$t(288,384);n.fillStyle=Ss,n.fillRect(0,0,288,384),n.strokeStyle=fi,n.lineWidth=6,Xn(n,10,10,268,364,14),n.stroke(),n.lineWidth=1.2;for(let s=20;s<130;s+=12)n.beginPath(),n.arc(288/2,384/2,s,0,Math.PI*2),n.strokeStyle=s%24===0?"rgba(213,189,132,0.5)":"rgba(105,218,208,0.2)",n.stroke();return vi(n,288/2,384/2,46,Kn,2.5),t}function a_(){const[i,e]=$t(64,64);return e.fillStyle="#c9b78a",e.fillRect(0,0,64,64),e.fillStyle="#efe6cf",e.fillRect(0,22,64,20),i}function o_(i=2048){const[e,t]=$t(i,i),n=i/2,s=_i(1234);t.fillStyle="#121a2a",t.fillRect(0,0,i,i);for(let o=0;o<14e3;o++){const l=s()*i,c=s()*i;t.fillStyle=s()<.5?"rgba(255,255,255,0.018)":"rgba(0,0,0,0.05)",t.fillRect(l,c,2+s()*3,1+s()*2)}const r=t.createRadialGradient(n,n,n*.1,n,n,n);r.addColorStop(0,"rgba(40,60,90,0.35)"),r.addColorStop(.7,"rgba(20,28,45,0)"),r.addColorStop(1,"rgba(0,0,0,0.35)"),t.fillStyle=r,t.fillRect(0,0,i,i),t.translate(n,n);const a=n/10.6;t.strokeStyle="rgba(181,154,99,0.10)",t.lineWidth=2;for(const o of[5.2,6.85,8.6])t.beginPath(),t.arc(0,0,o*a,0,Math.PI*2),t.stroke();t.fillStyle="rgba(105,218,208,0.12)";for(let o=0;o<180;o++){const l=o/180*Math.PI*2;t.beginPath(),t.arc(Math.cos(l)*9.5*a,Math.sin(l)*9.5*a,2.2,0,Math.PI*2),t.fill()}for(let o=0;o<48;o++){const l=o/48*Math.PI*2,c=Math.cos(l)*10.05*a,h=Math.sin(l)*10.05*a;t.save(),t.translate(c,h),t.rotate(l+Math.PI/2),o%4===0?vi(t,0,0,13,"rgba(181,154,99,0.32)",1.6):Zn(t,0,0,7,"rgba(181,154,99,0.22)",1.2),t.restore()}return t.beginPath(),t.arc(0,0,10.4*a,0,Math.PI*2),t.strokeStyle="rgba(181,154,99,0.25)",t.lineWidth=3,t.stroke(),e}function l_(){const[t,n]=$t(2048,128),s=n.createLinearGradient(0,0,0,128);s.addColorStop(0,"#d8c08a"),s.addColorStop(.5,"#b59a63"),s.addColorStop(1,"#7d6538"),n.fillStyle=s,n.fillRect(0,0,2048,128);const r=_i(77);for(let a=0;a<3e3;a++){n.strokeStyle=r()<.5?"rgba(255,240,200,0.10)":"rgba(60,40,10,0.10)",n.lineWidth=1;const o=r()*128,l=r()*2048;n.beginPath(),n.moveTo(l,o),n.lineTo(l+20+r()*50,o),n.stroke()}n.strokeStyle="rgba(40,28,10,0.7)",n.lineWidth=2;for(const a of[14,114])n.beginPath(),n.moveTo(0,a),n.lineTo(2048,a),n.stroke();for(let a=0;a<32;a++){const o=(a+.5)*64;a%2===0?vi(n,o,128/2,30,"rgba(40,28,10,0.75)",2.2):(Zn(n,o-20,128/2,14,"rgba(40,28,10,0.6)",2),Zn(n,o+20,128/2,14,"rgba(40,28,10,0.6)",2))}return t}function c_(i=1560,e=1400){const[t,n]=$t(i,e);n.fillStyle="#1a2846",n.fillRect(0,0,i,e);const s=_i(5);for(let r=0;r<9e3;r++)n.fillStyle=s()<.5?"rgba(120,160,220,0.035)":"rgba(0,0,0,0.05)",n.fillRect(s()*i,s()*e,2,2);n.strokeStyle="rgba(181,154,99,0.16)",n.lineWidth=1.2;for(let r=0;r<90;r++){n.beginPath();for(let a=0;a<=i;a+=8){const o=r/90*e+Math.sin(a*.012+r*.6)*9;a===0?n.moveTo(a,o):n.lineTo(a,o)}n.stroke()}n.strokeStyle="rgba(213,189,132,0.55)",n.lineWidth=3,Xn(n,26,26,i-52,e-52,30),n.stroke();for(let r=70;r<i-50;r+=46)Zn(n,r,46,9,"rgba(213,189,132,0.45)",1.4),Zn(n,r,e-46,9,"rgba(213,189,132,0.45)",1.4);for(let r=80;r<e-60;r+=46)Zn(n,46,r,9,"rgba(213,189,132,0.45)",1.4),Zn(n,i-46,r,9,"rgba(213,189,132,0.45)",1.4);return t}function h_(){const[i,e]=$t(768,216);e.clearRect(0,0,768,216);const t=e.createLinearGradient(0,0,0,216);t.addColorStop(0,"#dcc48f"),t.addColorStop(.5,"#b59a63"),t.addColorStop(1,"#7e6438"),e.fillStyle=t,Xn(e,8,8,752,200,100),e.fill(),e.strokeStyle="rgba(40,28,10,0.8)",e.lineWidth=4,Xn(e,22,22,724,172,86),e.stroke(),vi(e,110,108,52,"rgba(40,28,10,0.85)",3),vi(e,658,108,52,"rgba(40,28,10,0.85)",3);for(let n=0;n<7;n++)Zn(e,234+n*50,108,22,"rgba(40,28,10,0.75)",3);return e.beginPath(),e.ellipse(384,108,30,30,0,0,Math.PI*2),e.fillStyle="#1b2a48",e.fill(),e.strokeStyle="rgba(40,28,10,0.9)",e.stroke(),i}function u_(){const[i,e]=$t(256,340),t=e.createRadialGradient(128,170,20,128,170,200);t.addColorStop(0,"#16203a"),t.addColorStop(1,"#070a14"),e.fillStyle=t,e.fillRect(0,0,256,340),e.strokeStyle="rgba(105,218,208,0.18)",e.lineWidth=2;for(let r=30;r<110;r+=18)e.beginPath(),e.arc(128,170,r,0,Math.PI*2),e.stroke();vi(e,128,170,34,"rgba(105,218,208,0.35)",2);const n=e.createLinearGradient(0,0,256,0);n.addColorStop(0,"rgba(0,0,0,0.6)"),n.addColorStop(.15,"rgba(0,0,0,0)"),n.addColorStop(.85,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,0.6)"),e.fillStyle=n,e.fillRect(0,0,256,340);const s=e.createLinearGradient(0,0,0,340);return s.addColorStop(0,"rgba(0,0,0,0.6)"),s.addColorStop(.12,"rgba(0,0,0,0)"),s.addColorStop(.88,"rgba(0,0,0,0)"),s.addColorStop(1,"rgba(0,0,0,0.6)"),e.fillStyle=s,e.fillRect(0,0,256,340),i}function d_(){const[i,e]=$t(512,512);e.fillStyle="#d8d0b7",e.fillRect(0,0,512,512);const t=_i(9);for(let n=0;n<4e3;n++)e.fillStyle=t()<.5?"rgba(255,255,245,0.05)":"rgba(110,90,60,0.05)",e.fillRect(t()*512,t()*512,3,3);e.strokeStyle="rgba(90,70,40,0.12)",e.lineWidth=1;for(let n=0;n<70;n++){let s=t()*512,r=t()*512;e.beginPath(),e.moveTo(s,r);for(let a=0;a<5;a++)s+=(t()-.5)*60,r+=(t()-.5)*60,e.lineTo(s,r);e.stroke()}return i}function f_(){const[i,e]=$t(512,512);e.fillStyle="#b59a63",e.fillRect(0,0,512,512);const t=_i(19);for(let n=0;n<2500;n++){e.strokeStyle=t()<.5?"rgba(255,240,200,0.12)":"rgba(60,40,10,0.12)";const s=t()*512,r=t()*512;e.beginPath(),e.moveTo(r,s),e.lineTo(r+30+t()*80,s),e.stroke()}for(let n=0;n<12;n++){const s=t()*512,r=t()*512,a=30+t()*70,o=e.createRadialGradient(s,r,0,s,r,a);o.addColorStop(0,"rgba(70,50,20,0.18)"),o.addColorStop(1,"rgba(70,50,20,0)"),e.fillStyle=o,e.fillRect(s-a,r-a,a*2,a*2)}return i}function p_(){const[i,e]=$t(256,256);e.clearRect(0,0,256,256);const t=e.createLinearGradient(0,256,256,0);t.addColorStop(0,"#cfc4a6"),t.addColorStop(1,"#efe7d2"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(27,34,52,0.55)",e.lineWidth=2;for(let n=0;n<7;n++){const s=.15+n*.2;e.beginPath(),e.moveTo(0,256),e.quadraticCurveTo(Math.cos(s)*140,256-Math.sin(s)*90,Math.cos(s)*260,256-Math.sin(s)*260),e.stroke()}return e.beginPath(),e.arc(150,110,30,0,Math.PI*2),e.fillStyle="#1b2234",e.fill(),e.beginPath(),e.arc(150,110,18,0,Math.PI*2),e.fillStyle="#69dad0",e.fill(),e.beginPath(),e.arc(150,110,7,0,Math.PI*2),e.fillStyle="#1b2234",e.fill(),e.strokeStyle="rgba(27,34,52,0.8)",e.lineWidth=8,e.beginPath(),e.arc(0,256,245,-Math.PI/2,0),e.stroke(),i}function m_(){const[i,e]=$t(256,256);e.fillStyle="#e4dcc4",e.fillRect(0,0,256,256);const t=_i(31);e.strokeStyle="rgba(90,70,40,0.25)",e.lineWidth=1.2;for(let n=0;n<12;n++){let s=t()*256,r=t()*256;e.beginPath(),e.moveTo(s,r);for(let a=0;a<4;a++)s+=(t()-.5)*50,r+=(t()-.5)*50,e.lineTo(s,r);e.stroke()}return i}function oa(i,e,t=128){const[n,s]=$t(t,t),r=s.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);return r.addColorStop(0,i),r.addColorStop(1,e),s.fillStyle=r,s.fillRect(0,0,t,t),n}function g_(){const[i,e]=$t(1024,1024),t=e.createRadialGradient(512,512,40,512,512,512);t.addColorStop(0,"#16233a"),t.addColorStop(.45,"#0b1322"),t.addColorStop(1,"#05080f"),e.fillStyle=t,e.fillRect(0,0,1024,1024);const n=_i(3);e.strokeStyle="rgba(105,218,208,0.035)",e.lineWidth=2;for(let s=120;s<512;s+=46+n()*30)e.beginPath(),e.arc(512,512,s,0,Math.PI*2),e.stroke();return i}const nn=(i,e)=>new we(i).multiplyScalar(e),Gt={needle:nn(6937296,3),light:nn(15982510,3),thread:nn(8366335,3.2),bell:nn(15245434,2.6)},v_=`
attribute float aAlong;
attribute float aSide;
varying float vAlong;
varying float vSide;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,__=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uHead; // 0..1 portion of the ribbon revealed
varying float vAlong;
varying float vSide;
void main() {
  float edge = 1.0 - pow(abs(vSide), 1.6);
  float reveal = 1.0 - smoothstep(uHead - 0.02, uHead, vAlong);
  float a = edge * uAlpha * reveal;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(uColor * a, a);
}`,Ei=32;class x_{mesh;mat;geo;pos;active=!1;born=0;life=.3;width=.1;points=[];color=new we;revealTime=.04;flicker=0;presentation=!1;constructor(e){this.geo=new vt,this.pos=new Float32Array(Ei*2*3);const t=new Float32Array(Ei*2),n=new Float32Array(Ei*2),s=[];for(let r=0;r<Ei;r++)if(n[r*2]=-1,n[r*2+1]=1,r<Ei-1){const a=r*2;s.push(a,a+1,a+2,a+1,a+3,a+2)}this.geo.setAttribute("position",new Ut(this.pos,3).setUsage(pi)),this.geo.setAttribute("aAlong",new Ut(t,1).setUsage(pi)),this.geo.setAttribute("aSide",new Ut(n,1)),this.geo.setIndex(s),this.geo.boundingSphere=new jn(new C,30),this.mat=new St({vertexShader:v_,fragmentShader:__,uniforms:{uColor:{value:new we},uAlpha:{value:0},uHead:{value:1}},transparent:!0,depthWrite:!1,blending:Rn,premultipliedAlpha:!0}),this.mesh=new Ne(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=6,e.add(this.mesh)}build(e){const t=Math.min(this.points.length,Ei),n=this.geo.attributes.aAlong;let s=0;const r=[0];for(let l=1;l<t;l++)s+=this.points[l].distanceTo(this.points[l-1]),r.push(s);const a=new C,o=new C;for(let l=0;l<Ei;l++){const c=Math.min(l,t-1),h=this.points[c],d=this.points[Math.max(0,c-1)],u=this.points[Math.min(t-1,c+1)];a.subVectors(u,d).normalize(),o.crossVectors(a,e).normalize();const f=.55+.45*Math.sin(r[c]/Math.max(s,1e-4)*Math.PI),g=this.width*f;this.pos.set([h.x-o.x*g,h.y-o.y*g,h.z-o.z*g],l*6),this.pos.set([h.x+o.x*g,h.y+o.y*g,h.z+o.z*g],l*6+3);const S=s>0?r[c]/s:0;n.setX(l*2,S),n.setX(l*2+1,S)}this.geo.attributes.position.needsUpdate=!0,n.needsUpdate=!0,this.geo.setDrawRange(0,Math.max(0,(t-1)*6))}}const M_=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uWidth;
varying vec2 vUv;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float ring = exp(-pow((r - (1.0 - uWidth)) / uWidth, 2.0));
  // soft trailing ripple just inside the crest (no filled disc)
  float trail = exp(-pow((r - (1.0 - uWidth * 2.5)) / (uWidth * 1.5), 2.0)) * 0.22;
  float a = (ring + trail) * uAlpha;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(uColor * a, a);
}`,S_=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,y_=`
attribute float aSize;
attribute vec4 aColor;
varying vec4 vColor;
uniform float uScale;
void main() {
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale;
}`,b_=`
varying vec4 vColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  float a = (1.0 - d) * vColor.a;
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vColor.rgb * a, a);
}`;class Zc{points;mat;geo;pos;col;size;vel;born;life;baseSize;gravity;rgb;alive;cursor=0;budget;capacity;liveCount=0;constructor(e,t,n){this.capacity=t,this.budget=t,this.geo=new vt,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.size=new Float32Array(t),this.vel=new Float32Array(t*3),this.born=new Float32Array(t),this.life=new Float32Array(t),this.baseSize=new Float32Array(t),this.gravity=new Float32Array(t),this.rgb=new Float32Array(t*3),this.alive=new Uint8Array(t),this.geo.setAttribute("position",new Ut(this.pos,3).setUsage(pi)),this.geo.setAttribute("aColor",new Ut(this.col,4).setUsage(pi)),this.geo.setAttribute("aSize",new Ut(this.size,1).setUsage(pi)),this.geo.boundingSphere=new jn(new C,40),this.mat=new St({vertexShader:y_,fragmentShader:b_,uniforms:{uScale:{value:30}},transparent:!0,depthWrite:!1,blending:Rn,premultipliedAlpha:!0}),this.points=new Id(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=7,e.add(this.points)}setScale(e){this.mat.uniforms.uScale.value=e}emit(e,t,n,s,r,a,o=0){if(!(this.liveCount>=this.budget))for(let l=0;l<this.capacity;l++){const c=(this.cursor+l)%this.capacity;if(!this.alive[c]){this.cursor=(c+1)%this.capacity,this.alive[c]=1,this.liveCount++,this.pos.set([e.x,e.y,e.z],c*3),this.vel.set([t.x,t.y,t.z],c*3),this.rgb.set([n.r,n.g,n.b],c*3),this.born[c]=a,this.life[c]=r,this.baseSize[c]=s,this.gravity[c]=o;return}}}update(e,t){for(let n=0;n<this.capacity;n++){if(!this.alive[n]){this.size[n]=0,this.col[n*4+3]=0;continue}const s=e-this.born[n];if(s>=this.life[n]||s<-.001){this.alive[n]=0,this.liveCount--,this.size[n]=0,this.col[n*4+3]=0;continue}if(t>0){const o=Math.exp(-t*2.2);this.vel[n*3]*=o,this.vel[n*3+2]*=o,this.vel[n*3+1]=this.vel[n*3+1]*o-this.gravity[n]*t,this.pos[n*3]+=this.vel[n*3]*t,this.pos[n*3+1]+=this.vel[n*3+1]*t,this.pos[n*3+2]+=this.vel[n*3+2]*t}const r=s/this.life[n],a=(1-r)*(1-r);this.size[n]=this.baseSize[n]*(1-.5*r),this.col[n*4]=this.rgb[n*3],this.col[n*4+1]=this.rgb[n*3+1],this.col[n*4+2]=this.rgb[n*3+2],this.col[n*4+3]=a}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aColor.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0}reset(){this.alive.fill(0),this.size.fill(0),this.liveCount=0,this.cursor=0,this.geo.attributes.aSize.needsUpdate=!0}dispose(){this.geo.dispose(),this.mat.dispose()}}const $c=220;class T_{root=new un;ribbons=[];rings=[];particles;dust;shards=[];shardMesh;needleHeads;needleTrails;flashes;flashData=[];lensRing;lensMat;lensBorn=-100;rng;viewDir=new C(0,1,0);disposables=[];lastSimTime=0;presentTime=0;particleScale=1;ambientDust=260;stats={ribbons:0,rings:0,particles:0,shards:0,dropped:0};constructor(e,t){this.rng=new Kh(t);for(let g=0;g<28;g++)this.ribbons.push(new x_(this.root));const n=new Bt(2,2);n.rotateX(-Math.PI/2),this.disposables.push(n);for(let g=0;g<16;g++){const S=new St({vertexShader:S_,fragmentShader:M_,uniforms:{uColor:{value:new we},uAlpha:{value:0},uWidth:{value:.06}},transparent:!0,depthWrite:!1,blending:Rn,premultipliedAlpha:!0}),p=new Ne(n,S);p.visible=!1,p.renderOrder=4,this.root.add(p),this.rings.push({mesh:p,mat:S,active:!1,born:0,life:.4,r0:.5,r1:6,presentation:!1,alpha:1})}this.particles=new Zc(this.root,1200,!1),this.dust=new Zc(this.root,420,!0);const s=new _l(.09,0);s.scale(1,.35,1.4);const r=new ct({color:16777215,roughness:.45,metalness:.1});this.disposables.push(s,r),this.shardMesh=new In(s,r,$c),this.shardMesh.count=0,this.shardMesh.frustumCulled=!1,this.shardMesh.instanceMatrix.setUsage(pi),this.shardMesh.setColorAt(0,new we(1,1,1)),this.root.add(this.shardMesh);for(let g=0;g<$c;g++)this.shards.push({active:!1,born:0,life:1,p:new C,v:new C,rot:new It,spin:new C,size:1,bounced:!1,color:new we});const a=new vl(.11,0);a.scale(.7,.7,4.2);const o=new Ct({color:Gt.needle.clone().multiplyScalar(1.3)});this.needleHeads=new In(a,o,96),this.needleHeads.count=0,this.needleHeads.frustumCulled=!1,this.root.add(this.needleHeads);const l=new Bt(1,1,1,1);l.translate(0,-.5,0),l.rotateX(-Math.PI/2);const c=Jn(E_(),e),h=new Ct({map:c,color:Gt.needle,transparent:!0,depthWrite:!1,blending:Rn,side:jt});this.needleTrails=new In(l,h,96),this.needleTrails.count=0,this.needleTrails.frustumCulled=!1,this.root.add(this.needleTrails),this.disposables.push(a,o,l,h,c);const d=new Bt(1,1),u=Jn(oa("rgba(255,255,255,1)","rgba(255,255,255,0)",64),e),f=new Ct({map:u,transparent:!0,depthWrite:!1,blending:Rn});this.flashes=new In(d,f,48),this.flashes.count=0,this.flashes.frustumCulled=!1,this.flashes.renderOrder=8,this.flashes.setColorAt(0,new we),this.root.add(this.flashes);for(let g=0;g<48;g++)this.flashData.push({active:!1,born:0,life:.1,p:new C,size:1,color:new we});this.disposables.push(d,u,f),this.lensMat=new Ct({color:Gt.light,transparent:!0,opacity:0,depthWrite:!1,blending:Rn}),this.lensRing=new Ne(new sn(.5,.03,8,48),this.lensMat),this.lensRing.position.set(At.x,At.y,At.z),this.root.add(this.lensRing),this.disposables.push(this.lensRing.geometry,this.lensMat),this.seedDust()}setQuality(e,t){this.particles.budget=e,this.ambientDust=t}setView(e,t){e.getWorldDirection(this.viewDir).negate(),this.particleScale=t/Math.max(.001,e.top-e.bottom),this.particles.setScale(this.particleScale),this.dust.setScale(this.particleScale),this.lensRing.quaternion.copy(e.quaternion)}seedDust(){for(let e=0;e<this.ambientDust;e++)this.spawnDust(this.rng.range(0,14))}spawnDust(e=0){const t=this.rng.next()*Math.PI*2,n=this.rng.range(6,18),s=new C(Math.cos(t)*n,this.rng.range(-8,-.5),Math.sin(t)*n),r=new C(this.rng.range(-.05,.05),this.rng.range(.08,.25),this.rng.range(-.05,.05)),a=new we(6937296).multiplyScalar(this.rng.range(.25,.8));this.dust.emit(s,r,a,this.rng.range(.05,.12),14,this.presentTime-e,0)}ribbon(){const e=this.ribbons.find(t=>!t.active);return e||this.stats.dropped++,e??null}ring(){const e=this.rings.find(t=>!t.active);return e||this.stats.dropped++,e??null}flash(e,t,n,s,r){const a=this.flashData.find(o=>!o.active);a&&(a.active=!0,a.born=r,a.life=s,a.p.copy(e),a.size=n,a.color.copy(t))}burst(e,t,n,s,r,a=.1,o=.45,l=2){for(let c=0;c<n;c++){const h=this.rng.next()*Math.PI*2,d=this.rng.range(.2,1),u=s*this.rng.range(.4,1),f=new C(Math.cos(h)*u,d*u*.9,Math.sin(h)*u);this.particles.emit(e,f,t,a*this.rng.range(.6,1.2),o*this.rng.range(.6,1.1),r,l)}}shardBurst(e,t,n,s,r=2.2){let a=0;for(const o of this.shards){if(a>=n)break;if(o.active)continue;a++,o.active=!0,o.born=s,o.life=this.rng.range(.55,.85),o.p.copy(e);const l=this.rng.next()*Math.PI*2,c=this.rng.range(.6,1)*r;o.v.set(Math.cos(l)*c,this.rng.range(1.5,3.2),Math.sin(l)*c),o.rot.set(this.rng.next()*6,this.rng.next()*6,this.rng.next()*6),o.spin.set(this.rng.range(-12,12),this.rng.range(-12,12),this.rng.range(-12,12)),o.size=this.rng.range(.7,1.4),o.bounced=!1,o.color.setHex(t[this.rng.int(t.length)])}a<n&&(this.stats.dropped+=n-a)}emitterVec(){return new C(At.x,At.y,At.z)}conduit(e,t,n){const s=this.ribbon();if(!s)return;const r=this.emitterVec(),a=e.clone().lerp(r,.5);a.y+=.35,s.points=[];for(let o=0;o<=10;o++){const l=o/10,c=e.clone().lerp(a,l),h=a.clone().lerp(r,l);s.points.push(c.lerp(h,l))}s.active=!0,s.born=n,s.life=.22,s.width=.045,s.color.copy(Gt[t]).multiplyScalar(.7),s.revealTime=.05,s.flicker=0,s.presentation=!1,s.build(this.viewDir)}onSimEvent(e,t){const n=e.t;switch(e.type){case"fired":{const s=t(e.weaponId);s&&this.conduit(s,e.defId,n),e.defId==="light"?this.lance(e.points[0],n):e.defId==="thread"?this.thread(e.points,n):e.defId==="bell"?this.bell(n):e.defId==="needle"&&this.burst(this.emitterVec(),Gt.needle,4,1.2,n,.07,.2,0);break}case"damaged":{const s=new C(e.x,.9,e.z),r=Gt[e.source];this.flash(s,r,e.source==="light"?1.3:.7,e.source==="light"?.12:.08,n),this.burst(s,r,e.source==="needle"?5:7,2.2,n,.08,.35,3);break}case"died":{const s=new C(e.x,.7,e.z);e.kind==="moth"?this.shardBurst(s,[15196104,13616294,2303544],7,n,1.6):e.kind==="urn"?this.shardBurst(s,[14274483,14274483,12756074,2240854],14,n,2.6):this.shardBurst(s,[15327689,15327689,5925522],9,n,2),this.burst(s,nn(15260856,1.6),10,1.5,n,.1,.5,-.6);break}case"arrived":{const s=new C(e.x,.6,e.z);this.burst(s,nn(14844276,2.4),16,2.6,n,.12,.5,1),this.flash(s,nn(14844276,2),1.6,.14,n);break}case"projectileExpired":{this.burst(new C(e.x,.9,e.z),Gt.needle,5,.8,n,.06,.3,0);break}}}lance(e,t){this.lensBorn=t;const n=this.ribbon(),s=new C(e.x,.9,e.z),r=this.emitterVec();if(n){n.points=[];for(let o=0;o<=12;o++)n.points.push(r.clone().lerp(s,o/12));n.active=!0,n.born=t,n.life=.34,n.width=.16,n.color.copy(Gt.light),n.revealTime=.05,n.flicker=0,n.presentation=!1,n.build(this.viewDir)}const a=this.ribbon();a&&(a.points=n?n.points.map(o=>o.clone()):[r,s],a.active=!0,a.born=t,a.life=.26,a.width=.06,a.color.setRGB(4,3.7,3.1),a.revealTime=.05,a.flicker=0,a.presentation=!1,a.build(this.viewDir)),this.flash(s,Gt.light,1.8,.12,t),this.burst(s,Gt.light,12,3.2,t,.1,.4,2)}thread(e,t){let n=this.emitterVec();e.forEach((s,r)=>{const a=new C(s.x,.9,s.z);for(const o of[0,1]){const l=this.ribbon();if(!l)return;l.points=[];const c=10,h=n.distanceTo(a),d=new C().subVectors(a,n).cross(new C(0,1,0)).normalize();for(let u=0;u<=c;u++){const f=u/c,g=n.clone().lerp(a,f);if(u>0&&u<c){const S=Math.sin(f*Math.PI)*Math.min(.45,h*.08);g.addScaledVector(d,this.rng.range(-1,1)*S),g.y+=this.rng.range(-.5,.8)*S}l.points.push(g)}l.active=!0,l.born=t+r*.035,l.life=.36,l.width=o===0?.13:.035,l.color.copy(o===0?Gt.thread:nn(14674431,4.5)),l.revealTime=.035,l.flicker=1,l.presentation=!1,l.build(this.viewDir)}this.flash(a,Gt.thread,.8,.09,t),n=a})}bell(e){const t=this.ring();t&&(t.active=!0,t.born=e,t.life=.22,t.r0=.25,t.r1=1.3,t.presentation=!1,t.alpha=1,t.mat.uniforms.uColor.value.copy(Gt.bell),t.mat.uniforms.uWidth.value=.08,t.mesh.position.set(At.x,Rt+.08,At.z));const n=this.ring();n&&(n.active=!0,n.born=e,n.life=.42,n.r0=3.6,n.r1=6.8,n.presentation=!1,n.alpha=1,n.mat.uniforms.uColor.value.copy(Gt.bell),n.mat.uniforms.uWidth.value=.03,n.mesh.position.set(0,.07,0));const s=this.ring();s&&(s.active=!0,s.born=e+.06,s.life=.65,s.r0=3.4,s.r1=5.6,s.presentation=!1,s.alpha=.5,s.mat.uniforms.uColor.value.copy(nn(15914906,1.6)),s.mat.uniforms.uWidth.value=.05,s.mesh.position.set(0,.05,0)),this.burst(this.emitterVec(),Gt.bell,14,1.8,e,.09,.6,-1)}landing(e){const t=this.ring();if(t){t.active=!0,t.born=this.presentTime,t.life=.42,t.r0=.8,t.r1=2.2,t.presentation=!0,t.alpha=.9,t.mat.uniforms.uColor.value.copy(nn(6937296,2.2)),t.mat.uniforms.uWidth.value=.08,t.mesh.position.set(e.x,e.y+.05,e.z);for(let n=0;n<14;n++){const s=n/14*Math.PI*2;this.dust.emit(new C(e.x+Math.cos(s)*1,e.y+.1,e.z+Math.sin(s)*1.2),new C(Math.cos(s)*.6,1.2,Math.sin(s)*.6),nn(6937296,2),.09,.5,this.presentTime,0)}}}ceremony(e){const t=this.emitterVec();for(let n=0;n<60;n++){const s=this.rng.next()*Math.PI*2,r=e==="victory"?nn(6937296,2.4):nn(14844276,1.4);this.dust.emit(t.clone(),new C(Math.cos(s)*.6,e==="victory"?this.rng.range(1,3):this.rng.range(-.2,.4),Math.sin(s)*.6),r,.12,2.5,this.presentTime,0)}}update(e,t,n,s){const r=Math.max(0,e-this.lastSimTime);this.lastSimTime=e,this.presentTime+=t;let a=0;for(const p of this.ribbons){if(!p.active){p.mesh.visible=!1;continue}const M=(p.presentation?this.presentTime:e)-p.born;if(M>p.life||M<-.5){p.active=!1,p.mesh.visible=!1;continue}a++,p.mesh.visible=M>=0;const w=Math.max(0,M)/p.life,x=p.flicker?.75+.25*Math.sin(e*90+p.born*13):1;p.mat.uniforms.uAlpha.value=(1-w)*(1-w*.5)*x,p.mat.uniforms.uHead.value=Math.min(1,Math.max(0,M)/p.revealTime)*1.02,p.mat.uniforms.uColor.value.copy(p.color)}let o=0;for(const p of this.rings){if(!p.active){p.mesh.visible=!1;continue}const M=(p.presentation?this.presentTime:e)-p.born;if(M>p.life||M<-.5){p.active=!1,p.mesh.visible=!1;continue}o++,p.mesh.visible=M>=0;const w=Math.max(0,M)/p.life,x=1-Math.pow(1-w,2.4),T=p.r0+(p.r1-p.r0)*x;p.mesh.scale.set(T,1,T),p.mat.uniforms.uAlpha.value=p.alpha*(1-w)*Math.min(1,w*8+.2)}const l=e-this.lensBorn;if(l>=0&&l<.18){const p=l/.18;this.lensRing.visible=!0,this.lensRing.scale.setScalar(1.6-1.3*p),this.lensMat.opacity=(1-p)*.9}else this.lensRing.visible=!1;let c=0;const h=new tt,d=new Zt().setFromUnitVectors(new C(0,0,1),this.viewDir);for(const p of this.flashData){if(!p.active)continue;const m=e-p.born;if(m>p.life||m<-.5){p.active=!1;continue}if(m<0)continue;const M=m/p.life,w=p.size*(.6+.6*M);h.compose(p.p,d,new C(w,w,w)),this.flashes.setMatrixAt(c,h),this.flashes.setColorAt(c,p.color.clone().multiplyScalar(1-M)),c++}this.flashes.count=c,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0);let u=0;const f=new tt,g=new Zt;for(const p of this.shards){if(!p.active)continue;const m=e-p.born;if(m>p.life){p.active=!1;continue}r>0&&(p.v.y-=9.5*r,p.p.addScaledVector(p.v,r),p.p.y<.03&&!p.bounced?(p.p.y=.03,p.v.y=Math.abs(p.v.y)*.35,p.v.x*=.5,p.v.z*=.5,p.bounced=!0):p.p.y<.03&&(p.p.y=.03,p.v.set(0,0,0)),p.rot.x+=p.spin.x*r,p.rot.y+=p.spin.y*r,p.rot.z+=p.spin.z*r);const M=m/p.life,w=p.size*(M>.7?1-(M-.7)/.3:1);g.setFromEuler(p.rot),f.compose(p.p,g,new C(w,w,w)),this.shardMesh.setMatrixAt(u,f),this.shardMesh.setColorAt(u,p.color),u++}this.shardMesh.count=u,this.shardMesh.instanceMatrix.needsUpdate=!0,this.shardMesh.instanceColor&&(this.shardMesh.instanceColor.needsUpdate=!0);let S=0;for(const p of n){if(S>=96)break;const m=p.prevX+(p.x-p.prevX)*s,M=p.prevZ+(p.z-p.prevZ)*s,w=p.x-p.prevX,x=p.z-p.prevZ,T=Math.atan2(w,x),b=e-p.bornAt,R=Sl(m,M),_=Math.max(.9,At.y-R*.5);g.setFromEuler(new It(0,T,0)),f.compose(new C(m,_,M),g,new C(1,1,1)),this.needleHeads.setMatrixAt(S,f);const E=Math.min(1.8,.3+b*8);f.compose(new C(m,_,M),g,new C(.2,1,-E)),this.needleTrails.setMatrixAt(S,f),S++}for(this.needleHeads.count=S,this.needleTrails.count=S,this.needleHeads.instanceMatrix.needsUpdate=!0,this.needleTrails.instanceMatrix.needsUpdate=!0,this.particles.update(e,r),this.dust.update(this.presentTime,t);this.dust.liveCount<this.ambientDust;)this.spawnDust();this.stats.ribbons=a,this.stats.rings=o,this.stats.particles=this.particles.liveCount,this.stats.shards=u}reset(){for(const e of this.ribbons)e.active=!1,e.mesh.visible=!1;for(const e of this.rings)e.active=!1,e.mesh.visible=!1;for(const e of this.shards)e.active=!1;for(const e of this.flashData)e.active=!1;this.particles.reset(),this.shardMesh.count=0,this.flashes.count=0,this.needleHeads.count=0,this.needleTrails.count=0,this.lensBorn=-100,this.lastSimTime=0,this.stats.dropped=0}dispose(){for(const e of this.ribbons)e.geo.dispose(),e.mat.dispose();for(const e of this.rings)e.mat.dispose();this.particles.dispose(),this.dust.dispose(),this.shardMesh.dispose(),this.needleHeads.dispose(),this.needleTrails.dispose(),this.flashes.dispose();for(const e of this.disposables)e.dispose()}}function E_(){const[i,e]=$t(32,128),t=e.createLinearGradient(0,0,0,128);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.3,"rgba(255,255,255,0.5)"),t.addColorStop(1,"rgba(255,255,255,0.0)"),e.fillStyle=t,e.beginPath(),e.moveTo(2,0),e.lineTo(30,0),e.lineTo(16,128),e.closePath(),e.fill(),i}const w_=6;class A_{constructor(e,t,n,s,r,a){this.canvas=e,this.rig=t,this.board=n,this.cards=s,this.getController=r,this.actions=a;const o=(l,c)=>{e.addEventListener(l,c),this.off.push(()=>e.removeEventListener(l,c))};o("pointerdown",l=>this.onDown(l)),o("pointermove",l=>this.onMove(l)),o("pointerup",l=>this.onUp(l)),o("pointercancel",()=>this.cancelDrag("pointercancel")),o("lostpointercapture",()=>{this.dragging&&this.cancelDrag("lostcapture")}),o("pointerleave",()=>{this.dragging||this.setHover(null,null)})}canvas;rig;board;cards;getController;actions;raycaster=new _c;ndc=new ae;pointerId=null;pressOffer=null;pressX=0;pressY=0;dragging=!1;grabDX=0;grabDY=0;lastX=0;lastY=0;hoverKey=null;hoverSlot=null;dragPlane=new Wn(new C(0,1,0),0);off=[];enabled=!0;get isDragging(){return this.dragging}setNdc(e,t){const n=this.canvas.getBoundingClientRect();this.ndc.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.rig.camera)}pick(e,t,n){return e.length===0?null:(this.setNdc(t,n),this.raycaster.intersectObjects(e,!1)[0]??null)}canDraft(){const e=this.getController();return this.enabled&&!!e.draft&&!e.suspended&&(e.phase==="DRAFT"||e.phase==="PLACEMENT")}offerAt(e,t){const n=this.pick(this.cards.pickables("offers"),e,t);if(!n)return null;const s=this.cards.cardByObject(n.object);return s&&s.offerIndex!==null?s.offerIndex:null}socketAt(e,t){const n=this.pick(this.board.sockets.map(s=>s.hit),e,t);return n?n.object.userData.slot:null}onDown(e){if(e.button!==0||this.pointerId!==null||(this.lastX=e.clientX,this.lastY=e.clientY,!this.canDraft()))return;const n=this.getController().draft.stage;if(n!=="choosing"&&n!=="placing"&&n!=="boonSelected")return;const s=this.offerAt(e.clientX,e.clientY);s!==null&&(this.pointerId=e.pointerId,this.pressOffer=s,this.pressX=e.clientX,this.pressY=e.clientY,this.canvas.setPointerCapture(e.pointerId),e.preventDefault())}onMove(e){if(this.lastX=e.clientX,this.lastY=e.clientY,this.pointerId!==null&&e.pointerId===this.pointerId&&this.pressOffer!==null){!this.dragging&&Math.hypot(e.clientX-this.pressX,e.clientY-this.pressY)>w_&&this.beginDrag(),this.dragging&&this.updateDrag(e.clientX,e.clientY);return}this.updateHover(e.clientX,e.clientY)}beginDrag(){const e=this.pressOffer,t=this.getController();if((t.draft?.selected!==e||t.draft.stage==="choosing")&&this.actions.selectOffer(e),t.draft?.selected!==e){this.release();return}const n=this.cards.offerView(e);if(!n)return;const s=this.rig.project(n.group.position),r=this.canvas.getBoundingClientRect();this.grabDX=this.pressX-(s.x+r.left),this.grabDY=this.pressY-(s.y+r.top),this.grabDX*=.5,this.grabDY*=.5,this.dragging=!0,this.cards.startDrag(e),this.actions.pickSound()}dragPoint(e,t){this.dragPlane.constant=-this.cards.dragPlaneY(),this.setNdc(e-this.grabDX,t-this.grabDY);const n=new C;return this.raycaster.ray.intersectPlane(this.dragPlane,n)?n:null}updateDrag(e,t){const n=this.dragPoint(e,t);n&&this.pressOffer!==null&&this.cards.dragTo(this.pressOffer,n);const s=this.dropSlot(e,t);this.setHover(null,s)}dropSlot(e,t){const n=this.dragPoint(e,t);if(n){const r=new _c(new C(n.x,n.y+5,n.z),new C(0,-1,0)).intersectObjects(this.board.sockets.map(a=>a.hit),!1);if(r[0])return r[0].object.userData.slot}return this.socketAt(e,t)}onUp(e){if(this.pointerId===null||e.pointerId!==this.pointerId){if(e.button===0&&this.canDraft()&&this.getController().draft.stage==="placing"){const s=this.socketAt(e.clientX,e.clientY);s!==null&&this.actions.placeSlot(s)}return}const t=this.pressOffer;if(this.dragging&&t!==null){const n=this.dropSlot(e.clientX,e.clientY);if(this.dragging=!1,this.release(),n!==null){const r=this.getController().draft?.offer[t],a=this.actions.placeSlot(n);a==="rejected"?(this.cards.returnOffer(t),this.actions.returnSound(),r&&!gi(r)&&this.actions.rejected("Boons are used, not socketed — press Use.")):a==="confirm"&&this.cards.returnOffer(t)}else this.cards.returnOffer(t),this.actions.returnSound()}else if(t!==null){this.release();const n=this.getController();n.draft?.selected===t&&n.draft.stage!=="choosing"?this.actions.cancel():this.actions.selectOffer(t)}}release(){this.pointerId!==null&&this.canvas.hasPointerCapture(this.pointerId)&&this.canvas.releasePointerCapture(this.pointerId),this.pointerId=null,this.pressOffer=null}cancelDrag(e){const t=this.pressOffer,n=this.dragging;this.dragging=!1,this.release(),n&&t!==null&&(this.cards.returnOffer(t),this.actions.returnSound()),this.setHover(null,null)}updateHover(e,t){const n=this.getController();if(!this.enabled||n.phase==="TITLE"){this.setHover(null,null);return}if(this.canDraft()){const s=this.offerAt(e,t);if(s!==null){this.setHover(`o${s}`,null);return}if(n.draft.stage==="placing"){const r=this.socketAt(e,t);this.setHover(this.equippedKeyAt(e,t),r);return}}this.setHover(this.equippedKeyAt(e,t),null)}equippedKeyAt(e,t){const n=this.pick(this.cards.pickables("equipped"),e,t),s=n?this.cards.cardByObject(n.object):void 0;return s?s.key:null}setHover(e,t){if(e!==this.hoverKey){this.hoverKey=e;const n=e?this.cards.cards.get(e):void 0;this.cards.setHover(e,!!n&&n.offerIndex!==null),n?(this.actions.hover({id:n.defId,charge:null,slot:n.offerIndex===null?n.slot:null}),this.actions.hoverSound()):this.actions.hover(null)}t!==this.hoverSlot&&(this.hoverSlot=t),this.canvas.style.cursor=e&&e.startsWith("o")?"grab":t!==null?"pointer":"default",this.dragging&&(this.canvas.style.cursor="grabbing")}updateHalos(){const e=this.getController(),t=this.canDraft()&&(e.draft.stage==="placing"||this.dragging)&&e.selectedCard()!==null&&gi(e.selectedCard());for(const n of this.board.sockets){if(!t){this.board.setSocketHalo(n.slot,0,6937296);continue}const s=!!e.sim.slots[n.slot],r=this.hoverSlot===n.slot;this.board.setSocketHalo(n.slot,r?1:.35,s?14856308:6937296)}e.draft?.stage==="confirmReplace"&&e.draft.pendingSlot!==null&&this.board.setSocketHalo(e.draft.pendingSlot,1,14844276)}refreshHover(){!this.dragging&&this.pointerId===null&&this.updateHover(this.lastX,this.lastY)}dispose(){this.cancelDrag("dispose");for(const e of this.off)e();this.off=[]}}function C_(i,e){const t=Xt[i],n=1+gs.polishPerStack*e,s=a=>(Math.round(a*n*10)/10).toString(),r=[["Interval",`${t.interval.toFixed(1)} s`]];return t.pattern==="chain"?r.push(["Damage",(t.chainDamage??[]).map(s).join(" / ")],["Targets",`up to 3, hop ${t.chainHopRange}`],["Range",`${t.range}`]):t.pattern==="pulse"?r.push(["Damage",`${s(t.damage)} to all`],["Radius",`${t.pulseRadius} from Base centre`]):r.push(["Damage",s(t.damage)],["Range",`${t.range}`],["Delivery",t.pattern==="projectile"?"homing needle":"instant lance"]),r.push(["DPS (1 target)",((t.pattern==="chain"?(t.chainDamage??[0])[0]:t.damage)*n/t.interval).toFixed(1)]),r}function Kc(i,e,t=""){const n=Ms(i),s=n.kind==="weapon"?`Weapon · ${{projectile:"Single target",lance:"Heavy single target",chain:"Chain",pulse:"Area ring"}[Xt[n.id].pattern]}`:"Boon · resolves immediately",r=n.kind==="weapon"?C_(n.id,e):i==="polish"?[["Effect",`+15% weapon damage (now ${e}/2)`]]:[["Effect",`Restore ${gs.mendAmount} Integrity`]];return`<div class="name">${n.name}</div><div class="type">${s}</div>
    <div>${n.summary}</div>
    <dl>${r.map(([a,o])=>`<dt>${a}</dt><dd>${o}</dd>`).join("")}</dl>${t}
    <div class="flavor">“${n.flavor}”</div>`}class R_{root;el={};draftKey="";lastHp=Mn.maxHealth;hitTimer=0;toastTimer=0;hoverCard=null;offListeners=[];lastPhase=null;constructor(e,t){this.root=e,e.innerHTML=`
      <div id="hud" class="hidden" role="toolbar" aria-label="Game controls">
        <div class="brand">PALIMPSEST</div>
        <div class="meter" id="integrity" aria-live="polite">
          <span class="label">Integrity</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">100</span>
        </div>
        <div class="meter" id="trial">
          <span class="label">Trial <span class="trial-n">1</span>/${Ws}</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">30</span>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-buttons">
          <button id="btn-pause" title="Pause (P)">Pause</button>
          <button id="btn-mute" title="Mute (M)">Mute</button>
          <label class="volume" title="Volume"><span class="sr-only">Volume</span><input id="volume" type="range" min="0" max="100" value="70" aria-label="Volume" /></label>
          <button id="btn-quality" title="Toggle quality (Q)">Quality: High</button>
          <button id="btn-restart" class="danger" title="Restart (R)">Restart</button>
        </div>
      </div>
      <div id="title-overlay" class="overlay">
        <div class="plate">
          <h1>PALIMPSEST</h1>
          <div class="stakes">${Pv}</div>
          <div class="divider"></div>
          <p>Your weapons are memory cards seated in the vessel. Each fills with light from bottom to top, then the vessel fires on its own.</p>
          <p>Between trials, choose one memory. Drag it into a socket, or click it and then click a socket.</p>
          <div class="actions"><button id="btn-start" class="primary">Begin the Trials</button></div>
          <p class="small">P pause · M mute · Q quality · Esc cancel · 1–3 choose · 1–6 socket</p>
        </div>
      </div>
      <div id="pause-overlay" class="overlay soft hidden">
        <div class="plate">
          <h2 id="pause-title">Paused</h2>
          <p id="pause-text">The trial is held still.</p>
          <div class="actions"><button id="btn-resume" class="primary">Resume</button></div>
        </div>
      </div>
      <div id="end-overlay" class="overlay hidden">
        <div class="plate">
          <h2 id="end-title"></h2>
          <p id="end-text"></p>
          <div class="stats" id="end-stats"></div>
          <div class="actions"><button id="btn-end-restart" class="primary">Restart</button></div>
          <p class="small" id="end-seed"></p>
        </div>
      </div>
      <aside id="draft-panel" class="hidden" aria-label="Choose a memory">
        <div class="eyebrow" id="draft-eyebrow"></div>
        <h3 id="draft-heading">Choose one memory</h3>
        <div class="forecast" id="draft-forecast"></div>
        <div class="offer-list" id="offer-list" role="group" aria-label="Offered cards"></div>
        <div class="detail" id="draft-detail"></div>
        <div id="compare-slot"></div>
        <div class="socket-list hidden" id="socket-list" role="group" aria-label="Sockets"></div>
        <div class="hint" id="draft-hint"></div>
        <div class="draft-actions">
          <button id="btn-use" class="primary hidden">Use</button>
          <button id="btn-replace" class="primary hidden">Replace</button>
          <button id="btn-cancel" class="hidden">Cancel</button>
          <button id="btn-continue" class="primary" disabled>Continue</button>
        </div>
      </aside>
      <div id="inspect" class="detail hidden" aria-live="polite"></div>
      <div id="toast" class="hidden"></div>
    `;const n=["hud","integrity","trial","btn-pause","btn-mute","btn-quality","btn-restart","title-overlay","btn-start","pause-overlay","pause-title","pause-text","btn-resume","end-overlay","end-title","end-text","end-stats","end-seed","btn-end-restart","draft-panel","draft-eyebrow","draft-heading","draft-forecast","offer-list","draft-detail","compare-slot","socket-list","draft-hint","btn-use","btn-replace","btn-cancel","btn-continue","inspect","toast"];for(const l of n)this.el[l]=e.querySelector(`#${l}`);const s=(l,c)=>{const h=d=>{d.preventDefault(),c()};this.el[l].addEventListener("click",h),this.offListeners.push(()=>this.el[l].removeEventListener("click",h))};s("btn-start",()=>t.start()),s("btn-pause",()=>this.lastPhase==="PAUSED"?t.resume():t.pause()),s("btn-resume",()=>t.resume()),s("btn-mute",()=>t.toggleMute()),s("btn-quality",()=>t.toggleQuality()),s("btn-restart",()=>t.restart()),s("btn-end-restart",()=>t.restart()),s("btn-use",()=>t.useBoon()),s("btn-replace",()=>t.confirmReplace()),s("btn-cancel",()=>t.cancel()),s("btn-continue",()=>t.continueRun());const r=(l,c,h)=>{const d=u=>{const f=u.target.closest(`button[${c}]`);f&&!f.disabled&&h(Number(f.getAttribute(c)))};this.el[l].addEventListener("click",d),this.offListeners.push(()=>this.el[l].removeEventListener("click",d))},a=e.querySelector("#volume"),o=()=>t.setVolume(Number(a.value)/100);a.addEventListener("input",o),this.offListeners.push(()=>a.removeEventListener("input",o)),r("offer-list","data-offer",l=>t.selectOffer(l)),r("socket-list","data-slot",l=>t.placeSlot(l))}setHoverCard(e){this.hoverCard=e}toast(e,t=2.5){this.el.toast.textContent=e,this.el.toast.classList.remove("hidden"),this.el.toast.style.opacity="1",this.toastTimer=t}insets(e){return{top:56,right:e==="DRAFT"||e==="PLACEMENT"?(this.el["draft-panel"].getBoundingClientRect().width||330)+20:0,bottom:6,left:6}}focusPrimary(e){e==="TITLE"&&this.el["btn-start"].focus()}update(e,t){const n=e.phase!==this.lastPhase;this.lastPhase=e.phase;const s=e.phase!=="TITLE";this.el.hud.classList.toggle("hidden",!s),this.el["title-overlay"].classList.toggle("hidden",e.phase!=="TITLE");const r=Math.max(0,e.hp/Mn.maxHealth);this.el.integrity.querySelector(".fill").style.transform=`scaleX(${r})`,this.el.integrity.querySelector(".value").textContent=`${Math.ceil(e.hp)}`,this.el.integrity.classList.toggle("low",r<=.35),e.hp<this.lastHp&&(this.hitTimer=.35),this.lastHp=e.hp,this.hitTimer=Math.max(0,this.hitTimer-t),this.el.integrity.classList.toggle("hit",this.hitTimer>0),this.el.trial.querySelector(".trial-n").textContent=`${e.trialIndex+1}`;const a=Math.max(0,e.trialDuration-e.trialTime);this.el.trial.querySelector(".fill").style.transform=`scaleX(${e.clearing?0:a/e.trialDuration})`,this.el.trial.querySelector(".value").textContent=e.clearing?`${e.enemiesLeft} left`:`${Math.ceil(a)}s`,this.el["btn-pause"].textContent=e.phase==="PAUSED"?"Resume":"Pause",this.el["btn-pause"].disabled=!(e.phase==="COMBAT"||e.phase==="CLEARING"||e.phase==="PAUSED"),this.el["btn-mute"].textContent=e.muted?"Unmute":"Mute",this.el["btn-quality"].textContent=`Quality: ${e.quality==="high"?"High":"Low"}`;const o=e.phase==="PAUSED"||e.suspended;if(this.el["pause-overlay"].classList.toggle("hidden",!o),o){const c=e.suspended||e.pauseReason==="suspended";this.el["pause-title"].textContent=c?"The vessel waits":"Paused",this.el["pause-text"].textContent=c?"The trial was suspended while you were away. Nothing advanced.":"The trial is held still.",n&&this.el["btn-resume"].focus({preventScroll:!0})}const l=e.phase==="DEFEAT"||e.phase==="VICTORY";if(this.el["end-overlay"].classList.toggle("hidden",!l),l&&n){this.el.toast.classList.add("hidden"),this.toastTimer=0;const c=e.phase==="VICTORY";this.el["end-overlay"].className=`overlay ${c?"victory":"defeat"}`,this.el["end-title"].textContent=c?"Returned to Life":"The Vessel Breaks",this.el["end-text"].textContent=c?"Eight trials endured. The aperture opens and the soul rises toward a new life.":"Your memories scatter into the void. The instrument can be wound again.";const h=e.slots.filter(Boolean).length;this.el["end-stats"].innerHTML=`<div><b>${e.trialIndex+1}/${Ws}</b>trial</div><div><b>${e.kills}</b>echoes laid to rest</div><div><b>${h}</b>memories held</div><div><b>${Math.ceil(e.hp)}</b>integrity</div>`,this.el["end-seed"].textContent=`Seed ${e.seed}`,setTimeout(()=>this.el["btn-end-restart"].focus({preventScroll:!0}),0)}this.updateDraft(e),this.updateInspect(e),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&this.el.toast.classList.add("hidden"))}updateDraft(e){const t=(e.phase==="DRAFT"||e.phase==="PLACEMENT")&&!!e.draft;if(this.el["draft-panel"].classList.toggle("hidden",!t),!t||!e.draft){this.draftKey="";return}const n=e.draft,s=this.hoverCard&&this.hoverCard.slot===null?this.hoverCard.id:null,r=JSON.stringify([n,e.slots.map(d=>d?.defId??null),e.hp,e.polishStacks,s,e.suspended]);if(r===this.draftKey)return;this.draftKey=r,this.el["draft-eyebrow"].textContent=`Trial ${n.draftIndex+1} endured`,this.el["draft-heading"].textContent=n.stage==="resolved"?"Memory reclaimed":"Choose one memory",this.el["draft-forecast"].textContent=`Next: ${n.forecast}`;const a=n.stage==="settling"||n.stage==="resolved"||n.stage==="confirmReplace";this.el["offer-list"].innerHTML=n.offer.map((d,u)=>{const f=Ms(d),g=gi(d)&&e.slots.some(p=>p?.defId===d),S=f.kind==="boon"?"Boon":g?"Weapon · owned":"Weapon · new";return`<button data-offer="${u}" aria-pressed="${n.selected===u}" ${a?"disabled":""}><span>${u+1}. ${f.name}</span><span class="kind">${S}</span></button>`}).join("");const o=s??(n.selected!==null?n.offer[n.selected]:n.resolvedCard);if(this.el["draft-detail"].innerHTML=o?Kc(o,e.polishStacks):`<div class="hint">Hover or select a card to read it. Every weapon fires from the vessel's shared emitter; sockets are interchangeable.</div>`,n.stage==="confirmReplace"&&n.pendingSlot!==null&&n.selected!==null){const d=e.slots[n.pendingSlot],u=n.offer[n.selected];this.el["compare-slot"].innerHTML=d?`<div class="compare"><div class="old"><b>${Xt[d.defId].name}</b>${Xt[d.defId].interval.toFixed(1)}s · ${Xt[d.defId].damage} dmg</div><div class="arrow">→</div><div class="new"><b>${Xt[u].name}</b>${Xt[u].interval.toFixed(1)}s · ${Xt[u].damage} dmg</div></div>`:""}else this.el["compare-slot"].innerHTML="";const l=n.stage==="placing";this.el["socket-list"].classList.toggle("hidden",!l),l&&(this.el["socket-list"].innerHTML=e.slots.map((d,u)=>`<button data-slot="${u}"><span>Socket ${u+1}</span><span class="kind">${d?`Replace ${Xt[d.defId].name}`:"Empty"}</span></button>`).join(""));const c=n.selected!==null&&!gi(n.offer[n.selected]);this.el["btn-use"].classList.toggle("hidden",!(n.stage==="boonSelected"&&c)),this.el["btn-replace"].classList.toggle("hidden",n.stage!=="confirmReplace"),this.el["btn-cancel"].classList.toggle("hidden",!(n.stage==="placing"||n.stage==="confirmReplace"||n.stage==="boonSelected")),this.el["btn-continue"].disabled=n.stage!=="resolved"||e.suspended;const h={choosing:"Drag a weapon card into any socket, or click it and then click a socket. Boons are used, not socketed.",boonSelected:"Press Use to apply this boon. It does not take a socket.",placing:"Click a socket on the vessel (or a socket button). Occupied sockets ask before replacing. Esc returns the card.",confirmReplace:"The current weapon stays installed until you press Replace.",settling:"Seating the memory…",resolved:"Your build is set. Press Continue when ready — the trial resumes exactly where it froze."};this.el["draft-hint"].textContent=h[n.stage],n.stage==="resolved"&&setTimeout(()=>this.el["btn-continue"].focus({preventScroll:!0}),0)}updateInspect(e){const t=!!this.hoverCard&&this.hoverCard.slot!==null&&(e.phase==="COMBAT"||e.phase==="CLEARING"||e.phase==="PAUSED"||e.phase==="DRAFT"||e.phase==="PLACEMENT");if(this.el.inspect.classList.toggle("hidden",!t),t&&this.hoverCard){const n=this.hoverCard.slot!==null?e.slots[this.hoverCard.slot]?.charge??0:0,s=`<dl><dt>Socket</dt><dd>${(this.hoverCard.slot??0)+1} (no effect on combat)</dd><dt>Charge</dt><dd>${Math.round(n*100)}%</dd></dl>`;this.el.inspect.innerHTML=Kc(this.hoverCard.id,e.polishStacks,s);const r=e.phase==="DRAFT"||e.phase==="PLACEMENT";this.el.inspect.style.left="14px",this.el.inspect.style.right="auto"}}dispose(){for(const e of this.offListeners)e();this.offListeners=[],this.root.innerHTML=""}static enemyName(e){return $h[e].name}}const Is=new C;function ln(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Is.copy(e),Is[n]=0,Is.normalize();const c=.5*a/(a+o),h=1-Is.angleTo(i)/l;return Math.sign(Is[t])===1?h*c:o/(a+o)+c+c*(1-h)}class Cn extends xn{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new C,c=new C,h=new C(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,S=new C,p=.5/a;for(let m=0,M=0;m<d.length;m+=3,M+=2)switch(l.fromArray(d,m),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),d[m+0]=h.x*Math.sign(l.x)+c.x*r,d[m+1]=h.y*Math.sign(l.y)+c.y*r,d[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/g)){case 0:S.set(1,0,0),f[M+0]=ln(S,c,"z","y",r,n),f[M+1]=1-ln(S,c,"y","z",r,t);break;case 1:S.set(-1,0,0),f[M+0]=1-ln(S,c,"z","y",r,n),f[M+1]=1-ln(S,c,"y","z",r,t);break;case 2:S.set(0,1,0),f[M+0]=1-ln(S,c,"x","z",r,e),f[M+1]=ln(S,c,"z","x",r,n);break;case 3:S.set(0,-1,0),f[M+0]=1-ln(S,c,"x","z",r,e),f[M+1]=1-ln(S,c,"z","x",r,n);break;case 4:S.set(0,0,1),f[M+0]=1-ln(S,c,"x","y",r,e),f[M+1]=1-ln(S,c,"y","x",r,t);break;case 5:S.set(0,0,-1),f[M+0]=ln(S,c,"x","y",r,e),f[M+1]=1-ln(S,c,"y","x",r,t);break}}static fromJSON(e){return new Cn(e.width,e.height,e.depth,e.segments,e.radius)}}function Xo(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new vt;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Jc(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let S=0;S<a[h].length;++S)f.push(a[h][S][u]);const g=Jc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Jc(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Ut(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<t;g++){const S=h.getComponent(u,g);o.setComponent(u+d,g,S)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function Fr(i,e,t,n=0,s=0){const r=new _s,a=n-i/2,o=s-e/2;return r.moveTo(a+t,o),r.lineTo(a+i-t,o),r.quadraticCurveTo(a+i,o,a+i,o+t),r.lineTo(a+i,o+e-t),r.quadraticCurveTo(a+i,o+e,a+i-t,o+e),r.lineTo(a+t,o+e),r.quadraticCurveTo(a,o+e,a,o+e-t),r.lineTo(a,o+t),r.quadraticCurveTo(a,o,a+t,o),r}function Or(i,e,t,n,s){const r=new No,a=n-i/2,o=s-e/2;return r.moveTo(a+t,o),r.quadraticCurveTo(a,o,a,o+t),r.lineTo(a,o+e-t),r.quadraticCurveTo(a,o+e,a+t,o+e),r.lineTo(a+i-t,o+e),r.quadraticCurveTo(a+i,o+e,a+i,o+e-t),r.lineTo(a+i,o+t),r.quadraticCurveTo(a+i,o,a+i-t,o),r.closePath(),r}function Ls(i,e){const t=e.map(s=>i.clone().applyMatrix4(s)),n=Xo(t);return t.forEach(s=>s.dispose()),n}function is(i,e,t,n=0,s=0,r=0){return new tt().compose(new C(i,e,t),new Zt().setFromEuler(new It(n,s,r)),new C(1,1,1))}class jr{root=new un;baseGroup=new un;sockets=[];emitter;emitterLight;emitterMat;warnMat;warnLevel=0;baseShake=0;baseShakeAge=1;apertureSegments=[];apertureLights;segColor=new we;static SEG_OFF=new we(1053983);static SEG_ON=new we(6937296).multiplyScalar(2.2);apertureIris=[];apertureCore;apertureCoreMat;apertureOpen=0;apertureOpenTarget=0;progress=0;soulLift=0;soulFade=1;pulse=0;disposables=[];apertureGroup=new un;constructor(e){const t=P=>(this.disposables.push(P),P),n=P=>t(Jn(P,e)),s=n(f_());s.wrapS=s.wrapT=cs;const r=t(new ct({color:13151088,map:s,metalness:.85,roughness:.38})),a=t(new ct({color:9072705,map:s,metalness:.8,roughness:.5})),o=n(d_());o.wrapS=o.wrapT=cs;const l=t(new ct({color:14274486,map:o,roughness:.5,metalness:0})),c=n(c_()),h=t(new _f({color:16777215,map:c,roughness:.28,metalness:.05,clearcoat:.6,clearcoatRoughness:.25})),d=n(o_()),u=t(new ct({map:d,roughness:.82,metalness:.08})),f=t(new ct({color:856864,roughness:.7,metalness:.2})),g=n(l_());g.wrapS=cs,g.repeat.set(3,1);const S=t(new ct({map:g,metalness:.85,roughness:.36})),p=n(g_()),m=new Ne(t(new Bt(120,120)),t(new Ct({map:p,toneMapped:!1,depthWrite:!1})));m.rotation.x=-Math.PI/2,m.position.y=-14,m.renderOrder=-10,this.root.add(m);const M=Go.boardRadius,w=t(new wi(M,M-.25,.6,160,1)),x=new Ne(w,[f,u,f]);x.position.y=-.3,x.receiveShadow=!0,this.root.add(x);const T=new Ne(t(new wi(M-.25,M-2.4,1.1,96,1,!0)),f);T.position.y=-1.15,this.root.add(T);const b=new Ne(t(new sn(M-1.6,.06,8,128)),a);b.rotation.x=Math.PI/2,b.position.y=-1.3,this.root.add(b);const R=[new ae(M-.18,0),new ae(M-.16,.12),new ae(M-.05,.2),new ae(M+.25,.22),new ae(M+.42,.14),new ae(M+.45,-.05)],_=new Ne(t(new ds(R,180)),r);_.receiveShadow=!0,this.root.add(_);const E=new Ne(t(new wi(M+.45,M+.3,.55,180,1,!0)),S);E.position.y=-.32,this.root.add(E);const I=new Ne(t(new Cn(2,.18,2.4,3,.06)),r);I.position.set(hn.x,.02,hn.z),I.rotation.y=-.25,I.castShadow=I.receiveShadow=!0,this.root.add(I);const D=n(r_()),F=t(new ct({map:D,roughness:.5,metalness:.1})),G=t(new ct({color:14668722,roughness:.7})),N=new xn(1.5,.035,2),B=[];for(let P=0;P<5;P++)B.push(is(hn.x+P%2*.02,.13+P*.04,hn.z-P*.015,0,I.rotation.y+(P-2)*.03,0));const K=new Ne(t(Ls(N,B)),G);K.castShadow=!0,this.root.add(K),N.dispose();const V=new Ne(t(new Bt(1.46,1.96)),F);V.rotation.set(-Math.PI/2,0,I.rotation.y+2*.03,"YXZ"),V.rotation.set(-Math.PI/2,0,0),V.rotateOnWorldAxis(new C(0,1,0),I.rotation.y+.06),V.position.set(hn.x,.13+4*.04+.019,hn.z-4*.015),this.root.add(V);const se=Mn.halfX,X=Mn.halfZ,j=new Ne(t(new Cn(se*2,En+.1,X*2,4,.08)),a);j.position.y=(En-.1)/2;const ie=new Ne(t(new Cn(se*2-.42,li-En+.04,X*2-.42,4,.1)),l);ie.position.y=(li+En)/2;const Ce=new Ne(t(new Cn(se*2-.16,Wr-li+.04,X*2-.16,3,.05)),r);Ce.position.y=(Wr+li)/2;for(const P of[j,ie,Ce])P.castShadow=!0,P.receiveShadow=!0,this.baseGroup.add(P);const Te=new wi(.11,.13,li-En,12),Qe=[];for(const P of[-1,1])for(const oe of[-1,1])Qe.push(is(P*(se-.24),(li+En)/2,oe*(X-.24)));const qe=new Ne(t(Ls(Te,Qe)),r);Te.dispose(),qe.castShadow=!0,this.baseGroup.add(qe);const Ye=new Ne(t(new Cn(se*2-.36,.07,X*2-.36,2,.03)),r);Ye.position.y=En+(li-En)*.62,Ye.castShadow=!0,this.baseGroup.add(Ye);const $=n(h_()),ne=t(new ct({map:$,transparent:!0,metalness:.7,roughness:.4})),ge=t(new Bt(1.5,.42));for(const[P,oe,Q]of[[0,X-.209,0],[se-.209,0,Math.PI/2]]){const de=new Ne(ge,ne);de.position.set(P,En+(li-En)*.3,oe),de.rotation.y=Q,this.baseGroup.add(de)}this.warnMat=t(new Ct({color:14844276,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!0}));const Fe=Fr(se*2+.36,X*2+.36,.3);Fe.holes.push(Or(se*2+.02,X*2+.02,.1,0,0));const q=new Ne(t(new Ii(Fe,8)),this.warnMat);q.rotation.x=-Math.PI/2,q.position.y=.012,this.baseGroup.add(q);const te=Fr(Nr,Xa,.28);for(let P=0;P<mi;P++){const oe=Li(P);te.holes.push(Or(ci,hi,.14,oe.x,-oe.z))}const Me=t(new nr(te,{depth:Jh,bevelEnabled:!0,bevelThickness:Qh,bevelSize:.04,bevelSegments:3,curveSegments:10})),W=Me.attributes.uv;for(let P=0;P<W.count;P++)W.setXY(P,(W.getX(P)+Nr/2)/Nr,(W.getY(P)+Xa/2)/Xa);const re=new Ne(Me,[h,r]);re.rotation.x=-Math.PI/2,re.position.y=Wr,re.castShadow=!0,re.receiveShadow=!0,this.baseGroup.add(re);const he=n(u_()),ce=t(new ct({map:he,roughness:.9,metalness:.1})),pe=t(new Bt(ci+.08,hi+.08)),ze=Fr(ci+.2,hi+.2,.2);ze.holes.push(Or(ci+.02,hi+.02,.14,0,0));const Oe=t(new nr(ze,{depth:.02,bevelEnabled:!0,bevelThickness:.015,bevelSize:.015,bevelSegments:2})),He=Fr(ci+.5,hi+.5,.34);He.holes.push(Or(ci+.24,hi+.24,.22,0,0));const Ve=t(new Ii(He,8)),L=t(new Bt(ci+.2,hi+.2)),rt=t(new Ct({visible:!1})),Ze=[],A=[];for(let P=0;P<mi;P++){const oe=Li(P);Ze.push(is(oe.x,jh,oe.z,-Math.PI/2)),A.push(is(oe.x,Rt-.005,oe.z,-Math.PI/2))}const v=new Ne(t(Ls(pe,Ze)),ce);v.receiveShadow=!0;const O=new Ne(t(Ls(Oe,A)),r);O.castShadow=!0,O.receiveShadow=!0,this.baseGroup.add(v,O);for(let P=0;P<mi;P++){const oe=Li(P),Q=t(new Ct({color:6937296,transparent:!0,opacity:0,depthWrite:!1,blending:Rn})),de=new Ne(Ve,Q);de.rotation.x=-Math.PI/2,de.position.set(oe.x,Rt+.03,oe.z),de.renderOrder=3,this.baseGroup.add(de);const xe=new Ne(L,rt);xe.rotation.x=-Math.PI/2,xe.position.set(oe.x,Rt+.02,oe.z),xe.userData.slot=P,this.baseGroup.add(xe),this.sockets.push({slot:P,hit:xe,halo:de,haloMat:Q,center:new C(oe.x,Rt,oe.z),haloLevel:0,haloTarget:0,haloColor:new we(6937296)})}const H=new Ne(t(new xn(Nr-.6,.02,.035)),r);H.position.set(0,Rt+.005,0),this.baseGroup.add(H);const Z=new Ne(t(new sn(.2,.035,10,32)),r);Z.rotation.x=Math.PI/2,Z.position.set(At.x,Rt+.08,At.z),Z.castShadow=!0,this.baseGroup.add(Z);const ue=new wi(.018,.025,.36,6),fe=[];for(let P=0;P<3;P++){const oe=P/3*Math.PI*2+.5;fe.push(is(Math.cos(oe)*.17,Rt+.22,Math.sin(oe)*.17,-Math.sin(oe)*.35,0,Math.cos(oe)*.35))}this.baseGroup.add(new Ne(t(Ls(ue,fe)),r)),ue.dispose(),this.emitterMat=t(new ct({color:727580,emissive:6937296,emissiveIntensity:2.2,roughness:.2})),this.emitter=new Ne(t(new Pi(.15,24,16)),this.emitterMat),this.emitter.position.set(At.x,At.y,At.z),this.baseGroup.add(this.emitter),this.emitterLight=new zh(6937296,2.2,6,2),this.emitterLight.position.copy(this.emitter.position),this.baseGroup.add(this.emitterLight);const J=n(oa("rgba(0,0,0,0.7)","rgba(0,0,0,0)",256)),ee=new Ne(t(new Bt(se*2+2.4,X*2+2.4)),t(new Ct({map:J,transparent:!0,depthWrite:!1})));ee.rotation.x=-Math.PI/2,ee.position.y=.005,this.root.add(ee),this.root.add(this.baseGroup),this.apertureGroup.position.set(-10.2,0,-7.6),this.apertureGroup.rotation.y=.55;const me=new Ne(t(new Cn(2.6,.5,1.2,3,.1)),a);me.position.y=-.15,this.apertureGroup.add(me);const Le=new Ne(t(new sn(1.55,.13,16,96)),r);Le.position.y=1.85,this.apertureGroup.add(Le);const _e=new Ne(t(new sn(1.3,.04,8,96)),a);_e.position.y=1.85,this.apertureGroup.add(_e);const ve=t(new xn(.34,.12,.16));this.apertureLights=new In(ve,t(new Ct({color:16777215})),Ws);for(let P=0;P<Ws;P++){const oe=Math.PI/2+((P+.5)/Ws-.5)*Math.PI*1.7;this.apertureLights.setMatrixAt(P,is(Math.cos(oe)*1.78,1.85+Math.sin(oe)*1.78,.02,0,0,oe+Math.PI/2)),this.apertureLights.setColorAt(P,new we(1053983)),this.apertureSegments.push(0)}this.apertureGroup.add(this.apertureLights);const Re=new _s;Re.moveTo(0,0),Re.absarc(0,0,1.32,0,Math.PI/3+.05,!1),Re.lineTo(0,0);const ke=t(new Ii(Re,16)),We=t(new ct({color:2372175,metalness:.6,roughness:.35,side:jt}));for(let P=0;P<6;P++){const oe=new Ne(ke,We);oe.position.set(0,1.85,.01),oe.rotation.z=P/6*Math.PI*2,this.apertureGroup.add(oe),this.apertureIris.push(oe)}this.apertureCoreMat=t(new Ct({color:new we(6937296).multiplyScalar(2.4),transparent:!0,opacity:0,depthWrite:!1})),this.apertureCore=new Ne(t(new pl(1.3,48)),this.apertureCoreMat),this.apertureCore.position.set(0,1.85,-.02),this.apertureGroup.add(this.apertureCore),this.root.add(this.apertureGroup)}combatFitPoints(){const e=[],t=Go.spawnRadius+.7;for(let n=0;n<48;n++){const s=n/48*Math.PI*2;e.push(new C(Math.cos(s)*t,0,Math.sin(s)*t),new C(Math.cos(s)*t,1.3,Math.sin(s)*t))}return e}setProgress(e){this.progress=e}openAperture(e){this.apertureOpenTarget=e?1:0}setSoul(e,t){this.soulLift=e,this.soulFade=t}emitterPulse(e=1){this.pulse=Math.max(this.pulse,e)}baseHit(e){this.warnLevel=Math.min(1,this.warnLevel+.5+e/20),this.baseShake=Math.min(1,.4+e/14),this.baseShakeAge=0}setSocketHalo(e,t,n){const s=this.sockets[e];s.haloTarget=t,s.haloColor.setHex(n)}clearHalos(){for(const e of this.sockets)e.haloTarget=0}reset(){this.warnLevel=0,this.baseShake=0,this.apertureOpen=0,this.apertureOpenTarget=0,this.progress=0,this.soulLift=0,this.soulFade=1,this.pulse=0,this.clearHalos()}update(e,t,n){this.warnLevel=Math.max(0,this.warnLevel-t*1.6),this.warnMat.opacity=this.warnLevel*.75,this.baseShakeAge+=t;const s=Math.max(0,1-this.baseShakeAge/.35),r=this.baseShake*s*s;this.baseGroup.position.set(Math.sin(this.baseShakeAge*70)*.05*r,-.04*r,Math.cos(this.baseShakeAge*55)*.03*r),this.pulse=Math.max(0,this.pulse-t*5);const a=.5+.5*Math.sin(n*1.7);this.emitterMat.emissiveIntensity=(1.6+a*.6+this.pulse*3.5)*this.soulFade,this.emitterLight.intensity=(1.4+this.pulse*3)*this.soulFade;const o=1+this.pulse*.35;this.emitter.scale.setScalar(o*(.4+.6*this.soulFade)),this.emitter.position.y=At.y+this.soulLift*3.5+Math.sin(n*1.3)*.03,this.emitterLight.position.copy(this.emitter.position);for(const l of this.sockets)l.haloLevel+=(l.haloTarget-l.haloLevel)*(1-Math.exp(-e*12)),l.haloMat.opacity=l.haloLevel*(.55+.25*Math.sin(n*6)),l.halo.visible=l.haloLevel>.01,l.haloMat.color.copy(l.haloColor);for(let l=0;l<this.apertureSegments.length;l++){const h=(l<this.progress?1:0)*(.85+.15*Math.sin(n*2+l))+this.apertureOpen*.6;this.apertureSegments[l]+=(h-this.apertureSegments[l])*(1-Math.exp(-e*4)),this.segColor.copy(jr.SEG_OFF).lerp(jr.SEG_ON,this.apertureSegments[l]),this.apertureLights.setColorAt(l,this.segColor)}this.apertureLights.instanceColor&&(this.apertureLights.instanceColor.needsUpdate=!0),this.apertureOpen+=(this.apertureOpenTarget-this.apertureOpen)*(1-Math.exp(-e*1.6)),this.apertureIris.forEach((l,c)=>{const h=c/6*Math.PI*2,d=this.apertureOpen*1.25;l.position.set(Math.cos(h+.5)*d,1.85+Math.sin(h+.5)*d,.01),l.scale.setScalar(1-this.apertureOpen*.75)}),this.apertureCoreMat.opacity=.15+this.apertureOpen*.85}dispose(){for(const e of this.disposables)e.dispose();this.disposables.length=0}}const P_=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,I_=`
precision highp float;
varying vec2 vUv;
uniform float uCharge;
uniform float uPulse;
uniform float uTime;
uniform float uSelect;
uniform float uDim;
uniform vec2 uSize;
uniform float uRadius;
uniform vec3 uTint;
uniform vec3 uHot;
uniform vec3 uSelectColor;

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 p = (vUv - 0.5) * uSize;
  float d = sdRoundRect(p, uSize * 0.5 - 0.035, uRadius);
  float inside = 1.0 - smoothstep(-0.006, 0.0, d);

  float q = clamp(uCharge, 0.0, 1.0);
  float filled;
  float meniscus = 0.0;
  float boundary = q;
  if (q <= 0.0) {
    filled = 0.0;
  } else if (q >= 1.0) {
    filled = 1.0;
  } else {
    // soft meniscus whose amplitude vanishes toward both endpoints
    float amp = 0.011 * smoothstep(0.0, 0.08, q) * (1.0 - smoothstep(0.92, 1.0, q));
    boundary = q + amp * (0.6 * sin(vUv.x * 17.0 + uTime * 2.6) + 0.4 * sin(vUv.x * 29.0 - uTime * 3.9));
    filled = 1.0 - smoothstep(boundary - 0.0035, boundary + 0.0035, vUv.y);
    meniscus = exp(-pow((vUv.y - boundary) / 0.010, 2.0)) * (1.0 - smoothstep(0.985, 1.0, q));
  }
  filled *= inside;
  meniscus *= inside;

  // fine rising filaments inside the energized region
  float fil = pow(abs(sin(vUv.x * 46.0 + sin(vUv.y * 9.0 - uTime * 1.6) * 1.8)), 36.0);
  fil += 0.6 * pow(abs(sin(vUv.x * 23.0 - 1.3 + sin(vUv.y * 5.0 + uTime * 1.1) * 2.4)), 48.0);
  fil *= filled * (0.45 + 0.55 * smoothstep(0.0, 0.25, boundary - vUv.y + 0.25));

  // stronger edge light just inside the rounded border
  float edge = (1.0 - smoothstep(0.0, 0.07, -d)) * filled;

  // normal-blended tint keeps the artwork readable
  float a = filled * (0.36 + 0.04 * fil);
  vec3 color = uTint * a;
  vec3 emissive = uHot * (meniscus * 2.4 + edge * 0.55 + fil * 0.16);

  // release pulse on a real fire event (bounded, decays in simulation time)
  // edge-weighted so the artwork never washes out
  emissive += uHot * uPulse * (0.22 * inside + 1.2 * (1.0 - smoothstep(0.0, 0.09, -d)) * inside);
  a = max(a, uPulse * 0.18 * inside);

  // selection / inspection outline (presentation only)
  float ring = (1.0 - smoothstep(0.0, 0.028, abs(d + 0.012))) * uSelect;
  emissive += uSelectColor * ring * 1.6;
  a = max(a, ring * 0.6);

  gl_FragColor = vec4((color + emissive) * uDim, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function L_(i,e){const t={uCharge:{value:0},uPulse:{value:0},uTime:{value:0},uSelect:{value:0},uDim:{value:1},uSize:{value:new ae(i,e)},uRadius:{value:.16},uTint:{value:new we(3122588)},uHot:{value:new we(9434602)},uSelectColor:{value:new we(15914906)}},n=new St({uniforms:t,vertexShader:P_,fragmentShader:I_,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,toneMapped:!0});return n.name="cardCharge",n}const Hn=new Zt().setFromEuler(new It(-Math.PI/2,0,0)),D_=new Zt().setFromEuler(new It(-Math.PI/2-wt.tilt,0,0)),Qc=Rt+.85;function jc(i,e,t){const n=new _s,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function U_(i,e,t){const n=i.attributes.uv;for(let s=0;s<n.count;s++)n.setXY(s,(n.getX(s)+e/2)/e,(n.getY(s)+t/2)/t)}class N_{root=new un;cards=new Map;faceMats=new Map;faceTextures=new Map;bodyGeo;faceGeo;edgeMat;shadowGeo;shadowMat;renderer;dimLevel=1;shared=[];rail;railLevel=0;railTarget=0;constructor(e){this.renderer=e;const t=jc(Ci,Vn,.16);this.bodyGeo=new nr(t,{depth:os,bevelEnabled:!0,bevelThickness:.012,bevelSize:.018,bevelSegments:2,curveSegments:8}),this.bodyGeo.translate(0,0,-os/2),this.faceGeo=new Ii(jc(Ci-.02,Vn-.02,.15),8),U_(this.faceGeo,Ci-.02,Vn-.02);const n=Jn(a_(),e);this.edgeMat=new ct({map:n,color:16777215,roughness:.55,metalness:.35}),this.shadowGeo=new Bt(Ci*1.25,Vn*1.2);const s=Jn(oa("rgba(0,0,0,0.55)","rgba(0,0,0,0)",128),e);this.shadowMat=new Ct({map:s,transparent:!0,depthWrite:!1}),this.shared.push(this.bodyGeo,this.faceGeo,this.edgeMat,n,this.shadowGeo,this.shadowMat,s);const r=new ct({color:13151088,metalness:.85,roughness:.36}),a=new ct({color:1714246,metalness:.1,roughness:.3}),o=new Cn(wt.spacing*3+.6,.18,.55,3,.07),l=new Cn(wt.spacing*3+.2,.04,.22,2,.02);this.rail=new un;const c=new Ne(o,r);c.castShadow=!0;const h=new Ne(l,a);h.position.y=.09,this.rail.add(c,h);const d=Vn*wt.scale/2;this.rail.position.set(0,-1,wt.z+d*Math.cos(wt.tilt)+.1),this.rail.visible=!1,this.root.add(this.rail),this.shared.push(r,a,o,l)}setTray(e){this.railTarget=e?1:0}faceMaterial(e){let t=this.faceMats.get(e);if(!t){const n=Jn(s_(e),this.renderer);this.faceTextures.set(e,n),t=new ct({map:n,color:14275268,roughness:.72,metalness:0}),this.faceMats.set(e,t)}return t}prepare(e){for(const t of e)this.faceMaterial(t)}create(e,t){const n=new un,s=new Ne(this.bodyGeo,this.edgeMat);s.castShadow=!0,s.receiveShadow=!0;const r=new Ne(this.faceGeo,this.faceMaterial(t));r.position.z=os/2+.013,r.receiveShadow=!0;const a=L_(Ci-.02,Vn-.02),o=new Ne(this.faceGeo,a);o.position.z=os/2+.018,o.renderOrder=2;const l=new Ne(this.shadowGeo,this.shadowMat);l.position.z=-os/2-.004,l.renderOrder=1,n.add(l,s,r,o),s.userData.cardKey=e,r.userData.cardKey=e,this.root.add(n);const c={key:e,defId:t,group:n,body:s,overlay:o,overlayMat:a,mode:"tray",instanceId:null,offerIndex:null,slot:null,pos:new C,vel:new C,target:new C,quat:Hn.clone(),targetQuat:Hn.clone(),scale:1,targetScale:1,stiffness:300,damping:24,hover:0,hoverTarget:0,select:0,selectTarget:0,lastFireAt:-100,life:0,delay:0,landed:!0};return this.cards.set(e,c),c}destroy(e){this.root.remove(e.group),e.overlayMat.dispose(),this.cards.delete(e.key)}socketTarget(e){const t=Li(e);return new C(t.x,Hv,t.z)}trayTarget(e){return new C((e-1)*wt.spacing,wt.y,wt.z)}syncEquipped(e,t=!1){const n=new Set;for(const s of e){if(!s)continue;n.add(s.id);const r=`w${s.id}`;let a=this.cards.get(r);a||(a=this.create(r,s.defId),a.instanceId=s.id,a.slot=s.slot,a.mode="socket",a.pos.copy(this.socketTarget(s.slot)),t||(a.pos.y+=1.2)),a.mode==="socket"&&(a.slot=s.slot,a.target.copy(this.socketTarget(s.slot)),a.targetQuat.copy(Hn),a.targetScale=1)}for(const s of[...this.cards.values()])s.instanceId!==null&&!n.has(s.instanceId)&&s.mode==="socket"&&this.discard(s)}discard(e){e.mode="discard",e.life=0,e.target.set(e.pos.x,e.pos.y+2.2,e.pos.z-.6),e.stiffness=60,e.damping=10}presentOffer(e){this.clearOffers(!0),e.forEach((t,n)=>{const s=this.create(`o${n}`,t);s.offerIndex=n,s.mode="tray",s.pos.set(hn.x,hn.y+.3+n*.05,hn.z),s.quat.copy(Hn),s.scale=.72,s.delay=.12+n*.11,s.stiffness=140,s.damping=19,this.toTray(s)})}toTray(e){e.mode="tray",e.target.copy(this.trayTarget(e.offerIndex??0)),e.targetQuat.copy(D_),e.targetScale=wt.scale,e.stiffness=170,e.damping=22}offerView(e){return this.cards.get(`o${e}`)}equippedView(e){return this.cards.get(`w${e}`)}returnOffer(e){const t=this.offerView(e);t&&t.mode!=="consume"&&this.toTray(t)}startDrag(e){const t=this.offerView(e);t&&(t.mode="drag",t.targetScale=1,t.targetQuat.copy(Hn),t.stiffness=600,t.damping=45)}dragTo(e,t){const n=this.offerView(e);if(!n||n.mode!=="drag")return;n.target.set(t.x,Qc,t.z);const s=Js.clamp((t.x-n.pos.x)*.25,-.12,.12),r=Js.clamp((t.z-n.pos.z)*.25,-.12,.12);n.targetQuat.copy(Hn).multiply(new Zt().setFromEuler(new It(-r,s,0)))}dragPlaneY(){return Qc}commitOffer(e,t,n){const s=this.offerView(e);s&&(this.cards.delete(s.key),s.key=`w${t.id}`,s.body.userData.cardKey=s.key,this.cards.set(s.key,s),s.offerIndex=null,s.instanceId=t.id,s.slot=t.slot,s.mode="socket",s.landed=!1,s.onLand=n,s.target.copy(this.socketTarget(t.slot)),s.targetQuat.copy(Hn),s.targetScale=1,s.stiffness=330,s.damping=23,s.selectTarget=0,this.dismissOffers())}consumeBoon(e){const t=this.offerView(e);t&&(t.mode="consume",t.life=0,t.target.set(At.x,At.y+.6,At.z),t.targetQuat.copy(Hn),t.targetScale=.4,t.stiffness=90,t.damping=16,this.dismissOffers())}dismissOffers(){for(const e of this.cards.values())e.offerIndex!==null&&e.mode!=="consume"&&e.mode!=="drag"&&(e.mode="returning",e.life=0,e.target.set(hn.x,hn.y+.3,hn.z),e.targetQuat.copy(Hn),e.targetScale=.7,e.stiffness=110,e.damping=18)}clearOffers(e=!1){for(const t of[...this.cards.values()])(t.offerIndex!==null||t.mode==="returning"||t.mode==="consume")&&(e?this.destroy(t):this.dismissOffers())}setSelected(e){for(const t of this.cards.values())t.offerIndex!==null&&(t.selectTarget=t.offerIndex===e?1:0)}setHover(e,t){for(const n of this.cards.values()){const s=n.key===e;n.hoverTarget=s&&t?1:0,n.offerIndex===null&&n.mode==="socket"&&(n.selectTarget=s?.7:0)}}onFire(e,t){const n=this.equippedView(e);n&&(n.lastFireAt=t)}setDim(e){this.dimLevel=e}pickables(e){const t=[];for(const n of this.cards.values())e==="offers"&&(n.offerIndex===null||n.mode==="drag")||e==="equipped"&&n.mode!=="socket"||t.push(n.body);return t}cardByObject(e){const t=e.userData.cardKey;return t?this.cards.get(t):void 0}update(e,t,n){const s=Math.min(e,.1);this.railLevel+=(this.railTarget-this.railLevel)*(1-Math.exp(-s*7)),this.rail.visible=this.railLevel>.01;const r=Vn*wt.scale/2,a=wt.y-r*Math.sin(.62)-.1;this.rail.position.y=-.8+(a+.8)*this.railLevel;for(const o of[...this.cards.values()]){if(o.delay>0){o.delay-=s,o.group.position.copy(o.pos),o.group.quaternion.copy(o.quat),o.group.scale.setScalar(o.scale),o.group.visible=!0;continue}const l=Math.max(1,Math.ceil(s/(1/240))),c=s/l;for(let S=0;S<l;S++)o.vel.x+=(-(o.pos.x-o.target.x)*o.stiffness-o.vel.x*o.damping)*c,o.vel.y+=(-(o.pos.y-o.target.y)*o.stiffness-o.vel.y*o.damping)*c,o.vel.z+=(-(o.pos.z-o.target.z)*o.stiffness-o.vel.z*o.damping)*c,o.pos.addScaledVector(o.vel,c);const h=1-Math.exp(-s*(o.mode==="drag"?22:12));o.quat.slerp(o.targetQuat,h),o.scale+=(o.targetScale-o.scale)*h,o.hover+=(o.hoverTarget-o.hover)*(1-Math.exp(-s*16)),o.select+=(o.selectTarget-o.select)*(1-Math.exp(-s*14));const d=t-o.lastFireAt,u=d>=0&&d<.3?1-d/.3:0,f=d>=0&&d<.22?Math.sin(d/.22*Math.PI):0;o.group.position.copy(o.pos),o.group.position.y+=o.hover*.15-f*.035,o.group.quaternion.copy(o.quat),o.hover>.001&&o.group.quaternion.multiply(new Zt().setFromEuler(new It(o.hover*.09,0,o.hover*.02))),f>0&&o.group.quaternion.multiply(new Zt().setFromEuler(new It(-f*.05,0,0))),o.group.scale.setScalar(o.scale);const g=o.overlayMat.uniforms;if(g.uTime.value=t,g.uSelect.value=o.select,g.uDim.value=o.offerIndex!==null?1:this.dimLevel,o.instanceId!==null&&o.mode==="socket"?(g.uCharge.value=n.get(o.instanceId)??0,g.uPulse.value=u):(g.uCharge.value=0,g.uPulse.value=0),o.mode==="socket"&&!o.landed&&o.pos.distanceTo(o.target)<.04&&(o.landed=!0,o.onLand?.(),o.onLand=void 0),o.mode==="discard"||o.mode==="consume"||o.mode==="returning"){o.life+=s;const S=o.mode==="returning"?.5:.45,p=Math.min(1,o.life/S);o.mode!=="returning"?o.group.scale.setScalar(o.scale*(1-p*p)):p>.7&&o.group.scale.setScalar(o.scale*(1-(p-.7)/.3)),p>=1&&this.destroy(o)}}}reset(){for(const e of[...this.cards.values()])this.destroy(e)}socketWorld(e){return this.socketTarget(e)}trayWorld(e){const t=this.offerView(e);return t?t.group.position.clone():this.trayTarget(e)}offersSettled(){const e=[...this.cards.values()].filter(t=>t.offerIndex!==null);return e.length>0&&e.every(t=>t.delay<=0&&t.pos.distanceTo(t.target)<.03&&t.vel.length()<.05)}liveCount(){return this.cards.size}dispose(){this.reset();for(const e of this.faceMats.values())e.dispose();for(const e of this.faceTextures.values())e.dispose();this.faceMats.clear(),this.faceTextures.clear();for(const e of this.shared)e.dispose()}static describe(e){return Ms(e).name}}const Gn=160,F_={echo:1.12,moth:1.35,urn:1.12},wn=new tt,eh=new tt,th=new tt,nh=new Zt,ih=new It,Xs=new C,ea=new C,qa=new we(1,1,1),O_=new we(2.4,2.1,1.9),Ds=new we;function Jt(i,e,t,n,s,r,a,o=1,l=o,c=o){return ih.set(s,r,a,"YXZ"),nh.setFromEuler(ih),Xs.set(e,t,n),ea.set(o,l,c),i.compose(Xs,nh,ea)}class B_{root=new un;arch=new Map;visuals=new Map;blob;hpBack;hpFill;blobFree=[];disposables=[];hpCount=0;constructor(e){const t=q=>(this.disposables.push(q),q),n=t(Jn(m_(),e)),s=t(new ct({color:15327689,map:n,roughness:.38,side:jt})),r=t(new ct({color:12756074,metalness:.85,roughness:.35})),a=t(new ct({color:790296,roughness:.5})),o=t(new ct({color:7044267,emissive:1714762,roughness:.8,transparent:!0,opacity:.7,side:jt,depthWrite:!1})),l=t(new ct({color:2303544,metalness:.35,roughness:.14,emissive:932410,emissiveIntensity:.6})),c=t(Jn(p_(),e)),h=t(new ct({map:c,roughness:.7,side:jt,transparent:!0,opacity:.96})),d=t(new ct({color:14274483,map:n,roughness:.5})),u=t(new ct({color:1911372,roughness:.28,metalness:.25})),f=t(new ct({color:9202228,metalness:.9,roughness:.32})),g=(q,te,Me=!1)=>{t(q);const W=new In(q,te,Gn);return W.instanceMatrix.setUsage(pi),W.setColorAt(0,qa),W.count=0,W.castShadow=!1,W.geometry.boundingSphere=new jn(new C(0,1,0),16),W.frustumCulled=!1,this.root.add(W),W},S=new Pi(.3,24,16,Math.PI*.08,Math.PI*.84,Math.PI*.06,Math.PI*.84);S.scale(1.12,1.4,.78);const p=[],m=[[.015,0],[.06,.1],[.15,.3],[.26,.55],[.33,.76],[.31,.9],[.2,.99]];for(const[q,te]of m)p.push(new ae(q,te));const M=new ds(p,28);{const q=M.attributes.position;for(let te=0;te<q.count;te++){const Me=q.getX(te),W=q.getY(te),re=q.getZ(te),he=Math.atan2(re,Me),ce=1+.16*Math.sin(he*7)*(1-Math.min(1,W/.75));q.setXYZ(te,Me*ce,W,re*ce)}M.computeVertexNormals()}const w=new Pi(.075,12,8);w.scale(1.55,.8,.45),w.translate(-.12,.07,.2);const x=w.clone();x.translate(.24,0,0);const T=new xn(.12,.022,.03);T.translate(0,-.17,.205);const b=Xo([w,x,T]);[w,x,T].forEach(q=>q.dispose());const R=new sn(.2,.028,8,24);R.rotateX(Math.PI/2);const _=new sn(.24,.018,6,32);_.rotateX(Math.PI/2);const E=(q,te)=>Math.sin(q*2.1+te)*.06;this.addArch("echo",[{mesh:g(M,o),local:(q,te,Me)=>Jt(q,0,.12+E(te,Me)*.5,0,Math.sin(te*2.1+Me)*.06,Math.sin(te*1.3+Me)*.3,0,1,1+Math.sin(te*4.2+Me)*.04)},{mesh:g(R,r),local:(q,te,Me)=>Jt(q,0,1.03+E(te,Me),0,0,0,0)},{mesh:g(S,s,!0),local:(q,te,Me,W)=>Jt(q,0,1.3+E(te,Me),.03,-.42-W*.3,0,Math.sin(te*1.7+Me)*.08)},{mesh:g(b,a),local:(q,te,Me,W)=>Jt(q,0,1.3+E(te,Me),.03,-.42-W*.3,0,Math.sin(te*1.7+Me)*.08,1.12,1.4,.78)},{mesh:g(_,r),local:(q,te,Me)=>Jt(q,0,1.78+E(te,Me)*1.2,-.05,-.35,te*.6+Me,0)}]);const I=new Pi(.16,20,14),D=new _s;D.moveTo(0,0),D.bezierCurveTo(.18,.32,.5,.42,.62,.22),D.bezierCurveTo(.66,.08,.5,.02,.38,0),D.bezierCurveTo(.5,-.08,.48,-.3,.3,-.34),D.bezierCurveTo(.16,-.32,.06,-.16,0,0);const F=new Ii(D,10);F.rotateX(Math.PI/2);{const q=F.attributes.uv;for(let te=0;te<q.count;te++)q.setXY(te,q.getX(te)/.66,(q.getY(te)+.34)/.76)}const G=new sn(.24,.012,6,32),N=(q,te)=>Math.sin(q*22+te*3),B=(q,te)=>.85+Math.sin(q*5+te)*.09;this.addArch("moth",[{mesh:g(I,l,!0),local:(q,te,Me,W)=>Jt(q,0,B(te,Me),0,0,0,0,1-W*.15)},{mesh:g(F,h),local:(q,te,Me)=>Jt(q,.06,B(te,Me),0,0,.15,.25+N(te,Me)*.85)},{mesh:g(F.clone(),h),local:(q,te,Me)=>Jt(q,-.06,B(te,Me),0,0,-.15,-(.25+N(te,Me)*.85),-1,1,1)},{mesh:g(G,r),local:(q,te,Me)=>Jt(q,0,B(te,Me),0,Math.PI/2+.4,te*2+Me,0)}]);const K=[[0,0],[.26,0],[.28,.06],[.22,.12],[.36,.3],[.48,.52],[.46,.72],[.32,.9],[.24,.98],[.27,1.04],[0,1.04]].map(([q,te])=>new ae(q,te)),V=new ds(K,30),se=new sn(.49,.055,8,32);se.rotateX(Math.PI/2),se.translate(0,.58,0);const X=new sn(.4,.045,8,32);X.rotateX(Math.PI/2),X.translate(0,.32,0);const j=new sn(.26,.03,8,24);j.rotateX(Math.PI/2),j.translate(0,.96,0);const ie=Xo([se,X,j]);[se,X,j].forEach(q=>q.dispose());const Ce=[[0,.14],[.08,.14],[.06,.1],[.18,.07],[.3,.02],[.3,0],[0,0]].map(([q,te])=>new ae(q,te)),Te=new ds(Ce,24),Qe=new Pi(.07,10,8);Qe.translate(0,.2,0);const qe=Qe,Ye=(q,te)=>Math.sin(q*2.6+te),$=(q,te,Me,W,re=0,he=0,ce=1)=>Jt(q,0,re+Math.abs(Ye(te,Me))*.05,0,he-W*.12,0,Ye(te,Me)*.09,ce,ce*(1-W*.08),ce);this.addArch("urn",[{mesh:g(V,d,!0),local:(q,te,Me,W)=>$(q,te,Me,W)},{mesh:g(ie,f),local:(q,te,Me,W)=>$(q,te,Me,W)},{mesh:g(Te,u,!0),local:(q,te,Me,W)=>{$(q,te,Me,W);const re=Math.max(0,Math.sin(te*5.2+Me))*.03+W*.08;return q.multiply(Jt(wn,0,1.03+re,0,re*.6,0,0))}},{mesh:g(qe,r),local:(q,te,Me,W)=>{$(q,te,Me,W);const re=Math.max(0,Math.sin(te*5.2+Me))*.03+W*.08;return q.multiply(Jt(wn,0,1.03+re,0,re*.6,0,0))}}]);const ne=t(Jn(oa("rgba(0,0,0,0.6)","rgba(0,0,0,0)",64),e)),ge=t(new Bt(1,1));ge.rotateX(-Math.PI/2),this.blob=new In(ge,t(new Ct({map:ne,transparent:!0,depthWrite:!1})),Gn*3),this.blob.count=0,this.blob.frustumCulled=!1,this.blob.renderOrder=1,this.root.add(this.blob);for(let q=Gn*3-1;q>=0;q--)this.blobFree.push(q);const Fe=t(new Bt(1,1));Fe.translate(.5,0,0),this.hpBack=new In(Fe,t(new Ct({color:658710,transparent:!0,opacity:.8,depthWrite:!1})),Gn),this.hpFill=new In(Fe,t(new Ct({color:16777215,depthWrite:!1,transparent:!0})),Gn);for(const q of[this.hpBack,this.hpFill])q.count=0,q.frustumCulled=!1,q.renderOrder=5,q.instanceMatrix.setUsage(pi),this.root.add(q);this.hpFill.setColorAt(0,qa)}addArch(e,t){const n=[];for(let s=Gn-1;s>=0;s--)n.push(s);this.arch.set(e,{kind:e,parts:t,free:n,high:0,map:new Map})}onEvent(e){if(e.type==="damaged"){const t=this.visuals.get(e.enemyId);t&&(t.lastHitAt=e.t,t.hp=e.hp,e.source==="bell"&&(t.liftAt=e.t))}else if(e.type==="died"){const t=this.visuals.get(e.enemyId);t&&(t.diedAt=e.t,t.x=e.x,t.z=e.z)}else if(e.type==="arrived"){const t=this.visuals.get(e.enemyId);t&&(t.diedAt=e.t,t.arrived=!0,t.x=e.x,t.z=e.z)}}acquire(e,t){const n=this.arch.get(e);let s=n.map.get(t);if(s===void 0){if(s=n.free.pop(),s===void 0)return-1;n.map.set(t,s),n.high=Math.max(n.high,s+1)}return s}release(e,t){const n=this.arch.get(e),s=n.map.get(t);if(s!==void 0){n.map.delete(t),n.free.push(s);for(const r of n.parts)r.mesh.setMatrixAt(s,wn.makeScale(0,0,0)),r.mesh.instanceMatrix.needsUpdate=!0}}instanceIndexOf(e,t){return this.arch.get(e).map.get(t)}update(e,t,n,s){for(const o of this.visuals.values())o.seen=!1;for(const o of e){let l=this.visuals.get(o.id);l||(l={id:o.id,kind:o.kind,x:o.x,z:o.z,hp:o.hp,maxHp:o.maxHp,radius:o.radius,phase:o.id*2.399%(Math.PI*2),lastHitAt:-100,liftAt:-100,diedAt:null,arrived:!1,seen:!0},this.visuals.set(o.id,l)),l.seen=!0,l.x=o.prevX+(o.x-o.prevX)*t,l.z=o.prevZ+(o.z-o.prevZ)*t,l.hp=o.hp}const r=s.quaternion;let a=0;this.hpCount=0;for(const o of[...this.visuals.values()]){!o.seen&&o.diedAt===null&&(o.diedAt=n);let l=0;if(o.diedAt!==null){const b=o.arrived?.32:.42;if(l=Math.min(1,Math.max(0,(n-o.diedAt)/b)),l>=1){this.release(o.kind,o.id),this.visuals.delete(o.id);continue}}const c=this.acquire(o.kind,o.id);if(c<0)continue;const h=this.arch.get(o.kind),d=n-o.lastHitAt,u=d>=0&&d<.12?1-d/.12:0,f=Math.atan2(-o.x,-o.z),g=o.arrived?l*.6:-l*.5,S=(1-l*l)*(1+u*.06)*F_[o.kind],p=o.arrived?0:l*2.5,m=u*.08,M=-Math.sin(f)*m,w=-Math.cos(f)*m,x=n-o.liftAt,T=x>=0&&x<.45?Math.sin(x/.45*Math.PI)*.28:0;Jt(eh,o.x+M,-g+T,o.z+w,0,f+p,0,S);for(const b of h.parts)b.local(th,n,o.phase,u),wn.multiplyMatrices(eh,th),b.mesh.setMatrixAt(c,wn),Ds.copy(qa).lerp(O_,u),o.arrived&&Ds.lerp(new we(2.2,.9,.8),Math.min(1,l*1.5)),b.mesh.setColorAt(c,Ds);if(a<Gn*3){const b=o.radius*2.4*(1-l);this.blob.setMatrixAt(a++,Jt(wn,o.x,.012,o.z,0,0,0,b,1,b))}if(o.diedAt===null&&o.hp<o.maxHp&&this.hpCount<Gn){const b=Math.max(0,o.hp/o.maxHp),R=o.kind==="urn"||o.kind==="moth"?1.6:2,_=o.kind==="urn"?.9:.62;Xs.set(o.x,R,o.z);const E=new C(-_/2,0,0).applyQuaternion(r);wn.compose(Xs.clone().add(E),r,ea.set(_,.07,1)),this.hpBack.setMatrixAt(this.hpCount,wn),wn.compose(Xs.clone().add(E).add(new C(0,0,.001).applyQuaternion(r)),r,ea.set(_*b,.07,1)),this.hpFill.setMatrixAt(this.hpCount,wn),Ds.setHex(b>.5?15260856:14844276),this.hpFill.setColorAt(this.hpCount,Ds),this.hpCount++}}for(const o of this.arch.values())for(const l of o.parts)l.mesh.count=o.high,l.mesh.instanceMatrix.needsUpdate=!0,l.mesh.instanceColor&&(l.mesh.instanceColor.needsUpdate=!0);this.blob.count=a,this.blob.instanceMatrix.needsUpdate=!0,this.hpBack.count=this.hpCount,this.hpFill.count=this.hpCount,this.hpBack.instanceMatrix.needsUpdate=!0,this.hpFill.instanceMatrix.needsUpdate=!0,this.hpFill.instanceColor&&(this.hpFill.instanceColor.needsUpdate=!0)}positionOf(e){const t=this.visuals.get(e);return t?{x:t.x,z:t.z,kind:t.kind}:null}liveVisuals(){return this.visuals.size}reset(){for(const e of[...this.visuals.values()])this.release(e.kind,e.id);this.visuals.clear();for(const e of this.arch.values()){e.high=0,e.free.length=0;for(let t=Gn-1;t>=0;t--)e.free.push(t);e.map.clear();for(const t of e.parts)t.mesh.count=0}this.blob.count=0,this.hpBack.count=0,this.hpFill.count=0}dispose(){for(const e of this.arch.values())for(const t of e.parts)t.mesh.dispose();this.blob.dispose(),this.hpBack.dispose(),this.hpFill.dispose();for(const e of this.disposables)e.dispose()}}const Xr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ys{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const z_=new rr(-1,1,1,-1,0,1);class k_ extends vt{constructor(){super(),this.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new it([0,2,0,0,2,0],2))}}const H_=new k_;class yl{constructor(e){this._mesh=new Ne(H_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,z_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class G_ extends ys{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ir.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new yl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class sh extends ys{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class V_ extends ys{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class W_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ae);this._width=n.width,this._height=n.height,t=new kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Yt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new G_(Xr),this.copyPass.material.blending=Ln,this.timer=new Af}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}sh!==void 0&&(a instanceof sh?n=!0:a instanceof V_&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class X_ extends ys{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new we}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const q_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new we(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class vs extends ys{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ae(e.x,e.y):new ae(256,256),this.clearColor=new we(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new kt(r,a,{type:Yt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new kt(r,a,{type:Yt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new kt(r,a,{type:Yt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=q_;this.highPassUniforms=ir.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new St({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ae(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ir.clone(Xr.uniforms),this.blendMaterial=new St({uniforms:this.copyUniforms,vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,premultipliedAlpha:!0,blending:Rn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new we,this._oldClearAlpha=1,this._basic=new Ct,this._fsQuad=new yl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ae(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=vs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=vs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<e;a+=2){const o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new St({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ae(.5,.5)},direction:{value:new ae(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new St({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}vs.BlurDirectionX=new ae(1,0);vs.BlurDirectionY=new ae(0,1);const Br={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Y_ extends ys{constructor(){super(),this.isOutputPass=!0,this.uniforms=ir.clone(Br.uniforms),this.material=new Fh({name:Br.name,uniforms:this.uniforms,vertexShader:Br.vertexShader,fragmentShader:Br.fragmentShader}),this._fsQuad=new yl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Zo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===$o?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ko?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ta?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===jo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Jo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Z_ extends Sh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new xn;e.deleteAttribute("uv");const t=new ct({side:qt}),n=new ct,s=new zh(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ne(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new In(e,n,6),o=new yt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Ne(e,ss(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Ne(e,ss(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Ne(e,ss(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new Ne(e,ss(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new Ne(e,ss(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new Ne(e,ss(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ss(i){return new xf({color:0,emissive:16777215,emissiveIntensity:i})}const rh={high:{maxPixelRatio:1.5,shadowMapSize:2048,bloom:!0,bloomStrength:.3,msaaSamples:4,particleBudget:1200,dustCount:260},low:{maxPixelRatio:1,shadowMapSize:1024,bloom:!1,bloomStrength:0,msaaSamples:0,particleBudget:500,dustCount:90}},ah={void:329743},Ya=Js.degToRad(57),oh=Js.degToRad(9),$_=60;class K_{renderer;scene=new Sh;camera;composer;bloom;output;sun;hemi;quality="high";settings=rh.high;reducedMotion=!1;envTarget;renderTarget;canvas;width=1;height=1;frustumFrom={left:-1,right:1,top:1,bottom:-1};frustumTo={left:-1,right:1,top:1,bottom:-1};frustumT=1;impulse=new ae;impulseAge=1;impulseDuration=.12;impulseStrength=0;fitPoints=[];fitInsets={top:0,right:0,bottom:0,left:0};camRight=new C;camUp=new C;camPos=new C;baseLightIntensity=2.1;dimTarget=1;dim=1;constructor(e){if(this.canvas=e,this.renderer=new wv({canvas:e,antialias:!1,powerPreference:"high-performance",alpha:!1}),!this.renderer.capabilities.isWebGL2)throw new Error("WebGL2 unavailable");this.renderer.outputColorSpace=Qt,this.renderer.toneMapping=ta,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Os,this.renderer.setClearColor(ah.void,1),this.renderer.info.autoReset=!1,this.scene.background=new we(ah.void);const t=new zo(this.renderer),n=new Z_;this.envTarget=t.fromScene(n,.04),n.dispose(),t.dispose(),this.scene.environment=this.envTarget.texture,this.scene.environmentIntensity=.32,this.camera=new rr(-10,10,10,-10,1,140);const s=new C(Math.sin(oh)*Math.cos(Ya),Math.sin(Ya),Math.cos(oh)*Math.cos(Ya));this.camera.position.copy(s.multiplyScalar($_)),this.camera.lookAt(0,0,0),this.camera.updateMatrixWorld(),this.camRight.setFromMatrixColumn(this.camera.matrixWorld,0),this.camUp.setFromMatrixColumn(this.camera.matrixWorld,1),this.camPos.copy(this.camera.position),this.hemi=new yf(9413576,2760472,.55),this.scene.add(this.hemi),this.sun=new gc(16773596,this.baseLightIntensity),this.sun.position.set(-7,16,9),this.sun.target.position.set(0,0,0),this.sun.castShadow=!0;const r=this.sun.shadow.camera;r.left=-7.5,r.right=7.5,r.top=7.5,r.bottom=-7.5,r.near=4,r.far=40,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.025,this.sun.shadow.radius=3,this.scene.add(this.sun,this.sun.target);const a=new gc(7321814,.5);a.position.set(8,6,-12),this.scene.add(a),this.renderTarget=new kt(1,1,{type:Yt,samples:4}),this.renderTarget.texture.name="palimpsest.hdr",this.composer=new W_(this.renderer,this.renderTarget),this.composer.addPass(new X_(this.scene,this.camera)),this.bloom=new vs(new ae(256,256),.3,.28,1.1),this.composer.addPass(this.bloom),this.output=new Y_,this.composer.addPass(this.output),this.applyQuality("high")}applyQuality(e){this.quality=e,this.settings=rh[e],this.bloom.enabled=this.settings.bloom,this.bloom.strength=this.settings.bloomStrength;const t=this.settings.shadowMapSize;this.sun.shadow.mapSize.x!==t&&(this.sun.shadow.mapSize.set(t,t),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null);for(const n of[this.composer.renderTarget1,this.composer.renderTarget2])n.samples!==this.settings.msaaSamples&&(n.samples=this.settings.msaaSamples,n.dispose());this.resize()}pixelRatio(){return Math.min(window.devicePixelRatio||1,this.settings.maxPixelRatio)}resize(){const e=this.canvas.getBoundingClientRect();this.width=Math.max(1,Math.round(e.width)),this.height=Math.max(1,Math.round(e.height));const t=this.pixelRatio();this.renderer.setPixelRatio(t),this.renderer.setSize(this.width,this.height,!1),this.composer.setPixelRatio(t),this.composer.setSize(this.width,this.height),this.refit(!0)}get viewport(){return{width:this.width,height:this.height}}setFit(e,t,n=!1){this.fitPoints=e,this.fitInsets=t,this.refit(n)}computeFrustum(){const e=this.fitPoints;if(e.length===0)return{left:-10,right:10,top:10,bottom:-10};let t=1/0,n=-1/0,s=1/0,r=-1/0;const a=new C;for(const M of e){a.copy(M).sub(this.camPos);const w=a.dot(this.camRight),x=a.dot(this.camUp);t=Math.min(t,w),n=Math.max(n,w),s=Math.min(s,x),r=Math.max(r,x)}const o=this.fitInsets,l=12,c=Math.max(50,this.width-o.left-o.right-l*2),h=Math.max(50,this.height-o.top-o.bottom-l*2),d=Math.min(c/(n-t),h/(r-s)),u=o.left+l+c/2,f=o.top+l+h/2,g=(t+n)/2,S=(s+r)/2,p=g-u/d,m=S+f/d;return{left:p,right:p+this.width/d,top:m,bottom:m-this.height/d}}refit(e){const t=this.computeFrustum();e?(this.frustumFrom=t,this.frustumTo=t,this.frustumT=1):(this.frustumFrom=this.currentFrustum(),this.frustumTo=t,this.frustumT=0),this.applyFrustum()}currentFrustum(){const e=J_(this.frustumT),t=this.frustumFrom,n=this.frustumTo;return{left:t.left+(n.left-t.left)*e,right:t.right+(n.right-t.right)*e,top:t.top+(n.top-t.top)*e,bottom:t.bottom+(n.bottom-t.bottom)*e}}applyFrustum(){const e=this.currentFrustum();let t=0,n=0;if(this.impulseAge<this.impulseDuration&&!this.reducedMotion){const s=1-this.impulseAge/this.impulseDuration,r=Math.sin(this.impulseAge*90)*s*s*this.impulseStrength;t=this.impulse.x*r,n=this.impulse.y*r}this.camera.left=e.left+t,this.camera.right=e.right+t,this.camera.top=e.top+n,this.camera.bottom=e.bottom+n,this.camera.updateProjectionMatrix()}kick(e,t=110){if(this.reducedMotion)return;const n=Math.random()*Math.PI*2;this.impulse.set(Math.cos(n),Math.sin(n)),this.impulseStrength=Math.max(this.impulseAge<this.impulseDuration?this.impulseStrength:0,e),this.impulseDuration=Js.clamp(t,80,140)/1e3,this.impulseAge=0}setDim(e){this.dimTarget=e}update(e){this.frustumT<1&&(this.frustumT=Math.min(1,this.frustumT+e/.55)),this.impulseAge+=e,this.applyFrustum(),this.dim+=(this.dimTarget-this.dim)*(1-Math.exp(-e*5)),this.sun.intensity=this.baseLightIntensity*this.dim,this.hemi.intensity=.55*(.7+.3*this.dim)}render(){this.composer.render()}project(e){const t=e.clone().project(this.camera);return{x:(t.x*.5+.5)*this.width,y:(-t.y*.5+.5)*this.height}}dispose(){this.composer.dispose(),this.renderTarget.dispose(),this.envTarget.dispose(),this.bloom.dispose(),this.output.dispose(),this.sun.shadow.map?.dispose(),this.renderer.dispose()}}function J_(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function Q_(i){if(!new URLSearchParams(location.search).has("dev"))return;const t=s=>{const r=i.rig.project(s),a=i.rig.renderer.domElement.getBoundingClientRect();return{x:Math.round(r.x+a.left),y:Math.round(r.y+a.top)}},n={snapshot(){const s=i.controller,r=s.sim;return{phase:s.phase,suspended:s.suspended,seed:s.seed,tick:r.tick,simTime:r.simTime,trialIndex:r.trialIndex,trialTime:r.trialTime,clearing:r.clearing,hp:r.baseHp,kills:r.kills,arrivals:r.arrivals,spawnProgress:r.spawnProgress,polishStacks:r.polishStacks,enemies:r.enemies.map(a=>({id:a.id,kind:a.kind,x:a.x,z:a.z,hp:a.hp})),projectiles:r.projectiles.map(a=>({id:a.id,x:a.x,z:a.z,life:a.life})),slots:r.slots.map(a=>a?{id:a.id,defId:a.defId,slot:a.slot,elapsed:a.elapsed,charge:Wo(a),shots:a.shots}:null),draft:s.draft?JSON.parse(JSON.stringify(s.draft)):null,transitions:s.transitions}},start(s){i.start(s)},restart(s){i.restart(s)},advanceTicks(s){i.advanceTicks(s)},skipToTrialEnd(s=.5){const r=i.controller.sim;r.trialTime=Math.max(r.trialTime,r.trial.durationSeconds-s)},setTrial(s){i.controller.sim.trialIndex=s},setHp(s){i.controller.sim.baseHp=s},install(s,r,a=0){const o=i.controller.sim.installWeapon(s,r);return o.elapsed=a*({needle:1.2,light:3,thread:2.4,bell:3.2}[r]??1),i.cards.reset(),i.cards.syncEquipped(i.controller.sim.slots,!0),o.id},spawn(s,r,a,o=1){return i.controller.sim.spawnEnemy(s,r,a,o).id},chargeFixture(s=[0,.25,.5,.75,.95,1]){i.restart(4242);const r=i.controller.sim;r.spawningEnabled=!1,i.cards.reset(),s.forEach((a,o)=>{const l=Vs[o%4],c=r.installWeapon(o,l);c.elapsed=a*{needle:1.2,light:3,thread:2.4,bell:3.2}[l]}),i.cards.syncEquipped(r.slots,!0),i.controller.pause(),i.capture=!0,document.body.classList.add("capture")},stressFixture(s=80){i.restart(777);const r=i.controller.sim;r.spawningEnabled=!1,["needle","light","thread","bell","needle","thread"].forEach((o,l)=>r.installWeapon(l,o)),i.cards.reset(),i.cards.syncEquipped(r.slots,!0);for(let o=0;o<s;o++){const l=o/s*Math.PI*2*3.1,c=7+o%7*.45,h=r.spawnEnemy(Vc[o%3],Math.cos(l)*c,Math.sin(l)*c,1);h.hp=h.maxHp=h.maxHp*30,h.speed*=.15}r.baseHp=1e5},settle(s=1){i.settlePresentation(s)},attackPose(s=1,r=3,a=51){i.restart(a);const o=i.controller.sim;o.spawningEnabled=!1,o.baseHp=1e5,["needle","light","thread","bell","needle","thread"].forEach((d,u)=>o.installWeapon(u,d)),i.cards.reset(),i.cards.syncEquipped(o.slots,!0);for(let d=0;d<12;d++){const u=d*.52+.4,f=5+d%3*.55,g=o.spawnEnemy(Vc[d%3],Math.cos(u)*f,Math.sin(u)*f,1);g.hp=g.maxHp=g.maxHp*12,g.speed=.05}const c=o.slots[s];let h=0;for(;h++<2e3&&(i.advanceTicks(1),!(c.shots>=1&&Math.round(c.elapsed/(1/60))===r)););return i.capture=!0,document.body.classList.add("capture"),{ticks:o.tick,shots:c.shots}},setCapture(s){i.capture=s,document.body.classList.toggle("capture",s)},offersSettled(){return i.cards.offersSettled()},offerScreen(s){return t(i.cards.trayWorld(s))},socketScreen(s){const r=Li(s);return t(new C(r.x,Rt,r.z))},cardScreen(s){const r=i.controller.sim.slots[s],a=r?i.cards.equippedView(r.id):void 0;return a?t(a.group.position):null},cardFacePixels(s){const r=Li(s),a=t(new C(r.x-1.02,Rt,r.z+1.36)),o=t(new C(r.x+1.02,Rt,r.z+1.36)),l=t(new C(r.x,Rt,r.z-1.36)),c=t(new C(r.x,Rt,r.z+1.36));return{width:Math.hypot(o.x-a.x,o.y-a.y),height:Math.hypot(l.x-c.x,l.y-c.y)}},resources(){const s=i.rig.renderer.info;return{geometries:s.memory.geometries,textures:s.memory.textures,programs:s.programs?.length??0,calls:s.render.calls,triangles:s.render.triangles,listeners:i.listenerCount,voices:i.audio.activeVoices,cards:i.cards.liveCount(),enemyVisuals:i.enemies.liveVisuals(),effects:{...i.effects.stats},loops:i.loops,sceneChildren:i.rig.scene.children.length}},perf(){const s=i.frameTimes.slice(-240),r=i.simRate(),a=[...s].sort((l,c)=>l-c),o=s.reduce((l,c)=>l+c,0)/Math.max(1,s.length);return{frames:s.length,simSecondsPerWallSecond:r,avgMs:+o.toFixed(2),p95Ms:+(a[Math.floor(a.length*.95)]??0).toFixed(2),maxMs:+(a[a.length-1]??0).toFixed(2),updateMs:+(i.cpuTimes.reduce((l,c)=>l+c[0],0)/Math.max(1,i.cpuTimes.length)).toFixed(2),renderSubmitMs:+(i.cpuTimes.reduce((l,c)=>l+c[1],0)/Math.max(1,i.cpuTimes.length)).toFixed(2),dpr:i.rig.renderer.getPixelRatio(),quality:i.rig.quality,viewport:i.rig.viewport}},setQuality(s){i.setQuality(s)},simulateHidden(){i.input.cancelDrag("hidden"),i.controller.suspend()}};window.__PALIMPSEST__=n,window.__PALIMPSEST_APP__=i}class j_{rig;board;cards;enemies;effects;audio=new kv;hud;input;controller;clock=new Iv;capture=!1;frameTimes=[];cpuTimes=[];rateHistory=[];loops=0;lastNow=null;lastRenderSimTime=0;presentTime=0;listeners=[];fitPhase=null;soulLift=0;soulFade=1;disposed=!1;constructor(e,t){this.rig=new K_(e),this.board=new jr(this.rig.renderer),this.cards=new N_(this.rig.renderer),this.enemies=new B_(this.rig.renderer),this.effects=new T_(this.rig.renderer,12648430),this.rig.scene.add(this.board.root,this.enemies.root,this.cards.root,this.effects.root),this.controller=new Bv(Wa()),this.hud=new R_(t,{start:()=>this.start(),pause:()=>this.controller.pause(),resume:()=>this.resume(),toggleMute:()=>this.audio.setMuted(!this.audio.muted),setVolume:r=>this.audio.setVolume(r),toggleQuality:()=>this.setQuality(this.rig.quality==="high"?"low":"high"),restart:()=>this.restart(),selectOffer:r=>this.selectOffer(r),placeSlot:r=>{this.placeSlot(r)},useBoon:()=>this.controller.useBoon(),confirmReplace:()=>this.controller.confirmReplace(),cancel:()=>this.cancel(),continueRun:()=>this.controller.continueRun()}),this.input=new A_(e,this.rig,this.board,this.cards,()=>this.controller,{selectOffer:r=>this.selectOffer(r),placeSlot:r=>this.placeSlot(r),cancel:()=>this.cancel(),hover:r=>this.hud.setHoverCard(r),hoverSound:()=>this.audio.cardHover(),pickSound:()=>this.audio.cardPick(),returnSound:()=>this.audio.cardReturn(),rejected:r=>this.hud.toast(r)}),this.controller.on(r=>this.onControllerEvent(r)),this.cards.prepare([...Vs,...Rv]);const n=(r,a,o,l)=>{r.addEventListener(a,o,l),this.listeners.push(()=>r.removeEventListener(a,o,l))};n(window,"resize",()=>this.onResize()),n(window,"blur",()=>this.input.cancelDrag("blur")),n(document,"visibilitychange",()=>this.onVisibility()),n(window,"keydown",r=>this.onKey(r));const s=window.matchMedia("(prefers-reduced-motion: reduce)");this.rig.reducedMotion=s.matches,n(s,"change",()=>this.rig.reducedMotion=s.matches),this.onResize(),this.applyFit(!0),this.loops++,this.rig.renderer.setAnimationLoop(r=>this.frame(r)),this.hud.focusPrimary("TITLE")}get listenerCount(){return this.listeners.length}start(e=Number(new URLSearchParams(location.search).get("seed"))||Wa()){this.audio.unlock(),this.controller.startRun(e),this.audio.phase("start")}restart(e=Wa()){this.input.cancelDrag("restart"),this.audio.unlock(),this.controller.startRun(e)}resume(){this.audio.unlock(),this.controller.resume()&&(this.lastNow=null)}selectOffer(e){this.controller.selectOffer(e)&&this.audio.cardPick()}placeSlot(e){const t=this.controller.requestPlace(e);if(t==="rejected"){const n=this.controller.selectedCard();n&&!gi(n)&&this.hud.toast("Boons are used, not socketed — press Use.")}return t}cancel(){this.input.cancelDrag("escape");const e=this.controller.draft;e&&(e.stage==="confirmReplace"?this.controller.cancelReplace():this.controller.cancelSelection())}setQuality(e){this.rig.applyQuality(e),this.effects.setQuality(this.rig.settings.particleBudget,this.rig.settings.dustCount),this.input.cancelDrag("quality"),this.applyFit(!0)}onControllerEvent(e){const t=this.controller.sim;switch(e.type){case"runStarted":this.audio.stopAll(),this.cards.reset(),this.enemies.reset(),this.effects.reset(),this.board.reset(),this.clock.reset(),this.lastRenderSimTime=0,this.soulLift=0,this.soulFade=1,this.cards.syncEquipped(t.slots);break;case"phase":this.onPhase(e.from,e.to);break;case"offer":this.cards.presentOffer(e.draft.offer);break;case"selection":if(this.cards.setSelected(e.index),e.index===null)for(let n=0;n<3;n++)this.cards.returnOffer(n);break;case"committed":{const n=Li(e.slot);this.cards.commitOffer(e.offerIndex,e.instance,()=>{this.effects.landing(new C(n.x,Rt,n.z)),this.audio.cardPlace()}),this.cards.syncEquipped(t.slots),this.board.setProgress(t.trialIndex+1);break}case"boonUsed":this.cards.consumeBoon(e.offerIndex),this.audio.boon(),this.board.emitterPulse(1),this.hud.toast(e.id==="mend"?"The vessel is mended.":"Every weapon strikes harder."),this.board.setProgress(t.trialIndex+1);break;case"suspended":this.input.cancelDrag("suspend");break}}onPhase(e,t){const n=t==="COMBAT"||t==="CLEARING";this.audio.setCombatActive(n),t==="DRAFT"&&e==="COMBAT"&&(this.audio.phase("draft"),this.board.setProgress(this.controller.sim.trialIndex+1)),t==="COMBAT"&&(e==="DRAFT"||e==="PLACEMENT")&&(this.audio.phase("resume"),this.cards.clearOffers()),t==="CLEARING"&&(this.audio.phase("clearing"),this.hud.toast("No more spawns. Lay the remaining echoes to rest.",3.5)),t==="DEFEAT"&&(this.audio.phase("defeat"),this.effects.ceremony("defeat"),this.input.cancelDrag("defeat"),this.cards.clearOffers()),t==="VICTORY"&&(this.audio.phase("victory"),this.board.setProgress(8),this.board.openAperture(!0),this.effects.ceremony("victory")),this.applyFit(!1)}onSimEvent(e){switch(this.enemies.onEvent(e),this.effects.onSimEvent(e,t=>{const n=this.cards.equippedView(t);return n?n.group.position.clone().setY(n.group.position.y+.05):null}),e.type){case"fired":this.cards.onFire(e.weaponId,e.t),this.board.emitterPulse(e.defId==="needle"?.5:1),this.audio.weapon(e.defId),e.defId==="light"&&this.rig.kick(.06,100),e.defId==="bell"&&this.rig.kick(.04,120);break;case"died":this.audio.enemyDeath(e.kind);break;case"baseDamaged":this.board.baseHit(e.amount),this.audio.baseHit(),this.rig.kick(.1,130);break}}step=()=>{const e=this.controller.sim,t=e.step();for(const n of e.drainEvents())this.onSimEvent(n);return t};advanceTicks(e){for(let t=0;t<e&&this.controller.isRunning();t++)this.controller.handleOutcome(this.step());this.clock.reset()}onVisibility(){document.hidden&&(this.input.cancelDrag("hidden"),this.controller.suspend(),this.audio.setCombatActive(!1)),this.lastNow=null,this.clock.reset()}onResize(){this.input.cancelDrag("resize"),this.rig.resize(),this.applyFit(!0)}onKey(e){if(e.target instanceof HTMLInputElement)return;const t=this.controller,n=e.key.toLowerCase();if(n==="escape"){t.phase==="DRAFT"||t.phase==="PLACEMENT"?this.cancel():t.phase==="COMBAT"||t.phase==="CLEARING"?t.pause():t.phase==="PAUSED"&&this.resume();return}if(n==="p")t.phase==="PAUSED"||t.suspended?this.resume():t.pause();else if(n==="m")this.audio.setMuted(!this.audio.muted);else if(n==="q")this.setQuality(this.rig.quality==="high"?"low":"high");else if(/^[1-6]$/.test(n)&&t.draft&&!t.suspended){const s=Number(n)-1;t.draft.stage==="placing"?this.placeSlot(s):s<3&&(t.draft.stage==="choosing"||t.draft.stage==="boonSelected")&&this.selectOffer(s)}}draftFitPoints(){const e=[];for(const[a,o]of[[-4.3,-4],[4.3,-4],[-4.3,4],[4.3,4]])e.push(new C(a,0,o),new C(a,Rt,o));const s=Ci*wt.scale/2,r=Vn*wt.scale/2;for(const a of[0,2]){const o=(a-1)*wt.spacing;for(const l of[-1,1])for(const c of[-1,1])e.push(new C(o+l*s,wt.y+c*r*Math.sin(.62),wt.z-c*r*Math.cos(wt.tilt)))}return e}applyFit(e){const t=this.controller.phase,n=t==="DRAFT"||t==="PLACEMENT",s=`${n}`;!e&&s===this.fitPhase||(this.fitPhase=s,this.rig.setFit(n?this.draftFitPoints():this.board.combatFitPoints(),this.hud.insets(t),e),this.rig.setDim(n?.7:1),this.cards.setTray(n))}simRate(){const e=this.rateHistory;if(e.length<2)return 0;const[t,n]=e[0],[s,r]=e[e.length-1];return s>t?+((r-n)/(s-t)).toFixed(3):0}frame(e){if(this.disposed)return;const t=e/1e3,n=this.lastNow===null?0:t-this.lastNow;this.lastNow=t;const s=Math.min(Math.max(n,0),.1);if(n>0&&(this.frameTimes.push(n*1e3),this.frameTimes.length>600&&this.frameTimes.shift()),this.controller.isRunning())for(this.rateHistory.push([t,this.controller.sim.simTime]);this.rateHistory.length>2&&t-this.rateHistory[0][0]>10;)this.rateHistory.shift();else this.rateHistory.length=0;const r=performance.now();this.update(this.capture?0:s,this.capture?0:s);const a=performance.now();this.rig.renderer.info.reset(),this.rig.render();const o=performance.now();this.cpuTimes.push([a-r,o-a]),this.cpuTimes.length>240&&this.cpuTimes.shift()}update(e,t){const n=this.controller,s=this.clock.advance(e,n.isRunning(),this.step);s!=="continue"&&n.handleOutcome(s),n.updatePresentation(t),this.presentTime+=t;const r=n.sim,a=n.isRunning()&&!this.capture?this.clock.alpha:1,o=Math.max(0,r.simTime-(1-a)*Ai),l=Math.max(0,o-this.lastRenderSimTime);this.lastRenderSimTime=o,n.phase==="VICTORY"&&(this.soulLift=Math.min(1,this.soulLift+t*.35)),n.phase==="DEFEAT"&&(this.soulFade=Math.max(.05,this.soulFade-t*.6)),this.board.setSoul(this.soulLift,this.soulFade);const c=new Map;for(const h of r.slots)h&&c.set(h.id,Wo(h));this.rig.update(t),this.board.update(t,l,this.presentTime),this.cards.setDim(n.phase==="DRAFT"||n.phase==="PLACEMENT"?.9:1),this.cards.update(t,o,c),this.enemies.update(r.enemies,a,o,this.rig.camera),this.effects.setView(this.rig.camera,this.rig.viewport.height),this.effects.update(o,t,r.projectiles,a),this.input.updateHalos(),this.rig.viewport.width>0&&this.input.refreshHover(),this.hud.update(this.hudState(),t)}settlePresentation(e,t=1/60){for(let n=0;n<e;n+=t)this.update(0,t)}hudState(){const e=this.controller,t=e.sim;return{phase:e.phase,suspended:e.suspended,pauseReason:e.pauseReason,hp:t.baseHp,trialIndex:t.trialIndex,trialTime:t.trialTime,trialDuration:t.trial.durationSeconds,clearing:t.clearing,enemiesLeft:t.enemies.length,muted:this.audio.muted,quality:this.rig.quality,seed:e.seed,kills:t.kills,polishStacks:t.polishStacks,slots:t.slots.map(n=>n?{defId:n.defId,charge:Wo(n)}:null),draft:e.draft?{draftIndex:e.draft.draftIndex,offer:e.draft.offer,selected:e.draft.selected,stage:e.draft.stage,pendingSlot:e.draft.pendingSlot,forecast:e.nextTrialForecast(),resolvedCard:e.draft.resolved?.card??null}:null}}dispose(){this.disposed=!0,this.rig.renderer.setAnimationLoop(null);for(const e of this.listeners)e();this.listeners=[],this.input.dispose(),this.hud.dispose(),this.audio.dispose(),this.cards.dispose(),this.enemies.dispose(),this.effects.dispose(),this.board.dispose(),this.rig.dispose()}}function lh(i,e){i.innerHTML=`<div id="webgl-error"><div class="plate"><h2>WebGL2 is required</h2>
    <p>PALIMPSEST could not start a WebGL2 renderer in this browser.</p>
    <p class="small">Try a current desktop Chrome, Edge, Firefox or Safari with hardware acceleration enabled.</p>
    <p class="small">${String(e?.message??e).replace(/</g,"&lt;")}</p></div></div>`}async function ex(){const i=document.getElementById("scene"),e=document.getElementById("ui");try{await Promise.all([document.fonts.load('700 60px "Cormorant Garamond"'),document.fonts.load("600 31px Inter"),document.fonts.load("600 18px Inter")])}catch{}if(!document.createElement("canvas").getContext("webgl2")){lh(e,new Error("webgl2 context unavailable"));return}let n;try{n=new j_(i,e)}catch(s){console.error(s),lh(e,s);return}Q_(n)}ex();
