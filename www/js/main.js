    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            notFirstUse();
        }
    }
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
            banner: 'ca-app-pub-1683858134373419/7790106682',
            interstitial:'ca-app-pub-9249695405712287/9772015955'
            //banner: 'ca-app-pub-3886850395157773/3411786244'
            //interstitial: 'ca-app-pub-9249695405712287/3301233156'
        };
    }
        else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
     admobid = {
            banner: 'ca-app-pub-1683858134373419/7790106682',
            interstitial:'ca-app-pub-9249695405712287/6678948755'
    };
  }

    function initApp() {
        if (!AdMob) { alert('admob plugin not ready'); return; }
        initAd();
        // display the banner at startup
        //createSelectedBanner();
        //display interstitial at startup
        loadInterstitial();
    }
    function initAd() {
        var defaultOptions = {
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black', // color name, or '#RRGGBB'
            isTesting: false // set to true, to receiving test ad for testing purpose
        };
        //AdMob.setOptions(defaultOptions);
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function (data) {
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdLoaded', function (data) {
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { 
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdDismiss', function (data) {
           document.getElementById("screen").style.display = 'none';     
        });
    }

    function createSelectedBanner() {
        AdMob.createBanner({adId:admobid.banner});
    }

    function successFunction()
    {
    }
 
    function errorFunction(error)
    {
    }

    function loadInterstitial() {
        if ((/(android|windows phone)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     
        } else if ((/(ipad|iphone|ipod)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     
        } else
        {
            document.getElementById("screen").style.display = 'none';     
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
    cordova.plugins.AppRate.setPreferences = {
        reviewType: {
            ios: 'AppStoreReview',
            android: 'InAppBrowser'
            },
  useLanguage:  'fi',
  usesUntilPrompt: 10,
  promptAgainForEachNewVersion: true,
  storeAppURL: {
                android: 'market://details?id=com.oulu.withads'
               }
};
 
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

function showAd()
{
    document.getElementById("screen").style.display = 'block';     
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        AdMob.isInterstitialReady(function(isready){
            if(isready) 
                AdMob.showInterstitial();
        });
    }
    document.getElementById("screen").style.display = 'none'; 
}