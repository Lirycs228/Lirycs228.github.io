//Tools to shorten the whole code
function set_html(id, set) {
  document.getElementById(id).innerHTML = set;
};

function call_change(id, func, color) {
  document.getElementById(id).addEventListener(func, function () {  document.getElementById(id).style.backgroundColor=color;  });
};

// Oranien-Plan Javascript Code by Sven Nachtigal && Erik Hammon
var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var week_day = date.getDay();
var monthNames = ["JAN", "FEB", "MÄR", "APR", "MAI", "JUN",
  "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"];

function update_date(){
  set_html("menue_date", day + ". "  + monthNames[month]);
  update_day();
};


function update_day(){
  if(week_day == 1){
    set_html('Tag_0', 'HEUTE');
    set_html('Tag_1', 'DI');
    set_html('Tag_2', 'MI');
    set_html('Tag_3', 'DO');
  } else if(week_day == 2){
    set_html('Tag_0', 'HEUTE');
    set_html('Tag_1', 'MI');
    set_html('Tag_2', 'DO');
    set_html('Tag_3', 'FR');
  } else if (week_day == 3) {
    set_html('Tag_0', 'HEUTE');
    set_html('Tag_1', 'DO');
    set_html('Tag_2', 'FR');
    set_html('Tag_3', 'MO');
  } else if (week_day == 4) {
    set_html('Tag_0', 'HEUTE');
    set_html('Tag_1', 'FR');
    set_html('Tag_2', 'MO');
    set_html('Tag_3', 'DI');
  } else if (week_day == 5){
    set_html('Tag_0', 'HEUTE');
    set_html('Tag_1', 'MO');
    set_html('Tag_2', 'DI');
    set_html('Tag_3', 'MI');
  } else{
    set_html('Tag_0', 'MO');
    set_html('Tag_1', 'DI');
    set_html('Tag_2', 'MI');
    set_html('Tag_3', 'DO');
  };
};

//                   !Hier beginnt die Tabelle!

//From here on this is JS that you should not change
// Initialize Firebase
var config = {
  apiKey: "AIzaSyATwnVL6P_HgJl1Ry68RasnGCmR5CiOBPo",
  authDomain: "oranien-plan.firebaseapp.com",
  databaseURL: "https://oranien-plan.firebaseio.com",
  storageBucket: "oranien-plan.appspot.com",
  messagingSenderId: "90152525796"
};
firebase.initializeApp(config);

var database = firebase.database();

function writeData(nbr, lis) {
  var long = lis.length;  firebase.database().ref('plan/' + "Tag_" + nbr.toString()).set([long].concat(lis));
};

function indexer(index, nbr, lang, func, push, reset, re, set_lang, re_lang) {
  var e = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/0");
  var f = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/1");
  var g = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/2");
  var h = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/3");
  var i = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/4");
  var j = firebase.database().ref('plan/' + "Tag_" + nbr.toString() + "/" + index.toString() + "/5");

  e.on("value", function(snapshot) {  var a = snapshot.val();
    f.on("value", function(snapshot) {  var b = snapshot.val();
      g.on("value", function(snapshot) {  var c = snapshot.val();
        h.on("value", function(snapshot) {  var d = snapshot.val();
          i.on("value", function(snapshot) {  var k = snapshot.val();
            j.on("value", function(snapshot) {
              e.off("value");  f.off("value");  g.off("value");  h.off("value");  i.off("value");  j.off("value");
              var l = snapshot.val();  push([a, b, c, d, k, l]);
              handler(lang, func, push, reset, re, set_lang, re_lang);
            });
          });
        });
      });
    });
  });
};

function handler(lang, func, push, reset, re, set_lang, re_lang) {
  set_lang(re_lang() + 1);
  if(re_lang() == lang){  set_lang(0);  func(re());  reset();  };
};

