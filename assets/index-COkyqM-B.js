(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ko="186",_u=0,Bl=1,xu=2,Bs=1,Mu=2,Us=3,Pi=0,Xt=1,on=2,Dn=0,ks=1,An=2,kl=3,zl=4,Su=5,ns=100,yu=101,bu=102,Tu=103,wu=104,Eu=200,Au=201,Cu=202,Ru=203,ph=204,mh=205,Pu=206,Lu=207,Iu=208,Du=209,Uu=210,Nu=211,Fu=212,Ou=213,Bu=214,Ja=0,Qa=1,ja=2,qs=3,eo=4,to=5,no=6,io=7,Zo=0,ku=1,zu=2,Un=0,Jo=1,Qo=2,jo=3,sa=4,el=5,tl=6,nl=7,gh=300,Li=301,cs=302,da=303,fa=304,ra=306,as=1e3,$n=1001,so=1002,Rt=1003,Hu=1004,lr=1005,Pt=1006,pa=1007,fi=1008,tn=1009,vh=1010,_h=1011,Ys=1012,il=1013,Nn=1014,gn=1015,qt=1016,sl=1017,rl=1018,$s=1020,xh=35902,Mh=35899,Sh=1021,yh=1022,vn=1023,jn=1026,Ai=1027,al=1028,ol=1029,Ii=1030,ll=1031,cl=1033,zr=33776,Hr=33777,Gr=33778,Vr=33779,ro=35840,ao=35841,oo=35842,lo=35843,co=36196,ho=37492,uo=37496,fo=37488,po=37489,$r=37490,mo=37491,go=37808,vo=37809,_o=37810,xo=37811,Mo=37812,So=37813,yo=37814,bo=37815,To=37816,wo=37817,Eo=37818,Ao=37819,Co=37820,Ro=37821,Po=36492,Lo=36494,Io=36495,Do=36283,Uo=36284,Kr=36285,No=36286,Gu=3200,Zr=0,Vu=1,di="",Kt="srgb",Jr="srgb-linear",Qr="linear",lt="srgb",ma=7680,Wu=519,Xu=512,qu=513,Yu=514,hl=515,$u=516,Ku=517,ul=518,Zu=519,Ju=35044,mi=35048,Hl="300 es",Cn=2e3,Ks=2001;function Qu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function jr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ju(){const i=jr("canvas");return i.style.display="block",i}const Gl={};function Vl(...i){const e="THREE."+i.shift();console.log(e,...i)}function bh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ve(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function os(...i){const e=i.join(" ");e in Gl||(Gl[e]=!0,Ve(...i))}function ed(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const td={[Ja]:Qa,[ja]:no,[eo]:io,[qs]:to,[Qa]:Ja,[no]:ja,[io]:eo,[to]:qs};class Ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wl=1234567;const zs=Math.PI/180,hs=180/Math.PI;function Ni(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function dl(i,e){return(i%e+e)%e}function nd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function id(i,e,t){return i!==e?(t-i)/(e-i):0}function Hs(i,e,t){return(1-t)*i+t*e}function sd(i,e,t,n){return Hs(i,e,1-Math.exp(-t*n))}function rd(i,e=1){return e-Math.abs(dl(i,e*2)-e)}function ad(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function od(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ld(i,e){return i+Math.floor(Math.random()*(e-i+1))}function cd(i,e){return i+Math.random()*(e-i)}function hd(i){return i*(.5-Math.random())}function ud(i){i!==void 0&&(Wl=i);let e=Wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dd(i){return i*zs}function fd(i){return i*hs}function pd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function md(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function gd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vd(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*h,o*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function is(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ht(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ss={DEG2RAD:zs,RAD2DEG:hs,generateUUID:Ni,clamp:Je,euclideanModulo:dl,mapLinear:nd,inverseLerp:id,lerp:Hs,damp:sd,pingpong:rd,smoothstep:ad,smootherstep:od,randInt:ld,randFloat:cd,randFloatSpread:hd,seededRandom:ud,degToRad:dd,radToDeg:fd,isPowerOfTwo:pd,ceilPowerOfTwo:md,floorPowerOfTwo:gd,setQuaternionFromProperEuler:vd,normalize:Ht,denormalize:is};class re{static{re.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ln{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],x=r[a+3];if(d!==x||l!==u||c!==f||h!==m){let p=l*u+c*f+h*m+d*x;p<0&&(u=-u,f=-f,m=-m,x=-x,p=-p);let g=1-o;if(p<.9995){const S=Math.acos(p),w=Math.sin(S);g=Math.sin(g*S)/w,o=Math.sin(o*S)/w,l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+x*o}else{l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+x*o;const S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-o*f,e[t+2]=c*m+h*f+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ga.copy(this).projectOnVector(e),this.sub(ga)}reflect(e){return this.sub(ga.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ga=new C,Xl=new ln;class Xe{static{Xe.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],x=s[0],p=s[3],g=s[6],S=s[1],w=s[4],M=s[7],T=s[2],b=s[5],R=s[8];return r[0]=a*x+o*S+l*T,r[3]=a*p+o*w+l*b,r[6]=a*g+o*M+l*R,r[1]=c*x+h*S+d*T,r[4]=c*p+h*w+d*b,r[7]=c*g+h*M+d*R,r[2]=u*x+f*S+m*T,r[5]=u*p+f*w+m*b,r[8]=u*g+f*M+m*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=d*x,e[1]=(s*c-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(va.makeScale(e,t)),this}rotate(e){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(va.makeRotation(-e)),this}translate(e,t){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(va.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const va=new Xe,ql=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yl=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _d(){const i={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?Qr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Jr]:{primaries:e,whitePoint:n,transfer:Qr,toXYZ:ql,fromXYZ:Yl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:ql,fromXYZ:Yl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),i}const et=_d();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Hi;class xd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Hi===void 0&&(Hi=jr("canvas")),Hi.width=e.width,Hi.height=e.height;const s=Hi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Hi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=jr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Jn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Md=0;class fl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_a(s[a].image)):r.push(_a(s[a]))}else r=_a(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function _a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Sd=0;const xa=new C;class Ft extends Ui{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=$n,s=$n,r=Pt,a=fi,o=vn,l=tn,c=Ft.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Ni(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(xa).x}get height(){return this.source.getSize(xa).y}get depth(){return this.source.getSize(xa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case as:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case so:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case as:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case so:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=gh;Ft.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],x=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(f+1)/2,T=(g+1)/2,b=(h+u)/4,R=(d+x)/4,_=(m+p)/4;return w>M&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=R/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=_/r),this.set(n,s,r,t),this}let S=Math.sqrt((p-m)*(p-m)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(p-m)/S,this.y=(d-x)/S,this.z=(u-h)/S,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yd extends Ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ft(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new fl(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ot extends yd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Th extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bd extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class nt{static{nt.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,m,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,x,p)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,x,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=m,g[11]=x,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Gi.setFromMatrixColumn(e,0).length(),r=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,m=o*h,x=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,m=c*h,x=c*d;t[0]=u+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,m=c*h,x=c*d;t[0]=u-x*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,m=o*h,x=o*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=x-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-x*d}else if(e.order==="XZY"){const u=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Td,e,wd)}lookAt(e,t,n){const s=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ri.crossVectors(n,Qt),ri.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ri.crossVectors(n,Qt)),ri.normalize(),cr.crossVectors(Qt,ri),s[0]=ri.x,s[4]=cr.x,s[8]=Qt.x,s[1]=ri.y,s[5]=cr.y,s[9]=Qt.y,s[2]=ri.z,s[6]=cr.z,s[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],x=n[6],p=n[10],g=n[14],S=n[3],w=n[7],M=n[11],T=n[15],b=s[0],R=s[4],_=s[8],E=s[12],P=s[1],I=s[5],F=s[9],z=s[13],U=s[2],k=s[6],K=s[10],W=s[14],oe=s[3],q=s[7],J=s[11],B=s[15];return r[0]=a*b+o*P+l*U+c*oe,r[4]=a*R+o*I+l*k+c*q,r[8]=a*_+o*F+l*K+c*J,r[12]=a*E+o*z+l*W+c*B,r[1]=h*b+d*P+u*U+f*oe,r[5]=h*R+d*I+u*k+f*q,r[9]=h*_+d*F+u*K+f*J,r[13]=h*E+d*z+u*W+f*B,r[2]=m*b+x*P+p*U+g*oe,r[6]=m*R+x*I+p*k+g*q,r[10]=m*_+x*F+p*K+g*J,r[14]=m*E+x*z+p*W+g*B,r[3]=S*b+w*P+M*U+T*oe,r[7]=S*R+w*I+M*k+T*q,r[11]=S*_+w*F+M*K+T*J,r[15]=S*E+w*z+M*W+T*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],x=e[7],p=e[11],g=e[15],S=l*f-c*u,w=o*f-c*d,M=o*u-l*d,T=a*f-c*h,b=a*u-l*h,R=a*d-o*h;return t*(x*S-p*w+g*M)-n*(m*S-p*T+g*b)+s*(m*w-x*T+g*R)-r*(m*M-x*b+p*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],x=e[13],p=e[14],g=e[15],S=t*o-n*a,w=t*l-s*a,M=t*c-r*a,T=n*l-s*o,b=n*c-r*o,R=s*c-r*l,_=h*x-d*m,E=h*p-u*m,P=h*g-f*m,I=d*p-u*x,F=d*g-f*x,z=u*g-f*p,U=S*z-w*F+M*I+T*P-b*E+R*_;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/U;return e[0]=(o*z-l*F+c*I)*k,e[1]=(s*F-n*z-r*I)*k,e[2]=(x*R-p*b+g*T)*k,e[3]=(u*b-d*R-f*T)*k,e[4]=(l*P-a*z-c*E)*k,e[5]=(t*z-s*P+r*E)*k,e[6]=(p*M-m*R-g*w)*k,e[7]=(h*R-u*M+f*w)*k,e[8]=(a*F-o*P+c*_)*k,e[9]=(n*P-t*F-r*_)*k,e[10]=(m*b-x*M+g*S)*k,e[11]=(d*M-h*b-f*S)*k,e[12]=(o*E-a*I-l*_)*k,e[13]=(t*I-n*E+s*_)*k,e[14]=(x*w-m*T-p*S)*k,e[15]=(h*T-d*w+u*S)*k,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,x=a*h,p=a*d,g=o*d,S=l*c,w=l*h,M=l*d,T=n.x,b=n.y,R=n.z;return s[0]=(1-(x+g))*T,s[1]=(f+M)*T,s[2]=(m-w)*T,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(u+g))*b,s[6]=(p+S)*b,s[7]=0,s[8]=(m+w)*R,s[9]=(p-S)*R,s[10]=(1-(u+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Gi.set(s[0],s[1],s[2]).length();const o=Gi.set(s[4],s[5],s[6]).length(),l=Gi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),un.copy(this);const c=1/a,h=1/o,d=1/l;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,t.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Cn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,x;if(l)m=r/(a-r),x=a*r/(a-r);else if(o===Cn)m=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ks)m=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Cn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,x;if(l)m=1/(a-r),x=a/(a-r);else if(o===Cn)m=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ks)m=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Gi=new C,un=new nt,Td=new C(0,0,0),wd=new C(1,1,1),ri=new C,cr=new C,Qt=new C,$l=new nt,Kl=new ln;class $t{constructor(e=0,t=0,n=0,s=$t.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $l.makeRotationFromQuaternion(e),this.setFromRotationMatrix($l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kl.setFromEuler(this),this.setFromQuaternion(Kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$t.DEFAULT_ORDER="XYZ";class pl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ed=0;const Zl=new C,Vi=new ln,Bn=new nt,hr=new C,Ss=new C,Ad=new C,Cd=new ln,Jl=new C(1,0,0),Ql=new C(0,1,0),jl=new C(0,0,1),ec={type:"added"},Rd={type:"removed"},Wi={type:"childadded",child:null},Ma={type:"childremoved",child:null};class Mt extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new C,t=new $t,n=new ln,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new Xe}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Jl,e)}rotateY(e){return this.rotateOnAxis(Ql,e)}rotateZ(e){return this.rotateOnAxis(jl,e)}translateOnAxis(e,t){return Zl.copy(e).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jl,e)}translateY(e){return this.translateOnAxis(Ql,e)}translateZ(e){return this.translateOnAxis(jl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hr.copy(e):hr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Ss,hr,this.up):Bn.lookAt(hr,Ss,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Vi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ec),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rd),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ec),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,e,Ad),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Cd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mt.DEFAULT_UP=new C(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zt extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pd={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const p=t.getJointPose(x,n),g=this._getHandJoint(c,x);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},ur={h:0,s:0,l:0};function ya(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=dl(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ya(a,r,e+1/3),this.g=ya(a,r,e),this.b=ya(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Kt){function n(r){r!==void 0&&parseFloat(r)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const n=wh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return et.workingToColorSpace(Ut.copy(this),e),Math.round(Je(Ut.r*255,0,255))*65536+Math.round(Je(Ut.g*255,0,255))*256+Math.round(Je(Ut.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,s=Ut.g,r=Ut.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=Kt){et.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,s=Ut.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(ur);const n=Hs(ai.h,ur.h,t),s=Hs(ai.s,ur.s,t),r=Hs(ai.l,ur.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Ee;Ee.NAMES=wh;class ml extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $t,this.environmentIntensity=1,this.environmentRotation=new $t,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new C,kn=new C,ba=new C,zn=new C,Xi=new C,qi=new C,tc=new C,Ta=new C,wa=new C,Ea=new C,Aa=new mt,Ca=new mt,Ra=new mt;class mn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),dn.subVectors(e,t),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){dn.subVectors(s,t),kn.subVectors(n,t),ba.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(kn),l=dn.dot(ba),c=kn.dot(kn),h=kn.dot(ba),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Aa.setScalar(0),Ca.setScalar(0),Ra.setScalar(0),Aa.fromBufferAttribute(e,t),Ca.fromBufferAttribute(e,n),Ra.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Aa,r.x),a.addScaledVector(Ca,r.y),a.addScaledVector(Ra,r.z),a}static isFrontFacing(e,t,n,s){return dn.subVectors(n,t),kn.subVectors(e,t),dn.cross(kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),dn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Xi.subVectors(s,n),qi.subVectors(r,n),Ta.subVectors(e,n);const l=Xi.dot(Ta),c=qi.dot(Ta);if(l<=0&&c<=0)return t.copy(n);wa.subVectors(e,s);const h=Xi.dot(wa),d=qi.dot(wa);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Xi,a);Ea.subVectors(e,r);const f=Xi.dot(Ea),m=qi.dot(Ea);if(m>=0&&f<=m)return t.copy(r);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(qi,o);const p=h*m-f*d;if(p<=0&&d-h>=0&&f-m>=0)return tc.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector(tc,o);const g=1/(p+x+u);return a=x*g,o=u*g,t.copy(n).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fi{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),dr.copy(n.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ys),fr.subVectors(this.max,ys),Yi.subVectors(e.a,ys),$i.subVectors(e.b,ys),Ki.subVectors(e.c,ys),oi.subVectors($i,Yi),li.subVectors(Ki,$i),Mi.subVectors(Yi,Ki);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Mi.z,Mi.y,oi.z,0,-oi.x,li.z,0,-li.x,Mi.z,0,-Mi.x,-oi.y,oi.x,0,-li.y,li.x,0,-Mi.y,Mi.x,0];return!Pa(t,Yi,$i,Ki,fr)||(t=[1,0,0,0,1,0,0,0,1],!Pa(t,Yi,$i,Ki,fr))?!1:(pr.crossVectors(oi,li),t=[pr.x,pr.y,pr.z],Pa(t,Yi,$i,Ki,fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hn=[new C,new C,new C,new C,new C,new C,new C,new C],fn=new C,dr=new Fi,Yi=new C,$i=new C,Ki=new C,oi=new C,li=new C,Mi=new C,ys=new C,fr=new C,pr=new C,Si=new C;function Pa(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Si.fromArray(i,r);const o=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),l=e.dot(Si),c=t.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const yt=new C,mr=new re;let Ld=0;class Lt extends Ui{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ld++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ju,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=is(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=is(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=is(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=is(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=is(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),s=Ht(s,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Eh extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ah extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class je extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Id=new Fi,bs=new C,La=new C;class ti{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Id.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bs.subVectors(e,this.center);const t=bs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(bs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(La.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bs.copy(e.center).add(La)),this.expandByPoint(bs.copy(e.center).sub(La))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Dd=0;const sn=new nt,Ia=new Mt,Zi=new C,jt=new Fi,Ts=new Fi,Ct=new C;class vt extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qu(e)?Ah:Eh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return Ia.lookAt(e),Ia.updateMatrix(),this.applyMatrix4(Ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(jt.min,Ts.min),jt.expandByPoint(Ct),Ct.addVectors(jt.max,Ts.max),jt.expandByPoint(Ct)):(jt.expandByPoint(Ts.min),jt.expandByPoint(Ts.max))}jt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ct));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ct.fromBufferAttribute(o,c),l&&(Zi.fromBufferAttribute(e,c),Ct.add(Zi)),s=Math.max(s,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Lt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new C,l[_]=new C;const c=new C,h=new C,d=new C,u=new re,f=new re,m=new re,x=new C,p=new C;function g(_,E,P){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,P),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,P),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),o[_].add(x),o[E].add(x),o[P].add(x),l[_].add(p),l[E].add(p),l[P].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,E=S.length;_<E;++_){const P=S[_],I=P.start,F=P.count;for(let z=I,U=I+F;z<U;z+=3)g(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const w=new C,M=new C,T=new C,b=new C;function R(_){T.fromBufferAttribute(s,_),b.copy(T);const E=o[_];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(b,E);const I=M.dot(l[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,I)}for(let _=0,E=S.length;_<E;++_){const P=S[_],I=P.start,F=P.count;for(let z=I,U=I+F;z<U;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){const m=e.getX(u+0),x=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let g=0;g<h;g++)u[m++]=c[f++]}return new Lt(u,h,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Da=new C,Ud=new C,Nd=new Xe;class ui{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Da.subVectors(n,t).cross(Ud.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Da),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nd.getNormalMatrix(e),s=this.coplanarPoint(Da).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Fd=0;class Oi extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ni(),this.name="",this.type="Material",this.blending=ks,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ph,this.blendDst=mh,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ma,this.stencilZFail=ma,this.stencilZPass=ma,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ee().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ui().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Gn=new C,Ua=new C,gr=new C,vr=new C;class gl{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ua.copy(e).add(t).multiplyScalar(.5),gr.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Ua);const r=e.distanceTo(t)*.5,a=-this.direction.dot(gr),o=vr.dot(this.direction),l=-vr.dot(gr),c=vr.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ua).addScaledVector(gr,u),f}intersectSphere(e,t){if(e.radius<0)return null;Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,m=t.x-a.x,x=t.y-a.y,p=t.z-a.z,g=n.x-a.x,S=n.y-a.y,w=n.z-a.z,M=Math.abs(l),T=Math.abs(c),b=Math.abs(h);let R,_,E,P,I,F,z,U,k,K,W,oe;if(M>=T&&M>=b?(E=l,F=d,k=m,oe=g,l>=0?(R=c,_=h,P=u,I=f,z=x,U=p,K=S,W=w):(R=h,_=c,P=f,I=u,z=p,U=x,K=w,W=S)):T>=b?(E=c,F=u,k=x,oe=S,c>=0?(R=h,_=l,P=f,I=d,z=p,U=m,K=w,W=g):(R=l,_=h,P=d,I=f,z=m,U=p,K=g,W=w)):(E=h,F=f,k=p,oe=w,h>=0?(R=l,_=c,P=d,I=u,z=m,U=x,K=g,W=S):(R=c,_=l,P=u,I=d,z=x,U=m,K=S,W=g)),E===0)return null;const q=R/E,J=_/E,B=1/E,se=P-q*F,ae=I-J*F,Ce=z-q*k,qe=U-J*k,Ze=K-q*oe,Z=W-J*oe,te=Ze*qe-Z*Ce,xe=se*Z-ae*Ze,ke=Ce*ae-qe*se;if(s){if(te<0||xe<0||ke<0)return null}else if((te<0||xe<0||ke<0)&&(te>0||xe>0||ke>0))return null;const we=te+xe+ke;if(we===0)return null;const He=B*(te*F+xe*k+ke*oe);return(we>0?He<0:He>0)?null:this.at(He/we,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nc=new nt,yi=new gl,_r=new ti,ic=new C,xr=new C,Mr=new C,Sr=new C,Na=new C,yr=new C,sc=new C,br=new C;class Ie extends Mt{constructor(e=new vt,t=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Na.fromBufferAttribute(d,e),a?yr.addScaledVector(Na,h):yr.addScaledVector(Na.sub(t),h))}t.add(yr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(_r.containsPoint(yi.origin)===!1&&(yi.intersectSphere(_r,ic)===null||yi.origin.distanceToSquared(ic)>(e.far-e.near)**2))&&(nc.copy(r).invert(),yi.copy(e.ray).applyMatrix4(nc),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){const p=u[m],g=a[p.materialIndex],S=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=S,T=w;M<T;M+=3){const b=o.getX(M),R=o.getX(M+1),_=o.getX(M+2);s=Tr(this,g,e,n,c,h,d,b,R,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){const S=o.getX(p),w=o.getX(p+1),M=o.getX(p+2);s=Tr(this,a,e,n,c,h,d,S,w,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){const p=u[m],g=a[p.materialIndex],S=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=S,T=w;M<T;M+=3){const b=M,R=M+1,_=M+2;s=Tr(this,g,e,n,c,h,d,b,R,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){const S=p,w=p+1,M=p+2;s=Tr(this,a,e,n,c,h,d,S,w,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Od(i,e,t,n,s,r,a,o){let l;if(e.side===Xt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Pi,o),l===null)return null;br.copy(o),br.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(br);return c<t.near||c>t.far?null:{distance:c,point:br.clone(),object:i}}function Tr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,xr),i.getVertexPosition(l,Mr),i.getVertexPosition(c,Sr);const h=Od(i,e,t,n,xr,Mr,Sr,sc);if(h){const d=new C;mn.getBarycoord(sc,xr,Mr,Sr,d),s&&(h.uv=mn.getInterpolatedAttribute(s,o,l,c,d,new re)),r&&(h.uv1=mn.getInterpolatedAttribute(r,o,l,c,d,new re)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};mn.getNormal(xr,Mr,Sr,u.normal),h.face=u,h.barycoord=d}return h}class Ch extends Ft{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Rt,h=Rt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rc extends Lt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ji=new nt,ac=new nt,wr=[],oc=new Fi,Bd=new nt,ws=new Ie,Es=new ti;class Rn extends Ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ji),oc.copy(e.boundingBox).applyMatrix4(Ji),this.boundingBox.union(oc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ti),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ji),Es.copy(e.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(Es)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),e.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ji),ac.multiplyMatrices(n,Ji),ws.matrixWorld=ac,ws.raycast(e,wr);for(let a=0,o=wr.length;a<o;a++){const l=wr[a];l.instanceId=r,l.object=this,t.push(l)}wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new rc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ch(new Float32Array(s*this.count),s,this.count,al,gn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bi=new ti,kd=new re(.5,.5),Er=new C;class vl{constructor(e=new ui,t=new ui,n=new ui,s=new ui,r=new ui,a=new ui){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],x=r[9],p=r[10],g=r[11],S=r[12],w=r[13],M=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,g-m,T-S).normalize(),s[1].setComponents(c+a,f+h,g+m,T+S).normalize(),s[2].setComponents(c+o,f+d,g+x,T+w).normalize(),s[3].setComponents(c-o,f-d,g-x,T-w).normalize(),n)s[4].setComponents(l,u,p,M).normalize(),s[5].setComponents(c-l,f-u,g-p,T-M).normalize();else if(s[4].setComponents(c-l,f-u,g-p,T-M).normalize(),t===Cn)s[5].setComponents(c+l,f+u,g+p,T+M).normalize();else if(t===Ks)s[5].setComponents(l,u,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){bi.center.set(0,0,0);const t=kd.distanceTo(e.center);return bi.radius=.7071067811865476+t,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Er.x=s.normal.x>0?e.max.x:e.min.x,Er.y=s.normal.y>0?e.max.y:e.min.y,Er.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zd extends Oi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const lc=new nt,Fo=new gl,Ar=new ti,Cr=new C;class Hd extends Mt{constructor(e=new vt,t=new zd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(s),Ar.radius+=r,e.ray.intersectsSphere(Ar)===!1)return;lc.copy(s).invert(),Fo.copy(e.ray).applyMatrix4(lc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,x=f;m<x;m++){const p=c.getX(m);Cr.fromBufferAttribute(d,p),cc(Cr,p,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,x=f;m<x;m++)Cr.fromBufferAttribute(d,m),cc(Cr,m,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function cc(i,e,t,n,s,r,a){const o=Fo.distanceSqToPoint(i);if(o<t){const l=new C;Fo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Rh extends Ft{constructor(e=[],t=Li,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gd extends Ft{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zs extends Ft{constructor(e,t,n=Nn,s,r,a,o=Rt,l=Rt,c,h=jn,d=1){if(h!==jn&&h!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Vd extends Zs{constructor(e,t=Nn,n=Li,s,r,a=Rt,o=Rt,l,c=jn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ph extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ei extends vt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(d,2));function m(x,p,g,S,w,M,T,b,R,_,E){const P=M/R,I=T/_,F=M/2,z=T/2,U=b/2,k=R+1,K=_+1;let W=0,oe=0;const q=new C;for(let J=0;J<K;J++){const B=J*I-z;for(let se=0;se<k;se++){const ae=se*P-F;q[x]=ae*S,q[p]=B*w,q[g]=U,c.push(q.x,q.y,q.z),q[x]=0,q[p]=0,q[g]=b>0?1:-1,h.push(q.x,q.y,q.z),d.push(se/R),d.push(1-J/_),W+=1}}for(let J=0;J<_;J++)for(let B=0;B<R;B++){const se=u+B+k*J,ae=u+B+k*(J+1),Ce=u+(B+1)+k*(J+1),qe=u+(B+1)+k*J;l.push(se,ae,qe),l.push(ae,Ce,qe),oe+=6}o.addGroup(f,oe,E),f+=oe,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Js extends vt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new C,h=new re;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class pi extends vt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const x=[],p=n/2;let g=0;S(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new je(d,3)),this.setAttribute("normal",new je(u,3)),this.setAttribute("uv",new je(f,2));function S(){const M=new C,T=new C;let b=0;const R=(t-e)/n;for(let _=0;_<=r;_++){const E=[],P=_/r,I=P*(t-e)+e;for(let F=0;F<=s;F++){const z=F/s,U=z*l+o,k=Math.sin(U),K=Math.cos(U);T.x=I*k,T.y=-P*n+p,T.z=I*K,d.push(T.x,T.y,T.z),M.set(k,R,K).normalize(),u.push(M.x,M.y,M.z),f.push(z,1-P),E.push(m++)}x.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const P=x[E][_],I=x[E+1][_],F=x[E+1][_+1],z=x[E][_+1];(e>0||E!==0)&&(h.push(P,I,z),b+=3),(t>0||E!==r-1)&&(h.push(I,F,z),b+=3)}c.addGroup(g,b,0),g+=b}function w(M){const T=m,b=new re,R=new C;let _=0;const E=M===!0?e:t,P=M===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,p*P,0),u.push(0,P,0),f.push(.5,.5),m++;const I=m;for(let F=0;F<=s;F++){const U=F/s*l+o,k=Math.cos(U),K=Math.sin(U);R.x=E*K,R.y=p*P,R.z=E*k,d.push(R.x,R.y,R.z),u.push(0,P,0),b.x=k*.5+.5,b.y=K*.5*P+.5,f.push(b.x,b.y),m++}for(let F=0;F<s;F++){const z=T+F,U=I+F;M===!0?h.push(U,U+1,z):h.push(U+1,U,z),_+=3}c.addGroup(g,_,M===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class aa extends vt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(r.slice(),3)),this.setAttribute("uv",new je(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const w=new C,M=new C,T=new C;for(let b=0;b<t.length;b+=3)f(t[b+0],w),f(t[b+1],M),f(t[b+2],T),l(w,M,T,S)}function l(S,w,M,T){const b=T+1,R=[];for(let _=0;_<=b;_++){R[_]=[];const E=S.clone().lerp(M,_/b),P=w.clone().lerp(M,_/b),I=b-_;for(let F=0;F<=I;F++)F===0&&_===b?R[_][F]=E:R[_][F]=E.clone().lerp(P,F/I)}for(let _=0;_<b;_++)for(let E=0;E<2*(b-_)-1;E++){const P=Math.floor(E/2);E%2===0?(u(R[_][P+1]),u(R[_+1][P]),u(R[_][P])):(u(R[_][P+1]),u(R[_+1][P+1]),u(R[_+1][P]))}}function c(S){const w=new C;for(let M=0;M<r.length;M+=3)w.x=r[M+0],w.y=r[M+1],w.z=r[M+2],w.normalize().multiplyScalar(S),r[M+0]=w.x,r[M+1]=w.y,r[M+2]=w.z}function h(){const S=new C;for(let w=0;w<r.length;w+=3){S.x=r[w+0],S.y=r[w+1],S.z=r[w+2];const M=p(S)/2/Math.PI+.5,T=g(S)/Math.PI+.5;a.push(M,1-T)}m(),d()}function d(){for(let S=0;S<a.length;S+=6){const w=a[S+0],M=a[S+2],T=a[S+4],b=Math.max(w,M,T),R=Math.min(w,M,T);b>.9&&R<.1&&(w<.2&&(a[S+0]+=1),M<.2&&(a[S+2]+=1),T<.2&&(a[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function f(S,w){const M=S*3;w.x=e[M+0],w.y=e[M+1],w.z=e[M+2]}function m(){const S=new C,w=new C,M=new C,T=new C,b=new re,R=new re,_=new re;for(let E=0,P=0;E<r.length;E+=9,P+=6){S.set(r[E+0],r[E+1],r[E+2]),w.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),b.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),_.set(a[P+4],a[P+5]),T.copy(S).add(w).add(M).divideScalar(3);const I=p(T);x(b,P+0,S,I),x(R,P+2,w,I),x(_,P+4,M,I)}}function x(S,w,M,T){T<0&&S.x===1&&(a[w]=S.x-1),M.x===0&&M.z===0&&(a[w]=T/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function g(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new aa(e.vertices,e.indices,e.radius,e.detail)}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new re:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,s=[],r=[],a=[],o=new C,l=new nt;for(let f=0;f<=e;f++){const m=f/e;s[f]=this.getTangentAt(m,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class _l extends On{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new re){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Wd extends _l{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function xl(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const hc=new C,uc=new C,Fa=new xl,Oa=new xl,Ba=new xl;class Xd extends On{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(uc.subVectors(s[0],s[1]).add(s[0]),c=uc);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(hc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=hc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),p<1e-4&&(p=x),Fa.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,x,p),Oa.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,x,p),Ba.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,x,p)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Oa.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Ba.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Fa.calc(l),Oa.calc(l),Ba.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function qd(i,e){const t=1-i;return t*t*e}function Yd(i,e){return 2*(1-i)*i*e}function $d(i,e){return i*i*e}function Gs(i,e,t,n){return qd(i,e)+Yd(i,t)+$d(i,n)}function Kd(i,e){const t=1-i;return t*t*t*e}function Zd(i,e){const t=1-i;return 3*t*t*i*e}function Jd(i,e){return 3*(1-i)*i*i*e}function Qd(i,e){return i*i*i*e}function Vs(i,e,t,n,s){return Kd(i,e)+Zd(i,t)+Jd(i,n)+Qd(i,s)}class Lh extends On{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(e,s.x,r.x,a.x,o.x),Vs(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jd extends On{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(e,s.x,r.x,a.x,o.x),Vs(e,s.y,r.y,a.y,o.y),Vs(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ih extends On{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ef extends On{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dh extends On{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Gs(e,s.x,r.x,a.x),Gs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tf extends On{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Gs(e,s.x,r.x,a.x),Gs(e,s.y,r.y,a.y),Gs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uh extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(dc(o,l.x,c.x,h.x,d.x),dc(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new re().fromArray(s))}return this}}var Oo=Object.freeze({__proto__:null,ArcCurve:Wd,CatmullRomCurve3:Xd,CubicBezierCurve:Lh,CubicBezierCurve3:jd,EllipseCurve:_l,LineCurve:Ih,LineCurve3:ef,QuadraticBezierCurve:Dh,QuadraticBezierCurve3:tf,SplineCurve:Uh});class nf extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Oo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Oo[s.type]().fromJSON(s))}return this}}class Bo extends nf{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ih(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Dh(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Lh(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Uh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new _l(e,t,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class vs extends Bo{constructor(e){super(e),this.uuid=Ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Bo().fromJSON(s))}return this}}function sf(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Nh(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=cf(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,d=l;for(let u=t;u<s;u+=t){const f=i[u],m=i[u+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Qs(r,a,t,o,l,c,0),a}function Nh(i,e,t,n,s){let r;if(s===Mf(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=fc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=fc(a/n|0,i[a],i[a+1],r);return r&&us(r,r.next)&&(er(r),r=r.next),r}function Di(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(us(t,t.next)||gt(t.prev,t,t.next)===0)){if(er(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qs(i,e,t,n,s,r,a){if(!i)return;!a&&r&&pf(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?af(i,n,s,r):rf(i)){e.push(l.i,i.i,c.i),er(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=of(Di(i),e),Qs(i,e,t,n,s,r,2)):a===2&&lf(i,e,t,n,s,r):Qs(Di(i),e,t,n,s,r,1);break}}}function rf(i){const e=i.prev,t=i,n=i.next;if(gt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c);let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Ns(s,o,r,l,a,c,m.x,m.y)&&gt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function af(i,e,t,n){const s=i.prev,r=i,a=i.next;if(gt(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),m=Math.min(h,d,u),x=Math.max(o,l,c),p=Math.max(h,d,u),g=ko(f,m,e,t,n),S=ko(x,p,e,t,n);let w=i.prevZ,M=i.nextZ;for(;w&&w.z>=g&&M&&M.z<=S;){if(w.x>=f&&w.x<=x&&w.y>=m&&w.y<=p&&w!==s&&w!==a&&Ns(o,h,l,d,c,u,w.x,w.y)&&gt(w.prev,w,w.next)>=0||(w=w.prevZ,M.x>=f&&M.x<=x&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&Ns(o,h,l,d,c,u,M.x,M.y)&&gt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;w&&w.z>=g;){if(w.x>=f&&w.x<=x&&w.y>=m&&w.y<=p&&w!==s&&w!==a&&Ns(o,h,l,d,c,u,w.x,w.y)&&gt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=S;){if(M.x>=f&&M.x<=x&&M.y>=m&&M.y<=p&&M!==s&&M!==a&&Ns(o,h,l,d,c,u,M.x,M.y)&&gt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function of(i,e){let t=i;do{const n=t.prev,s=t.next.next;!us(n,s)&&Oh(n,t,t.next,s)&&js(n,s)&&js(s,n)&&(e.push(n.i,t.i,s.i),er(t),er(t.next),t=i=s),t=t.next}while(t!==i);return Di(t)}function lf(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&vf(a,o)){let l=Bh(a,o);a=Di(a,a.next),l=Di(l,l.next),Qs(a,e,t,n,s,r,0),Qs(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function cf(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Nh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(gf(c))}s.sort(hf);for(let r=0;r<s.length;r++)t=uf(s[r],t);return t}function hf(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function uf(i,e){const t=df(i,e);if(!t)return e;const n=Bh(t,i);return Di(n,n.next),Di(t,t.next)}function df(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(us(i,t))return t;do{if(us(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Fh(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const d=Math.abs(s-t.y)/(n-t.x);js(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&ff(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function ff(i,e){return gt(i.prev,i,e.prev)<0&&gt(e.next,i,i.next)<0}function pf(i,e,t,n){let s=i;do s.z===0&&(s.z=ko(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,mf(s)}function mf(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function ko(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function gf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Fh(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Ns(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Fh(i,e,t,n,s,r,a,o)}function vf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!_f(i,e)&&(js(i,e)&&js(e,i)&&xf(i,e)&&(gt(i.prev,i,e.prev)||gt(i,e.prev,e))||us(i,e)&&gt(i.prev,i,i.next)>0&&gt(e.prev,e,e.next)>0)}function gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function us(i,e){return i.x===e.x&&i.y===e.y}function Oh(i,e,t,n){const s=Pr(gt(i,e,t)),r=Pr(gt(i,e,n)),a=Pr(gt(t,n,i)),o=Pr(gt(t,n,e));return!!(s!==r&&a!==o||s===0&&Rr(i,t,e)||r===0&&Rr(i,n,e)||a===0&&Rr(t,i,n)||o===0&&Rr(t,e,n))}function Rr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Pr(i){return i>0?1:i<0?-1:0}function _f(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Oh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function js(i,e){return gt(i.prev,i,i.next)<0?gt(i,e,i.next)>=0&&gt(i,i.prev,e)>=0:gt(i,e,i.prev)<0||gt(i,i.next,e)<0}function xf(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Bh(i,e){const t=zo(i.i,i.x,i.y),n=zo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function fc(i,e,t,n){const s=zo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zo(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Mf(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Sf{static triangulate(e,t,n=2){return sf(e,t,n)}}class Kn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Kn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];pc(e),mc(n,e);let a=e.length;t.forEach(pc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,mc(n,t[l]);const o=Sf.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function pc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function mc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class tr extends vt{constructor(e=new vs([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new je(s,3)),this.setAttribute("uv",new je(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:yf;let w,M=!1,T,b,R,_;if(g){w=g.getSpacedPoints(h),M=!0,u=!1;const ne=g.isCatmullRomCurve3?g.closed:!1;T=g.computeFrenetFrames(h,ne),b=new C,R=new C,_=new C}u||(p=0,f=0,m=0,x=0);const E=o.extractPoints(c);let P=E.shape;const I=E.holes;if(!Kn.isClockWise(P)){P=P.reverse();for(let ne=0,ce=I.length;ne<ce;ne++){const he=I[ne];Kn.isClockWise(he)&&(I[ne]=he.reverse())}}function z(ne){const he=10000000000000001e-36;let ue=ne[0];for(let pe=1;pe<=ne.length;pe++){const Be=pe%ne.length,Fe=ne[Be],Ge=Fe.x-ue.x,We=Fe.y-ue.y,L=Ge*Ge+We*We,tt=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(ue.x),Math.abs(ue.y)),Ye=he*tt*tt;if(L<=Ye){ne.splice(Be,1),pe--;continue}ue=Fe}}z(P),I.forEach(z);const U=I.length,k=P;for(let ne=0;ne<U;ne++){const ce=I[ne];P=P.concat(ce)}function K(ne,ce,he){return ce||it("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(ce,he)}const W=P.length;function oe(ne,ce,he){let ue,pe,Be;const Fe=ne.x-ce.x,Ge=ne.y-ce.y,We=he.x-ne.x,L=he.y-ne.y,tt=Fe*Fe+Ge*Ge,Ye=Fe*L-Ge*We;if(Math.abs(Ye)>Number.EPSILON){const A=Math.sqrt(tt),v=Math.sqrt(We*We+L*L),O=ce.x-Ge/A,V=ce.y+Fe/A,Y=he.x-L/v,fe=he.y+We/v,me=((Y-O)*L-(fe-V)*We)/(Fe*L-Ge*We);ue=O+Fe*me-ne.x,pe=V+Ge*me-ne.y;const $=ue*ue+pe*pe;if($<=2)return new re(ue,pe);Be=Math.sqrt($/2)}else{let A=!1;Fe>Number.EPSILON?We>Number.EPSILON&&(A=!0):Fe<-Number.EPSILON?We<-Number.EPSILON&&(A=!0):Math.sign(Ge)===Math.sign(L)&&(A=!0),A?(ue=-Ge,pe=Fe,Be=Math.sqrt(tt)):(ue=Fe,pe=Ge,Be=Math.sqrt(tt/2))}return new re(ue/Be,pe/Be)}const q=[];for(let ne=0,ce=k.length,he=ce-1,ue=ne+1;ne<ce;ne++,he++,ue++)he===ce&&(he=0),ue===ce&&(ue=0),q[ne]=oe(k[ne],k[he],k[ue]);const J=[];let B,se=q.concat();for(let ne=0,ce=U;ne<ce;ne++){const he=I[ne];B=[];for(let ue=0,pe=he.length,Be=pe-1,Fe=ue+1;ue<pe;ue++,Be++,Fe++)Be===pe&&(Be=0),Fe===pe&&(Fe=0),B[ue]=oe(he[ue],he[Be],he[Fe]);J.push(B),se=se.concat(B)}let ae;if(p===0)ae=Kn.triangulateShape(k,I);else{const ne=[],ce=[];for(let he=0;he<p;he++){const ue=he/p,pe=f*Math.cos(ue*Math.PI/2),Be=m*Math.sin(ue*Math.PI/2)+x;for(let Fe=0,Ge=k.length;Fe<Ge;Fe++){const We=K(k[Fe],q[Fe],Be);xe(We.x,We.y,-pe),ue===0&&ne.push(We)}for(let Fe=0,Ge=U;Fe<Ge;Fe++){const We=I[Fe];B=J[Fe];const L=[];for(let tt=0,Ye=We.length;tt<Ye;tt++){const A=K(We[tt],B[tt],Be);xe(A.x,A.y,-pe),ue===0&&L.push(A)}ue===0&&ce.push(L)}}ae=Kn.triangulateShape(ne,ce)}const Ce=ae.length,qe=m+x;for(let ne=0;ne<W;ne++){const ce=u?K(P[ne],se[ne],qe):P[ne];M?(R.copy(T.normals[0]).multiplyScalar(ce.x),b.copy(T.binormals[0]).multiplyScalar(ce.y),_.copy(w[0]).add(R).add(b),xe(_.x,_.y,_.z)):xe(ce.x,ce.y,0)}for(let ne=1;ne<=h;ne++)for(let ce=0;ce<W;ce++){const he=u?K(P[ce],se[ce],qe):P[ce];M?(R.copy(T.normals[ne]).multiplyScalar(he.x),b.copy(T.binormals[ne]).multiplyScalar(he.y),_.copy(w[ne]).add(R).add(b),xe(_.x,_.y,_.z)):xe(he.x,he.y,d/h*ne)}for(let ne=p-1;ne>=0;ne--){const ce=ne/p,he=f*Math.cos(ce*Math.PI/2),ue=m*Math.sin(ce*Math.PI/2)+x;for(let pe=0,Be=k.length;pe<Be;pe++){const Fe=K(k[pe],q[pe],ue);xe(Fe.x,Fe.y,d+he)}for(let pe=0,Be=I.length;pe<Be;pe++){const Fe=I[pe];B=J[pe];for(let Ge=0,We=Fe.length;Ge<We;Ge++){const L=K(Fe[Ge],B[Ge],ue);M?xe(L.x,L.y+w[h-1].y,w[h-1].x+he):xe(L.x,L.y,d+he)}}}Ze(),Z();function Ze(){const ne=s.length/3;if(u){let ce=0,he=W*ce;for(let ue=0;ue<Ce;ue++){const pe=ae[ue];ke(pe[2]+he,pe[1]+he,pe[0]+he)}ce=h+p*2,he=W*ce;for(let ue=0;ue<Ce;ue++){const pe=ae[ue];ke(pe[0]+he,pe[1]+he,pe[2]+he)}}else{for(let ce=0;ce<Ce;ce++){const he=ae[ce];ke(he[2],he[1],he[0])}for(let ce=0;ce<Ce;ce++){const he=ae[ce];ke(he[0]+W*h,he[1]+W*h,he[2]+W*h)}}n.addGroup(ne,s.length/3-ne,0)}function Z(){const ne=s.length/3;let ce=0;te(k,ce),ce+=k.length;for(let he=0,ue=I.length;he<ue;he++){const pe=I[he];te(pe,ce),ce+=pe.length}n.addGroup(ne,s.length/3-ne,1)}function te(ne,ce){let he=ne.length;for(;--he>=0;){const ue=he;let pe=he-1;pe<0&&(pe=ne.length-1);for(let Be=0,Fe=h+p*2;Be<Fe;Be++){const Ge=W*Be,We=W*(Be+1),L=ce+ue+Ge,tt=ce+pe+Ge,Ye=ce+pe+We,A=ce+ue+We;we(L,tt,Ye,A)}}}function xe(ne,ce,he){l.push(ne),l.push(ce),l.push(he)}function ke(ne,ce,he){He(ne),He(ce),He(he);const ue=s.length/3,pe=S.generateTopUV(n,s,ue-3,ue-2,ue-1);rt(pe[0]),rt(pe[1]),rt(pe[2])}function we(ne,ce,he,ue){He(ne),He(ce),He(ue),He(ce),He(he),He(ue);const pe=s.length/3,Be=S.generateSideWallUV(n,s,pe-6,pe-3,pe-2,pe-1);rt(Be[0]),rt(Be[1]),rt(Be[3]),rt(Be[1]),rt(Be[2]),rt(Be[3])}function He(ne){s.push(l[ne*3+0]),s.push(l[ne*3+1]),s.push(l[ne*3+2])}function rt(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return bf(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Oo[s.type]().fromJSON(s)),new tr(n,e.options)}}const yf={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new re(r,a),new re(o,l),new re(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],m=e[s*3+2],x=e[r*3],p=e[r*3+1],g=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new re(a,1-l),new re(c,1-d),new re(u,1-m),new re(x,1-g)]:[new re(o,1-l),new re(h,1-d),new re(f,1-m),new re(p,1-g)]}};function bf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ml extends vt{constructor(e=[new re(0,-.5),new re(.5,0),new re(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Je(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,d=new C,u=new re,f=new C,m=new C,x=new C;let p=0,g=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:p=e[S+1].x-e[S].x,g=e[S+1].y-e[S].y,f.x=g*1,f.y=-p,f.z=g*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:p=e[S+1].x-e[S].x,g=e[S+1].y-e[S].y,f.x=g*1,f.y=-p,f.z=g*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(m)}for(let S=0;S<=t;S++){const w=n+S*h*s,M=Math.sin(w),T=Math.cos(w);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*M,d.y=e[b].y,d.z=e[b].x*T,a.push(d.x,d.y,d.z),u.x=S/t,u.y=b/(e.length-1),o.push(u.x,u.y);const R=l[3*b+0]*M,_=l[3*b+1],E=l[3*b+0]*T;c.push(R,_,E)}}for(let S=0;S<t;S++)for(let w=0;w<e.length-1;w++){const M=w+S*e.length,T=M,b=M+e.length,R=M+e.length+1,_=M+1;r.push(T,b,_),r.push(R,_,b)}this.setIndex(r),this.setAttribute("position",new je(a,3)),this.setAttribute("uv",new je(o,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.points,e.segments,e.phiStart,e.phiLength)}}class Sl extends aa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Sl(e.radius,e.detail)}}class Nt extends vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],m=[],x=[],p=[];for(let g=0;g<h;g++){const S=g*u-a;for(let w=0;w<c;w++){const M=w*d-r;m.push(M,-S,0),x.push(0,0,1),p.push(w/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let S=0;S<o;S++){const w=S+c*g,M=S+c*(g+1),T=S+1+c*(g+1),b=S+1+c*g;f.push(w,M,b),f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.width,e.height,e.widthSegments,e.heightSegments)}}class yl extends vt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/s,f=new C,m=new re;for(let x=0;x<=s;x++){for(let p=0;p<=n;p++){const g=r+p/n*a;f.x=d*Math.cos(g),f.y=d*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let x=0;x<s;x++){const p=x*(n+1);for(let g=0;g<n;g++){const S=g+p,w=S,M=S+n+1,T=S+n+2,b=S+1;o.push(w,M,b),o.push(M,T,b)}}this.setIndex(o),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ri extends vt{constructor(e=new vs([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(r,3)),this.setAttribute("uv",new je(a,2));function c(h){const d=s.length/3,u=h.extractPoints(t);let f=u.shape;const m=u.holes;Kn.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){const S=m[p];Kn.isClockWise(S)===!0&&(m[p]=S.reverse())}const x=Kn.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){const S=m[p];f=f.concat(S)}for(let p=0,g=f.length;p<g;p++){const S=f[p];s.push(S.x,S.y,0),r.push(0,0,1),a.push(S.x,S.y)}for(let p=0,g=x.length;p<g;p++){const S=x[p],w=S[0]+d,M=S[1]+d,T=S[2]+d;n.push(w,M,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Tf(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Ri(n,e.curveSegments)}}function Tf(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class ds extends vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new C,u=new C,f=[],m=[],x=[],p=[];for(let g=0;g<=n;g++){const S=[],w=g/n,M=a+w*o,T=e*Math.cos(M),b=Math.sqrt(e*e-T*T);let R=0;g===0&&a===0?R=.5/t:g===n&&l===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const E=_/t,P=s+E*r;d.x=-b*Math.cos(P),d.y=T,d.z=b*Math.sin(P),m.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),p.push(E+R,1-w),S.push(c++)}h.push(S)}for(let g=0;g<n;g++)for(let S=0;S<t;S++){const w=h[g][S+1],M=h[g][S],T=h[g+1][S],b=h[g+1][S+1];(g!==0||a>0)&&f.push(w,M,b),(g!==n-1||l<Math.PI)&&f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class bl extends aa{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bl(e.radius,e.detail)}}class gi extends vt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new C,f=new C,m=new C;for(let x=0;x<=n;x++){const p=a+x/n*o;for(let g=0;g<=s;g++){const S=g/s*r;f.x=(e+t*Math.cos(p))*Math.cos(S),f.y=(e+t*Math.cos(p))*Math.sin(S),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),u.x=e*Math.cos(S),u.y=e*Math.sin(S),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(g/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let p=1;p<=s;p++){const g=(s+1)*x+p-1,S=(s+1)*(x-1)+p-1,w=(s+1)*(x-1)+p,M=(s+1)*x+p;l.push(g,S,M),l.push(S,w,M)}this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function fs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(gc(s))s.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(gc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Gt(i){const e={};for(let t=0;t<i.length;t++){const n=fs(i[t]);for(const s in n)e[s]=n[s]}return e}function gc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function wf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const nr={clone:fs,merge:Gt};var Ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ef,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fs(e.uniforms),this.uniformsGroups=wf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ee().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new nt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class zh extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ut extends Oi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cf extends Oi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zr,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $t,this.combine=Zo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rf extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pf extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sr extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Lf extends sr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ka=new nt,vc=new C,_c=new C;class Tl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vl,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;vc.setFromMatrixPosition(e.matrixWorld),t.position.copy(vc),_c.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_c),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ka,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Ks||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Lr=new C,Ir=new ln,Mn=new C;class Hh extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lr,Ir,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Ir,Mn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Lr,Ir,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Ir,Mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ci=new C,xc=new re,Mc=new re;class en extends Hh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,xc,Mc),t.subVectors(Mc,xc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class If extends Tl{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=hs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class Df extends sr{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new If}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Uf extends Tl{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0}}class Ho extends sr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class _s extends Hh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Nf extends Tl{constructor(){super(new _s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Go extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Nf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Ff extends sr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Qi=-90,ji=1;class Of extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(Qi,ji,e,t);s.layers=this.layers,this.add(s);const r=new en(Qi,ji,e,t);r.layers=this.layers,this.add(r);const a=new en(Qi,ji,e,t);a.layers=this.layers,this.add(a);const o=new en(Qi,ji,e,t);o.layers=this.layers,this.add(o);const l=new en(Qi,ji,e,t);l.layers=this.layers,this.add(l);const c=new en(Qi,ji,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Bf extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class kf{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=zf.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function zf(){this._document.hidden===!1&&this.reset()}const Sc=new nt;class Gh{constructor(e,t,n=0,s=1/0){this.ray=new gl(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new pl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sc),this}intersectObject(e,t=!0,n=[]){return Vo(e,this,n,t),n.sort(yc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Vo(e[s],this,n,t);return n.sort(yc),n}}function yc(i,e){return i.distance-e.distance}function Vo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Vo(r[a],e,t,!0)}}class Vh{static{Vh.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function bc(i,e,t,n){const s=Hf(n);switch(t){case Sh:return i*e;case al:return i*e/s.components*s.byteLength;case ol:return i*e/s.components*s.byteLength;case Ii:return i*e*2/s.components*s.byteLength;case ll:return i*e*2/s.components*s.byteLength;case yh:return i*e*3/s.components*s.byteLength;case vn:return i*e*4/s.components*s.byteLength;case cl:return i*e*4/s.components*s.byteLength;case zr:case Hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:case lo:return Math.max(i,16)*Math.max(e,8)/4;case ro:case oo:return Math.max(i,8)*Math.max(e,8)/2;case co:case ho:case fo:case po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uo:case $r:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case _o:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case wo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ro:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Po:case Lo:case Io:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Do:case Uo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Kr:case No:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hf(i){switch(i){case tn:case vh:return{byteLength:1,components:1};case Ys:case _h:case qt:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Nn:case il:case gn:return{byteLength:4,components:1};case xh:case Mh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);function Wh(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Gf(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],x=d[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wf=`#ifdef USE_ALPHAHASH
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
#endif`,Xf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kf=`#ifdef USE_AOMAP
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
#endif`,Zf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jf=`#ifdef USE_BATCHING
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
#endif`,Qf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ep=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,np=`#ifdef USE_IRIDESCENCE
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
#endif`,ip=`#ifdef USE_BUMPMAP
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
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,up=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,dp=`#define PI 3.141592653589793
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
} // validated`,fp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,pp=`vec3 transformedNormal = objectNormal;
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
#endif`,mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_p=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sp=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Tp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pp=`#ifdef USE_GRADIENTMAP
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
}`,Lp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Up=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Np=`#ifdef USE_ENVMAP
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
#endif`,Fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zp=`PhysicalMaterial material;
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
#endif`,Hp=`uniform sampler2D dfgLUT;
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
}`,Gp=`
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
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jp=`#if defined( USE_POINTS_UV )
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
#endif`,em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,im=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`#ifdef USE_MORPHTARGETS
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
#endif`,am=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,um=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dm=`#ifdef USE_NORMALMAP
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
#endif`,fm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cm=`float getShadowMask() {
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
}`,Rm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pm=`#ifdef USE_SKINNING
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
#endif`,Lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Im=`#ifdef USE_SKINNING
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
#endif`,Dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Um=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Om=`#ifdef USE_TRANSMISSION
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
#endif`,Bm=`#ifdef USE_TRANSMISSION
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wm=`uniform sampler2D t2D;
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$m=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Km=`#include <common>
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
}`,Zm=`#if DEPTH_PACKING == 3200
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
}`,Jm=`#define DISTANCE
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
}`,Qm=`#define DISTANCE
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
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,e0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`uniform float scale;
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#include <common>
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#define LAMBERT
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
}`,a0=`#define LAMBERT
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
}`,o0=`#define MATCAP
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
}`,l0=`#define MATCAP
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
}`,c0=`#define NORMAL
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
}`,h0=`#define NORMAL
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
}`,u0=`#define PHONG
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
}`,d0=`#define PHONG
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
}`,f0=`#define STANDARD
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
}`,p0=`#define STANDARD
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
}`,m0=`#define TOON
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
}`,g0=`#define TOON
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
}`,v0=`uniform float size;
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
}`,_0=`uniform vec3 diffuse;
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
}`,x0=`#include <common>
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
}`,M0=`uniform vec3 color;
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
}`,S0=`uniform float rotation;
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
}`,y0=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:Vf,alphahash_pars_fragment:Wf,alphamap_fragment:Xf,alphamap_pars_fragment:qf,alphatest_fragment:Yf,alphatest_pars_fragment:$f,aomap_fragment:Kf,aomap_pars_fragment:Zf,batching_pars_vertex:Jf,batching_vertex:Qf,begin_vertex:jf,beginnormal_vertex:ep,bsdfs:tp,iridescence_fragment:np,bumpmap_pars_fragment:ip,clipping_planes_fragment:sp,clipping_planes_pars_fragment:rp,clipping_planes_pars_vertex:ap,clipping_planes_vertex:op,color_fragment:lp,color_pars_fragment:cp,color_pars_vertex:hp,color_vertex:up,common:dp,cube_uv_reflection_fragment:fp,defaultnormal_vertex:pp,displacementmap_pars_vertex:mp,displacementmap_vertex:gp,emissivemap_fragment:vp,emissivemap_pars_fragment:_p,colorspace_fragment:xp,colorspace_pars_fragment:Mp,envmap_fragment:Sp,envmap_common_pars_fragment:yp,envmap_pars_fragment:bp,envmap_pars_vertex:Tp,envmap_physical_pars_fragment:Np,envmap_vertex:wp,fog_vertex:Ep,fog_pars_vertex:Ap,fog_fragment:Cp,fog_pars_fragment:Rp,gradientmap_pars_fragment:Pp,lightmap_pars_fragment:Lp,lights_lambert_fragment:Ip,lights_lambert_pars_fragment:Dp,lights_pars_begin:Up,lights_toon_fragment:Fp,lights_toon_pars_fragment:Op,lights_phong_fragment:Bp,lights_phong_pars_fragment:kp,lights_physical_fragment:zp,lights_physical_pars_fragment:Hp,lights_fragment_begin:Gp,lights_fragment_maps:Vp,lights_fragment_end:Wp,lightprobes_pars_fragment:Xp,logdepthbuf_fragment:qp,logdepthbuf_pars_fragment:Yp,logdepthbuf_pars_vertex:$p,logdepthbuf_vertex:Kp,map_fragment:Zp,map_pars_fragment:Jp,map_particle_fragment:Qp,map_particle_pars_fragment:jp,metalnessmap_fragment:em,metalnessmap_pars_fragment:tm,morphinstance_vertex:nm,morphcolor_vertex:im,morphnormal_vertex:sm,morphtarget_pars_vertex:rm,morphtarget_vertex:am,normal_fragment_begin:om,normal_fragment_maps:lm,normal_pars_fragment:cm,normal_pars_vertex:hm,normal_vertex:um,normalmap_pars_fragment:dm,clearcoat_normal_fragment_begin:fm,clearcoat_normal_fragment_maps:pm,clearcoat_pars_fragment:mm,iridescence_pars_fragment:gm,opaque_fragment:vm,packing:_m,premultiplied_alpha_fragment:xm,project_vertex:Mm,dithering_fragment:Sm,dithering_pars_fragment:ym,roughnessmap_fragment:bm,roughnessmap_pars_fragment:Tm,shadowmap_pars_fragment:wm,shadowmap_pars_vertex:Em,shadowmap_vertex:Am,shadowmask_pars_fragment:Cm,skinbase_vertex:Rm,skinning_pars_vertex:Pm,skinning_vertex:Lm,skinnormal_vertex:Im,specularmap_fragment:Dm,specularmap_pars_fragment:Um,tonemapping_fragment:Nm,tonemapping_pars_fragment:Fm,transmission_fragment:Om,transmission_pars_fragment:Bm,uv_pars_fragment:km,uv_pars_vertex:zm,uv_vertex:Hm,worldpos_vertex:Gm,background_vert:Vm,background_frag:Wm,backgroundCube_vert:Xm,backgroundCube_frag:qm,cube_vert:Ym,cube_frag:$m,depth_vert:Km,depth_frag:Zm,distance_vert:Jm,distance_frag:Qm,equirect_vert:jm,equirect_frag:e0,linedashed_vert:t0,linedashed_frag:n0,meshbasic_vert:i0,meshbasic_frag:s0,meshlambert_vert:r0,meshlambert_frag:a0,meshmatcap_vert:o0,meshmatcap_frag:l0,meshnormal_vert:c0,meshnormal_frag:h0,meshphong_vert:u0,meshphong_frag:d0,meshphysical_vert:f0,meshphysical_frag:p0,meshtoon_vert:m0,meshtoon_frag:g0,points_vert:v0,points_frag:_0,shadow_vert:x0,shadow_frag:M0,sprite_vert:S0,sprite_frag:y0},Me={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},wn={basic:{uniforms:Gt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Gt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ee(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Gt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Gt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Gt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Gt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Gt([Me.points,Me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Gt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Gt([Me.common,Me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Gt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Gt([Me.sprite,Me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Gt([Me.common,Me.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Gt([Me.lights,Me.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};wn.physical={uniforms:Gt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Dr={r:0,b:0,g:0},b0=new nt,Xh=new Xe;Xh.set(-1,0,0,0,1,0,0,0,1);function T0(i,e,t,n,s,r){const a=new Ee(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){const M=S.backgroundBlurriness>0;w=e.get(w,M)}return w}function m(S){let w=!1;const M=f(S);M===null?p(a,o):M&&M.isColor&&(p(M,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(S,w){const M=f(w);M&&(M.isCubeTexture||M.mapping===ra)?(c===void 0&&(c=new Ie(new ei(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:fs(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(b0.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Xh),c.material.toneMapped=et.getTransfer(M.colorSpace)!==lt,(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ie(new Nt(2,2),new Tt({name:"BackgroundMaterial",uniforms:fs(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=et.getTransfer(M.colorSpace)!==lt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,w){S.getRGB(Dr,kh(i)),t.buffers.color.setClear(Dr.r,Dr.g,Dr.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:m,addToRenderList:x,dispose:g}}function w0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(I,F,z,U,k){let K=!1;const W=d(I,U,z,F);r!==W&&(r=W,c(r.object)),K=f(I,U,z,k),K&&m(I,U,z,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,M(I,F,z,U),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function d(I,F,z,U){const k=U.wireframe===!0;let K=n[F.id];K===void 0&&(K={},n[F.id]=K);const W=I.isInstancedMesh===!0?I.id:0;let oe=K[W];oe===void 0&&(oe={},K[W]=oe);let q=oe[z.id];q===void 0&&(q={},oe[z.id]=q);let J=q[k];return J===void 0&&(J=u(l()),q[k]=J),J}function u(I){const F=[],z=[],U=[];for(let k=0;k<t;k++)F[k]=0,z[k]=0,U[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:U,object:I,attributes:{},index:null}}function f(I,F,z,U){const k=r.attributes,K=F.attributes;let W=0;const oe=z.getAttributes();for(const q in oe)if(oe[q].location>=0){const B=k[q];let se=K[q];if(se===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(se=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(se=I.instanceColor)),B===void 0||B.attribute!==se||se&&B.data!==se.data)return!0;W++}return r.attributesNum!==W||r.index!==U}function m(I,F,z,U){const k={},K=F.attributes;let W=0;const oe=z.getAttributes();for(const q in oe)if(oe[q].location>=0){let B=K[q];B===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(B=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(B=I.instanceColor));const se={};se.attribute=B,B&&B.data&&(se.data=B.data),k[q]=se,W++}r.attributes=k,r.attributesNum=W,r.index=U}function x(){const I=r.newAttributes;for(let F=0,z=I.length;F<z;F++)I[F]=0}function p(I){g(I,0)}function g(I,F){const z=r.newAttributes,U=r.enabledAttributes,k=r.attributeDivisors;z[I]=1,U[I]===0&&(i.enableVertexAttribArray(I),U[I]=1),k[I]!==F&&(i.vertexAttribDivisor(I,F),k[I]=F)}function S(){const I=r.newAttributes,F=r.enabledAttributes;for(let z=0,U=F.length;z<U;z++)F[z]!==I[z]&&(i.disableVertexAttribArray(z),F[z]=0)}function w(I,F,z,U,k,K,W){W===!0?i.vertexAttribIPointer(I,F,z,k,K):i.vertexAttribPointer(I,F,z,U,k,K)}function M(I,F,z,U){x();const k=U.attributes,K=z.getAttributes(),W=F.defaultAttributeValues;for(const oe in K){const q=K[oe];if(q.location>=0){let J=k[oe];if(J===void 0&&(oe==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),oe==="instanceColor"&&I.instanceColor&&(J=I.instanceColor)),J!==void 0){const B=J.normalized,se=J.itemSize,ae=e.get(J);if(ae===void 0)continue;const Ce=ae.buffer,qe=ae.type,Ze=ae.bytesPerElement,Z=qe===i.INT||qe===i.UNSIGNED_INT||J.gpuType===il;if(J.isInterleavedBufferAttribute){const te=J.data,xe=te.stride,ke=J.offset;if(te.isInstancedInterleavedBuffer){for(let we=0;we<q.locationSize;we++)g(q.location+we,te.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let we=0;we<q.locationSize;we++)p(q.location+we);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let we=0;we<q.locationSize;we++)w(q.location+we,se/q.locationSize,qe,B,xe*Ze,(ke+se/q.locationSize*we)*Ze,Z)}else{if(J.isInstancedBufferAttribute){for(let te=0;te<q.locationSize;te++)g(q.location+te,J.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let te=0;te<q.locationSize;te++)p(q.location+te);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let te=0;te<q.locationSize;te++)w(q.location+te,se/q.locationSize,qe,B,se*Ze,se/q.locationSize*te*Ze,Z)}}else if(W!==void 0){const B=W[oe];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(q.location,B);break;case 3:i.vertexAttrib3fv(q.location,B);break;case 4:i.vertexAttrib4fv(q.location,B);break;default:i.vertexAttrib1fv(q.location,B)}}}}S()}function T(){E();for(const I in n){const F=n[I];for(const z in F){const U=F[z];for(const k in U){const K=U[k];for(const W in K)h(K[W].object),delete K[W];delete U[k]}}delete n[I]}}function b(I){if(n[I.id]===void 0)return;const F=n[I.id];for(const z in F){const U=F[z];for(const k in U){const K=U[k];for(const W in K)h(K[W].object),delete K[W];delete U[k]}}delete n[I.id]}function R(I){for(const F in n){const z=n[F];for(const U in z){const k=z[U];if(k[I.id]===void 0)continue;const K=k[I.id];for(const W in K)h(K[W].object),delete K[W];delete k[I.id]}}}function _(I){for(const F in n){const z=n[F],U=I.isInstancedMesh===!0?I.id:0,k=z[U];if(k!==void 0){for(const K in k){const W=k[K];for(const oe in W)h(W[oe].object),delete W[oe];delete k[K]}delete z[U],Object.keys(z).length===0&&delete n[F]}}}function E(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:p,disableUnusedAttributes:S}}function E0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function A0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==vn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===qt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==tn&&R!==gn&&!_&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ve("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:M,maxSamples:T,samples:b}}function C0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ui,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,g=i.get(d);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{const S=r?0:n,w=S*4;let M=g.clippingState||null;l.value=M,M=h(m,u,w,f);for(let T=0;T!==w;++T)M[T]=t[T];g.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=l.value,m!==!0||p===null){const g=f+x*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<g)&&(p=new Float32Array(g));for(let w=0,M=f;w!==x;++w,M+=4)a.copy(d[w]).applyMatrix4(S,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}const rs=4,R0=6,P0=20,L0=256,As=new _s,Tc=new Ee;let za=null,Ha=0,Ga=0,Va=!1;const I0=new C,Ti=new C;class Wo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=I0}=r;za=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Ga=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(za,Ha,Ga),this._renderer.xr.enabled=Va,e.scissorTest=!1,es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),za=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Ga=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:qt,format:vn,colorSpace:Jr,depthBuffer:!1},s=wc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=D0(r)),this._blurMaterial=N0(r,e,t),this._ggxMaterial=U0(r,e,t)}return s}_compileMaterial(e){const t=new Ie(new vt,e);this._renderer.compile(t,As)}_sceneToCubeUV(e,t,n,s,r){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Tc),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ie(new ei,new bt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,p=x.material;let g=!1;const S=e.background;S?S.isColor&&(p.color.copy(S),e.background=null,g=!0):(p.color.copy(Tc),g=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;es(s,M*T,w>2?T:0,T,T),d.setRenderTarget(s),g&&d.render(x,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Li||e.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ec());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;es(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,As)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:m}=this,x=this._sizeLods[n],p=3*x*(n>m-rs?n-m+rs:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,es(r,p,g,3*x,2*x),s.setRenderTarget(r),s.render(o,As),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,es(e,p,g,3*x,2*x),s.setRenderTarget(e),s.render(o,As)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],d=3*h*(s>this._lodMax-rs?s-this._lodMax+rs:0),u=4*(this._cubeSize-h);es(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,As)}}function D0(i){const e=[],t=[];let n=i;const s=i-rs+1+R0;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,m=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let g=0;g<d;g++){const S=g%3*2/3-1,w=g>2?0:-1,M=[S,w,0,S+2/3,w,0,S+2/3,w+1,0,S,w,0,S+2/3,w+1,0,S,w+1,0];m.set(M,f*u*g);for(let T=0;T<u;T++){const b=h[T*2]*2-1,R=h[T*2+1]*2-1;g===0?Ti.set(1,R,b):g===1?Ti.set(-b,1,-R):g===2?Ti.set(-b,R,1):g===3?Ti.set(-1,R,-b):g===4?Ti.set(-b,-1,R):Ti.set(b,R,-1),Ti.toArray(x,(g*u+T)*f)}}const p=new vt;p.setAttribute("position",new Lt(m,f)),p.setAttribute("outputDirection",new Lt(x,f)),t.push(new Ie(p,null)),n>rs&&n--}return{lodMeshes:t,sizeLods:e}}function wc(i,e,t){const n=new Ot(i,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function es(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function U0(i,e,t){return new Tt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:L0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function N0(i,e,t){return new Tt({name:"SphericalGaussianBlur",defines:{SAMPLES:P0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oa(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Ec(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oa(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Ac(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function oa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class qh extends Ot{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Rh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ei(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Dn});r.uniforms.tEquirect.value=t;const a=new Ie(s,r),o=t.minFilter;return t.minFilter===fi&&(t.minFilter=Pt),new Of(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function F0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===da||f===fa)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const x=new qh(m.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,m=f===da||f===fa,x=f===Li||f===cs;if(m||x){let p=t.get(u);const g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Wo(i)),p=m?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const S=u.image;return m&&S&&S.height>0||x&&S&&l(S)?(n===null&&(n=new Wo(i)),p=m?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===da?u.mapping=Li:f===fa&&(u.mapping=cs),u}function l(u){let f=0;const m=6;for(let x=0;x<m;x++)u[x]!==void 0&&f++;return f===m}function c(u){const f=u.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function O0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&os("WebGLRenderer: "+n+" extension not supported."),s}}}function B0(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,m=d.attributes.position;let x=0;if(m===void 0)return;if(f!==null){const S=f.array;x=f.version;for(let w=0,M=S.length;w<M;w+=3){const T=S[w+0],b=S[w+1],R=S[w+2];u.push(T,b,b,R,R,T)}}else{const S=m.array;x=m.version;for(let w=0,M=S.length/3-1;w<M;w+=3){const T=w+0,b=w+1,R=w+2;u.push(T,b,b,R,R,T)}}const p=new(m.count>=65535?Ah:Eh)(u,1);p.version=x;const g=r.get(d);g&&e.remove(g),r.set(d,p)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function k0(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let p=0;p<f;p++)x+=u[p];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function z0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function H0(i,e,t){const n=new WeakMap,s=new mt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let P=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),x===!0&&(M=2),p===!0&&(M=3);let T=o.attributes.position.count*M,b=1;T>e.maxTextureSize&&(b=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*b*4*d),_=new Th(R,T,b,d);_.type=gn,_.needsUpdate=!0;const E=M*4;for(let I=0;I<d;I++){const F=g[I],z=S[I],U=w[I],k=T*b*4*I;for(let K=0;K<F.count;K++){const W=K*E;m===!0&&(s.fromBufferAttribute(F,K),R[k+W+0]=s.x,R[k+W+1]=s.y,R[k+W+2]=s.z,R[k+W+3]=0),x===!0&&(s.fromBufferAttribute(z,K),R[k+W+4]=s.x,R[k+W+5]=s.y,R[k+W+6]=s.z,R[k+W+7]=0),p===!0&&(s.fromBufferAttribute(U,K),R[k+W+8]=s.x,R[k+W+9]=s.y,R[k+W+10]=s.z,R[k+W+11]=U.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new re(T,b)},n.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function G0(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const V0={[Jo]:"LINEAR_TONE_MAPPING",[Qo]:"REINHARD_TONE_MAPPING",[jo]:"CINEON_TONE_MAPPING",[sa]:"ACES_FILMIC_TONE_MAPPING",[tl]:"AGX_TONE_MAPPING",[nl]:"NEUTRAL_TONE_MAPPING",[el]:"CUSTOM_TONE_MAPPING"};function W0(i,e,t,n,s,r){const a=new Ot(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new vt;c.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new je([0,2,0,0,2,0],2));const h=new zh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ie(c,h),u=new _s(-1,1,1,-1,0,1);let f=null,m=null,x=!1,p,g=null,S=[],w=!1;this.setSize=function(M,T){a.setSize(M,T),o!==null&&o.setSize(M,T),l!==null&&l.setSize(M,T);for(let b=0;b<S.length;b++){const R=S[b];R.setSize&&R.setSize(M,T)}},this.setEffects=function(M){S=M,w=S.length>0&&S[0].isRenderPass===!0;const T=a.width,b=a.height;S.length>0&&o===null&&(o=new Ot(T,b,{type:qt,depthBuffer:!1,stencilBuffer:!1}),l=new Ot(T,b,{type:qt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<S.length;R++){const _=S[R];_.setSize&&_.setSize(T,b)}},this.begin=function(M,T){if(x||M.toneMapping===Un&&S.length===0)return!1;if(g=T,T!==null){const b=T.width,R=T.height;(a.width!==b||a.height!==R)&&this.setSize(b,R)}return w===!1&&M.setRenderTarget(a),p=M.toneMapping,M.toneMapping=Un,!0},this.hasRenderPass=function(){return w},this.end=function(M,T){M.toneMapping=p,x=!0;let b=a,R=o;for(let _=0;_<S.length;_++){const E=S[_];E.enabled!==!1&&(E.render(M,R,b,T),E.needsSwap!==!1&&(b=R,R=R===o?l:o))}if(f!==M.outputColorSpace||m!==M.toneMapping){f=M.outputColorSpace,m=M.toneMapping,h.defines={},et.getTransfer(f)===lt&&(h.defines.SRGB_TRANSFER="");const _=V0[m];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(g),M.render(d,u),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const Yh=new Ft,Xo=new Zs(1,1),$h=new Th,Kh=new bd,Zh=new Rh,Cc=[],Rc=[],Pc=new Float32Array(16),Lc=new Float32Array(9),Ic=new Float32Array(4);function xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Cc[s];if(r===void 0&&(r=new Float32Array(s),Cc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function la(i,e){let t=Rc[e];t===void 0&&(t=new Int32Array(e),Rc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function X0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function q0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function $0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function K0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),At(t,n)}}function Z0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Lc.set(n),i.uniformMatrix3fv(this.addr,!1,Lc),At(t,n)}}function J0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Pc.set(n),i.uniformMatrix4fv(this.addr,!1,Pc),At(t,n)}}function Q0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function j0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function ng(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function ag(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xo.compareFunction=t.isReversedDepthBuffer()?ul:hl,r=Xo):r=Yh,t.setTexture2D(e||r,s)}function og(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Kh,s)}function lg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Zh,s)}function cg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||$h,s)}function hg(i){switch(i){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return $0;case 35674:return K0;case 35675:return Z0;case 35676:return J0;case 5124:case 35670:return Q0;case 35667:case 35671:return j0;case 35668:case 35672:return eg;case 35669:case 35673:return tg;case 5125:return ng;case 36294:return ig;case 36295:return sg;case 36296:return rg;case 35678:case 36198:case 36298:case 36306:case 35682:return ag;case 35679:case 36299:case 36307:return og;case 35680:case 36300:case 36308:case 36293:return lg;case 36289:case 36303:case 36311:case 36292:return cg}}function ug(i,e){i.uniform1fv(this.addr,e)}function dg(i,e){const t=xs(e,this.size,2);i.uniform2fv(this.addr,t)}function fg(i,e){const t=xs(e,this.size,3);i.uniform3fv(this.addr,t)}function pg(i,e){const t=xs(e,this.size,4);i.uniform4fv(this.addr,t)}function mg(i,e){const t=xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function gg(i,e){const t=xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function vg(i,e){const t=xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function _g(i,e){i.uniform1iv(this.addr,e)}function xg(i,e){i.uniform2iv(this.addr,e)}function Mg(i,e){i.uniform3iv(this.addr,e)}function Sg(i,e){i.uniform4iv(this.addr,e)}function yg(i,e){i.uniform1uiv(this.addr,e)}function bg(i,e){i.uniform2uiv(this.addr,e)}function Tg(i,e){i.uniform3uiv(this.addr,e)}function wg(i,e){i.uniform4uiv(this.addr,e)}function Eg(i,e,t){const n=this.cache,s=e.length,r=la(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Xo:a=Yh;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Ag(i,e,t){const n=this.cache,s=e.length,r=la(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Kh,r[a])}function Cg(i,e,t){const n=this.cache,s=e.length,r=la(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Zh,r[a])}function Rg(i,e,t){const n=this.cache,s=e.length,r=la(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||$h,r[a])}function Pg(i){switch(i){case 5126:return ug;case 35664:return dg;case 35665:return fg;case 35666:return pg;case 35674:return mg;case 35675:return gg;case 35676:return vg;case 5124:case 35670:return _g;case 35667:case 35671:return xg;case 35668:case 35672:return Mg;case 35669:case 35673:return Sg;case 5125:return yg;case 36294:return bg;case 36295:return Tg;case 36296:return wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return Ag;case 35680:case 36300:case 36308:case 36293:return Cg;case 36289:case 36303:case 36311:case 36292:return Rg}}class Lg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hg(t.type)}}class Ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pg(t.type)}}class Dg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Wa=/(\w+)(\])?(\[|\.)?/g;function Dc(i,e){i.seq.push(e),i.map[e.id]=e}function Ug(i,e,t){const n=i.name,s=n.length;for(Wa.lastIndex=0;;){const r=Wa.exec(n),a=Wa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Dc(t,c===void 0?new Lg(o,i,e):new Ig(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Dg(o),Dc(t,d)),t=d}}}class Wr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ug(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Uc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Ng=37297;let Fg=0;function Og(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Nc=new Xe;function Bg(i){et._getMatrix(Nc,et.workingColorSpace,i);const e=`mat3( ${Nc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Qr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Og(i.getShaderSource(e),o)}else return r}function kg(i,e){const t=Bg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const zg={[Jo]:"Linear",[Qo]:"Reinhard",[jo]:"Cineon",[sa]:"ACESFilmic",[tl]:"AgX",[nl]:"Neutral",[el]:"Custom"};function Hg(i,e){const t=zg[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ur=new C;function Gg(){et.getLuminanceCoefficients(Ur);const i=Ur.x.toFixed(4),e=Ur.y.toFixed(4),t=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Wg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Fs(i){return i!==""}function Oc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(i){return i.replace(qg,$g)}const Yg=new Map;function $g(i,e){let t=Ke[e];if(t===void 0){const n=Yg.get(e);if(n!==void 0)t=Ke[n],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qo(t)}const Kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(i){return i.replace(Kg,Zg)}function Zg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Jg={[Bs]:"SHADOWMAP_TYPE_PCF",[Us]:"SHADOWMAP_TYPE_VSM"};function Qg(i){return Jg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jg={[Li]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[ra]:"ENVMAP_TYPE_CUBE_UV"};function ev(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":jg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const tv={[cs]:"ENVMAP_MODE_REFRACTION"};function nv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":tv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const iv={[Zo]:"ENVMAP_BLENDING_MULTIPLY",[ku]:"ENVMAP_BLENDING_MIX",[zu]:"ENVMAP_BLENDING_ADD"};function sv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":iv[i.combine]||"ENVMAP_BLENDING_NONE"}function rv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function av(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Qg(t),c=ev(t),h=nv(t),d=sv(t),u=rv(t),f=Vg(t),m=Wg(r),x=s.createProgram();let p,g,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fs).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fs).join(`
`),g.length>0&&(g+=`
`)):(p=[zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),g=[zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Un?Hg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,kg("linearToOutputTexel",t.outputColorSpace),Gg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),a=qo(a),a=Oc(a,t),a=Bc(a,t),o=qo(o),o=Oc(o,t),o=Bc(o,t),a=kc(a),o=kc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const w=S+p+a,M=S+g+o,T=Uc(s,s.VERTEX_SHADER,w),b=Uc(s,s.FRAGMENT_SHADER,M);s.attachShader(x,T),s.attachShader(x,b),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(I){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(T)||"",U=s.getShaderInfoLog(b)||"",k=F.trim(),K=z.trim(),W=U.trim();let oe=!0,q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,b);else{const J=Fc(s,T,"vertex"),B=Fc(s,b,"fragment");it("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+J+`
`+B)}else k!==""?Ve("WebGLProgram: Program Info Log:",k):(K===""||W==="")&&(q=!1);q&&(I.diagnostics={runnable:oe,programLog:k,vertexShader:{log:K,prefix:p},fragmentShader:{log:W,prefix:g}})}s.deleteShader(T),s.deleteShader(b),_=new Wr(s,x),E=Xg(s,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(x,Ng)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=b,this}let ov=0;class lv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new cv(e),t.set(e,n)),n}}class cv{constructor(e){this.id=ov++,this.code=e,this.usedTimes=0}}function hv(i){return i===Ii||i===$r||i===Kr}function uv(i,e,t,n,s,r){const a=new pl,o=new lv,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,E,P,I,F,z){const U=I.fog,k=F.geometry,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,oe=e.get(_.envMap||K,W),q=oe&&oe.mapping===ra?oe.image.height:null,J=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ve("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const B=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,se=B!==void 0?B.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let Ce,qe,Ze,Z;if(J){const dt=wn[J];Ce=dt.vertexShader,qe=dt.fragmentShader}else{Ce=_.vertexShader,qe=_.fragmentShader;const dt=o.getVertexShaderStage(_),at=o.getFragmentShaderStage(_);o.update(_,dt,at),Ze=dt.id,Z=at.id}const te=i.getRenderTarget(),xe=i.state.buffers.depth.getReversed(),ke=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,He=!!_.map,rt=!!_.matcap,ne=!!oe,ce=!!_.aoMap,he=!!_.lightMap,ue=!!_.bumpMap&&_.wireframe===!1,pe=!!_.normalMap,Be=!!_.displacementMap,Fe=!!_.emissiveMap,Ge=!!_.metalnessMap,We=!!_.roughnessMap,L=_.anisotropy>0,tt=_.clearcoat>0,Ye=_.dispersion>0,A=_.retroreflectivity>0,v=_.iridescence>0,O=_.sheen>0,V=_.transmission>0,Y=L&&!!_.anisotropyMap,fe=tt&&!!_.clearcoatMap,me=tt&&!!_.clearcoatNormalMap,$=tt&&!!_.clearcoatRoughnessMap,j=v&&!!_.iridescenceMap,ge=v&&!!_.iridescenceThicknessMap,ie=O&&!!_.sheenColorMap,ee=O&&!!_.sheenRoughnessMap,de=!!_.specularMap,Se=!!_.specularColorMap,De=!!_.specularIntensityMap,ze=V&&!!_.transmissionMap,N=V&&!!_.thicknessMap,ve=!!_.gradientMap,Q=!!_.alphaMap,_e=_.alphaTest>0,Te=!!_.alphaHash,le=!!_.extensions;let Oe=Un;_.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Oe=i.toneMapping);const Ue={shaderID:J,shaderType:_.type,shaderName:_.name,vertexShader:Ce,fragmentShader:qe,defines:_.defines,customVertexShaderID:Ze,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:we,batchingColor:we&&F._colorsTexture!==null,instancing:ke,instancingColor:ke&&F.instanceColor!==null,instancingMorph:ke&&F.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:He,matcap:rt,envMap:ne,envMapMode:ne&&oe.mapping,envMapCubeUVHeight:q,aoMap:ce,lightMap:he,bumpMap:ue,normalMap:pe,displacementMap:Be,emissiveMap:Fe,normalMapObjectSpace:pe&&_.normalMapType===Vu,normalMapTangentSpace:pe&&_.normalMapType===Zr,packedNormalMap:pe&&_.normalMapType===Zr&&hv(_.normalMap.format),metalnessMap:Ge,roughnessMap:We,anisotropy:L,anisotropyMap:Y,clearcoat:tt,clearcoatMap:fe,clearcoatNormalMap:me,clearcoatRoughnessMap:$,dispersion:Ye,retroreflection:A,iridescence:v,iridescenceMap:j,iridescenceThicknessMap:ge,sheen:O,sheenColorMap:ie,sheenRoughnessMap:ee,specularMap:de,specularColorMap:Se,specularIntensityMap:De,transmission:V,transmissionMap:ze,thicknessMap:N,gradientMap:ve,opaque:_.transparent===!1&&_.blending===ks&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:_e,alphaHash:Te,combine:_.combine,mapUv:He&&m(_.map.channel),aoMapUv:ce&&m(_.aoMap.channel),lightMapUv:he&&m(_.lightMap.channel),bumpMapUv:ue&&m(_.bumpMap.channel),normalMapUv:pe&&m(_.normalMap.channel),displacementMapUv:Be&&m(_.displacementMap.channel),emissiveMapUv:Fe&&m(_.emissiveMap.channel),metalnessMapUv:Ge&&m(_.metalnessMap.channel),roughnessMapUv:We&&m(_.roughnessMap.channel),anisotropyMapUv:Y&&m(_.anisotropyMap.channel),clearcoatMapUv:fe&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:ee&&m(_.sheenRoughnessMap.channel),specularMapUv:de&&m(_.specularMap.channel),specularColorMapUv:Se&&m(_.specularColorMap.channel),specularIntensityMapUv:De&&m(_.specularIntensityMap.channel),transmissionMapUv:ze&&m(_.transmissionMap.channel),thicknessMapUv:N&&m(_.thicknessMap.channel),alphaMapUv:Q&&m(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(pe||L),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!k.attributes.uv&&(He||Q),fog:!!U,useFog:_.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&pe===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ae,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:He&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:Fe&&_.emissiveMap.isVideoTexture===!0&&et.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===on,flipSided:_.side===Xt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:le&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function p(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)E.push(P),E.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(g(E,_),S(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function g(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function S(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const E=f[_.type];let P;if(E){const I=wn[E];P=nr.clone(I.uniforms)}else P=_.uniforms;return P}function M(_,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new av(i,E,_,s),c.push(P),h.set(E,P)),P}function T(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:w,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:R}}function dv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function fv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Hc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Gc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,x,p,g){let S=i[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:p,group:g},i[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=m,S.materialVariant=a(u),S.groupOrder=x,S.renderOrder=u.renderOrder,S.z=p,S.group=g),e++,S}function l(u,f,m,x,p,g,S){S.reversedDepth===!0&&(p=-p);const w=o(u,f,m,x,p,g);m.transmission>0?n.push(w):m.transparent===!0?s.push(w):t.push(w)}function c(u,f,m,x,p,g){const S=o(u,f,m,x,p,g);m.transmission>0?n.unshift(S):m.transparent===!0?s.unshift(S):t.unshift(S)}function h(u,f){t.length>1&&t.sort(u||fv),n.length>1&&n.sort(f||Hc),s.length>1&&s.sort(f||Hc)}function d(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function pv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Gc,i.set(n,[a])):s>=r.length?(a=new Gc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function mv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new Ee};break;case"SpotLight":t={position:new C,direction:new C,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function gv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let vv=0;function _v(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function xv(i){const e=new mv,t=gv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new nt,a=new nt;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let f=0,m=0,x=0,p=0,g=0,S=0,w=0,M=0,T=0,b=0,R=0,_=0,E=0,P=0;c.sort(_v);for(let F=0,z=c.length;F<z;F++){const U=c[F],k=U.color,K=U.intensity,W=U.distance;let oe=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Ii?oe=U.shadow.map.texture:oe=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=k.r*K,d+=k.g*K,u+=k.b*K;else if(U.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(U.sh.coefficients[q],K);P++}else if(U.isSunLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,B=t.get(U);B.shadowIntensity=J.intensity,B.shadowBias=J.bias,B.shadowNormalBias=J.normalBias,B.shadowRadius=J.radius,B.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[m]=B,n.sunShadowMap[m]=oe;const se=J.getViewportCount();for(let ae=0;ae<se;ae++)n.sunShadowMatrix[x+ae]=J.getMatrix(ae),n.sunShadowCascade[x+ae]=J._cascadeData[ae];x+=se,m++}n.sun[f]=q,f++}else if(U.isDirectionalLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,B=t.get(U);B.shadowIntensity=J.intensity,B.shadowBias=J.bias,B.shadowNormalBias=J.normalBias,B.shadowRadius=J.radius,B.shadowMapSize=J.mapSize,n.directionalShadow[p]=B,n.directionalShadowMap[p]=oe,n.directionalShadowMatrix[p]=U.shadow.matrix,T++}n.directional[p]=q,p++}else if(U.isSpotLight){const q=e.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(k).multiplyScalar(K),q.distance=W,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,n.spot[S]=q;const J=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,J.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[S]=J.matrix,U.castShadow){const B=t.get(U);B.shadowIntensity=J.intensity,B.shadowBias=J.bias,B.shadowNormalBias=J.normalBias,B.shadowRadius=J.radius,B.shadowMapSize=J.mapSize,n.spotShadow[S]=B,n.spotShadowMap[S]=oe,R++}S++}else if(U.isRectAreaLight){const q=e.get(U);q.color.copy(k).multiplyScalar(K),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),n.rectArea[w]=q,w++}else if(U.isPointLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){const J=U.shadow,B=t.get(U);B.shadowIntensity=J.intensity,B.shadowBias=J.bias,B.shadowNormalBias=J.normalBias,B.shadowRadius=J.radius,B.shadowMapSize=J.mapSize,B.shadowCameraNear=J.camera.near,B.shadowCameraFar=J.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=oe,n.pointShadowMatrix[g]=U.shadow.matrix,b++}n.point[g]=q,g++}else if(U.isHemisphereLight){const q=e.get(U);q.skyColor.copy(U.color).multiplyScalar(K),q.groundColor.copy(U.groundColor).multiplyScalar(K),n.hemi[M]=q,M++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const I=n.hash;(I.sunLength!==f||I.directionalLength!==p||I.pointLength!==g||I.spotLength!==S||I.rectAreaLength!==w||I.hemiLength!==M||I.numSunShadows!==m||I.numDirectionalShadows!==T||I.numPointShadows!==b||I.numSpotShadows!==R||I.numSpotMaps!==_||I.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=p,n.spot.length=S,n.rectArea.length=w,n.point.length=g,n.hemi.length=M,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,I.sunLength=f,I.directionalLength=p,I.pointLength=g,I.spotLength=S,I.rectAreaLength=w,I.hemiLength=M,I.numSunShadows=m,I.numDirectionalShadows=T,I.numPointShadows=b,I.numSpotShadows=R,I.numSpotMaps=_,I.numLightProbes=P,n.version=vv++)}function l(c,h){let d=0,u=0,f=0,m=0,x=0,p=0;const g=h.matrixWorldInverse;for(let S=0,w=c.length;S<w;S++){const M=c[S];if(M.isSunLight){const T=n.sun[d];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(g),d++}else if(M.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),u++}else if(M.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),m++}else if(M.isRectAreaLight){const T=n.rectArea[x];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){const T=n.point[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(g),f++}else if(M.isHemisphereLight){const T=n.hemi[p];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function Vc(i){const e=new xv(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Mv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Vc(i),e.set(s,[o])):r>=a.length?(o=new Vc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yv=`uniform sampler2D shadow_pass;
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
}`,bv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Tv=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Wc=new nt,Cs=new C,Xa=new C;function wv(i,e,t){let n=new vl;const s=new re,r=new re,a=new mt,o=new Rf,l=new Pf,c={},h=t.maxTextureSize,d={[Pi]:Xt,[Xt]:Pi,[on]:on},u=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Sv,fragmentShader:yv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new vt;m.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ie(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bs;let g=this.type;this.render=function(b,R,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===Mu&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Bs);const E=i.getRenderTarget(),P=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Dn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=g!==this.type;z&&R.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(k=>k.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,k=b.length;U<k;U++){const K=b[U],W=K.shadow;if(W===void 0){Ve("WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const oe=W.getFrameExtents();s.multiply(oe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,W.mapSize.y=r.y));const q=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=q,W.map===null||z===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Us){if(K.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ot(s.x,s.y,{format:Ii,type:qt,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),W.map.texture.name=K.name+".shadowMap",W.map.depthTexture=new Zs(s.x,s.y,gn),W.map.depthTexture.name=K.name+".shadowMapDepth",W.map.depthTexture.format=jn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt}else K.isPointLight?(W.map=new qh(s.x),W.map.depthTexture=new Vd(s.x,Nn)):(W.map=new Ot(s.x,s.y),W.map.depthTexture=new Zs(s.x,s.y,Nn)),W.map.depthTexture.name=K.name+".shadowMap",W.map.depthTexture.format=jn,this.type===Bs?(W.map.depthTexture.compareFunction=q?ul:hl,W.map.depthTexture.minFilter=Pt,W.map.depthTexture.magFilter=Pt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Rt,W.map.depthTexture.magFilter=Rt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const J=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();K.isPointLight!==!0&&W.updateMatrices(K,_);for(let B=0;B<J;B++){const se=W.getCamera(B);if(K.isPointLight){const ae=W.camera,Ce=W.matrix,qe=K.distance||ae.far;qe!==ae.far&&(ae.far=qe,ae.updateProjectionMatrix()),Cs.setFromMatrixPosition(K.matrixWorld),ae.position.copy(Cs),Xa.copy(ae.position),Xa.add(bv[B]),ae.up.copy(Tv[B]),ae.lookAt(Xa),ae.updateMatrixWorld(),Ce.makeTranslation(-Cs.x,-Cs.y,-Cs.z),Wc.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Wc,ae.coordinateSystem,ae.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,B),i.clear();else{B===0&&(i.setRenderTarget(W.map),i.clear());const ae=W.getViewport(B);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),F.viewport(a)}n=W.getFrustum(B),M(R,_,se,K,this.type)}W.isPointLightShadow!==!0&&this.type===Us&&S(W,_),W.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(E,P,I)};function S(b,R){const _=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new Ot(s.x,s.y,{format:Ii,type:qt}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,_,u,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,_,f,x,null)}function w(b,R,_,E){let P=null;const I=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)P=I;else if(P=_.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=P.uuid,z=R.uuid;let U=c[F];U===void 0&&(U={},c[F]=U);let k=U[z];k===void 0&&(k=P.clone(),U[z]=k,R.addEventListener("dispose",T)),P=k}if(P.visible=R.visible,P.wireframe=R.wireframe,E===Us?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:d[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=i.properties.get(P);F.light=_}return P}function M(b,R,_,E,P){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Us)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const z=e.update(b),U=b.material;if(Array.isArray(U)){const k=z.groups;for(let K=0,W=k.length;K<W;K++){const oe=k[K],q=U[oe.materialIndex];if(q&&q.visible){const J=w(b,q,E,P);b.onBeforeShadow(i,b,R,_,z,J,oe),i.renderBufferDirect(_,null,z,J,b,oe),b.onAfterShadow(i,b,R,_,z,J,oe)}}}else if(U.visible){const k=w(b,U,E,P);b.onBeforeShadow(i,b,R,_,z,k,null),i.renderBufferDirect(_,null,z,k,b,null),b.onAfterShadow(i,b,R,_,z,k,null)}}const F=b.children;for(let z=0,U=F.length;z<U;z++)M(F[z],R,_,E,P)}function T(b){b.target.removeEventListener("dispose",T);for(const _ in c){const E=c[_],P=b.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function Ev(i,e){function t(){let N=!1;const ve=new mt;let Q=null;const _e=new mt(0,0,0,0);return{setMask:function(Te){Q!==Te&&!N&&(i.colorMask(Te,Te,Te,Te),Q=Te)},setLocked:function(Te){N=Te},setClear:function(Te,le,Oe,Ue,dt){dt===!0&&(Te*=Ue,le*=Ue,Oe*=Ue),ve.set(Te,le,Oe,Ue),_e.equals(ve)===!1&&(i.clearColor(Te,le,Oe,Ue),_e.copy(ve))},reset:function(){N=!1,Q=null,_e.set(-1,0,0,0)}}}function n(){let N=!1,ve=!1,Q=null,_e=null,Te=null;return{setReversed:function(le){if(ve!==le){const Oe=e.get("EXT_clip_control");le?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ve=le;const Ue=Te;Te=null,this.setClear(Ue)}},getReversed:function(){return ve},setTest:function(le){le?te(i.DEPTH_TEST):xe(i.DEPTH_TEST)},setMask:function(le){Q!==le&&!N&&(i.depthMask(le),Q=le)},setFunc:function(le){if(ve&&(le=td[le]),_e!==le){switch(le){case Ja:i.depthFunc(i.NEVER);break;case Qa:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case eo:i.depthFunc(i.EQUAL);break;case to:i.depthFunc(i.GEQUAL);break;case no:i.depthFunc(i.GREATER);break;case io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=le}},setLocked:function(le){N=le},setClear:function(le){Te!==le&&(Te=le,ve&&(le=1-le),i.clearDepth(le))},reset:function(){N=!1,Q=null,_e=null,Te=null,ve=!1}}}function s(){let N=!1,ve=null,Q=null,_e=null,Te=null,le=null,Oe=null,Ue=null,dt=null;return{setTest:function(at){N||(at?te(i.STENCIL_TEST):xe(i.STENCIL_TEST))},setMask:function(at){ve!==at&&!N&&(i.stencilMask(at),ve=at)},setFunc:function(at,hn,_n){(Q!==at||_e!==hn||Te!==_n)&&(i.stencilFunc(at,hn,_n),Q=at,_e=hn,Te=_n)},setOp:function(at,hn,_n){(le!==at||Oe!==hn||Ue!==_n)&&(i.stencilOp(at,hn,_n),le=at,Oe=hn,Ue=_n)},setLocked:function(at){N=at},setClear:function(at){dt!==at&&(i.clearStencil(at),dt=at)},reset:function(){N=!1,ve=null,Q=null,_e=null,Te=null,le=null,Oe=null,Ue=null,dt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,m=[],x=null,p=!1,g=null,S=null,w=null,M=null,T=null,b=null,R=null,_=new Ee(0,0,0),E=0,P=!1,I=null,F=null,z=null,U=null,k=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,oe=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=oe>=1):q.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=oe>=2);let J=null,B={};const se=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),Ce=new mt().fromArray(se),qe=new mt().fromArray(ae);function Ze(N,ve,Q,_e){const Te=new Uint8Array(4),le=i.createTexture();i.bindTexture(N,le),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<Q;Oe++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,Te):i.texImage2D(ve+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Te);return le}const Z={};Z[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(qs),ue(!1),pe(Bl),te(i.CULL_FACE),ce(Dn);function te(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function xe(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function ke(N,ve){return u[N]!==ve?(i.bindFramebuffer(N,ve),u[N]=ve,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ve),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function we(N,ve){let Q=m,_e=!1;if(N){Q=f.get(ve),Q===void 0&&(Q=[],f.set(ve,Q));const Te=N.textures;if(Q.length!==Te.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Oe=Te.length;le<Oe;le++)Q[le]=i.COLOR_ATTACHMENT0+le;Q.length=Te.length,_e=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,_e=!0);_e&&i.drawBuffers(Q)}function He(N){return x!==N?(i.useProgram(N),x=N,!0):!1}const rt={[ns]:i.FUNC_ADD,[yu]:i.FUNC_SUBTRACT,[bu]:i.FUNC_REVERSE_SUBTRACT};rt[Tu]=i.MIN,rt[wu]=i.MAX;const ne={[Eu]:i.ZERO,[Au]:i.ONE,[Cu]:i.SRC_COLOR,[ph]:i.SRC_ALPHA,[Uu]:i.SRC_ALPHA_SATURATE,[Iu]:i.DST_COLOR,[Pu]:i.DST_ALPHA,[Ru]:i.ONE_MINUS_SRC_COLOR,[mh]:i.ONE_MINUS_SRC_ALPHA,[Du]:i.ONE_MINUS_DST_COLOR,[Lu]:i.ONE_MINUS_DST_ALPHA,[Nu]:i.CONSTANT_COLOR,[Fu]:i.ONE_MINUS_CONSTANT_COLOR,[Ou]:i.CONSTANT_ALPHA,[Bu]:i.ONE_MINUS_CONSTANT_ALPHA};function ce(N,ve,Q,_e,Te,le,Oe,Ue,dt,at){if(N===Dn){p===!0&&(xe(i.BLEND),p=!1);return}if(p===!1&&(te(i.BLEND),p=!0),N!==Su){if(N!==g||at!==P){if((S!==ns||T!==ns)&&(i.blendEquation(i.FUNC_ADD),S=ns,T=ns),at)switch(N){case ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case An:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",N);break}else switch(N){case ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case An:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kl:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",N);break}w=null,M=null,b=null,R=null,_.set(0,0,0),E=0,g=N,P=at}return}Te=Te||ve,le=le||Q,Oe=Oe||_e,(ve!==S||Te!==T)&&(i.blendEquationSeparate(rt[ve],rt[Te]),S=ve,T=Te),(Q!==w||_e!==M||le!==b||Oe!==R)&&(i.blendFuncSeparate(ne[Q],ne[_e],ne[le],ne[Oe]),w=Q,M=_e,b=le,R=Oe),(Ue.equals(_)===!1||dt!==E)&&(i.blendColor(Ue.r,Ue.g,Ue.b,dt),_.copy(Ue),E=dt),g=N,P=!1}function he(N,ve){N.side===on?xe(i.CULL_FACE):te(i.CULL_FACE);let Q=N.side===Xt;ve&&(Q=!Q),ue(Q),N.blending===ks&&N.transparent===!1?ce(Dn):ce(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const _e=N.stencilWrite;o.setTest(_e),_e&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Fe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):xe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(N){I!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),I=N)}function pe(N){N!==_u?(te(i.CULL_FACE),N!==F&&(N===Bl?i.cullFace(i.BACK):N===xu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xe(i.CULL_FACE),F=N}function Be(N){N!==z&&(W&&i.lineWidth(N),z=N)}function Fe(N,ve,Q){N?(te(i.POLYGON_OFFSET_FILL),(U!==ve||k!==Q)&&(U=ve,k=Q,a.getReversed()&&(ve=-ve),i.polygonOffset(ve,Q))):xe(i.POLYGON_OFFSET_FILL)}function Ge(N){N?te(i.SCISSOR_TEST):xe(i.SCISSOR_TEST)}function We(N){N===void 0&&(N=i.TEXTURE0+K-1),J!==N&&(i.activeTexture(N),J=N)}function L(N,ve,Q){Q===void 0&&(J===null?Q=i.TEXTURE0+K-1:Q=J);let _e=B[Q];_e===void 0&&(_e={type:void 0,texture:void 0},B[Q]=_e),(_e.type!==N||_e.texture!==ve)&&(J!==Q&&(i.activeTexture(Q),J=Q),i.bindTexture(N,ve||Z[N]),_e.type=N,_e.texture=ve)}function tt(){const N=B[J];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Ye(){try{i.compressedTexImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function v(){try{i.texSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function O(){try{i.texSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function fe(){try{i.texStorage2D(...arguments)}catch(N){it("WebGLState:",N)}}function me(){try{i.texStorage3D(...arguments)}catch(N){it("WebGLState:",N)}}function $(){try{i.texImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function j(){try{i.texImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function ge(N){return d[N]!==void 0?d[N]:i.getParameter(N)}function ie(N,ve){d[N]!==ve&&(i.pixelStorei(N,ve),d[N]=ve)}function ee(N){Ce.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Ce.copy(N))}function de(N){qe.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),qe.copy(N))}function Se(N,ve){let Q=c.get(ve);Q===void 0&&(Q=new WeakMap,c.set(ve,Q));let _e=Q.get(N);_e===void 0&&(_e=i.getUniformBlockIndex(ve,N.name),Q.set(N,_e))}function De(N,ve){const _e=c.get(ve).get(N);l.get(ve)!==_e&&(i.uniformBlockBinding(ve,_e,N.__bindingPointIndex),l.set(ve,_e))}function ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},J=null,B={},u={},f=new WeakMap,m=[],x=null,p=!1,g=null,S=null,w=null,M=null,T=null,b=null,R=null,_=new Ee(0,0,0),E=0,P=!1,I=null,F=null,z=null,U=null,k=null,Ce.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:xe,bindFramebuffer:ke,drawBuffers:we,useProgram:He,setBlending:ce,setMaterial:he,setFlipSided:ue,setCullFace:pe,setLineWidth:Be,setPolygonOffset:Fe,setScissorTest:Ge,activeTexture:We,bindTexture:L,unbindTexture:tt,compressedTexImage2D:Ye,compressedTexImage3D:A,texImage2D:$,texImage3D:j,pixelStorei:ie,getParameter:ge,updateUBOMapping:Se,uniformBlockBinding:De,texStorage2D:fe,texStorage3D:me,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ee,viewport:de,reset:ze}}function Av(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,v){return m?new OffscreenCanvas(A,v):jr("canvas")}function p(A,v,O){let V=1;const Y=Ye(A);if((Y.width>O||Y.height>O)&&(V=O/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const fe=Math.floor(V*Y.width),me=Math.floor(V*Y.height);u===void 0&&(u=x(fe,me));const $=v?x(fe,me):u;return $.width=fe,$.height=me,$.getContext("2d").drawImage(A,0,0,fe,me),Ve("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+fe+"x"+me+")."),$}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),A;return A}function g(A){return A.generateMipmaps}function S(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,v,O,V,Y,fe=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let me;V&&(me=e.get("EXT_texture_norm16"),me||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=v;if(v===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8),O===i.UNSIGNED_SHORT&&me&&($=me.R16_EXT),O===i.SHORT&&me&&($=me.R16_SNORM_EXT)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),v===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8),O===i.UNSIGNED_SHORT&&me&&($=me.RG16_EXT),O===i.SHORT&&me&&($=me.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_SHORT&&me&&($=me.RGB16_EXT),O===i.SHORT&&me&&($=me.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),v===i.RGBA){const j=fe?Qr:et.getTransfer(Y);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=j===lt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&me&&($=me.RGBA16_EXT),O===i.SHORT&&me&&($=me.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function T(A,v){let O;return A?v===null||v===Nn||v===$s?O=i.DEPTH24_STENCIL8:v===gn?O=i.DEPTH32F_STENCIL8:v===Ys&&(O=i.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Nn||v===$s?O=i.DEPTH_COMPONENT24:v===gn?O=i.DEPTH_COMPONENT32F:v===Ys&&(O=i.DEPTH_COMPONENT16),O}function b(A,v){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Rt&&A.minFilter!==Pt?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function R(A){const v=A.target;v.removeEventListener("dispose",R),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function _(A){const v=A.target;v.removeEventListener("dispose",_),I(v)}function E(A){const v=n.get(A);if(v.__webglInit===void 0)return;const O=A.source,V=f.get(O);if(V){const Y=V[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(A),Object.keys(V).length===0&&f.delete(O)}n.remove(A)}function P(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const O=A.source,V=f.get(O);delete V[v.__cacheKey],a.memory.textures--}function I(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Y=0;Y<v.__webglFramebuffer[V].length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[V][Y]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let V=0,Y=O.length;V<Y;V++){const fe=n.get(O[V]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(O[V])}n.remove(A)}let F=0;function z(){F=0}function U(){return F}function k(A){F=A}function K(){const A=F;return A>=s.maxTextures&&Ve("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,A}function W(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function oe(A,v){const O=n.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const V=A.image;if(V===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(O,A,v);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function q(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){xe(O,A,v);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function J(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){xe(O,A,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function B(A,v){const O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){ke(O,A,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const se={[as]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[so]:i.MIRRORED_REPEAT},ae={[Rt]:i.NEAREST,[Hu]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[Pt]:i.LINEAR,[pa]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},Ce={[Xu]:i.NEVER,[Zu]:i.ALWAYS,[qu]:i.LESS,[hl]:i.LEQUAL,[Yu]:i.EQUAL,[ul]:i.GEQUAL,[$u]:i.GREATER,[Ku]:i.NOTEQUAL};function qe(A,v){if(v.type===gn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Pt||v.magFilter===pa||v.magFilter===lr||v.magFilter===fi||v.minFilter===Pt||v.minFilter===pa||v.minFilter===lr||v.minFilter===fi)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,se[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,se[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,se[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ae[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ae[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ce[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Rt||v.minFilter!==lr&&v.minFilter!==fi||v.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ze(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",R));const V=v.source;let Y=f.get(V);Y===void 0&&(Y={},f.set(V,Y));const fe=W(v);if(fe!==A.__cacheKey){Y[fe]===void 0&&(Y[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[fe].usedTimes++;const me=Y[A.__cacheKey];me!==void 0&&(Y[A.__cacheKey].usedTimes--,me.usedTimes===0&&P(v)),A.__cacheKey=fe,A.__webglTexture=Y[fe].texture}return O}function Z(A,v,O){return Math.floor(Math.floor(A/O)/v)}function te(A,v,O,V){const fe=A.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,V,v.data);else{fe.sort((ie,ee)=>ie.start-ee.start);let me=0;for(let ie=1;ie<fe.length;ie++){const ee=fe[me],de=fe[ie],Se=ee.start+ee.count,De=Z(de.start,v.width,4),ze=Z(ee.start,v.width,4);de.start<=Se+1&&De===ze&&Z(de.start+de.count-1,v.width,4)===De?ee.count=Math.max(ee.count,de.start+de.count-ee.start):(++me,fe[me]=de)}fe.length=me+1;const $=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ie=0,ee=fe.length;ie<ee;ie++){const de=fe[ie],Se=Math.floor(de.start/4),De=Math.ceil(de.count/4),ze=Se%v.width,N=Math.floor(Se/v.width),ve=De,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,ze,N,ve,Q,O,V,v.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function xe(A,v,O){let V=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=i.TEXTURE_3D);const Y=Ze(A,v),fe=v.source;t.bindTexture(V,A.__webglTexture,i.TEXTURE0+O);const me=n.get(fe);if(fe.version!==me.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const Q=et.getPrimaries(et.workingColorSpace),_e=v.colorSpace===di?null:et.getPrimaries(v.colorSpace),Te=v.colorSpace===di||Q===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let j=p(v.image,!1,s.maxTextureSize);j=tt(v,j);const ge=r.convert(v.format,v.colorSpace),ie=r.convert(v.type);let ee=M(v.internalFormat,ge,ie,v.normalized,v.colorSpace,v.isVideoTexture);qe(V,v);let de;const Se=v.mipmaps,De=v.isVideoTexture!==!0,ze=me.__version===void 0||Y===!0,N=fe.dataReady,ve=b(v,j);if(v.isDepthTexture)ee=T(v.format===Ai,v.type),ze&&(De?t.texStorage2D(i.TEXTURE_2D,1,ee,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,ee,j.width,j.height,0,ge,ie,null));else if(v.isDataTexture)if(Se.length>0){De&&ze&&t.texStorage2D(i.TEXTURE_2D,ve,ee,Se[0].width,Se[0].height);for(let Q=0,_e=Se.length;Q<_e;Q++)de=Se[Q],De?N&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,de.width,de.height,ge,ie,de.data):t.texImage2D(i.TEXTURE_2D,Q,ee,de.width,de.height,0,ge,ie,de.data);v.generateMipmaps=!1}else De?(ze&&t.texStorage2D(i.TEXTURE_2D,ve,ee,j.width,j.height),N&&te(v,j,ge,ie)):t.texImage2D(i.TEXTURE_2D,0,ee,j.width,j.height,0,ge,ie,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,ee,Se[0].width,Se[0].height,j.depth);for(let Q=0,_e=Se.length;Q<_e;Q++)if(de=Se[Q],v.format!==vn)if(ge!==null)if(De){if(N)if(v.layerUpdates.size>0){const Te=bc(de.width,de.height,v.format,v.type);for(const le of v.layerUpdates){const Oe=de.data.subarray(le*Te/de.data.BYTES_PER_ELEMENT,(le+1)*Te/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,le,de.width,de.height,1,ge,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,de.width,de.height,j.depth,ge,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ee,de.width,de.height,j.depth,0,de.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,de.width,de.height,j.depth,ge,ie,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,ee,de.width,de.height,j.depth,0,ge,ie,de.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{De&&ze&&t.texStorage2D(i.TEXTURE_2D,ve,ee,Se[0].width,Se[0].height);for(let Q=0,_e=Se.length;Q<_e;Q++)de=Se[Q],v.format!==vn?ge!==null?De?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,de.width,de.height,ge,de.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,ee,de.width,de.height,0,de.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?N&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,de.width,de.height,ge,ie,de.data):t.texImage2D(i.TEXTURE_2D,Q,ee,de.width,de.height,0,ge,ie,de.data)}else if(v.isDataArrayTexture)if(De){if(ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,ee,j.width,j.height,j.depth),N)if(v.layerUpdates.size>0){const Q=bc(j.width,j.height,v.format,v.type);for(const _e of v.layerUpdates){const Te=j.data.subarray(_e*Q/j.data.BYTES_PER_ELEMENT,(_e+1)*Q/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,j.width,j.height,1,ge,ie,Te)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ge,ie,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ee,j.width,j.height,j.depth,0,ge,ie,j.data);else if(v.isData3DTexture)De?(ze&&t.texStorage3D(i.TEXTURE_3D,ve,ee,j.width,j.height,j.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ge,ie,j.data)):t.texImage3D(i.TEXTURE_3D,0,ee,j.width,j.height,j.depth,0,ge,ie,j.data);else if(v.isFramebufferTexture){if(ze)if(De)t.texStorage2D(i.TEXTURE_2D,ve,ee,j.width,j.height);else{let Q=j.width,_e=j.height;for(let Te=0;Te<ve;Te++)t.texImage2D(i.TEXTURE_2D,Te,ee,Q,_e,0,ge,ie,null),Q>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),j.parentNode!==Q){Q.appendChild(j),d.add(v),Q.onpaint=_e=>{const Te=_e.changedElements;for(const le of d)Te.includes(le.image)&&(le.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const Te=i.RGBA,le=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Te,le,Oe,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Se.length>0){if(De&&ze){const Q=Ye(Se[0]);t.texStorage2D(i.TEXTURE_2D,ve,ee,Q.width,Q.height)}for(let Q=0,_e=Se.length;Q<_e;Q++)de=Se[Q],De?N&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ge,ie,de):t.texImage2D(i.TEXTURE_2D,Q,ee,ge,ie,de);v.generateMipmaps=!1}else if(De){if(ze){const Q=Ye(j);t.texStorage2D(i.TEXTURE_2D,ve,ee,Q.width,Q.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,ie,j)}else t.texImage2D(i.TEXTURE_2D,0,ee,ge,ie,j);g(v)&&S(V),me.__version=fe.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function ke(A,v,O){if(v.image.length!==6)return;const V=Ze(A,v),Y=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const fe=n.get(Y);if(Y.version!==fe.__version||V===!0){t.activeTexture(i.TEXTURE0+O);const me=et.getPrimaries(et.workingColorSpace),$=v.colorSpace===di?null:et.getPrimaries(v.colorSpace),j=v.colorSpace===di||me===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ge=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,ee=[];for(let le=0;le<6;le++)!ge&&!ie?ee[le]=p(v.image[le],!0,s.maxCubemapSize):ee[le]=ie?v.image[le].image:v.image[le],ee[le]=tt(v,ee[le]);const de=ee[0],Se=r.convert(v.format,v.colorSpace),De=r.convert(v.type),ze=M(v.internalFormat,Se,De,v.normalized,v.colorSpace),N=v.isVideoTexture!==!0,ve=fe.__version===void 0||V===!0,Q=Y.dataReady;let _e=b(v,de);qe(i.TEXTURE_CUBE_MAP,v);let Te;if(ge){N&&ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ze,de.width,de.height);for(let le=0;le<6;le++){Te=ee[le].mipmaps;for(let Oe=0;Oe<Te.length;Oe++){const Ue=Te[Oe];v.format!==vn?Se!==null?N?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ue.width,Ue.height,Se,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,ze,Ue.width,Ue.height,0,Ue.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,0,0,Ue.width,Ue.height,Se,De,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe,ze,Ue.width,Ue.height,0,Se,De,Ue.data)}}}else{if(Te=v.mipmaps,N&&ve){Te.length>0&&_e++;const le=Ye(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ze,le.width,le.height)}for(let le=0;le<6;le++)if(ie){N?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ee[le].width,ee[le].height,Se,De,ee[le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ze,ee[le].width,ee[le].height,0,Se,De,ee[le].data);for(let Oe=0;Oe<Te.length;Oe++){const dt=Te[Oe].image[le].image;N?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,dt.width,dt.height,Se,De,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,ze,dt.width,dt.height,0,Se,De,dt.data)}}else{N?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Se,De,ee[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ze,Se,De,ee[le]);for(let Oe=0;Oe<Te.length;Oe++){const Ue=Te[Oe];N?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,0,0,Se,De,Ue.image[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Oe+1,ze,Se,De,Ue.image[le])}}}g(v)&&S(i.TEXTURE_CUBE_MAP),fe.__version=Y.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function we(A,v,O,V,Y,fe){const me=r.convert(O.format,O.colorSpace),$=r.convert(O.type),j=M(O.internalFormat,me,$,O.normalized,O.colorSpace),ge=n.get(v),ie=n.get(O);if(ie.__renderTarget=v,!ge.__hasExternalTextures){const ee=Math.max(1,v.width>>fe),de=Math.max(1,v.height>>fe);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,fe,j,ee,de,v.depth,0,me,$,null):t.texImage2D(Y,fe,j,ee,de,0,me,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Y,ie.__webglTexture,0,Ge(v)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Y,ie.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(A,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const V=v.depthTexture,Y=V&&V.isDepthTexture?V.type:null,fe=T(v.stencilBuffer,Y),me=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;We(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(v),fe,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(v),fe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,fe,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,A)}else{const V=v.textures;for(let Y=0;Y<V.length;Y++){const fe=V[Y],me=r.convert(fe.format,fe.colorSpace),$=r.convert(fe.type),j=M(fe.internalFormat,me,$,fe.normalized,fe.colorSpace);We(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(v),j,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(v),j,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,j,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function rt(A,v,O){const V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v.depthTexture);const ge=r.convert(v.depthTexture.format),ie=r.convert(v.depthTexture.type);let ee;v.depthTexture.format===jn?ee=i.DEPTH_COMPONENT24:v.depthTexture.format===Ai&&(ee=i.DEPTH24_STENCIL8);for(let de=0;de<6;de++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ee,v.width,v.height,0,ge,ie,null)}}else oe(v.depthTexture,0);const fe=Y.__webglTexture,me=Ge(v),$=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,j=v.depthTexture.format===Ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===jn)We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,$,fe,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,j,$,fe,0);else if(v.depthTexture.format===Ai)We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,$,fe,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,j,$,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(A){const v=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=V}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)rt(v.__webglFramebuffer[V],A,V);else{const V=A.texture.mipmaps;V&&V.length>0?rt(v.__webglFramebuffer[0],A,0):rt(v.__webglFramebuffer,A,0)}else if(O){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=i.createRenderbuffer(),He(v.__webglDepthbuffer[V],A,!1);else{const Y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=v.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,fe)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),He(v.__webglDepthbuffer,A,!1);else{const Y=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(A,v,O){const V=n.get(A);v!==void 0&&we(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ne(A)}function he(A){const v=A.texture,O=n.get(A),V=n.get(v);A.addEventListener("dispose",_);const Y=A.textures,fe=A.isWebGLCubeRenderTarget===!0,me=Y.length>1;if(me||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=v.version,a.memory.textures++),fe){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let j=0;j<v.mipmaps.length;j++)O.__webglFramebuffer[$][j]=i.createFramebuffer()}else O.__webglFramebuffer[$]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<v.mipmaps.length;$++)O.__webglFramebuffer[$]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(me)for(let $=0,j=Y.length;$<j;$++){const ge=n.get(Y[$]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&We(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){const j=Y[$];O.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[$]);const ge=r.convert(j.format,j.colorSpace),ie=r.convert(j.type),ee=M(j.internalFormat,ge,ie,j.normalized,j.colorSpace,A.isXRRenderTarget===!0),de=Ge(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ee,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,O.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),He(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v);for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)we(O.__webglFramebuffer[$][j],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,j);else we(O.__webglFramebuffer[$],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);g(v)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let $=0,j=Y.length;$<j;$++){const ge=Y[$],ie=n.get(ge);let ee=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,ie.__webglTexture),qe(ee,ge),we(O.__webglFramebuffer,A,ge,i.COLOR_ATTACHMENT0+$,ee,0),g(ge)&&S(ee)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,V.__webglTexture),qe($,v),v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)we(O.__webglFramebuffer[j],A,v,i.COLOR_ATTACHMENT0,$,j);else we(O.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,$,0);g(v)&&S($),t.unbindTexture()}A.depthBuffer&&ne(A)}function ue(A){const v=A.textures;for(let O=0,V=v.length;O<V;O++){const Y=v[O];if(g(Y)){const fe=w(A),me=n.get(Y).__webglTexture;t.bindTexture(fe,me),S(fe),t.unbindTexture()}}}const pe=[],Be=[];function Fe(A){if(A.samples>0){if(We(A)===!1){const v=A.textures,O=A.width,V=A.height;let Y=i.COLOR_BUFFER_BIT;const fe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(A),$=v.length>1;if($)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const j=A.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[ge]);const ie=n.get(v[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,Y,i.NEAREST),l===!0&&(pe.length=0,Be.length=0,pe.push(i.COLOR_ATTACHMENT0+ge),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(pe.push(fe),Be.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Be)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,me.__webglColorRenderbuffer[ge]);const ie=n.get(v[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ge(A){return Math.min(s.maxSamples,A.samples)}function We(A){const v=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function L(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function tt(A,v){const O=A.colorSpace,V=A.format,Y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Jr&&O!==di&&(et.getTransfer(O)===lt?(V!==vn||Y!==tn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",O)),v}function Ye(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=z,this.getTextureUnits=U,this.setTextureUnits=k,this.setTexture2D=oe,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=B,this.rebindTextures=ce,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=we,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cv(i,e){function t(n,s=di){let r;const a=et.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===sl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Mh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vh)return i.BYTE;if(n===_h)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===il)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===qt)return i.HALF_FLOAT;if(n===Sh)return i.ALPHA;if(n===yh)return i.RGB;if(n===vn)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===Ai)return i.DEPTH_STENCIL;if(n===al)return i.RED;if(n===ol)return i.RED_INTEGER;if(n===Ii)return i.RG;if(n===ll)return i.RG_INTEGER;if(n===cl)return i.RGBA_INTEGER;if(n===zr||n===Hr||n===Gr||n===Vr)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ro||n===ao||n===oo||n===lo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===co||n===ho||n===uo||n===fo||n===po||n===$r||n===mo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===co||n===ho)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===fo)return r.COMPRESSED_R11_EAC;if(n===po)return r.COMPRESSED_SIGNED_R11_EAC;if(n===$r)return r.COMPRESSED_RG11_EAC;if(n===mo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===go||n===vo||n===_o||n===xo||n===Mo||n===So||n===yo||n===bo||n===To||n===wo||n===Eo||n===Ao||n===Co||n===Ro)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===go)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_o)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===So)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===To)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Eo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ao)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Co)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ro)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===Lo||n===Io)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Po)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Do||n===Uo||n===Kr||n===No)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Do)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===No)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
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

}`;class Lv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ph(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:Rv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new Nt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Iv extends Ui{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",p=new Lv,g={},S=t.getContextAttributes();let w=null,M=null;const T=[],b=[],R=new re;let _=null,E=null;const P=new en;P.viewport=new mt;const I=new en;I.viewport=new mt;const F=[P,I],z=new Bf;let U=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=T[Z];return te===void 0&&(te=new Sa,T[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=T[Z];return te===void 0&&(te=new Sa,T[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=T[Z];return te===void 0&&(te=new Sa,T[Z]=te),te.getHandSpace()};function K(Z){const te=b.indexOf(Z.inputSource);if(te===-1)return;const xe=T[te];xe!==void 0&&(xe.update(Z.inputSource,Z.frame,c||a),xe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",oe);for(let Z=0;Z<T.length;Z++){const te=b[Z];te!==null&&(b[Z]=null,T[Z].disconnect(te))}U=null,k=null,p.reset();for(const Z in g)delete g[Z];if(e.setRenderTarget(w),f=null,u=null,d=null,s=null,M=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),E!==null){const Z=E.camera;Z.fov=E.fov,Z.zoom=E.zoom,Z.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",W),s.addEventListener("inputsourceschange",oe),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,ke=null,we=null;S.depth&&(we=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=S.stencil?Ai:jn,ke=S.stencil?$s:Nn);const He={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(He),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new Ot(u.textureWidth,u.textureHeight,{format:vn,type:tn,depthTexture:new Zs(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const xe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Ot(f.framebufferWidth,f.framebufferHeight,{format:vn,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function oe(Z){for(let te=0;te<Z.removed.length;te++){const xe=Z.removed[te],ke=b.indexOf(xe);ke>=0&&(b[ke]=null,T[ke].disconnect(xe))}for(let te=0;te<Z.added.length;te++){const xe=Z.added[te];let ke=b.indexOf(xe);if(ke===-1){for(let He=0;He<T.length;He++)if(He>=b.length){b.push(xe),ke=He;break}else if(b[He]===null){b[He]=xe,ke=He;break}if(ke===-1)break}const we=T[ke];we&&we.connect(xe)}}const q=new C,J=new C;function B(Z,te,xe){q.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(xe.matrixWorld);const ke=q.distanceTo(J),we=te.projectionMatrix.elements,He=xe.projectionMatrix.elements,rt=we[14]/(we[10]-1),ne=we[14]/(we[10]+1),ce=(we[9]+1)/we[5],he=(we[9]-1)/we[5],ue=(we[8]-1)/we[0],pe=(He[8]+1)/He[0],Be=rt*ue,Fe=rt*pe,Ge=ke/(-ue+pe),We=Ge*-ue;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(We),Z.translateZ(Ge),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),we[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const L=rt+Ge,tt=ne+Ge,Ye=Be-We,A=Fe+(ke-We),v=ce*ne/tt*L,O=he*ne/tt*L;Z.projectionMatrix.makePerspective(Ye,A,v,O,L,tt),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function se(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let te=Z.near,xe=Z.far;p.texture!==null&&(p.depthNear>0&&(te=p.depthNear),p.depthFar>0&&(xe=p.depthFar)),z.near=I.near=P.near=te,z.far=I.far=P.far=xe,(U!==z.near||k!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),U=z.near,k=z.far),z.layers.mask=Z.layers.mask|6,P.layers.mask=z.layers.mask&-5,I.layers.mask=z.layers.mask&-3;const ke=Z.parent,we=z.cameras;se(z,ke);for(let He=0;He<we.length;He++)se(we[He],ke);we.length===2?B(z,P,I):z.projectionMatrix.copy(P.projectionMatrix),E===null&&Z.isPerspectiveCamera&&(E={camera:Z,fov:Z.fov,zoom:Z.zoom}),ae(Z,z,ke)};function ae(Z,te,xe){xe===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(xe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=hs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(z)},this.getCameraTexture=function(Z){return g[Z]};let Ce=null;function qe(Z,te){if(h=te.getViewerPose(c||a),m=te,h!==null){const xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ke=!1;xe.length!==z.cameras.length&&(z.cameras.length=0,ke=!0);for(let ne=0;ne<xe.length;ne++){const ce=xe[ne];let he=null;if(f!==null)he=f.getViewport(ce);else{const pe=d.getViewSubImage(u,ce);he=pe.viewport,ne===0&&(e.setRenderTargetTextures(M,pe.colorTexture,pe.depthStencilTexture),e.setRenderTarget(M))}let ue=F[ne];ue===void 0&&(ue=new en,ue.layers.enable(ne),ue.viewport=new mt,F[ne]=ue),ue.matrix.fromArray(ce.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(ce.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(he.x,he.y,he.width,he.height),ne===0&&(z.matrix.copy(ue.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ke===!0&&z.cameras.push(ue)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const ne=d.getDepthInformation(xe[0]);ne&&ne.isValid&&ne.texture&&p.init(ne,s.renderState)}if(we&&we.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let ne=0;ne<xe.length;ne++){const ce=xe[ne].camera;if(ce){let he=g[ce];he||(he=new Ph,g[ce]=he);const ue=d.getCameraImage(ce);he.sourceTexture=ue}}}}for(let xe=0;xe<T.length;xe++){const ke=b[xe],we=T[xe];ke!==null&&we!==void 0&&we.update(ke,te,c||a)}Ce&&Ce(Z,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),m=null}const Ze=new Wh;Ze.setAnimationLoop(qe),this.setAnimationLoop=function(Z){Ce=Z},this.dispose=function(){}}}const Dv=new nt,Jh=new Xe;Jh.set(-1,0,0,0,1,0,0,0,1);function Uv(i,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,kh(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,S,w,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,M)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),x(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,S,w):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Xt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Xt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const S=e.get(g),w=S.envMap,M=S.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(Dv.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Jh),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,S,w){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*S,p.scale.value=w*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,S){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Xt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function x(p,g){const S=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Nv(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const b=T.program;n.uniformBlockBinding(M,b)}function c(M,T){let b=s[M.id];b===void 0&&(p(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",S));const R=T.program;n.updateUBOMapping(M,R);const _=e.render.frame;r[M.id]!==_&&(u(M),r[M.id]=_)}function h(M){const T=d();M.__bindingPointIndex=T;const b=i.createBuffer(),R=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const T=s[M.id],b=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=b.length;_<E;_++){const P=b[_];if(Array.isArray(P))for(let I=0,F=P.length;I<F;I++)f(P[I],_,I,R);else f(P,_,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,T,b,R){if(x(M,T,b,R)===!0){const _=M.__offset,E=M.value;if(Array.isArray(E)){let P=0;for(let I=0;I<E.length;I++){const F=E[I],z=g(F);m(F,M.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function m(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function x(M,T,b,R){const _=M.value,E=T+"_"+b;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{const P=R[E];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function p(M){const T=M.uniforms;let b=0;const R=16;for(let E=0,P=T.length;E<P;E++){const I=Array.isArray(T[E])?T[E]:[T[E]];for(let F=0,z=I.length;F<z;F++){const U=I[F],k=Array.isArray(U.value)?U.value:[U.value];for(let K=0,W=k.length;K<W;K++){const oe=k[K],q=g(oe),J=b%R,B=J%q.boundary,se=J+B;b+=B,se!==0&&R-se<q.storage&&(b+=R-se),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=q.storage}}}const _=b%R;return _>0&&(b+=R-_),M.__size=b,M.__cache={},this}function g(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",M),T}function S(M){const T=M.target;T.removeEventListener("dispose",S);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const Fv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function Ov(){return Sn===null&&(Sn=new Ch(Fv,16,16,Ii,qt),Sn.name="DFG_LUT",Sn.minFilter=Pt,Sn.magFilter=Pt,Sn.wrapS=$n,Sn.wrapT=$n,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class Bv{constructor(e={}){const{canvas:t=ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=tn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const x=f,p=new Set([cl,ll,ol]),g=new Set([tn,Nn,Ys,$s,sl,rl]),S=new Uint32Array(4),w=new Int32Array(4),M=new C;let T=null,b=null;const R=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,F=null,z=null,U=null,k=null;this._outputColorSpace=Kt;let K=0,W=0,oe=null,q=-1,J=null;const B=new mt,se=new mt;let ae=null;const Ce=new Ee(0);let qe=0,Ze=t.width,Z=t.height,te=1,xe=null,ke=null;const we=new mt(0,0,Ze,Z),He=new mt(0,0,Ze,Z);let rt=!1;const ne=new vl;let ce=!1,he=!1;const ue=new nt,pe=new C,Be=new mt,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function We(){return oe===null?te:1}let L=n;function tt(y,D){return t.getContext(y,D)}let Ye,A,v,O,V,Y,fe,me,$,j,ge,ie,ee,de,Se,De,ze,N,ve,Q,_e,Te,le;try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ko}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",hn,!1),L===null){const D="webgl2";if(L=tt(D,y),L===null)throw tt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(y){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),it("WebGLRenderer: "+y.message),y}function Oe(){Ye=new O0(L),Ye.init(),_e=new Cv(L,Ye),A=new A0(L,Ye,e,_e),v=new Ev(L,Ye),A.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),z=L.createFramebuffer(),U=L.createFramebuffer(),k=L.createFramebuffer(),O=new z0(L),V=new dv,Y=new Av(L,Ye,v,V,A,_e,O),fe=new F0(P),me=new Gf(L),Te=new w0(L,me),$=new B0(L,me,O,Te),j=new G0(L,$,me,Te,O),N=new H0(L,A,Y),Se=new C0(V),ge=new uv(P,fe,Ye,A,Te,Se),ie=new Uv(P,V),ee=new pv,de=new Mv(Ye),ze=new T0(P,fe,v,j,m,l),De=new wv(P,j,A),le=new Nv(L,O,A,v),ve=new E0(L,Ye,O),Q=new k0(L,Ye,O),O.programs=ge.programs,P.capabilities=A,P.extensions=Ye,P.properties=V,P.renderLists=ee,P.shadowMap=De,P.state=v,P.info=O}x!==tn&&(E=new W0(x,t.width,t.height,o,s,r));const Ue=new Iv(P,L);this.xr=Ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Ye.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ye.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(y){y!==void 0&&(te=y,this.setSize(Ze,Z,!1))},this.getSize=function(y){return y.set(Ze,Z)},this.setSize=function(y,D,X=!0){if(Ue.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=y,Z=D,t.width=Math.floor(y*te),t.height=Math.floor(D*te),X===!0&&(t.style.width=y+"px",t.style.height=D+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(Ze*te,Z*te).floor()},this.setDrawingBufferSize=function(y,D,X){Ze=y,Z=D,te=X,t.width=Math.floor(y*X),t.height=Math.floor(D*X),this.setViewport(0,0,y,D)},this.setEffects=function(y){if(x===tn){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let D=0;D<y.length;D++)if(y[D].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(B)},this.getViewport=function(y){return y.copy(we)},this.setViewport=function(y,D,X,H){y.isVector4?we.set(y.x,y.y,y.z,y.w):we.set(y,D,X,H),v.viewport(B.copy(we).multiplyScalar(te).round())},this.getScissor=function(y){return y.copy(He)},this.setScissor=function(y,D,X,H){y.isVector4?He.set(y.x,y.y,y.z,y.w):He.set(y,D,X,H),v.scissor(se.copy(He).multiplyScalar(te).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(y){v.setScissorTest(rt=y)},this.setOpaqueSort=function(y){xe=y},this.setTransparentSort=function(y){ke=y},this.getClearColor=function(y){return y.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,X=!0){let H=0;if(y){let G=!1;if(oe!==null){const be=oe.texture.format;G=p.has(be)}if(G){const be=oe.texture.type,Re=g.has(be),ye=ze.getClearColor(),Pe=ze.getClearAlpha(),Ne=ye.r,$e=ye.g,Qe=ye.b;Re?(S[0]=Ne,S[1]=$e,S[2]=Qe,S[3]=Pe,L.clearBufferuiv(L.COLOR,0,S)):(w[0]=Ne,w[1]=$e,w[2]=Qe,w[3]=Pe,L.clearBufferiv(L.COLOR,0,w))}else H|=L.COLOR_BUFFER_BIT}D&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),F=y},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),ze.dispose(),ee.dispose(),de.dispose(),V.dispose(),fe.dispose(),j.dispose(),Te.dispose(),le.dispose(),ge.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Rl),Ue.removeEventListener("sessionend",Pl),xi.stop()};function dt(y){y.preventDefault(),Vl("WebGLRenderer: Context Lost."),I=!0}function at(){Vl("WebGLRenderer: Context Restored."),I=!1;const y=O.autoReset,D=De.enabled,X=De.autoUpdate,H=De.needsUpdate,G=De.type;Oe(),O.autoReset=y,De.enabled=D,De.autoUpdate=X,De.needsUpdate=H,De.type=G}function hn(y){it("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function _n(y){const D=y.target;D.removeEventListener("dispose",_n),uu(D)}function uu(y){du(y),V.remove(y)}function du(y){const D=V.get(y).programs;D!==void 0&&(D.forEach(function(X){ge.releaseProgram(X)}),y.isShaderMaterial&&ge.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,X,H,G,be){D===null&&(D=Fe);const Re=G.isMesh&&G.matrixWorld.determinantAffine()<0,ye=mu(y,D,X,H,G);v.setMaterial(H,Re);let Pe=X.index,Ne=1;if(H.wireframe===!0){if(Pe=$.getWireframeAttribute(X),Pe===void 0)return;Ne=2}const $e=X.drawRange,Qe=X.attributes.position;let Le=$e.start*Ne,ot=($e.start+$e.count)*Ne;be!==null&&(Le=Math.max(Le,be.start*Ne),ot=Math.min(ot,(be.start+be.count)*Ne)),Pe!==null?(Le=Math.max(Le,0),ot=Math.min(ot,Pe.count)):Qe!=null&&(Le=Math.max(Le,0),ot=Math.min(ot,Qe.count));const St=ot-Le;if(St<0||St===1/0)return;Te.setup(G,H,ye,X,Pe);let pt,ht=ve;if(Pe!==null&&(pt=me.get(Pe),ht=Q,ht.setIndex(pt)),G.isMesh)H.wireframe===!0?(v.setLineWidth(H.wireframeLinewidth*We()),ht.setMode(L.LINES)):ht.setMode(L.TRIANGLES);else if(G.isLine){let It=H.linewidth;It===void 0&&(It=1),v.setLineWidth(It*We()),G.isLineSegments?ht.setMode(L.LINES):G.isLineLoop?ht.setMode(L.LINE_LOOP):ht.setMode(L.LINE_STRIP)}else G.isPoints?ht.setMode(L.POINTS):G.isSprite&&ht.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))ht.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const It=G._multiDrawStarts,Ae=G._multiDrawCounts,Bt=G._multiDrawCount,st=Pe?me.get(Pe).bytesPerElement:1,nn=V.get(H).currentProgram.getUniforms();for(let xn=0;xn<Bt;xn++)nn.setValue(L,"_gl_DrawID",xn),ht.render(It[xn]/st,Ae[xn])}else if(G.isInstancedMesh)ht.renderInstances(Le,St,G.count);else if(X.isInstancedBufferGeometry){const It=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,It);ht.renderInstances(Le,St,Ae)}else ht.render(Le,St)};function Cl(y,D,X,H){F!==null&&y.isNodeMaterial&&F.setObject(H,y),ce===!0&&Se.setState(y,X,!1),y.transparent===!0&&y.side===on&&y.forceSinglePass===!1?(y.side=Xt,y.needsUpdate=!0,or(y,D,H),y.side=Pi,y.needsUpdate=!0,or(y,D,H),y.side=on):or(y,D,H)}this.compile=function(y,D,X=null){X===null&&(X=y),F!==null&&F.renderStart(y,D,X),b=de.get(X),b.init(D),_.push(b),X.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),y!==X&&y.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights(),F!==null&&F.updateLights(b.state.lightsArray),he=this.localClippingEnabled,ce=Se.init(this.clippingPlanes,he),ce===!0&&Se.setGlobalState(this.clippingPlanes,D),F!==null&&De.render(b.state.shadowsArray,X,D);const H=new Set;return y.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const be=G.material;if(be)if(Array.isArray(be))for(let Re=0;Re<be.length;Re++){const ye=be[Re];Cl(ye,X,D,G),H.add(ye)}else Cl(be,X,D,G),H.add(be)}),b=_.pop(),F!==null&&F.renderEnd(),H},this.compileAsync=function(y,D,X=null){const H=this.compile(y,D,X);return new Promise(G=>{function be(){if(H.forEach(function(Re){const Pe=V.get(Re).currentProgram;(Pe===void 0||Pe.isReady())&&H.delete(Re)}),H.size===0){G(y);return}setTimeout(be,10)}Ye.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let ha=null;function fu(y){ha&&ha(y)}function Rl(){xi.stop()}function Pl(){xi.start()}const xi=new Wh;xi.setAnimationLoop(fu),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(y){ha=y,Ue.setAnimationLoop(y),y===null?xi.stop():xi.start()},Ue.addEventListener("sessionstart",Rl),Ue.addEventListener("sessionend",Pl),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;F!==null&&F.renderStart(y,D);const X=Ue.enabled===!0&&Ue.isPresenting===!0,H=E!==null&&(oe===null||X)&&E.begin(P,oe);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(D),D=Ue.getCamera()),y.isScene===!0&&y.onBeforeRender(P,y,D,oe),b=de.get(y,_.length),b.init(D),b.state.textureUnits=Y.getTextureUnits(),_.push(b),ue.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ne.setFromProjectionMatrix(ue,Cn,D.reversedDepth),he=this.localClippingEnabled,ce=Se.init(this.clippingPlanes,he),T=ee.get(y,R.length),T.init(),R.push(T),Ue.enabled===!0&&Ue.isPresenting===!0){const Re=P.xr.getDepthSensingMesh();Re!==null&&ua(Re,D,-1/0,P.sortObjects)}ua(y,D,0,P.sortObjects),T.finish(),F!==null&&F.updateLights(b.state.lightsArray),P.sortObjects===!0&&T.sort(xe,ke),Ge=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Ge&&ze.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ce===!0&&Se.beginShadows();const G=b.state.shadowsArray;if(De.render(G,y,D),ce===!0&&Se.endShadows(),(H&&E.hasRenderPass())===!1){const Re=T.opaque,ye=T.transmissive;if(b.setupLights(),D.isArrayCamera){const Pe=D.cameras;if(ye.length>0)for(let Ne=0,$e=Pe.length;Ne<$e;Ne++){const Qe=Pe[Ne];Il(Re,ye,y,Qe)}Ge&&ze.render(y);for(let Ne=0,$e=Pe.length;Ne<$e;Ne++){const Qe=Pe[Ne];Ll(T,y,Qe,Qe.viewport)}}else ye.length>0&&Il(Re,ye,y,D),Ge&&ze.render(y),Ll(T,y,D)}oe!==null&&W===0&&(Y.updateMultisampleRenderTarget(oe),Y.updateRenderTargetMipmap(oe)),H&&E.end(P),y.isScene===!0&&y.onAfterRender(P,y,D),Te.resetDefaultState(),q=-1,J=null,_.pop(),_.length>0?(b=_[_.length-1],Y.setTextureUnits(b.state.textureUnits),ce===!0&&Se.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,F!==null&&F.renderEnd()};function ua(y,D,X,H){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(ne)){H&&Be.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ue);const Re=j.update(y),ye=y.material;ye.visible&&T.push(y,Re,ye,X,Be.z,null,D)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(ne))){const Re=j.update(y),ye=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Be.copy(y.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Be.copy(Re.boundingSphere.center)),Be.applyMatrix4(y.matrixWorld).applyMatrix4(ue)),Array.isArray(ye)){const Pe=Re.groups;for(let Ne=0,$e=Pe.length;Ne<$e;Ne++){const Qe=Pe[Ne],Le=ye[Qe.materialIndex];Le&&Le.visible&&T.push(y,Re,Le,X,Be.z,Qe,D)}}else ye.visible&&T.push(y,Re,ye,X,Be.z,null,D)}}const be=y.children;for(let Re=0,ye=be.length;Re<ye;Re++)ua(be[Re],D,X,H)}function Ll(y,D,X,H){const{opaque:G,transmissive:be,transparent:Re}=y;b.setupLightsView(X),ce===!0&&Se.setGlobalState(P.clippingPlanes,X),H&&v.viewport(B.copy(H)),G.length>0&&ar(G,D,X),be.length>0&&ar(be,D,X),Re.length>0&&ar(Re,D,X),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Il(y,D,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Le=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Ot(1,1,{generateMipmaps:!0,type:Le?qt:tn,minFilter:fi,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}const be=b.state.transmissionRenderTarget[H.id],Re=H.viewport||B;be.setSize(Re.z*P.transmissionResolutionScale,Re.w*P.transmissionResolutionScale);const ye=P.getRenderTarget(),Pe=P.getActiveCubeFace(),Ne=P.getActiveMipmapLevel();P.setRenderTarget(be),P.getClearColor(Ce),qe=P.getClearAlpha(),qe<1&&P.setClearColor(16777215,.5),P.clear(),Ge&&ze.render(X);const $e=P.toneMapping;P.toneMapping=Un;const Qe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),ce===!0&&Se.setGlobalState(P.clippingPlanes,H),ar(y,X,H),Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let ot=0,St=D.length;ot<St;ot++){const pt=D[ot],{object:ht,geometry:It,material:Ae,group:Bt}=pt;if(Ae.side===on&&ht.layers.test(H.layers)){const st=Ae.side;Ae.side=Xt,Ae.needsUpdate=!0,Dl(ht,X,H,It,Ae,Bt),Ae.side=st,Ae.needsUpdate=!0,Le=!0}}Le===!0&&(Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be))}P.setRenderTarget(ye,Pe,Ne),P.setClearColor(Ce,qe),Qe!==void 0&&(H.viewport=Qe),P.toneMapping=$e}function ar(y,D,X){const H=D.isScene===!0?D.overrideMaterial:null;for(let G=0,be=y.length;G<be;G++){const Re=y[G],{object:ye,geometry:Pe,group:Ne}=Re;let $e=Re.material;$e.allowOverride===!0&&H!==null&&($e=H),ye.layers.test(X.layers)&&Dl(ye,D,X,Pe,$e,Ne)}}function Dl(y,D,X,H,G,be){F!==null&&G.isNodeMaterial&&F.setObject(y,G),y.onBeforeRender(P,D,X,H,G,be),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),G.onBeforeRender(P,D,X,H,y,be),G.transparent===!0&&G.side===on&&G.forceSinglePass===!1?(G.side=Xt,G.needsUpdate=!0,P.renderBufferDirect(X,D,H,G,y,be),G.side=Pi,G.needsUpdate=!0,P.renderBufferDirect(X,D,H,G,y,be),G.side=on):P.renderBufferDirect(X,D,H,G,y,be),y.onAfterRender(P,D,X,H,G,be)}function or(y,D,X){D.isScene!==!0&&(D=Fe);const H=V.get(y),G=b.state.lights,be=b.state.shadowsArray,Re=G.state.version,ye=ge.getParameters(y,G.state,be,D,X,b.state.lightProbeGridArray),Pe=ge.getProgramCacheKey(ye);let Ne=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,H.fog=D.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=fe.get(y.envMap||H.environment,$e),H.envMapRotation=H.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Ne===void 0&&(y.addEventListener("dispose",_n),Ne=new Map,H.programs=Ne);let Qe=Ne.get(Pe);if(Qe!==void 0){if(H.currentProgram===Qe&&H.lightsStateVersion===Re)return Nl(y,ye),Qe}else ye.uniforms=ge.getUniforms(y),F!==null&&y.isNodeMaterial&&F.build(y,X,ye),y.onBeforeCompile(ye,P),Qe=ge.acquireProgram(ye,Pe),Ne.set(Pe,Qe),H.uniforms=ye.uniforms;const Le=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Le.clippingPlanes=Se.uniform),Nl(y,ye),H.needsLights=vu(y),H.lightsStateVersion=Re,H.needsLights&&(Le.ambientLightColor.value=G.state.ambient,Le.lightProbe.value=G.state.probe,Le.sunLights.value=G.state.sun,Le.sunLightShadows.value=G.state.sunShadow,Le.directionalLights.value=G.state.directional,Le.directionalLightShadows.value=G.state.directionalShadow,Le.spotLights.value=G.state.spot,Le.spotLightShadows.value=G.state.spotShadow,Le.rectAreaLights.value=G.state.rectArea,Le.ltc_1.value=G.state.rectAreaLTC1,Le.ltc_2.value=G.state.rectAreaLTC2,Le.pointLights.value=G.state.point,Le.pointLightShadows.value=G.state.pointShadow,Le.hemisphereLights.value=G.state.hemi,Le.sunShadowMatrix.value=G.state.sunShadowMatrix,Le.sunShadowCascade.value=G.state.sunShadowCascade,Le.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Le.spotLightMatrix.value=G.state.spotLightMatrix,Le.spotLightMap.value=G.state.spotLightMap,Le.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Qe,H.uniformsList=null,Qe}function Ul(y){if(y.uniformsList===null){const D=y.currentProgram.getUniforms();y.uniformsList=Wr.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Nl(y,D){const X=V.get(y);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function pu(y,D){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(D.matrixWorld);for(let X=0,H=y.length;X<H;X++){const G=y[X];if(G.texture!==null&&G.boundingBox.containsPoint(M))return G}return null}function mu(y,D,X,H,G){D.isScene!==!0&&(D=Fe),Y.resetTextureUnits();const be=D.fog,Re=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?D.environment:null,ye=oe===null?P.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:et.workingColorSpace,Pe=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ne=fe.get(H.envMap||Re,Pe),$e=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Qe=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Le=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,St=!!X.morphAttributes.color;let pt=Un;H.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(pt=P.toneMapping);const ht=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,It=ht!==void 0?ht.length:0,Ae=V.get(H),Bt=b.state.lights;if(ce===!0&&(he===!0||y!==J)){const ft=y===J&&H.id===q;Se.setState(H,y,ft)}let st=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Bt.state.version||Ae.outputColorSpace!==ye||G.isBatchedMesh&&Ae.batching===!1||!G.isBatchedMesh&&Ae.batching===!0||G.isBatchedMesh&&Ae.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Ae.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Ae.instancing===!1||!G.isInstancedMesh&&Ae.instancing===!0||G.isSkinnedMesh&&Ae.skinning===!1||!G.isSkinnedMesh&&Ae.skinning===!0||G.isInstancedMesh&&Ae.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ae.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ae.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ae.instancingMorph===!1&&G.morphTexture!==null||Ae.envMap!==Ne||H.fog===!0&&Ae.fog!==be||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Se.numPlanes||Ae.numIntersection!==Se.numIntersection)||Ae.vertexAlphas!==$e||Ae.vertexTangents!==Qe||Ae.morphTargets!==Le||Ae.morphNormals!==ot||Ae.morphColors!==St||Ae.toneMapping!==pt||Ae.morphTargetsCount!==It||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Ae.__version=H.version);let nn=Ae.currentProgram;st===!0&&(nn=or(H,D,G),F&&H.isNodeMaterial&&F.onUpdateProgram(H,nn,Ae));let xn=!1,ni=!1,ki=!1;const ct=nn.getUniforms(),xt=Ae.uniforms;if(v.useProgram(nn.program)&&(xn=!0,ni=!0,ki=!0),H.id!==q&&(q=H.id,ni=!0),Ae.needsLights){const ft=pu(b.state.lightProbeGridArray,G);Ae.lightProbeGrid!==ft&&(Ae.lightProbeGrid=ft,ni=!0)}if(xn||J!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ct.setValue(L,"projectionMatrix",y.projectionMatrix),ct.setValue(L,"viewMatrix",y.matrixWorldInverse);const si=ct.map.cameraPosition;si!==void 0&&si.setValue(L,pe.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ct.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),J!==y&&(J=y,ni=!0,ki=!0)}if(Ae.needsLights&&(Bt.state.sunShadowMap.length>0&&ct.setValue(L,"sunShadowMap",Bt.state.sunShadowMap,Y),Bt.state.directionalShadowMap.length>0&&ct.setValue(L,"directionalShadowMap",Bt.state.directionalShadowMap,Y),Bt.state.spotShadowMap.length>0&&ct.setValue(L,"spotShadowMap",Bt.state.spotShadowMap,Y),Bt.state.pointShadowMap.length>0&&ct.setValue(L,"pointShadowMap",Bt.state.pointShadowMap,Y)),G.isSkinnedMesh){ct.setOptional(L,G,"bindMatrix"),ct.setOptional(L,G,"bindMatrixInverse");const ft=G.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ct.setValue(L,"boneTexture",ft.boneTexture,Y))}G.isBatchedMesh&&(ct.setOptional(L,G,"batchingTexture"),ct.setValue(L,"batchingTexture",G._matricesTexture,Y),ct.setOptional(L,G,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",G._indirectTexture,Y),ct.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",G._colorsTexture,Y));const ii=X.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&N.update(G,X,nn),(ni||Ae.receiveShadow!==G.receiveShadow)&&(Ae.receiveShadow=G.receiveShadow,ct.setValue(L,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&D.environment!==null&&(xt.envMapIntensity.value=D.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=Ov()),ni){if(ct.setValue(L,"toneMappingExposure",P.toneMappingExposure),Ae.needsLights&&gu(xt,ki),be&&H.fog===!0&&ie.refreshFogUniforms(xt,be),ie.refreshMaterialUniforms(xt,H,te,Z,b.state.transmissionRenderTarget[y.id]),Ae.needsLights&&Ae.lightProbeGrid){const ft=Ae.lightProbeGrid;xt.probesSH.value=ft.texture,xt.probesMin.value.copy(ft.boundingBox.min),xt.probesMax.value.copy(ft.boundingBox.max),xt.probesResolution.value.copy(ft.resolution)}Wr.upload(L,Ul(Ae),xt,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Wr.upload(L,Ul(Ae),xt,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ct.setValue(L,"center",G.center),ct.setValue(L,"modelViewMatrix",G.modelViewMatrix),ct.setValue(L,"normalMatrix",G.normalMatrix),ct.setValue(L,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const ft=H.uniformsGroups;for(let si=0,zi=ft.length;si<zi;si++){const Ol=ft[si];le.update(Ol,nn),le.bind(Ol,nn)}}return nn}function gu(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.sunLights.needsUpdate=D,y.sunLightShadows.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function vu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(y,D,X){const H=V.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=D,V.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){const X=V.get(y);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,X=0){oe=y,K=D,W=X;let H=null,G=!1,be=!1;if(y){const ye=V.get(y);if(ye.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(L.FRAMEBUFFER,ye.__webglFramebuffer),B.copy(y.viewport),se.copy(y.scissor),ae=y.scissorTest,v.viewport(B),v.scissor(se),v.setScissorTest(ae),q=-1;return}else if(ye.__webglFramebuffer===void 0)Y.setupRenderTarget(y);else if(ye.__hasExternalTextures)Y.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(ye.__boundDepthTexture!==$e){if($e!==null&&V.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(y)}}const Pe=y.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(be=!0);const Ne=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ne[D])?H=Ne[D][X]:H=Ne[D],G=!0):y.samples>0&&Y.useMultisampledRTT(y)===!1?H=V.get(y).__webglMultisampledFramebuffer:Array.isArray(Ne)?H=Ne[X]:H=Ne,B.copy(y.viewport),se.copy(y.scissor),ae=y.scissorTest}else B.copy(we).multiplyScalar(te).floor(),se.copy(He).multiplyScalar(te).floor(),ae=rt;if(X!==0&&(H=z),v.bindFramebuffer(L.FRAMEBUFFER,H)&&v.drawBuffers(y,H),v.viewport(B),v.scissor(se),v.setScissorTest(ae),G){const ye=V.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,ye.__webglTexture,X)}else if(be){const ye=D;for(let Pe=0;Pe<y.textures.length;Pe++){const Ne=V.get(y.textures[Pe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Pe,Ne.__webglTexture,X,ye)}}else if(y!==null&&X!==0){const ye=V.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ye.__webglTexture,X)}q=-1};function Fl(y){const D=V.get(y);return(D.__readFormat!==y.format||D.__readType!==y.type)&&(D.__readFormat=y.format,D.__readType=y.type,D.__formatReadable=A.textureFormatReadable(y.format),D.__typeReadable=A.textureTypeReadable(y.type)),D}this.readRenderTargetPixels=function(y,D,X,H,G,be,Re,ye=0){if(!(y&&y.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe){v.bindFramebuffer(L.FRAMEBUFFER,Pe);try{const Ne=y.textures[ye],$e=Ne.format,Qe=Ne.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);const Le=Fl(Ne);if(Le.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-H&&X>=0&&X<=y.height-G&&L.readPixels(D,X,H,G,_e.convert($e),_e.convert(Qe),be)}finally{const Ne=oe!==null?V.get(oe).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(y,D,X,H,G,be,Re,ye=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Re!==void 0&&(Pe=Pe[Re]),Pe)if(D>=0&&D<=y.width-H&&X>=0&&X<=y.height-G){v.bindFramebuffer(L.FRAMEBUFFER,Pe);const Ne=y.textures[ye],$e=Ne.format,Qe=Ne.type;y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);const Le=Fl(Ne);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.bufferData(L.PIXEL_PACK_BUFFER,be.byteLength,L.STREAM_READ),L.readPixels(D,X,H,G,_e.convert($e),_e.convert(Qe),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const St=oe!==null?V.get(oe).__webglFramebuffer:null;v.bindFramebuffer(L.FRAMEBUFFER,St);const pt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ed(L,pt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ot),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,be),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(ot),L.deleteSync(pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,X=0){const H=Math.pow(2,-X),G=Math.floor(y.image.width*H),be=Math.floor(y.image.height*H),Re=D!==null?D.x:0,ye=D!==null?D.y:0;Y.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Re,ye,G,be),v.unbindTexture()},this.copyTextureToTexture=function(y,D,X=null,H=null,G=0,be=0){let Re,ye,Pe,Ne,$e,Qe,Le,ot,St;const pt=y.isCompressedTexture?y.mipmaps[be]:y.image;if(X!==null)Re=X.max.x-X.min.x,ye=X.max.y-X.min.y,Pe=X.isBox3?X.max.z-X.min.z:1,Ne=X.min.x,$e=X.min.y,Qe=X.isBox3?X.min.z:0;else{const xt=Math.pow(2,-G);Re=Math.floor(pt.width*xt),ye=Math.floor(pt.height*xt),y.isDataArrayTexture?Pe=pt.depth:y.isData3DTexture?Pe=Math.floor(pt.depth*xt):Pe=1,Ne=0,$e=0,Qe=0}H!==null?(Le=H.x,ot=H.y,St=H.z):(Le=0,ot=0,St=0);const ht=_e.convert(D.format),It=_e.convert(D.type);let Ae;D.isData3DTexture?(Y.setTexture3D(D,0),Ae=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Y.setTexture2DArray(D,0),Ae=L.TEXTURE_2D_ARRAY):(Y.setTexture2D(D,0),Ae=L.TEXTURE_2D),v.activeTexture(L.TEXTURE0),v.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),v.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),v.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Bt=v.getParameter(L.UNPACK_ROW_LENGTH),st=v.getParameter(L.UNPACK_IMAGE_HEIGHT),nn=v.getParameter(L.UNPACK_SKIP_PIXELS),xn=v.getParameter(L.UNPACK_SKIP_ROWS),ni=v.getParameter(L.UNPACK_SKIP_IMAGES);v.pixelStorei(L.UNPACK_ROW_LENGTH,pt.width),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt.height),v.pixelStorei(L.UNPACK_SKIP_PIXELS,Ne),v.pixelStorei(L.UNPACK_SKIP_ROWS,$e),v.pixelStorei(L.UNPACK_SKIP_IMAGES,Qe);const ki=y.isDataArrayTexture||y.isData3DTexture,ct=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){const xt=V.get(y),ii=V.get(D),ft=V.get(xt.__renderTarget),si=V.get(ii.__renderTarget);v.bindFramebuffer(L.READ_FRAMEBUFFER,ft.__webglFramebuffer),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let zi=0;zi<Pe;zi++)ki&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(y).__webglTexture,G,Qe+zi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(D).__webglTexture,be,St+zi)),L.blitFramebuffer(Ne,$e,Re,ye,Le,ot,Re,ye,L.DEPTH_BUFFER_BIT,L.NEAREST);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||y.isRenderTargetTexture||V.has(y)){const xt=V.get(y),ii=V.get(D);v.bindFramebuffer(L.READ_FRAMEBUFFER,U),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,k);for(let ft=0;ft<Pe;ft++)ki?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.__webglTexture,G,Qe+ft):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xt.__webglTexture,G),ct?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ii.__webglTexture,be,St+ft):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ii.__webglTexture,be),G!==0?L.blitFramebuffer(Ne,$e,Re,ye,Le,ot,Re,ye,L.COLOR_BUFFER_BIT,L.NEAREST):ct?L.copyTexSubImage3D(Ae,be,Le,ot,St+ft,Ne,$e,Re,ye):L.copyTexSubImage2D(Ae,be,Le,ot,Ne,$e,Re,ye);v.bindFramebuffer(L.READ_FRAMEBUFFER,null),v.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ct?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(Ae,be,Le,ot,St,Re,ye,Pe,ht,It,pt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,be,Le,ot,St,Re,ye,Pe,ht,pt.data):L.texSubImage3D(Ae,be,Le,ot,St,Re,ye,Pe,ht,It,pt):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,be,Le,ot,Re,ye,ht,It,pt.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,be,Le,ot,pt.width,pt.height,ht,pt.data):L.texSubImage2D(L.TEXTURE_2D,be,Le,ot,Re,ye,ht,It,pt);v.pixelStorei(L.UNPACK_ROW_LENGTH,Bt),v.pixelStorei(L.UNPACK_IMAGE_HEIGHT,st),v.pixelStorei(L.UNPACK_SKIP_PIXELS,nn),v.pixelStorei(L.UNPACK_SKIP_ROWS,xn),v.pixelStorei(L.UNPACK_SKIP_IMAGES,ni),be===0&&D.generateMipmaps&&L.generateMipmap(Ae),v.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&Y.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Y.setTextureCube(y,0):y.isData3DTexture?Y.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Y.setTexture2DArray(y,0):Y.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){K=0,W=0,oe=null,v.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Ei=1/60,kv=.1,Xc=6,Fn={halfX:5,halfZ:4.5,maxHealth:100},Xr={boardRadius:27,spawnRadius:24},Pn=6,zv=[1,4],Ci={handDraw:4,energyPerTurn:6,purgesPerTurn:1},qn={tower:3,active:1,passive:1},Yt={needle:{id:"needle",name:"Memory Needle",type:"tower",cost:qn.tower,rarity:"common",pattern:"projectile",interval:.9,damage:6,range:14,projectileSpeed:24,projectileLife:1.4,summary:"Steady homing needle. Medium range, single target.",flavor:"It remembers where the crack began."},light:{id:"light",name:"Last Light",type:"tower",cost:qn.tower,rarity:"common",pattern:"lance",interval:2.6,damage:30,range:22,summary:"Heavy instant lance. Long range, single target.",flavor:"The final sunrise, held in two lenses."},thread:{id:"thread",name:"Kindred Thread",type:"tower",cost:qn.tower,rarity:"common",pattern:"chain",interval:2,damage:9,range:13,chainDamage:[9,7,5],chainHopRange:2.6,summary:"Chains through up to 3 nearby foes.",flavor:"What was bound in life stays bound."},bell:{id:"bell",name:"Mercy Bell",type:"tower",cost:qn.tower,rarity:"common",pattern:"pulse",interval:2.8,damage:10,range:8.5,pulseRadius:8.5,summary:"Rings every foe close to the Base. Short range.",flavor:"Rung once for every name forgotten."}},Hv={mend:{id:"mend",name:"Mend the Vessel",type:"active",cost:qn.active,rarity:"common",effect:{kind:"heal",amount:10},target:"none",summary:"Restore 10 Integrity.",flavor:"Gold in the seams, stronger than before."},ash:{id:"ash",name:"Scatter Ash",type:"active",cost:qn.active,rarity:"common",effect:{kind:"blast",damage:12,radius:10},target:"none",summary:"When the next wave begins, deal 12 to every foe within 10 of the Base.",flavor:"What burns once remembers the fire."},quicken:{id:"quicken",name:"Quicken",type:"active",cost:qn.active,rarity:"common",effect:{kind:"charge"},target:"tower",summary:"Fill one placed tower to full charge.",flavor:"The sand forgets to fall."},polish:{id:"polish",name:"Polished Memory",type:"passive",cost:qn.passive,rarity:"common",effect:{kind:"damageBonus",amount:.15},target:"none",summary:"Next wave: all towers deal +15% damage.",flavor:"Rubbed bright by repetition."},heavy:{id:"heavy",name:"Heavy Air",type:"passive",cost:qn.passive,rarity:"common",effect:{kind:"slow",factor:.8},target:"none",summary:"Next wave: foes move 20% slower.",flavor:"Even the dead tire of walking."}},Gv=["needle","light","thread","bell"],Vv=["mend","ash","quicken","polish","heavy"],Qh=[...Gv,...Vv],Wv=["needle","mend","mend","ash","ash","quicken","quicken","polish","polish","heavy"];function an(i){return Yt[i]??Hv[i]}function Yn(i){return i in Yt}const jh={echo:{kind:"echo",name:"Veiled Echo",hp:6,speed:.9,contactDamage:3,radius:.45},moth:{kind:"moth",name:"Folded Moth",hp:3,speed:1.4,contactDamage:2,radius:.37},urn:{kind:"urn",name:"Burden Urn",hp:24,speed:.5,contactDamage:8,radius:.62}},qc=["echo","moth","urn"],Rs={cellSize:1,stiffness:.5,maxPush:.06},wl=[{durationSeconds:30,spawnRateStart:.51,spawnRateEnd:.85,weights:{echo:1},hpMultiplier:1,packSize:[1,3],forecast:"Veiled Echoes gather at the edge of the table."},{durationSeconds:30,spawnRateStart:.77,spawnRateEnd:1.1,weights:{echo:.7,moth:.3},hpMultiplier:1.1,packSize:[2,4],forecast:"Folded Moths join — fast and fragile."},{durationSeconds:30,spawnRateStart:.85,spawnRateEnd:1.27,weights:{echo:.6,moth:.25,urn:.15},hpMultiplier:1.2,packSize:[2,4],forecast:"The first Burden Urns: slow, heavy, hard to break."},{durationSeconds:30,spawnRateStart:1.02,spawnRateEnd:1.53,weights:{echo:.5,moth:.3,urn:.2},hpMultiplier:1.3,packSize:[2,5],forecast:"A mixed procession of all three."},{durationSeconds:30,spawnRateStart:1.22,spawnRateEnd:1.77,weights:{echo:.8,moth:.14,urn:.06},hpMultiplier:1.4,packSize:[4,8],forecast:"Crowd: a dense tide of Veiled Echoes."},{durationSeconds:30,spawnRateStart:1.22,spawnRateEnd:1.71,weights:{moth:.7,echo:.24,urn:.06},hpMultiplier:1.5,packSize:[3,7],forecast:"Swarm: fast Folded Moths from every side."},{durationSeconds:30,spawnRateStart:.85,spawnRateEnd:1.27,weights:{urn:.45,echo:.4,moth:.15},hpMultiplier:1.6,packSize:[2,4],forecast:"Burden: a procession of armored Urns."},{durationSeconds:30,spawnRateStart:1.25,spawnRateEnd:1.85,weights:{echo:.5,moth:.35,urn:.15},hpMultiplier:1.7,packSize:[3,6],forecast:"The final wave. Then the way home opens."}],Ws=wl.length,Xv="Reclaim your memories. Endure eight waves. Return to life.";class qv{accumulator=0;alpha=1;reset(){this.accumulator=0,this.alpha=1}advance(e,t,n){if(!t)return this.reset(),"continue";this.accumulator+=Math.min(Math.max(e,0),kv);let s=0;for(;this.accumulator>=Ei-1e-12&&s<Xc;){this.accumulator-=Ei,s++;const r=n();if(r!=="continue")return this.reset(),r}return s===Xc&&this.accumulator>Ei&&(this.accumulator=Ei),this.accumulator=Math.max(0,this.accumulator),this.alpha=Math.min(1,this.accumulator/Ei),"continue"}}class Yc{constructor(e,t){this.rng=t,this.drawPile=e.map(n=>this.make(n)),this.shuffle(this.drawPile)}rng;drawPile=[];hand=[];discard=[];nextUid=1;make(e){return{uid:this.nextUid++,defId:e}}shuffle(e){for(let t=e.length-1;t>0;t--){const n=this.rng.int(t+1);[e[t],e[n]]=[e[n],e[t]]}}get size(){return this.drawPile.length+this.hand.length+this.discard.length}draw(e){const t=[];for(let n=0;n<e;n++){if(this.drawPile.length===0){if(this.discard.length===0)break;this.drawPile=this.discard,this.discard=[],this.shuffle(this.drawPile)}const s=this.drawPile.pop();this.hand.push(s),t.push(s)}return t}drawOpening(e){const t=this.draw(e);if(!this.hand.some(n=>Yn(n.defId))){const n=this.drawPile.findIndex(s=>Yn(s.defId));if(n>=0&&this.hand.length>0){const s=this.rng.int(this.hand.length),r=this.drawPile[n];this.drawPile[n]=this.hand[s],this.hand[s]=r,t[t.indexOf(this.drawPile[n])]=r}}return t}discardHand(){const e=this.hand;return this.discard.push(...e),this.hand=[],e}inHand(e){return this.hand.find(t=>t.uid===e)}takeFromHand(e){const t=this.hand.findIndex(n=>n.uid===e);return t<0?void 0:this.hand.splice(t,1)[0]}discardFromHand(e){const t=this.takeFromHand(e);return t&&this.discard.push(t),t}addToHand(e){const t=this.make(e);return this.hand.push(t),t}}function Yv(i,e,t){const n=[];e===t&&n.push(e);const s=Qh.filter(r=>!n.includes(r));for(;n.length<3&&s.length>0;)n.push(s.splice(i.int(s.length),1)[0]);for(let r=n.length-1;r>0;r--){const a=i.int(r+1);[n[r],n[a]]=[n[a],n[r]]}return n}class eu{s;constructor(e){this.s=e>>>0}next(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e){return Math.floor(this.next()*e)}pick(e){return e[this.int(e.length)]}}function $v(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Os(i,e){return new eu((i^$v(e))>>>0)}function qa(){return(Math.floor(Math.random()*4294967295)^Date.now())>>>0||1}const kt=1e-9;function ea(i,e,t=Fn.halfX,n=Fn.halfZ){const s=Math.max(Math.abs(i)-t,0),r=Math.max(Math.abs(e)-n,0);return Math.hypot(s,r)}function Kv(i){return ea(i.x,i.z)<=i.radius}class $c{seed;trials;spawningEnabled;tick=0;simTime=0;trialIndex=0;trialTime=0;clearing=!1;spawnProgress=0;baseHp=Fn.maxHealth;damageBonus=0;speedFactor=1;pendingBlasts=[];locked=Array.from({length:Pn},(e,t)=>!zv.includes(t));enemies=[];projectiles=[];slots=new Array(Pn).fill(null);kills=0;arrivals=0;totalDamageDealt=0;nextEnemyId=1;nextWeaponId=1;nextProjectileId=1;spawnRng;events=[];constructor(e){this.seed=e.seed,this.trials=e.trials??wl,this.spawningEnabled=e.spawning??!0,this.spawnRng=Os(e.seed,"spawns")}get trial(){return this.trials[this.trialIndex]}get damageMultiplier(){return 1+this.damageBonus}unlockSlot(e){this.locked[e]=!1}resetWaveModifiers(){this.damageBonus=0,this.speedFactor=1}weaponsInOrder(){const e=[];for(const t of this.slots)t&&e.push(t);return e.sort((t,n)=>t.id-n.id),e}installWeapon(e,t){if(e<0||e>=Pn)throw new Error(`bad slot ${e}`);const n={id:this.nextWeaponId++,defId:t,slot:e,elapsed:0,shots:0};return this.slots[e]=n,n}permuteSlots(e){const t=this.slots.slice(),n=new Array(Pn).fill(null);t.forEach((s,r)=>{const a=e[r];n[a]=s,s&&(s.slot=a)}),this.slots=n}spawnEnemy(e,t,n,s=this.trial.hpMultiplier){const r=jh[e],a=Math.round(r.hp*s),o={id:this.nextEnemyId++,kind:e,x:t,z:n,prevX:t,prevZ:n,hp:a,maxHp:a,radius:r.radius,speed:r.speed,contactDamage:r.contactDamage,alive:!0,spawnedAt:this.simTime};return this.enemies.push(o),this.events.push({type:"spawned",t:this.simTime,enemyId:o.id,kind:e,x:t,z:n}),o}spawnRate(){const e=this.trial,t=Math.min(1,Math.max(0,this.trialTime/e.durationSeconds));return e.spawnRateStart+(e.spawnRateEnd-e.spawnRateStart)*t}isSpawningWindow(){return this.spawningEnabled&&!this.clearing&&this.trialTime<this.trial.durationSeconds-kt}drainEvents(){const e=this.events;return this.events=[],e}step(){const e=Ei;if(this.tick++,this.simTime=this.tick*e,this.pendingBlasts.length>0){for(const n of this.pendingBlasts)this.resolveBlast(n.damage*this.damageMultiplier,n.radius);this.pendingBlasts=[]}if(this.isSpawningWindow())for(this.spawnProgress+=this.spawnRate()*e;this.spawnProgress>=1;)this.spawnProgress-=this.spawnScheduled();for(const n of this.enemies){if(n.prevX=n.x,n.prevZ=n.z,!n.alive)continue;const s=Math.hypot(n.x,n.z);if(s>kt){const r=Math.min(n.speed*this.speedFactor*e,s);n.x-=n.x/s*r,n.z-=n.z/s*r}}this.separate();for(const n of this.projectiles)n.prevX=n.x,n.prevZ=n.z;for(const n of this.weaponsInOrder())this.updateWeapon(n,e);this.updateProjectiles(e),this.enemies.some(n=>!n.alive)&&(this.enemies=this.enemies.filter(n=>n.alive));let t=!1;for(const n of this.enemies)n.alive&&Kv(n)&&(n.alive=!1,t=!0,this.arrivals++,this.baseHp=Math.max(0,this.baseHp-n.contactDamage),this.events.push({type:"arrived",t:this.simTime,enemyId:n.id,kind:n.kind,damage:n.contactDamage,x:n.x,z:n.z}),this.events.push({type:"baseDamaged",t:this.simTime,amount:n.contactDamage,hp:this.baseHp}));return t&&(this.enemies=this.enemies.filter(n=>n.alive)),this.baseHp<=0?"defeat":(this.trialTime+=e,this.clearing?this.enemies.length===0?"victory":"continue":this.trialTime>=this.trial.durationSeconds-kt?(this.trialTime=this.trial.durationSeconds,this.trialIndex<this.trials.length-1?"boundary":(this.clearing=!0,this.enemies.length===0?"victory":"clearingStarted")):"continue")}separate(){const e=this.enemies.length;if(e<2)return;const t=Rs.cellSize,n=new Map,s=(o,l)=>(o+4096)*8192+(l+4096);for(let o=0;o<e;o++){const l=this.enemies[o];if(!l.alive)continue;const c=s(Math.floor(l.x/t),Math.floor(l.z/t)),h=n.get(c);h?h.push(o):n.set(c,[o])}const r=new Float64Array(e),a=new Float64Array(e);for(let o=0;o<e;o++){const l=this.enemies[o];if(!l.alive)continue;const c=Math.floor(l.x/t),h=Math.floor(l.z/t);for(let d=-1;d<=1;d++)for(let u=-1;u<=1;u++){const f=n.get(s(c+d,h+u));if(f)for(const m of f){if(m<=o)continue;const x=this.enemies[m],p=x.x-l.x,g=x.z-l.z,S=l.radius+x.radius,w=p*p+g*g;if(w>=S*S)continue;let M=Math.sqrt(w),T,b;if(M<1e-6){const _=(l.id*92821+x.id*68917)%360*(Math.PI/180);T=Math.cos(_),b=Math.sin(_),M=0}else T=p/M,b=g/M;const R=(S-M)*Rs.stiffness*.5;r[o]-=T*R,a[o]-=b*R,r[m]+=T*R,a[m]+=b*R}}}for(let o=0;o<e;o++){const l=this.enemies[o];if(!l.alive||r[o]===0&&a[o]===0)continue;let c=r[o],h=a[o];const d=Math.hypot(c,h);d>Rs.maxPush&&(c*=Rs.maxPush/d,h*=Rs.maxPush/d);const u=l.x+c,f=l.z+h;ea(u,f)<=l.radius||(l.x=u,l.z=f)}}resolveBlast(e,t){const n=this.enemies.filter(s=>s.alive&&Math.hypot(s.x,s.z)<=t+kt);this.events.push({type:"blast",t:this.simTime,radius:t,hits:n.length});for(const s of n)this.damage(s,e,"ash")}beginNextTrial(){this.trialIndex<this.trials.length-1&&(this.trialIndex++,this.trialTime=0)}heal(e){const t=this.baseHp;this.baseHp=Math.min(Fn.maxHealth,this.baseHp+e);const n=this.baseHp-t;return this.events.push({type:"healed",t:this.simTime,amount:n,hp:this.baseHp}),n}spawnScheduled(){const e=this.trial,[t,n]=e.packSize??[1,1],s=t+this.spawnRng.int(n-t+1),r=this.spawnRng.next()*Math.PI*2;for(let a=0;a<s;a++){const o=Zv(this.spawnRng,e.weights),l=r+(a===0?0:this.spawnRng.range(-.16,.16)),c=Xr.spawnRadius+(a===0?0:this.spawnRng.range(.1,.9));this.spawnEnemy(o,Math.cos(l)*c,Math.sin(l)*c)}return s}nearestThreat(e,t){let n=null,s=1/0;for(const r of this.enemies){if(!r.alive||t&&t.has(r.id)||Math.hypot(r.x,r.z)>e+kt)continue;const a=ea(r.x,r.z);(a<s-kt||Math.abs(a-s)<=kt&&n&&r.id<n.id)&&(n=r,s=a)}return n}nearestTo(e,t,n,s){let r=null,a=1/0;for(const o of this.enemies){if(!o.alive||s.has(o.id))continue;const l=Math.hypot(o.x-e,o.z-t);l>n+kt||(l<a-kt||Math.abs(l-a)<=kt&&r&&o.id<r.id)&&(r=o,a=l)}return r}anyInPulse(e){return this.enemies.some(t=>t.alive&&Math.hypot(t.x,t.z)<=e+kt)}hasTarget(e){return e.pattern==="pulse"?this.anyInPulse(e.pulseRadius??e.range):this.nearestThreat(e.range)!==null}updateWeapon(e,t){const n=Yt[e.defId],s=e.elapsed>=n.interval-kt;if(e.elapsed+=t,!(e.elapsed<n.interval-kt)){if(!this.hasTarget(n)){e.elapsed=n.interval;return}e.elapsed=s?0:Math.min(Math.max(0,e.elapsed-n.interval),t),e.shots++,this.fire(e,n)}}damage(e,t,n){e.alive&&(e.hp-=t,this.totalDamageDealt+=t,this.events.push({type:"damaged",t:this.simTime,enemyId:e.id,amount:t,hp:Math.max(0,e.hp),source:n,x:e.x,z:e.z}),e.hp<=1e-6&&(e.hp=0,e.alive=!1,this.kills++,this.events.push({type:"died",t:this.simTime,enemyId:e.id,kind:e.kind,x:e.x,z:e.z})))}fire(e,t){const n=this.damageMultiplier,s={type:"fired",t:this.simTime,weaponId:e.id,defId:t.id,slot:e.slot};switch(t.pattern){case"projectile":{const r=this.nearestThreat(t.range);this.projectiles.push({id:this.nextProjectileId++,weaponId:e.id,x:0,z:0,prevX:0,prevZ:0,targetId:r.id,damage:t.damage*n,speed:t.projectileSpeed??18,life:t.projectileLife??2,retargeted:!1,bornAt:this.simTime}),this.events.push({...s,targets:[r.id],points:[{x:r.x,z:r.z}]});break}case"lance":{const r=this.nearestThreat(t.range),a={x:r.x,z:r.z};this.events.push({...s,targets:[r.id],points:[a]}),this.damage(r,t.damage*n,t.id);break}case"chain":{const r=t.chainDamage??[t.damage],a=new Set,o=[],l=[];let c=this.nearestThreat(t.range);const h=[];for(let d=0;d<r.length&&c;d++)a.add(c.id),o.push(c.id),l.push({x:c.x,z:c.z}),h.push({e:c,dmg:r[d]*n}),c=this.nearestTo(c.x,c.z,t.chainHopRange??2.8,a);this.events.push({...s,targets:o,points:l});for(const d of h)this.damage(d.e,d.dmg,t.id);break}case"pulse":{const r=t.pulseRadius??t.range,a=this.enemies.filter(o=>o.alive&&Math.hypot(o.x,o.z)<=r+kt).sort((o,l)=>o.id-l.id);this.events.push({...s,targets:a.map(o=>o.id),points:[]});for(const o of a)this.damage(o,t.damage*n,t.id);break}}}updateProjectiles(e){if(this.projectiles.length===0)return;const t=[];for(const n of this.projectiles){let s=this.enemies.find(c=>c.id===n.targetId&&c.alive);if(!s&&(n.retargeted||(n.retargeted=!0,s=this.nearestTo(n.x,n.z,1/0,new Set)??void 0,s&&Math.hypot(s.x,s.z)>Yt.needle.range+kt&&(s=void 0),s&&(n.targetId=s.id)),!s)){this.events.push({type:"projectileExpired",t:this.simTime,projectileId:n.id,x:n.x,z:n.z});continue}const r=s.x-n.x,a=s.z-n.z,o=Math.hypot(r,a),l=n.speed*e;if(o<=l+s.radius*.5){n.x=s.x,n.z=s.z,this.damage(s,n.damage,"needle");continue}if(n.x+=r/o*l,n.z+=a/o*l,n.life-=e,n.life<=0){this.events.push({type:"projectileExpired",t:this.simTime,projectileId:n.id,x:n.x,z:n.z});continue}t.push(n)}this.projectiles=t}}function Zv(i,e){const t=Object.entries(e).filter(([,r])=>r>0),n=t.reduce((r,[,a])=>r+a,0);let s=i.next()*n;for(const[r,a]of t)if(s-=a,s<0)return r;return t[t.length-1][0]}function Yo(i){const e=Yt[i.defId];return Math.min(1,Math.max(0,i.elapsed/e.interval))}class Jv{phase="TITLE";sim;deck;turn=null;suspended=!1;pausedFrom=null;pauseReason=null;seed;transitions=0;offerRng;listeners=new Set;trials;startingDeck;constructor(e,t={}){this.trials=t.trials??wl,this.startingDeck=t.deck??Wv,this.seed=e,this.sim=new $c({seed:e,trials:this.trials}),this.deck=new Yc(this.startingDeck,Os(e,"deck")),this.offerRng=Os(e,"offers")}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(e){for(const t of this.listeners)t(e)}setPhase(e){if(e===this.phase)return;const t=this.phase;this.phase=e,this.transitions++,this.emit({type:"phase",from:t,to:e})}isRunning(){return(this.phase==="COMBAT"||this.phase==="CLEARING")&&!this.suspended}startRun(e){this.seed=e,this.sim=new $c({seed:e,trials:this.trials}),this.deck=new Yc(this.startingDeck,Os(e,"deck")),this.offerRng=Os(e,"offers"),this.turn=null,this.suspended=!1,this.pausedFrom=null,this.pauseReason=null,this.emit({type:"runStarted",seed:e}),this.openTurn(0)}handleOutcome(e){switch(e){case"continue":return;case"defeat":this.turn=null,this.setPhase("DEFEAT");return;case"victory":this.setPhase("VICTORY");return;case"clearingStarted":this.setPhase("CLEARING");return;case"boundary":this.openTurn(this.sim.trialIndex+1);return}}openTurn(e){this.sim.resetWaveModifiers(),this.turn={turnIndex:e,energy:Ci.energyPerTurn,stage:"idle",selected:null,pendingSlot:null,marked:[],purgesLeft:Ci.purgesPerTurn,offers:null};const t=e===0?this.deck.drawOpening(Ci.handDraw):this.deck.draw(Ci.handDraw);this.setPhase("TURN"),this.emit({type:"turnStarted",turnIndex:e,drawn:t})}nextWaveForecast(){const e=this.turn,t=!e||e.turnIndex===0?this.sim.trialIndex:Math.min(this.sim.trialIndex+1,this.trials.length-1);return this.trials[t].forecast}nextWaveIndex(){const e=this.turn;return!e||e.turnIndex===0?this.sim.trialIndex:Math.min(this.sim.trialIndex+1,this.trials.length-1)}active(){return this.phase==="TURN"&&!this.suspended?this.turn:null}cardCost(e){const t=this.deck.inHand(e);return t?an(t.defId).cost:1/0}canAfford(e){const t=this.turn;return!!t&&this.cardCost(e)<=t.energy}needsTarget(e){const t=this.deck.inHand(e);return t?Yn(t.defId)||an(t.defId).target==="tower":!1}validTarget(e,t){const n=this.deck.inHand(e);return!n||t<0||t>=Pn||this.sim.locked[t]?!1:Yn(n.defId)?!0:an(n.defId).target==="tower"&&!!this.sim.slots[t]}select(e){const t=this.active();return!t||t.stage!=="idle"&&t.stage!=="targeting"||e!==null&&(!this.deck.inHand(e)||!this.needsTarget(e))?!1:(t.selected=e,t.stage=e===null?"idle":"targeting",this.emit({type:"selection",uid:e}),!0)}playCard(e,t){const n=this.active();if(!n||n.stage!=="idle"&&n.stage!=="targeting")return"invalid";const s=this.deck.inHand(e);if(!s)return"invalid";const r=an(s.defId);if(r.cost>n.energy)return"noEnergy";if(this.needsTarget(e)){if(t===void 0)return this.select(e),"needsTarget";if(t<0||t>=Pn)return"invalid";if(this.sim.locked[t])return"locked";if(!this.validTarget(e,t))return"invalid";if(r.type==="tower"&&this.sim.slots[t])return n.stage="confirmReplace",n.selected=e,n.pendingSlot=t,"confirm"}return this.commit(n,s,t??null),"played"}confirmReplace(){const e=this.active();if(!e||e.stage!=="confirmReplace"||e.selected===null||e.pendingSlot===null)return!1;const t=this.deck.inHand(e.selected);return!t||an(t.defId).cost>e.energy?!1:(this.commit(e,t,e.pendingSlot),!0)}cancel(){const e=this.turn;!e||e.stage!=="confirmReplace"&&e.stage!=="targeting"||(e.stage="idle",e.selected=null,e.pendingSlot=null,this.emit({type:"selection",uid:null}))}commit(e,t,n){const s=an(t.defId);e.energy-=s.cost,e.stage="idle",e.selected=null,e.pendingSlot=null,e.marked=e.marked.filter(o=>o!==t.uid);let r=null,a=null;if(s.type==="tower")this.deck.takeFromHand(t.uid),a=this.sim.slots[n],r=this.sim.installWeapon(n,s.id);else{this.deck.discardFromHand(t.uid);const o=s.effect;if(o.kind==="heal")this.sim.heal(o.amount);else if(o.kind==="blast")this.sim.pendingBlasts.push({damage:o.damage,radius:o.radius});else if(o.kind==="charge"){const l=this.sim.slots[n];l&&(l.elapsed=Yt[l.defId].interval)}else o.kind==="damageBonus"?this.sim.damageBonus+=o.amount:o.kind==="slow"&&(this.sim.speedFactor=Math.max(.4,this.sim.speedFactor*o.factor))}this.emit({type:"cardPlayed",card:t,slot:n,instance:r,replaced:a})}toggleMark(e){const t=this.active();return!t||t.stage!=="idle"&&t.stage!=="targeting"||!this.deck.inHand(e)?!1:(t.stage==="targeting"&&this.cancel(),t.marked.includes(e)?t.marked=t.marked.filter(n=>n!==e):(t.marked.push(e),t.marked.length>2&&t.marked.shift()),this.emit({type:"marked",uids:[...t.marked]}),!0)}clearMarks(){const e=this.turn;!e||e.marked.length===0||(e.marked=[],this.emit({type:"marked",uids:[]}))}sacrifice(){const e=this.active();if(!e||e.stage!=="idle"||e.marked.length!==2)return!1;const t=e.marked.map(n=>this.deck.takeFromHand(n)).filter(n=>!!n);return t.length!==2?!1:(e.marked=[],e.offers=Yv(this.offerRng,t[0].defId,t[1].defId),e.stage="sacrificeChoice",this.emit({type:"sacrificed",cards:t,offers:[...e.offers]}),this.emit({type:"marked",uids:[]}),!0)}chooseOffer(e){const t=this.active();if(!t||t.stage!=="sacrificeChoice"||!t.offers||e<0||e>=t.offers.length)return!1;const n=this.deck.addToHand(t.offers[e]);return t.offers=null,t.stage="idle",this.emit({type:"offerChosen",card:n}),!0}purge(){const e=this.active();if(!e||e.stage!=="idle"||e.marked.length!==1||e.purgesLeft<=0)return!1;const t=this.deck.takeFromHand(e.marked[0]);return t?(e.marked=[],e.purgesLeft--,this.emit({type:"purged",card:t}),this.emit({type:"marked",uids:[]}),!0):!1}canEndTurn(){const e=this.turn;return this.phase==="TURN"&&!this.suspended&&!!e&&e.stage!=="sacrificeChoice"&&e.stage!=="confirmReplace"}endTurn(){if(!this.canEndTurn())return!1;const e=this.turn,t=this.deck.discardHand();return this.emit({type:"handDiscarded",cards:t}),e.turnIndex>0&&this.sim.beginNextTrial(),this.turn=null,this.setPhase("COMBAT"),!0}pause(){return this.phase!=="COMBAT"&&this.phase!=="CLEARING"?!1:(this.pausedFrom=this.phase,this.pauseReason="manual",this.setPhase("PAUSED"),!0)}resume(){if(this.suspended)return this.suspended=!1,this.emit({type:"suspended",value:!1}),!0;if(this.phase!=="PAUSED"||!this.pausedFrom)return!1;const e=this.pausedFrom;return this.pausedFrom=null,this.pauseReason=null,this.setPhase(e),!0}suspend(){this.phase==="COMBAT"||this.phase==="CLEARING"?(this.pausedFrom=this.phase,this.pauseReason="suspended",this.setPhase("PAUSED")):this.phase==="TURN"&&!this.suspended&&(this.suspended=!0,this.emit({type:"suspended",value:!0}))}}const Qv=14;class jv{ctx=null;master=null;combatBus=null;uiBus=null;noise=null;voices=new Set;lastPlayed=new Map;muted=!1;volume=.7;unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-16,t.ratio.value=4,this.master=this.ctx.createGain(),this.combatBus=this.ctx.createGain(),this.uiBus=this.ctx.createGain(),this.combatBus.connect(this.master),this.uiBus.connect(this.master),this.master.connect(t),t.connect(this.ctx.destination);const n=this.ctx.sampleRate*1;this.noise=this.ctx.createBuffer(1,n,this.ctx.sampleRate);const s=this.noise.getChannelData(0);let r=12345;for(let a=0;a<n;a++)r=r*1664525+1013904223>>>0,s[a]=r/4294967296*2-1;this.applyVolume()}this.ctx.state==="suspended"&&this.ctx.resume()}get ready(){return!!this.ctx}get activeVoices(){return this.voices.size}setMuted(e){this.muted=e,this.applyVolume()}setVolume(e){this.volume=e,this.applyVolume()}applyVolume(){!this.ctx||!this.master||this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.02)}setCombatActive(e){!this.ctx||!this.combatBus||this.combatBus.gain.setTargetAtTime(e?1:1e-4,this.ctx.currentTime,e?.05:.08)}stopAll(){for(const e of this.voices)try{e.stop()}catch{}this.voices.clear()}throttle(e,t){if(!this.ctx)return!1;const n=this.ctx.currentTime,s=this.lastPlayed.get(e)??-1;return n-s<t?!1:(this.lastPlayed.set(e,n),!0)}track(e){this.voices.add(e),e.onended=()=>this.voices.delete(e)}canPlay(){return!!this.ctx&&this.voices.size<Qv&&this.ctx.state==="running"}tone(e,t,n={}){if(!this.canPlay())return;const s=this.ctx,r=s.currentTime+(n.delay??0),a=s.createOscillator();a.type=n.type??"sine",a.frequency.setValueAtTime(e,r),n.glide&&a.frequency.exponentialRampToValueAtTime(Math.max(20,e*n.glide),r+t),n.detune&&(a.detune.value=n.detune);const o=s.createGain(),l=n.gain??.2,c=n.attack??.004;o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(l,r+c),o.gain.exponentialRampToValueAtTime(1e-4,r+t);let h=a;if(n.lowpass){const d=s.createBiquadFilter();d.type="lowpass",d.frequency.value=n.lowpass,a.connect(d),h=d}h.connect(o),o.connect(n.bus==="ui"?this.uiBus:this.combatBus),a.start(r),a.stop(r+t+.05),this.track(a)}noiseHit(e,t,n,s,r="combat",a="bandpass",o=0){if(!this.canPlay()||!this.noise)return;const l=this.ctx,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this.noise;const d=l.createBiquadFilter();d.type=a,d.frequency.value=t,d.Q.value=n;const u=l.createGain();u.gain.setValueAtTime(s,c),u.gain.exponentialRampToValueAtTime(1e-4,c+e),h.connect(d),d.connect(u),u.connect(r==="ui"?this.uiBus:this.combatBus),h.start(c,Math.random()*.5),h.stop(c+e+.02),this.track(h)}weapon(e){if(this.throttle(`w-${e}`,.05))switch(e){case"needle":this.tone(2850,.07,{type:"triangle",gain:.09}),this.tone(4200,.04,{type:"sine",gain:.05}),this.noiseHit(.035,6e3,4,.06);break;case"light":this.tone(98,.9,{type:"sine",gain:.32,glide:.82,attack:.006}),this.tone(196,.55,{type:"triangle",gain:.1,glide:.9,lowpass:900}),this.tone(588,.25,{type:"sine",gain:.05}),this.noiseHit(.12,900,1.2,.12);break;case"thread":for(const[t,n]of[[330,-6],[415,4],[494,9]])this.tone(t,.32,{type:"sawtooth",gain:.035,detune:n,lowpass:2400,attack:.01});this.noiseHit(.18,3200,6,.04);break;case"bell":for(const[t,n,s]of[[1,.16,1.6],[2.41,.07,1],[2.98,.05,.8],[4.16,.03,.5]])this.tone(262*t,s,{type:"sine",gain:n,lowpass:2200,attack:.003});break}}enemyDeath(e){if(!this.throttle("death",.06))return;const t=e==="urn"?700:e==="moth"?2600:1500;this.noiseHit(.14,t,2.5,.13),this.tone(t*.7,.09,{type:"triangle",gain:.04,glide:.6})}baseHit(){this.throttle("base",.08)&&(this.tone(70,.4,{type:"sine",gain:.35,glide:.7}),this.tone(311,.3,{type:"triangle",gain:.06,detune:30}),this.tone(330,.3,{type:"triangle",gain:.06}),this.noiseHit(.2,400,1,.15,"combat","lowpass"))}cardHover(){this.throttle("hover",.06)&&this.tone(1800,.05,{type:"sine",gain:.025,bus:"ui"})}cardPick(){this.tone(660,.12,{type:"triangle",gain:.06,bus:"ui"}),this.noiseHit(.06,2500,2,.04,"ui")}cardPlace(){this.tone(180,.18,{type:"sine",gain:.25,bus:"ui",glide:.7}),this.noiseHit(.08,1400,1.5,.12,"ui"),this.tone(880,.4,{type:"sine",gain:.05,bus:"ui",delay:.04}),this.tone(1320,.5,{type:"sine",gain:.03,bus:"ui",delay:.07})}cardReturn(){this.tone(440,.1,{type:"triangle",gain:.04,bus:"ui",glide:.8})}boon(){for(const[e,t]of[[523,0],[659,.08],[784,.16]])this.tone(e,.6,{type:"sine",gain:.07,bus:"ui",delay:t})}phase(e){switch(e){case"draft":this.tone(392,.9,{type:"sine",gain:.08,bus:"ui"}),this.tone(587,.9,{type:"sine",gain:.05,bus:"ui",delay:.1});break;case"resume":case"start":this.tone(294,.5,{type:"triangle",gain:.07,bus:"ui"}),this.tone(440,.6,{type:"sine",gain:.06,bus:"ui",delay:.08});break;case"clearing":this.tone(220,1.2,{type:"sine",gain:.08,bus:"ui"}),this.tone(330,1.2,{type:"sine",gain:.05,bus:"ui",delay:.15});break;case"defeat":for(const[t,n]of[[196,0],[185,.25],[147,.5]])this.tone(t,1.6,{type:"triangle",gain:.08,bus:"ui",delay:n,lowpass:900});break;case"victory":for(const[t,n]of[[392,0],[494,.15],[587,.3],[784,.5],[988,.7]])this.tone(t,1.8,{type:"sine",gain:.07,bus:"ui",delay:n});break}}dispose(){this.stopAll(),this.ctx?.close(),this.ctx=null}}const Zn=2.65,Ln=3.54,vi=.06,Wn=Zn+.1,Xn=Ln+.1,yn=.22,hi=.9,qr=.98,tu=.14,nu=.035,wt=qr+tu+nu,iu=wt-.15,e_=iu+vi/2+.002,Nr=Fn.halfX*2-.3,Ya=Fn.halfZ*2-.3,t_=[-2.95,0,Wn+.2],n_=[-2.09,.27+Xn/2];function Qn(i){if(i<0||i>=Pn)throw new Error("bad slot");return{x:t_[i%3],z:n_[Math.floor(i/3)]}}const Wt={x:0,y:wt+.36,z:0},_t="#1b2234",ta="#e6dec7",su="#d3c8aa",ps="#a88a52",_i="#d5bd84",ms="#3fb3aa",El="#c8604f",Bi="#1b2a48",$o='"Cormorant Garamond", "Iowan Old Style", Georgia, serif',Ps='Inter, "Segoe UI", system-ui, sans-serif',i_=576,s_=768;function cn(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function Jt(i,e){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");return[t,n]}function In(i,e){const t=new Gd(i);return t.colorSpace=Kt,t.anisotropy=e?Math.min(8,e.capabilities.getMaxAnisotropy()):4,t.generateMipmaps=!0,t.minFilter=fi,t.magFilter=Pt,t.needsUpdate=!0,t}function En(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.lineTo(e+n-r,t),i.quadraticCurveTo(e+n,t,e+n,t+r),i.lineTo(e+n,t+s-r),i.quadraticCurveTo(e+n,t+s,e+n-r,t+s),i.lineTo(e+r,t+s),i.quadraticCurveTo(e,t+s,e,t+s-r),i.lineTo(e,t+r),i.quadraticCurveTo(e,t,e+r,t),i.closePath()}function rr(i,e,t,n,s,r){const[a,o,l,c]=r,h=a+l/2,d=o+c/2,u=Math.hypot(l,c)/2+t;i.save(),i.clip(),i.translate(h,d),i.rotate(e),i.strokeStyle=s,i.lineWidth=n,i.beginPath();for(let f=-u;f<=u;f+=t)i.moveTo(-u,f),i.lineTo(u,f);i.stroke(),i.restore()}function ir(i,e,t,n,s,r=1.5){i.save(),i.translate(e,t),i.strokeStyle=s,i.fillStyle=s,i.lineWidth=r,i.beginPath(),i.arc(0,0,n*.42,0,Math.PI*2),i.stroke(),i.beginPath(),i.arc(0,0,n*.12,0,Math.PI*2),i.fill();for(let a=0;a<4;a++)i.rotate(Math.PI/2),i.beginPath(),i.moveTo(-n*.06,-n*.5),i.lineTo(0,-n),i.lineTo(n*.06,-n*.5),i.closePath(),i.fill();i.restore()}function ru(i,e,t,n,s,r=1.2){i.save(),i.strokeStyle=s,i.fillStyle=s,i.lineWidth=r,i.beginPath(),i.moveTo(e,t-n),i.lineTo(e+n*.6,t),i.lineTo(e,t+n),i.lineTo(e-n*.6,t),i.closePath(),i.stroke(),i.beginPath(),i.arc(e,t,n*.18,0,Math.PI*2),i.fill(),i.restore()}function r_(i,e,t,n,s=ta){i.fillStyle=s,i.fillRect(0,0,e,t);const r=cn(n);for(let o=0;o<2600;o++){const l=r()*e,c=r()*t,h=2+r()*7,d=r()*Math.PI;i.strokeStyle=r()<.5?"rgba(120,98,60,0.07)":"rgba(255,250,235,0.10)",i.lineWidth=.8,i.beginPath(),i.moveTo(l,c),i.lineTo(l+Math.cos(d)*h,c+Math.sin(d)*h),i.stroke()}for(let o=0;o<9;o++){const l=r()<.5,c=l?r()<.5?r()*60:e-r()*60:r()*e,h=l?r()*t:r()<.5?r()*60:t-r()*60,d=12+r()*34,u=i.createRadialGradient(c,h,0,c,h,d);u.addColorStop(0,"rgba(140,105,55,0.10)"),u.addColorStop(1,"rgba(140,105,55,0)"),i.fillStyle=u,i.fillRect(c-d,h-d,d*2,d*2)}const a=i.createRadialGradient(e/2,t/2,Math.min(e,t)*.3,e/2,t/2,Math.max(e,t)*.75);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,"rgba(70,52,28,0.28)"),i.fillStyle=a,i.fillRect(0,0,e,t)}function a_(i){const e=[[-30,-175],[-8,-110],[-36,-60],[6,-10],[-14,40],[22,95],[4,175]],t=s=>{i.save(),i.translate(s*9,s*4),i.beginPath(),s<0?(i.moveTo(e[0][0],e[0][1]),i.arc(0,0,170,-Math.PI/2-.18,Math.PI/2+.02,!0)):(i.moveTo(e[0][0],e[0][1]),i.arc(0,0,170,-Math.PI/2-.18,Math.PI/2+.02,!1));for(let r=e.length-1;r>=0;r--)i.lineTo(e[r][0],e[r][1]);i.closePath(),i.fillStyle=Bi,i.fill(),i.save(),i.clip(),i.strokeStyle=su,i.lineWidth=10,i.beginPath(),i.arc(0,0,150,0,Math.PI*2),i.stroke(),i.lineWidth=1.4,i.strokeStyle="rgba(230,222,199,0.45)";for(let r=40;r<140;r+=14)i.beginPath(),i.arc(0,0,r,0,Math.PI*2),i.stroke();i.restore(),rr(i,s<0?.9:-.9,7,1.1,"rgba(0,0,0,0.25)",[-180,-180,360,360]),i.restore()};t(-1),t(1),i.strokeStyle=ms,i.lineWidth=5,i.lineCap="round";for(let s=0;s<6;s++){const r=-135+s*52;i.beginPath(),i.moveTo(-34,r-10),i.lineTo(32,r+12),i.stroke()}i.save(),i.rotate(-.78);const n=250;i.beginPath(),i.moveTo(-n,0),i.lineTo(n-70,-11),i.quadraticCurveTo(n-20,-11,n-18,0),i.quadraticCurveTo(n-20,11,n-70,11),i.closePath(),i.fillStyle=_i,i.fill(),i.lineWidth=3,i.strokeStyle=_t,i.stroke(),i.beginPath(),i.ellipse(n-52,0,16,4.5,0,0,Math.PI*2),i.fillStyle=_t,i.fill(),i.beginPath(),i.moveTo(-n,0),i.lineTo(-n+60,-7),i.lineTo(-n+60,7),i.closePath(),i.fillStyle=_t,i.fill(),i.strokeStyle="rgba(27,34,52,0.4)",i.lineWidth=1;for(let s=-n+70;s<n-80;s+=9)i.beginPath(),i.moveTo(s,4),i.lineTo(s+5,9),i.stroke();i.restore(),i.strokeStyle=ms,i.lineWidth=3,i.beginPath(),i.moveTo(140,-150),i.bezierCurveTo(200,-120,120,-40,175,10),i.stroke()}function o_(i){i.beginPath(),i.arc(0,0,178,0,Math.PI*2),i.fillStyle=Bi,i.fill(),i.save();for(let t=0;t<24;t++){i.rotate(Math.PI*2/24);const n=t%2===0;i.beginPath(),i.moveTo(-9,-70),i.lineTo(0,n?-168:-128),i.lineTo(9,-70),i.closePath(),i.fillStyle=n?_i:"rgba(213,189,132,0.7)",i.fill()}i.restore();const e=i.createRadialGradient(-15,-15,10,0,0,72);e.addColorStop(0,"#fbf3dc"),e.addColorStop(1,"#d9c088"),i.beginPath(),i.arc(0,0,70,0,Math.PI*2),i.fillStyle=e,i.fill(),i.lineWidth=3,i.strokeStyle=_t,i.stroke(),i.beginPath(),i.moveTo(-82,-40),i.lineTo(-30,-18),i.lineTo(-12,8),i.lineTo(18,2),i.lineTo(40,30),i.lineTo(86,44),i.lineWidth=6,i.strokeStyle=_t,i.stroke(),i.lineWidth=2,i.strokeStyle=El,i.stroke();for(const[t,n]of[[182,14],[150,7]])i.beginPath(),i.arc(0,0,t,0,Math.PI*2),i.lineWidth=n+4,i.strokeStyle=_t,i.stroke(),i.lineWidth=n,i.strokeStyle=ps,i.stroke();i.strokeStyle=_t,i.lineWidth=2;for(let t=0;t<48;t++){const n=t/48*Math.PI*2,s=t%4===0?160:165;i.beginPath(),i.moveTo(Math.cos(n)*s,Math.sin(n)*s),i.lineTo(Math.cos(n)*172,Math.sin(n)*172),i.stroke()}i.beginPath(),i.arc(0,0,182,-2.5,-1.9),i.lineWidth=4,i.strokeStyle="#fff6df",i.stroke()}function Kc(i,e,t,n,s){i.save(),i.translate(e,t),i.rotate(n),i.scale(s,1),i.beginPath(),i.moveTo(0,-105),i.bezierCurveTo(70,-105,82,-20,66,30),i.bezierCurveTo(52,80,22,110,0,112),i.bezierCurveTo(-22,110,-52,80,-66,30),i.bezierCurveTo(-82,-20,-70,-105,0,-105),i.closePath(),i.fillStyle=Bi,i.fill(),i.lineWidth=4,i.strokeStyle=_t,i.stroke(),i.save(),rr(i,.5,6,1.1,"rgba(230,222,199,0.18)",[-90,-110,180,230]),i.restore(),i.fillStyle=ta;for(const r of[-1,1])i.beginPath(),i.ellipse(r*30,-18,20,10,r*-.25,0,Math.PI*2),i.fill();i.fillStyle=_t;for(const r of[-1,1])i.beginPath(),i.ellipse(r*30,-16,7,7,0,0,Math.PI*2),i.fill();i.strokeStyle=ta,i.lineWidth=4,i.beginPath(),i.moveTo(-22,58),i.quadraticCurveTo(0,66,22,58),i.stroke(),ir(i,0,-66,15,_i,2),i.restore()}function l_(i){i.lineCap="round";const e=[[-60,-40,60,-40,-80],[-60,20,60,20,30],[-60,70,60,70,120]];for(const[t,n,s,r,a]of e)i.strokeStyle=_t,i.lineWidth=6,i.beginPath(),i.moveTo(t,n),i.quadraticCurveTo(0,a,s,r),i.stroke(),i.strokeStyle=ms,i.lineWidth=3,i.stroke();Kc(i,-88,0,-.22,1),Kc(i,88,0,.22,-1);for(const[t,n]of[[-50,-38],[50,-38],[-50,22],[50,22],[-48,70],[48,70]])i.beginPath(),i.arc(t,n,5,0,Math.PI*2),i.fillStyle=_i,i.fill(),i.lineWidth=1.5,i.strokeStyle=_t,i.stroke()}function c_(i){i.save(),i.translate(0,112);for(let t=0;t<5;t++)i.beginPath(),i.ellipse(0,0,40+t*34,9+t*8.5,0,0,Math.PI*2),i.lineWidth=t===0?4:3,i.strokeStyle=t%2===0?_t:ms,i.stroke();i.restore(),i.beginPath(),i.moveTo(0,46),i.quadraticCurveTo(12,72,0,80),i.quadraticCurveTo(-12,72,0,46),i.fillStyle=ms,i.fill(),i.save(),i.translate(0,-40),i.beginPath(),i.moveTo(-125,-95),i.bezierCurveTo(-110,-70,-70,-40,-64,0),i.bezierCurveTo(-60,40,-38,62,0,64),i.bezierCurveTo(38,62,60,40,64,0),i.bezierCurveTo(70,-40,110,-70,125,-95),i.closePath(),i.fillStyle="#5a4524",i.fill(),i.save(),i.clip();const e=i.createLinearGradient(-125,0,125,0);e.addColorStop(0,"rgba(0,0,0,0.35)"),e.addColorStop(.35,"rgba(213,189,132,0.55)"),e.addColorStop(.55,"rgba(255,240,200,0.25)"),e.addColorStop(1,"rgba(0,0,0,0.45)"),i.fillStyle=e,i.fillRect(-130,-100,260,170),rr(i,0,7,1.2,"rgba(27,34,52,0.35)",[-130,-100,260,170]),i.strokeStyle=_i,i.lineWidth=4;for(const t of[-58,-30,22])i.beginPath(),i.moveTo(-130,t),i.lineTo(130,t),i.stroke();for(let t=-3;t<=3;t++)ru(i,t*22,-44,8,_i,1.6);i.restore(),i.lineWidth=4,i.strokeStyle=_t,i.stroke(),i.beginPath(),i.ellipse(0,-95,125,20,0,0,Math.PI*2),i.fillStyle="#2a2014",i.fill(),i.lineWidth=6,i.strokeStyle=_i,i.stroke(),i.beginPath(),i.arc(0,78,14,0,Math.PI*2),i.lineWidth=6,i.strokeStyle=_t,i.stroke(),i.restore()}function h_(i){i.save(),i.rotate(-.35),i.beginPath(),i.roundRect(-16,80,32,120,10),i.fillStyle=ps,i.fill(),i.lineWidth=3,i.strokeStyle=_t,i.stroke(),i.beginPath(),i.ellipse(0,-30,105,125,0,0,Math.PI*2),i.fillStyle=ps,i.fill(),i.stroke(),i.beginPath(),i.ellipse(0,-30,88,108,0,0,Math.PI*2);const e=i.createLinearGradient(-80,-130,80,80);e.addColorStop(0,"#9fd9d3"),e.addColorStop(.5,Bi),e.addColorStop(1,"#0f1626"),i.fillStyle=e,i.fill(),i.stroke(),i.restore(),i.fillStyle="#fff7e2",i.save(),i.translate(-30,-70);for(let t=0;t<4;t++)i.rotate(Math.PI/4),i.beginPath(),i.moveTo(-5,0),i.lineTo(0,t%2?-40:-70),i.lineTo(5,0),i.lineTo(0,t%2?40:70),i.closePath(),i.fill();i.restore()}function u_(i){i.beginPath(),i.moveTo(-40,-150),i.lineTo(40,-150),i.bezierCurveTo(40,-110,30,-95,50,-70),i.bezierCurveTo(130,0,120,110,60,150),i.lineTo(-60,150),i.bezierCurveTo(-120,110,-130,0,-50,-70),i.bezierCurveTo(-30,-95,-40,-110,-40,-150),i.closePath(),i.fillStyle=Bi,i.fill(),i.lineWidth=4,i.strokeStyle=_t,i.stroke(),i.save(),i.clip(),rr(i,.7,7,1.1,"rgba(230,222,199,0.16)",[-130,-150,260,300]),i.strokeStyle="#e6c46e",i.lineWidth=5,i.beginPath(),i.moveTo(-120,-10),i.lineTo(-40,10),i.lineTo(-10,-40),i.lineTo(40,20),i.lineTo(120,0),i.moveTo(-10,-40),i.lineTo(0,-150),i.moveTo(40,20),i.lineTo(20,150),i.stroke(),i.restore()}function d_(i){i.save(),i.translate(-70,-60),i.rotate(-.7),i.beginPath(),i.moveTo(-50,-80),i.bezierCurveTo(-90,-40,-95,40,-45,80),i.lineTo(45,80),i.bezierCurveTo(95,40,90,-40,50,-80),i.closePath(),i.fillStyle=Bi,i.fill(),i.lineWidth=6,i.strokeStyle=_t,i.stroke(),i.fillStyle=ps,i.fillRect(-70,-20,140,14),i.fillRect(-60,30,120,10),i.beginPath(),i.ellipse(0,-84,54,14,0,0,Math.PI*2),i.fillStyle="#2a2014",i.fill(),i.stroke(),i.restore();const e=cn(77);for(let t=0;t<120;t++){const n=-.2+e()*1.4,s=40+e()*190,r=-10+Math.cos(n)*s,a=-40+Math.sin(n)*s*.9+s*.25;i.beginPath(),i.arc(r,a,2+e()*6,0,Math.PI*2),i.fillStyle=e()<.18?El:e()<.5?"#4a4038":"#8a7c6a",i.fill()}}function f_(i){i.lineWidth=7,i.strokeStyle=_t,i.fillStyle=ps,i.fillRect(-110,-170,220,22),i.strokeRect(-110,-170,220,22),i.fillRect(-110,148,220,22),i.strokeRect(-110,148,220,22),i.beginPath(),i.moveTo(-85,-148),i.bezierCurveTo(-85,-40,-14,-20,-14,0),i.bezierCurveTo(-14,20,-85,40,-85,148),i.lineTo(85,148),i.bezierCurveTo(85,40,14,20,14,0),i.bezierCurveTo(14,-20,85,-40,85,-148),i.closePath(),i.fillStyle="rgba(160,200,195,0.35)",i.fill(),i.stroke(),i.beginPath(),i.moveTo(-70,-120),i.lineTo(70,-120),i.lineTo(10,-20),i.lineTo(-10,-20),i.closePath(),i.fillStyle="#b89a5a",i.fill();const e=cn(5);for(let t=0;t<26;t++)i.beginPath(),i.arc((e()-.5)*40,10+t*4.5,3.5,0,Math.PI*2),i.fillStyle=ms,i.fill();for(const t of[-120,120])i.beginPath(),i.moveTo(t,-148),i.lineTo(t,148),i.lineWidth=10,i.strokeStyle=_t,i.stroke()}function p_(i){i.beginPath(),i.moveTo(-120,60),i.lineTo(-80,-90),i.lineTo(80,-90),i.lineTo(120,60),i.closePath(),i.fillStyle="#2b2b30",i.fill(),i.lineWidth=7,i.strokeStyle=_t,i.stroke(),i.save(),i.clip(),rr(i,.8,9,1.4,"rgba(230,222,199,0.18)",[-130,-100,260,170]),i.restore(),i.beginPath(),i.arc(0,-120,34,Math.PI,0),i.lineWidth=14,i.strokeStyle=_t,i.stroke(),i.fillStyle=ta,i.font=`700 46px ${$o}`,i.textAlign="center",i.textBaseline="middle",i.fillText("XX",0,-10),i.beginPath(),i.moveTo(-160,90),i.quadraticCurveTo(0,60,170,92),i.quadraticCurveTo(0,112,-160,90),i.fillStyle=su,i.fill(),i.lineWidth=3,i.strokeStyle=_t,i.stroke();for(let e=-140;e<160;e+=14)i.beginPath(),i.moveTo(e,92),i.lineTo(e+10,80+e/14%2*6),i.stroke();i.strokeStyle=El,i.lineWidth=5;for(const e of[-150,150])i.beginPath(),i.moveTo(e,-80),i.lineTo(e,20),i.lineTo(e-12,6),i.moveTo(e,20),i.lineTo(e+12,6),i.stroke()}const m_={needle:a_,light:o_,thread:l_,bell:c_,polish:h_,mend:u_,ash:d_,quicken:f_,heavy:p_},g_={tower:{frame:"#2f3d55",band:"#1d2638",text:"#d9d2bf",label:"TOWER"},active:{frame:"#5c2b28",band:"#3a1916",text:"#e2d4c0",label:"ACTIVE"},passive:{frame:"#54402a",band:"#33261a",text:"#e0d3bb",label:"PASSIVE"}};function v_(i,e,t){const n=e.split(" "),s=[];let r="";for(const a of n){const o=r?`${r} ${a}`:a;i.measureText(o).width>t&&r?(s.push(r),r=a):r=o}return r&&s.push(r),s}function __(i,e,t,n,s){const r=cn(n);i.fillStyle=s;for(let a=0;a<70;a++){const o=r()*4,l=r(),c=2+r()*7,h=o<1?l*e:o<2?e-r()*4:o<3?l*e:r()*4,d=o<1?r()*4:o<2?l*t:o<3?t-r()*4:l*t;i.beginPath(),i.arc(h,d,c,0,Math.PI*2),i.fill()}}function au(i,e,t=9){const n=i.getContext("2d"),s=n.getImageData(0,0,i.width,i.height),r=s.data,a=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],o=cn(e),l=255/(t-1);for(let c=0;c<i.height;c++)for(let h=0;h<i.width;h++){const d=(c*i.width+h)*4;if(r[d+3]===0)continue;const u=(a[(c&3)*4+(h&3)]/16-.5)*l,f=(o()-.5)*14;for(let m=0;m<3;m++){const x=r[d+m]+u+f;r[d+m]=Math.max(0,Math.min(255,Math.round(x/l)*l))}}n.putImageData(s,0,0)}function x_(i){const e=i_,t=s_,[n,s]=Jt(e,t),r=an(i),a=g_[r.type],o=i.charCodeAt(0)*31+i.length*7;s.fillStyle=a.frame,s.fillRect(0,0,e,t);const l=cn(o);for(let x=0;x<1800;x++)s.fillStyle=l()<.5?"rgba(0,0,0,0.12)":"rgba(255,240,210,0.05)",s.fillRect(l()*e,l()*t,1+l()*4,1+l()*3);s.lineWidth=6,s.strokeStyle="rgba(10,8,6,0.75)",En(s,22,22,e-44,t-44,18),s.stroke(),s.fillStyle=a.band,En(s,34,34,e-68,96,12),s.fill(),s.fillStyle=a.text,s.textAlign="center",s.textBaseline="middle";let c=54;for(s.font=`700 ${c}px ${$o}`;s.measureText(r.name).width>e-220&&c>36;)c-=2,s.font=`700 ${c}px ${$o}`;s.fillText(r.name,e/2+34,84),s.beginPath(),s.arc(86,84,42,0,Math.PI*2),s.fillStyle="#1a120c",s.fill(),s.lineWidth=5,s.strokeStyle="#b09060",s.stroke(),s.fillStyle="#f0dcae",s.font=`800 54px ${Ps}`,s.fillText(String(r.cost),86,87);const h=46,d=144,u=e-92,f=392;s.save(),En(s,h,d,u,f,10),s.clip(),r_(s,e,t,o+3,"#cfc3a2"),s.translate(e/2,d+f/2),s.scale(.86,.86),m_[i](s),s.restore(),s.lineWidth=5,s.strokeStyle="#120d09",En(s,h,d,u,f,10),s.stroke();const m=d+f+14;if(s.fillStyle=a.band,En(s,34,m,e-68,t-m-34,12),s.fill(),s.fillStyle=a.text,s.textAlign="center",s.textBaseline="alphabetic",r.type==="tower"){const x=Yt[r.id],p={projectile:"SINGLE",lance:"HEAVY",chain:"CHAIN ×3",pulse:"RING"}[x.pattern];s.font=`700 40px ${Ps}`,s.fillText(`${x.damage} DMG · ${x.interval.toFixed(1)}s`,e/2,m+62),s.font=`600 30px ${Ps}`,s.fillText(`RANGE ${x.range} · ${p}`,e/2,m+108)}else s.font=`600 28px ${Ps}`,v_(s,r.summary,e-120).slice(0,4).forEach((p,g)=>s.fillText(p,e/2,m+48+g*36));return s.font=`800 22px ${Ps}`,s.globalAlpha=.75,s.fillText(a.label,e/2,t-50),s.globalAlpha=1,__(s,e,t,o+9,"rgba(255,240,210,0.07)"),au(n,o+11),n}function M_(){const[t,n]=Jt(288,384);n.fillStyle=Bi,n.fillRect(0,0,288,384),n.strokeStyle=ps,n.lineWidth=6,En(n,10,10,268,364,14),n.stroke(),n.lineWidth=1.2;for(let s=20;s<130;s+=12)n.beginPath(),n.arc(288/2,384/2,s,0,Math.PI*2),n.strokeStyle=s%24===0?"rgba(213,189,132,0.5)":"rgba(105,218,208,0.2)",n.stroke();return ir(n,288/2,384/2,46,_i,2.5),t}function S_(){const[i,e]=Jt(768,216);e.clearRect(0,0,768,216);const t=e.createLinearGradient(0,0,0,216);t.addColorStop(0,"#dcc48f"),t.addColorStop(.5,"#b59a63"),t.addColorStop(1,"#7e6438"),e.fillStyle=t,En(e,8,8,752,200,100),e.fill(),e.strokeStyle="rgba(40,28,10,0.8)",e.lineWidth=4,En(e,22,22,724,172,86),e.stroke(),ir(e,110,108,52,"rgba(40,28,10,0.85)",3),ir(e,658,108,52,"rgba(40,28,10,0.85)",3);for(let n=0;n<7;n++)ru(e,234+n*50,108,22,"rgba(40,28,10,0.75)",3);return e.beginPath(),e.ellipse(384,108,30,30,0,0,Math.PI*2),e.fillStyle="#1b2a48",e.fill(),e.strokeStyle="rgba(40,28,10,0.9)",e.stroke(),i}function y_(){const[i,e]=Jt(256,340),t=e.createRadialGradient(128,170,20,128,170,200);t.addColorStop(0,"#16203a"),t.addColorStop(1,"#070a14"),e.fillStyle=t,e.fillRect(0,0,256,340),e.strokeStyle="rgba(105,218,208,0.18)",e.lineWidth=2;for(let r=30;r<110;r+=18)e.beginPath(),e.arc(128,170,r,0,Math.PI*2),e.stroke();ir(e,128,170,34,"rgba(105,218,208,0.35)",2);const n=e.createLinearGradient(0,0,256,0);n.addColorStop(0,"rgba(0,0,0,0.6)"),n.addColorStop(.15,"rgba(0,0,0,0)"),n.addColorStop(.85,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,0.6)"),e.fillStyle=n,e.fillRect(0,0,256,340);const s=e.createLinearGradient(0,0,0,340);return s.addColorStop(0,"rgba(0,0,0,0.6)"),s.addColorStop(.12,"rgba(0,0,0,0)"),s.addColorStop(.88,"rgba(0,0,0,0)"),s.addColorStop(1,"rgba(0,0,0,0.6)"),e.fillStyle=s,e.fillRect(0,0,256,340),i}function b_(){const[i,e]=Jt(512,512);e.fillStyle="#b59a63",e.fillRect(0,0,512,512);const t=cn(19);for(let n=0;n<2500;n++){e.strokeStyle=t()<.5?"rgba(255,240,200,0.12)":"rgba(60,40,10,0.12)";const s=t()*512,r=t()*512;e.beginPath(),e.moveTo(r,s),e.lineTo(r+30+t()*80,s),e.stroke()}for(let n=0;n<12;n++){const s=t()*512,r=t()*512,a=30+t()*70,o=e.createRadialGradient(s,r,0,s,r,a);o.addColorStop(0,"rgba(70,50,20,0.18)"),o.addColorStop(1,"rgba(70,50,20,0)"),e.fillStyle=o,e.fillRect(s-a,r-a,a*2,a*2)}return i}function T_(){const[i,e]=Jt(256,256);e.clearRect(0,0,256,256);const t=e.createLinearGradient(0,256,256,0);t.addColorStop(0,"#cfc4a6"),t.addColorStop(1,"#efe7d2"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(27,34,52,0.55)",e.lineWidth=2;for(let n=0;n<7;n++){const s=.15+n*.2;e.beginPath(),e.moveTo(0,256),e.quadraticCurveTo(Math.cos(s)*140,256-Math.sin(s)*90,Math.cos(s)*260,256-Math.sin(s)*260),e.stroke()}return e.beginPath(),e.arc(150,110,30,0,Math.PI*2),e.fillStyle="#1b2234",e.fill(),e.beginPath(),e.arc(150,110,18,0,Math.PI*2),e.fillStyle="#69dad0",e.fill(),e.beginPath(),e.arc(150,110,7,0,Math.PI*2),e.fillStyle="#1b2234",e.fill(),e.strokeStyle="rgba(27,34,52,0.8)",e.lineWidth=8,e.beginPath(),e.arc(0,256,245,-Math.PI/2,0),e.stroke(),i}function ca(i,e,t=128){const[n,s]=Jt(t,t),r=s.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);return r.addColorStop(0,i),r.addColorStop(1,e),s.fillStyle=r,s.fillRect(0,0,t,t),n}function w_(i=2048){const[e,t]=Jt(i,i),n=cn(4242),s=6,r=i/s;for(let a=0;a<s;a++){const o=a*r,l=.75+n()*.35,c=[Math.round(58*l),Math.round(38*l),Math.round(24*l)];t.fillStyle=`rgb(${c[0]},${c[1]},${c[2]})`,t.fillRect(0,o,i,r);for(let h=0;h<70;h++){const d=o+n()*r,u=2+n()*8,f=.002+n()*.006,m=n()*10;t.strokeStyle=n()<.6?`rgba(20,10,4,${.12+n()*.22})`:`rgba(150,105,60,${.05+n()*.08})`,t.lineWidth=.8+n()*2.2,t.beginPath();for(let x=0;x<=i;x+=16){const p=d+Math.sin(x*f+m)*u+Math.sin(x*f*3.1+m)*u*.3;x===0?t.moveTo(x,p):t.lineTo(x,p)}t.stroke()}for(let h=0;h<2;h++){const d=n()*i,u=o+r*(.25+n()*.5);for(let f=6;f<34;f+=5)t.beginPath(),t.ellipse(d,u,f*2.4,f*.8,0,0,Math.PI*2),t.strokeStyle=`rgba(15,8,3,${.35-f*.008})`,t.lineWidth=2,t.stroke();t.beginPath(),t.ellipse(d,u,10,4,0,0,Math.PI*2),t.fillStyle="rgba(10,5,2,0.7)",t.fill()}t.fillStyle="rgba(5,2,0,0.85)",t.fillRect(0,o,i,5),t.fillStyle="rgba(120,80,45,0.12)",t.fillRect(0,o+5,i,2);for(const h of[40,i-40])t.beginPath(),t.arc(h,o+r/2,7,0,Math.PI*2),t.fillStyle="#1a1612",t.fill()}for(let a=0;a<260;a++){const o=n()*i,l=n()*i,c=10+n()*60,h=n()*Math.PI;t.strokeStyle=`rgba(170,130,90,${.04+n()*.08})`,t.lineWidth=1,t.beginPath(),t.moveTo(o,l),t.lineTo(o+Math.cos(h)*c,l+Math.sin(h)*c),t.stroke()}for(let a=0;a<14;a++){const o=n()*i,l=n()*i,c=6+n()*18;t.beginPath(),t.ellipse(o,l,c,c*(.6+n()*.5),n()*3,0,Math.PI*2),t.fillStyle=`rgba(200,180,140,${.1+n()*.12})`,t.fill()}return e}function E_(i,e,t=2048){const[n,s]=Jt(t,t);s.clearRect(0,0,t,t);const r=t/2,a=r/(i+1.5);s.translate(r,r);const o=s.createRadialGradient(0,0,0,0,0,i*a);o.addColorStop(0,"rgba(0,0,0,0.05)"),o.addColorStop(.85,"rgba(0,0,0,0.22)"),o.addColorStop(1,"rgba(0,0,0,0.38)"),s.fillStyle=o,s.beginPath(),s.arc(0,0,i*a,0,Math.PI*2),s.fill(),s.strokeStyle="rgba(12,6,2,0.85)",s.lineWidth=9,s.beginPath(),s.arc(0,0,i*a,0,Math.PI*2),s.stroke(),s.lineWidth=3,s.beginPath(),s.arc(0,0,(i-.9)*a,0,Math.PI*2),s.stroke();const l=cn(31),c=72;for(let h=0;h<c;h++){const d=h/c*Math.PI*2,u=(i-.45)*a;s.save(),s.translate(Math.cos(d)*u,Math.sin(d)*u),s.rotate(d+Math.PI/2),s.strokeStyle="rgba(14,7,3,0.8)",s.lineWidth=3,s.beginPath();const f=2+Math.floor(l()*3);for(let m=0;m<f;m++){const x=(l()-.5)*18,p=(l()-.5)*14;s.moveTo(x,p),s.lineTo(x+(l()-.5)*18,p+(l()-.5)*18)}s.stroke(),s.restore()}s.strokeStyle="rgba(200,170,120,0.06)",s.lineWidth=2;for(let h=5;h<i-1;h+=5)s.beginPath(),s.arc(0,0,h*a,0,Math.PI*2),s.stroke();s.fillStyle="rgba(220,190,140,0.14)";for(let h=0;h<260;h++){const d=h/260*Math.PI*2;s.beginPath(),s.arc(Math.cos(d)*e*a,Math.sin(d)*e*a,2.4,0,Math.PI*2),s.fill()}return n}function A_(){const[i,e]=Jt(256,340),t=e.createLinearGradient(0,0,256,340);t.addColorStop(0,"#8a6e3e"),t.addColorStop(.5,"#6e5530"),t.addColorStop(1,"#4a381e"),e.fillStyle=t,e.fillRect(0,0,256,340);const n=cn(8);for(let s=0;s<900;s++){e.strokeStyle=n()<.5?"rgba(255,230,180,0.08)":"rgba(30,20,8,0.12)";const r=n()*340,a=n()*256;e.beginPath(),e.moveTo(a,r),e.lineTo(a+20+n()*40,r),e.stroke()}e.strokeStyle="rgba(25,15,5,0.8)",e.lineWidth=6,En(e,14,14,228,312,14),e.stroke();for(const[s,r]of[[30,30],[226,30],[30,310],[226,310]])e.beginPath(),e.arc(s,r,7,0,Math.PI*2),e.fillStyle="#2a1e10",e.fill();return e.lineWidth=14,e.strokeStyle="#1e150a",e.beginPath(),e.arc(128,150,34,Math.PI,0),e.stroke(),e.fillStyle="#1e150a",En(e,78,150,100,82,10),e.fill(),e.fillStyle="#8a6e3e",e.beginPath(),e.arc(128,182,10,0,Math.PI*2),e.fill(),e.fillRect(124,186,8,22),au(i,99,10),i}function C_(){const[i,e]=Jt(256,256);e.fillStyle="#d8ccb0",e.fillRect(0,0,256,256);const t=cn(66);for(let n=0;n<400;n++){e.strokeStyle=t()<.5?"rgba(90,70,40,0.12)":"rgba(255,250,235,0.12)";const s=t()*256;e.beginPath(),e.moveTo(s,0),e.lineTo(s+(t()-.5)*30,256),e.stroke()}return i}function ou(){const[i,e]=Jt(512,512);e.fillStyle="#2a1a10",e.fillRect(0,0,512,512);const t=cn(91);for(let n=0;n<90;n++){const s=t()*512;e.strokeStyle=t()<.6?`rgba(10,5,2,${.2+t()*.3})`:`rgba(120,80,45,${.06+t()*.08})`,e.lineWidth=1+t()*2,e.beginPath();for(let r=0;r<=512;r+=16){const a=s+Math.sin(r*.01+n)*4;r===0?e.moveTo(r,a):e.lineTo(r,a)}e.stroke()}return i}function R_(){const[i,e]=Jt(128,128);e.fillStyle="#cbbd9c",e.fillRect(0,0,128,128),e.fillStyle="#2a1a10";for(const[t,n]of[[32,32],[96,32],[64,64],[32,96],[96,96]])e.beginPath(),e.arc(t,n,10,0,Math.PI*2),e.fill();return i}const Vt=(i,e)=>new Ee(i).multiplyScalar(e),Zc=Vt(14191194,2),zt={needle:Vt(6937296,3),light:Vt(15982510,3),thread:Vt(8366335,3.2),bell:Vt(15245434,2.6)},P_=`
attribute float aAlong;
attribute float aSide;
varying float vAlong;
varying float vSide;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,L_=`
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
}`,wi=32;class I_{mesh;mat;geo;pos;active=!1;born=0;life=.3;width=.1;points=[];color=new Ee;revealTime=.04;flicker=0;presentation=!1;constructor(e){this.geo=new vt,this.pos=new Float32Array(wi*2*3);const t=new Float32Array(wi*2),n=new Float32Array(wi*2),s=[];for(let r=0;r<wi;r++)if(n[r*2]=-1,n[r*2+1]=1,r<wi-1){const a=r*2;s.push(a,a+1,a+2,a+1,a+3,a+2)}this.geo.setAttribute("position",new Lt(this.pos,3).setUsage(mi)),this.geo.setAttribute("aAlong",new Lt(t,1).setUsage(mi)),this.geo.setAttribute("aSide",new Lt(n,1)),this.geo.setIndex(s),this.geo.boundingSphere=new ti(new C,30),this.mat=new Tt({vertexShader:P_,fragmentShader:L_,uniforms:{uColor:{value:new Ee},uAlpha:{value:0},uHead:{value:1}},transparent:!0,depthWrite:!1,blending:An,premultipliedAlpha:!0}),this.mesh=new Ie(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=6,e.add(this.mesh)}build(e){const t=Math.min(this.points.length,wi),n=this.geo.attributes.aAlong;let s=0;const r=[0];for(let l=1;l<t;l++)s+=this.points[l].distanceTo(this.points[l-1]),r.push(s);const a=new C,o=new C;for(let l=0;l<wi;l++){const c=Math.min(l,t-1),h=this.points[c],d=this.points[Math.max(0,c-1)],u=this.points[Math.min(t-1,c+1)];a.subVectors(u,d).normalize(),o.crossVectors(a,e).normalize();const f=.55+.45*Math.sin(r[c]/Math.max(s,1e-4)*Math.PI),m=this.width*f;this.pos.set([h.x-o.x*m,h.y-o.y*m,h.z-o.z*m],l*6),this.pos.set([h.x+o.x*m,h.y+o.y*m,h.z+o.z*m],l*6+3);const x=s>0?r[c]/s:0;n.setX(l*2,x),n.setX(l*2+1,x)}this.geo.attributes.position.needsUpdate=!0,n.needsUpdate=!0,this.geo.setDrawRange(0,Math.max(0,(t-1)*6))}}const D_=`
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
}`,U_=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,N_=`
attribute float aSize;
attribute vec4 aColor;
varying vec4 vColor;
uniform float uScale;
void main() {
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale;
}`,F_=`
varying vec4 vColor;
uniform float uAlphaMul;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  float a = (1.0 - d) * vColor.a * uAlphaMul;
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vColor.rgb * a, a);
}`;class Jc{points;mat;geo;pos;col;size;vel;born;life;baseSize;gravity;rgb;alive;cursor=0;budget;capacity;liveCount=0;constructor(e,t,n){this.capacity=t,this.budget=t,this.geo=new vt,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.size=new Float32Array(t),this.vel=new Float32Array(t*3),this.born=new Float32Array(t),this.life=new Float32Array(t),this.baseSize=new Float32Array(t),this.gravity=new Float32Array(t),this.rgb=new Float32Array(t*3),this.alive=new Uint8Array(t),this.geo.setAttribute("position",new Lt(this.pos,3).setUsage(mi)),this.geo.setAttribute("aColor",new Lt(this.col,4).setUsage(mi)),this.geo.setAttribute("aSize",new Lt(this.size,1).setUsage(mi)),this.geo.boundingSphere=new ti(new C,40),this.mat=new Tt({vertexShader:N_,fragmentShader:F_,uniforms:{uScale:{value:30},uAlphaMul:{value:1}},transparent:!0,depthWrite:!1,blending:An,premultipliedAlpha:!0}),this.points=new Hd(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=7,e.add(this.points)}setScale(e){this.mat.uniforms.uScale.value=e}setAlpha(e){this.mat.uniforms.uAlphaMul.value=e}emit(e,t,n,s,r,a,o=0){if(!(this.liveCount>=this.budget))for(let l=0;l<this.capacity;l++){const c=(this.cursor+l)%this.capacity;if(!this.alive[c]){this.cursor=(c+1)%this.capacity,this.alive[c]=1,this.liveCount++,this.pos.set([e.x,e.y,e.z],c*3),this.vel.set([t.x,t.y,t.z],c*3),this.rgb.set([n.r,n.g,n.b],c*3),this.born[c]=a,this.life[c]=r,this.baseSize[c]=s,this.gravity[c]=o;return}}}update(e,t){for(let n=0;n<this.capacity;n++){if(!this.alive[n]){this.size[n]=0,this.col[n*4+3]=0;continue}const s=e-this.born[n];if(s>=this.life[n]||s<-.001){this.alive[n]=0,this.liveCount--,this.size[n]=0,this.col[n*4+3]=0;continue}if(t>0){const o=Math.exp(-t*2.2);this.vel[n*3]*=o,this.vel[n*3+2]*=o,this.vel[n*3+1]=this.vel[n*3+1]*o-this.gravity[n]*t,this.pos[n*3]+=this.vel[n*3]*t,this.pos[n*3+1]+=this.vel[n*3+1]*t,this.pos[n*3+2]+=this.vel[n*3+2]*t}const r=s/this.life[n],a=(1-r)*(1-r);this.size[n]=this.baseSize[n]*(1-.5*r),this.col[n*4]=this.rgb[n*3],this.col[n*4+1]=this.rgb[n*3+1],this.col[n*4+2]=this.rgb[n*3+2],this.col[n*4+3]=a}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aColor.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0}reset(){this.alive.fill(0),this.size.fill(0),this.liveCount=0,this.cursor=0,this.geo.attributes.aSize.needsUpdate=!0}dispose(){this.geo.dispose(),this.mat.dispose()}}const Qc=220;class O_{root=new Zt;ribbons=[];rings=[];particles;dust;shards=[];shardMesh;needleHeads;needleTrails;flashes;flashData=[];lensRing;lensMat;lensBorn=-100;rng;viewDir=new C(0,1,0);disposables=[];lastSimTime=0;presentTime=0;particleScale=1;ambientDust=260;stats={ribbons:0,rings:0,particles:0,shards:0,dropped:0};dim=1;dimTarget=1;get dimLevel(){return this.dim}setFrozen(e){this.dimTarget=e?.22:1}constructor(e,t){this.rng=new eu(t);for(let m=0;m<28;m++)this.ribbons.push(new I_(this.root));const n=new Nt(2,2);n.rotateX(-Math.PI/2),this.disposables.push(n);for(let m=0;m<16;m++){const x=new Tt({vertexShader:U_,fragmentShader:D_,uniforms:{uColor:{value:new Ee},uAlpha:{value:0},uWidth:{value:.06}},transparent:!0,depthWrite:!1,blending:An,premultipliedAlpha:!0}),p=new Ie(n,x);p.visible=!1,p.renderOrder=4,this.root.add(p),this.rings.push({mesh:p,mat:x,active:!1,born:0,life:.4,r0:.5,r1:6,presentation:!1,alpha:1})}this.particles=new Jc(this.root,1200,!1),this.dust=new Jc(this.root,420,!0);const s=new bl(.09,0);s.scale(1,.35,1.4);const r=new ut({color:16777215,roughness:.45,metalness:.1});this.disposables.push(s,r),this.shardMesh=new Rn(s,r,Qc),this.shardMesh.count=0,this.shardMesh.frustumCulled=!1,this.shardMesh.instanceMatrix.setUsage(mi),this.shardMesh.setColorAt(0,new Ee(1,1,1)),this.root.add(this.shardMesh);for(let m=0;m<Qc;m++)this.shards.push({active:!1,born:0,life:1,p:new C,v:new C,rot:new $t,spin:new C,size:1,bounced:!1,color:new Ee});const a=new Sl(.11,0);a.scale(.7,.7,4.2);const o=new bt({color:zt.needle.clone().multiplyScalar(1.3)});this.needleHeads=new Rn(a,o,96),this.needleHeads.count=0,this.needleHeads.frustumCulled=!1,this.root.add(this.needleHeads);const l=new Nt(1,1,1,1);l.translate(0,-.5,0),l.rotateX(-Math.PI/2);const c=In(B_(),e),h=new bt({map:c,color:zt.needle,transparent:!0,depthWrite:!1,blending:An,side:on});this.needleTrails=new Rn(l,h,96),this.needleTrails.count=0,this.needleTrails.frustumCulled=!1,this.root.add(this.needleTrails),this.disposables.push(a,o,l,h,c);const d=new Nt(1,1),u=In(ca("rgba(255,255,255,1)","rgba(255,255,255,0)",64),e),f=new bt({map:u,transparent:!0,depthWrite:!1,blending:An});this.flashes=new Rn(d,f,48),this.flashes.count=0,this.flashes.frustumCulled=!1,this.flashes.renderOrder=8,this.flashes.setColorAt(0,new Ee),this.root.add(this.flashes);for(let m=0;m<48;m++)this.flashData.push({active:!1,born:0,life:.1,p:new C,size:1,color:new Ee});this.disposables.push(d,u,f),this.lensMat=new bt({color:zt.light,transparent:!0,opacity:0,depthWrite:!1,blending:An}),this.lensRing=new Ie(new gi(.5,.03,8,48),this.lensMat),this.lensRing.position.set(Wt.x,Wt.y,Wt.z),this.root.add(this.lensRing),this.disposables.push(this.lensRing.geometry,this.lensMat),this.seedDust()}setQuality(e,t){this.particles.budget=e,this.ambientDust=t}setView(e,t){e.getWorldDirection(this.viewDir).negate(),this.particleScale=t/Math.max(.001,e.top-e.bottom),this.particles.setScale(this.particleScale),this.dust.setScale(this.particleScale),this.lensRing.quaternion.copy(e.quaternion)}seedDust(){for(let e=0;e<this.ambientDust;e++)this.spawnDust(this.rng.range(0,14))}spawnDust(e=0){const t=this.rng.next()*Math.PI*2,n=this.rng.range(6,18),s=new C(Math.cos(t)*n,this.rng.range(-8,-.5),Math.sin(t)*n),r=new C(this.rng.range(-.05,.05),this.rng.range(.08,.25),this.rng.range(-.05,.05)),a=new Ee(6937296).multiplyScalar(this.rng.range(.25,.8));this.dust.emit(s,r,a,this.rng.range(.05,.12),14,this.presentTime-e,0)}ribbon(){const e=this.ribbons.find(t=>!t.active);return e||this.stats.dropped++,e??null}ring(){const e=this.rings.find(t=>!t.active);return e||this.stats.dropped++,e??null}flash(e,t,n,s,r){const a=this.flashData.find(o=>!o.active);a&&(a.active=!0,a.born=r,a.life=s,a.p.copy(e),a.size=n,a.color.copy(t))}burst(e,t,n,s,r,a=.1,o=.45,l=2){for(let c=0;c<n;c++){const h=this.rng.next()*Math.PI*2,d=this.rng.range(.2,1),u=s*this.rng.range(.4,1),f=new C(Math.cos(h)*u,d*u*.9,Math.sin(h)*u);this.particles.emit(e,f,t,a*this.rng.range(.6,1.2),o*this.rng.range(.6,1.1),r,l)}}shardBurst(e,t,n,s,r=2.2){let a=0;for(const o of this.shards){if(a>=n)break;if(o.active)continue;a++,o.active=!0,o.born=s,o.life=this.rng.range(.55,.85),o.p.copy(e);const l=this.rng.next()*Math.PI*2,c=this.rng.range(.6,1)*r;o.v.set(Math.cos(l)*c,this.rng.range(1.5,3.2),Math.sin(l)*c),o.rot.set(this.rng.next()*6,this.rng.next()*6,this.rng.next()*6),o.spin.set(this.rng.range(-12,12),this.rng.range(-12,12),this.rng.range(-12,12)),o.size=this.rng.range(.7,1.4),o.bounced=!1,o.color.setHex(t[this.rng.int(t.length)])}a<n&&(this.stats.dropped+=n-a)}emitterVec(){return new C(Wt.x,Wt.y,Wt.z)}conduit(e,t,n){const s=this.ribbon();if(!s)return;const r=this.emitterVec(),a=e.clone().lerp(r,.5);a.y+=.35,s.points=[];for(let o=0;o<=10;o++){const l=o/10,c=e.clone().lerp(a,l),h=a.clone().lerp(r,l);s.points.push(c.lerp(h,l))}s.active=!0,s.born=n,s.life=.22,s.width=.045,s.color.copy(zt[t]).multiplyScalar(.7),s.revealTime=.05,s.flicker=0,s.presentation=!1,s.build(this.viewDir)}onSimEvent(e,t){const n=e.t;switch(e.type){case"fired":{const s=t(e.weaponId);s&&this.conduit(s,e.defId,n),e.defId==="light"?this.lance(e.points[0],n):e.defId==="thread"?this.thread(e.points,n):e.defId==="bell"?this.bell(n):e.defId==="needle"&&this.burst(this.emitterVec(),zt.needle,4,1.2,n,.07,.2,0);break}case"damaged":{const s=new C(e.x,.9,e.z),r=e.source==="ash"?Zc:zt[e.source];this.flash(s,r,e.source==="light"?1.3:.7,e.source==="light"?.12:.08,n),this.burst(s,r,e.source==="needle"?5:7,2.2,n,.08,.35,3);break}case"died":{const s=new C(e.x,.7,e.z);e.kind==="moth"?this.shardBurst(s,[15196104,13616294,2303544],7,n,1.6):e.kind==="urn"?this.shardBurst(s,[14274483,14274483,12756074,2240854],14,n,2.6):this.shardBurst(s,[15327689,15327689,5925522],9,n,2),this.burst(s,Vt(15260856,1.6),10,1.5,n,.1,.5,-.6);break}case"arrived":{const s=new C(e.x,.6,e.z);this.burst(s,Vt(14844276,2.4),16,2.6,n,.12,.5,1),this.flash(s,Vt(14844276,2),1.6,.14,n);break}case"blast":{const s=this.ring();s&&(s.active=!0,s.born=n,s.life=.6,s.r0=1.5,s.r1=e.radius,s.presentation=!1,s.alpha=1,s.mat.uniforms.uColor.value.copy(Zc),s.mat.uniforms.uWidth.value=.05,s.mesh.position.set(0,.08,0));for(let r=0;r<40;r++){const a=this.rng.next()*Math.PI*2,o=this.rng.range(2,e.radius);this.particles.emit(new C(Math.cos(a)*o,.3,Math.sin(a)*o),new C(0,this.rng.range(.4,1.4),0),Vt(10127994,1.1),.16,.9,n,-.2)}break}case"projectileExpired":{this.burst(new C(e.x,.9,e.z),zt.needle,5,.8,n,.06,.3,0);break}}}lance(e,t){this.lensBorn=t;const n=this.ribbon(),s=new C(e.x,.9,e.z),r=this.emitterVec();if(n){n.points=[];for(let o=0;o<=12;o++)n.points.push(r.clone().lerp(s,o/12));n.active=!0,n.born=t,n.life=.34,n.width=.16,n.color.copy(zt.light),n.revealTime=.05,n.flicker=0,n.presentation=!1,n.build(this.viewDir)}const a=this.ribbon();a&&(a.points=n?n.points.map(o=>o.clone()):[r,s],a.active=!0,a.born=t,a.life=.26,a.width=.06,a.color.setRGB(4,3.7,3.1),a.revealTime=.05,a.flicker=0,a.presentation=!1,a.build(this.viewDir)),this.flash(s,zt.light,1.8,.12,t),this.burst(s,zt.light,12,3.2,t,.1,.4,2)}thread(e,t){let n=this.emitterVec();e.forEach((s,r)=>{const a=new C(s.x,.9,s.z);for(const o of[0,1]){const l=this.ribbon();if(!l)return;l.points=[];const c=10,h=n.distanceTo(a),d=new C().subVectors(a,n).cross(new C(0,1,0)).normalize();for(let u=0;u<=c;u++){const f=u/c,m=n.clone().lerp(a,f);if(u>0&&u<c){const x=Math.sin(f*Math.PI)*Math.min(.45,h*.08);m.addScaledVector(d,this.rng.range(-1,1)*x),m.y+=this.rng.range(-.5,.8)*x}l.points.push(m)}l.active=!0,l.born=t+r*.035,l.life=.36,l.width=o===0?.13:.035,l.color.copy(o===0?zt.thread:Vt(14674431,4.5)),l.revealTime=.035,l.flicker=1,l.presentation=!1,l.build(this.viewDir)}this.flash(a,zt.thread,.8,.09,t),n=a})}bell(e){const t=this.ring();t&&(t.active=!0,t.born=e,t.life=.22,t.r0=.25,t.r1=1.3,t.presentation=!1,t.alpha=1,t.mat.uniforms.uColor.value.copy(zt.bell),t.mat.uniforms.uWidth.value=.08,t.mesh.position.set(Wt.x,wt+.08,Wt.z));const n=this.ring();n&&(n.active=!0,n.born=e,n.life=.42,n.r0=3.6,n.r1=Yt.bell.pulseRadius??8.5,n.presentation=!1,n.alpha=1,n.mat.uniforms.uColor.value.copy(zt.bell),n.mat.uniforms.uWidth.value=.03,n.mesh.position.set(0,.07,0));const s=this.ring();s&&(s.active=!0,s.born=e+.06,s.life=.65,s.r0=3.4,s.r1=(Yt.bell.pulseRadius??8.5)*.8,s.presentation=!1,s.alpha=.5,s.mat.uniforms.uColor.value.copy(Vt(15914906,1.6)),s.mat.uniforms.uWidth.value=.05,s.mesh.position.set(0,.05,0)),this.burst(this.emitterVec(),zt.bell,14,1.8,e,.09,.6,-1)}landing(e){const t=this.ring();if(t){t.active=!0,t.born=this.presentTime,t.life=.42,t.r0=.8,t.r1=2.2,t.presentation=!0,t.alpha=.9,t.mat.uniforms.uColor.value.copy(Vt(6937296,2.2)),t.mat.uniforms.uWidth.value=.08,t.mesh.position.set(e.x,e.y+.05,e.z);for(let n=0;n<14;n++){const s=n/14*Math.PI*2;this.dust.emit(new C(e.x+Math.cos(s)*1,e.y+.1,e.z+Math.sin(s)*1.2),new C(Math.cos(s)*.6,1.2,Math.sin(s)*.6),Vt(6937296,2),.09,.5,this.presentTime,0)}}}ceremony(e){const t=this.emitterVec();for(let n=0;n<60;n++){const s=this.rng.next()*Math.PI*2,r=e==="victory"?Vt(6937296,2.4):Vt(14844276,1.4);this.dust.emit(t.clone(),new C(Math.cos(s)*.6,e==="victory"?this.rng.range(1,3):this.rng.range(-.2,.4),Math.sin(s)*.6),r,.12,2.5,this.presentTime,0)}}update(e,t,n,s){const r=Math.max(0,e-this.lastSimTime);this.lastSimTime=e,this.presentTime+=t,this.dim+=(this.dimTarget-this.dim)*(1-Math.exp(-t*8)),this.particles.setAlpha(this.dim);let a=0;for(const p of this.ribbons){if(!p.active){p.mesh.visible=!1;continue}const S=(p.presentation?this.presentTime:e)-p.born;if(S>p.life||S<-.5){p.active=!1,p.mesh.visible=!1;continue}a++,p.mesh.visible=S>=0;const w=Math.max(0,S)/p.life,M=p.flicker?.75+.25*Math.sin(e*90+p.born*13):1;p.mat.uniforms.uAlpha.value=(1-w)*(1-w*.5)*M*(p.presentation?1:this.dim),p.mat.uniforms.uHead.value=Math.min(1,Math.max(0,S)/p.revealTime)*1.02,p.mat.uniforms.uColor.value.copy(p.color)}let o=0;for(const p of this.rings){if(!p.active){p.mesh.visible=!1;continue}const S=(p.presentation?this.presentTime:e)-p.born;if(S>p.life||S<-.5){p.active=!1,p.mesh.visible=!1;continue}o++,p.mesh.visible=S>=0;const w=Math.max(0,S)/p.life,M=1-Math.pow(1-w,2.4),T=p.r0+(p.r1-p.r0)*M;p.mesh.scale.set(T,1,T),p.mat.uniforms.uAlpha.value=p.alpha*(1-w)*Math.min(1,w*8+.2)*(p.presentation?1:this.dim)}const l=e-this.lensBorn;if(l>=0&&l<.18){const p=l/.18;this.lensRing.visible=!0,this.lensRing.scale.setScalar(1.6-1.3*p),this.lensMat.opacity=(1-p)*.9}else this.lensRing.visible=!1;let c=0;const h=new nt,d=new ln().setFromUnitVectors(new C(0,0,1),this.viewDir);for(const p of this.flashData){if(!p.active)continue;const g=e-p.born;if(g>p.life||g<-.5){p.active=!1;continue}if(g<0)continue;const S=g/p.life,w=p.size*(.6+.6*S);h.compose(p.p,d,new C(w,w,w)),this.flashes.setMatrixAt(c,h),this.flashes.setColorAt(c,p.color.clone().multiplyScalar((1-S)*this.dim)),c++}this.flashes.count=c,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0);let u=0;const f=new nt,m=new ln;for(const p of this.shards){if(!p.active)continue;const g=e-p.born;if(g>p.life){p.active=!1;continue}r>0&&(p.v.y-=9.5*r,p.p.addScaledVector(p.v,r),p.p.y<.03&&!p.bounced?(p.p.y=.03,p.v.y=Math.abs(p.v.y)*.35,p.v.x*=.5,p.v.z*=.5,p.bounced=!0):p.p.y<.03&&(p.p.y=.03,p.v.set(0,0,0)),p.rot.x+=p.spin.x*r,p.rot.y+=p.spin.y*r,p.rot.z+=p.spin.z*r);const S=g/p.life,w=p.size*(S>.7?1-(S-.7)/.3:1);m.setFromEuler(p.rot),f.compose(p.p,m,new C(w,w,w)),this.shardMesh.setMatrixAt(u,f),this.shardMesh.setColorAt(u,p.color),u++}this.shardMesh.count=u,this.shardMesh.instanceMatrix.needsUpdate=!0,this.shardMesh.instanceColor&&(this.shardMesh.instanceColor.needsUpdate=!0);let x=0;for(const p of n){if(x>=96)break;const g=p.prevX+(p.x-p.prevX)*s,S=p.prevZ+(p.z-p.prevZ)*s,w=p.x-p.prevX,M=p.z-p.prevZ,T=Math.atan2(w,M),b=e-p.bornAt,R=ea(g,S),_=Math.max(.9,Wt.y-R*.5);m.setFromEuler(new $t(0,T,0)),f.compose(new C(g,_,S),m,new C(1,1,1)),this.needleHeads.setMatrixAt(x,f);const E=Math.min(1.8,.3+b*8);f.compose(new C(g,_,S),m,new C(.2,1,-E)),this.needleTrails.setMatrixAt(x,f),x++}for(this.needleHeads.count=x,this.needleTrails.count=x,this.needleHeads.instanceMatrix.needsUpdate=!0,this.needleTrails.instanceMatrix.needsUpdate=!0,this.particles.update(e,r),this.dust.update(this.presentTime,t);this.dust.liveCount<this.ambientDust;)this.spawnDust();this.stats.ribbons=a,this.stats.rings=o,this.stats.particles=this.particles.liveCount,this.stats.shards=u}reset(){for(const e of this.ribbons)e.active=!1,e.mesh.visible=!1;for(const e of this.rings)e.active=!1,e.mesh.visible=!1;for(const e of this.shards)e.active=!1;for(const e of this.flashData)e.active=!1;this.particles.reset(),this.shardMesh.count=0,this.flashes.count=0,this.needleHeads.count=0,this.needleTrails.count=0,this.lensBorn=-100,this.lastSimTime=0,this.stats.dropped=0}dispose(){for(const e of this.ribbons)e.geo.dispose(),e.mat.dispose();for(const e of this.rings)e.mat.dispose();this.particles.dispose(),this.dust.dispose(),this.shardMesh.dispose(),this.needleHeads.dispose(),this.needleTrails.dispose(),this.flashes.dispose();for(const e of this.disposables)e.dispose()}}function B_(){const[i,e]=Jt(32,128),t=e.createLinearGradient(0,0,0,128);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.3,"rgba(255,255,255,0.5)"),t.addColorStop(1,"rgba(255,255,255,0.0)"),e.fillStyle=t,e.beginPath(),e.moveTo(2,0),e.lineTo(30,0),e.lineTo(16,128),e.closePath(),e.fill(),i}const k_=6;class z_{constructor(e,t,n,s,r,a,o){this.canvas=e,this.rig=t,this.board=n,this.cards=s,this.hand=r,this.getController=a,this.actions=o;const l=(c,h,d)=>{e.addEventListener(c,h,d),this.off.push(()=>e.removeEventListener(c,h,d))};l("pointerdown",c=>this.onDown(c)),l("pointermove",c=>this.onMove(c)),l("pointerup",c=>this.onUp(c)),l("pointercancel",()=>this.cancelDrag("pointercancel")),l("lostpointercapture",()=>{this.dragging&&this.cancelDrag("lostcapture")}),l("pointerleave",()=>{this.dragging||this.setHover(null)}),l("contextmenu",c=>c.preventDefault()),l("wheel",c=>{c.preventDefault();const h=e.getBoundingClientRect();this.rig.zoomAt(c.clientX-h.left,c.clientY-h.top,c.deltaY<0?1.12:1/1.12)},{passive:!1})}canvas;rig;board;cards;hand;getController;actions;raycaster=new Gh;pointerId=null;pressUid=null;pressX=0;pressY=0;dragging=!1;lastX=-1;lastY=-1;hoverKey=null;off=[];enabled=!0;get isDragging(){return this.dragging}get draggedUid(){return this.dragging?this.pressUid:null}local(e){const t=this.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}turnActive(){const e=this.getController();return this.enabled&&e.phase==="TURN"&&!e.suspended&&!!e.turn}worldPick(e,t,n){if(e.length===0)return null;const s=this.rig.viewport;return this.raycaster.setFromCamera(new re(t/s.width*2-1,-(n/s.height)*2+1),this.rig.camera),this.raycaster.intersectObjects(e,!1)[0]??null}socketAt(e,t){const n=this.worldPick(this.board.sockets.map(s=>s.hit),e,t);return n?n.object.userData.slot:null}socketCardAt(e,t){const n=this.worldPick(this.cards.pickables(),e,t);return n?this.cards.cardByObject(n.object)??null:null}onDown(e){if(this.pointerId!==null)return;const{x:t,y:n}=this.local(e);if(this.lastX=t,this.lastY=n,!this.turnActive())return;const r=this.getController().turn.stage,a=this.hand.pick(t,n);if(e.button===2){a&&"uid"in a&&(r==="idle"||r==="targeting")&&this.actions.toggleMark(a.uid);return}if(e.button===0){if(a&&"offer"in a){r==="sacrificeChoice"&&this.actions.chooseOffer(a.offer);return}a&&"uid"in a&&(r==="idle"||r==="targeting")&&(this.pointerId=e.pointerId,this.pressUid=a.uid,this.pressX=t,this.pressY=n,this.canvas.setPointerCapture(e.pointerId),e.preventDefault())}}onMove(e){const{x:t,y:n}=this.local(e);if(this.lastX=t,this.lastY=n,this.hand.setPointer(t,n),this.pointerId!==null&&e.pointerId===this.pointerId&&this.pressUid!==null){if(!this.dragging&&Math.hypot(t-this.pressX,n-this.pressY)>k_&&(this.dragging=!0,this.hand.startDrag(this.pressUid,this.pressX,this.pressY),this.actions.pickSound()),this.dragging){this.hand.dragTo(t,n);const s=this.getController(),r=s.needsTarget(this.pressUid)?this.socketAt(t,n):null;this.actions.hoverSocket(r!==null&&s.validTarget(this.pressUid,r)?r:null)}return}this.updateHover(t,n)}onUp(e){const{x:t,y:n}=this.local(e);if(this.pointerId===null||e.pointerId!==this.pointerId){if(e.button===0&&this.turnActive()){const a=this.getController().turn;if(a.stage==="targeting"&&a.selected!==null&&!this.hand.pick(t,n)){const o=this.socketAt(t,n);o!==null?this.actions.play(a.selected,o):this.actions.select(null)}}return}const s=this.pressUid,r=this.dragging;if(this.release(),r){this.dragging=!1,this.hand.endDrag(),this.actions.hoverSocket(null);const a=this.getController();let o=null;if(a.needsTarget(s)){const l=this.socketAt(t,n);l!==null&&(o=this.actions.play(s,l))}else n<this.hand.handTopY&&(o=this.actions.play(s));(o===null||o!=="played"&&o!=="confirm")&&this.actions.returnSound()}else{const a=this.getController();a.needsTarget(s)?this.actions.select(a.turn.selected===s?null:s):this.actions.play(s)}}release(){this.pointerId!==null&&this.canvas.hasPointerCapture(this.pointerId)&&this.canvas.releasePointerCapture(this.pointerId),this.pointerId=null,this.pressUid=null}cancelDrag(e){const t=this.dragging;this.dragging=!1,this.release(),this.hand.endDrag(),this.actions.hoverSocket(null),t&&this.actions.returnSound()}updateHover(e,t){const n=this.getController();if(!this.enabled||n.phase==="TITLE"){this.setHover(null);return}const s=t>this.hand.handTopY-30,r=n.phase==="TURN"?this.hand.pick(e,t):null;if(this.hand.setRaised(n.phase==="TURN"&&(s||!!r||this.dragging)),r){this.setHover("uid"in r?`h${r.uid}`:`o${r.offer}`),this.hand.setHover(r),this.actions.hoverHand("uid"in r?r.uid:null,"offer"in r?r.offer:null),this.actions.hoverSocketCard(null),this.actions.hoverSocket(null);return}this.hand.setHover(null),this.actions.hoverHand(null,null);const a=this.socketCardAt(e,t);this.setHover(a?a.key:null),this.actions.hoverSocketCard(a);const o=n.turn;if(this.turnActive()&&o&&o.stage==="targeting"&&o.selected!==null){const l=this.socketAt(e,t);this.actions.hoverSocket(l!==null&&n.validTarget(o.selected,l)?l:null)}else this.actions.hoverSocket(null);this.canvas.style.cursor=a?"help":"default"}setHover(e){e!==this.hoverKey&&(this.hoverKey=e,e&&e.startsWith("h")&&this.actions.hoverSound()),e&&(e.startsWith("h")||e.startsWith("o"))&&(this.canvas.style.cursor=this.dragging?"grabbing":"grab")}refreshHover(){!this.dragging&&this.pointerId===null&&this.lastX>=0&&this.updateHover(this.lastX,this.lastY)}dispose(){this.cancelDrag("dispose");for(const e of this.off)e();this.off=[]}}function $a(i,e=""){const t=an(i),n={tower:"Tower",active:"Active",passive:"Passive · lasts the next wave"}[t.type];let s=[["Cost",`${t.cost} energy`]];if(t.type==="tower"){const r=Yt[t.id];s=s.concat([["Damage",r.pattern==="chain"?(r.chainDamage??[]).join(" / "):r.pattern==="pulse"?`${r.damage} to all in reach`:`${r.damage}`],["Interval",`${r.interval.toFixed(1)} s`],["Range",r.pattern==="pulse"?`${r.pulseRadius} around the vessel`:`${r.range}`]]),r.pattern==="chain"&&s.push(["Chain",`3 foes, hop ${r.chainHopRange}`])}return`<div class="tt-head tt-${t.type}"><span class="tt-name">${t.name}</span><span class="tt-type">${n}</span></div>
    <div class="tt-body">${t.summary}</div>
    <dl>${s.map(([r,a])=>`<dt>${r}</dt><dd>${a}</dd>`).join("")}</dl>${e}
    <div class="tt-flavor">“${t.flavor}”</div>`}class H_{constructor(e,t){this.root=e,e.innerHTML=`
      <div id="hud" class="hidden" role="toolbar" aria-label="Game controls">
        <div class="brand">PALIMPSEST</div>
        <div class="meter" id="integrity" aria-live="polite">
          <span class="label">Integrity</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">100</span>
        </div>
        <div class="meter" id="trial">
          <span class="label">Wave <span class="trial-n">1</span>/${Ws}</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">30s</span>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-buttons">
          <button id="btn-pause" title="Pause (P)">Pause</button>
          <button id="btn-mute" title="Mute (M)">Mute</button>
          <label class="volume" title="Volume"><span class="sr-only">Volume</span><input id="volume" type="range" min="0" max="100" value="70" aria-label="Volume" /></label>
          <button id="btn-quality" title="Toggle quality (Q)">Quality: High</button>
          <button id="btn-restart" class="danger" title="Restart">Restart</button>
        </div>
      </div>
      <div id="forecast" class="hidden"></div>
      <div id="energy" class="hidden" aria-live="polite"><span class="label">Energy</span><span class="pips"></span><span class="value"></span></div>
      <div id="draw-count" class="pile-count hidden" title="Draw pile"></div>
      <div id="discard-count" class="pile-count hidden" title="Discard pile"></div>
      <button id="btn-end-turn" class="primary hidden" title="End turn (E)">End Turn</button>
      <div id="action-bar" class="hidden">
        <span id="action-text"></span>
        <button id="btn-sacrifice" class="hidden">Sacrifice</button>
        <button id="btn-purge" class="hidden">Purge</button>
        <button id="btn-clear" class="hidden">Clear</button>
        <button id="btn-replace" class="primary hidden">Replace</button>
        <button id="btn-cancel" class="hidden">Cancel</button>
      </div>
      <div id="tooltip" class="hidden" role="tooltip"></div>
      <div id="title-overlay" class="overlay">
        <div class="plate">
          <h1>PALIMPSEST</h1>
          <div class="stakes">${Xv}</div>
          <div class="divider"></div>
          <p>Seat tower cards in the vessel; each fills with light and fires on its own. Between waves, play your hand with ${Ci.energyPerTurn} energy.</p>
          <p>Drag or click cards to play them. Right-click cards to mark them: sacrifice two for something new, or purge one.</p>
          <div class="actions"><button id="btn-start" class="primary">Begin</button></div>
          <p class="small">E end turn · Esc cancel · P pause · M mute · Q quality · wheel zoom · Z reset zoom</p>
        </div>
      </div>
      <div id="pause-overlay" class="overlay soft hidden">
        <div class="plate">
          <h2 id="pause-title">Paused</h2>
          <p id="pause-text">The wave is held still.</p>
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
      <div id="toast" class="hidden"></div>
    `,e.querySelectorAll("[id]").forEach(a=>this.el[a.id]=a);const n=(a,o)=>{const l=c=>{c.preventDefault(),o()};this.el[a].addEventListener("click",l),this.offListeners.push(()=>this.el[a].removeEventListener("click",l))};n("btn-start",()=>t.start()),n("btn-pause",()=>this.lastPhase==="PAUSED"?t.resume():t.pause()),n("btn-resume",()=>t.resume()),n("btn-mute",()=>t.toggleMute()),n("btn-quality",()=>t.toggleQuality()),n("btn-restart",()=>t.restart()),n("btn-end-restart",()=>t.restart()),n("btn-end-turn",()=>t.endTurn()),n("btn-sacrifice",()=>t.sacrifice()),n("btn-purge",()=>t.purge()),n("btn-clear",()=>t.clearMarks()),n("btn-replace",()=>t.confirmReplace()),n("btn-cancel",()=>t.cancel());const s=this.el.volume,r=()=>t.setVolume(Number(s.value)/100);s.addEventListener("input",r),this.offListeners.push(()=>s.removeEventListener("input",r))}root;el={};lastHp=Fn.maxHealth;hitTimer=0;toastTimer=0;offListeners=[];lastPhase=null;turnKey="";toast(e,t=2.5){this.el.toast.textContent=e,this.el.toast.classList.remove("hidden"),this.toastTimer=t}setTooltip(e,t){const n=this.el.tooltip;if(!e||!t){n.classList.add("hidden");return}n.innerHTML=e,n.classList.remove("hidden");const s=this.root.clientWidth,r=this.root.clientHeight,a=n.offsetWidth||280,o=n.offsetHeight||200;let l=t.x+t.w+12;l+a>s-8&&(l=t.x-a-12),l=Math.max(8,Math.min(s-a-8,l));let c=t.y+t.h/2-o/2;c=Math.max(64,Math.min(r-o-8,c)),n.style.left=`${l}px`,n.style.top=`${c}px`}insets(){return{top:56,right:0,bottom:40,left:0}}focusPrimary(e){e==="TITLE"&&this.el["btn-start"].focus()}update(e,t){const n=e.phase!==this.lastPhase;this.lastPhase=e.phase;const s=e.phase!=="TITLE";this.el.hud.classList.toggle("hidden",!s),this.el["title-overlay"].classList.toggle("hidden",e.phase!=="TITLE");const r=Math.max(0,e.hp/Fn.maxHealth);this.el.integrity.querySelector(".fill").style.transform=`scaleX(${r})`,this.el.integrity.querySelector(".value").textContent=`${Math.ceil(e.hp)}`,this.el.integrity.classList.toggle("low",r<=.35),e.hp<this.lastHp&&(this.hitTimer=.35),this.lastHp=e.hp,this.hitTimer=Math.max(0,this.hitTimer-t),this.el.integrity.classList.toggle("hit",this.hitTimer>0);const a=e.phase==="TURN"&&e.turn;this.el.trial.querySelector(".trial-n").textContent=`${(a?e.turn.nextWave:e.waveIndex)+1}`;const o=Math.max(0,e.trialDuration-e.trialTime);this.el.trial.querySelector(".fill").style.transform=`scaleX(${a?1:e.clearing?0:o/e.trialDuration})`,this.el.trial.querySelector(".value").textContent=a?"next":e.clearing?`${e.enemiesLeft} left`:`${Math.ceil(o)}s`,this.el["btn-pause"].textContent=e.phase==="PAUSED"?"Resume":"Pause",this.el["btn-pause"].disabled=!(e.phase==="COMBAT"||e.phase==="CLEARING"||e.phase==="PAUSED"),this.el["btn-mute"].textContent=e.muted?"Unmute":"Mute",this.el["btn-quality"].textContent=`Quality: ${e.quality==="high"?"High":"Low"}`;const l=e.phase==="PAUSED"||e.suspended;if(this.el["pause-overlay"].classList.toggle("hidden",!l),l){const h=e.suspended||e.pauseReason==="suspended";this.el["pause-title"].textContent=h?"The vessel waits":"Paused",this.el["pause-text"].textContent=h?"The run was suspended while you were away. Nothing advanced.":"The wave is held still.",n&&this.el["btn-resume"].focus({preventScroll:!0})}const c=e.phase==="DEFEAT"||e.phase==="VICTORY";if(this.el["end-overlay"].classList.toggle("hidden",!c),c&&n){this.el.toast.classList.add("hidden"),this.toastTimer=0;const h=e.phase==="VICTORY";this.el["end-overlay"].className=`overlay ${h?"victory":"defeat"}`,this.el["end-title"].textContent=h?"Returned to Life":"The Vessel Breaks",this.el["end-text"].textContent=h?"Eight waves endured. The aperture opens and the soul rises toward a new life.":"Your memories scatter across the table. The instrument can be wound again.",this.el["end-stats"].innerHTML=`<div><b>${e.waveIndex+1}/${Ws}</b>wave</div><div><b>${e.kills}</b>echoes laid to rest</div><div><b>${e.towers}</b>towers held</div><div><b>${Math.ceil(e.hp)}</b>integrity</div>`,this.el["end-seed"].textContent=`Seed ${e.seed}`,setTimeout(()=>this.el["btn-end-restart"].focus({preventScroll:!0}),0)}this.updateTurn(e),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&this.el.toast.classList.add("hidden"))}updateTurn(e){const t=e.phase==="TURN"||e.suspended?e.turn:null;for(const l of["forecast","energy","draw-count","discard-count","btn-end-turn"])this.el[l].classList.toggle("hidden",!t);if(!t){this.el["action-bar"].classList.add("hidden"),this.turnKey="";return}const n=e.piles;this.place(this.el["draw-count"],n.drawPos.x,n.drawPos.y-n.cardH*.5-14),this.place(this.el["discard-count"],n.discardPos.x,n.discardPos.y-n.cardH*.5-14),this.place(this.el.energy,n.drawPos.x,n.drawPos.y-n.cardH*.5-52),this.place(this.el["btn-end-turn"],n.discardPos.x,n.discardPos.y-n.cardH*.5-58);const s=JSON.stringify([t,n.draw,n.discard,e.suspended]);if(s===this.turnKey)return;this.turnKey=s,this.el["draw-count"].textContent=`Draw ${n.draw}`,this.el["discard-count"].textContent=`Discard ${n.discard}`,this.el.forecast.innerHTML=`<b>${t.turnIndex===0?"Prepare":`Wave ${t.turnIndex} endured`}</b> · Next, wave ${t.nextWave+1}: ${t.forecast}`,this.el.energy.querySelector(".pips").innerHTML=Array.from({length:Ci.energyPerTurn},(l,c)=>`<i class="${c<t.energy?"lit":""}"></i>`).join(""),this.el.energy.querySelector(".value").textContent=`${t.energy}/${Ci.energyPerTurn}`,this.el["btn-end-turn"].disabled=!t.canEndTurn;const r=(l,c)=>this.el[l].classList.toggle("hidden",!c);let a="";r("btn-sacrifice",!1),r("btn-purge",!1),r("btn-clear",!1),r("btn-replace",!1),r("btn-cancel",!1),t.stage==="sacrificeChoice"?a="Choose what rises from the ashes.":t.stage==="confirmReplace"&&t.replace?(a=`Replace ${t.replace.from} with ${t.replace.to}? The old tower is destroyed.`,r("btn-replace",!0),r("btn-cancel",!0)):t.stage==="targeting"?(a=t.selectedIsTower?`Place ${t.selectedName}: click an open socket.`:`${t.selectedName}: click a placed tower.`,r("btn-cancel",!0)):t.marked===2?(a="Two cards marked.",r("btn-sacrifice",!0),r("btn-clear",!0)):t.marked===1&&(a=t.purgesLeft>0?"Mark one more to sacrifice, or purge this card from your deck.":"Mark one more to sacrifice (purge already used this turn).",r("btn-purge",t.purgesLeft>0),r("btn-clear",!0)),this.el["action-text"].textContent=a,this.el["action-bar"].classList.toggle("hidden",!a||e.suspended);const o=n.cardH*1.25+18;this.el["action-bar"].style.bottom=`${o}px`}place(e,t,n){const s=(e.offsetWidth||0)/2,r=this.root.clientWidth||window.innerWidth;e.style.left=`${Math.round(Math.max(s+6,Math.min(r-s-6,t)))}px`,e.style.top=`${Math.round(n)}px`}dispose(){for(const e of this.offListeners)e();this.offListeners=[],this.root.innerHTML=""}static enemyName(e){return jh[e].name}}const Ls=new C;function rn(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Ls.copy(e),Ls[n]=0,Ls.normalize();const c=.5*a/(a+o),h=1-Ls.angleTo(i)/l;return Math.sign(Ls[t])===1?h*c:o/(a+o)+c+c*(1-h)}class Tn extends ei{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new C,c=new C,h=new C(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,x=new C,p=.5/a;for(let g=0,S=0;g<d.length;g+=3,S+=2)switch(l.fromArray(d,g),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),d[g+0]=h.x*Math.sign(l.x)+c.x*r,d[g+1]=h.y*Math.sign(l.y)+c.y*r,d[g+2]=h.z*Math.sign(l.z)+c.z*r,u[g+0]=c.x,u[g+1]=c.y,u[g+2]=c.z,Math.floor(g/m)){case 0:x.set(1,0,0),f[S+0]=rn(x,c,"z","y",r,n),f[S+1]=1-rn(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),f[S+0]=1-rn(x,c,"z","y",r,n),f[S+1]=1-rn(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),f[S+0]=1-rn(x,c,"x","z",r,e),f[S+1]=rn(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),f[S+0]=1-rn(x,c,"x","z",r,e),f[S+1]=1-rn(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),f[S+0]=1-rn(x,c,"x","y",r,e),f[S+1]=1-rn(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),f[S+0]=rn(x,c,"x","y",r,e),f[S+1]=1-rn(x,c,"y","x",r,t);break}}static fromJSON(e){return new Tn(e.width,e.height,e.depth,e.segments,e.radius)}}function lu(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new vt;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=jc(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);const m=jc(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function jc(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Lt(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<t;m++){const x=h.getComponent(u,m);o.setComponent(u+d,m,x)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function Fr(i,e,t,n=0,s=0){const r=new vs,a=n-i/2,o=s-e/2;return r.moveTo(a+t,o),r.lineTo(a+i-t,o),r.quadraticCurveTo(a+i,o,a+i,o+t),r.lineTo(a+i,o+e-t),r.quadraticCurveTo(a+i,o+e,a+i-t,o+e),r.lineTo(a+t,o+e),r.quadraticCurveTo(a,o+e,a,o+e-t),r.lineTo(a,o+t),r.quadraticCurveTo(a,o,a+t,o),r}function Or(i,e,t,n,s){const r=new Bo,a=n-i/2,o=s-e/2;return r.moveTo(a+t,o),r.quadraticCurveTo(a,o,a,o+t),r.lineTo(a,o+e-t),r.quadraticCurveTo(a,o+e,a+t,o+e),r.lineTo(a+i-t,o+e),r.quadraticCurveTo(a+i,o+e,a+i,o+e-t),r.lineTo(a+i,o+t),r.quadraticCurveTo(a+i,o,a+i-t,o),r.closePath(),r}function Br(i,e){const t=e.map(s=>i.clone().applyMatrix4(s)),n=lu(t);return t.forEach(s=>s.dispose()),n}function Is(i,e,t,n=0,s=0,r=0){return new nt().compose(new C(i,e,t),new ln().setFromEuler(new $t(n,s,r)),new C(1,1,1))}class na{root=new Zt;baseGroup=new Zt;sockets=[];emitter;emitterLight;emitterMat;warnMat;warnLevel=0;baseShake=0;baseShakeAge=1;apertureSegments=[];apertureLights;segColor=new Ee;static SEG_OFF=new Ee(1053983);static SEG_ON=new Ee(6937296).multiplyScalar(2.2);apertureIris=[];apertureCore;apertureCoreMat;apertureOpen=0;apertureOpenTarget=0;progress=0;soulLift=0;soulFade=1;pulse=0;disposables=[];apertureGroup=new Zt;rangeRing;rangeMat;rangeFill;rangeFillMat;rangeTarget=0;rangeLevel=0;rangeRadius=1;flames=[];candleLights=[];lockCovers=[];constructor(e){const t=ie=>(this.disposables.push(ie),ie),n=ie=>t(In(ie,e)),s=n(b_());s.wrapS=s.wrapT=as;const r=t(new ut({color:13151088,map:s,metalness:.85,roughness:.38})),a=t(new ut({color:9072705,map:s,metalness:.8,roughness:.5})),o=n(ou());o.wrapS=o.wrapT=as;const l=t(new ut({color:11569766,map:o,roughness:.72,metalness:0})),c=t(new ut({color:9071184,map:o,roughness:.6,metalness:0})),h=Xr.boardRadius,d=n(w_());d.wrapS=d.wrapT=as,d.repeat.set(5,5);const u=new Ie(t(new Nt(240,240)),t(new ut({map:d,color:11901568,roughness:.86,metalness:0})));u.rotation.x=-Math.PI/2,u.receiveShadow=!0,this.root.add(u);const f=n(E_(h,Xr.spawnRadius)),m=new Ie(t(new Nt((h+1.5)*2,(h+1.5)*2)),t(new ut({map:f,transparent:!0,depthWrite:!1,roughness:.9})));m.rotation.x=-Math.PI/2,m.position.y=.004,m.receiveShadow=!0,this.root.add(m),this.rangeMat=t(new bt({color:6937296,transparent:!0,opacity:0,depthWrite:!1})),this.rangeRing=new Ie(t(new yl(.985,1,160)),this.rangeMat),this.rangeRing.rotation.x=-Math.PI/2,this.rangeRing.position.y=.03,this.rangeRing.renderOrder=2,this.rangeRing.visible=!1,this.root.add(this.rangeRing),this.rangeFillMat=t(new bt({color:6937296,transparent:!0,opacity:0,depthWrite:!1})),this.rangeFill=new Ie(t(new Js(1,128)),this.rangeFillMat),this.rangeFill.rotation.x=-Math.PI/2,this.rangeFill.position.y=.025,this.rangeFill.visible=!1,this.root.add(this.rangeFill);const x=t(new ut({color:13352088,roughness:.8})),p=t(new ut({map:n(R_()),roughness:.6})),g=t(new ut({color:3810328,roughness:.9})),S=t(new ut({color:12167304,roughness:.95})),w=t(new bt({color:new Ee(16761707).multiplyScalar(3)})),M=t(new pi(.55,.62,1,16)),T=t(new ds(.16,10,8));T.scale(1,2.2,1);for(const[ie,ee,de]of[[-h-6,-h+4,3.2],[-h-4.4,-h+6.2,2],[h+6,-h+1,2.6]]){const Se=new Ie(M,x);Se.scale.set(1,de,1),Se.position.set(ie,de/2,ee),Se.castShadow=!0,this.root.add(Se);const De=new Ie(T,w);De.position.set(ie,de+.4,ee),this.root.add(De),this.flames.push(De);const ze=new Ho(16756832,30,40,1.6);ze.position.set(ie,de+1.2,ee),this.root.add(ze),this.candleLights.push(ze)}const b=t(new Tn(1.2,1.2,1.2,3,.18));for(const[ie,ee,de]of[[-h-3,-h+12,.4],[-h-1.4,-h+14,1.1]]){const Se=new Ie(b,p);Se.position.set(ie,.6,ee),Se.rotation.set(0,de,0),Se.castShadow=!0,this.root.add(Se)}const R=new Ie(t(new Tn(9,1.4,12,3,.25)),[S,g,g,g,S,S]);R.position.set(h+10,.7,-h+8),R.rotation.y=.35,R.castShadow=!0,this.root.add(R);const _=t(new pi(.5,.5,.08,20));for(let ie=0;ie<5;ie++){const ee=new Ie(_,a);ee.position.set(h+3+ie*.35,.04+ie*.08,-h+14+ie%2*.1),this.root.add(ee)}const E=Fn.halfX,P=Fn.halfZ,I=new Ie(t(new Tn(E*2,yn+.1,P*2,4,.08)),a);I.position.y=(yn-.1)/2;const F=new Ie(t(new Tn(E*2-.42,hi-yn+.04,P*2-.42,4,.1)),l);F.position.y=(hi+yn)/2;const z=new Ie(t(new Tn(E*2-.16,qr-hi+.04,P*2-.16,3,.05)),r);z.position.y=(qr+hi)/2;for(const ie of[I,F,z])ie.castShadow=!0,ie.receiveShadow=!0,this.baseGroup.add(ie);const U=new pi(.11,.13,hi-yn,12),k=[];for(const ie of[-1,1])for(const ee of[-1,1])k.push(Is(ie*(E-.24),(hi+yn)/2,ee*(P-.24)));const K=new Ie(t(Br(U,k)),r);U.dispose(),K.castShadow=!0,this.baseGroup.add(K);const W=new Ie(t(new Tn(E*2-.36,.07,P*2-.36,2,.03)),r);W.position.y=yn+(hi-yn)*.62,W.castShadow=!0,this.baseGroup.add(W);const oe=n(S_()),q=t(new ut({map:oe,transparent:!0,metalness:.7,roughness:.4})),J=t(new Nt(1.5,.42));for(const[ie,ee,de]of[[0,P-.209,0],[E-.209,0,Math.PI/2]]){const Se=new Ie(J,q);Se.position.set(ie,yn+(hi-yn)*.3,ee),Se.rotation.y=de,this.baseGroup.add(Se)}this.warnMat=t(new bt({color:14844276,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!0}));const B=Fr(E*2+.36,P*2+.36,.3);B.holes.push(Or(E*2+.02,P*2+.02,.1,0,0));const se=new Ie(t(new Ri(B,8)),this.warnMat);se.rotation.x=-Math.PI/2,se.position.y=.012,this.baseGroup.add(se);const ae=Fr(Nr,Ya,.28);for(let ie=0;ie<Pn;ie++){const ee=Qn(ie);ae.holes.push(Or(Wn,Xn,.14,ee.x,-ee.z))}const Ce=t(new tr(ae,{depth:tu,bevelEnabled:!0,bevelThickness:nu,bevelSize:.04,bevelSegments:3,curveSegments:10})),qe=Ce.attributes.uv;for(let ie=0;ie<qe.count;ie++)qe.setXY(ie,(qe.getX(ie)+Nr/2)/Nr,(qe.getY(ie)+Ya/2)/Ya);const Ze=new Ie(Ce,[c,r]);Ze.rotation.x=-Math.PI/2,Ze.position.y=qr,Ze.castShadow=!0,Ze.receiveShadow=!0,this.baseGroup.add(Ze);const Z=n(y_()),te=t(new ut({map:Z,roughness:.9,metalness:.1})),xe=t(new Nt(Wn+.08,Xn+.08)),ke=Fr(Wn+.2,Xn+.2,.2);ke.holes.push(Or(Wn+.02,Xn+.02,.14,0,0));const we=t(new tr(ke,{depth:.02,bevelEnabled:!0,bevelThickness:.015,bevelSize:.015,bevelSegments:2})),He=Fr(Wn+.5,Xn+.5,.34);He.holes.push(Or(Wn+.24,Xn+.24,.22,0,0));const rt=t(new Ri(He,8)),ne=t(new Nt(Wn+.2,Xn+.2)),ce=t(new bt({visible:!1})),he=[],ue=[];for(let ie=0;ie<Pn;ie++){const ee=Qn(ie);he.push(Is(ee.x,iu,ee.z,-Math.PI/2)),ue.push(Is(ee.x,wt-.005,ee.z,-Math.PI/2))}const pe=new Ie(t(Br(xe,he)),te);pe.receiveShadow=!0;const Be=new Ie(t(Br(we,ue)),r);Be.castShadow=!0,Be.receiveShadow=!0,this.baseGroup.add(pe,Be);const Fe=n(A_()),Ge=t(new ut({map:Fe,metalness:.7,roughness:.45})),We=t(new Tn(Wn-.04,.08,Xn-.04,2,.03));for(let ie=0;ie<Pn;ie++){const ee=Qn(ie),de=new Ie(We,Ge);de.position.set(ee.x,wt-.03,ee.z),de.castShadow=!0,de.receiveShadow=!0,de.visible=!1,this.baseGroup.add(de),this.lockCovers.push(de);const Se=t(new bt({color:6937296,transparent:!0,opacity:0,depthWrite:!1,blending:An})),De=new Ie(rt,Se);De.rotation.x=-Math.PI/2,De.position.set(ee.x,wt+.03,ee.z),De.renderOrder=3,this.baseGroup.add(De);const ze=new Ie(ne,ce);ze.rotation.x=-Math.PI/2,ze.position.set(ee.x,wt+.02,ee.z),ze.userData.slot=ie,this.baseGroup.add(ze),this.sockets.push({slot:ie,hit:ze,halo:De,haloMat:Se,center:new C(ee.x,wt,ee.z),haloLevel:0,haloTarget:0,haloColor:new Ee(6937296)})}const L=new Ie(t(new ei(Nr-.6,.02,.035)),r);L.position.set(0,wt+.005,0),this.baseGroup.add(L);const tt=new Ie(t(new gi(.2,.035,10,32)),r);tt.rotation.x=Math.PI/2,tt.position.set(Wt.x,wt+.08,Wt.z),tt.castShadow=!0,this.baseGroup.add(tt);const Ye=new pi(.018,.025,.36,6),A=[];for(let ie=0;ie<3;ie++){const ee=ie/3*Math.PI*2+.5;A.push(Is(Math.cos(ee)*.17,wt+.22,Math.sin(ee)*.17,-Math.sin(ee)*.35,0,Math.cos(ee)*.35))}this.baseGroup.add(new Ie(t(Br(Ye,A)),r)),Ye.dispose(),this.emitterMat=t(new ut({color:727580,emissive:6937296,emissiveIntensity:2.2,roughness:.2})),this.emitter=new Ie(t(new ds(.15,24,16)),this.emitterMat),this.emitter.position.set(Wt.x,Wt.y,Wt.z),this.baseGroup.add(this.emitter),this.emitterLight=new Ho(6937296,2.2,6,2),this.emitterLight.position.copy(this.emitter.position),this.baseGroup.add(this.emitterLight);const v=n(ca("rgba(0,0,0,0.7)","rgba(0,0,0,0)",256)),O=new Ie(t(new Nt(E*2+2.4,P*2+2.4)),t(new bt({map:v,transparent:!0,depthWrite:!1})));O.rotation.x=-Math.PI/2,O.position.y=.005,this.root.add(O),this.root.add(this.baseGroup),this.apertureGroup.position.set(-35,0,-12),this.apertureGroup.rotation.y=.45,this.apertureGroup.scale.setScalar(2.4);const V=new Ie(t(new Tn(2.6,.5,1.2,3,.1)),a);V.position.y=-.15,this.apertureGroup.add(V);const Y=new Ie(t(new gi(1.55,.13,16,96)),r);Y.position.y=1.85,this.apertureGroup.add(Y);const fe=new Ie(t(new gi(1.3,.04,8,96)),a);fe.position.y=1.85,this.apertureGroup.add(fe);const me=t(new ei(.34,.12,.16));this.apertureLights=new Rn(me,t(new bt({color:16777215})),Ws);for(let ie=0;ie<Ws;ie++){const ee=Math.PI/2+((ie+.5)/Ws-.5)*Math.PI*1.7;this.apertureLights.setMatrixAt(ie,Is(Math.cos(ee)*1.78,1.85+Math.sin(ee)*1.78,.02,0,0,ee+Math.PI/2)),this.apertureLights.setColorAt(ie,new Ee(1053983)),this.apertureSegments.push(0)}this.apertureGroup.add(this.apertureLights);const $=new vs;$.moveTo(0,0),$.absarc(0,0,1.32,0,Math.PI/3+.05,!1),$.lineTo(0,0);const j=t(new Ri($,16)),ge=t(new ut({color:2372175,metalness:.6,roughness:.35,side:on}));for(let ie=0;ie<6;ie++){const ee=new Ie(j,ge);ee.position.set(0,1.85,.01),ee.rotation.z=ie/6*Math.PI*2,this.apertureGroup.add(ee),this.apertureIris.push(ee)}this.apertureCoreMat=t(new bt({color:new Ee(6937296).multiplyScalar(2.4),transparent:!0,opacity:0,depthWrite:!1})),this.apertureCore=new Ie(t(new Js(1.3,48)),this.apertureCoreMat),this.apertureCore.position.set(0,1.85,-.02),this.apertureGroup.add(this.apertureCore),this.root.add(this.apertureGroup)}combatFitPoints(){const e=[],t=Xr.spawnRadius+.8;for(let n=0;n<48;n++){const s=n/48*Math.PI*2;e.push(new C(Math.cos(s)*t,0,Math.sin(s)*t),new C(Math.cos(s)*t,1.3,Math.sin(s)*t))}return e}get rangeVisible(){return{level:this.rangeLevel,radius:this.rangeRadius}}setLocked(e){e.forEach((t,n)=>this.lockCovers[n].visible=t)}setRange(e,t=6937296){if(e===null){this.rangeTarget=0;return}this.rangeTarget=1,this.rangeRadius=e,this.rangeMat.color.setHex(t),this.rangeFillMat.color.setHex(t)}setProgress(e){this.progress=e}openAperture(e){this.apertureOpenTarget=e?1:0}setSoul(e,t){this.soulLift=e,this.soulFade=t}emitterPulse(e=1){this.pulse=Math.max(this.pulse,e)}baseHit(e){this.warnLevel=Math.min(1,this.warnLevel+.5+e/20),this.baseShake=Math.min(1,.4+e/14),this.baseShakeAge=0}setSocketHalo(e,t,n){const s=this.sockets[e];s.haloTarget=t,s.haloColor.setHex(n)}clearHalos(){for(const e of this.sockets)e.haloTarget=0}reset(){this.warnLevel=0,this.baseShake=0,this.apertureOpen=0,this.apertureOpenTarget=0,this.progress=0,this.soulLift=0,this.soulFade=1,this.pulse=0,this.clearHalos()}update(e,t,n){this.warnLevel=Math.max(0,this.warnLevel-t*1.6),this.warnMat.opacity=this.warnLevel*.75,this.baseShakeAge+=t;const s=Math.max(0,1-this.baseShakeAge/.35),r=this.baseShake*s*s;this.baseGroup.position.set(Math.sin(this.baseShakeAge*70)*.05*r,-.04*r,Math.cos(this.baseShakeAge*55)*.03*r),this.rangeLevel+=(this.rangeTarget-this.rangeLevel)*(1-Math.exp(-e*14));const a=this.rangeLevel>.01;if(this.rangeRing.visible=this.rangeFill.visible=a,a){const c=this.rangeRadius;this.rangeRing.scale.set(c,c,1),this.rangeFill.scale.set(c,c,1),this.rangeMat.opacity=.85*this.rangeLevel,this.rangeFillMat.opacity=.07*this.rangeLevel}this.flames.forEach((c,h)=>{const d=1+Math.sin(n*11+h*2.1)*.08+Math.sin(n*23+h)*.05;c.scale.set(1,d,1),this.candleLights[h].intensity=30*d}),this.pulse=Math.max(0,this.pulse-t*5);const o=.5+.5*Math.sin(n*1.7);this.emitterMat.emissiveIntensity=(1.6+o*.6+this.pulse*3.5)*this.soulFade,this.emitterLight.intensity=(1.4+this.pulse*3)*this.soulFade;const l=1+this.pulse*.35;this.emitter.scale.setScalar(l*(.4+.6*this.soulFade)),this.emitter.position.y=Wt.y+this.soulLift*3.5+Math.sin(n*1.3)*.03,this.emitterLight.position.copy(this.emitter.position);for(const c of this.sockets)c.haloLevel+=(c.haloTarget-c.haloLevel)*(1-Math.exp(-e*12)),c.haloMat.opacity=c.haloLevel*(.55+.25*Math.sin(n*6)),c.halo.visible=c.haloLevel>.01,c.haloMat.color.copy(c.haloColor);for(let c=0;c<this.apertureSegments.length;c++){const d=(c<this.progress?1:0)*(.85+.15*Math.sin(n*2+c))+this.apertureOpen*.6;this.apertureSegments[c]+=(d-this.apertureSegments[c])*(1-Math.exp(-e*4)),this.segColor.copy(na.SEG_OFF).lerp(na.SEG_ON,this.apertureSegments[c]),this.apertureLights.setColorAt(c,this.segColor)}this.apertureLights.instanceColor&&(this.apertureLights.instanceColor.needsUpdate=!0),this.apertureOpen+=(this.apertureOpenTarget-this.apertureOpen)*(1-Math.exp(-e*1.6)),this.apertureIris.forEach((c,h)=>{const d=h/6*Math.PI*2,u=this.apertureOpen*1.25;c.position.set(Math.cos(d+.5)*u,1.85+Math.sin(d+.5)*u,.01),c.scale.setScalar(1-this.apertureOpen*.75)}),this.apertureCoreMat.opacity=.15+this.apertureOpen*.85}dispose(){for(const e of this.disposables)e.dispose();this.disposables.length=0}}function eh(i,e,t){const n=new vs,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function G_(i,e,t){const n=i.attributes.uv;for(let s=0;s<n.count;s++)n.setXY(s,(n.getX(s)+e/2)/e,(n.getY(s)+t/2)/t)}const V_={tower:3820134,active:7222320,passive:6967348};class W_{constructor(e){this.renderer=e;const t=eh(Zn,Ln,.16);this.bodyGeo=new tr(t,{depth:vi,bevelEnabled:!0,bevelThickness:.012,bevelSize:.018,bevelSegments:2,curveSegments:8}),this.bodyGeo.translate(0,0,-vi/2),this.faceGeo=new Ri(eh(Zn-.02,Ln-.02,.15),8),G_(this.faceGeo,Zn-.02,Ln-.02);const n=In(M_(),e);this.backMat=new ut({map:n,roughness:.6}),this.shadowGeo=new Nt(Zn*1.25,Ln*1.2);const s=In(ca("rgba(0,0,0,0.55)","rgba(0,0,0,0)",128),e);this.shadowMat=new bt({map:s,transparent:!0,depthWrite:!1}),this.owned.push(this.bodyGeo,this.faceGeo,n,this.backMat,this.shadowGeo,s,this.shadowMat)}renderer;bodyGeo;faceGeo;backMat;shadowGeo;shadowMat;faceMats=new Map;faceTextures=new Map;edgeMats=new Map;owned=[];face(e){let t=this.faceMats.get(e);if(!t){const n=In(x_(e),this.renderer);this.faceTextures.set(e,n),t=new ut({map:n,color:14341062,roughness:.75,metalness:0}),this.faceMats.set(e,t)}return t}edge(e){const t=an(e).type;let n=this.edgeMats.get(t);return n||(n=new ut({color:V_[t],roughness:.65,metalness:.1}),this.edgeMats.set(t,n)),n}prepare(e){for(const t of e)this.face(t),this.edge(t)}dispose(){for(const e of this.faceMats.values())e.dispose();for(const e of this.faceTextures.values())e.dispose();for(const e of this.edgeMats.values())e.dispose();for(const e of this.owned)e.dispose()}}const X_=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,q_=`
precision highp float;
varying vec2 vUv;
uniform float uCharge;
uniform float uPulse;
uniform float uTime;
uniform float uSelect;
uniform float uDim;
uniform float uShade;
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

  // optional darkening (unaffordable cards in hand): premultiplied black over the face
  float shade = uShade * inside * (1.0 - a);
  gl_FragColor = vec4((color + emissive) * uDim, a + shade);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function cu(i,e){const t={uCharge:{value:0},uPulse:{value:0},uTime:{value:0},uSelect:{value:0},uDim:{value:1},uShade:{value:0},uSize:{value:new re(i,e)},uRadius:{value:.16},uTint:{value:new Ee(3122588)},uHot:{value:new Ee(9434602)},uSelectColor:{value:new Ee(15914906)}},n=new Tt({uniforms:t,vertexShader:X_,fragmentShader:q_,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,toneMapped:!0});return n.name="cardCharge",n}const th=new ln().setFromEuler(new $t(-Math.PI/2,0,0));class Y_{constructor(e){this.assets=e}assets;root=new Zt;cards=new Map;dimLevel=1;create(e){const t=`w${e.id}`,n=new Zt,s=new Ie(this.assets.bodyGeo,this.assets.edge(e.defId));s.castShadow=!0,s.receiveShadow=!0;const r=new Ie(this.assets.faceGeo,this.assets.face(e.defId));r.position.z=vi/2+.013,r.receiveShadow=!0;const a=cu(Zn-.02,Ln-.02),o=new Ie(this.assets.faceGeo,a);o.position.z=vi/2+.018,o.renderOrder=2;const l=new Ie(this.assets.shadowGeo,this.assets.shadowMat);l.position.z=-vi/2-.004,l.renderOrder=1,n.add(l,s,r,o),s.userData.cardKey=t,r.userData.cardKey=t,n.quaternion.copy(th),this.root.add(n);const c={key:t,defId:e.defId,instanceId:e.id,slot:e.slot,group:n,body:s,overlayMat:a,mode:"socket",pos:new C,vel:new C,target:new C,select:0,selectTarget:0,lastFireAt:-100,life:0,landed:!0};return this.cards.set(t,c),c}destroy(e){this.root.remove(e.group),e.overlayMat.dispose(),this.cards.delete(e.key)}socketTarget(e){const t=Qn(e);return new C(t.x,e_,t.z)}syncEquipped(e,t=!1,n){const s=new Set;for(const r of e){if(!r)continue;s.add(r.id);let a=this.cards.get(`w${r.id}`);if(!a&&(a=this.create(r),a.pos.copy(this.socketTarget(r.slot)),!t)){a.pos.y+=3.2,a.landed=!1;const o=r.slot;a.onLand=()=>n?.(o)}a.mode==="socket"&&(a.slot=r.slot,a.target.copy(this.socketTarget(r.slot)))}for(const r of[...this.cards.values()])!s.has(r.instanceId)&&r.mode==="socket"&&(r.mode="discard",r.life=0,r.target.set(r.pos.x,r.pos.y+2.4,r.pos.z-.6))}equippedView(e){return this.cards.get(`w${e}`)}onFire(e,t){const n=this.equippedView(e);n&&(n.lastFireAt=t)}setHover(e){for(const t of this.cards.values())t.selectTarget=t.key===e?.8:0}setDim(e){this.dimLevel=e}pickables(){const e=[];for(const t of this.cards.values())t.mode==="socket"&&e.push(t.body);return e}cardByObject(e){const t=e.userData.cardKey;return t?this.cards.get(t):void 0}update(e,t,n){const s=Math.min(e,.1);for(const r of[...this.cards.values()]){const a=r.mode==="discard"?60:330,o=r.mode==="discard"?10:23,l=Math.max(1,Math.ceil(s/(1/240))),c=s/l;for(let m=0;m<l;m++)r.vel.x+=(-(r.pos.x-r.target.x)*a-r.vel.x*o)*c,r.vel.y+=(-(r.pos.y-r.target.y)*a-r.vel.y*o)*c,r.vel.z+=(-(r.pos.z-r.target.z)*a-r.vel.z*o)*c,r.pos.addScaledVector(r.vel,c);r.select+=(r.selectTarget-r.select)*(1-Math.exp(-s*14));const h=t-r.lastFireAt,d=h>=0&&h<.3?1-h/.3:0,u=h>=0&&h<.22?Math.sin(h/.22*Math.PI):0;r.group.position.copy(r.pos),r.group.position.y-=u*.035,r.group.quaternion.copy(th),u>0&&r.group.quaternion.multiply(new ln().setFromEuler(new $t(-u*.05,0,0)));const f=r.overlayMat.uniforms;if(f.uTime.value=t,f.uSelect.value=r.select,f.uDim.value=this.dimLevel,f.uCharge.value=r.mode==="socket"?n.get(r.instanceId)??0:0,f.uPulse.value=r.mode==="socket"?d:0,r.mode==="socket"&&!r.landed&&r.pos.distanceTo(r.target)<.05&&(r.landed=!0,r.onLand?.(),r.onLand=void 0),r.mode==="discard"){r.life+=s;const m=Math.min(1,r.life/.45);r.group.scale.setScalar(1-m*m),m>=1&&this.destroy(r)}}}reset(){for(const e of[...this.cards.values()])this.destroy(e)}liveCount(){return this.cards.size}dispose(){this.reset()}}const Vn=600,$_={echo:1.4,moth:1.6,urn:1.4},pn=new nt,nh=new nt,ih=new nt,sh=new ln,rh=new $t,Xs=new C,ia=new C,Ka=new Ee(1,1,1),K_=new Ee(2.4,2.1,1.9),Ds=new Ee;function bn(i,e,t,n,s,r,a,o=1,l=o,c=o){return rh.set(s,r,a,"YXZ"),sh.setFromEuler(rh),Xs.set(e,t,n),ia.set(o,l,c),i.compose(Xs,sh,ia)}class Z_{root=new Zt;arch=new Map;visuals=new Map;blob;hpBack;hpFill;blobFree=[];disposables=[];hpCount=0;constructor(e){const t=B=>(this.disposables.push(B),B),n=t(In(C_(),e)),s=t(new ut({color:15129280,map:n,roughness:.55})),r=t(In(ou(),e)),a=t(new ut({color:6965812,map:r,roughness:.7})),o=t(new ut({color:722950,roughness:.6})),l=t(new ut({color:11569738,metalness:.7,roughness:.4})),c=t(new ut({color:1841698,metalness:.35,roughness:.18,emissive:932410,emissiveIntensity:.5})),h=t(In(T_(),e)),d=t(new ut({map:h,color:16774364,emissive:2761752,roughness:.7,side:on})),u=(B,se,ae=!1)=>{t(B);const Ce=new Rn(B,se,Vn);return Ce.instanceMatrix.setUsage(mi),Ce.setColorAt(0,Ka),Ce.count=0,Ce.castShadow=!1,Ce.geometry.boundingSphere=new ti(new C(0,1,0),40),Ce.frustumCulled=!1,this.root.add(Ce),Ce},f=(B,se=20)=>new Ml(B.map(([ae,Ce])=>new re(ae,Ce)),se),m=B=>{const se=new pi(B,B*1.05,.08,20);return se.translate(0,.04,0),se},x=(B,se,ae,Ce)=>Math.abs(Math.sin(B*ae+se))*Ce,p=(B,se,ae,Ce)=>Math.sin(B*ae+se)*Ce,g=f([[.29,.08],[.27,.14],[.2,.3],[.15,.5],[.13,.6],[.18,.68],[.19,.79],[.15,.9],[.07,.96],[0,.97]]),S=new Js(.105,18);S.scale(1,1.25,1),S.translate(0,.78,.172);const w=5;this.addArch("echo",[{mesh:u(m(.32),a),local:(B,se,ae)=>bn(B,0,x(se,ae,w,.07),0,p(se,ae,w*2,.06),0,0)},{mesh:u(g,s,!0),local:(B,se,ae,Ce)=>bn(B,0,x(se,ae,w,.07),0,p(se,ae,w*2,.06)-Ce*.25,0,0,1,1-Ce*.08,1)},{mesh:u(S,o),local:(B,se,ae,Ce)=>bn(B,0,x(se,ae,w,.07),0,p(se,ae,w*2,.06)-Ce*.25,0,0,1,1-Ce*.08,1)}]);const M=new pi(.03,.04,.5,8);M.translate(0,.33,0);const T=new ds(.1,14,10);T.translate(0,.62,0);const b=new vs;b.moveTo(0,0),b.bezierCurveTo(.12,.22,.34,.3,.42,.15),b.bezierCurveTo(.45,.05,.34,0,.26,0),b.bezierCurveTo(.34,-.06,.32,-.2,.2,-.23),b.bezierCurveTo(.1,-.22,.04,-.1,0,0);const R=new Ri(b,8);{const B=R.attributes.uv;for(let se=0;se<B.count;se++)B.setXY(se,B.getX(se)/.45,(B.getY(se)+.23)/.53)}const _=8,E=(B,se,ae)=>bn(B,0,x(se,ae,_,.05),0,p(se,ae,_*2,.05),0,0),P=(B,se)=>.12+Math.sin(B*18+se*3)*.22;this.addArch("moth",[{mesh:u(m(.26),a),local:(B,se,ae)=>E(B,se,ae)},{mesh:u(M,l),local:(B,se,ae)=>E(B,se,ae)},{mesh:u(T,c,!0),local:(B,se,ae,Ce)=>E(B,se,ae).multiply(bn(pn,0,0,0,0,0,0,1-Ce*.12))},{mesh:u(R,d),local:(B,se,ae)=>E(B,se,ae).multiply(bn(pn,.02,.6,0,0,-.3,P(se,ae)))},{mesh:u(R.clone(),d),local:(B,se,ae)=>E(B,se,ae).multiply(bn(pn,-.02,.6,0,0,.3,-P(se,ae),-1,1,1))}]);const I=f([[.37,.08],[.41,.2],[.43,.36],[.35,.5],[.3,.56],[.36,.62],[.39,.74],[.31,.86],[.22,.9],[.25,.96],[0,.97]],24),F=new gi(.43,.035,6,24);F.rotateX(Math.PI/2),F.translate(0,.36,0);const z=new gi(.39,.03,6,24);z.rotateX(Math.PI/2),z.translate(0,.74,0);const U=new ds(.08,10,8);U.translate(0,1.02,0);const k=lu([F,z,U]);[F,z,U].forEach(B=>B.dispose());const K=3.4,W=(B,se,ae,Ce)=>bn(B,0,x(se,ae,K,.05),0,p(se,ae,K*2,.05)-Ce*.12,0,Math.sin(se*K+ae)*.05,1,1-Ce*.06,1);this.addArch("urn",[{mesh:u(m(.44),a),local:(B,se,ae,Ce)=>W(B,se,ae,Ce)},{mesh:u(I,s,!0),local:(B,se,ae,Ce)=>W(B,se,ae,Ce)},{mesh:u(k,l),local:(B,se,ae,Ce)=>W(B,se,ae,Ce)}]);const oe=t(In(ca("rgba(0,0,0,0.6)","rgba(0,0,0,0)",64),e)),q=t(new Nt(1,1));q.rotateX(-Math.PI/2),this.blob=new Rn(q,t(new bt({map:oe,transparent:!0,depthWrite:!1})),Vn*3),this.blob.count=0,this.blob.frustumCulled=!1,this.blob.renderOrder=1,this.root.add(this.blob);for(let B=Vn*3-1;B>=0;B--)this.blobFree.push(B);const J=t(new Nt(1,1));J.translate(.5,0,0),this.hpBack=new Rn(J,t(new bt({color:658710,transparent:!0,opacity:.8,depthWrite:!1})),Vn),this.hpFill=new Rn(J,t(new bt({color:16777215,depthWrite:!1,transparent:!0})),Vn);for(const B of[this.hpBack,this.hpFill])B.count=0,B.frustumCulled=!1,B.renderOrder=5,B.instanceMatrix.setUsage(mi),this.root.add(B);this.hpFill.setColorAt(0,Ka)}addArch(e,t){const n=[];for(let s=Vn-1;s>=0;s--)n.push(s);this.arch.set(e,{kind:e,parts:t,free:n,high:0,map:new Map})}onEvent(e){if(e.type==="damaged"){const t=this.visuals.get(e.enemyId);t&&(t.lastHitAt=e.t,t.hp=e.hp,e.source==="bell"&&(t.liftAt=e.t))}else if(e.type==="died"){const t=this.visuals.get(e.enemyId);t&&(t.diedAt=e.t,t.x=e.x,t.z=e.z)}else if(e.type==="arrived"){const t=this.visuals.get(e.enemyId);t&&(t.diedAt=e.t,t.arrived=!0,t.x=e.x,t.z=e.z)}}acquire(e,t){const n=this.arch.get(e);let s=n.map.get(t);if(s===void 0){if(s=n.free.pop(),s===void 0)return-1;n.map.set(t,s),n.high=Math.max(n.high,s+1)}return s}release(e,t){const n=this.arch.get(e),s=n.map.get(t);if(s!==void 0){n.map.delete(t),n.free.push(s);for(const r of n.parts)r.mesh.setMatrixAt(s,pn.makeScale(0,0,0)),r.mesh.instanceMatrix.needsUpdate=!0}}instanceIndexOf(e,t){return this.arch.get(e).map.get(t)}update(e,t,n,s){for(const o of this.visuals.values())o.seen=!1;for(const o of e){let l=this.visuals.get(o.id);l||(l={id:o.id,kind:o.kind,x:o.x,z:o.z,hp:o.hp,maxHp:o.maxHp,radius:o.radius,phase:o.id*2.399%(Math.PI*2),lastHitAt:-100,liftAt:-100,diedAt:null,arrived:!1,seen:!0},this.visuals.set(o.id,l)),l.seen=!0,l.x=o.prevX+(o.x-o.prevX)*t,l.z=o.prevZ+(o.z-o.prevZ)*t,l.hp=o.hp}const r=s.quaternion;let a=0;this.hpCount=0;for(const o of[...this.visuals.values()]){!o.seen&&o.diedAt===null&&(o.diedAt=n);let l=0;if(o.diedAt!==null){const b=o.arrived?.32:.42;if(l=Math.min(1,Math.max(0,(n-o.diedAt)/b)),l>=1){this.release(o.kind,o.id),this.visuals.delete(o.id);continue}}const c=this.acquire(o.kind,o.id);if(c<0)continue;const h=this.arch.get(o.kind),d=n-o.lastHitAt,u=d>=0&&d<.12?1-d/.12:0,f=Math.atan2(-o.x,-o.z),m=o.arrived?l*.6:-l*.5,x=(1-l*l)*(1+u*.06)*$_[o.kind],p=o.arrived?0:l*2.5,g=u*.08,S=-Math.sin(f)*g,w=-Math.cos(f)*g,M=n-o.liftAt,T=M>=0&&M<.45?Math.sin(M/.45*Math.PI)*.28:0;bn(nh,o.x+S,-m+T,o.z+w,0,f+p,0,x);for(const b of h.parts)b.local(ih,n,o.phase,u),pn.multiplyMatrices(nh,ih),b.mesh.setMatrixAt(c,pn),Ds.copy(Ka).lerp(K_,u),o.arrived&&Ds.lerp(new Ee(2.2,.9,.8),Math.min(1,l*1.5)),b.mesh.setColorAt(c,Ds);if(a<Vn*3){const b=o.radius*2.4*(1-l);this.blob.setMatrixAt(a++,bn(pn,o.x,.012,o.z,0,0,0,b,1,b))}if(o.diedAt===null&&o.hp<o.maxHp&&this.hpCount<Vn){const b=Math.max(0,o.hp/o.maxHp),R=o.kind==="urn"?1.75:o.kind==="moth"?1.35:1.6,_=o.kind==="urn"?1:.7;Xs.set(o.x,R,o.z);const E=new C(-_/2,0,0).applyQuaternion(r);pn.compose(Xs.clone().add(E),r,ia.set(_,.07,1)),this.hpBack.setMatrixAt(this.hpCount,pn),pn.compose(Xs.clone().add(E).add(new C(0,0,.001).applyQuaternion(r)),r,ia.set(_*b,.07,1)),this.hpFill.setMatrixAt(this.hpCount,pn),Ds.setHex(b>.5?15260856:14844276),this.hpFill.setColorAt(this.hpCount,Ds),this.hpCount++}}for(const o of this.arch.values())for(const l of o.parts)l.mesh.count=o.high,l.mesh.instanceMatrix.needsUpdate=!0,l.mesh.instanceColor&&(l.mesh.instanceColor.needsUpdate=!0);this.blob.count=a,this.blob.instanceMatrix.needsUpdate=!0,this.hpBack.count=this.hpCount,this.hpFill.count=this.hpCount,this.hpBack.instanceMatrix.needsUpdate=!0,this.hpFill.instanceMatrix.needsUpdate=!0,this.hpFill.instanceColor&&(this.hpFill.instanceColor.needsUpdate=!0)}positionOf(e){const t=this.visuals.get(e);return t?{x:t.x,z:t.z,kind:t.kind}:null}liveVisuals(){return this.visuals.size}reset(){for(const e of[...this.visuals.values()])this.release(e.kind,e.id);this.visuals.clear();for(const e of this.arch.values()){e.high=0,e.free.length=0;for(let t=Vn-1;t>=0;t--)e.free.push(t);e.map.clear();for(const t of e.parts)t.mesh.count=0}this.blob.count=0,this.hpBack.count=0,this.hpFill.count=0}dispose(){for(const e of this.arch.values())for(const t of e.parts)t.mesh.dispose();this.blob.dispose(),this.hpBack.dispose(),this.hpFill.dispose();for(const e of this.disposables)e.dispose()}}const ah=new Ee(15914906),J_=new Ee(6937296),oh=new Ee(14701631);class Q_{constructor(e){this.assets=e,this.camera=new _s(0,1,1,0,-2e3,2e3),this.camera.position.set(0,0,1e3),this.scene.add(new Ff(16773340,1.4));const t=new Go(16769720,1.8);t.position.set(-.4,.6,1),this.scene.add(t);for(const n of[this.drawPile,this.discardPile]){for(let s=0;s<4;s++){const r=new Ie(this.assets.bodyGeo,[this.assets.backMat,this.assets.backMat]);r.position.set(s*.05,s*.07,-s*.1),n.add(r),this.pileMeshes.push(r)}this.scene.add(n)}}assets;scene=new ml;camera;cards=new Map;w=1;h=1;pointer=new re(-1,-1);hoverKey=null;dragKey=null;grab=new re;raise=0;raiseTarget=0;raycaster=new Gh;drawPile=new Zt;discardPile=new Zt;drawCount=0;discardCount=0;pileMeshes=[];get cardHeight(){return ss.clamp(this.h*.23,120,250)}get cardWidth(){return this.cardHeight*(Zn/Ln)}get handTopY(){return this.h-this.cardHeight*1.15}resize(e,t){this.w=e,this.h=t,this.camera.left=0,this.camera.right=e,this.camera.top=t,this.camera.bottom=0,this.camera.updateProjectionMatrix()}toWorld(e,t){return new re(e,this.h-t)}drawPileScreen(){return{x:this.cardWidth*.7+18,y:this.h-this.cardHeight*.42}}discardPileScreen(){return{x:this.w-this.cardWidth*.7-18,y:this.h-this.cardHeight*.42}}setPiles(e,t){this.drawCount=e,this.discardCount=t}makeCard(e,t,n){const s=new Zt,r=new Ie(this.assets.bodyGeo,this.assets.edge(t)),a=new Ie(this.assets.faceGeo,this.assets.face(t));a.position.z=vi/2+.013;const o=cu(Zn-.02,Ln-.02);o.depthTest=!1;const l=new Ie(this.assets.faceGeo,o);l.position.z=vi/2+.03,r.userData.handKey=e,a.userData.handKey=e,s.add(r,a,l),this.scene.add(s);const c=this.toWorld(this.drawPileScreen().x,this.drawPileScreen().y),h={key:e,uid:n,offerIndex:null,defId:t,group:s,body:r,overlayMat:o,mode:"hand",leave:null,leaveTo:new re,life:0,delay:0,pos:c.clone(),vel:new re,target:c.clone(),rot:0,rotTarget:0,scale:.5,scaleTarget:1,z:0,restX:-1e6,restTop:1e6,select:0,selectTarget:0,selectColor:ah.clone(),shade:0,shadeTarget:0};return this.cards.set(e,h),h}remove(e){this.scene.remove(e.group),e.overlayMat.dispose(),this.cards.delete(e.key),this.hoverKey===e.key&&(this.hoverKey=null),this.dragKey===e.key&&(this.dragKey=null)}sync(e){let t=0;for(const n of e.hand){const s=`h${n.uid}`;let r=this.cards.get(s);if(r||(r=this.makeCard(s,n.defId,n.uid),r.delay=t++*.09),r.mode==="leaving")continue;const a=e.marked.has(n.uid),o=e.selected===n.uid,l=this.hoverKey===s&&e.interactive;r.selectTarget=a||o?1:l?.7:0,r.selectColor.copy(a?oh:o?J_:ah),r.shadeTarget=e.interactive&&!e.affordable(n.uid)?.45:0}for(const n of this.cards.values())n.mode==="hand"&&!e.hand.some(s=>`h${s.uid}`===n.key)&&this.leave(n,"discard")}leave(e,t,n){e.mode="leaving",e.leave=t,e.life=0;const s=t==="discard"?this.discardPileScreen():t==="play"?{x:e.pos.x,y:this.h*.42}:t==="tower"&&n?n:{x:e.pos.x,y:this.h-e.pos.y};e.leaveTo.copy(this.toWorld(s.x,s.y)),t==="burn"&&(e.selectColor.copy(oh),e.selectTarget=1)}animateLeave(e,t,n){const s=this.cards.get(`h${e}`);s&&s.mode!=="leaving"&&this.leave(s,t,n)}showOffers(e){for(const t of[...this.cards.values()])t.mode==="offer"&&this.remove(t);e&&e.forEach((t,n)=>{const s=this.makeCard(`o${n}`,t,-1);s.mode="offer",s.offerIndex=n,s.pos.copy(this.toWorld(this.w/2,this.h*.6)),s.scale=.3,s.delay=n*.08})}setPointer(e,t){this.pointer.set(e,t)}setRaised(e){this.raiseTarget=e?1:0}pick(e,t){const n=new re(e/this.w*2-1,-(t/this.h)*2+1);this.raycaster.setFromCamera(n,this.camera);const s=o=>this.raycaster.intersectObject(o.body,!1).length>0;for(const o of this.cards.values())if(o.mode==="offer"&&s(o))return{offer:o.offerIndex};const r=this.hoverKey?this.cards.get(this.hoverKey):void 0;if(r&&r.mode==="hand"&&s(r))return{uid:r.uid};const a=[...this.cards.values()].filter(o=>o.mode==="hand"&&o.key!==this.dragKey).sort((o,l)=>o.restX-l.restX);for(let o=0;o<a.length;o++){const l=a[o],c=o>0?(a[o-1].restX+l.restX)/2:l.restX-this.cardWidth/2,h=o<a.length-1?(a[o+1].restX+l.restX)/2:l.restX+this.cardWidth/2;if(e>=c&&e<h&&t>=l.restTop)return{uid:l.uid}}return null}setHover(e){this.hoverKey=e?"uid"in e?`h${e.uid}`:`o${e.offer}`:null;for(const t of this.cards.values())t.mode==="offer"&&(t.selectTarget=t.key===this.hoverKey?.8:0)}startDrag(e,t,n){const s=this.cards.get(`h${e}`);if(!s||s.mode!=="hand")return;this.dragKey=s.key,s.mode="drag";const r=this.toWorld(t,n);this.grab.set(s.pos.x-r.x,s.pos.y-r.y).multiplyScalar(.5)}dragTo(e,t){const n=this.dragKey?this.cards.get(this.dragKey):void 0;if(!n)return;const s=this.toWorld(e,t);n.target.set(s.x+this.grab.x,s.y+this.grab.y)}endDrag(){const e=this.dragKey?this.cards.get(this.dragKey):void 0;e&&e.mode==="drag"&&(e.mode="hand"),this.dragKey=null}get dragging(){return this.dragKey!==null}cardRect(e){const t=this.cards.get(`h${e}`);if(!t)return null;const n=this.cardWidth*t.scale,s=this.cardHeight*t.scale;return{x:t.pos.x-n/2,y:this.h-t.pos.y-s/2,w:n,h:s}}cardScreen(e){const t=this.cards.get(`h${e}`);return t?{x:t.target.x,y:this.h-t.target.y}:null}offerScreen(e){const t=this.cards.get(`o${e}`);return t?{x:t.target.x,y:this.h-t.target.y}:null}settled(){for(const e of this.cards.values())if(e.mode==="leaving"||e.delay>0||e.pos.distanceTo(e.target)>1.5||e.vel.length()>5)return!1;return!0}update(e){e=Math.min(e,.1),this.raise+=(this.raiseTarget-this.raise)*(1-Math.exp(-e*10));const t=this.cardHeight,n=this.cardWidth,s=[...this.cards.values()].filter(m=>m.mode==="hand"||m.mode==="drag"),r=s.length,a=Math.min(n*.86,(this.w*.5-n)/Math.max(1,r-1)),o=t*.5-t*.64,l=t*.5+10,c=o+(l-o)*this.raise;s.forEach((m,x)=>{const p=x-(r-1)/2,g=this.hoverKey===m.key;if(m.mode==="drag"){m.scaleTarget=.82,m.rotTarget=0,m.z=400;return}const S=g?t*.3*Math.max(this.raise,.6)+(1-this.raise)*t*.45:m.select>.5?t*.16:0,w=c-p*p*3;m.restX=this.w/2+p*a,m.restTop=this.h-(w+t/2),m.target.set(m.restX,w+S),m.rotTarget=g?0:-p*.045,m.scaleTarget=g?1.16:1,m.z=x*4+(g?200:0)}),[...this.cards.values()].filter(m=>m.mode==="offer").forEach(m=>{const x=m.offerIndex-1,p=this.hoverKey===m.key;m.target.copy(this.toWorld(this.w/2+x*n*1.75,this.h*.47-(p?14:0))),m.scaleTarget=p?1.62:1.5,m.rotTarget=0,m.z=600+m.offerIndex});const d=t/Ln;for(const m of[...this.cards.values()]){if(m.delay>0){m.delay-=e,this.place(m,d);continue}if(m.mode==="leaving"){m.life+=e;const M=m.leave==="burn"?.5:m.leave==="tower"?.35:.42,T=Math.min(1,m.life/M);if(m.target.copy(m.leaveTo),m.scaleTarget=m.leave==="discard"?.5:m.leave==="burn"?1-T:1-T*.9,m.rotTarget=m.leave==="burn"?.2*T:0,T>=1){this.remove(m);continue}}const x=m.mode==="drag"?900:260,p=m.mode==="drag"?55:28,g=Math.max(1,Math.ceil(e/(1/240))),S=e/g;for(let M=0;M<g;M++)m.vel.x+=(-(m.pos.x-m.target.x)*x-m.vel.x*p)*S,m.vel.y+=(-(m.pos.y-m.target.y)*x-m.vel.y*p)*S,m.pos.addScaledVector(m.vel,S);const w=1-Math.exp(-e*14);m.rot+=(m.rotTarget-m.rot)*w,m.scale+=(m.scaleTarget-m.scale)*w,m.select+=(m.selectTarget-m.select)*w,m.shade+=(m.shadeTarget-m.shade)*w,this.place(m,d)}const u=this.toWorld(this.drawPileScreen().x,this.drawPileScreen().y),f=this.toWorld(this.discardPileScreen().x,this.discardPileScreen().y);this.drawPile.position.set(u.x,u.y,-50),this.discardPile.position.set(f.x,f.y,-50);for(const[m,x]of[[this.drawPile,this.drawCount],[this.discardPile,this.discardCount]])m.scale.setScalar(d*.62),m.rotation.set(.25,0,m===this.drawPile?.05:-.05),m.children.forEach((p,g)=>p.visible=g<Math.min(4,Math.ceil(x/2)))}place(e,t){e.group.position.set(e.pos.x,e.pos.y,e.z),e.group.rotation.set(.12,0,e.rot),e.group.scale.setScalar(t*e.scale);const n=e.overlayMat.uniforms;n.uSelect.value=e.select,n.uSelectColor.value.copy(e.selectColor),n.uShade.value=e.shade,n.uCharge.value=0}reset(){for(const e of[...this.cards.values()])this.remove(e);this.hoverKey=null,this.dragKey=null}liveCount(){return this.cards.size}dispose(){this.reset(),this.pileMeshes}}const Yr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ms{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const j_=new _s(-1,1,1,-1,0,1);class ex extends vt{constructor(){super(),this.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new je([0,2,0,0,2,0],2))}}const tx=new ex;class Al{constructor(e){this._mesh=new Ie(tx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,j_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class hu extends Ms{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=nr.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Al(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class lh extends Ms{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class nx extends Ms{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ix{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new re);this._width=n.width,this._height=n.height,t=new Ot(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:qt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hu(Yr),this.copyPass.material.blending=Dn,this.timer=new kf}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}lh!==void 0&&(a instanceof lh?n=!0:a instanceof nx&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ch extends Ms{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ee}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const sx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class gs extends Ms{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new re(e.x,e.y):new re(256,256),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ot(r,a,{type:qt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Ot(r,a,{type:qt,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new Ot(r,a,{type:qt,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=sx;this.highPassUniforms=nr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new re(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=nr.clone(Yr.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader,premultipliedAlpha:!0,blending:An,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new bt,this._fsQuad=new Al(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new re(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=gs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=gs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<e;a+=2){const o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Tt({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new re(.5,.5)},direction:{value:new re(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}gs.BlurDirectionX=new re(1,0);gs.BlurDirectionY=new re(0,1);const kr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class rx extends Ms{constructor(){super(),this.isOutputPass=!0,this.uniforms=nr.clone(kr.uniforms),this.material=new zh({name:kr.name,uniforms:this.uniforms,vertexShader:kr.vertexShader,fragmentShader:kr.fragmentShader}),this._fsQuad=new Al(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===jo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===el&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ax extends ml{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new ei;e.deleteAttribute("uv");const t=new ut({side:Xt}),n=new ut,s=new Ho(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ie(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Rn(e,n,6),o=new Mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Ie(e,ts(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Ie(e,ts(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Ie(e,ts(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new Ie(e,ts(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new Ie(e,ts(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new Ie(e,ts(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ts(i){return new Cf({color:0,emissive:16777215,emissiveIntensity:i})}const hh={high:{maxPixelRatio:1.5,shadowMapSize:2048,bloom:!0,bloomStrength:.3,msaaSamples:4,particleBudget:1200,dustCount:260},low:{maxPixelRatio:1,shadowMapSize:1024,bloom:!1,bloomStrength:0,msaaSamples:0,particleBudget:500,dustCount:90}},uh={void:329743},Za=ss.degToRad(58),dh=0,ox=90,lx=3.2,cx={uniforms:{tDiffuse:{value:null},uResolution:{value:new re(1,1)},uTime:{value:0},uStrength:{value:1}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uStrength;
    varying vec2 vUv;
    float bayer(vec2 p) {
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int i = x + y * 4;
      float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
      return m[i] / 16.0 - 0.5;
    }
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 c = vUv - 0.5;
      float ca = 0.0012 * uStrength * dot(c, c) * 4.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca).b;
      // gritty afterlife grade: slightly desaturated, warm shadows
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, vec3(l), 0.18 * uStrength);
      col *= mix(vec3(1.0), vec3(1.04, 0.98, 0.9), uStrength);
      // soft posterize with ordered dither (printed look)
      float levels = 28.0;
      vec2 px = vUv * uResolution;
      col = floor(col * levels + 0.5 + bayer(px) * 0.9 * uStrength) / levels;
      // film grain + vignette
      col += (hash(px + uTime * 61.0) - 0.5) * 0.045 * uStrength;
      float v = smoothstep(0.95, 0.3, length(c * vec2(1.0, 1.15)));
      col *= mix(1.0, 0.55 + 0.45 * v, uStrength);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`};class hx{renderer;scene=new ml;camera;composer;bloom;output;stylize;handPass=null;zoom=1;pan=new re;sun;hemi;quality="high";settings=hh.high;reducedMotion=!1;envTarget;renderTarget;canvas;width=1;height=1;frustumFrom={left:-1,right:1,top:1,bottom:-1};frustumTo={left:-1,right:1,top:1,bottom:-1};frustumT=1;impulse=new re;impulseAge=1;impulseDuration=.12;impulseStrength=0;fitPoints=[];fitInsets={top:0,right:0,bottom:0,left:0};camRight=new C;camUp=new C;camPos=new C;baseLightIntensity=1.5;dimTarget=1;dim=1;constructor(e){if(this.canvas=e,this.renderer=new Bv({canvas:e,antialias:!1,powerPreference:"high-performance",alpha:!1}),!this.renderer.capabilities.isWebGL2)throw new Error("WebGL2 unavailable");this.renderer.outputColorSpace=Kt,this.renderer.toneMapping=sa,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Bs,this.renderer.setClearColor(uh.void,1),this.renderer.info.autoReset=!1,this.scene.background=new Ee(uh.void);const t=new Wo(this.renderer),n=new ax;this.envTarget=t.fromScene(n,.04),n.dispose(),t.dispose(),this.scene.environment=this.envTarget.texture,this.scene.environmentIntensity=.18,this.camera=new _s(-10,10,10,-10,1,220);const s=new C(Math.sin(dh)*Math.cos(Za),Math.sin(Za),Math.cos(dh)*Math.cos(Za));this.camera.position.copy(s.multiplyScalar(ox)),this.camera.lookAt(0,0,0),this.camera.updateMatrixWorld(),this.camRight.setFromMatrixColumn(this.camera.matrixWorld,0),this.camUp.setFromMatrixColumn(this.camera.matrixWorld,1),this.camPos.copy(this.camera.position),this.hemi=new Lf(8029858,2759184,.6),this.scene.add(this.hemi),this.sun=new Go(16767400,this.baseLightIntensity),this.sun.position.set(-8,18,7),this.sun.target.position.set(0,0,0),this.sun.castShadow=!0;const r=this.sun.shadow.camera;r.left=-7.5,r.right=7.5,r.top=7.5,r.bottom=-7.5,r.near=4,r.far=40,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.025,this.sun.shadow.radius=3,this.scene.add(this.sun,this.sun.target);const a=new Go(7311286,.35);a.position.set(10,8,-14),this.scene.add(a);const o=new Df(16763274,1100,140,.74,.65,1.3);o.position.set(0,60,8),o.target.position.set(0,0,0),this.scene.add(o,o.target),this.renderTarget=new Ot(1,1,{type:qt,samples:4}),this.renderTarget.texture.name="palimpsest.hdr",this.composer=new ix(this.renderer,this.renderTarget),this.composer.addPass(new ch(this.scene,this.camera)),this.bloom=new gs(new re(256,256),.3,.28,1.1),this.composer.addPass(this.bloom),this.output=new rx,this.composer.addPass(this.output),this.stylize=new hu(cx),this.composer.addPass(this.stylize),this.applyQuality("high")}setHandOverlay(e,t){const n=new ch(e,t);n.clear=!1,n.clearDepth=!0,this.composer.insertPass(n,1),this.handPass=n}applyQuality(e){this.quality=e,this.settings=hh[e],this.bloom.enabled=this.settings.bloom,this.bloom.strength=this.settings.bloomStrength,this.stylize.uniforms.uStrength.value=e==="high"?1:.6;const t=this.settings.shadowMapSize;this.sun.shadow.mapSize.x!==t&&(this.sun.shadow.mapSize.set(t,t),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null);for(const n of[this.composer.renderTarget1,this.composer.renderTarget2])n.samples!==this.settings.msaaSamples&&(n.samples=this.settings.msaaSamples,n.dispose());this.resize()}pixelRatio(){return Math.min(window.devicePixelRatio||1,this.settings.maxPixelRatio)}resize(){const e=this.canvas.getBoundingClientRect();this.width=Math.max(1,Math.round(e.width)),this.height=Math.max(1,Math.round(e.height));const t=this.pixelRatio();this.renderer.setPixelRatio(t),this.renderer.setSize(this.width,this.height,!1),this.composer.setPixelRatio(t),this.composer.setSize(this.width,this.height),this.stylize.uniforms.uResolution.value.set(this.width*t,this.height*t),this.refit(!0)}get viewport(){return{width:this.width,height:this.height}}setFit(e,t,n=!1){this.fitPoints=e,this.fitInsets=t,this.refit(n)}computeFrustum(){const e=this.fitPoints;if(e.length===0)return{left:-10,right:10,top:10,bottom:-10};let t=1/0,n=-1/0,s=1/0,r=-1/0;const a=new C;for(const S of e){a.copy(S).sub(this.camPos);const w=a.dot(this.camRight),M=a.dot(this.camUp);t=Math.min(t,w),n=Math.max(n,w),s=Math.min(s,M),r=Math.max(r,M)}const o=this.fitInsets,l=12,c=Math.max(50,this.width-o.left-o.right-l*2),h=Math.max(50,this.height-o.top-o.bottom-l*2),d=Math.min(c/(n-t),h/(r-s)),u=o.left+l+c/2,f=o.top+l+h/2,m=(t+n)/2,x=(s+r)/2,p=m-u/d,g=x+f/d;return{left:p,right:p+this.width/d,top:g,bottom:g-this.height/d}}refit(e){const t=this.computeFrustum();e?(this.frustumFrom=t,this.frustumTo=t,this.frustumT=1):(this.frustumFrom=this.currentFrustum(),this.frustumTo=t,this.frustumT=0),this.applyFrustum()}currentFrustum(){const e=ux(this.frustumT),t=this.frustumFrom,n=this.frustumTo;return{left:t.left+(n.left-t.left)*e,right:t.right+(n.right-t.right)*e,top:t.top+(n.top-t.top)*e,bottom:t.bottom+(n.bottom-t.bottom)*e}}zoomAt(e,t,n){const s=this.currentFrustum(),r=this.viewPoint(s,e,t);this.zoom=ss.clamp(this.zoom*n,1,lx);const a=this.viewPoint(s,e,t);this.pan.x+=r.x-a.x,this.pan.y+=r.y-a.y,this.clampPan(s),this.applyFrustum()}resetZoom(){this.zoom=1,this.pan.set(0,0),this.applyFrustum()}get zoomLevel(){return this.zoom}zoomed(e){const t=(e.left+e.right)/2+this.pan.x,n=(e.top+e.bottom)/2+this.pan.y,s=(e.right-e.left)/2/this.zoom,r=(e.top-e.bottom)/2/this.zoom;return{left:t-s,right:t+s,top:n+r,bottom:n-r}}viewPoint(e,t,n){const s=this.zoomed(e);return new re(s.left+t/this.width*(s.right-s.left),s.top-n/this.height*(s.top-s.bottom))}clampPan(e){const t=(e.right-e.left)/2,n=(e.top-e.bottom)/2,s=t*(1-1/this.zoom),r=n*(1-1/this.zoom);this.pan.x=ss.clamp(this.pan.x,-s,s),this.pan.y=ss.clamp(this.pan.y,-r,r)}applyFrustum(){const e=this.zoomed(this.currentFrustum());let t=0,n=0;if(this.impulseAge<this.impulseDuration&&!this.reducedMotion){const s=1-this.impulseAge/this.impulseDuration,r=Math.sin(this.impulseAge*90)*s*s*this.impulseStrength;t=this.impulse.x*r,n=this.impulse.y*r}this.camera.left=e.left+t,this.camera.right=e.right+t,this.camera.top=e.top+n,this.camera.bottom=e.bottom+n,this.camera.updateProjectionMatrix()}kick(e,t=110){if(this.reducedMotion)return;const n=Math.random()*Math.PI*2;this.impulse.set(Math.cos(n),Math.sin(n)),this.impulseStrength=Math.max(this.impulseAge<this.impulseDuration?this.impulseStrength:0,e),this.impulseDuration=ss.clamp(t,80,140)/1e3,this.impulseAge=0}setDim(e){this.dimTarget=e}update(e){this.stylize.uniforms.uTime.value=(this.stylize.uniforms.uTime.value+e)%1e3,this.frustumT<1&&(this.frustumT=Math.min(1,this.frustumT+e/.55)),this.impulseAge+=e,this.applyFrustum(),this.dim+=(this.dimTarget-this.dim)*(1-Math.exp(-e*5)),this.sun.intensity=this.baseLightIntensity*this.dim,this.hemi.intensity=.55*(.7+.3*this.dim)}render(){this.composer.render()}project(e){const t=e.clone().project(this.camera);return{x:(t.x*.5+.5)*this.width,y:(-t.y*.5+.5)*this.height}}dispose(){this.composer.dispose(),this.renderTarget.dispose(),this.envTarget.dispose(),this.bloom.dispose(),this.output.dispose(),this.stylize.dispose(),this.handPass?.dispose(),this.sun.shadow.map?.dispose(),this.renderer.dispose()}}function ux(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}function dx(i){if(!new URLSearchParams(location.search).has("dev"))return;const t=()=>i.rig.renderer.domElement.getBoundingClientRect(),n=a=>{const o=i.rig.project(a),l=t();return{x:Math.round(o.x+l.left),y:Math.round(o.y+l.top)}},s=a=>{if(!a)return null;const o=t();return{x:Math.round(a.x+o.left),y:Math.round(a.y+o.top)}},r={snapshot(){const a=i.controller,o=a.sim;return{phase:a.phase,suspended:a.suspended,seed:a.seed,tick:o.tick,simTime:o.simTime,trialIndex:o.trialIndex,trialTime:o.trialTime,clearing:o.clearing,hp:o.baseHp,kills:o.kills,arrivals:o.arrivals,spawnProgress:o.spawnProgress,damageBonus:o.damageBonus,speedFactor:o.speedFactor,locked:[...o.locked],enemies:o.enemies.map(l=>({id:l.id,kind:l.kind,x:l.x,z:l.z,hp:l.hp})),projectiles:o.projectiles.map(l=>({id:l.id,x:l.x,z:l.z,life:l.life})),slots:o.slots.map(l=>l?{id:l.id,defId:l.defId,slot:l.slot,elapsed:l.elapsed,charge:Yo(l),shots:l.shots}:null),turn:a.turn?JSON.parse(JSON.stringify(a.turn)):null,hand:a.deck.hand.map(l=>({...l})),drawPile:a.deck.drawPile.length,discard:a.deck.discard.length,deckSize:a.deck.size,transitions:a.transitions}},start(a){i.start(a)},restart(a){i.restart(a)},advanceTicks(a){i.advanceTicks(a)},skipToTrialEnd(a=.5){const o=i.controller.sim;o.trialTime=Math.max(o.trialTime,o.trial.durationSeconds-a)},setTrial(a){i.controller.sim.trialIndex=a},setHp(a){i.controller.sim.baseHp=a},unlockAll(){const a=i.controller.sim;for(let o=0;o<6;o++)a.unlockSlot(o);i.board.setLocked(a.locked)},giveCard(a){return i.controller.deck.addToHand(a).uid},install(a,o,l=0){const c=i.controller.sim.installWeapon(a,o);return c.elapsed=l*Yt[o].interval,i.cards.reset(),i.cards.syncEquipped(i.controller.sim.slots,!0),c.id},spawn(a,o,l,c=1){return i.controller.sim.spawnEnemy(a,o,l,c).id},chargeFixture(a=[0,.25,.5,.75,.95,1]){i.restart(4242),r.unlockAll(),i.controller.endTurn();const o=i.controller.sim;o.spawningEnabled=!1;const l=["needle","light","thread","bell"];a.forEach((c,h)=>{const d=o.installWeapon(h,l[h%4]);d.elapsed=c*Yt[l[h%4]].interval}),i.cards.reset(),i.cards.syncEquipped(o.slots,!0),i.controller.pause(),i.capture=!0,document.body.classList.add("capture")},stressFixture(a=300){i.restart(777),r.unlockAll(),i.controller.endTurn();const o=i.controller.sim;o.spawningEnabled=!1,["needle","light","thread","bell","needle","thread"].forEach((c,h)=>o.installWeapon(h,c)),i.cards.reset(),i.cards.syncEquipped(o.slots,!0);for(let c=0;c<a;c++){const h=c/a*Math.PI*2*7.3,d=10+c%13*1,u=o.spawnEnemy(qc[c%3],Math.cos(h)*d,Math.sin(h)*d,1);u.hp=u.maxHp=u.maxHp*40}o.baseHp=1e5},attackPose(a=1,o=3,l=51){i.restart(l),r.unlockAll(),i.controller.endTurn();const c=i.controller.sim;c.spawningEnabled=!1,c.baseHp=1e5,["needle","light","thread","bell","needle","thread"].forEach((f,m)=>c.installWeapon(m,f)),i.cards.reset(),i.cards.syncEquipped(c.slots,!0);for(let f=0;f<60;f++){const m=f*.41+.4,x=6.5+f%7*1.4,p=c.spawnEnemy(qc[f%3],Math.cos(m)*x,Math.sin(m)*x,1);p.hp=p.maxHp=p.maxHp*12,p.speed=.05}const d=c.slots[a];let u=0;for(;u++<3e3&&(i.advanceTicks(1),!(d.shots>=1&&Math.round(d.elapsed/(1/60))===o)););return i.capture=!0,document.body.classList.add("capture"),{ticks:c.tick,shots:d.shots}},settle(a=1){for(let o=0;o<a;o+=1/60)i.update(0,1/60)},setCapture(a){i.capture=a,document.body.classList.toggle("capture",a)},handSettled(){return i.hand.settled()},handCardScreen(a){return s(i.hand.cardScreen(a))},offerScreen(a){return s(i.hand.offerScreen(a))},endTurnScreen(){const a=document.getElementById("btn-end-turn").getBoundingClientRect();return{x:Math.round(a.left+a.width/2),y:Math.round(a.top+a.height/2)}},socketScreen(a){const o=Qn(a);return n(new C(o.x,wt,o.z))},cardScreen(a){const o=i.controller.sim.slots[a],l=o?i.cards.equippedView(o.id):void 0;return l?n(l.group.position):null},cardFacePixels(a){const o=Qn(a),l=Zn/2,c=Ln/2,h=n(new C(o.x-l,wt,o.z+c)),d=n(new C(o.x+l,wt,o.z+c)),u=n(new C(o.x,wt,o.z-c)),f=n(new C(o.x,wt,o.z+c));return{width:Math.hypot(d.x-h.x,d.y-h.y),height:Math.hypot(u.x-f.x,u.y-f.y)}},frustum(){const a=i.rig.camera;return{left:+a.left.toFixed(4),right:+a.right.toFixed(4),top:+a.top.toFixed(4),bottom:+a.bottom.toFixed(4),zoom:i.rig.zoomLevel}},resources(){const a=i.rig.renderer.info;return{geometries:a.memory.geometries,textures:a.memory.textures,programs:a.programs?.length??0,calls:a.render.calls,triangles:a.render.triangles,listeners:i.listenerCount,voices:i.audio.activeVoices,cards:i.cards.liveCount(),handCards:i.hand.liveCount(),enemyVisuals:i.enemies.liveVisuals(),effects:{...i.effects.stats},loops:i.loops,sceneChildren:i.rig.scene.children.length}},perf(){const a=i.frameTimes.slice(-240),o=i.simRate(),l=[...a].sort((h,d)=>h-d),c=a.reduce((h,d)=>h+d,0)/Math.max(1,a.length);return{frames:a.length,simSecondsPerWallSecond:o,avgMs:+c.toFixed(2),p95Ms:+(l[Math.floor(l.length*.95)]??0).toFixed(2),maxMs:+(l[l.length-1]??0).toFixed(2),updateMs:+(i.cpuTimes.reduce((h,d)=>h+d[0],0)/Math.max(1,i.cpuTimes.length)).toFixed(2),renderSubmitMs:+(i.cpuTimes.reduce((h,d)=>h+d[1],0)/Math.max(1,i.cpuTimes.length)).toFixed(2),dpr:i.rig.renderer.getPixelRatio(),quality:i.rig.quality,viewport:i.rig.viewport}},setQuality(a){i.setQuality(a)},simulateHidden(){i.input.cancelDrag("hidden"),i.controller.suspend()}};window.__PALIMPSEST__=r,window.__PALIMPSEST_APP__=i}class fx{rig;board;assets;cards;hand;enemies;effects;audio=new jv;hud;input;controller;clock=new qv;capture=!1;frameTimes=[];cpuTimes=[];rateHistory=[];loops=0;lastNow=null;lastRenderSimTime=0;presentTime=0;listeners=[];soulLift=0;soulFade=1;disposed=!1;hoverHandUid=null;hoverOffer=null;hoverSocketCard=null;hoverSlot=null;constructor(e,t){this.rig=new hx(e),this.board=new na(this.rig.renderer),this.assets=new W_(this.rig.renderer),this.assets.prepare(Qh),this.cards=new Y_(this.assets),this.hand=new Q_(this.assets),this.enemies=new Z_(this.rig.renderer),this.effects=new O_(this.rig.renderer,12648430),this.rig.scene.add(this.board.root,this.enemies.root,this.cards.root,this.effects.root),this.rig.setHandOverlay(this.hand.scene,this.hand.camera),this.controller=new Jv(qa()),this.hud=new H_(t,{start:()=>this.start(),pause:()=>this.controller.pause(),resume:()=>this.resume(),toggleMute:()=>this.audio.setMuted(!this.audio.muted),setVolume:r=>this.audio.setVolume(r),toggleQuality:()=>this.setQuality(this.rig.quality==="high"?"low":"high"),restart:()=>this.restart(),endTurn:()=>this.endTurn(),sacrifice:()=>this.controller.sacrifice(),purge:()=>this.controller.purge(),clearMarks:()=>this.controller.clearMarks(),confirmReplace:()=>this.controller.confirmReplace(),cancel:()=>this.cancel()}),this.input=new z_(e,this.rig,this.board,this.cards,this.hand,()=>this.controller,{play:(r,a)=>this.play(r,a),select:r=>{this.controller.select(r)&&r!==null&&this.audio.cardPick()},toggleMark:r=>{this.controller.toggleMark(r)&&this.audio.cardPick()},chooseOffer:r=>this.controller.chooseOffer(r),hoverHand:(r,a)=>{this.hoverHandUid=r,this.hoverOffer=a},hoverSocketCard:r=>{this.hoverSocketCard=r,this.cards.setHover(r?r.key:null)},hoverSocket:r=>this.hoverSlot=r,hoverSound:()=>this.audio.cardHover(),pickSound:()=>this.audio.cardPick(),returnSound:()=>this.audio.cardReturn()}),this.controller.on(r=>this.onControllerEvent(r));const n=(r,a,o,l)=>{r.addEventListener(a,o,l),this.listeners.push(()=>r.removeEventListener(a,o,l))};n(window,"resize",()=>this.onResize()),n(window,"blur",()=>this.input.cancelDrag("blur")),n(document,"visibilitychange",()=>this.onVisibility()),n(window,"keydown",r=>this.onKey(r));const s=window.matchMedia("(prefers-reduced-motion: reduce)");this.rig.reducedMotion=s.matches,n(s,"change",()=>this.rig.reducedMotion=s.matches),this.onResize(),this.board.setLocked(this.controller.sim.locked),this.loops++,this.rig.renderer.setAnimationLoop(r=>this.frame(r)),this.hud.focusPrimary("TITLE")}get listenerCount(){return this.listeners.length}start(e=Number(new URLSearchParams(location.search).get("seed"))||qa()){this.audio.unlock(),this.controller.startRun(e),this.audio.phase("start")}restart(e=qa()){this.input.cancelDrag("restart"),this.audio.unlock(),this.controller.startRun(e)}resume(){this.audio.unlock(),this.controller.resume()&&(this.lastNow=null)}endTurn(){this.input.cancelDrag("endturn"),this.controller.endTurn()&&this.audio.phase("resume")}play(e,t){const n=this.controller.playCard(e,t);return n==="noEnergy"?this.hud.toast("Not enough energy."):n==="locked"?this.hud.toast("That socket is locked."):n==="invalid"&&t!==void 0&&this.hud.toast(this.controller.deck.inHand(e)&&Yn(this.controller.deck.inHand(e).defId)?"Towers go into open sockets.":"Choose a placed tower."),n}cancel(){this.input.cancelDrag("escape");const e=this.controller.turn;e&&(e.stage==="confirmReplace"||e.stage==="targeting"?this.controller.cancel():e.marked.length&&this.controller.clearMarks())}setQuality(e){this.rig.applyQuality(e),this.effects.setQuality(this.rig.settings.particleBudget,this.rig.settings.dustCount),this.input.cancelDrag("quality"),this.applyFit()}socketScreen(e){const t=Qn(e);return this.rig.project(new C(t.x,wt,t.z))}onControllerEvent(e){const t=this.controller.sim;switch(e.type){case"runStarted":this.audio.stopAll(),this.cards.reset(),this.hand.reset(),this.enemies.reset(),this.effects.reset(),this.board.reset(),this.board.setLocked(t.locked),this.clock.reset(),this.lastRenderSimTime=0,this.soulLift=0,this.soulFade=1;break;case"phase":this.onPhase(e.from,e.to);break;case"turnStarted":this.audio.cardPick();break;case"cardPlayed":{const n=an(e.card.defId);if(n.type==="tower"&&e.slot!==null){this.hand.animateLeave(e.card.uid,"tower",this.socketScreen(e.slot));const s=Qn(e.slot);this.cards.syncEquipped(t.slots,!1,()=>{this.effects.landing(new C(s.x,wt,s.z)),this.audio.cardPlace()})}else{if(this.hand.animateLeave(e.card.uid,"play"),this.audio.boon(),this.board.emitterPulse(1),n.type!=="tower"&&n.effect.kind==="charge"&&e.slot!==null){const s=Qn(e.slot);this.effects.landing(new C(s.x,wt,s.z))}n.type!=="tower"&&n.effect.kind==="blast"&&this.hud.toast("Ash will scatter when the wave begins.")}break}case"sacrificed":for(const n of e.cards)this.hand.animateLeave(n.uid,"burn");this.hand.showOffers(e.offers),this.audio.baseHit();break;case"offerChosen":this.hand.showOffers(null),this.audio.boon();break;case"purged":this.hand.animateLeave(e.card.uid,"burn"),this.audio.enemyDeath("urn");break;case"handDiscarded":for(const n of e.cards)this.hand.animateLeave(n.uid,"discard");break;case"suspended":this.input.cancelDrag("suspend");break}}onPhase(e,t){const n=t==="COMBAT"||t==="CLEARING";this.audio.setCombatActive(n),this.effects.setFrozen(!n),t==="TURN"&&e==="COMBAT"&&(this.audio.phase("draft"),this.board.setProgress(this.controller.sim.trialIndex+1)),t==="CLEARING"&&(this.audio.phase("clearing"),this.hud.toast("No more spawns. Lay the remaining echoes to rest.",3.5)),t==="DEFEAT"&&(this.audio.phase("defeat"),this.effects.ceremony("defeat"),this.input.cancelDrag("defeat"),this.hand.reset()),t==="VICTORY"&&(this.audio.phase("victory"),this.board.setProgress(8),this.board.openAperture(!0),this.effects.ceremony("victory"))}onSimEvent(e){switch(this.enemies.onEvent(e),this.effects.onSimEvent(e,t=>{const n=this.cards.equippedView(t);return n?n.group.position.clone().setY(n.group.position.y+.05):null}),e.type){case"fired":this.cards.onFire(e.weaponId,e.t),this.board.emitterPulse(e.defId==="needle"?.5:1),this.audio.weapon(e.defId),e.defId==="light"&&this.rig.kick(.08,100),e.defId==="bell"&&this.rig.kick(.05,120);break;case"died":this.audio.enemyDeath(e.kind);break;case"baseDamaged":this.board.baseHit(e.amount),this.audio.baseHit(),this.rig.kick(.14,130);break}}step=()=>{const e=this.controller.sim,t=e.step();for(const n of e.drainEvents())this.onSimEvent(n);return t};advanceTicks(e){for(let t=0;t<e&&this.controller.isRunning();t++)this.controller.handleOutcome(this.step());this.clock.reset()}onVisibility(){document.hidden&&(this.input.cancelDrag("hidden"),this.controller.suspend(),this.audio.setCombatActive(!1)),this.lastNow=null,this.clock.reset()}onResize(){this.input.cancelDrag("resize"),this.rig.resize();const e=this.rig.viewport;this.hand.resize(e.width,e.height),this.applyFit()}applyFit(){this.rig.setFit(this.board.combatFitPoints(),this.hud.insets(),!0)}onKey(e){if(e.target instanceof HTMLInputElement)return;const t=this.controller,n=e.key.toLowerCase();if(n==="escape"){t.phase==="TURN"?this.cancel():t.phase==="COMBAT"||t.phase==="CLEARING"?t.pause():t.phase==="PAUSED"&&this.resume();return}n==="p"?t.phase==="PAUSED"||t.suspended?this.resume():t.pause():n==="m"?this.audio.setMuted(!this.audio.muted):n==="q"?this.setQuality(this.rig.quality==="high"?"low":"high"):n==="z"?this.rig.resetZoom():n==="e"&&t.phase==="TURN"&&this.endTurn()}updateRangePreview(){const e=this.controller,t=e.turn;let n=null;if(this.hoverSocketCard?n=this.hoverSocketCard.defId:t&&t.selected!==null&&e.deck.inHand(t.selected)&&Yn(e.deck.inHand(t.selected).defId)?n=e.deck.inHand(t.selected).defId:this.hoverHandUid!==null&&e.deck.inHand(this.hoverHandUid)&&Yn(e.deck.inHand(this.hoverHandUid).defId)&&(n=e.deck.inHand(this.hoverHandUid).defId),n&&n in Yt){const s=Yt[n];this.board.setRange(s.pulseRadius??s.range,s.pattern==="pulse"?15245434:6937296)}else this.board.setRange(null)}updateHalos(){const e=this.controller,t=e.turn,n=t&&t.selected!==null?t.selected:this.input.isDragging?this.dragUid():null;for(const s of this.board.sockets){if(n===null||!e.validTarget(n,s.slot)||e.phase!=="TURN"){this.board.setSocketHalo(s.slot,0,6937296);continue}const r=!!e.sim.slots[s.slot],a=Yn(e.deck.inHand(n).defId);this.board.setSocketHalo(s.slot,this.hoverSlot===s.slot?1:.4,a&&r?14856308:6937296)}t?.stage==="confirmReplace"&&t.pendingSlot!==null&&this.board.setSocketHalo(t.pendingSlot,1,14708828)}dragUid(){return this.input.draggedUid}updateTooltip(){const e=this.controller;if(this.hoverOffer!==null&&e.turn?.offers){const t=e.turn.offers[this.hoverOffer],n=this.hand.offerScreen(this.hoverOffer);n&&this.hud.setTooltip($a(t),{x:n.x-this.hand.cardWidth*.8,y:n.y-this.hand.cardHeight*.8,w:this.hand.cardWidth*1.6,h:this.hand.cardHeight*1.6});return}if(this.hoverHandUid!==null&&!this.input.isDragging){const t=e.deck.inHand(this.hoverHandUid),n=this.hand.cardRect(this.hoverHandUid);if(t&&n){this.hud.setTooltip($a(t.defId),n);return}}if(this.hoverSocketCard){const t=this.hoverSocketCard,n=e.sim.slots[t.slot],s=this.rig.project(t.group.position),r=n?`<dl><dt>Charge</dt><dd>${Math.round(Yo(n)*100)}%</dd><dt>Socket</dt><dd>${t.slot+1} (no effect on combat)</dd></dl>`:"";this.hud.setTooltip($a(t.defId,r),{x:s.x-30,y:s.y-40,w:60,h:80});return}this.hud.setTooltip(null)}simRate(){const e=this.rateHistory;if(e.length<2)return 0;const[t,n]=e[0],[s,r]=e[e.length-1];return s>t?+((r-n)/(s-t)).toFixed(3):0}frame(e){if(this.disposed)return;const t=e/1e3,n=this.lastNow===null?0:t-this.lastNow;this.lastNow=t;const s=Math.min(Math.max(n,0),.1);if(n>0&&(this.frameTimes.push(n*1e3),this.frameTimes.length>600&&this.frameTimes.shift()),this.controller.isRunning())for(this.rateHistory.push([t,this.controller.sim.simTime]);this.rateHistory.length>2&&t-this.rateHistory[0][0]>10;)this.rateHistory.shift();else this.rateHistory.length=0;const r=performance.now();this.update(this.capture?0:s,this.capture?0:s);const a=performance.now();this.rig.renderer.info.reset(),this.rig.render();const o=performance.now();this.cpuTimes.push([a-r,o-a]),this.cpuTimes.length>240&&this.cpuTimes.shift()}update(e,t){const n=this.controller,s=this.clock.advance(e,n.isRunning(),this.step);s!=="continue"&&n.handleOutcome(s),this.presentTime+=t;const r=n.sim,a=n.isRunning()&&!this.capture?this.clock.alpha:1,o=Math.max(0,r.simTime-(1-a)*Ei),l=Math.max(0,o-this.lastRenderSimTime);this.lastRenderSimTime=o,n.phase==="VICTORY"&&(this.soulLift=Math.min(1,this.soulLift+t*.35)),n.phase==="DEFEAT"&&(this.soulFade=Math.max(.05,this.soulFade-t*.6)),this.board.setSoul(this.soulLift,this.soulFade);const c=new Map;for(const d of r.slots)d&&c.set(d.id,Yo(d));const h=n.turn;this.hand.sync({hand:n.phase==="TURN"||n.suspended?n.deck.hand:[],marked:new Set(h?.marked??[]),selected:h?.selected??null,affordable:d=>n.canAfford(d),interactive:n.phase==="TURN"&&!n.suspended}),this.hand.setPiles(n.deck.drawPile.length,n.deck.discard.length),n.phase!=="TURN"&&this.hand.setRaised(!1),this.rig.update(t),this.board.update(t,l,this.presentTime),this.cards.update(t,o,c),this.hand.update(t),this.enemies.update(r.enemies,a,o,this.rig.camera),this.effects.setView(this.rig.camera,this.rig.viewport.height),this.effects.update(o,t,r.projectiles,a),this.rig.viewport.width>0&&this.input.refreshHover(),this.updateHalos(),this.updateRangePreview(),this.updateTooltip(),this.hud.update(this.hudState(),t)}hudState(){const e=this.controller,t=e.sim,n=e.turn,s=n&&n.selected!==null?e.deck.inHand(n.selected):void 0;return{phase:e.phase,suspended:e.suspended,pauseReason:e.pauseReason,hp:t.baseHp,waveIndex:t.trialIndex,trialTime:t.trialTime,trialDuration:t.trial.durationSeconds,clearing:t.clearing,enemiesLeft:t.enemies.length,muted:this.audio.muted,quality:this.rig.quality,seed:e.seed,kills:t.kills,towers:t.slots.filter(Boolean).length,turn:n?{turnIndex:n.turnIndex,energy:n.energy,stage:n.stage,marked:n.marked.length,purgesLeft:n.purgesLeft,selectedName:s?an(s.defId).name:null,selectedIsTower:!!s&&Yn(s.defId),replace:n.stage==="confirmReplace"&&s&&n.pendingSlot!==null&&t.slots[n.pendingSlot]?{from:Yt[t.slots[n.pendingSlot].defId].name,to:an(s.defId).name}:null,forecast:e.nextWaveForecast(),nextWave:e.nextWaveIndex(),canEndTurn:e.canEndTurn()}:null,piles:{draw:e.deck.drawPile.length,discard:e.deck.discard.length,drawPos:this.hand.drawPileScreen(),discardPos:this.hand.discardPileScreen(),cardH:this.hand.cardHeight}}}dispose(){this.disposed=!0,this.rig.renderer.setAnimationLoop(null);for(const e of this.listeners)e();this.listeners=[],this.input.dispose(),this.hud.dispose(),this.audio.dispose(),this.cards.dispose(),this.hand.dispose(),this.assets.dispose(),this.enemies.dispose(),this.effects.dispose(),this.board.dispose(),this.rig.dispose()}}function fh(i,e){i.innerHTML=`<div id="webgl-error"><div class="plate"><h2>WebGL2 is required</h2>
    <p>PALIMPSEST could not start a WebGL2 renderer in this browser.</p>
    <p class="small">Try a current desktop Chrome, Edge, Firefox or Safari with hardware acceleration enabled.</p>
    <p class="small">${String(e?.message??e).replace(/</g,"&lt;")}</p></div></div>`}async function px(){const i=document.getElementById("scene"),e=document.getElementById("ui");try{await Promise.all([document.fonts.load('700 60px "Cormorant Garamond"'),document.fonts.load("600 31px Inter"),document.fonts.load("700 40px Inter")])}catch{}if(!document.createElement("canvas").getContext("webgl2")){fh(e,new Error("webgl2 context unavailable"));return}let n;try{n=new fx(i,e)}catch(s){console.error(s),fh(e,s);return}dx(n)}px();
