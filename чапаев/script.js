var map;
var divSquare = '<div id="s$coord" class="square $color"></div>';
var divFigure = '<div id="f$coord" class="figure">$figure</div>';
var whose_move; //ход белых == true; ход чёрных == false
//9678 - белая дамка  9673 - чёрная дамка

$(function () {
    start();
});

function start(){
    console.log('Hi, users! :)');
    map = new Array(64);
    addSquares();
    ShowAllFigures('b11b111w11111111111111b11b11111111111111111111b111ww111w111wwww');
    //'bbbbbbbb111111111111111111111111111111111111111111111111wwwwwwww'
    //'1b1b1b1bb1b1b1b11b1b1b1b1111111111111111w1w1w1w11w1w1w1ww1w1w1w1'
    //'1b1b1b1Wb111b11111111111b111w1b1111b1111w11111w11w11111ww1w1w1w1'
    
    whose_move = true;
}

function addSquares(){
    $('.board').html('');
    for(var coord = 0; coord < 64; coord++){
        $('.board').append(divSquare
                .replace('$coord', coord)
                .replace('$color', isBlackSquare(coord) ? 'black' : 'white'));
    }
    setDroppable();
}

function isBlackSquare(coord){
    if (coord > 63){
        return false;
    }
    return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function ShowAllFigures(figures){
    for (var coord = 0; coord < 64; coord++) {
        showFigure(coord, figures.charAt(coord));
    }
}

function showFigure(coord, figure){
    map[coord] = figure;
    $('#s' + coord).html(divFigure.replace('$coord',coord).replace('$figure', whatColor(figure)));
    setDraggable();
}

function whatColor(figure){
    switch(figure){
        case 'w': return '&#9898';//9898 9920
        case 'b': return '&#9899';//9899 9922
        //case 'W': return '&#9786';//9921 9723  9678  9773
        //case 'B': return '&#9787';//9923 9724  9673
        default : return '';
    }
}

//Функция для переноса фигур
function setDraggable(){
    $('.figure').draggable();
}

function setDroppable(){
    $('.square').droppable({
        drop: function(event, ui){
            var fromCoord = ui.draggable.attr('id').substring(1);
            var toCoord = this.id.substring(1);
            moveFigure(fromCoord, toCoord);
        }
    });
    $('body').droppable({
        drop: function(event, ui){
            var fromCoord = ui.draggable.attr('id').substring(1);
            showFigure(fromCoord, map[fromCoord]);
            PlayMusic();
        }
    });
}

// % - x
// / - y

function moveFigure(fromCoord, toCoord){
    if(fromCoord == toCoord){
        return;
    }
    
    if(whose_move){
        var WhoseMove = 'w';
    }
    else{
        var WhoseMove = 'b';
    }

    if(map[fromCoord] == WhoseMove){
        //прямой удар вверх или вниз
        if((fromCoord % 8) == (toCoord % 8)){
            var probability = 7;
            //проверим что на пути ничего нет
            if(Number(fromCoord) > Number(toCoord)){
                var start = Number(fromCoord);
                var end = Number(toCoord);
                start -= 8;
                while(start != end){
                    // != '1' потому что мы можем попасть и в свою фигуру
                    if(map[start] != '1'){
                        probability += Math.floor(Math.abs(((Math.floor(toCoord/8) - Math.floor(start/8)) / 2)));
                        toCoord = start;
                        showFigure(toCoord, map[fromCoord]);
                        showFigure(fromCoord, '1');
                        end_of_turn();
                        return;
                    }
                    start -= 8;
                }
            }
            else{
                var start = Number(fromCoord);
                var end = Number(toCoord);
                start += 8;
                while(start != end){
                    // != '1' потому что мы можем попасть и в свою фигуру
                    if(map[start] != '1'){
                        probability += Math.floor(Math.abs(((Math.floor(toCoord/8) - Math.floor(start/8)) / 2)));
                        toCoord = start;
                        showFigure(toCoord, map[fromCoord]);
                        showFigure(fromCoord, '1');
                        end_of_turn();
                        return;
                    }
                    start += 8;
                }
            }

            //вероятность попасть = probability * 100%
            if((Math.random() * 10) < probability){
                showFigure(toCoord, map[fromCoord]);
                showFigure(fromCoord, '1');
            }
            else{
                var shift = Number(toCoord);
                if ((Math.random() * 10) > 4){
                    if((toCoord % 8) == 7){
                        showFigure(fromCoord, '1');
                    }
                    else{
                        shift++;
                        showFigure(shift, map[fromCoord]);
                        showFigure(fromCoord, '1');
                    }
                }
                else{
                    if(toCoord % 8 == 0){
                        showFigure(fromCoord, '1');
                    }
                    else{
                        shift--;
                        showFigure(shift, map[fromCoord]);
                        showFigure(fromCoord, '1');   
                    }
                }
            }
            //фигура улетела за пределы поля
            if( ((Math.random() * 10) < 1) && ((Math.floor(toCoord/8) == 0) || (toCoord % 8 == 0)) ){
                console.log('Фигура улетела');
                showFigure(fromCoord, '1');
                showFigure(toCoord, '1');
            }
        }
        //прямой удар вправо или влево
        else if( Math.floor(fromCoord / 8) == Math.floor(toCoord / 8) ){
            var probability = 6;
            //проверим что на пути ничего нет
            if(Number(fromCoord) > Number(toCoord)){
                var start = Number(fromCoord);
                var end = Number(toCoord);
                start -= 1;
                while(start != end){
                    // != '1' потому что мы можем попасть и в свою фигуру
                    if(map[start] != '1'){
                        probability += Math.floor(Math.abs(((Math.floor(toCoord/8) - Math.floor(start/8)) / 2)));
                        toCoord = start;
                        showFigure(toCoord, map[fromCoord]);
                        showFigure(fromCoord, '1');
                        end_of_turn();
                        return;
                    }
                    start -= 1;
                }
            }
            else{
                var start = Number(fromCoord);
                var end = Number(toCoord);
                start += 1;
                while(start != end){
                    // != '1' потому что мы можем попасть и в свою фигуру
                    if(map[start] != '1'){
                        probability += Math.floor(Math.abs(((Math.floor(toCoord/8) - Math.floor(start/8)) / 2)));
                        toCoord = start;
                        showFigure(toCoord, map[fromCoord]);
                        showFigure(fromCoord, '1');
                        end_of_turn();
                        return;
                    }
                    start += 1;
                }
            }

            //вероятность попасть = probability * 100%
            if((Math.random() * 10) < probability){
                showFigure(toCoord, map[fromCoord]);
                showFigure(fromCoord, '1');
            }
            else{
                var shift = Number(toCoord);
                if ((Math.random() * 10) > 4){
                    if(Math.floor(toCoord / 8) == 7){
                        showFigure(fromCoord, '1');
                    }
                    else{
                        shift += 8;
                        showFigure(shift, map[fromCoord]);
                        showFigure(fromCoord, '1');
                    }
                }
                else{
                    if(Math.floor(toCoord / 8) == 0){
                        showFigure(fromCoord, '1');
                    }
                    else{
                        shift -= 8;
                        showFigure(shift, map[fromCoord]);
                        showFigure(fromCoord, '1');   
                    }
                }
            }
            //фигура улетела за пределы поля
            if( ((Math.random() * 10) < 1) && ((Math.floor(toCoord/8) == 0) || (toCoord % 8 == 0)) ){
                console.log('Фигура улетела');
                showFigure(fromCoord, '1');
                showFigure(toCoord, '1');
            }
        }
        //удар по диагонали
        else {
            var x_1 = (Number(fromCoord) % 8);
            var y_1 = Math.floor((Number(fromCoord) / 8));
            var x_2 = (Number(toCoord) % 8);
            var y_2 = Math.floor((Number(toCoord) / 8));
            //удар влево
            if(x_1 > x_2){
                //удар вверх
                if(y_1 > y_2){
                    var i = Number(toCoord) + 8;
                    if(Math.abs(x_1 - x_2) >= 4){
                        var a = 3;
                    }
                    else{
                        var a = 2;
                    }
                    var arr = [Number(toCoord)];
                    if (x_2 != 0){
                        arr.push(Number(toCoord) - 1);   
                    }
                    if (x_2 != 7){
                        arr.push(Number(toCoord) + 1);   
                    }
                    y_2 += 1;
                    while(y_1 > y_2){
                        if(map[i] != '1'){
                            arr.push(i);
                        }
                        if(map[i + 8] != '1'){
                            arr.push(i+8);
                        }
                        if( i % 8 == x_1){
                            a=1;
                        }
                        for(var b = 1; b < a; b++){
                            if(map[i + b] != '1'){
                                arr.push(i+b);
                            }
                            if(map[i + 8 + b] != '1'){
                                arr.push(i + 8 + b);
                            }
                        }
                        i += 17;
                        y_2 += 2;
                        if(y_2 + 1 == y_1){
                            if(map[i] != '1'){
                                arr.push(i);
                            }
                            for(var b = 1; b <= a; b++){
                                if(map[i + b] != '1'){
                                    arr.push(i+b);
                                }
                            }
                            break;
                        }
                    }
                    var random = Math.floor(Math.random() * arr.length);
                    showFigure(arr[random], map[fromCoord]);
                    showFigure(fromCoord, '1');
                    end_of_turn();
                    return;
                }
                //удар вниз
                if(y_1 < y_2){
                    var i = Number(toCoord) - 8;
                    if(Math.abs(x_1 - x_2) >= 4){
                        var a = 3;
                    }
                    else{
                        var a = 2;
                    }
                    var arr = [Number(toCoord)];
                    if (x_2 != 0){
                        arr.push(Number(toCoord) - 1);   
                    }
                    if (x_2 != 7){
                        arr.push(Number(toCoord) + 1);   
                    }
                    y_2 -= 1;
                    while(y_1 < y_2){
                        if(map[i] != '1'){
                            arr.push(i);
                        }
                        if(map[i - 8] != '1'){
                            arr.push(i-8);
                        }
                        if( i % 8 == x_1){
                            a=1;
                        }
                        for(var b = 1; b < a; b++){
                            if(map[i + b] != '1'){
                                arr.push(i+b);
                            }
                            if(map[i - 8 + b] != '1'){
                                arr.push(i - 8 + b);
                            }
                        }
                        i -= 15;
                        y_2 -= 2;
                        if(y_2 - 1 == y_1){
                            if(map[i] != '1'){
                                arr.push(i);
                            }
                            for(var b = 1; b <= a; b++){
                                if(map[i + b] != '1'){
                                    arr.push(i+b);
                                }
                            }
                            break;
                        }
                    }
                    var random = Math.floor(Math.random() * arr.length);
                    showFigure(arr[random], map[fromCoord]);
                    showFigure(fromCoord, '1');
                    end_of_turn();
                    return;
                }
            }
            //удар вправо
            if(x_1 < x_2){
                //удар вверх
                if(y_1 > y_2){
                    var i = Number(toCoord) + 8;
                    if(Math.abs(x_1 - x_2) >= 4){
                        var a = 3;
                    }
                    else{
                        var a = 2;
                    }
                    var arr = [Number(toCoord)];
                    if (x_2 != 0){
                        arr.push(Number(toCoord) - 1);   
                    }
                    if (x_2 != 7){
                        arr.push(Number(toCoord) + 1);   
                    }
                    y_2 += 1;
                    while(y_1 > y_2){
                        if(map[i] != '1'){
                            arr.push(i);
                        }
                        if(map[i + 8] != '1'){
                            arr.push(i+8);
                        }
                        if( i % 8 == x_1){
                            a=1;
                        }
                        for(var b = 1; b < a; b++){
                            if(map[i - b] != '1'){
                                arr.push(i-b);
                            }
                            if(map[i + 8 - b] != '1'){
                                arr.push(i + 8 - b);
                            }
                        }
                        i += 17;
                        y_2 += 2;
                        if(y_2 + 1 == y_1){
                            if(map[i] != '1'){
                                arr.push(i);
                            }
                            for(var b = 1; b <= a; b++){
                                if(map[i - b] != '1'){
                                    arr.push(i-b);
                                }
                            }
                            break;
                        }
                    }
                    var random = Math.floor(Math.random() * arr.length);
                    showFigure(arr[random], map[fromCoord]);
                    showFigure(fromCoord, '1');
                    end_of_turn();
                    return;
                }
                //удар вниз
                if(y_1 < y_2){
                    var i = Number(toCoord) - 8;
                    if(Math.abs(x_1 - x_2) >= 4){
                        var a = 3;
                    }
                    else{
                        var a = 2;
                    }
                    var arr = [Number(toCoord), Number(toCoord) + 1,];
                    if (x_2 != 0){
                        arr.push(Number(toCoord) - 1);   
                    }
                    if (x_2 != 7){
                        arr.push(Number(toCoord) + 1);   
                    }
                    y_2 -= 1;
                    while(y_1 < y_2){
                        if(map[i] != '1'){
                            arr.push(i);
                        }
                        if(map[i - 8] != '1'){
                            arr.push(i-8);
                        }
                        if( i % 8 == x_1){
                            a=1;
                        }
                        for(var b = 1; b < a; b++){
                            if(map[i - b] != '1'){
                                arr.push(i-b);
                            }
                            if(map[i - 8 - b] != '1'){
                                arr.push(i - 8 - b);
                            }
                        }
                        i -= 15;
                        y_2 -= 2;
                        if(y_2 - 1 == y_1){
                            if(map[i] != '1'){
                                arr.push(i);
                            }
                            for(var b = 1; b <= a; b++){
                                if(map[i - b] != '1'){
                                    arr.push(i-b);
                                }
                            }
                            break;
                        }
                    }
                    var random = Math.floor(Math.random() * arr.length);
                    showFigure(arr[random], map[fromCoord]);
                    showFigure(fromCoord, '1');
                    end_of_turn();
                    return;
                }
            }
        }
        // else{
        //     showFigure(toCoord, map[fromCoord]);
        //     showFigure(fromCoord, '1');
        // }
    }
    else{
        showFigure(fromCoord, map[fromCoord]);
        return;
    }
    end_of_turn();
}

function end_of_turn(){
    whose_move = !whose_move;
    if(whose_move){
        document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
        document.getElementsByClassName('whose_move')[0].style.color = "white";
    }
    else{
        document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
        document.getElementsByClassName('whose_move')[0].style.color = "black";
    }
    PlayMusic();
    maybeVin();
}

function maybeVin(){
    var black = 0;
    var white = 0;
    var i = 0;
    while((white == 0 || black == 0) && (i < 64)){
        if (map[i] == 'b' || map[i] == 'B'){
            black++;
        }
        else if (map[i] == 'w' || map[i] == 'W'){
            white++;
        }
        i++;
    }
    if (white == 0){
        console.log('ПОБЕДИЛА КРАСНАЯ АРМИЯ!');
        document.getElementsByClassName('whose_move')[0].textContent = "ЧЁРНЫЕ ПОБЕДИЛИ!";
        document.getElementsByClassName('whose_move')[0].style.color = "red";
    }
    if (black == 0){
        console.log('ПОБЕДИЛА КРАСНАЯ АРМИЯ!');
        document.getElementsByClassName('whose_move')[0].textContent = "БЕЛЫЕ ПОБЕДИЛИ!";
        document.getElementsByClassName('whose_move')[0].style.color = "red";
    }
}

function PlayMusic(){
    let audio = new Audio("movement_01.mp3");
    audio.play();
}