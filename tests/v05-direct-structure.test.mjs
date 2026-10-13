import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const src=readFileSync('assets/reference/svg-motion-lab-v0.5.svg','utf8');
const html=readFileSync('public/v05-direct/index.html','utf8');
const ctrl=readFileSync('public/v05-direct/controller.js','utf8');
const css=readFileSync('public/v05-direct/host.css','utf8');
const sha=s=>createHash('sha256').update(s).digest('hex');
const sourceScript=src.match(/<script\b[^>]*\bid="motionLabScript"[^>]*>([\s\S]*?)<\/script>/i);
test('frozen v0.5 SHA never changes',()=>assert.equal(sha(src),'93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b'));
test('exact 13 joint handles, source paths and metadata carried into HTML',()=>{
  for(const id of ['lab-svg','acro-pose-data','desktopLayout','mobileLayout','rigCamera','jointHandles','timelineD','timelineM','poseListD','stageD','stageM']){
    assert(src.includes('id="'+id+'"'),'src id '+id);
    assert(html.includes('id="'+id+'"'),'HTML id '+id);
  }
  const pathDs=(s)=>[...s.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(pathDs(html),pathDs(src));
  for(const name of ['hip','knee','ankle','midtarsal','mtp','lower_trunk','upper_trunk','neck_base','head_neck','shoulder','elbow','wrist','collective_finger'])
    assert(html.includes('data-joint="'+name+'"'),'missing joint '+name);
});
test('verbatim controller reconstructed across 4 extracted ES modules',()=>{
  assert(sourceScript,'source inline controller not found');
  const source=sourceScript[1].replace(/^<!\[CDATA\[/,'').replace(/\]\]>$/,'');
  const span=(a,b)=>source.slice(source.indexOf(a),source.indexOf(b,source.indexOf(a)));
  const constants=span('const CHANNELS=','const round=');
  const helpers=span('const round=','const key=');
  const validator=span('function validate(d){','validate(data);');
  const topology=span('function hasDescendant(','function selectedPivot(');
  const rig=readFileSync('public/v05-direct/rig-definition.js','utf8');
  const val=readFileSync('public/v05-direct/state-validation.js','utf8');
  const topo=readFileSync('public/v05-direct/topology.js','utf8');
  const utils=readFileSync('public/v05-direct/state-utils.js','utf8');
  assert(rig.includes(constants));
  assert(rig.includes('export const MAX_KEYS=100;'));
  assert(val.includes(validator));
  assert(topo.includes(topology));
  assert(utils.includes(helpers));
  for(const file of ['./rig-definition.js','./state-validation.js','./topology.js','./state-utils.js'])
    assert(ctrl.includes(file),'module not imported: '+file);
  let recovered=ctrl.slice(ctrl.indexOf("(()=>{'use strict';"));
  recovered=recovered
    .replace("root.querySelector('#motionLabScript')?.setAttribute('type','application/ecmascript');",'')
    .replace('const key=',constants+helpers+'const key=')
    .replace("const floorY=271.88986,canPose=k=>k?.kind!=='ghost';","const floorY=271.88986,canPose=k=>k?.kind!=='ghost',MAX_KEYS=100;")
    .replace('validate(data);',validator+'validate(data);')
    .replace('function selectedPivot(',topology+'function selectedPivot(');
  assert.equal(recovered,source,'Unintentional behavioral rewrite during module extraction');
});
test('exact original constraints usable from pure ES modules',async()=>{
  const {validate}=await import('../public/v05-direct/state-validation.js');
  const {hasDescendant}=await import('../public/v05-direct/topology.js');
  const {PIVOT,CHANNELS,MAX_KEYS}=await import('../public/v05-direct/rig-definition.js');
  assert.equal(CHANNELS.length,13);assert.equal(Object.keys(PIVOT).length,13);assert.equal(MAX_KEYS,100);
  const metadata=src.match(/<metadata id="acro-pose-data">([\s\S]*?)<\/metadata>/);
  assert(metadata);
  const data=JSON.parse(metadata[1]);
  assert.equal(validate(data),undefined);
  assert(hasDescendant('hip','mtp'));
  assert(hasDescendant('upper_trunk','wrist'));
  assert(!hasDescendant('shoulder','head_neck'));
  assert.throws(()=>validate({...data,rig:{...data.rig,svg_source_sha256:'bad'}}),/Different SVG pivot mapping/);
});
test('source SVG script preserved inert in HTML, restored only on SVG export',()=>{
  assert(html.includes('type="application/x-acrolab-v05-frozen-source"'));
  assert(!html.includes('type="application/ecmascript"'));
  assert(html.includes('src="./controller.js"'));
  assert(ctrl.includes("root.querySelector('#motionLabScript')?.setAttribute('type','application/ecmascript')"));
  assert(!html.includes('src="https://'));
});
test('host CSS only resets page geometry, not authored source paths/UI',()=>{
  assert(css.includes('100dvh'));
  assert(!css.includes('transform:'));
  assert(!css.includes('display:none'));
  assert(!html.includes('C3 private'));
});
