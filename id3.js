// var testSample = [
//   {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"No"},
//   {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Strong","Play ball":"No"},
//   {"Outlook":"Overcast","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"No"},
//   {"Outlook":"Overcast","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
//   {"Outlook":"Sunny","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"No"},
//   {"Outlook":"Sunny","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Rain","Temperature":"Mild","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Sunny","Temperature":"Mild","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
//   {"Outlook":"Overcast","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"Yes"},
//   {"Outlook":"Overcast","Temperature":"Hot","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
//   {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"No"},
// ];

Sample = {
  isValidData: function(sample, constraint) {
    if (constraint == null) {
      return true;
    }

    var result = true;
    constraint.forEach(function(item, index){
      if (sample[item["attr"]] != item["value"]) {
        result = false;
        return;
      }
    });
    return result;
  },
  
  isValidAttr: function(attr, constraint) {
    if (constraint == null) {
      return false;
    }

    var result = false;
    constraint.forEach(function(item, index){
      if (item["attr"] == attr) {
        result = true;
        return;
      }
    });
    return result;
  },
}

SampleSet = {
  count: function(sampleSet, attr, constraint) {
    var attrData = {"total":0, "data":{}};
    sampleSet.forEach(function(item, index){
      if (!Sample.isValidData(item, constraint)) {
        return;
      }

      if (attrData["data"][item[attr]] != undefined) {
        attrData["data"][item[attr]]++;
      } else {
        attrData["data"][item[attr]] = 1;
      }
      attrData["total"]++;
    });

    return attrData;
  },
  
  buildFromTable: function(table) {
    var sampleSet = [];
    for(var i = 1; i < table.rows.length;i++){
      var sample = {};
      sampleSet.push(sample);
      for(var j = 1; j < table.rows[i].cells.length; j++){
	var attr = table.rows[0].cells[j].innerHTML.replace(/<.+?>/gim,'').replace(/\n\s*/gim,'');
        sample[attr] = table.rows[i].cells[j].innerHTML.replace(/<.+?>/gim,'').replace(/\s*/gim,'');
      }
    }
    console.log("Sample Set: " + JSON.stringify(sampleSet));
    return sampleSet;
  }
}

ID3 = {
  decisionTree: {nodes: [], edges: []},
  decisionBrachs: [],
  getEntropy: function(sampleSet, attr, constraint) {
    var attrData = SampleSet.count(sampleSet, attr, constraint);
    
    var entropy = 0.0;
    Object.keys(attrData["data"]).forEach(function(item, index){
      entropy += -(attrData["data"][item] / attrData["total"]) 
        * (Math.log(attrData["data"][item] / attrData["total"]) / Math.log(2));
    });
    return entropy;
  },
  
  getGain: function(sampleSet, attr, gainAttr, constraint) {
    var gain = ID3.getEntropy(sampleSet, attr);
    if (gain == 0.0) {
      return gain;
    }

    var attrData = SampleSet.count(sampleSet, gainAttr, null);
    Object.keys(attrData["data"]).forEach(function(item, index){
      var newConstraint = null;
      if (constraint == null) {
        newConstraint = [{"attr":gainAttr, "value":item}];
      } else {
        newConstraint = constraint.concat({"attr":gainAttr, "value":item});
      }
      gain -= (attrData["data"][item] / attrData["total"]) * ID3.getEntropy(sampleSet, attr, newConstraint);
    });
    console.log("Gain for " + gainAttr + " is : " + gain);
    return gain;
  },
  
  getDecisionNode: function(sample, attr, constraint) {
    if (ID3.getEntropy(sample, attr, constraint) == 0) {
      console.log("Decision node is null for the entropy is 0 for " + attr);
      return null;
    }
    var decision = {"gain":0.0};
    Object.keys(sample[0]).forEach(function(item, index){
      if (attr == item || Sample.isValidAttr(item, constraint)) {
        return;
      }

      var gain = ID3.getGain(sample, attr, item, constraint); 
      if (gain > decision["gain"]) {
        decision["gain"] = gain;
        decision["attr"] = item;
      }
    });
    console.log("Decision node: " + decision["attr"]);
    return decision["attr"];
  },

  genDecisionbranch: function(sample, attr, constraint) {
    var from = null;
    if (constraint == undefined) {
      constraint = null;
    } else {
      from = constraint[constraint.length - 1]["attr"];
    }
    
    var decisionNode = ID3.getDecisionNode(sample, attr, constraint);
    if (decisionNode != null && decisionNode != undefined) {
      ID3.decisionTree.nodes.push({id: decisionNode, label: decisionNode, shape: "box"});
      if (from != null) {
        ID3.decisionTree.edges.push({from: from, to: decisionNode, label: constraint[constraint.length - 1]["value"]});
      }

      var attrData = SampleSet.count(sample, decisionNode, constraint);
      Object.keys(attrData["data"]).forEach(function(item, index){        
        var newConstraint = null;
        if (constraint == null) {
          newConstraint = [{"attr":decisionNode, "value":item}];
        } else {
          newConstraint = constraint.concat({"attr":decisionNode, "value":item});
        }
        ID3.genDecisionbranch(sample, attr, newConstraint);
      });
    } else {
      attrData = SampleSet.count(sample, attr, constraint);
      var leaf = Object.keys(attrData["data"])[0];
      if (constraint != null) {
	var leftId = from + "-" + constraint[constraint.length - 1]["value"] + "-" +leaf;
	ID3.decisionTree.nodes.push({id: leftId, label: leaf, shape: "triangleDown"});
	ID3.decisionTree.edges.push({from: from, to: leftId, label: constraint[constraint.length - 1]["value"]});
      	console.log("Decision branch: " + JSON.stringify(constraint) + "=>" + leaf);
      	ID3.decisionBrachs.push(constraint.concat({"attr":attr, "value":leaf}));
      }
    }
  },
  learn: function(table, attr) {
    var sampleSet = SampleSet.buildFromTable(table);
    ID3.genDecisionbranch(sampleSet, attr);
//     console.log("Tree: " + JSON.stringify(ID3.decisionTree));
  },
  makeDecision: function(attr, conditions) {
    var decision = "Unknown";
    ID3.decisionBrachs.forEach(function(branch, index){
      if (decision != "Unknown") {
        return;
      }
      decision = branch[branch.length - 1]["value"];
      console.log("branch decision: " + decision);
      branch.forEach(function(item, index){
        if (item["attr"] == attr) {
	  return;
	}
        if (item["value"] != conditions[item["attr"]]) {
          decision = "Unknown";
	  return;
	}
      });
    });
    return decision;
  },
}
console.log("Version: 1.1.0.0");
console.log("Release: framework is ready");


