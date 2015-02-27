/*Swipe Menu SVG - by  @eustachethomas
https://github.com/Thomaseustache/swipe-menu-svg
*/
var wH, wW, startX, mouseX, mouseY, decX, decY;
$(document).ready(function(){

    path = $('.bg path').attr('d');
    isDragging = false;

    wH = $(window).height();
    wW = $(window).width();
    startX = 0;
    
    $(window).resize(function(event){
        wH = $(window).height();
        wW = $(window).width();
    });
    
    $(window).mousemove(function(event){
        if(isDragging){
            mouseX = event.pageX - startX;
            mouseY = event.pageY;
            decX = parseInt( mouseX/ wW *100 );
            decY = parseInt( mouseY/ wH *100 );
            console.log(decX, decY);
        }else{
            decX = decY = 0; 
        }
        transform();
    });
    
    $(window).mousedown(function(event){
        isDragging = true;
        startX = event.clientX;
    });
    $(window).mouseup(function(){
        isDragging = false;
    });
	
});


function transform(){
    var s = Snap( '.menu svg' );
        pathEl = s.select( 'path' );
    if( !$('.menu').hasClass('open') ){
        if(isDragging){
            newPath = 'M 0 0, L 0 100, L 0 100, C '+decX+' '+(decY-20)+' '+decX+' '+(decY+20)+' 0 0, Z';
            $('.bg path').attr('d', newPath);
        }else{
            newPath = path;
            $('.bg path').attr('d', newPath);
        }
        
        if(decX>50){
            newPath = 'M 0 0, L 0 100, L 40 100, L 40 0, Z';
            pathEl.stop().animate( { 'path' : newPath }, 800, mina.elastic );
            $('.menu').addClass('open');
        }
    }
}