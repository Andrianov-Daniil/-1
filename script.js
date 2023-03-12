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
    ShowAllFigures('1b1b1b1Wb111b11111111111b111w1b1111b1111w11111w11w11111ww1w1w1w1');
    //'1b1b1b1bb1b1b1b11b1b1b1b1111111111111111w1w1w1w11w1w1w1ww1w1w1w1'
    //'1b1b1b1Wb111b11111111111b111w1b1111b1111w11111w11w11111ww1w1w1w1'
    whose_move = true;
}

function addSquares(){
    console.log('addSquares');
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
    console.log('ShowAllFigures');
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
        case 'W': return '&#9786';//9921 9723  9678  9773
        case 'B': return '&#9787';//9923 9724  9673
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
}

function moveFigure(fromCoord, toCoord){
    if (whose_move){
        //ходы белых фигур
        if((!whitesCanCutDown()) && isBlackSquare(toCoord) && (map[fromCoord] == 'w') && (map[toCoord] == '1') 
            && ((fromCoord - 7 == toCoord) || (fromCoord - 9 == toCoord))){
            figure = map[fromCoord];
            showFigure(fromCoord, '1');
            showFigure(toCoord, figure);
            setDraggable();
            //проверка на дамку
            if (toCoord < 8){
                showFigure(toCoord, 'W');
            }
            whose_move = false;
            document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
            document.getElementsByClassName('whose_move')[0].style.color = "black";
        }
        //белые рубят
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'w') && (map[toCoord] == '1') 
                && (fromCoord - toCoord == 18) && ((map[fromCoord-9] == 'b') || (map[fromCoord-9] == 'B'))){
            figure = map[fromCoord];
            showFigure(toCoord, figure);
            showFigure(fromCoord-9, '1');
            showFigure(fromCoord, '1');
            setDraggable();
            if (toCoord < 8){
                showFigure(toCoord, 'W');
            }
            if(!figureCanCutDown(toCoord)){
                whose_move = false;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
                document.getElementsByClassName('whose_move')[0].style.color = "black";
            }
        }
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'w') && (map[toCoord] == '1') 
                && (fromCoord - toCoord == 14) && ((map[fromCoord-7] == 'b') || (map[fromCoord-7] == 'B'))){
            figure = map[fromCoord];
            showFigure(toCoord, figure);
            showFigure(fromCoord-7, '1');
            showFigure(fromCoord, '1');
            setDraggable();
            if (toCoord < 8){
                showFigure(toCoord, 'W');
            }
            if(!figureCanCutDown(toCoord)){
                whose_move = false;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
                document.getElementsByClassName('whose_move')[0].style.color = "black";
            }
        }
        //Ходы белых дамок
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'W') && (map[toCoord] == '1')){
            //ходы по /
            if ((Number(toCoord) - Number(fromCoord)) % 7 == 0){
                var to_coord = Number(toCoord);
                var first_black = 0;
                var coord_first_black = 0;
                //ход вверх
                if (Number(toCoord) < Number(fromCoord)){
                    while (to_coord < (Number(fromCoord) - 7)){
                        to_coord += 7;
                        if(map[to_coord] == 'b' || map[to_coord] == 'B'){
                            first_black++;
                            coord_first_black = to_coord;
                        }
                        if((map[to_coord] == 'w') || (map[to_coord] == 'W')){
                            showFigure(fromCoord, map[fromCoord]);
                            showFigure(toCoord, map[toCoord]);
                            setDraggable();
                            return;
                        }
                    }
                }
                //ход вниз
                else{
                    while (to_coord > (Number(fromCoord) + 7)){
                        to_coord -= 7;
                        if(map[to_coord] == 'b' || map[to_coord] == 'B'){
                            first_black++;
                            coord_first_black = to_coord;
                        }
                        if((map[to_coord] == 'w') || (map[to_coord] == 'W')){
                            showFigure(fromCoord, map[fromCoord]);
                            showFigure(toCoord, map[toCoord]);
                            setDraggable();
                            return;
                        }
                    }
                }
            }
            //ходы по \
            else if((toCoord - fromCoord) % 9 == 0){
                var to_coord = Number(toCoord);
                var first_black = 0;
                var coord_first_black = 0;
                //ход вверх
                if (Number(toCoord) < Number(fromCoord)){
                    while (to_coord < (Number(fromCoord) - 9)){
                        to_coord += 9;
                        if(map[to_coord] == 'b' || map[to_coord] == 'B'){
                            first_black++;
                            coord_first_black = to_coord;
                        }
                        if((map[to_coord] == 'w') || (map[to_coord] == 'W')){
                            showFigure(fromCoord, map[fromCoord]);
                            showFigure(toCoord, map[toCoord]);
                            setDraggable();
                            return;
                        }
                    }
                }
                //ход вниз
                else{
                    while (to_coord > (Number(fromCoord) + 9)){
                        to_coord -= 9;
                        if(map[to_coord] == 'b' || map[to_coord] == 'B'){
                            first_black++;
                            coord_first_black = to_coord;
                        }
                        if((map[to_coord] == 'w') || (map[to_coord] == 'W')){
                            showFigure(fromCoord, map[fromCoord]);
                            showFigure(toCoord, map[toCoord]);
                            setDraggable();
                            return;
                        }
                    }
                }
            }
            else{
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
            if(first_black > 1){
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
            else if(first_black == 0 && (!whitesCanCutDown())){
                showFigure(toCoord, map[fromCoord]);
                showFigure(fromCoord, '1');
                setDraggable();
                whose_move = false;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
                document.getElementsByClassName('whose_move')[0].style.color = "black";
            }
            else if(first_black == 1){
                showFigure(toCoord, map[fromCoord]);
                showFigure(coord_first_black, '1');
                showFigure(fromCoord, '1');
                setDraggable();
                if(!figureCanCutDown(toCoord)){
                    whose_move = false;
                    document.getElementsByClassName('whose_move')[0].textContent = "Ход чёрных";
                    document.getElementsByClassName('whose_move')[0].style.color = "black";
                }
            }
            else{
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
        }
        else{
            showFigure(fromCoord, map[fromCoord]);
            showFigure(toCoord, map[toCoord]);
            setDraggable();
        }
    }
    else{
        //ходы чёрных фигур
        if((!blacksCanCutDown()) && isBlackSquare(toCoord) && (map[fromCoord] == 'b') && (map[toCoord] == '1')
            && ((fromCoord == toCoord - 7) || (fromCoord == toCoord - 9))){
            figure = map[fromCoord];
            showFigure(fromCoord, '1');
            showFigure(toCoord, figure);
            setDraggable();
            //проверка на дамку
            if (toCoord > 55){
                showFigure(toCoord, 'B');
            }
            whose_move = true;
            document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
            document.getElementsByClassName('whose_move')[0].style.color = "white";
        }
        //чёрные рубят
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'b') && (map[toCoord] == '1') 
                && (toCoord - fromCoord == 18) && ((map[toCoord-9] == 'w') || (map[toCoord-9] == 'W'))){
            figure = map[fromCoord];
            showFigure(toCoord, figure);
            showFigure(toCoord-9, '1');
            showFigure(fromCoord, '1');
            setDraggable();
            if (toCoord > 55){
                showFigure(toCoord, 'B');
            }
            if(!figureCanCutDown(toCoord)){
                whose_move = true;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
                document.getElementsByClassName('whose_move')[0].style.color = "white";
            }
            blacksCanCutDown();
        }
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'b') && (map[toCoord] == '1') 
                && (toCoord - fromCoord == 14) && ((map[toCoord-7] == 'w') || (map[toCoord-7] == 'W'))){
            figure = map[fromCoord];
            showFigure(toCoord, figure);
            showFigure(toCoord-7, '1');
            showFigure(fromCoord, '1');
            setDraggable();
            if (toCoord > 55){
                showFigure(toCoord, 'B');
            }
            if(!figureCanCutDown(toCoord)){
                whose_move = true;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
                document.getElementsByClassName('whose_move')[0].style.color = "white";
            }
            blacksCanCutDown();
        }
        //Ходы чёрных дамок
        else if(isBlackSquare(toCoord) && (map[fromCoord] == 'B') && (map[toCoord] == '1')){
            //ходы по /
            if ((Number(toCoord) - Number(fromCoord)) % 7 == 0){
                var to_coord = Number(toCoord);
                var first_white = 0;
                var coord_first_white = 0;
                //ход вверх
                if (Number(toCoord) < Number(fromCoord)){
                    while (to_coord < Number(fromCoord)){
                        to_coord += 7;
                        if(map[to_coord] == 'w' || map[to_coord] == 'W'){
                            first_white++;
                            coord_first_white = to_coord;
                        }
                    }
                }
                //ход вниз
                else{
                    while (to_coord > Number(fromCoord)){
                        to_coord -= 7;
                        if(map[to_coord] == 'w' || map[to_coord] == 'W'){
                            first_white++;
                            coord_first_white = to_coord;
                        }
                    }
                }
            }
            //ходы по \
            else if((toCoord - fromCoord) % 9 == 0){
                var to_coord = Number(toCoord);
                var first_white = 0;
                var coord_first_white = 0;
                //ход вверх
                if (Number(toCoord) < Number(fromCoord)){
                    while (to_coord < Number(fromCoord)){
                        to_coord += 9;
                        if(map[to_coord] == 'w' || map[to_coord] == 'W'){
                            first_white++;
                            coord_first_white = to_coord;
                        }
                    }
                }
                //ход вниз
                else{
                    while (to_coord > Number(fromCoord)){
                        to_coord -= 9;
                        if(map[to_coord] == 'w' || map[to_coord] == 'W'){
                            first_white++;
                            coord_first_white = to_coord;
                        }
                    }
                }
            }
            else{
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
            if(first_white > 1){
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
            else if(first_white == 0 && (!blacksCanCutDown())){
                showFigure(toCoord, map[fromCoord]);
                showFigure(fromCoord, '1');
                setDraggable();
                whose_move = true;
                document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
                document.getElementsByClassName('whose_move')[0].style.color = "white";
            }
            else if(first_white == 1){
                showFigure(toCoord, map[fromCoord]);
                showFigure(coord_first_white, '1');
                showFigure(fromCoord, '1');
                setDraggable();
                if(!figureCanCutDown(toCoord)){
                    whose_move = true;
                    document.getElementsByClassName('whose_move')[0].textContent = "Ход белых";
                    document.getElementsByClassName('whose_move')[0].style.color = "white";
                }
            }
            else{
                showFigure(fromCoord, map[fromCoord]);
                showFigure(toCoord, map[toCoord]);
                setDraggable();
            }
        }
        else{
            showFigure(fromCoord, map[fromCoord]);
            showFigure(toCoord, map[toCoord]);
            setDraggable();
        }
    }
    maybeVin();
    whitesCanCutDown();
}

