/* Literal v0.5 topology traversal. */
import {PARENT} from './rig-definition.js';
function hasDescendant(root,target){if(root===target)return true;let n=target;while(PARENT[n]){if(PARENT[n]===root)return true;n=PARENT[n];}return false;}
export {hasDescendant};
