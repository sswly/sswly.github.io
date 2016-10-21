var testSample = [
  {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"No"},
  {"Outlook":"Sunny","Temperature":"Hot","Humidity":"High","Wind":"Strong","Play ball":"No"},
  {"Outlook":"Overcast","Temperature":"Hot","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"No"},
  {"Outlook":"Overcast","Temperature":"Cool","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Sunny","Temperature":"Mild","Humidity":"High","Wind":"Weak","Play ball":"No"},
  {"Outlook":"Sunny","Temperature":"Cool","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Sunny","Temperature":"Mild","Humidity":"Normal","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Overcast","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"Yes"},
  {"Outlook":"Overcast","Temperature":"Hot","Humidity":"Normal","Wind":"Weak","Play ball":"Yes"},
  {"Outlook":"Rain","Temperature":"Mild","Humidity":"High","Wind":"Strong","Play ball":"No"},
];

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
  }
}

ID3 = {
  tree: {nodes: [], edges: []},
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
    return gain;
  },
  
  getDecisionNode: function(sample, attr, constraint) {
    if (ID3.getEntropy(sample, attr, constraint) == 0) {
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

    return decision["attr"];
  },

  genDecisionTree: function(sample, attr, decisionTree) {
    if (decisionTree == undefined) {
      decisionTree = null;
    }
    
    var decisionNode = ID3.getDecisionNode(sample, attr, decisionTree);
    if (decisionNode != null && decisionNode != undefined) {
      tree[nodes].push({id: decisionNode, label: decisionNode});
      var attrData = SampleSet.count(sample, decisionNode, decisionTree);
      Object.keys(attrData["data"]).forEach(function(item, index){
        var newDecisionTree = null;
        if (decisionTree == null) {
          newDecisionTree = [{"attr":decisionNode, "value":item}];
        } else {
          newDecisionTree = decisionTree.concat({"attr":decisionNode, "value":item});
        }
        ID3.genDecisionTree(sample, attr, newDecisionTree);
      });
    } else {
      attrData = SampleSet.count(sample, attr, decisionTree);
      tree[nodes].push({id: attrData["data"])[0], label: attrData["data"])[0]});
      console.log("Decision branch: " + JSON.stringify(decisionTree) + "=>" + Object.keys(attrData["data"])[0]);
    }
  },
}

function test() {
  console.log("Version: 1.0.3.1");
  console.log("Release: refactor with object");
//   console.log("entropy=" + getEntropy(testSample, "Play ball", null));
//   Object.keys(testSample[0]).forEach(function(item, index){
//     console.log("entropy for " + item + "=" + getGain(testSample, "Play ball", item, null));
//   });
//   console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", null));
//   console.log("getGain=" + getGain(testSample, "Play ball", "Humidity", [{"attr":"Outlook", "value":"Sunny"}]));
//   console.log("getEntropy=" + getEntropy(testSample, "Play ball", [{"attr":"Outlook", "value":"Overcast"}]));
//   console.log("getEntropy=" + getEntropy(testSample, "Play ball", [{"attr":"Outlook", "value":"Sunny"}, {"attr":"Humidity", "value":"High"}]));
//   console.log("getDecisionAttr=" + getDecisionAttr(testSample, "Play ball", [{"attr":"Outlook", "value":"Rain"}]));
  ID3.genDecisionTree(testSample, "Play ball");
  console.log("Tree: " + JSON.stringify(ID3.tree));
}
