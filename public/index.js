function display() {
  var div = document.createElement("div")
  div.className = "shape"
  div.innerHTML = "ITEMS:"
  $("#items").append(div)
  var items = loadAllItems()
  $.each(items, function(i, val) {
    var item = document.createElement("div")
    item.className = "shape"
    item.id = val.id
    var number = document.createElement("div")
    number.className = "content"
    number.innerHTML = i + 1
    item.append(number)
    var name = document.createElement("div")
    name.className = "content"
    name.innerHTML = val.name
    item.append(name)
    var price = document.createElement("div")
    price.className = "content"
    price.innerHTML = "¥ " + val.price
    item.append(price)
    $("#items").append(item)
    var content = ""
    content += `<input type='text' name=${val.name} value='0' price=${val.price}>`
    $(`#${val.id}`).append(content)
  })
  var div = document.createElement("div")
  div.className = "shape"
  div.innerHTML = "PROMOTIONS:"
  $("#promotions").append(div)
  var promotion = loadPromotions()
  $.each(promotion, function(i, val) {
    var promotion = document.createElement("div")
    promotion.className = "shape"
    promotion.id = val.id
    var number = document.createElement("div")
    number.className = "content"
    number.innerHTML = i + 1
    promotion.append(number)
    var type = document.createElement("div")
    type.className = "content"
    type.innerHTML = val.type
    promotion.append(type)
    if (val.items != undefined) {
      var item = val.items
      $.each(item, function(i, val) {
        var item = document.createElement("div")
        item.className = "content"
        item.innerHTML = items.find(item=>item.id==val).name
        promotion.append(item)
      })
    }
    $("#promotions").append(promotion)
  })
}
function calculatePrice(){
    var items = loadAllItems()
    var selectedItems=[];
    $("input").each(function(){
        if(this.value != 0){
          selectedItems.push(`${items.find(item => item.name==this.name).id} * ${ this.value}`)
        }
    })
    var list=bestCharge(selectedItems);
    $("#message").append("============= 订餐明细 =============<br>")
    list.Items.forEach(function(value,i){
      $("#message").append(value+"<br>")
    })
    $("#message").append("-----------------------------------<br>")
    if(list.promotions != undefined){
      $("#message").append("使用优惠：<br>")
      $("#message").append(list.Promotion+", 省"+list.Save+"元<br>")
      $("#message").append("-----------------------------------<br>")
    }
    $("#message").append(`总计： ${list.Price}元<br>`)
    $("#message").append("===================================<br>")
}

function clear2(){
  $("input").each(function(){
    this.value=0;
  })
  $("#message").empty();
}