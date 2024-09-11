    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent)) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            notFirstUse();
        }
    }

   function checkFirstUse()
    {
            initApp();
            checkTrackingPermissions();
            askRating();
            checkLocationPermissions();
            //document.getElementById('screen').style.display = 'none';            
    }

   function notFirstUse()
    {
            document.getElementById('screen').style.display = 'none';            
    }

    function askRating()
    {
        const appRatePlugin = AppRate;
        appRatePlugin.setPreferences({
            reviewType: {
                ios: 'AppStoreReview',
                android: 'InAppBrowser'
                },
        useLanguage:  'fi',
        usesUntilPrompt: 10,
        promptAgainForEachNewVersion: true,
        storeAppURL: {
                    //ios: '1227310753',
                    android: 'market://details?id=com.oulu.withads'
                   }
        });
     
    AppRate.promptForRating(false);
    }

function checkTrackingPermissions(){
    const idfaPlugin = cordova.plugins.idfa;

    idfaPlugin.getInfo()
        .then(info => {
            if (!info.trackingLimited) {
                return info.idfa || info.aaid;
            } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                return idfaPlugin.requestPermission().then(result => {
                    if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                        return idfaPlugin.getInfo().then(info => {
                            return info.idfa || info.aaid;
                        });
                    }
                });
            }
        });
}

function checkLocationPermissions()
{
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
        switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                    console.log("success");
                }, function (error) {
                    console.error(error);
                });
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                }, function (error) {
                    console.error(error);
                });
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                break;
            default:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                }, function (error) {
                    console.error(error);
                });
        }
    }, function (error) {
        console.error(error);
    });
}

function showMap()
{
    if(document.getElementById('frmMap').src == '')
    {
        // document.getElementById('frmMap').src = 'Schedules.html';
        document.getElementById('frmMap').src = 'LiveMap.html';
        document.getElementById('frmMap').setAttribute('allow', 'geolocation *;');
    }
    document.getElementById('divMap').style.display = 'block';
    document.getElementById('divPlanner').style.display = 'none';    
    document.getElementById('divPlanner').style.height = '0vh';
    document.getElementById('divMap').style.height = '94vh';
}

function showPlanner()
{
    showAd();
    {
        // document.getElementById('frmMap').src = 'Schedules.html';
        document.getElementById('frmPlanner').src = 'Planner.html';
        document.getElementById('frmPlanner').setAttribute('allow', 'geolocation *;');
    }
    document.getElementById('divMap').style.display = 'none';
    document.getElementById('divPlanner').style.display = 'block';
    document.getElementById('divMap').style.height = '0vh';
    document.getElementById('divPlanner').style.height = '94vh';
}

function initApp()
{
    if (/(android)/i.test(navigator.userAgent)){
    interstitial = new admob.InterstitialAd({
        //dev
        adUnitId: 'ca-app-pub-3940256099942544/1033173712'
        //prod
        //adUnitId: 'ca-app-pub-9249695405712287/9772015955'
      });
    }
    else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
        interstitial = new admob.InterstitialAd({
            //dev
            adUnitId: 'ca-app-pub-3940256099942544/4411468910'
            //prod
            //adUnitId: 'ca-app-pub-9249695405712287/1324624766'
          });
    }
    registerAdEvents();
    interstitial.load();
}

function registerAdEvents() {
    // new events, with variable to differentiate: adNetwork, adType, adEvent
    document.addEventListener('admob.ad.load', function (data) {
        document.getElementById("screen").style.display = 'none';     
    });
    document.addEventListener('admob.ad.loadfail', function (data) {
        document.getElementById("screen").style.display = 'none';     
    });
    document.addEventListener('admob.ad.show', function (data) { 
        document.getElementById("screen").style.display = 'none';     
    });
    document.addEventListener('admob.ad.dismiss', function (data) {
       document.getElementById("screen").style.display = 'none';     
    });
}

function showAd()
{
    document.getElementById("screen").style.display = 'block';     
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent)) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
        interstitial.show();
    }
    document.getElementById("screen").style.display = 'none'; 
}