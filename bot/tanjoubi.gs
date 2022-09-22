
//確認用const webhook="https://discord.com/api/webhoodsdaddfdfdfdfdasdasdPMnj"
const webhook="https://discord.com/api/webhooks/adfasdfasdf_Mdfsdfsfdfdfdfdfdfdfn0";

/* 指定のカレンダーの本日の予定をチャットワークに送る */
function sendSchedule() {

  var myCals=CalendarApp.getCalendarById('fm6hfslr5eadajaibh70flfp1s@group.calendar.google.com'); 
  var myEvents=myCals.getEventsForDay(new Date());　//カレンダーの本日のイベントを取得

  var messages;
  var i=0;

  if (myEvents.length < 1) {
    messages="1";
    
    
  } else {
     
      messages = myEvents[0].getTitle() + "\n キラやば～っ☆な１日になるね。";
    
  }
  

if(messages != "1"){

for(;i<=myEvents.length;i++)
{

  const payload = {
    username: "誕生日通知ちゃん",
    content:"------------\n"+"@everyone お誕生日おめでとう。\n"+"------------\n"+ myEvents[i].getTitle() + "\n キラやば～っ☆な１日になるね。"+"\n------------" ,
  };

  UrlFetchApp.fetch(webhook, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
  messages="1";
  }
  }
}