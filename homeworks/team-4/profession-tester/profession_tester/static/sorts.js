{
    {
        sorting();
    }
}
function sorting() {
var arr=[2,3,2,4,1,2,9,5,3,1];

var arr2={};
for(i in arr){
(arr2[arr[i]]!=undefined)?(arr2[arr[i]]++):(arr2[arr[i]]=1);
}
    var harr = [];
    for (var key in arr2) {
    if (arr2.hasOwnProperty(key)) {
        harr.push(arr2[key]);
    }
}
harr.sort().reverse();
    Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
};
    var first =  arr2.getKeyByValue(harr[0]);
    var second =  arr2.getKeyByValue(harr[1]);
    if (first != second){document.getElementById("list-questions").innerHTML = first}
    else {document.getElementById("list-questions").innerHTML = "ooops... try again!";}

}