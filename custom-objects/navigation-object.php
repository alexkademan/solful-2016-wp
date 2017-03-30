<?php

class get_main_navigation {

  function __construct( ) {
    // $this->full = $this->get_page_links(); // find all the root pages

  }

  public function get_pages_info( $parent_id = 0 ) {
    // put together an array about all child pages of a specific id:
    if($parent_id == 0) {
  		$pages = get_pages('parent=0');
  	} else {
  		$pages = get_pages('child_of=' . $parent_id);
  	}


    if( count($pages) > 0 ) { // there ARE some pages so:
      for($i = 0; $i < count($pages); ++$i) { // loop thru 'em:
        if(
          $pages[$i]->post_name != 'home' // the home page name
          && $pages[$i]->post_name != 'info' // my sub "category" name

          ){
          $list[$i] = $this->gather_page_info($pages[$i]);
        }
      }

      if(is_array($list)) {
        $list = $this->array_sort($list, 'menu_order');
      }
      return $list;
    }
  }

  private function gather_page_info( $page ) {

    $this_page['ID'] = $page->ID;
    $this_page['menu_order'] = $page->menu_order;
    $this_page['title'] = $page->post_title;
    $this_page['excerpt'] = $page->post_excerpt;
    $this_page['content'] = $page->post_content;
    $this_page['permalink'] = get_permalink( $page->ID );

    // $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($page->ID), 'medium');
    // $this_page['thumb'] = $thumb[0];

    return $this_page;
  }


  private function array_sort($array, $on, $order=SORT_ASC){
      $new_array = array();
      $sortable_array = array();

      if (count($array) > 0) {
          foreach ($array as $k => $v) {
              if (is_array($v)) {
                  foreach ($v as $k2 => $v2) {
                      if ($k2 == $on) {
                          $sortable_array[$k] = $v2;
                      }
                  }
              } else {
                  $sortable_array[$k] = $v;
              }
          }

          switch ($order) {
              case SORT_ASC:
                  asort($sortable_array);
              break;
              case SORT_DESC:
                  arsort($sortable_array);
              break;
          }

          foreach ($sortable_array as $k => $v) {
              $new_array[$k] = $array[$k];
          }
      }

      return $new_array;
  }

}