function readData(nbr, snapshot, func, push, reset, re, set_lang, re_lang) {
  var lang = snapshot.val();  reset();
  if(lang == 0){
    func(undefined);
  };
  for(i=1; i<=lang; i++) {  indexer(i, nbr, lang, func, push, reset, re, set_lang, re_lang);  };
};

var end_load = 0;

function zero_to_lis(lis) {  if(lis != undefined) {  Tag_0 = lis;  } else {  Tag_0 = [];  };
  end_load++;
  if (end_load == 4) {   write(Tag_0);  day_at_moment = Tag_0;   clear_loading();  };
};

function one_to_lis(lis) {  if(lis != undefined) {  Tag_1 = lis;  } else {  Tag_1 = [];  };  end_load++;  if (end_load == 4) {  write(Tag_0);  day_at_moment = Tag_0;  clear_loading();  };  };

function two_to_lis(lis) {  if(lis != undefined) {  Tag_2 = lis;  } else {  Tag_2 = [];  };  end_load++;  if (end_load == 4) {  write(Tag_0);  day_at_moment = Tag_0;  clear_loading();  };  };


function three_to_lis(lis) {  if(lis != undefined) {  Tag_3 = lis;  } else {  Tag_3 = [];  };
  end_load++;
  if (end_load == 4) {  write(Tag_0);  day_at_moment = Tag_0;  clear_loading();  };
};




var Tag_0 = firebase.database().ref('plan/' + "Tag_0/0");
var Tag_1 = firebase.database().ref('plan/' + "Tag_1/0");
var Tag_2 = firebase.database().ref('plan/' + "Tag_2/0");
var Tag_3 = firebase.database().ref('plan/' + "Tag_3/0");


var var0 = [];var lang0 = 0;

function set_lang0(num){  lang0 = num;  };
function re_lang0(){  return lang0;  };
function reset_var0(){  var0 = [];  };
function push_var0(lis){  var0.push(lis);  };
function re0(){  return var0;  };

Tag_0.once("value", function(snapshot) {
  readData(0, snapshot, zero_to_lis, push_var0, reset_var0, re0, set_lang0, re_lang0);
}, function (err) {
  alert("ERROR: " + err);
});

if(Tag_0.toString() == firebase.database().ref('plan/' + "Tag_0/0").toString()){  Tag_0 = [];  };


var var1 = [];var lang1 = 0;

function set_lang1(num){  lang1 = num;  };
function re_lang1(){  return lang1;  };
function reset_var1(){  var1 = [];  };
function push_var1(lis){  var1.push(lis);  };
function re1(){  return var1;  };

Tag_1.once("value", function(snapshot) {
  readData(1, snapshot, one_to_lis, push_var1, reset_var1, re1, set_lang1, re_lang1);
}, function (err) {
  alert("ERROR: " + err);
});

if(Tag_1.toString() == firebase.database().ref('plan/' + "Tag_1/0").toString()){  Tag_1 = [];  };


var var2 = [];var lang2 = 0;

function set_lang2(num){  lang2 = num;  };
function re_lang2(){  return lang2;  };
function reset_var2(){  var2 = [];  };
function push_var2(lis){  var2.push(lis);  };
function re2(){  return var2;  };

Tag_2.once("value", function(snapshot) {
  readData(2, snapshot, two_to_lis, push_var2, reset_var2, re2, set_lang2, re_lang2);
}, function (err) {
  alert("ERROR: " + err);
});

if(Tag_2.toString() == firebase.database().ref('plan/' + "Tag_2/0").toString()){  Tag_2 = [];  };


var var3 = [];var lang3 = 0;

function set_lang3(num){  lang3 = num;  };
function re_lang3(){  return lang3;  };
function reset_var3(){  var3 = [];  };
function push_var3(lis){  var3.push(lis);  };
function re3(){  return var3;  };