function figureCanCutDown(i){//фигура и её координата
    if (map[i] == 'w'){
        if (((map[i-7] == 'b') || (map[i-7] == 'B')) && ((map[i-14] == '1') && (isBlackSquare(i-14)))){
            return true;
        }
        if (((map[i-9] == 'b') || (map[i-9] == 'B')) && ((map[i-18] == '1') && (isBlackSquare(i-18)))){
            return true;
        }
    }
    else if (map[i] == 'W'){
        var a = 7;
        //движение по /
        while ((i-a) > 0 || (i+a) < 64){
            if ((map[i-a] == 'w') || (map[i-a] == 'W') || (map[i+a] == 'w') || (map[i+a] == 'W')){
                break;
            }
            if (((map[i-a] == 'b') || (map[i-a] == 'B')) && ((map[i-a-7] == '1') && (isBlackSquare(i-a-7)))){
                return true;
            }
            if (((map[i+a] == 'b') || (map[i+a] == 'B')) && ((map[i+a+7] == '1') && (isBlackSquare(i+a+7)))){
                return true;
            }
            a += 7;
        }
        //движение по \
        a = 9;
        while ((i-a) > 0 || (i+a) < 64){
            if ((map[i-a] == 'w') || (map[i-a] == 'W') || (map[i+a] == 'w') || (map[i+a] == 'W')){
                break;
            }
            if (((map[i-a] == 'b') || (map[i-a] == 'B')) && ((map[i-a-9] == '1') && (isBlackSquare(i-a-9)))){
                return true;
            }
            if (((map[i+a] == 'b') || (map[i+a] == 'B')) && ((map[i+a+9] == '1') && (isBlackSquare(i+a+9)))){
                return true;
            }
            a += 9;
        }
    }
    else if (map[i] == 'b'){
        if (((map[i-(-7)] === 'w') || (map[i-(-7)] == 'W')) && ((map[i-(-14)] == '1') && (isBlackSquare(i-(-14))))){
            return true;
        }
        if (((map[i-(-9)] == 'w') || (map[i-(-9)] == 'W')) && ((map[i-(-18)] == '1') && (isBlackSquare(i-(-18))))){
            return true;
        }
    }
    else if (map[i] == 'B'){
        var a = 7;
        //движение по /
        while ((i-a) > 0 || (i+a) < 64){
            if ((map[i-a] == 'b') || (map[i-a] == 'B') || (map[i+a] == 'b') || (map[i+a] == 'B')){
                break;
            }
            if (((map[i-a] == 'w') || (map[i-a] == 'W')) && ((map[i-a-7] == '1') && (isBlackSquare(i-a-7)))){
                return true;
            }
            if (((map[i+a] == 'w') || (map[i+a] == 'W')) && ((map[i+a+7] == '1') && (isBlackSquare(i+a+7)))){
                return true;
            }
            a += 7;
        }
        //движение по \
        a = 9;
        while ((i-a) > 0 || (i+a) < 64){
            if ((map[i-a] == 'b') || (map[i-a] == 'B') || (map[i+a] == 'b') || (map[i+a] == 'B')){
                break;
            }
            if (((map[i-a] == 'w') || (map[i-a] == 'W')) && ((map[i-a-9] == '1') && (isBlackSquare(i-a-9)))){
                return true;
            }
            if (((map[i+a] == 'w') || (map[i+a] == 'W')) && ((map[i+a+9] == '1') && (isBlackSquare(i+a+9)))){
                return true;
            }
            a += 9;
        }
    }
    return false;
}

