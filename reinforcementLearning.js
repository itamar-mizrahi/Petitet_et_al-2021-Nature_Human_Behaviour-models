function ReinforcementLearning(env, num_episodes, gamma) {
    this.env = env;
    this.num_episodes = num_episodes;
    this.gamma = gamma;
  
    this.Q = {};
    this.policy = function(state) {
      var best_action = -1;
      var best_value = -Infinity;
  
      for (var action in this.Q[state]) {
        if (this.Q[state][action] > best_value) {
          best_action = action;
          best_value = this.Q[state][action];
        }
      }
  
      return best_action;
    };
  
    this.learn = function(state, action, reward, next_state) {
      this.Q[state][action] += this.alpha * (reward + this.gamma * Math.max.apply(null, this.Q[next_state]) - this.Q[state][action]);
    };
  
    this.run = function() {
      for (var i = 0; i < this.num_episodes; i++) {
        var state = this.env.reset();
  
        while (true) {
          var action = this.policy(state);
          var reward = this.env.step(action);
          var next_state = this.env.getState();
  
          this.learn(state, action, reward, next_state);
  
          state = next_state;
  
          if (this.env.isTerminal()) {
            break;
          }
        }
      }
    };
  }
  