Tag_3.once("value", function(snapshot) {
  readData(3, snapshot, three_to_lis, push_var3, reset_var3, re3, set_lang3, re_lang3);
}, function (err) {
  alert("ERROR: " + err);
});
if(Tag_3.toString() == firebase.database().ref('plan/' + "Tag_3/0").toString()){  Tag_3 = [];  };



var day_at_moment = [];
//variales to save all days

var Suche = [];
//variable to highlight the searched klasses



function write(liste) {
  set_html("whitespace", "<table border='1px solid black' id='table_main'> <tr><th width='100' class='table_th'> Klasse: </th><th width='100' class='table_th'> Stunde: </th><th width='100' class='table_th'> Fach: </th><th width='100' class='table_th'> Lehrkr&auml;fte: </th><th width='100' class='table_th'> Raum: </th><th width='300' class='table_th'> Anmerkungen: </th></tr>");
  if (liste.length != 0) {
    for (var i = 0; i < liste.length; i++) {
      if (liste[i][0] != "Q1-2" && liste[i][0] != "Q3-4") {
        var test = liste[i][0].toString().split("");
      } else {
        var test = liste[i][0];
      };
      var done = false;  var donee = false;
      for (var o = 0; o < test.length; o++) {
        if (Suche[0] == test[o] || Suche[0] == test) {
          if (Suche[0] == test) {
            done = true; donee = true;
            set_html("whitespace", document.getElementById("whitespace").innerHTML.replace("</tbody></table>", "<tr> <td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][0] +" </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][1] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][2] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][3] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][4] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][5] + " </td> </tr>" + "</tbody></table>"));  break
          };
          if (Suche.length == 2) {
            for (var g = 0; g < test.length; g++) {
              if (Suche[1] == test[g]) {
                done = true;  donee = true;
                set_html("whitespace", document.getElementById("whitespace").innerHTML.replace("</tbody></table>", "<tr> <td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][0] +" </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][1] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][2] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][3] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][4] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][5] + " </td> </tr>" + "</tbody></table>"));  break
              };
            };
            if (donee == false) {
              set_html("whitespace", document.getElementById("whitespace").innerHTML.replace("</tbody></table>", "<tr> <td class='table_td'> " + liste[i][0] +" </td><td class='table_td'> " + liste[i][1] + " </td><td class='table_td'> " + liste[i][2] + " </td><td class='table_td'> " + liste[i][3] + " </td><td class='table_td'> " + liste[i][4] + " </td><td class='table_td'> " + liste[i][5] + " </td> </tr>" + "</tbody></table>"));  break
            };
          } else {
            done = true;
            set_html("whitespace", document.getElementById("whitespace").innerHTML.replace("</tbody></table>", "<tr> <td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][0] +" </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][1] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][2] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][3] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][4] + " </td><td class='table_td' style='background-color:#FF8000; color:black;'> " + liste[i][5] + " </td> </tr>" + "</tbody></table>"));  break
          };
        } else {
          if (done != true && donee != true) {
            done = true;
            set_html("whitespace", document.getElementById("whitespace").innerHTML.replace("</tbody></table>", "<tr> <td class='table_td'> " + liste[i][0] +" </td><td class='table_td'> " + liste[i][1] + " </td><td class='table_td'> " + liste[i][2] + " </td><td class='table_td'> " + liste[i][3] + " </td><td class='table_td'> " + liste[i][4] + " </td><td class='table_td'> " + liste[i][5] + " </td> </tr>" + "</tbody></table>"));  break
          };
        };
      };
    };
  };
};
// function that writes the days on screen





