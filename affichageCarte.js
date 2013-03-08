			var mobileDemo = { 'center': '47.22,-1.54', 'zoom': 12 };
			
			$('#directions_map').live('pageinit', function() {
				demo.add('directions_map', function() {
					$('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, "draggable":false, "disableDoubleClickZoom":true, "scrollwheel":false, 'callback': function() {
						var self = this;
						self.set('getCurrentPosition', function() {
							self.refresh();
							self.getCurrentPosition( function(position, status) {
								if ( status === 'OK' ) { // si la position de l'utilisateur a bien été détecté
									var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
									self.get('map').panTo(latlng);
									self.search({ 'location': latlng }, function(results, status) {
										if ( status === 'OK' ) {
											$('#from').val(results[0].formatted_address);
										}
									});
								} else {
									alert('Position inconnue.');
								}
							});
						});
						// Evènement chargement de la page
						$('#load').ready(function() {self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
								( status === 'OK' ) ? $('#results').show() : $('#results').hide();
							});
							return false;
						});
						// Evènement clique sur le bouton itinéraire
						$('#submit').click(function() {
							self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
								( status === 'OK' ) ? $('#results').show() : $('#results').hide();
							});
							return false;
						});
						$('#listBoxCentre').change(function(){
						var selectedValue = $('#listBoxCentre option:selected').val();
						if(selectedValue == 'Centre d\'Orvault')
						{
							 $('#to').val('213 route de Rennes, 44700 Orvault, France');
						}
						else
						{
							$('#to').val('Rue Louis de Broglie, 44300 Nantes, France');
						}
						self.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
								( status === 'OK' ) ? $('#results').show() : $('#results').hide();
							});
							return false;
						});
					}});
				}).load('directions_map');
			});
			
			$('#directions_map').live('pageshow', function() {
				demo.add('directions_map', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
			});
			
