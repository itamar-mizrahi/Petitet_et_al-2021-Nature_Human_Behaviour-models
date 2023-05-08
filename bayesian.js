function Bayesian(data) {
    this.data = data;
    this.parameters = {};
  
    this.initializeParameters();
  
    this.updateParameters();
  }
  
  Bayesian.prototype.initializeParameters = function() {
    for (var feature in this.data[0]) {
      this.parameters[feature] = 0;
    }
  };
  
  Bayesian.prototype.updateParameters = function() {
    for (var feature in this.data[0]) {
      var sum = 0;
  
      for (var i = 0; i < this.data.length; i++) {
        sum += this.data[i][feature];
      }
  
      this.parameters[feature] = sum / this.data.length;
    }
  };
  
  Bayesian.prototype.predict = function(datum) {
    var probability = 1;
  
    for (var feature in datum) {
      probability *= this.parameters[feature] / (this.parameters[feature] + (1 - this.parameters[feature]));
    }
  
    return probability;
  };
  

  