function next_day() {
  close_creators();
  set_html("whitespace", "");
  var email = "";  var psw = "";  window.err = false;
  set_html("e_pompt", "<div style='background-color:#444; z-index:3; width:180px; height:400px; position:absolute; top:20%; left:45%; color:#AAA;'> <button type='button' id='end' style='background-color:#FF0000; border:none; width:25px; height:20px;'>X</button> <center><br> E-Mail: <br> <input type='email' id='email' /> <br><br><br> Password: <br> <input type='password' id='psw' /><br><br><br> <button type='button'  id='login' style='border:none; background-color:#00FF00; width:100px; height:50px; font-size: 20px;'>Login</button> </center></div>");
  call_change("end", "mouseover", "#AA0000");
  call_change("end", "mouseout", "#FF0000");
  call_change("login", "mouseover", "#00AA00");
  call_change("login", "mouseout", "#00FF00");
  document.getElementById("end").addEventListener("click", function () {  set_html("e_pompt", "");   write(day_at_moment);  });
  document.getElementById("login").addEventListener("click", function () {
    email = document.getElementById("email").value; psw = document.getElementById("psw").value;
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
      window.err = true;  var errorCode = error.code;  var errorMessage = error.message;  alert(errorCode + "\n" + errorMessage);
    }).then(function (){
      if(window.err != true){
        Tag_0 = Tag_1;  Tag_1 = Tag_2;  Tag_2 = Tag_3;  Tag_3 = [];
        writeData(0, Tag_0);  writeData(1, Tag_1);  writeData(2, Tag_2);
        var Klasse = "";  var Stunde = "";  var Lehrer = "";  var bemerk = "";
        set_html("e_pompt", "<div style='background-color:#444; z-index:3; width:180px; height:400px; position:absolute; top:20%; left:45%; color:#AAA;'> <button type='button' id='close' style='background-color:#FF0000; border:none; width:25px; height:20px;'>X</button> <center> Klassen: <br> <input type='text' id='klassen' /><br><br> Stunde: <br> <input type='text' id='stunde' /><br><br> Raum: <br> <input type='text' id='raum' />  <br><br> Lehrkr&auml;fte: <br> <input type='text' id='lehrer' /><br><br> Fach: <br> <input type='text' id='fach' /><br><br> Anmerkungen: <br> <input type='text' id='bemerk' /><br><br> <button type='button'  id='weiter' style='border:none; background-color:#00FF00; width:100px; height:40px; font-size: 20px;'>Weiter</button> </center></div>");
        call_change("close", "mouseover", "#AA0000");
        call_change("close", "mouseout", "#FF0000");
        call_change("weiter", "mouseover", "#00AA00");
        call_change("weiter", "mouseout", "#00FF00");
        document.getElementById("close").addEventListener("click", function () {
          Klasse = document.getElementById("klassen").value;  Stunde = document.getElementById("stunde").value;  Lehrer = document.getElementById("lehrer").value;  bemerk = document.getElementById("bemerk").value; Raum = document.getElementById("raum").value; Fach = document.getElementById("fach").value;
          set_html("e_pompt", "");
          window.Tag_3.push([Klasse, Stunde, Raum, Lehrer, Fach, bemerk]);  writeData(3, window.Tag_3); day_at_moment = Tag_3; day_fours(); write(window.Tag_3);  firebase.auth().signOut().then(function() {
          }, function(error) {  alert(error);  });
        });
        document.getElementById("weiter").addEventListener("click", function () {
          Klasse = document.getElementById("klassen").value;  Stunde = document.getElementById("stunde").value;  Lehrer = document.getElementById("lehrer").value;  bemerk = document.getElementById("bemerk").value; Raum = document.getElementById("raum").value; Fach = document.getElementById("fach").value;
          window.Tag_3.push([Klasse, Stunde, Raum, Lehrer, Fach, bemerk]);
          document.getElementById("klassen").value = "";  document.getElementById("stunde").value = "";  document.getElementById("lehrer").value = "";  document.getElementById("bemerk").value = "";  ask();
        });
      } else {
        next_day();
      };
    });
  });
};
//function that inserts the next day and deletes today


function help_first(num, char) {
  var buchs = num.split("");
  if (1 in buchs && char != "") {
    document.getElementById(num).addEventListener("click", function(){  Suche = [];  Suche.push(char);  write(day_at_moment);  });
  } else if (char == "") {
    document.getElementById(num).addEventListener("click", function(){  Suche = [];  Suche.push(num);  write(day_at_moment);  });
  } else {
    document.getElementById(num + char).addEventListener("click", function(){  Suche = [];  Suche.push(num, char);  write(day_at_moment);  });
  };
};


