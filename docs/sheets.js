function handleClientLoad() {
        gapi.load('client:auth2', initClient);
}


var CLIENT_ID = '354059627602-lpe9ne2e37rng05tek29f3qs44to0767.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDhOkCc2UiXpUleFMaC8NJvkWPuyxBx0x4';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }


function writeScore() {
    let apiKey = API_KEY;
    let spSheetId = '1i4p_dL0yv_HJsQKiWXb4WRHaWjDtzRJ7iPVrnXOMoy8';
    let testType = document.getElementById('test-prefix').value;
    let testID = document.getElementById("test-id").value;
    testID = testType + testID;
    var examIndex = - 1;
    gapi.client.sheets.spreadsheets.values.get({
        key: apiKey,
        spreadsheetId: spSheetId,
        range: testType + '!A:A'
    }).then((response) => {
        var result = response.result;
        for (var i = 0; i < result.values.length; ++i) {
            if (result.values[i] == testID) {
                examIndex = i + 1;
                break;
            }
        }
        console.log(examIndex);
        if (examIndex == -1) {
            console.log("Index DNE");
            window.alert("Could Not Find Given Test ID!");
            return;
        }
        var e = document.getElementById("qID");
        var qId = parseInt(e.options[e.selectedIndex].value);
        var col = 'C';
        var scoreDict = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        if (testType == 'IND') {
            col = scoreDict[qId];
        }
        else if (testType == 'ENV' || testType == 'BODY' || testType == 'COOK') {
            col = scoreDict[qId + 1];
        }
        else if (testType == 'TEA') {
            col = scoreDict[qId - 1];
        }
        else {
          window.alert("Please Provide a Valid Test ID");
          return;
        }
        var score = document.getElementById("score").value;
        if (score < 0) {
          window.alert("Please Provide a Valid Score");
          return;
        }
        console.log("score: " + score);
        var params = {
            // The ID of the spreadsheet to update.
            spreadsheetId: spSheetId,  // TODO: Update placeholder value
            // The A1 notation of the values to update.
            range: testType + "!" + col + examIndex + ':' + col + examIndex,  // TODO: Update placeholder value.
            // How the input data should be interpreted.
            valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
        };
        var valueRangeBody = {
            "values": [
                [
                    score
                ],
            ]
        };
        var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
        request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);

            if (document.getElementById("qr-on-label").classList.contains("active")) {
              // scanner.start();
              document.getElementById("selfie").style.display = 'inline-block';
              document.getElementById("selfie").style.width = '68%';
              document.getElementById("test-info").style.display = 'none';
              document.getElementById("student1").style.display = 'none';
              document.getElementById("student2").style.display = 'none';
              document.getElementById("schoolID").style.display = 'none';
              document.getElementById("schoolID").style.display = 'none';
              document.getElementById("q").style.display = 'none';
              document.getElementById("sc").style.display = 'none';
              document.getElementById("next").style.display = 'inline';
              document.getElementById("back").style.display = 'none';
              document.getElementById("submit").style.display = 'none';
            }

            // if (document.getElementById('matching').checked) {
              document.getElementById('test-id').value = '';
            // }
            document.getElementById('score').value = '';
            document.getElementById('studentID1').value = '';
            document.getElementById('studentID2').value = '';
            document.getElementById('schoolID-input').value = '';
            alert("Success!");
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
    });
}

function matchTest() {
  let apiKey = API_KEY;
  let spSheetId = '1i4p_dL0yv_HJsQKiWXb4WRHaWjDtzRJ7iPVrnXOMoy8';
  // let testID = document.getElementById("testID").value;
  // let length = document.getElementById('testID').value.length;
  let testType = document.getElementById('test-prefix').value;
  let testID = document.getElementById("test-id").value;
  testID = testType + testID;

  gapi.client.sheets.spreadsheets.values.get({
      key: apiKey,
      spreadsheetId: spSheetId,
      range: testType + '!A:A'
  }).then((response) => {
      var result = response.result;
      for (var i = 0; i < result.values.length; ++i) {
          if (result.values[i] == testID) {
              examIndex = i + 1;
              break;
          }
      }

      if (examIndex == -1) {
          console.log("Index DNE");
          return;
      }

      let stud1 = 'X';
      let stud2 = 'X';
      let school = 'D';

      if (testType === 'IND') {
          stud1 = 'B';
          school = 'C';
      }
      else if (testType === 'ENV' || testType === 'BODY' || testType === 'COOK') {
          stud1 = 'B';
          stud2 = 'C';
          school = 'D';
      } else {
          school = 'B';
      }

      //Student 1
      if (stud1 !== 'X') {
        let stud1ID = document.getElementById('studentID1').value;
        console.log(stud1ID);
        var params = {
            // The ID of the spreadsheet to update.
            spreadsheetId: spSheetId,  // TODO: Update placeholder value
            // The A1 notation of the values to update.
            range: testType + "!" + stud1 + examIndex + ':' + stud1 + examIndex,  // TODO: Update placeholder value.
            // How the input data should be interpreted.
            valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
        };
        var valueRangeBody = {
            "values": [
                [
                  stud1ID
                ],
            ]
        };
        var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
        request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
      }
      //Student 2
      if (stud2 != 'X') {
        console.log(stud2);
        let stud2ID = document.getElementById('studentID2').value;
        var params = {
            // The ID of the spreadsheet to update.
            spreadsheetId: spSheetId,  // TODO: Update placeholder value
            // The A1 notation of the values to update.
            range: testType + "!" + stud2 + examIndex + ':' + stud2 + examIndex,  // TODO: Update placeholder value.
            // How the input data should be interpreted.
            valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
        };
        var valueRangeBody = {
            "values": [
                [
                  stud2ID
                ],
            ]
        };
        var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
        request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
      }
      //school
      let schoolID = document.getElementById('schoolID-input').value;
      console.log(schoolID);
      var params = {
          // The ID of the spreadsheet to update.
          spreadsheetId: spSheetId,  // TODO: Update placeholder value
          // The A1 notation of the values to update.
          range: testType + "!" + school + examIndex + ':' + school + examIndex,  // TODO: Update placeholder value.
          // How the input data should be interpreted.
          valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };
      var valueRangeBody = {
          "values": [
              [
                schoolID
              ],
          ]
      };
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
          // TODO: Change code below to process the `response` object:
          console.log(response.result);

          // scanner.start();
          if (document.getElementById("qr-on-label").classList.contains("active")) {
            document.getElementById("selfie").style.display = 'inline-block';
            document.getElementById("selfie").style.width = '68%';
            document.getElementById("test-info").style.display = 'none';
            document.getElementById("student1").style.display = 'none';
            document.getElementById("student2").style.display = 'none';
            document.getElementById("schoolID").style.display = 'none';
            document.getElementById("schoolID").style.display = 'none';
            document.getElementById("q").style.display = 'none';
            document.getElementById("sc").style.display = 'none';
            document.getElementById("next").style.display = 'inline';
            document.getElementById("back").style.display = 'none';
            document.getElementById("submit").style.display = 'none';
          }


          // if (document.getElementById('matching').checked) {
          document.getElementById('test-id').value = '';
          // }
          document.getElementById('score').value = '';
          document.getElementById('studentID1').value = '';
          document.getElementById('studentID2').value = '';
          document.getElementById('schoolID-input').value = '';
          alert("Success");
      }, function(reason) {
          console.error('error: ' + reason.result.error.message);
          alert("Submission Failed! Please Login With Your Google Account At the Top of The Page");
      });


  });
}
