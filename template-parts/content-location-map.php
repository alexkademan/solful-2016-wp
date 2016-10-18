<?php
/**
 * Google Maps part.
 *
 */
require_once( trailingslashit( get_template_directory() ) . 'api_keys.php' );

// echo '<div class="google-map">this is gonna be the map</div>';

/*
Add the code below to the bottom of your page, just before the closing </body> tag.
Edit myLatlng and the other variables.

Find syntax for Features that can be styled here:

https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType

Or use a service such as:

http://software.stadtwerk.org/google_maps_colorizr/#
http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
https://developers.google.com/maps/documentation/javascript/tutorial
*/
?>
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_maps_api_key; ?>"></script>
<script>
  var bittersMap = (function () {
    var myLatlng = new google.maps.LatLng(43.17542299999999, -87.96530789999997), // http://www.gps-coordinates.net/
        mapCenter = new google.maps.LatLng(43.17542299999999, -87.96530789999997),
        mapCanvas = document.getElementById('map_canvas'),
        mapOptions = {
          center: mapCenter,
          zoom: 15,
          scrollwheel: false,
          draggable: true,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(mapCanvas, mapOptions),
        contentString =
          '<a href="https://www.google.com/maps/place/8655+N+43rd+St,+Brown+Deer,+WI+53209/@43.175423,-87.9674966,17z/data=!3m1!4b1!4m5!3m4!1s0x8804e2679d511a67:0xbdedd1e89f3e08a!8m2!3d43.175423!4d-87.9653079">'+
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Solful Fitness</h1>'+
          '<div id="bodyContent"'+
          '<p>10950 N Buntrock Ave Mequon, WI 53092</p>'+
          '</div>'+
          '</div>'+
          '</a>',
        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300
        }),
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Solful Fitness',
          icon: '<?php echo get_bloginfo('template_url') ?>/images/googleMapPin.png'
        });

    return {
      init: function () {
        map.set('styles', [{
      		featureType: 'landscape',
      		elementType: 'all',
      		stylers: [
      			{ hue: '#F4F4F4' },
      			{ saturation: -100 },
      			{ lightness: 61 },
      			{ visibility: 'on' }
      		]
      	},{
      		featureType: 'road',
      		elementType: 'all',
      		stylers: [
      			{ hue: '#999999' },
      			{ saturation: -100 },
      			{ lightness: -6 },
      			{ visibility: 'on' }
      		]
      	},{
      		featureType: 'poi',
      		elementType: 'all',
      		stylers: [
      			{ hue: '#999999' },
      			{ saturation: -100 },
      			{ lightness: -23 },
      			{ visibility: 'on' }
      		]
      	}]);

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map,marker);
        });
      }
    };
  }());

  bittersMap.init();
</script>
