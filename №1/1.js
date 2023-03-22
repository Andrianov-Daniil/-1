function search(){
    var str = document.getElementById('fullstr').value;
    var _str = document.getElementById('str').value;
    if (str == "" || _str == ""){
        alert("Нужно ввести строку и подстроку");
        return;
    }
    var a = "";
    for (var i = 0; i <= str.length; i++){
        if(str[i] == _str[0]){
            a = str.slice(i, i + _str.length);
            document.getElementById("return").innerHTML = a;
            if (a == _str){
                document.getElementById("return").innerHTML = "Подстрока найдена!  Позиция: " + i;
                return;
            }
            a = "";
        }
    }
    document.getElementById("return").innerHTML = "Подстрока не найдена!";
}