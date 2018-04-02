function updateStudents () {
  if (document.getElementById("matching").checked) {
    // let length = document.getElementById('testID').value.length;
    let testType = document.getElementById('test-prefix').value;
    if (testType == 'IND') {
      document.getElementById('student1').style.display = 'block';
      document.getElementById('student2').style.display = 'none';
    }
    else if (testType == 'TEAM') {
      document.getElementById('student1').style.display = 'none';
      document.getElementById('student2').style.display = 'none';
    }
    else {
      document.getElementById('student1').style.display = 'block';
      document.getElementById('student2').style.display = 'block';
    }
  }
}
function updateScoreLimit () {
  let indivDict = [10, 15, 15, 5, 20, 15, 20];
  let humDict = [10, 15, 10, 15, 25, 25];
  let envDict = [19, 19, 19, 18, 20, 5];
  let cookDict = [23, 21, 17, 15, 24];
  let teamDict = [10, 10, 10, 15, 10, 10, 10];

  // let length = document.getElementById('testID').value.length;
  let testType = document.getElementById('test-prefix').value;
  console.log(testType);
  let qNum = parseInt(document.getElementById('qID').value) - 1;
  var score = document.getElementById('score').value;
  console.log(score);

  if (score == null) {
    return;
  }

  if (testType == 'IND') {
    if (score < 0 || score > indivDict[qNum]) {
      document.getElementById('score-warning-message').innerText = 'The Maximum Score for This Question is ' + indivDict[qNum];
      document.getElementById('score-warning-message').style.display = 'block';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('score-warning-message').style.display = 'none';
      document.getElementById('submit').disabled = false;
    }
  }
  else if (testType == 'BODY') {
    if (score < 0 || score > humDict[qNum]) {
      document.getElementById('score-warning-message').innerText = 'The Maximum Score for This Question is ' + humDict[qNum];
      document.getElementById('score-warning-message').style.display = 'block';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('score-warning-message').style.display = 'none';
      document.getElementById('submit').disabled = false;
    }
  }
  else if (testType == 'ENV') {
    if (score < 0 || score > envDict[qNum]) {
      document.getElementById('score-warning-message').innerText = 'The Maximum Score for This Question is ' + envDict[qNum];
      document.getElementById('score-warning-message').style.display = 'block';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('score-warning-message').style.display = 'none';
      document.getElementById('submit').disabled = false;
    }
  }
  else if (testType == 'COOK') {
    if (score < 0 || score > cookDict[qNum]) {
      document.getElementById('score-warning-message').innerText = 'The Maximum Score for This Question is ' + cookDict[qNum];
      document.getElementById('score-warning-message').style.display = 'block';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('score-warning-message').style.display = 'none';
      document.getElementById('submit').disabled = false;
    }
  }
  else {
    if (score < 0 || score > teamDict[qNum]) {
      document.getElementById('score-warning-message').innerText = 'The Maximum Score for This Question is ' + teamDict[qNum];
      document.getElementById('score-warning-message').style.display = 'block';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('score-warning-message').style.display = 'none';
      document.getElementById('submit').disabled = false;
    }
  }
}

function updateQNum (){
  // let length = document.getElementById('testID').value.length;
  let testType = document.getElementById('test-prefix').value;
  console.log(testType);
  // let testType = document.getElementById('testID').value.substring(0,3);

  var sixElement = document.getElementById('six');
  var sevenElement = document.getElementById('seven');

  var six = document.createElement('option');
  six.appendChild(document.createTextNode("6"));
  six.id = 'six';
  six.value = '6';

  var seven = document.createElement('option');
  seven.appendChild(document.createTextNode("7"));
  seven.id = 'seven';
  seven.value = '7';

  if (testType == 'IND' || testType == 'TEAM') {
    if (!sixElement) {
      document.getElementById('qID').appendChild(six);
    }
    if (!sevenElement) {
      document.getElementById('qID').appendChild(seven);
    }
    // $('six').show();
    // $('seven').show();
  }
  else if (testType == 'ENV' || testType == 'BODY') {
    if (!sixElement) {
        document.getElementById('qID').appendChild(six);
    }
    if (sevenElement) {
      sevenElement.remove();
    }
    // $('seven').hide();
  }
  else {
    if (sixElement) {
      sixElement.remove();
    }
    if (sevenElement) {
      sevenElement.remove();
    }
    // $('six').hide();
    // $('seven').hide();
  }
}

$(document).ready(function() {
    // $('body').on('change', "#testID", updateQNum);

    $("#submit").click(function() {

        if (document.getElementById("grading").checked) {
          writeScore();
        } else {
          matchTest();
        }
        // alert("Success!");

    });
});

