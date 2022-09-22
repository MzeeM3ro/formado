//使い分けるときはwebhookの変数を確認すること
//プリキュア窓(ローラ)
const webhook_r ="https://discord.com/api/webhooks/ｆｄｆｄｆｄｆｄｆｄｆｄ";
//くるるん
const webhook_k="https://discord.com/api/webhooks/ｄｆｄｆｄｆｄｆｄｆ";
const webhook_m="https://discord.com/api/webhooks/ｆｄｆｄｆｄｆ";
//確認用
//const webhook="https://discord.com/api/webhooks/9ｆｄｆｄｆｄｆ


function kakunin(id){
let mysheet = SpreadsheetApp.getActiveSheet();
var i=1;
var k=1;
m=mysheet.getLastRow();
for(;i<=m;i++)
{
if(id == mysheet.getRange(i, 2).getValue())
{


/*********webhookの確認しろよ****************/

const payload = {
    username: "みのりん先輩",
    content: mysheet.getRange(i, 1).getValue() + " は登録しているはず\n間違ってたら窓主に聞いて"
  };
  
  UrlFetchApp.fetch(webhook_m, {  
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
  k++;
  break;
  
  
}
}
return k;
}


function rate_kakunin(p_retu,rate) {
var sheet_g = SpreadsheetApp.getActiveSheet();
 var name=sheet_g.getRange(p_retu, 1).getValue()
 rate=Math.floor(rate);
  const payload = {
    username: "ローラ",
    content: name+ " のレートは" + rate +" よ。\n精進しなさい",
  };

  UrlFetchApp.fetch(webhook_r, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}
 //対戦後のやつ、処理速度考慮
function rate_teller1(p_retu,rate) {
var sheet_g = SpreadsheetApp.getActiveSheet();
 var name=sheet_g.getRange(p_retu, 1).getValue()
rate=Math.floor(rate);
  const payload = {
    username: "ローラ",
    content:  name+ " のレートは " +rate +" よ。",
  };

  UrlFetchApp.fetch(webhook_r, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}
 //対戦後のやつ、処理速度考慮
function rate_teller2(p_retu,rate) {
var sheet_g = SpreadsheetApp.getActiveSheet();
 var name=sheet_g.getRange(p_retu, 1).getValue()
rate=Math.floor(rate);
  const payload = {
    username: "くるるん",
    content:  "くるる～ん(" + name+ " のレートは " +rate +")",
  };

  UrlFetchApp.fetch(webhook_k, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}


function g_cal(fai){  
  return Math.pow(1+3*Math.pow(fai,2)/(Math.pow(3.1415,2)),-0.5);
}

function e_cal(myu,myu_j,fai_j){  //ok

  return 1/(1+Math.exp((-1*g_cal(fai_j))*(myu-myu_j)));
}

function v_cal(myu){ //ok
  var j=1;
  var v=0;
  //参加者を取得
 var sheet_g = SpreadsheetApp.getActiveSheet();
 var m=sheet_g.getLastRow();
 var rd=0;
 var fai_j=0;
 var myu_j=0;
  for(;j<=m;j++)
  {
    rd = sheet_g.getRange(j, 4).getValue();
    myu_j=(sheet_g.getRange(j, 3).getValue()-1500)/173.7178;
    fai_j=rd/173.7178;
  v = v + (Math.pow(g_cal(fai_j),2))*e_cal(myu,myu_j,fai_j)*(1 - e_cal(myu,myu_j,fai_j));
  }
 return Math.pow(v,-1);
}
  
function deruta_cal(myu,v,s_j)
{
 var j = 1;
 var sankaku=0;
 //参加者を取得
 var sheet_g = SpreadsheetApp.getActiveSheet();
 var m=sheet_g.getLastRow();
 var rd=0;
 var myu_j=0;
 var fai_j=0;

for (j=1;j<=m;j++)
{
  rd = sheet_g.getRange(j, 4).getValue();
  myu_j=(sheet_g.getRange(j, 3).getValue()-1500)/173.7178;
  fai_j=rd/173.7178;
sankaku=sankaku+g_cal(fai_j)*(s_j - e_cal(myu,myu_j,fai_j))
}
  return v*sankaku;
}

function func1(x,fai,siguma,tau,sankaku,v){
  var a=Math.log(Math.pow(siguma,2));
  var ep=0.000001;
  var f1_ue=Math.pow(2.71828,x)*(Math.pow(sankaku,2)-Math.pow(fai,2)-Math.pow(2.71828,x)-v);
  var f1_sita=2*(Math.pow(Math.pow(siguma,2)+v+Math.pow(2.71828,x),2));
  var f2=(x-a)/Math.pow(tau,2);
  var f=(f1_ue/f1_sita)-f2;
  return f;
}

function func2(sankaku,v,fai,siguma,tau)
{
var a=Math.log(Math.pow(siguma,2));
  if(Math.pow(sankaku,2) > Math.pow(fai,2)+v)
  {
    var b=Math.log(Math.pow(sankaku,2)-Math.pow(fai,2)-v);
  }else{
    var k=1;
    if(func1(a-k*tau,fai,siguma,tau,sankaku,v) < 0)
    {
      k=k+1;
    }else{
      var b = a-k*tau;
    }}
  return b;
}
 
  function func3(myu,fai,s_j,siguma,tau)
  {
    var v = v_cal(myu);
    var sankaku=deruta_cal(myu,v,s_j);

    var ep=0.000001;
    var a=Math.log(Math.pow(siguma,2));
    var fa=func1(a,fai,siguma,tau,sankaku,v);
    var b=func2(sankaku,siguma,v,fai,siguma,tau);
    var fb=func1(b,fai,siguma,tau,sankaku,v);
   
    for(;;)
    {
    if(Math.abs(a-b) > ep )
    {
      var c= a+(a+b)*fa/(fb-fa);
      var fc=func1(c,fai,siguma,tau);
      if(fc*fb < 0)
      {
        a=b;
        fa=fb;
      }else
      {
        fa=fa/2;
      }
      b=c;
      fb=fc;
    }else
    {
      break;
    }
    }
    return Math.pow(2.71828,a/2);
  }


function myu_dassyu(fai_dassyu,s_j,myu)
{
var myu_da=0;
var j=1;
 var sheet_g = SpreadsheetApp.getActiveSheet();
 var m=sheet_g.getLastRow();
 
 var rd=0;
 var myu_j=0;
 var fai_j=0;

for (;j<=m;j++)
{
  rd = sheet_g.getRange(j, 4).getValue();
  myu_j=(sheet_g.getRange(j, 3).getValue() - 1500)/173.7178;
  fai_j=rd/173.7178;
  myu_da=myu_da+g_cal(fai_j)*(s_j - e_cal(myu,myu_j,fai_j));
}
myu_da=myu+Math.pow(fai_dassyu,2)*myu_da;


return myu_da;

}

function fai_dassyu(fai,siguma,myu)
{
  var fai_star=Math.pow(Math.pow(fai,2)+Math.pow(siguma,2),1/2);
  var v=v_cal(myu);
  return Math.pow(Math.pow(fai_star,-2)+Math.pow(v,-1),-1/2);

}

function r_d(fai,new_siguma,s_j,myu)
{
  var fai_d=fai_dassyu(fai,new_siguma,myu);
  var myu_d=myu_dassyu(fai_d,s_j,myu);
  
  return 173.7178*myu_d+1500;
}

function rd_d(fai,new_siguma,myu)
{
return 173.7178*fai_dassyu(fai,new_siguma,myu);
}

/***********************************レート計算制御部 *************************/
//プレイヤーの行の取得
function get_info(p_id){
  let i=1;
 

  const sheet_g = SpreadsheetApp.getActiveSheet();
  let re=sheet_g.getRange(i, 2).getValue();
  
  for (;;i++)
  {
  re=sheet_g.getRange(i, 2).getValue();
    if(p_id == re)
    {
      break;
    }
    if(i==100){
      break;
    }
  }
  if(i==100){
  return 1;
  }
  return i;
}


//レートの更新（ｐ１）
function rate_cal1(p1_n,p2_n,s)
{
var sheet_g = SpreadsheetApp.getActiveSheet();
var myu_j = (sheet_g.getRange(p2_n, 3).getValue()-1500)/173.7178;
var fai_j = (sheet_g.getRange(p2_n, 4).getValue())/173.7178;
Utilities.sleep(1* 1000);

var siguma=sheet_g.getRange(p1_n, 5).getValue();
var r = sheet_g.getRange(p1_n, 3).getValue();
var rd = sheet_g.getRange(p1_n, 4).getValue();
var myu = (r-1500)/173.7178;
var fai = (rd)/173.7178;
var s_j=0;
var tau = 0.3
var aa=sheet_g.getRange(p1_n, 6).getValue();
var as=sheet_g.getRange(p1_n, 7).getValue();

if (s==1){
s_j=1;
sheet_g.getRange(p1_n, 6).setValue(aa+1);
}else{
  sheet_g.getRange(p1_n, 7).setValue(as+1);
}

var new_siguma;
var new_r;
var new_rd;

//シグマの更新
new_siguma=func3(myu,fai,s_j,siguma,tau);
sheet_g.getRange(p1_n, 5).setValue(new_siguma);
//レートの更新
new_r=r_d(fai,new_siguma,s_j,myu);
sheet_g.getRange(p1_n, 3).setValue(new_r);
//rdの更新
new_rd=rd_d(fai,new_siguma,myu);
sheet_g.getRange(p1_n, 4).setValue(new_rd);
 
 return new_r;

}

//レートの更新（ｐ2）
function rate_cal2(p2_n,p1_n,s)
{
var sheet_g = SpreadsheetApp.getActiveSheet();
Utilities.sleep(1 * 1000);


var r = sheet_g.getRange(p2_n, 3).getValue();
var siguma=sheet_g.getRange(p2_n, 5).getValue();
var rd = sheet_g.getRange(p2_n, 4).getValue();
var myu = (r-1500)/173.7178;
var fai = (rd)/173.7178;
var s_j=1;
var tau = 0.3;
var aa=sheet_g.getRange(p2_n, 7).getValue();
var as=sheet_g.getRange(p2_n, 6).getValue();
aa=aa+1;
as=as+1;
if (s==1) 
{
  s_j=0;
  sheet_g.getRange(p2_n, 7).setValue(aa);
  }else{
    sheet_g.getRange(p2_n, 6).setValue(as);
    }
    
   

var new_siguma;
var new_r;
var new_rd;

//シグマの更新
new_siguma=func3(myu,fai,s_j,siguma,tau);
sheet_g.getRange(p2_n, 5).setValue(new_siguma);
//レートの更新
Utilities.sleep(0.5 * 1000)
new_r=r_d(fai,new_siguma,s_j,myu);
sheet_g.getRange(p2_n, 3).setValue(new_r);
//rdの更新
new_rd=rd_d(fai,new_siguma,myu);
sheet_g.getRange(p2_n, 4).setValue(new_rd);

return new_r;
}

function tr(text,source,target) {
 var translatedText = LanguageApp.translate(text, source, target);
  const payload = {
    username: "ローラ",
    content:translatedText,
  };

  UrlFetchApp.fetch(webhook_r, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}


/**************************************************************************
*                                 　　　　　　　　　　　　　　　　　　　　  　　　*
*                   **ここからグリッチと通信関係**                             *
*                                                                  　      *
**************************************************************************/


const doGet = (e) => 
{  

const k =e.parameter.k; 
 const sheet_t = SpreadsheetApp.getActiveSheet();
 
 //レート計算
 const p1 =  e.parameter.p1; //player1
 const p2 =  e.parameter.p2; //player2
 const s  =  e.parameter.s; //勝敗　1:p１の勝ち、２：ｐ２の勝ち

if(k==2){

 var p1_n = get_info(p1);//p1の行を取得 
 var p2_n = get_info(p2);//p2の行を取得

//レートの更新
var r1,r2;
r1=rate_cal1(p1_n,p2_n,s);
r2=rate_cal2(p2_n,p1_n,s);

//レートの通知
rate_teller1(p1_n,r1);
rate_teller2(p2_n,r2);
}

//レート確認
if(k==3){
p1_n = get_info(p1); //p1の行を取得
rate_kakunin(p1_n);
}

  // 登録
  const name = e.parameter.name;   //1
  const id = e.parameter.id;        //2
  //const rate = e.parameter.rate;       //3対戦レート
  //const rd = e.parameter.rd;           //4レーティング偏差
  //const siguma = e.parameter.siguma;   //5変動率siguma
  //const win_n = e.parameter.win_n;   //６勝ち数
  //const los_n = e.parameter.los_n;   //７負け数
  
 
//新規登録
  if(k==0){
  var c=kakunin(id);
  if(c==1){
  sheet_t.appendRow([name,id,1500,30,0.06,0,0]);
 }
 }
 
 const text = e.parameter.text;
 const target = e. parameter.target;
 const source = e. parameter.source;
 
 if(k==5){
 tr(text, source, target);
 }
 }