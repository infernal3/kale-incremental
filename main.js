const el=E=>{
    try{
        return document.getElementById(E);
    }catch(e){
        console.log("ERROR");
        return void 0;
    }
}
var point=0;
var totalPoint=0;
var goal=10;
var stage=0;
var gen=false;
var booster=false;
var delta=1;
var cost=10;
var delta2=1;
var delta3=0;
var cost2=100;
var cost3=10000;
var loading=true;
const goals=[20,75,400,1000,100000,10000000];

var main=function main(){
    console.log("Function was called. DOM content loaded successfully.");
    el('c1').addEventListener('click',()=>{
        point+=delta2;
        totalPoint+=delta2;
    });
    el('c2').addEventListener('click',()=>{
        if(totalPoint>=goal){
            point=0;
            totalPoint=0;
            goal=goals[stage]??goal*100;
            stage++;
            gen=false;
            booster=false;
            delta=1;
            cost=10;
            delta2=1;
            cost2=100;
            delta3=0;
            cost3=10000;
        }
    });
    el('c3').addEventListener('click',()=>{
        if(!gen&&point>=10){
            point-=10;
            gen=!0;
        }
    });
    el('c4').addEventListener('click',()=>{
        if(point>=cost){
            point-=cost;
            delta*=2;
            cost*=3;
        }
    });
    el('c5').addEventListener('click',()=>{
        if(point>=cost2){
            point-=cost2;
            delta2++;
            cost2*=2;
        }
    });
    el('c6').addEventListener('click',()=>{
        if(point>=1000&&!booster){
            point-=1000;
            booster=true;
        }
    });
    el('c7').addEventListener('click',()=>{
        if(point>=cost3&&booster){
            point-=cost3;
            delta3++;
            cost3*=10;
        }
    });
    window.setInterval(()=>{
        var boosted = booster?Math.pow(Math.log10(point+10),Math.log(delta3+1)*0.5+2):1;
        if(gen){
            
            point+=0.05*delta*boosted;
            totalPoint+=0.05*delta*boosted;
        }
        el('p1').textContent=`You have ${point.toFixed(2)} kale.`;
        el('p2').textContent=gen?`You are gaining ${(delta*boosted).toFixed(3)} kale per second.`:"";
        var t=Math.min(100,totalPoint*100/goal);
        el('c1').textContent=`Click to gain +${delta2} Kale`;
        el('c2').style=t==100?"":"display:none;";
        el('c3').style=stage>=1?(gen?"background:var(--purchased)":""):"display:none;";
        el('c3').textContent=gen?`+${delta} Kale/sec`:"Generator. Cost: 10";
        el('c4').style=stage>=2?"":"display:none;";
        el('c4').textContent=`Upg Gen. Cost: ${cost}`;
        el('c5').style=stage>=3?"":"display:none;";
        el('c5').textContent=`Upg Click. Cost: ${cost2}`;
        el('c6').style=stage>=5?(booster?"background:var(--purchased)":""):"display:none;";
        el('c6').textContent=booster?`x${boosted.toFixed(3)} Kale gain`:`Booster. Cost: 1000`;
        el('c7').style=stage>=6?(booster?"":"background:var(--negative)"):"display:none;";
        el('c7').textContent=`Upg Boost. Cost: ${cost3}`;
        el('footer').style=t>=100?"background:var(--completion);":`background:repeating-linear-gradient(to right,var(--purchased) 0% ${t}%,var(--bar-color-2) ${t}% 100%)`;
        el('footer').textContent=`Progress: ${t.toFixed(3)}%`;
        if(loading){
            loading=!1;
            el('loading').style="display:none";
        }
    },50);
}
