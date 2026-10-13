/* Literal pure v0.5 numeric and clone utilities. */
const round=(n,d=3)=>Number(n.toFixed(d));const clone=p=>({body:{...p.body},placement:{...p.placement}});export {round,clone};
