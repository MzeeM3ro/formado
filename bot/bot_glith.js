const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);


// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();
const discordbtn = require('discord.js-buttons')(client);
const requestPromise = require("request-promise");
const axios = require("axios");

/*
キラやばうったら返してくれる
*/

client.on('message', message => {
  if (message.content === '!キラやば') {
    message.channel.send('キラやば~☆');
  }
})
/*------------------------------------------------------------------------------------------*/

//***********************************************************************************
/*何か役に立つなら使ってください*/

const st_all = ['0️⃣', '1️⃣', '2️⃣', '3️⃣','4️⃣','5️⃣','6️⃣'];
client.on('message', async message => {
  if (message.content === '!st') { 
   const [command,...stage] = ["poll","終点","戦場","ポケスタ２","村街","スマ村","カロス","小戦場"];
    if (command === 'poll') {
     const poll = await client.channels.cache.get('902194240459771904').send(
      { embed: {
         title: "ステージテーブル\n",
         description:"入力が終わったらプリキュアスタンプとかで柔軟に\n"+stage.map((c, i) => `${st_all[i]} ${c}`).join('')
                }
     });
     st_all.slice(0, stage.length).forEach(emoji => poll.react(emoji))
   }
  
 }
});



/****************登録関係********************************/

function p_add(id1,name1){
//登録停止k=1にしよう
 　let k=0;
  if(k==0){
 
    var s=0;
//spreadsheetに出力
    let url = process.env.GAS_URL;
// spreadsheet URLにパラメータを付加
//name,id,rate,rd,siguma,win_n,los_n,パラメーター
url =`${url}?name=${name1}&id=${id1}&k=${0}`;
//文字コードの変換
url=encodeURI(url);

   // API通信
const doApi = async () => {
  try {
    await axios.get(url);
  } catch (error) {
    console.log("Error message: " + error.message);
  }
};

// 実行
doApi();
  
}
}
  //レートに参加するための宣言
client.on('message', message => {
  if (message.content === '!mmd') {
    const hito=message.author.id;
    const name=message.member.displayName;
    client.users.fetch(hito)
 	 	.then(user => message.channel.send(`登録しました ${user}`))
 	 	.catch(console.error)
     p_add(hito,name);

  }
})
/***********************************************************/
/***************************対戦関係***********************/
function ba(p1,p2,sf){
  let k=2;
  //spreadsheetに出力
let url = process.env.GAS_URL;
// spreadsheet URLにパラメータを付加
//name,id,rate,rd,siguma,win_n,los_n,パラメーター
url =`${url}?p1=${p1}&p2=${p2}&s=${sf}&k=${2}`;
//文字コードの変換
  
url=encodeURI(url);

// API通信
const doApi = async () => {
  try {
  const result = await requestPromise({
      uri: url,
      method: "GET"
              });
            } catch (error) {
              console.log("Error message: " + error.message);
            }
          };

          // 実行
          doApi();
  
}
/***********************************************************/
//対戦関係
//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊step=0で対戦できる
//対戦エントリー
var p1='NULL',p2='NULL',p1_n='NULL',p2_n='NULL',p3='NULL',p3_n='NULL',p4='NULL',p4_n='NULL',p5=[];
var step=0,s=2;

client.on('message', async message => {
 if (message.content === '!aab' && step==0 ){
     p1=message.author.id;
     p1_n=message.member.displayName;
   message.channel.send( p1_n +'  の対戦相手は、!aav  で反応してください');
     step=1;
 }

  
if (message.content === '!aav' && step==1 ){
     p2=message.author.id;
     p2_n=message.member.displayName;
     p5=[p1_n,p2_n]
     var  random= Math.floor( Math.random() * p5.length );
　　　
     step=2;

  message.channel.send( "ステージ権→"+p5[random]+"\n "+p1_n + '  と  '+ p2_n+ '  は対戦をしてください\n勝者側は  !fin  を実行してください');
 }
  
 if (message.content === '!fin' && step==2 ){
     p3=message.author.id;
     p3_n=message.member.displayName;
   if(p1==p3){
     s=1;
   }
   
     if(p3==p1 || p3==p2){
       ba(p1,p2,s);
     
       client.channels.cache.get('902194240459771904').send(p3_n + ' が勝者で間違いないですね？\n結果を送信しました。間違えの場合は仲たがいしてください');
         step=0;
         s=2;
     }
 }
}
)

client.on('message', message => {
  if (message.content === '!s') {
    message.channel.send('キラやば~☆');
  step=0;
  }
})

      
 /**************************************************************/ 

/**************************************************************/ 
 /***********************じゃんけん用***************************************/
client.on('message', async message => {
 if (message.content === '!じゃんけん'){
     
     p1=message.member.displayName;
     var jk=["勝ち","負け"];
     var jt= jk[ Math.floor( Math.random() * jk.length ) ];
   
   message.channel.send( "-コイントス結果-\n"+p1 +'  は、' + jt +" です。");
     step=1;
 }});
 /**************************************************************/ 

 /**************************************************************/ 


client.on('guildMemberAdd', member => {

  
  
	  client.channels.cache.get('************').send
    ( {embed: {
    color: 16757683,
    description: '`**プリキュア窓にようこそ** \nキラやば～☆`'
  }}
  
);

 }) 

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}
if (process.env.GAS_URL == undefined) {
  console.log("please set ENV: GAS_URL\nOR if you don't want to record playlog in spreadsheet, please comment out lines 42-70 and here.");
  process.exit(0);
}
client.login( process.env.DISCORD_BOT_TOKEN );


