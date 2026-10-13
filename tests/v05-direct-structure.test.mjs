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
test('original controller equivalent modulo extracted constants and export compatibility',()=>{
  assert(sourceScript,'source inline controller not found');
  const source=sourceScript[1].replace(/^<!\[CDATA\[/,'').replace(/\]\]>$/,'');
  const constants=source.slice(source.indexOf('const CHANNELS='),source.indexOf('const round='));
  const rig=readFileSync('public/v05-direct/rig-definition.js','utf8');
  assert(rig.includes(constants),'rig module changed original constants');
  const imported="import { CHANNELS, LIMITS, SIGN, PIVOT, PART, ID, PARENT, SOURCE_SHA, initBody } from './rig-definition.js';";
  assert(ctrl.includes(imported),'controller does not import extracted module');
  const external=ctrl.slice(ctrl.indexOf("(()=>{'use strict';"));
  const repaired=external
    .replace("root.querySelector('#motionLabScript')?.setAttribute('type','application/ecmascript');",'')
    .replace('const round=',constants+'const round=');
  assert.equal(repaired,source,'Unexpected rewrite in v0.5 behavior/controller');
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
