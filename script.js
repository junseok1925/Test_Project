let cnt = 0;
$('#mode').on('click',function(){
    cnt++;
    if(cnt%2===0){
        $('#mode').attr('value','라이트모드');
        // $('#mode').value('라이트모드'); 위에 코드와 같은의미
        $('body').css('backgroundColor','black');

    }else{
        $('#mode').attr('value','다크모드');
        // $('#mode').value('라이트모드'); 위에 코드와 같은의미
        $('body').css('backgroundColor','white');
    }
});