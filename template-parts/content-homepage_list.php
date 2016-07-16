<?php
/**
 * Template for displaying list of events on events calendar
 *
 */

$event_args = array(
 'posts_per_page' => 10,
 'post_status' => 'publish',
 'eventDisplay' => 'list'
);

$upcoming = tribe_get_events( $event_args );
if(count($upcoming) > 0){
	echo '<ul class="upcoming">';
	foreach ( $upcoming as $event ) {

		$unix_start = strtotime($event->EventStartDate);
		$unix_end = strtotime($event->EventEndDate);
		$unix_length = intval($unix_end) - intval($unix_start);


		if($unix_length == 86399 && date('z', $unix_start) == date('z', $unix_end)) {
			// one second under a full day, but starts and ends on the same day of the year:
			// (full day on the calendar)
			$li_date = date( 'l, F j', $unix_start );

		} elseif ( date('z', $unix_start) != date('z', $unix_end) ) {
			// multi-day event:
			$li_date = date( 'l, F j', $unix_start ) . ' ';
			$li_date .= " " . date("@ g:i a", $unix_start) . ' - ' . date("F j @ g:i a", $unix_end);

		} else {
			// show day and time.
			$li_date = date( 'l, F j', $unix_start );
			$li_date .= " " . date("@ g:i a", $unix_start) . ' - ' . date("g:i a", $unix_end);
		}


		$li = '';
		$li .= '<li>';
		$li .= '<a href="' . get_permalink($event->ID) . '">';
		$li .= '<h2>' . $event->post_title . '</h2>';
		$li .= '<span>' . $li_date . '</span>';
		$li .= '</a>';
		$li .= '</li>';

		echo $li;

	}
	echo '</ul>';

} else {
	echo 'there are no upcoming events. Stay tuned!';
}