$(document).ready(function() {
    $('#score').keypress(function (e) {
      if (e.which == 13) {
        $('#submit').click();
        return false;    //<---- Add this line
      }
    });

    $('#student1ID').keypress(function (e) {
      if (e.which == 13) {
        $('#submit').click();
        return false;    //<---- Add this line
      }
    });

    $("#next").click(function () {
      app.scanner.stop();
      document.getElementById("selfie").style.display = 'none';
      document.getElementById("test-info").style.display = 'block';
      // let length = document.getElementById('testID').value.length;
      let testType = document.getElementById('test-prefix').value;
      if (document.getElementById("grading").checked) {
        document.getElementById("q").style.display = 'block';
        document.getElementById("sc").style.display = 'block';
      } else {
        if (testType == "IND") {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'none';
        }
        else if (testType == 'TEAM') {
          document.getElementById('student1').style.display = 'none';
          document.getElementById("student2").style.display = 'none';
        }
        else {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'block';
        }
        document.getElementById('schoolID').style.display = 'block';
      }
      document.getElementById("next").style.display = 'none';
      document.getElementById("back").style.display = 'inline-block';
      document.getElementById("submit").style.display = 'inline-block';
    });

    $("#back").click(function () {
      app.scanner.start();
      document.getElementById("selfie").style.display = 'inline-block';
      document.getElementById("selfie").style.width = '65%';
      document.getElementById("test-info").style.display = 'none';
      document.getElementById("q").style.display = 'none';
      document.getElementById("sc").style.display = 'none';
      document.getElementById("student1").style.display = 'none';
      document.getElementById("student2").style.display = 'none';
      document.getElementById("schoolID").style.display = 'none';
      document.getElementById("next").style.display = 'inline';
      document.getElementById("back").style.display = 'none';
      document.getElementById("submit").style.display = 'none';
    });

    $("#grading-label").click(function () {
      if (document.getElementById('selfie').style.display === 'none') {
        document.getElementById("q").style.display = 'block';
        document.getElementById("sc").style.display = 'block';
        document.getElementById("student1").style.display = 'none';
        document.getElementById("student2").style.display = 'none';
        document.getElementById("schoolID").style.display = 'none';
      }
    });

    $("#matching-label").click(function () {
      if (document.getElementById('selfie').style.display === 'none') {
        // let length = document.getElementById('testID').value.length;
        let testType = document.getElementById('test-prefix').value;
        document.getElementById("q").style.display = 'none';
        document.getElementById("sc").style.display = 'none';
        // document.getElementById("student1").style.display = 'block';
        if (testType == "IND") {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'none';
        }
        else if (testType == 'TEAM') {
          document.getElementById('student1').style.display = 'none';
          document.getElementById("student2").style.display = 'none';
        }
        else {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'block';
        }
        document.getElementById('schoolID').style.display = 'block';
      }
    });

    $("#qr-on-label").click(function() {
      // if (document.getElementById("next").display == 'none') {
        app.scanner.start();
        document.getElementById("selfie").style.display = 'inline-block';
        document.getElementById("selfie").style.width = '65%';
        document.getElementById("test-info").style.display = 'none';
        document.getElementById("q").style.display = 'none';
        document.getElementById("sc").style.display = 'none';
        document.getElementById("student1").style.display = 'none';
        document.getElementById("student2").style.display = 'none';
        document.getElementById("schoolID").style.display = 'none';
        document.getElementById("next").style.display = 'inline';
        document.getElementById("submit").style.display = 'none';
      // }
      // document.getElementById("back").style.display = 'inline-block';
    });

    $("#qr-off-label").click(function() {
      app.scanner.stop();
      document.getElementById("selfie").style.display = 'none';
      document.getElementById("test-info").style.display = 'block';
      // let length = document.getElementById('testID').value.length;
      let testType = document.getElementById('test-prefix').value;
      if (document.getElementById("grading").checked) {
        document.getElementById("q").style.display = 'block';
        document.getElementById("sc").style.display = 'block';
      } else {
        if (testType == "IND") {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'none';
        }
        else if (testType == 'TEAM') {
          document.getElementById('student1').style.display = 'none';
          document.getElementById("student2").style.display = 'none';
        }
        else {
          document.getElementById('student1').style.display = 'block';
          document.getElementById("student2").style.display = 'block';
        }
        document.getElementById('schoolID').style.display = 'block';
      }
      document.getElementById("next").style.display = 'none';
      document.getElementById("back").style.display = 'none';
      document.getElementById("submit").style.display = 'inline-block';
    });
});
