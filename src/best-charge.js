function bestCharge(selectedItems) {
  var list = new Object();
  list.Items=[];
  var items=loadAllItems();
  var promotions=loadPromotions();
  var Item;
  var Count;
  var Price;
  var promotion_1=0;
  var promotion_2=0
  selectedItems.forEach(function(value){
    Item=items.find(item => item.id==value.split(' * ')[0]).name;
    Count=value.split(' * ')[1];
    Price=items.find( item=> item.name==Item).price * Count;
    list.Items.push(`${Item} * ${Count} = ${Price} 元`)
    promotion_1 += Price;
    if(promotions[1].items.findIndex(a => a==value.split(' * ')[0]) != -1){
      promotion_2 += (Price/2);
    }
    else{
      promotion_2 +=Price;
    }
  })
  if(promotion_1 >= 30){
    if(promotion_1 <= promotion_2+6){
      list.Promotion=promotions[0].type;
      list.Save=6;
      list.Price=promotion_1-6;
    }
    else{
      list.Promotion=promotions[1].type+" ( ";
      selectedItems.forEach(function(value){
        if(promotions[1].items.findIndex(a => a==value.split(' * ')[0]) != -1){
          list.Promotion +=items.find(item => item.id==value.split(' * ')[0]).name+" ";
        }
      })
      list.Promotion +=")";
      list.Save=promotion_1 - promotion_2;
      list.Price=promotion_2;
    }
  }
  else{
    if(promotion_1 == promotion_2){
      list.Price=promotion_1;
    }
    else{
      list.Promotion=promotions[1].type;
      list.Save = promotion_1 - promotion_2;
      list.Price=promotion_2;
    }
  }
  return list;
}
