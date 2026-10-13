/* RIG DEFINITIONS — extracted literal block from frozen v0.5.
   No values, pivot coordinates or parent relations are rewritten. */
const CHANNELS=['hip','knee','ankle','midtarsal','mtp','lower_trunk','upper_trunk','neck_base','head_neck','shoulder','elbow','wrist','collective_finger'];
const LIMITS={hip:[-120,30],knee:[0,150],ankle:[-45,45],midtarsal:[-35,35],mtp:[-45,75],lower_trunk:[-35,35],upper_trunk:[-35,35],neck_base:[-45,45],head_neck:[-45,45],shoulder:[-185,185],elbow:[-150,0],wrist:[-80,80],collective_finger:[-100,12]};
const SIGN={collective_finger:-1},PIVOT={"hip":[100.09716,138.51463],"knee":[100.09716,197.09708],"ankle":[100.09716,254.85054],"midtarsal":[110.67408263983556,265.34896110289606],"mtp":[120.32435006614124,267.5605654683527],"lower_trunk":[100.097157024758,117.4476490972709],"upper_trunk":[100.0931,97.571838],"neck_base":[100.09716,58.253555],"head_neck":[100.09311,42.365467],"shoulder":[100.09715700297645,64.17275230566021],"elbow":[108.57068372386584,101.59067342610028],"wrist":[115.93355764801623,134.1040626539308],"collective_finger":[118.47048092125576,145.3316369826215]};
const PART={hip:'thigh',knee:'shank',ankle:'rearfoot',midtarsal:'forefoot',mtp:'toes',lower_trunk:'lumbar',upper_trunk:'thorax',neck_base:'neck',head_neck:'head',shoulder:'upper_arm',elbow:'forearm',wrist:'hand',collective_finger:'fingers'};
const ID={};for(const [k,p] of Object.entries(PART))ID[p]=k;
const PARENT={hip:null,knee:'hip',ankle:'knee',midtarsal:'ankle',mtp:'midtarsal',lower_trunk:null,upper_trunk:'lower_trunk',neck_base:'upper_trunk',head_neck:'neck_base',shoulder:'upper_trunk',elbow:'shoulder',wrist:'elbow',collective_finger:'wrist'};
const SOURCE_SHA='7069ad3dfd8170e862f24e1a408848040807ccb1d569c340143ad75e34812835';
const initBody=Object.fromEntries(CHANNELS.map(k=>[k,0]));

export { CHANNELS, LIMITS, SIGN, PIVOT, PART, ID, PARENT, SOURCE_SHA, initBody };
export const MAX_KEYS=100; // original authoring bound shared with validator
