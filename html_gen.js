HtmlTable = {
  getTableHead: function(data) {
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
    return tableHead;
  },
  
  genHtmlHead: function(tableHead) {
    var html = "<tr>";
    tableHead.forEach(function(item, index){
      html += "<th>" + item + "</th>";
    });
    html += "</tr>";
    return html;
  },
  
  genHtml: function(data, id) {
    var tableHead = HtmlTable.getTableHead(data);
    var htmlTable = "<table id='" + id + "'>";
    //head
    htmlTable += HtmlTable.genHtmlHead(tableHead);
    
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

HtmlSelect = {
  genHtml: function(id, options) {
    var htmlSelect = "<select id='" + id + "'>";
    options.forEach(function(item, index){
      htmlSelect += "<option>" + item + "</option>";
    });
    htmlSelect += "</select>";
    return htmlSelect;
  },
}
