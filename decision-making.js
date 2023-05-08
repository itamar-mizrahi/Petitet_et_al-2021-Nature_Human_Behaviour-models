let option1Probability = 0.3;
      let option2Probability = 0.7;
      let option1Cost = 1;
      let option2Cost = 2;
      let currentResources = 10;
      let counter = 0;
      let failCounter = 0;
      let successCounter = 0;
      let resultsArr = [];
      function results() {
        $("#results").text(
          `results: ${
            (successCounter / 10) * 100
          }% , success: ${successCounter}, failed:${failCounter} , iterations: ${counter}`
        );
      }
      $("#reset").on("click", () => {
        currentResources = 10;
        counter = 0;
        successCounter = 0;
        failCounter = 0;
        $("#resources").text("you have 10 credits - press one of the options:");
        $("#results").text('')
      });
      $("#option1").click(function () {
        currentResources -= option1Cost;
        if (Math.random() < option1Probability) {
          $("#outcome").text("Option 1 was successful!");
          successCounter++;
        } else {
          $("#outcome").text("Option 1 failed.");
          failCounter++;
        }
        $("#resources").text("credits left: " + currentResources);
        counter++;
        if (currentResources <= 0) {
          $("#resources").text("insufficient resources: " + currentResources);
          results();
          currentResources = 10;
          counter = 0;
          successCounter = 0;
          failCounter = 0;
          $("#resources").text("press the reset button to start over ");
        }
      });
      $("#option2").click(function () {
        if (currentResources != 1) {
          currentResources -= option2Cost;
          if (Math.random() < option2Probability) {
            $("#outcome").text("Option 2 was successful!");
            successCounter++;
          } else {
            $("#outcome").text("Option 2 failed.");
            failCounter++;
          }
          $("#resources").text("Current resources: " + currentResources);
          counter++;
        }
        if (currentResources <= 0) {
          $("#resources").text("insufficient resources: " + currentResources);
          results();
          currentResources = 10;
          counter = 0;
          successCounter = 0;
          failCounter = 0;
          $("#resources").text("Current resources: " + currentResources);
        }
      });