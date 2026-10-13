/* v0.5 SVG-authored controls -> real semantic HTML buttons.
 * ZERO gesture/business rewrites: each button dispatches the SAME click on
 * the original SVG data-action target, so the frozen controller remains the
 * sole authority. Original visuals remain untouched for pixel parity.
 * This bridge is temporary until each v0.5 SVG panel is migrated literally.
 */
const root=document.getElementById('lab-svg');
const layer=document.createElement('nav');
layer.id='v05-semantic-actions';
layer.setAttribute('aria-label','Controles AcroLab Lite v0.5');
document.body.append(layer);
const nodes=[...root.querySelectorAll('[data-action]')];
const entries=nodes.map((source,index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='v05-semantic-action';
  button.setAttribute('aria-label',source.getAttribute('aria-label')||source.dataset.action);
  button.dataset.v05Action=source.dataset.action;
  button.dataset.v05Value=source.dataset.value||'';
  button.dataset.sourceIndex=String(index);
  button.addEventListener('click',e=>{
    const clicked=new MouseEvent('click',{bubbles:true,cancelable:true,
      clientX:e.clientX,clientY:e.clientY,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,
      altKey:e.altKey,metaKey:e.metaKey});
    source.dispatchEvent(clicked);
    requestAnimationFrame(sync);
  });
  // Do NOT change the source SVG attributes: exportSVG clones this tree,
  // and hiding/tabindex mutations would corrupt the standalone SVG export.
  // Duplicate A11Y roles remain an explicit temporary migration gap.
  layer.append(button);
  return {source,button};
});
function sync(){
  for(const {source,button} of entries){
    const b=source.getBoundingClientRect();
    const shown=b.width>2&&b.height>2&&b.left<innerWidth&&b.top<innerHeight&&
      b.right>0&&b.bottom>0&&getComputedStyle(source).visibility!=='hidden';
    button.hidden=!shown;
    if(!shown)continue;
    button.style.left=b.left+'px';
    button.style.top=b.top+'px';
    button.style.width=b.width+'px';
    button.style.height=b.height+'px';
    button.setAttribute('aria-label',source.getAttribute('aria-label')||source.dataset.action);
  }
}
window.addEventListener('resize',()=>requestAnimationFrame(sync));
new MutationObserver(()=>requestAnimationFrame(sync)).observe(root,{attributes:true,attributeFilter:['viewBox']});
requestAnimationFrame(sync);
