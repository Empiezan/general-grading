let scanner = new Instascan.Scanner({
    video: document.getElementById('preview'),
    continuous: true,
    mirror: false,
    refractoryPeriod: 500
});
scanner.addListener('scan', function (content) {
    console.log(content);
    if (typeof scanner.scan() !== null) {
        let qrCode = String(content);
        let testType = qrCode.substring(0, length - 3);
        let testID = qrCode.substring(length - 3, length);
        document.getElementById("test-type").value = testType;
        document.getElementById("test-id").value = testID;
        scanner.stop();
        document.getElementById("selfie").style.display = 'none';
        // document.getElementById("testID-div").style.display = 'block';
        if (document.getElementById('grading').checked) {
          document.getElementById("q").style.display = 'block';
          document.getElementById("sc").style.display = 'block';
        } else {
          document.getElementById("schoolID").style.display = 'block';
          document.getElementById("student1").style.display = 'block';
          if (testType !== "IND") {
              document.getElementById("student2").style.display = 'block';
          }
        }
        document.getElementById("next").style.display = 'none';
        document.getElementById("back").style.display = 'inline-block';
        document.getElementById("submit").style.display = 'inline-block';
        updateQNum();
    }
});
Instascan.Camera.getCameras().then(function (cameras) {
    // var userAgent = window.navigator.userAgent;
    if (cameras.length > 0) {
        if(cameras[1]) {
            scanner.start(cameras[1]);
        } else {
            scanner.start(cameras[0]);
        }
    } else {
        console.error('No cameras found.');
    }
    // if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    //   constraints.video.facingMode = "environment";
    // }


}).catch(function (e) {
    console.error(e);
});
