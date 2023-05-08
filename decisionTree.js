function DecisionTree(data) {
    this.data = data;
    this.root = null;
  
    this.buildTree();
  }
  
  DecisionTree.prototype.buildTree = function() {
    if (this.data.length == 0) {
      return;
    }
  
    // Find the best split point
    var bestSplitPoint = this.findBestSplitPoint();
  
    // Create a new node for the split point
    var node = new Node();
    node.splitPoint = bestSplitPoint;
  
    // Create two child nodes for the split point
    var leftChild = new DecisionTree(this.data.filter(function(datum) {
      return datum[bestSplitPoint] < this.splitPoint;
    }));
    var rightChild = new DecisionTree(this.data.filter(function(datum) {
      return datum[bestSplitPoint] >= this.splitPoint;
    }));
  
    // Set the child nodes of the node
    node.leftChild = leftChild;
    node.rightChild = rightChild;
  
    // Set the root of the tree to the node
    this.root = node;
  };
  
  DecisionTree.prototype.findBestSplitPoint = function() {
    // Find the best split point using the Gini index
    var bestSplitPoint = null;
    var bestGiniIndex = Infinity;
  
    for (var i = 0; i < this.data.length; i++) {
      var splitPoint = this.data[i][i];
      var giniIndex = this.calculateGiniIndex(splitPoint);
  
      if (giniIndex < bestGiniIndex) {
        bestSplitPoint = splitPoint;
        bestGiniIndex = giniIndex;
      }
    }
  
    return bestSplitPoint;
  };
  
  DecisionTree.prototype.calculateGiniIndex = function(splitPoint) {
    // Calculate the Gini index for the split point
    var giniIndex = 0;
  
    for (var i = 0; i < this.data.length; i++) {
      var datum = this.data[i];
      var probability = datum[splitPoint] / this.data.length;
      giniIndex += probability * (1 - probability);
    }
  
    return giniIndex;
  };
  
  DecisionTree.prototype.predict = function(datum) {
    // Predict the label for the datum
    var node = this.root;
  
    while (node.leftChild != null) {
      if (datum[node.splitPoint] < node.splitPoint) {
        node = node.leftChild;
      } else {
        node = node.rightChild;
      }
    }
  
    return node.label;
  };
  
  function Node() {
    this.splitPoint = null;
    this.leftChild = null;
    this.rightChild = null;
    this.label = null;
  }