//для дамок нужно прописать проверку сначала только вниз, потом только вверх
function whitesCanCutDown(){
    for (var i = 0; i < 64; i++) {
        if (map[i] == 'w'){
            if (((map[i-7] == 'b') || (map[i-7] == 'B')) && ((map[i-14] == '1') && (isBlackSquare(i-14)))){
                return true;
            }
            if (((map[i-9] == 'b') || (map[i-9] == 'B')) && ((map[i-18] == '1') && (isBlackSquare(i-18)))){
                return true;
            }
        }
        else if (map[i] == 'W'){
            var a = 7;
            //движение по /
            while ((i-a) > 0 || (i+a) < 64){
                if ((map[i-a] == 'w') || (map[i-a] == 'W') || (map[i+a] == 'w') || (map[i+a] == 'W')){
                    break;
                }
                if (((map[i-a] == 'b') || (map[i-a] == 'B')) && ((map[i-a-7] == '1') && (isBlackSquare(i-a-7)))){
                    return true;
                }
                if (((map[i+a] == 'b') || (map[i+a] == 'B')) && ((map[i+a+7] == '1') && (isBlackSquare(i+a+7)))){
                    return true;
                }
                a += 7;
            }
            //движение по \
            a = 9;
            while ((i-a) > 0 || (i+a) < 64){
                if ((map[i-a] == 'w') || (map[i-a] == 'W') || (map[i+a] == 'w') || (map[i+a] == 'W')){
                    break;
                }
                if (((map[i-a] == 'b') || (map[i-a] == 'B')) && ((map[i-a-9] == '1') && (isBlackSquare(i-a-9)))){
                    return true;
                }
                if (((map[i+a] == 'b') || (map[i+a] == 'B')) && ((map[i+a+9] == '1') && (isBlackSquare(i+a+9)))){
                    return true;
                }
                a += 9;
            }
        }
    }
    return false;
}

