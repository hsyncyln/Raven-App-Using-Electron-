<script src="./node_modules/rss-parser/dist/rss-parser.min.js"></script>

let all=[];
function ListAll(){

    MiddleClear();
    BottomRightClear();
    TopRightClear();
    let container=document.querySelector(".container");

    for(i=0;i<all.length;i++){
    for(j=0;j<all[i].length;j++){
        let child= document.createElement('div');
        child.style.cssText+="color:black; font-family:Arial;border:1px solid black;padding:0.7rem";

        child.textContent=all[i][j].title;   

        child.onclick=function(){
        BottomRightWrite(all[i][j]);
        }
        container.appendChild(child);
    }
    }

}

function Search(){

    let news=document.querySelector(".container");
    let list=news.querySelectorAll("div");
    let value=document.querySelector(".finder").value; 
    
    for(i=0;i<list.length;i++){
    if(list[i].textContent.includes(value)===false){
        list[i].style["display"]="none";
    }
    else{
        list[i].style["display"]="block";
    }         
    }
}

function GetAdder(){
    let adder=document.querySelector(".form");
    let action=document.querySelector(".actions");
    if(adder.style["display"]==="block"){
    adder.style["display"]="none";
    action.style["display"]="block";
    }
    else{
    adder.style["display"]="block";
    action.style["display"]="none";
    }
    
}

function Save(){

    if(control()){

    let name=document.getElementById("name").value;
    let link=document.getElementById("link").value;

    let news=document.createElement('div');
    news.textContent=name.toUpperCase();
    news.onclick=function(){Get(link)};
    Get(link);
    news.style.cssText+="font-family:Arial;font-weight:bold;font-size:14px;display:block;margin-left:0.4rem;width:80%;height:3.5%;display:inline-block;padding-top:0.25rem;";        
    let adder=document.querySelector('.left');
    adder.appendChild(news);

    let close=document.createElement("div");
    close.style.cssText+="width:10%;height:3.5%;float:right;margin-right:0.2rem;"
        +"background-image:url(./images/close.png);background-position:center;background-repeat:no-repeat;";
    close.onclick=function(){Close(news,close)};
    adder.appendChild(close);
    }          
}

function Close(news,close){
    
    news.style.cssText="display:none;";
    close.style.cssText="display:none;";
    let container=document.querySelector(".container");

    for(j=0;j<all.length;j++){
    for(i=0;i<container.length;i++){
        if(container[i]===all[j][i]){
        all[j].splice(i,1);
        }
    }
    }
    container.style.cssText="display:none";
    let right=document.querySelector(".bottom-right");
    right.style.cssText="display:none";

    let newsName = document.querySelector('.top-right');
    let ctrl=newsName.lastElementChild;
    if(ctrl.id==="border"){

    }
    else{
    newsName.removeChild(ctrl);
    }
}

function control(){
    let name=document.getElementById("name").value;
    let link=document.getElementById("link").value;
    if(name===""){
    alert("Lütfen haber adını doldurun!");
    return false;
    }
    else if(link===""){
    alert("Lütfen haber linkini giriniz doldurun!");
    return false;
    }
    else{
    return true;
    }  
}

function Get(link){
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    
    let parser = new RSSParser({
    headers: {'User-Agent': 'something different'},
    timeout: 5000,
    });

    MiddleClear();
    BottomRightClear();
    TopRightClear();
    
    parser.parseURL(link, function(err, feed) {
    if (err) {
        alert("Girdiğiniz linke erişilememektedir!");
        let newsName = document.querySelector('.left');
        //önceki elementi siler
        let child=newsName.lastElementChild;
        newsName.removeChild(child);
        let child2=newsName.lastElementChild;
        newsName.removeChild(child2);
        return;
    }
    GetNews(feed);
    });
    
}
function GetNews(feed){
    news=[];
    let container = document.querySelector('.container');
    feed.items.forEach(function(item) {

    let feedContainer = document.createElement('div');
    feedContainer.style.cssText+="color:black; font-family:Arial;border:1px solid black;padding:0.7rem";

    feedContainer.onclick=function (){ 
        BottomRightClear(); 
        BottomRightWrite(item);
        TopRightClear();
        TopRightWrite(feed);
    }
    console.log(item);
    feedContainer.textContent=item.title;
    news.push(item);
    
    container.appendChild(feedContainer); 
    });
    all.push(news);
}
function MiddleClear(){

    let container = document.querySelector('.container');
    container.style["display"]="block";
    //önceki elementleri siler
    let child=container.lastElementChild;
    while(child){

    //child.style.cssText="display:none";
    container.removeChild(child);
    child=container.lastElementChild;
    }
    
}
function TopRightClear(){

    let newsName = document.querySelector('.top-right');
    let ctrl=newsName.lastElementChild;
    if(ctrl.id==="border"){

    }
    else{
    //ctrl.style["display"]="none";
    newsName.removeChild(ctrl);
    }
}

function BottomRightClear(){
    let bottomRight = document.querySelector('.bottom-right');
    bottomRight.style.cssTex+="display:block";
    //önceki elementleri siler
    let child=bottomRight.lastElementChild;
    while(child){
    //child.style.cssText+="display:none";
    bottomRight.removeChild(child);
    child=bottomRight.lastElementChild;
    }
}  
function BottomRightWrite(item){
    let yaz=document.createElement('div');
    yaz.style.cssText+="font-family:Arial ;padding:1rem"
    yaz.textContent=item.contentSnippet;    

    let bottomRight = document.querySelector('.bottom-right');
    bottomRight.appendChild(yaz);
}

function TopRightWrite(feed){
    let img=document.createElement("div");
    img.style.cssText="background-image:url("+feed.image.url+");width:30%;height:90%;"+
    "background-repeat:no-repeat;float:left;display:inline;";

    let dene=document.querySelector(".top-right");
    dene.appendChild(img);
}