function hide() {
  document.getElementById("hidden_bar").style.height = "0";  document.getElementById("hidden_bar").style.overflow = "hidden";  document.getElementById("hidden_bar").style.opacity = "0.0";
};

function show() {
  document.getElementById("hidden_bar").style.height = "auto";  document.getElementById("hidden_bar").style.opacity = "1.0";
};


function adder() {

  document.getElementById("Tag_0").addEventListener("click", function(){ write(Tag_0);  day_at_moment = Tag_0;  clicked_day('Tag_0', 'Tag_1', 'Tag_2', 'Tag_3');  });
  document.getElementById("Tag_1").addEventListener("click", function(){ write(Tag_1);  day_at_moment = Tag_1;  clicked_day('Tag_1', 'Tag_2', 'Tag_3', 'Tag_0');  });
  document.getElementById("Tag_2").addEventListener("click", function(){ write(Tag_2);  day_at_moment = Tag_2;  clicked_day('Tag_2', 'Tag_3', 'Tag_0', 'Tag_1');  });
  document.getElementById("Tag_3").addEventListener("click", function(){ write(Tag_3);  day_at_moment = Tag_3;  clicked_day('Tag_3', 'Tag_0', 'Tag_1', 'Tag_2'); });

  document.getElementById("next").addEventListener("click", next_day);

  help_first("5", "a");  help_first("5", "b");  help_first("5", "c");  help_first("5", "d");  help_first("6", "a");  help_first("6", "b");  help_first("6", "c");  help_first("6", "d");
  help_first("7", "a");  help_first("7", "b");  help_first("7", "c");  help_first("7", "d");  help_first("8", "a");  help_first("8", "b");  help_first("8", "c");  help_first("8", "d");
  help_first("9", "a");  help_first("9", "b");  help_first("9", "c");  help_first("9", "d");  help_first("E", "a");  help_first("E", "b");  help_first("E", "c");  help_first("E", "d");

  help_first("x5", "5");  help_first("x6", "6");  help_first("x7", "7");  help_first("x8", "8");  help_first("x9", "9");  help_first("xE", "E");  help_first("Q1-2", "");  help_first("Q3-4", "");
/*
  document.getElementById("chat").addEventListener("click", function(){
    window.location.replace('https://lirycs228.github.io/chat.htm');
  };
*/
};

//From here on this is JS that you are allowed to change
function fill_creator() {
  set_html("hold_creators", "<div id = 'creators_div'><input type = 'button' id = 'close_creators'  value ='x' onclick='close_creators();'><div id = 'text'><br><br></div></div>");
};

function show_creators(){
  fill_creator();
  set_html("text", "Creators: Sven Nachtigal & Erik Hammon 'Wir bieten euch diesen Service kostenlos an und hoffen, dass wir euer Leben hiermit ein kleines bisschen einfacher gemacht haben'");
};
function show_rights(){
  fill_creator();
  set_html("text", "Da wir nicht direkt von der Oranienschule über änderungen im Vertretungsplan informiert werden, können wir nicht für 100%ige Korrektheit unserer Webside garantieren.<br> <a href='https://lirycs228.github.io/lizenz.htm'>LIZENZ</a>");
}
function close_creators(){
  set_html("hold_creators", "");
};
function clicked_day(day_one, day_two, day_three, day_four){
  document.getElementById(day_one).className = "pressed";
  document.getElementById(day_two).className = "unpressed";
  document.getElementById(day_three).className = "unpressed";
  document.getElementById(day_four).className = "unpressed";
};

function clear_loading(){
  var load = document.getElementById("load_div");
  load.parentNode.removeChild(load);
  set_html("holder_load", "");
};
