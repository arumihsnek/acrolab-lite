import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {join,extname,resolve} from 'node:path';
import {chromium} from 'playwright';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
import assert from 'node:assert/strict';

const ROOT=process.cwd(), PORT=Number(process.env.PORT||39879);
const mime={'.svg':'image/svg+xml','.html':'text/html','.css':'text/css','.js':'text/javascript'};
const server=createServer(async(req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 const file=resolve(ROOT,'.'+pathname);
 if(!file.startsWith(ROOT+'/')){res.writeHead(404).end();return;}
 try{const buf=await readFile(file);res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(buf);}
 catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
await mkdir('evidence/v05-direct',{recursive:true});
const browser=await chromium.launch({headless:true});
const url='http://127.0.0.1:'+PORT;
const projections=s=>({mode:s.mode,axis:s.axis,selection:s.selection,chosenKeys:s.chosenKeys,activeId:s.activeId,time:s.time,stageZoom:s.stageZoom,refsOn:s.refsOn,viewSpan:s.viewSpan,libraryOpen:s.libraryOpen,keys:s.data.keys});
let failure=0;
try{
 for(const [label,viewport,mobile] of [
  ['mobile-390',{width:390,height:844},true],
  ['mobile-360',{width:360,height:800},true],
  ['desktop',{width:1260,height:790},false]
 ]){
  const shots=[], states=[];
  for(const [kind,path] of [['source','/assets/reference/svg-motion-lab-v0.5.svg'],['html','/public/v05-direct/index.html']]){
   const context=await browser.newContext({viewport,isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1,acceptDownloads:true});
   const page=await context.newPage(), errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(url+path,{waitUntil:'load'});
   assert.equal(response.status(),200,label+' '+kind);
   await page.waitForFunction(()=>!!window.AcroSVGLab,{timeout:20000});
   await page.waitForTimeout(200);
   const first=projections(await page.evaluate(()=>window.AcroSVGLab.getState()));
   const svg=await page.locator('#lab-svg');
   assert.equal(await svg.getAttribute('viewBox'), mobile?'0 0 400 800':'0 0 1260 790');
   assert.equal(await page.locator('[data-joint]').count(),13,'13 source handles');
   assert.equal(errors.length,0,kind+' '+label+' init '+JSON.stringify(errors));
   await page.screenshot({path:'evidence/v05-direct/'+label+'-'+kind+'.png'});
   shots.push(PNG.sync.read(await page.screenshot()));
   // REAL UI route: click v0.5's authored SVG control and joint handle.
   if(kind==='html'){
     const semantic=page.locator('button.v05-semantic-action');
     assert.equal(await semantic.count(),await page.locator('#lab-svg [data-action]').count(),'one semantic button per source action node');
     const active=page.locator('button.v05-semantic-action:visible');
     assert((await active.count())>=10,'semantic HTML buttons visible');
     await page.locator('button.v05-semantic-action[data-v05-action="axis-cycle"]:visible').first().click();
   }else{
     await page.locator('[data-action="axis-cycle"]:visible').first().click({force:true});
   }
   assert.equal((await page.evaluate(()=>window.AcroSVGLab.getState())).axis,'X','native axis-cycle click');
   await page.locator('[data-joint="shoulder"]:visible').first().click({force:true});
   const tap=await page.evaluate(()=>window.AcroSVGLab.getState());
   assert(tap.selection.includes('shoulder'),'native shoulder tap select');
   // API route checks exactly the same original exported action dispatch.
   await page.evaluate(()=>{const a=window.AcroSVGLab;a.action('mode','FLIP');a.action('axis-cycle');a.action('zoom-in');});
   const after=projections(await page.evaluate(()=>window.AcroSVGLab.getState()));
   assert.equal(after.mode,'FLIP');assert.equal(after.axis,'Y');assert(after.stageZoom>1);
   const dl=page.waitForEvent('download');
   await page.evaluate(()=>window.AcroSVGLab.action('export-svg'));
   const download=await dl;const stream=await download.createReadStream(),chunks=[];
   for await(const c of stream)chunks.push(c);
   const exported=Buffer.concat(chunks).toString();
   assert(exported.includes('type="application/ecmascript"'),'exported SVG must remain executable');
   assert(exported.includes('acro-pose-data'));
   assert.equal(errors.length,0,'runtime errors '+JSON.stringify(errors));
   states.push({first,after});
   await context.close();
  }
  try{
    assert.deepEqual(states[0],states[1],label+' state behavioral parity');
    assert.equal(shots[0].width,shots[1].width);
    assert.equal(shots[0].height,shots[1].height);
    const changed=pixelmatch(shots[0].data,shots[1].data,null,shots[0].width,shots[0].height,{threshold:0.1});
    const ratio=changed/(shots[0].width*shots[0].height);
    console.log(label,'visual delta',changed,'pixels', (100*ratio).toFixed(3)+'%');
    assert(ratio<0.015,'visual delta beyond 1.5%: '+(100*ratio).toFixed(3)+'%');
    console.log(label,'PARITY PASS');
  }catch(e){failure++;console.error(label,'PARITY FAIL',e.message)}
 }
}finally{await browser.close();await new Promise(r=>server.close(r))}
if(failure) process.exitCode=1;
