HtmlTable = {
  generate: function(data) {
    var tableHead = [];
    var isFirstData = true;
    data.forEach(function(item, index){
      Object.keys(item).forEach(function(attr, index){  
        if (tableHead.indexOf(attr) == -1) {
          if (isFirstData) {
            tableHead.push(attr);
          } else {
            tableHead.splice(-1, 0, attr);
          }
        }
      });
      isFirstData = false;
    });
    
    var htmlTable = "<table>";
    //head
    htmlTable += "<tr>";
    tableHead.forEach(function(item, index){
      htmlTable += "<th>" + item + "</th>";
    });
    htmlTable += "</tr>";
    
    //body
    data.forEach(function(row, index){
      htmlTable += "<tr>";
      tableHead.forEach(function(cell, index){  
        htmlTable += "<td>" + row[cell] + "</td>";
      });
      htmlTable += "</tr>";
    });
    htmlTable += "</table>";
    return htmlTable;
  },
}
