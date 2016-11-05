HtmlTable = {
  tableHead : [],
  addTableHead: function(head) {
    HtmlTable.tableHead.push(head);
  },
  
  addTableHeadBeforeLast: function(head) {
    HtmlTable.tableHead.splice(-1, 0, head);
  },
  
  clearTableHead: function() {
    HtmlTable.tableHead = [];
  },
  
  generate: function(id, data) {
    var htmlTable = "<table id='" + id + "'>";
    //head
    htmlTable += "<tr>";
    HtmlTable.tableHead.forEach(function(item, index){
      htmlTable += "<th>" + item + "</th>";
    });
    htmlTable += "</tr>";
    
    //body
    data.forEach(function(row, index){
      htmlTable += "<tr>";
      HtmlTable.tableHead.forEach(function(cell, index){  
        htmlTable += "<td>" + row[cell] + "</td>";
      });
      htmlTable += "</tr>";
    });
    htmlTable += "</table>";
    return htmlTable;
  },
}
