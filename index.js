import{a as g,S as b,i as L}from"./assets/vendor-CNqCr-V-.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function e(r){if(r.ep)return;r.ep=!0;const t=o(r);fetch(r.href,t)}})();const w="53177418-be0a13a4cac66b8f426193572",v="https://pixabay.com/api/";let l=1,f="";const y=15;async function h(n,a=1){n!==f?(l=1,f=n):l=a;const o=`${v}?key=${w}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${y}&page=${l}`;try{return(await g.get(o)).data}catch(e){throw console.error("Error fetching images:",e),e}}function P(){l+=1}function S(){l=1}function $(){return f}function q(){return l}let u;function p(n){const a=document.querySelector(".gallery"),o=n.map(e=>`
      <div class="photo-card">
        <a href="${e.largeImageURL}" class="gallery-link">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${e.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${e.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${e.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${e.downloads}
          </p>
        </div>
      </div>
    `).join("");a.insertAdjacentHTML("beforeend",o),u?u.refresh():u=new b(".gallery a",{captionsData:"alt",captionDelay:250})}function m(){document.querySelector(".loader").classList.remove("hidden")}function d(){document.querySelector(".loader").classList.add("hidden")}function c(n){L.error({title:"Error",message:n})}document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("search-form"),a=document.querySelector(".gallery"),o=document.querySelector(".load-more");let e=0;function r(t=2){const s=document.querySelector(".gallery .photo-card");if(!s)return;const{height:i}=s.getBoundingClientRect();window.scrollBy({top:i*t,behavior:"smooth"})}n.addEventListener("submit",async function(t){t.preventDefault();const s=n.querySelector('input[name="searchQuery"]').value.trim();if(s===""){c("Please enter a search query.");return}m(),S(),a.innerHTML="",o.style.display="none";try{const i=await h(s);d(),i.totalHits>0?(p(i.hits),e=Math.ceil(i.totalHits/y),i.totalHits%y===0&&(e-=1),e>1&&(o.style.display="block")):c("Sorry, there are no images matching your search query. Please try again!")}catch{d(),c("An error occurred while fetching images.")}finally{n.reset()}}),o.addEventListener("click",async function(){const t=q();if(t>=e){o.style.display="none",c("We're sorry, but you've reached the end of search results.");return}P(),m(),o.style.display="none";try{const s=await h($(),t+1);d(),p(s.hits),r(),t+1>=e?(o.style.display="none",c("We're sorry, but you've reached the end of search results.")):o.style.display="block"}catch{d(),o.style.display="block",c("An error occurred while fetching more images.")}})});
//# sourceMappingURL=index.js.map