function blacksCanCutDown(){
    for (var i = 0; i < 64; i++) {
        if (map[i] == 'b'){
            if (((map[i+7] == 'w') || (map[i+7] == 'W')) && ((map[i+14] == '1') && (isBlackSquare(i+14)))){
                return true;
            }
            if (((map[i+9] == 'w') || (map[i+9] == 'W')) && ((map[i+18] == '1') && (isBlackSquare(i+18)))){
                return true;
            }
        }
        else if (map[i] == 'B'){
            var a = 7;
            //движение по /
            while ((i-a) > 0 || (i+a) < 64){
                if ((map[i-a] == 'b') || (map[i-a] == 'B') || (map[i+a] == 'b') || (map[i+a] == 'B')){
                    break;
                }
                if (((map[i-a] == 'w') || (map[i-a] == 'W')) && ((map[i-a-7] == '1') && (isBlackSquare(i-a-7)))){
                    return true;
                }
                if (((map[i+a] == 'w') || (map[i+a] == 'W')) && ((map[i+a+7] == '1') && (isBlackSquare(i+a+7)))){
                    return true;
                }
                a += 7;
            }
            //движение по \
            a = 9;
            while ((i-a) > 0 || (i+a) < 64){
                if ((map[i-a] == 'b') || (map[i-a] == 'B') || (map[i+a] == 'b') || (map[i+a] == 'B')){
                    break;
                }
                if (((map[i-a] == 'w') || (map[i-a] == 'W')) && ((map[i-a-9] == '1') && (isBlackSquare(i-a-9)))){
                    return true;
                }
                if (((map[i+a] == 'w') || (map[i+a] == 'W')) && ((map[i+a+9] == '1') && (isBlackSquare(i+a+9)))){
                    return true;
                }
                a += 9;
            }
        }
    }
    return false;
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